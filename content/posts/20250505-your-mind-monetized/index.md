---
author: "wzolni"
title: "Your mind, monetized - how AI companies can turn your prompts into buying triggers"
description: "How AI companies collect, exploit, and monetize your private chat prompts — exposing you to privacy risks, psychographic profiling, and data-driven manipulation."
date: 2025-05-05
draft: false
keywords: ["AI privacy risks", "AI chat data collection", "AI user data exploitation"]
tags: [
    "dark-patterns",
    "adtech"
]
promoLink: "https://www.midjourney.com"
promoAuthor: "Midjourney AI"
---

---
---

*New AI products are launching faster than regulators can blink.
Behind the glossy marketing and innovation hype, a quieter pattern is emerging: the systematic capture of personal conversations, preferences, and psychological fingerprints — normalized, anonymized, and fed back into the machine.*

---

♜ Chat log collection is the default for major AI companies, typically justified as "user experience improvements" or "for research purposes." OpenAI, for example, states in its privacy policy that it reserves the right to use anonymized data to "analyze the way our Services are being used, to improve and add features to them, and to conduct research."


| Company                      | Claims Right to Use Prompts? | Data Retention                          | Opt-Out/Control                                                 | Human Review         | Privacy Rating |
| ---------------------------- | ---------------------------- | --------------------------------------- | --------------------------------------------------------------- | -------------------- | -------------- |
| **ChatGPT (OpenAI)**         | ✅ Yes (by default)                        | Retained until opt-out                  | Users can opt-out or request deletion                           | ❓ Unclear (data shared for monitoring safety)  | Fair           |
| **Anthropic (Claude)**       | ⚠️ Yes (only if opt-in)               | Not used unless feedback provided       | Users can delete data and opt-in for training                   | ❌ No (only if flagged)                | **Good**           |
| **Google DeepMind (Gemini)** | ✅ Yes (by default)           | Loophole to retained data for up to 3 years      | Users can disable activity, but data still retained | ✅ Yes (aggressively) | Weak           |
| **xAI (Grok)**               | ✅ Yes (by default)           | Retained 30 days (unless legal reasons) | Users can delete data within 30 days                            | ❓ Unclear            | Vague          |
| **DeepSeek**                 | ✅ Yes (by default)           | Retained for legal compliance           | Users can delete chat history anytime                           | ❓ Unclear            | Weak           |

<Caption>Note: Links to privacy policies are available in the footnotes.</Caption>


It’s important to note that the regulations mentioned above apply only to user-facing chat applications. For API usage, such metrics are typically not collected, so as not to discourage businesses from integrating their systems.

The patterns we observe with the big five can be extrapolated to the tens of thousands of AI startups racing to deliver their products. Massive amounts of fascinating data are being harvested with minimal regulation.

----

***This opens a Pandora’s box of privacy risks — and no one is truly ready.***

----


## Not my jurisdiction

Even Europe, with its strongest data protection laws (GDPR / DPA), is powerless in this struggle. Nothing shows this better than the feud between Europe’s data protection agencies and DeepSeek - a Chinese based company offering an AI chat bot similar to chatGPT.

DeepSeek’s own privacy policy, like others, admits to collecting user chat logs. They empasize that they - do not engage in profiling - which is a promising statement. 

As with other companies a lot of statements are very open to interpretation:
- sharing data with 3rd party providers/suppliers
- sharing data within corporate group
- sharing data in corporate transactions like sale of assets.

And of course, DeepsSeek operates under PRC law enforcement which is considered a hostile state by some western countries.

Overall - *Your data is safe until it becomes profitable to sell it.*

In February, after a DeepSeek database containing sensitive chat logs and personal data was found [exposed on the open internet](https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak), Europe's top data protection agencies jumped into action, demanding GDPR and DPA compliance proof from DeepSeek. Their response was simply:

