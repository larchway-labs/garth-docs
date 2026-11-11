---
title: Budgets and alerts
description: How budgets stack, what happens at the limit, and spending alerts for the organization, people and projects.
---

The gateway meters every model call: tokens in and out, priced at the model's
rates on [Models](../models/). Budgets and alerts read that meter. Figures are
US dollars.

## Budgets

Every budget is a daily figure, a monthly figure, or both. Days run midnight to
midnight UTC; months are calendar months. Empty means no limit.

| Budget | Set on | Covers |
|---|---|---|
| **Organization** | Admin → Settings → Spending | All model spend together |
| **A person's own** | Admin → People → **Set budget…** | One person's spend |
| **A group's member budget** | The group's page → **For members** | Each member without their own |
| **Each person (default)** | Admin → Settings → Spending | Everyone without their own or a group's |
| **A project's** | The project's settings → **Agent and spending** | Everyone's spend on that project together |

For one person, Garth uses the first that applies: their own budget, then the
**largest** member budget across their groups, then the default. The
organization's and the project's budgets apply on top.

## At the limit

**Admin → Settings → Spending → At the limit** decides what happens when a
person, a project or the organization reaches a daily or monthly budget:

| Choice | What happens |
|---|---|
| **Warn** (default) | The person and administrators are told; sessions keep working |
| **Stop model calls** | New model calls are refused, and so are new sessions, until the day or month turns or the budget is raised. The refusal says which budget was reached |

**Admin → Overview** lists active people at 80% or more of their monthly
budget under **Needs attention**.

## Spending alerts

**Admin → Spending alerts** holds lines on spending. People can also set alerts
on their own spending from Your usage; those tell only them.

**New alert** asks for:

| Part | Choices |
|---|---|
| **Watching** | The organization, each person (checked for every person separately), one person, or one project |
| **Figure** | **Spend this month**, **Spend today**, **Spending rate** (dollars an hour), or **One session's cost** |
| **Line** | An amount in dollars, or a percentage of the budget, above 0 and up to 500% |
| **Tell them** | Administrators, the person, or both |
| **How** | **In Garth**, **Email**, **Slack** — at least one, with an optional Slack channel |

A percentage needs a budget: it is offered for spend this month or today, and
not for a project, a rate or a session. An alert on the organization or a
project tells administrators.

Alerts are checked every minute against the meter. An alert fires once when its
figure crosses the line, and again only after the figure has dropped back
below it.

Filter the list by **Organization**, **People** or **Projects**. Alerts over the
line are flagged at the top and on Admin → Overview. **Recently fired** lists
every time an alert crossed its line and who it told.

Email and Slack need [Email and Slack](../email-and-slack/) set up. Until then,
an alert that asks for them is shown in Garth only.

## Seeing spend

See [Monitoring](../../operate/monitoring/) for the live figures on Overview,
Live sessions and Costs.
