---
title: Usage and budgets
description: What your sessions spend on models, your daily and monthly budgets, and alerts that tell you when spending passes a line.
---

Every call the agent makes to a model costs money. Garth meters each one as it
finishes. **Usage** in the header shows yours.

## The figures

| Card | |
|---|---|
| **Today** | Spent today, against your daily budget if you have one. |
| **Right now** | What your live sessions are spending an hour. |
| **This month** | Spent this month, against your monthly budget. |
| **Calls this month** | How many model calls, and how many tokens. |

## Exploring your spend

Below the cards:

- Pick a period: **This month**, **Last month**, **7 days**, **30 days**, **90
  days** or **12 months**.
- Split by **Project** or **Model**, and filter to one project or one model.
- The chart shows spend by day — by week for long periods — in UTC. Hover a bar
  for its parts. A dashed line marks your daily budget.
- The table lists each project or model with its spend, calls, tokens and
  sessions. Choose a heading to sort.
- **Month by month** shows up to twelve months with the same filters.
- **Export CSV** downloads the days.

**Recent sessions** at the bottom lists your last sessions with model, tokens and
cost.

A project's **Usage** tab works the same way for everyone's spend on that
project, split by person or model.

## Inside a session

The cost in a session's header is that session so far. Its **Usage** tab adds
input and output tokens, cache reads, model calls, a bar per recent call, and
**Your month** against your budget.

These live figures are the agent's own estimate. The metered figures on **Usage**
replace them.

## Budgets

Your administrators set budgets — for you, for groups you are in, or as a
default. A project can have its own too. Daily budgets reset at midnight UTC.

When a budget is spent, your install does one of two things, as your
administrators chose:

- **The agent stops.** The session says **Over budget — the agent has stopped**.
  Your workspace and conversation are kept; you can commit, push, merge and use
  the terminal. The agent works again when the budget resets or is raised.
- **Sessions carry on**, and you and the administrators are warned.

Turn on **Budget warnings** under
[Your profile → Agent](../your-profile/#agent) for an email at 80% and 100% of
your monthly budget.

## Alerts

Under **Your alerts**, choose **New alert** to be told when your own spending
passes a line.

- **When** — **Spend this month**, **Spend today**, **Spending rate** or **One
  session's cost**.
- **Passes** — an amount, in dollars, or a percentage **of the budget** (for
  monthly and daily spend).
- **Tell them** — **In Garth** (the bell in the header), **Email**, or **Slack**
  with a channel name.

The dialog reads the alert back as a sentence before you create it. Only you are
told. Administrators may watch your spending with alerts of their own.
