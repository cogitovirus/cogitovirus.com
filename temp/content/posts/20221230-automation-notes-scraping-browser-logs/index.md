---
author: "wzolni"
title: "Automation Notes #01 - How to access Chrome console and network logs with Selenium"
description: "Article describing how to access Chrome console and network logs with Selenium"
date: 2022-12-30
draft: false
keywords: ["Chrome logs scraper", "Selenium chrome logs", "Selenium logging", "test automation" ]
tags: [
    "Test Automation"
]
promoLink: "https://www.midjourney.com"
promoAuthor: "Midjourney AI"
---

## Summary

This walk-through shows how to implement a feature that logs network and browser events from Chrome browser to test automation logs. Having those available for failed UI tests is an extremely useful debugging tool. **A full working example is available [here](https://github.com/cogitovirus/automation_notes/tree/main/01_browser_logs_scraper)**. The code is written in Javascript with Selenium as the browser driver.

Below you can find a detailed explanation of how this feature works and why you should consider having it in your automation framework.

## Why even bother?

Web applications often rely on additional services (like a REST API) to dynamically load the required data. When a test fails, those services often are the root cause of the fault (an example would be a malformed request or a straight-up 500 response from the service).

Being able to quickly identify the cause of a failure with information available at hand (logs of a failed script) is one of the core competencies of an automation engineer. Having to manually reproduce the steps might take hours, which won't work if your team is following any of the *"Lean"* or *"Agile"* practices.


## Implementation

I will focus on the essentials and won't bother with boilerplate code. You can check how the whole works in the [git repo](https://github.com/cogitovirus/automation_notes/tree/main/01_browser_logs_scraper).


First of all - caps. To have the logs available in the browser you need to make sure the correct logging preferences are set. This example is for Chrome & Selenium.
```js
const caps = {
  "browserName": "chrome",
  "goog:loggingPrefs": {
    "performance": "INFO",
    "browser": "SEVERE"
  }
}
```
Mocha is our main test engine. After each test, I'll call the `logNetworkErrors()` and `logBrowserConsoleErrors()` functions which we'll implement in a bit.

```js
this.afterEach(async () => {
    console.log(' Network errors: ')
    await logNetworkErrors(driver);
    console.log(' Browser console errors: ')
    await logBrowserConsoleErrors(driver);
    driver.quit();
  })
```

> **Note:** You should narrow the scraper to only investigate failed tests and also use a qualified logger, not just a `console.log()`. This example is set up this way for the sake of simplicity.

### Logging network calls

Let's get into the actual methods and start with `logNetworkErrors`. First, we need to access the logs through the Selenium log interface.
```js
async function logNetworkErrors(driver) {
  const performanceLogs = await driver.manage().logs().get('performance') || [];
  (...)
}
```

> **Note:** As a safety precaution, in case when `.get('performance')` returns an undefined or null value, I'm assigning an empty array to `performanceLogs`, to make sure the next step won't crap out when there's nothing to loop through.

The next part is a bit tricky. Performance logs hold a lot of information and just dumping the whole thing into the console would clog it with irrelevant junk. What we need to do is filter the array to only include those **responses** that have 400 or 500 return codes. Simple enough, but that's only half the story. You would also like to know the exact **request** that was made and those are kept as separate events.

Fortunately, events associated with one network call are associated with the same `requestId`. Knowing that, and already having identified the problematic responses, we'll do an additional loop through the whole array to track down additional events associated with our problematic response. Then, we'll `console.log()` all of those in proper order. The fully implemented method looks as follows:

```js
async function logNetworkErrors(driver) {
  const performanceLogs = await driver.manage().logs().get('performance') || [];

  performanceLogs.forEach((log) => {
    const parsedLog = JSON.parse(log.message);

    const response = parsedLog.message.params.response;
    // log only 400 and 500 errors
    if (response && response.status > 400) {
      const failedRequestId = parsedLog.message.params.requestId;
      // find all logs related to the failed request
      const relatedLogs = performanceLogs.filter((log) => {
        return JSON.parse(log.message).message.params.requestId === failedRequestId;
      });
      // log all related logs
      relatedLogs.forEach((relatedLog) => {
        const parsedRelatedLog = JSON.parse(relatedLog.message);
        console.log(`NETWORK request ID: ${failedRequestId}, ${JSON.stringify(parsedRelatedLog, null, 2)}`)

      });
      //  finally, log the response
      console.log(`NETWORK requestID: ${failedRequestId}, ${JSON.stringify(parsedLog, null, 2)}\n`);
    }
  });
}
```

### Logging console errors

Scraping the browser console errors is a lot simpler. We use the same log interface, but point it to get the `browser` logs. There's not much else to do but simply loop through the available entries and `console.log()` them.

```js
async function logBrowserConsoleErrors(driver) {
  const browserLogs = await driver.manage().logs().get('browser') || [];

  browserLogs.forEach((log) => {
    if (log.message) {
      console.log(`SEVERE message: ${log.message} \n`);
    }
  });
}
```
> **Note:** In our caps we've chosen only the SEVERE logs so we'll get only those.

## Scraping in action

Now, let's write a simple page along with a test to see how this functionality works.

### Web server

What we'll serve is a single HTML file that contains a faulty external call to generate an error for us.
```html
<html>
<head>
    <script type="text/javascript">
        async function clickAction() {
            try {
                // extension changed to .xml from .json to cause an error
                const response = await fetch('https://hacker-news.firebaseio.com/v0/item/1.xml');
                if (!response.ok) throw new Error(response.status);
                const resJSON = await response.json();

                const button = document.getElementById('centeredButton');
                button.innerHTML = `Id: ${resJSON.id}`;
            } catch (err) {
                console.error(`Failed to fetch data; ${err}`);
            }
        }
    </script>
    <title>Selenium Test Web page</title>
</head>
<body>
    <h1 style="text-align: center;">Test Automation Notes #01</h1>
    <button id="centeredButton" onclick="clickAction()"
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Click Me</button>
</body>
</html>
```

In case you don't parse & render HTML automatically in your brain, this is just a single button centered on a page. Upon clicking it, it will call the `clickAction()` function. This in turn will call an actual REST API via `https://hacker-news.firebaseio.com/v0/item/1.xml` and display the id from the response as the button text. Or die trying. And since the URL is malformed, it will give us a failure to investigate in our test.

For the web server, a quick `express.js` setup will do the job.

```js
const express = require('express')
const app = express()
const port = 8080


app.get('/', (req, res) => {
  // serve the index.html file from the public folder
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

To run it (assuming you've installed the dependencies), execute:

```sh
node server.js
```

Now you can check `localhost:8080` to see if the web server works.

### Test execution

The test is implemented as follows:
```js
  it('should open a page', async function () {

    await driver.get('http://localhost:8080/');

    const button = await driver.findElement(By.id('centeredButton'));
    await button.click();

    await driver.wait(until.elementTextIs(button, 'Id: 1'), 10000);

  });
```

It will fail on the `.wait(until.elementTextIs` part and print out the logs from the browser that we requested.


To start the test run:
```sh
npx mocha
```
> **Note:** You need to have a chrome driver installed & available in your PATH in order to run it locally.

When the test fails, you should see the chrome logs in the console output, like this:
```js
NETWORK request ID: 21048.3, {
  "message": {
    "method": "Network.responseReceived",
    "params": {
      "frameId": "0AE13AE102E308885BDA1DED3ABED88C",
      "hasExtraInfo": true,
      "loaderId": "DEA94C74A058E462A91D4BC0FE52A56B",
      "requestId": "21048.3",
      "response": {
        "alternateProtocolUsage": "unspecifiedReason",
        "connectionId": 48,
        "connectionReused": false,
        "encodedDataLength": 252,
        "fromDiskCache": false,
        "fromPrefetchCache": false,
        "fromServiceWorker": false,
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Connection": "keep-alive",
          "Content-Length": "9",
          "Content-Type": "text/plain",
          "Date": "Fri, 30 Dec 2022 15:48:51 GMT",
          "Server": "nginx",
          "Strict-Transport-Security": "max-age=31556926; includeSubDomains; preload"
        },
        "mimeType": "text/plain",
        "protocol": "http/1.1",
        (...)
        "securityState": "secure",
        "status": 404,
        "statusText": "Not Found",
        "timing": {
          "connectEnd": 222.938,
          "connectStart": 44.137,
          "dnsEnd": 44.137,
          "dnsStart": 0.362,
          "proxyEnd": -1,
          "proxyStart": -1,
          "pushEnd": 0,
          "pushStart": 0,
          "receiveHeadersEnd": 364.161,
          "requestTime": 874645.684606,
          "sendEnd": 223.12,
          "sendStart": 223.02,
          "sslEnd": 222.931,
          "sslStart": 63.345,
          "workerFetchStart": -1,
          "workerReady": -1,
          "workerRespondWithSettled": -1,
          "workerStart": -1
        },
        "url": "https://hacker-news.firebaseio.com/v0/item/1.xml"
      },
      "timestamp": 874646.049903,
      "type": "Fetch"
    }
  },
  "webview": "0AE13AE102E308885BDA1DED3ABED88C"
}
```

There are a lot of details in the network log! But believe me - it can be put to good use. Functional side apart, this could also be used to identify network/connection issues that might be happening.


```js
------------------
 Browser console errors:
------------------
SEVERE message: http://localhost:8080/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)

SEVERE message: https://hacker-news.firebaseio.com/v0/item/1.xml - Failed to load resource: the server responded with a status of 404 (Not Found)

SEVERE message: http://localhost:8080/ 13:24 "Failed to fetch data; Error: 404"
```

Browser console logs, apart from the exceptions thrown, also provide a short summary of the failed REST API calls. At least the URL and the faulty response code.

Looks like it works! That brings us to the end of the post. Thank you for reading!