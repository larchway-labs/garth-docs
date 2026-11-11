---
title: Monitoring
description: Admin → Overview, Live sessions, Costs and Storage — who is working, what it costs right now, and the disks underneath.
---

## Overview

**Admin → Overview** is who is working, what it costs right now, and the
sandboxes it runs in. It refreshes every 5 seconds.

**Needs attention** appears at the top when any of these is true:

- a [System](../system/) check is failing;
- the [license](../license/) term has ended, or the license is suspended or
  revoked — sessions keep running either way;
- someone is [waiting for approval](../../identity/who-can-join/#approving-people);
- a [spending alert](../../config/budgets-and-alerts/#spending-alerts) is over
  its line;
- an active person is at 80% or more of their monthly budget;
- a disk is 80% full or more.

Below it:

| Figure | What it is |
|---|---|
| **Spending now** | Dollars an hour across live sessions |
| **Today** | Spend today, against the organization's daily budget if set, and how many people were active |
| **This month** | Spend this month, against the organization's monthly budget if set |
| **Sandboxes** | Live sessions, and warm sandboxes waiting |
| **Spend, last hour** | Per minute, as the gateway sees each model call finish |
| **Top spenders today** | Each person's spend today and current rate |

## Live sessions

**Admin → Live sessions** is every sandbox running now: the person, the
project, how long it has run, its CPU and memory, what it is costing now, and
its cost so far. Filter by **Running** or **Paused**, or search by person,
project or pod.

A session's menu:

| Action | What happens |
|---|---|
| **Pause…** | Its sandbox is given back and spending stops. Workspace and conversation are kept; the person can resume. Anything running in it — a dev server, a command — stops |
| **Resume** | Starts a paused session again on a warm pod |
| **End session…** | The sandbox and workspace are deleted, with anything not pushed. The branch and what was pushed stay. Pausing keeps them |

Garth also pauses idle sessions and ends long ones on its own, by the limits on
[Settings](../../config/settings/#sessions).

## Costs

**Admin → Costs** is model spend as the gateway meters it: tokens in and out,
priced at each model's rate.

The spend view:

- **Period** — this month, last month, 7, 30 or 90 days, or 12 months;
- **Split by** group, person, project, model, or any tag marked
  [cost allocation](../../identity/groups-and-tags/#tags);
- **Filter** by project and model;
- the twelve months beside it, and **Export CSV** of the days.

Days are UTC days. A person's spend split by group is divided equally between
their groups, so the groups add up to the whole.

**Per person** lists everyone's spending now, today and this month against
their budgets, sortable by each.

The same view appears for one person on their page, for a project on its
page, and for each person on Your usage.

## Storage

**Admin → Storage** is the disk underneath:

| Section | What it shows |
|---|---|
| **Disks** | Each node disk's use, warning at 80% and in danger at 90% |
| **Running workspaces** | Each running session's workspace on its node, and when its work was last saved |
| **Paused sessions** | The saved work of paused sessions, kept in the project repositories |
| **Project repositories** | Each bare repository on the control plane, its size and branches |
| **Session images** | Images cached on each node |

A running workspace is on its node's own disk. Work in progress is saved to the
repository after each agent turn and every few minutes, so a lost node loses
minutes, not the session. Installed packages and caches like `node_modules`
aren't saved; they reinstall after a resume.

`GARTH_REPO_MAX_BYTES` (2 GiB by default) caps one project's repository.
