---
title: Pausing, ending and past sessions
description: What happens when a session pauses, how to resume it, what ending one keeps and loses, and reading a session after it ends.
---

A session is **running**, **paused** or **ended**. You have at most one live
(running or paused) session per project.

## Pausing

A paused session gives its sandbox back. Nothing runs and nothing is spent. The
workspace is kept: the clone on your branch, uncommitted changes, and the
conversation.

A session pauses:

- **When you choose ⋯ → Pause session.**
- **When it is idle.** Five minutes before, the page says *This session pauses
  in 5 minutes to stop spending*. Choose **Keep working** to stay. Your
  administrator sets how long counts as idle. A session does not pause while the
  agent is on a turn.

## Resuming

Open the session — from the project's **Resume your paused session**, or from
**Sessions** — and choose **Resume session**. It usually takes under half a
minute: a new sandbox picks up the same workspace, and the agent continues the
conversation where it was.

Anything that was running — a dev server, a long command — has to be started
again, and packages are installed again.

## The longest a session may run

Your administrator sets a limit on how long a session may exist, counted from
when it started. A session past it ends instead of resuming. What it pushed stays
on its branch, and Garth keeps its unpushed work on a branch too; the message
names it.

## Ending

Choose **⋯ → End session…**, on the session page or on its row under
**Sessions** or the project's **Sessions** tab.

| Goes | Stays |
|---|---|
| The sandbox and its workspace | Everything pushed to the branch — you can still merge it |
| Changes that were never pushed | The transcript, readable under **Ended** |
| The agent's ability to pick up the conversation | What the session spent, in usage |

Push first if there is anything you want to keep. The dialog warns you when there
are unpushed changes.

You can end your own sessions. A project's owner and administrators can end
anyone's.

After ending, **Start a session** on the project begins a fresh one from the
default branch.

## The Sessions page

**Sessions** in the header lists yours on every project.

- **Active** — running and paused, with model, start and cost. Choose a row to
  open it; **⋯** has **Open the project** and **End session…**.
- **Ended** — the last ones that ended. Each opens as its transcript.

## Past sessions

An ended session opens read-only as **Past session**: the whole conversation,
with each command and what it printed. Beside it, a summary — who, the branch,
when and for how long, the model, the cost, and the **Outcome**:

| Outcome | |
|---|---|
| **Merged** | The branch was merged. |
| **Pull request opened** | With a link to it. |
| **Pushed, not merged** | The branch is there to merge. |
| **Nothing pushed** | |

Anyone with access to the project can read its past sessions, from the
project's **Sessions** tab.

## Deleting a past session

**⋯ → Delete session…** on an ended session deletes its transcript and takes it
off the lists. What it spent stays in usage. Its branch stays unless you tick
**Delete its branch too** — then anything on it that was not merged is lost.