> [We don't operate under EU jurisdiction.](https://www.reuters.com/technology/artificial-intelligence/italys-privacy-watchdog-blocks-chinese-ai-app-deepseek-2025-01-30/)

Only Italy moved to ban DeepSeek outright, setting a precedent.
Other European countries issued public warnings — gestures that did nothing to force compliance or halt operations.

## Muah.ai data breach

Muah.ai is a platform where users can create and interact with AI companions, such as *caring AI girlfriends, supportive boyfriends, or virtual therapists.*


Since they are a small AI-first company, it’s worth reading through their Terms of Service and Privacy Policy carefully.


Their Privacy Policy does not mention any data protection principles, and they frame themselves solely as a "data processor." They claim to be "an AI processing service provider that processes data based on user input." (However, under GDPR, if they collect user information such as account details or chat history, they would also have obligations as a data controller.) For security measures, they assure users that they are "reasonable".


From their Terms of Service, it is difficult to determine under which jurisdiction they operate. On the landing page, they mention California, but there is no reference to any registered legal entity anywhere.


Weak policies eventually led to predictable outcomes. Muah.ai was [hacked in October 2024](https://www.linklaters.com/en/insights/blogs/digilinks/2024/october/the-muah-ai-data-breach---extortion-threats-and-cyber-vulnerabilities), leaking data from 1.9 million users, including chat prompts submitted to their AI companions and users' email addresses.


Turns out, they were acting as a data controller after all.


## Implications

Data leaks of sensitive information are already happening and will continue to happen, especially as many companies sacrifice security for a competitive edge against ruthless opponents.

Based on the earlier examples, the threats fall into two main categories:

- Threat actors exploiting weak security to gain access to private conversations, then using compromising information to blackmail victims or sell the data on the black market.

- Hostile state actors leveraging compromised PII (Personally Identifiable Information) and chat history to conduct precision-targeted misinformation campaigns — or, in worse cases, to blackmail individuals for intelligence operations.

---


While blackmail and espionage are serious concerns, there’s a **more subtle risk at play**.


## Unseen harvest: AI, psychographics, and the quiet capture of identity

> "Imagine walking into a world where every consumer behavior and preference is mapped out in intricate detail, all thanks to AI-driven qualitative analysis. This isn't the stuff of futurism; it's the cutting-edge reality of AI Psychographic Insights."

Source: [insight7.io](https://insight7.io/unveiling-psychographics-ai-driven-qualitative-analysis-for-consumer-profiling/)


This is how the new world of psychographic profiling is beginning to emerge. Traditionally, psychographics relied on user surveys — limited, self-reported, and often unreliable. Now, we have something different: models built with billions of parameters, capable of enriching consumer data with deep psychographic profiles — automatically, passively, and at massive scale.

Naturally, psychographic profiling runs into serious regulatory barriers.

Under frameworks like GDPR (Europe), DPA (UK), and CCPA (California), collecting and analyzing deep psychological traits from user data is heavily regulated — or at least, in theory, it should be.

But enforcement varies widely. Outside of California, much of the U.S. remains patchy when it comes to consumer data protection.

Legal frameworks might exist, but reality is more practical than idealistic. Many companies operate within gray zones: relying on implied consent, anonymized data loopholes, or simply constructing psychographic profiles outside the strict definitions of "personal data". One way or another, information about you almost always ends up in the hands of AdTech giants.

<img src="https://rook2root.co/articles-assets/acxiom-data-points.png" alt="Acxiom - data points" style="width: 100%; max-width: 800px; display: block; margin: 2rem auto 0.5rem auto;" />
<p style="font-size: 0.85rem; color: #777; text-align: left; max-width: 800px; margin: 0 auto 2rem auto;">
   Source: 
  <a href="https://www.acxiom.com/customer-data/" target="_blank" rel="noopener noreferrer">acxiom.com</a>
</p>


As you can see, half of the world's population — and nearly the entire U.S. population — has, knowingly or not, "consented" to handing over a comprehensive map of their lives.

Under GDPR, CCPA, and CPRA, enriching personally identifiable information (PII) with behavioral and psychographic attributes legally requires either **prior user consent** or a **very strong legitimate interest**.


Few companies are better positioned to capitalize on these gray zones than **AdTech giant Google.**


With vast access to user be havior across Search, YouTube, Android, and now Gemini, Google treats anonymized data as raw material — extracted, segmented, and deployed to drive personalized outcomes at scale.


Given Google's history of regulatory fines and data protection violations, it would be reasonable to assume that their AI-driven initiatives are also optimized to enhance the precision of personalized ad campaigns.

> "Google collects your chats (including recordings of your Gemini Live interactions), what you share with Gemini Apps (like files, images, and screens), related product usage information, your feedback, and info about your location. Info about your location includes the general area from your device, IP address, or Home or Work addresses in your Google Account. Learn more about location data at g.co/privacypolicy/location.

> Google uses this data, consistent with our Privacy Policy, to provide, improve, and develop Google products and services and machine-learning technologies

> To help with quality and improve our products (such as the generative machine-learning models that power Gemini Apps), human reviewers (including third parties) read, annotate, and process your Gemini Apps conversations."

source: [Google Gemini: what data is collected and how it’s used](https://support.google.com/gemini/answer/13594961?hl=en#your_data)

---

Where Google leads, the rest of the AdTech industry will inevitably follow.


## Final thoughts

We haven't seen major public outrage over data misuse since [Cambridge Analytica](https://shyama.com/the-cambridge-analytica-scandal-how-psychographic-profiling-reshaped-digital-political-campaigns/). The outcome was clear: weaponizing political profiling at scale carries serious consequences.

AdTech adapted, disappearing again into the shadows.

Maybe it's time for another outrage.

Not just noise — but a stand.

A legal line carved in stone — **and no mercy for those who test it.**

-----

♜ *At rook2root.co, we expose the tactics no one talks about. Not to moralize — just to make the game visible.*

♜ *We're just getting started, and your support right now means everything. Hit [subscribe](https://rook2root.beehiiv.com/subscribe) or share the story on [X](https://twitter.com/intent/tweet?url=https://rook2root.co/articles/) — every bit counts.*

-----

## Further reading

- wiz.io, [Wiz Research Uncovers Exposed DeepSeek Database Leaking Sensitive Information, Including Chat History](https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak) (Jan 2025) - 
Wiz Research found an open ClickHouse database exposing over a million sensitive log entries — including chat histories, API keys, and backend data — without authentication.

- usercentrics.com, [EU regulators scrutinize DeepSeek for data privacy violations](https://usercentrics.com/knowledge-hub/eu-regulators-scrutinize-deepseek-for-data-privacy-violations/) (Feb 2025) - DeepSeek faces mounting scrutiny from EU regulators for collecting and processing EU residents' personal data without complying with GDPR.

- Reuters, [Italy's regulator blocks Chinese AI app DeepSeek on data protection](https://www.reuters.com/technology/artificial-intelligence/italys-privacy-watchdog-blocks-chinese-ai-app-deepseek-2025-01-30/) (Feb 2025)

- linklaters.com, [The muah.ai data breach – Extortion threats and cyber vulnerabilities](https://www.linklaters.com/en/insights/blogs/digilinks/2024/october/the-muah-ai-data-breach---extortion-threats-and-cyber-vulnerabilities) (Oct 2024) - Details on the muah.ai breach - a hack exposed 1.9M users’ private AI chat prompts and emails — including highly sensitive and illegal content.

- google.com, [Gemini Apps Privacy Notice - What data is collected and how it's used](https://support.google.com/gemini/answer/13594961?hl=en#your_data) (March 2025)

- acxiom.com, [Why Brands Must Prioritize Customer Loyalty Retention Through Life’s Major Transitions](https://www.acxiom.com/blog/why-brands-must-prioritize-customer-loyalty-retention-through-lifes-major-transitions/) (Apr 2024) - Acxiom emphasizes that brands must prioritize customer loyalty retention throughout major life transitions, such as graduating, getting married, or having children, as these events significantly alter consumer needs and perceptions. By personalizing interactions with accurate, up-to-date customer data, brands can foster loyalty and minimize churn during these *high-risk periods*.

- acxiom.com, [The Future of Personalized Marketing](https://www.acxiom.com/blog/market-segmentation-psychographic-vs-demographic-vs-behavioral/) - Market Segmentation Psychographic vs Demographic vs Behavioral (Oct 2024) - Acxiom highlights that market segmentation, based on psychographics, demographics, and behaviors, is essential for personalized marketing, improving customer loyalty and ROI through AI-driven insights.

- CNBC, [What internet data brokers have on you — and how you can start to get it back](https://www.cnbc.com/2024/10/11/internet-data-brokers-online-privacy-personal-information.html) (Oct 2024) - Data brokers collect extensive personal information from individuals, often without their knowledge, and sell it to various industries for profit.

- shyama.com, [Cambridge Analytica : How Psychographic Profiling Reshaped Digital Political Campaigns](https://shyama.com/the-cambridge-analytica-scandal-how-psychographic-profiling-reshaped-digital-political-campaigns/) (Nov 2024) - How Cambridge Analytica scandal exposed deep vulnerabilities in digital democracy, leading to public distrust, regulatory crackdowns, and debates about ethical data use.

## Privacy policies

- [anthropic.com](https://www.anthropic.com/legal/privacy)

- [x.ai](https://x.ai/legal/privacy-policy)

- [openai.com](https://openai.com/policies/row-privacy-policy/)

- [deepseek.com](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)

- [gemini.google.com privacy hub](https://support.google.com/gemini/answer/13594961?hl=en) 

- [google.com privacy policy](https://policies.google.com/privacy)

## Finally, for your entertainment

- Vienna Teng, [The Hymn of Acxiom](https://www.youtube.com/watch?v=F7P2ViCRObs)

> ...Someone is gathering every crumb you drop, these
(mindless decisions and) moments you long forgot...
