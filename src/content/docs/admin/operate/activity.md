---
title: Activity
description: The audit log — who did what, filtering it, opening a row for its exact time, address and client, and exporting it.
---

**Admin → Activity** is the audit log: sessions, merges, sharing, sign-ins,
what the sandbox was refused, and every administrator's change. Newest first.

## What is recorded

Each event has a time, who did it, an action (such as `session.start` or
`policy.change`), what it was done to, and a detail. Events that came from a
request also record its **IP address** and **client** (the browser's user
agent). What Garth did on its own — pausing an idle session, say — is recorded
as **Garth**.

Some things that are recorded:

- sessions started, paused, resumed and ended;
- merges, imports, sharing, archiving, and every fetch and push through a git
  host, with the session that made it;
- sign-ins, failed local administrator passwords and their address;
- Toft sign-ins for a session;
- changes to settings, models, the sandbox network, trusted sources,
  templates, tags and alerts — a settings change names each field that
  changed;
- people approved, declined, invited, suspended, reinstated or made
  administrators, and group changes;
- `garth local-admin enable` and `disable`, run on the machine.

## Filtering

| Filter | What it narrows to |
|---|---|
| **Search all activity** | Any part of the actor, action, target or detail |
| **Who** | **Everyone**, **Garth (automatic)**, or one person |
| **Project** | One project |
| **Dates** | **Today**, **7 days**, **30 days**, or a **From** and **To** day |
| **What** | **Sessions**, **Projects and git**, **Sign-ins**, **Toft**, **Sandbox and network**, **Settings and models**, **People and groups** — any combination |
| **Hide what Garth did on its own** | Leaves out automatic events |

Dates are days in your [time zone](../../config/settings/#time-zone), midnight
to midnight. The filters live in the page's address, so a view can be
bookmarked or sent to another administrator. **Clear filters** resets them.

The page loads 200 events at a time. **Load older** fetches the next 200.

## Opening a row

Click a row to open it:

| Field | What it shows |
|---|---|
| **Time** | The exact time, to the second, in your zone — with UTC beneath it when your zone isn't UTC. Exports and server logs use UTC |
| **Action** | The action's name |
| **IP address** | Where the request came from, as forwarded by a [trusted proxy](../../install/reverse-proxy/#trusted-proxies) |
| **Client** | The browser and system, such as "Chrome on macOS", with the full user agent beneath |
| **By** | For an event with no request: **Garth, on its own**, or who did it |

Below them is the full detail, unshortened.

Links at the bottom narrow the log to the history of what the row names:
**Everything by** its actor, **Everything about** its target, and **Every**
event with the same action.

## Export

**Export CSV** downloads everything the filters match, up to 5,000 events,
with the columns `at`, `actor`, `action`, `target`, `detail`, `ip` and
`user_agent`. Times are UTC. If there are more, narrow the dates and export the
rest.

## Keeping it

Nothing in Garth's settings deletes activity. It lives in `garth.db`, so a copy
of the data directory carries it.
