---
author: "wzolni"
title: "About effortless UI test grid infrastructure"
date: 2022-09-21
draft: false
tags: [
    "Selenoid",
    "Test Automation",
    "E2E tests",
    "Test Grid"
]
---

I've dealt with various implementations of UI test grids and it hasn't been exactly a joy ride. In the middle of 2021, again, I needed to set up a new grid for my QA team. It would replace [Zalenium](https://github.com/zalando/zalenium/), a decent open-source stack that unfortunately wasn't maintained anymore.

**A reasonable alternative should meet at least these requirements:**
* able to handle 20+ parallel sessions (*duh!*)
* able to self-heal (kill/clean hanged sessions)
* preferably open-source and not so pricey
* able to record video of the tests
*  easy to upgrade/maintain

## Docker Selenium

The first obvious candidate was [Docker Selenium](https://github.com/SeleniumHQ/docker-selenium). The official grid project that's maintained by the Selenium dev team. 

After reviewing the documentation, I started to create a prototype and tried a couple of suggested docker-compose setups. But after a few days, frustration started to build up.
**It takes a lot of trial & error to piece together a grid with just a couple of open sessions with video recording and what I had felt volatile**. Adding additional pieces required going deep into the grid internals, reviewing documentation again & again, and not only for the grid itself but also for docker & docker-compose to understand how I can sew it all together. I don't know why I should ever care about Routers, Event Bus, Sessions Maps, Sessions Queues, etc. Unfortunately, if you want a bit more custom, dynamic and fancy solution, you do need to understand how those components work together.

Another day came by and I decided that it was not worth the pain. Even if I would make it work, good luck to someone who comes after me to support it. **To keep it short, in my opinion, this project is way too complicated for the end user at this point.** Not only to build on it, but also to maintain it.

## Sauce-Stacked-Lambda's

On the other side of the spectrum, there are alternatives like [SauceLabs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/), and [LambdaTest](https://www.lambdatest.com/). They promise to take away all your pain (for only a handful of dollars), so you could finally focus on your automated tests. But is it worth the price tag?

**For 20 parallel sessions, the price varies between \$2000 - \$3000 per month (billed annually). Call me cheap, but that's a bit pricey**. On top of that, from what I recall, it's not all sunshine & rainbows anyways. Watching tests complete on one of those services feels like watching a toothless grandma eat a cob of corn. **Yes, it's that slow**. This is something that you can feel pulling you down when you debug your tests. Debugging e2e tests is already a massive time sink without the additional overhead of waiting for your page to render on the toaster-sized server somewhere in the middle of nowhere.

**The final nail in the coffin is tunneling and intermittent network issues that come with it**. For the grid to be able to reach your application, which is usually hidden behind your company's firewall, you need to set up some sort of network tunnel. I don't know why, but it always tends to break, making my tests unstable for a reason that I can't control. So this option is out as well.

## Selenoid

That brings us to the sweet honey pot in between - [Selenoid](https://aerokube.com/). Let's start with the price comparison. You have two options to run it:
* Use the open-source, free-for-commercial use (Apache License 2.0) version. That's called simply 'Selenoid'. You only pay for the virtual machine(s) plus network traffic (assuming you're using a Cloud provider)
* Sign up for Moon - an option where the Selenoid dev team takes care of maintaining and supporting the grid for a fixed commission of 25% on top of your cloud bill.

My team runs the first option right now. **We use a chunky big-boy m5.8xlarge (32 vCPUs, 128GiB Memory) to run up to 40 parallel chrome sessions. The monthly bill is roughly \$1200**, a third of what I would pay for half the throughput using the services mentioned earlier.

**So why even consider using the paid Moon version then?** Well our EC2 VM runs 24/7, and we rarely need all 40 slots at the same time. Based on my rough estimate, the bill could go down even lower, if we decide to sign up for the paid version. Just because it could then scale solely on demand (now it scales as well, sessions and not just hanging there, but we still pay full price for the VM being up all the time) and we would only pay for the minutes we used. That would be a win-win for both my team & the Selenoid devs.

What's also cool about Selenoid is that the **setup and upgrades are a piece of cake**. Selenoid comes with ready executables that, provided with the right configuration, will set up a grid for you in one command. Besides that, the only thing that needed attention is the video and log rotation. Turning it on is as simple as turning the right switch, but to avoid clogging the VM it needs a clean-up script running periodically.

**Maintenance comes down to upgrading the browser's from time to time** (done automatically in the paid version) and running the configuration manager to auto-upgrade to the newer Selenoid version. The only real part that you would need to cover is when something unexpected happens. So far, it looks like it's a once-in-a-year event, but I did indeed stumbled on an issue resembling a docker/kernel memory leak, that was causing 'cgroups' memory locks to fill out and OS to not be able to start new containers. Sounds scary, but the takeaway was that I also need to reboot the machine at least once a year. ¯\\_(ツ)_/¯

## Summary

**To summarize**, Selenoid stands out at this point as the best open-source test grid infrastructure project. Speed was never an issue, and in fact, it stands out as one of the fastest grids I know of, with an ability to provision a test-ready browser in seconds, that runs like in a local environment. An open-source model with a paid option that adds more flexibility and removes maintenance costs, is extremely reasonable.  I'm sure it will not only pay off to the dev team but also guarantees the project's success due to accessibility to all community members. 

## *Post Scriptum*

Originally, this post was supposed to be about how to set up your Selenoid grid in the cloud. When I redid the steps, I realized I forgot it's not exactly rocket science and that I would end up copying the commands from the official site to the post here. So instead, let me just provide you with some additional pointers on how to set up Selenoid and avoid having to apply any corrections afterward:
* Check, whether your cloud provider has a ready-to-go image for Selenoid available (I know at least GCP does)
* **When creating your VM from scratch, use a regular Linux base image**, not any container optimized one While it has 'optimized container service' and Selenoid runs everything in docker, you might end up not having useful command line utilities like find/grep/apt/wget which come in handy when you need to set up some supporting scripts.
* Setup on the VM is easy. Install docker & download the Selenoid configuration manager. Follow the official docs to set the browser types, their amount, video recording, VNC, or whatever you need
* **If you enable video recording, set up a simple cron shell script that would rotate the logs & videos.**
Example script below will remove videos older than 14 days. Run it once a day.

```
#!/usr/bin/env bash
find /home/ubuntu/.aerokube/selenoid/video -mindepth 1 -maxdepth 1 -mtime +14 -name '*.mp4' | sudo xargs rm -rf
```
* **For the maximum number of available browser slots, the general rule is the number of CPUs x 1.5.** This never failed me, but then again I was never trying to melt the metal on the VM. It's probably possible to even go higher.
* **Reserve a static IP for your machine**. In case of a restart, you will not only not have to remember to remap it to your domain, but it will remove a lot of rework if your company has additional ingress/egress firewall rules in place. In my case, the network security layer was detecting an SQL injection being done from Selenoid IP, which was part of a normal use case for the application, so its IP needed to be explicitly whitelisted.
* **Remember to set up a VPC with a firewall** of your own, so that your grid won't be accessible to the rest of the world - **that's a must!**

**That's all! Thanks for reading!**
