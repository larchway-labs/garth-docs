---
title: Project settings
description: Name and default branch, environment variables and secrets, other repositories, Toft apps, model and budgets, sandbox template, ownership, archiving and deletion.
---

**Settings** is on the project page for its owner — you, or, for a project a
group owns, the group's managers. Everyone else does not see the tab.

Changes apply to sessions started **after** you save. Sessions already running
keep what they started with.

## General

| Field | |
|---|---|
| **Name** | Shown on the project list and in every session. Links keep working: the address uses the project's id. |
| **Description** | One or two lines for the project list. The agent reads `AGENTS.md`, not this. |
| **Protect instructions** | When on, only the owner merges a branch that changes `AGENTS.md`, `memory/` or `.pi/`. |
| **Default branch** | New sessions branch from it, and merges land on it. For a project from a git host, it follows the host and cannot be changed here. |

## Environment

Variables every new session gets in its sandbox, for the agent and the
terminal. Choose **Add variable**.

- **Name** — upper case, such as `OPENWEATHER_API_KEY`.
- **Value** — what it is set to.
- **Secret** — on by default. A secret is stored encrypted and never shown
  again, here or in the activity log.
- **Sent to** — for a secret, the hosts it is for, such as
  `api.openweathermap.org`.

A secret never enters the sandbox. The sandbox sees a placeholder; when a
request goes to one of the hosts you named, Garth puts the real value in on the
way out. So a secret works for an HTTPS API call to a named host, and for
nothing else — not a database connection string, not a key file.

Each host must also be on the sandbox's allowed list, which your administrator
keeps. A secret whose host is not there is marked **Blocked**.

Once a variable is secret it stays secret; to make it plain, remove it and add
it again. To change a secret, choose **⋯ → Replace value…**. Moving it to other
hosts needs the value again.

:::caution
Anyone with access to the project can start a session, and a session can print
its environment. Share a project that has a secret only with people who may
hold it.
:::

## Other repositories

Repositories a session may fetch as you, beyond the sources your administrator
trusts — a shared library, say. Enter one such as
`github.com/your-org/shared-lib` and choose **Add**. Anything not listed is
refused, even if you can read it on the host.

## Toft apps

The Toft apps this project deploys to. Type the app's name on Toft and choose
**Link app** (pick the install first if there is more than one). The first link
also sets the install the project's sessions deploy to.

A linked app shows its address and last deploy in each session's **Toft** tab,
and **Open in Garth** on the app's page in Toft opens this project. See
[Opening a project from Toft](../../toft/open-in-garth/).

## Agent and spending

| Field | |
|---|---|
| **Model** | **Each person's default**, or one model every session here starts on. People can still switch in a session. |
| **Monthly budget (USD)** | Everyone's spend on this project together. Empty for none. |
| **Daily budget (USD)** | Resets at midnight UTC. Empty for none. |

The note under them says what happens at a limit on your install: either
sessions here stop calling the model until the period resets, or they carry on
and you and the administrators are warned. These are on top of each person's
own budgets.

## Sandbox template

The image every new session on this project starts from, with its CPU, memory
and disk. Your administrator decides which templates exist.

## Ownership

Transfer the project to a group you manage. The group's managers become its
owners; sessions and branches are unchanged. You keep access, but you cannot
take ownership back yourself. Type the project's name to confirm.

To hand a project to a group you do not manage, ask one of its managers to make
you a manager first. See [Groups](../../sharing/groups/).

## Archive

**Archive project** puts it away: it leaves everyone's project list, stays
readable with all its branches, and takes no new sessions. It cannot be archived
while a session on it is running. **Unarchive** brings it back.

Your administrators may also archive projects nobody has used for a long time.

## Danger zone

**Delete project…** removes the repository, every branch and every session, for
everyone it is shared with. Live sandboxes are stopped. Type the project's name
to confirm. This cannot be undone.
