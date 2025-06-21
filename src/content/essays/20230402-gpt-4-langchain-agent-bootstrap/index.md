---
title: "GPT-4 Langchain Agent bootstrap - making first baby steps in the GenAI era"
date: '2023-04-02'
description: "The author shares his experience using GPT-4 to create a simple application using Python, Flask, React, and Typescript. He emphasizes the importance of embracing AI technology early on to stay relevant in the GenAI era."
category: Essays
image: deep-work-book-report/promo.png
draft: false
tags:
  - blog
  - business
author:
  - cogitovirus
---

## Introduction

The last couple of days felt surreal.

I still can't get over how suddenly the new zeitgeist of our times has appeared.

On March 14, 2023, the GPT-4 model was released to the public by OpenAI. This new model **excels** at tasks that require advanced reasoning, complex instruction understanding, and more creativity. Three days later, an early research paper was published, revealing the model's potential impact on the economy and labor market [[1]](https://openai.com/research/gpts-are-gpts). One of the conclusions of the research paper was that:

> "Our analysis indicates that approximately 19% of jobs have at least 50% of their tasks exposed to LLMs when considering both ?current model capabilities and anticipated LLM-powered software."

To put that into perspective, North America has around 228 million workers (152M US, 19M Canada, and 57M Mexico). European Union has 227.4 million people in the labor market. That's a total of 455.4 million people. 19% of that is 86.5 million people.

86.5 million people in North America and European Union would have at least 50% of their tasks exposed to LLMs.

That's disruption on a scale that we haven't seen for a long time.

Give yourself a moment to let that sink in.

## Realization

