---
title: Settings
description: Admin → Settings — the org policy, spending, sessions, time zone, the warm pool and what people may create.
---

**Admin → Settings** is how Garth behaves. Switches and choices save at once.
Numbers save together: change several, then **Save changes** in the bar at the
bottom, or **Discard**. Every change is recorded in
[Activity](../../operate/activity/) with what changed.

Settings are kept in the database. Only what Garth needs before its database
opens, or to reach its infrastructure, is an environment variable — see the
[environment reference](../../reference/environment/).

## Org policy

A baseline every session follows: prompt text, skills and commands, kept in
`policy/base/` of one project.

- **Policy project** — a project hosted in Garth, or **None**.
- In it: `policy/base/SYSTEM.md`, `policy/base/skills/` and
  `policy/base/prompts/` (commands, run as `/name`).
- Only the project's owner merges changes to `policy/`, after reading them.
  Everyone can read it.
- The section shows the commit new sessions get, the last change and what is
  in it.

To change the policy, work in a session on that project and merge. If
`policy/base/` can't be read, the section says **Sessions can't start** —
fix it, or set the policy project to **None**. The policy project can't be
archived while it is chosen.

The policy guides the agent. The sandbox and its network rules are what
enforce.

## Spending

| Setting | Unit | Default |
|---|---|---|
| **Each person, per day** | USD/day | None |
| **Each person, per month** | USD/month | None |
| **Organization, per day** | USD/day | None |
| **Organization, per month** | USD/month | None |
| **At the limit** | **Warn** or **Stop model calls** | Warn |

Empty means no limit. Days run midnight to midnight UTC; months are calendar
months. See [Budgets and alerts](../budgets-and-alerts/).

## Sessions

| Setting | Range | Default | What it does |
|---|---|---|---|
| **Pause when idle** | 5 minutes to a day | 60 minutes | No messages, agent work or terminal input for this long: the sandbox goes, the workspace stays. Resuming takes under half a minute |
| **Longest session** | 1 hour to 2 weeks | 12 hours | Ended after this, idle or not. Its work is saved first |
| **Live sessions per person** | 1 to 50 | 3 | Across all projects. Paused sessions don't count. A person always has at most one per project |

## Time zone

**Show times in** — the zone dates and times are shown in for everyone who
hasn't chosen a zone of their own on their profile.

- **Empty** (the default): each person's browser.
- **UTC**, or an IANA name such as `America/New_York` or `Europe/London`. The
  field suggests names as you type and shows the time there now.
- `Local` is refused: it would be the server's zone. Name one instead.

Press **Save** or Enter. Your own pages follow it too, unless you chose a zone
on your profile.

A person's choice on their profile comes first; they can also pick **This
browser**. Exports stay in UTC whatever the zone, and an
[Activity](../../operate/activity/) row shows UTC beside the local time.

## Sandbox

| Setting | Range | Default |
|---|---|---|
| **Warm sandboxes** | 0 to 10 | Empty: the size the pool was deployed with |

Idle sandboxes kept ready, so a session starts in seconds. Each holds its
memory while it waits. A new size takes effect at once. Garth keeps it: if the
cluster's pool differs — a manifest applied again resets it — Garth puts it
back.

The image, network and package installs are on
[Sandbox and network](../sandbox-and-network/).

## Projects

| Setting | Default | What it does |
|---|---|---|
| **Terminal in sessions** | On | A shell in the session's sandbox, beside the agent. It reaches nothing the agent can't |
| **Who can create groups** | Everyone | **Everyone** or **Administrators** |
| **Private projects** | On | When off, every new project is shared with everyone |
| **Importing from git** | — | Set on [Trusted sources](../trusted-sources/) |

## Sign-in

A summary: whether single sign-on is set up and the local administrator is
on, with a link to [Single sign-on](../../identity/single-sign-on/). While
development sign-in is on, it says so in a warning.

## More settings

Lists kept on pages of their own: [Models](../models/),
[Sign-in](../../identity/single-sign-on/), [Toft installs](../toft-installs/),
[Trusted sources](../trusted-sources/), [Git hosts](../git-hosts/) and
[Email and Slack](../email-and-slack/).
