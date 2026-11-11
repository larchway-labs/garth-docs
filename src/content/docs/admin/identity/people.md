---
title: People
description: The people list, administrators, suspending, per-person budgets and the email Garth vouches for.
---

**Admin → People** lists everyone who has signed in or been invited: their
status, projects, spend this month, budget and when they were last seen.
Filter by **Active**, **Administrators**, **Suspended** or **Invited**, or
search by name.

Approvals and invitations are on the same page — see
[Who can join](../who-can-join/).

## A person's menu

| Action | Does |
|---|---|
| **Set budget…** | Their own daily and monthly limit. See below |
| **New spending alert…** | An alert on their spending, preset to administrators. See [Budgets and alerts](../../config/budgets-and-alerts/) |
| **Make administrator…** | After a confirmation. Only for an active person |
| **Remove administrator** | At once. You can't remove your own role |
| **Suspend** | They can no longer sign in, and their live sessions end at once with their tokens. You can't suspend yourself |
| **Reactivate** | Lets a suspended person sign in again |

An administrator sees every person's costs and sessions, can stop anyone's
sandbox, and changes models, budgets and settings.

If **Administrators group** is set on [Single sign-on](../single-sign-on/),
membership of that provider group also makes someone an administrator.

## Budgets

**Set budget…** takes **Per day (USD)** and **Per month (USD)**. Empty means
the default: their groups' member budget if any, otherwise the organization's
default on [Settings](../../config/settings/). A day can't allow more than the
month. Days run midnight to midnight UTC.

The **Budget** column shows **Default** when they have none of their own.

## A person's page

Click a name to open their page:

- **This month**, **Today**, **Sessions, 30 days** and **Tokens, 30 days**.
- Their spend, in the same view as Costs.
- **Projects** — their own, their groups', and the ones shared with them.
- **Recent sessions**, each linking to its transcript.
- **Account** — when they joined, last seen, and their budgets.
- **Tags** — their own value of each tag. It comes before their groups'.
- **Groups**, and whether they manage each.

### Email

Toft matches people by email when Garth signs a session in for them. Garth
puts an email in only when it can vouch for it: the identity provider said it
was verified, or an administrator set it here.

Until then the address is their own word, and their sessions sign in to Toft
with a code. Setting it here makes Garth vouch for it. The change is recorded
in Activity.