Generative AI is here to stay. It drastically changes the way we live and work. In his recent article, Bill Gates stated that the age of AI has begun. [[2]](https://www.gatesnotes.com/The-Age-of-AI-Has-Begun) Andrew Ng, another prominent AI researcher, cleverly noted that everyone alive today is part of Generation AI. [[3]](https://www.deeplearning.ai/the-batch/issue-190/)

On the other hand, Ilya Sutskever, one of the co-founders of OpenAI, lets his __ loose and talks about the mind-bending future of AI systems. A definitely recommended watch. [[4]](https://youtu.be/Yf1o0TQzry8)

I am a massive supporter of singularity. Growing up reading The Technopriests (Jodorowsky, Janjetov & Beltran) or The Metabarons (Jodorowsky, Giménez) shaped my perspective on technological advancement. I'm excited to see the future unfold before my eyes.

And I want to be part of it.

But let's not get ahead of ourselves with talks about the distant future. Instead, let's ground our feet in the present and take the first step toward becoming an AI Engineer.

## Taking the first step

I will walk you through the process of creating a simple application that uses the [LangChain Library](https://docs.langchain.com/docs/) to connect to a local database and generate answers to questions (posed by the user) about the data in the DB. Keep in mind that the AI model doesn't know what data might be in there; it just 'figures it out' by having `Thoughts` and `Observations` and making `Actions` with SQL queries. This itself should be a huge eye-opener.

The finished prototype of my project is available on my [github page](https://github.com/cogitovirus/langchain-sql-agent-bootstrap).

As crazy as it is, the final effect is not mind-blowing. It's a giant leap forward, but it's just the beginning. Unfortunately, I only have API access to the `gpt-3.5-turbo` model, so the answers are not even as good as they could be with `gpt-4`, that's in closed beta. The Langchain library is also still in its infancy, but I'll watch its development closely with flushed cheeks.

Here's a sample output from an agent. The posed question was: `what is the name of the customer with the most orders?`

```
> Entering new AgentExecutor chain...
Action: list_tables_sql_db
Action Input: ""

Observation:
payments, sqlite_sequence, customers, orders

Thought:
I should query the orders table to find the customer with the most orders.
Action: query_checker_sql_db
Action Input: "SELECT customerNumber, COUNT(*) as num_orders FROM orders GROUP BY customerNumber ORDER BY num_orders DESC LIMIT 1"

Observation:
SELECT customerNumber, COUNT(*) as num_orders FROM orders GROUP BY customerNumber ORDER BY num_orders DESC LIMIT 1

Thought:
This query looks correct, I should execute it to get the answer.
Action: query_sql_db
Action Input: "SELECT customerNumber, COUNT(*) as num_orders FROM orders GROUP BY customerNumber ORDER BY num_orders DESC LIMIT 1"

Observation:
Error: (sqlite3.OperationalError) no such column: customerNumber
[SQL: SELECT customerNumber, COUNT(*) as num_orders FROM orders GROUP BY customerNumber ORDER BY num_orders DESC LIMIT 1]
(Background on this error at: https://sqlalche.me/e/14/e3q8)

Thought:
I made a mistake in my query, I should check the schema of the orders table to see what column I should use.
Action: schema_sql_db
Action Input: "orders"

Observation:
CREATE TABLE orders (
    id INTEGER,
    user_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES customers (id)
)
/*
3 rows from orders table:
id  user_id order_date  status
1   1   2018-01-01  returned
2   3   2018-01-02  completed
3   94  2018-01-04  completed
*/

Thought:
The orders table does not have a customerNumber column, but it has a user_id column which references the customers table. I should join the two tables to get the customer with the most orders.
Action: query_checker_sql_db
Action Input: "SELECT customers.customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id GROUP BY customers.customerName ORDER BY num_orders DESC LIMIT 1"

Observation:
SELECT customers.customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id GROUP BY customers.customerName ORDER BY num_orders DESC LIMIT 1

Thought:
This query looks correct, I should execute it to get the answer.
Action: query_sql_db
Action Input: "SELECT customers.customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id GROUP BY customers.customerName ORDER BY num_orders DESC LIMIT 1"

Observation:
Error: (sqlite3.OperationalError) no such column: customers.customerName
[SQL: SELECT customers.customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id GROUP BY customers.customerName ORDER BY num_orders DESC LIMIT 1]
(Background on this error at: https://sqlalche.me/e/14/e3q8)

Thought:
I made another mistake in my query, I should check the schema of the customers table to see what column I should use.
Action: schema_sql_db
Action Input: "customers"

Observation:
CREATE TABLE customers (
    id INTEGER,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    PRIMARY KEY (id)
)
/*
3 rows from customers table:
id  first_name  last_name
1   Michael P.
2   Shawn   M.
3   Kathleen    P.
*/

Thought:
The customers table does not have a customerName column, but it has first_name and last_name columns. I should concatenate these columns to get the customer name.
Action: query_checker_sql_db
Action Input: "SELECT first_name || ' ' || last_name as customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id GROUP BY customerName ORDER BY num_orders DESC LIMIT 1"

Observation:
SELECT first_name || ' ' || last_name as customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id WHERE orders.user_id IS NOT NULL GROUP BY customerName ORDER BY num_orders DESC LIMIT 1

Thought:
This query looks correct, I should execute it to get the answer.
Action: query_sql_db
Action Input: "SELECT first_name || ' ' || last_name as customerName, COUNT(*) as num_orders FROM orders JOIN customers ON orders.user_id = customers.id WHERE orders.user_id IS NOT NULL GROUP BY customerName ORDER BY num_orders DESC LIMIT 1"

Observation:
[('Rose M.', 5)]

Thought:
The customer with the most orders is Rose M.
Final Answer: Rose M.

> Finished chain.
```

I don't know how about you, but I find the above snippet more entertaining than the entire "The Last of Us" Netflix series.

This process still needs improvement. It's far from perfection. With more complex queries, it will fail; it might get stuck in a loop of asking nonsensical questions, spending my credits like a drunken sailor. But it's a start.

Now for the process of creating the app itself. If the first part raises your eyebrow, this one will also get the second one up.

This is where the fun part actually begins.

## The creation process

~95 % of the application code was generated by GPT-4.

Experiencing this for the first time felt crazy. If you are a seasoned developer, I have one piece of advice for you.

Forget that you know how to code for a second and just let it do its thing. Just ask questions. See what it comes up with. Then, slowly funnel it down into actions you can execute.

If something fails? Post the whole error stack back. Want to apply a change or an improvement to the existing code? Paste the entire file and ask for modifications. The stuff it can do is mental.

The created application uses Python with Flask on the backend and React with Typescript on the front.

I've never used those libraries before in my life.

Sure, you still need expert knowledge (to ask pertinent questions); otherwise, you will end up with a suboptimal solution (something we'll touch on in future posts). But how this will change how we write/explain code is, again - just mind-blowing.

Writing the same application would probably take me a week of free time without it. To investigate every little problem, figure out how to plug in socket-io, understand the usage of SQLAlchemy or Marshmallow libraries, etc.

With GPT-4, for the backend part, it took me around 2 hours to write it from scratch based on the clearly defined requirements.

## Closing thoughts
AI is here to stay. It's going to reshape the world.

From the bottom of my heart, I encourage you to embrace this technology early on if you don't want to be left behind.
Remember that Humans will stay in the driver's seat. We will still be the ones who will be asking the questions. We will still be the ones who will be making the decisions.

This new era of GenAI poses its own challenges. The skills required to produce previously unattainable results might be worth pennies in a few years. Digital technologies will be more about creativity and critical thinking than pure coding skills.
Systems thinking will reach its renaissance. As a result, the ability to architect intelligent systems will be in high demand.

I invite you to join me on a journey to uncover the secrets of the current age.

## Notable references
**[1]** GPTs are GPTs: An early look at the labor market impact potential of large language models https://openai.com/research/gpts-are-gpts

**[2]** The Age of AI has begun https://www.gatesnotes.com/The-Age-of-AI-Has-Begun

**[3]** The Batch - Issue 190 https://www.deeplearning.ai/the-batch/issue-190/

**[4]** Ilya Sutskever - Building AGI, Alignment, Spies, Microsoft, & Enlightenment https://youtu.be/Yf1o0TQzry8