---
title: What the agent reads
description: AGENTS.md, memory/ and .pi/ in the repository, your personal instructions, and how a change to them reaches everyone.
---

The agent starts every session knowing nothing about your project except what
it is told. It is told in four layers, broadest first. Each session's
**Instructions** tab lists them.

| Layer | Where it comes from |
|---|---|
| **1. Garth** | Built into the sandbox: how to work there and how to deploy to Toft, with the `toft-cli` and `toft-sdk` skills and `/deploy` and the other Toft commands. |
| **2. Org policy** | A project your administrators chose, shared by every session on the install. **None set** if there is none. |
| **3. This project** | `AGENTS.md`, `memory/` and `.pi/` on the project's default branch. |
| **4. Your own** | Your personal instructions, from **Your profile → Agent**. |

Later layers add to earlier ones. They guide the agent; they do not enforce
anything.

## The project's files

| Path | What it is |
|---|---|
| `AGENTS.md` | The project's instructions: what it is, how to build and test it, what to avoid. |
| `memory/` | Facts the agent keeps, one per file. |
| `.pi/skills/` | Project skills: instructions for a particular kind of task. |
| `.pi/` | Also holds extensions — code the agent loads, which runs in everyone's sandbox. |

They are ordinary files in the repository. Read them under **Files**, or from
the links under **What the agent reads** on the project's **Overview**.

### Memory

Ask the agent to remember something — *Remember that the tests need
`make db` first* — and it writes a file under `memory/`. One fact per file means
two people remembering things at the same time merge cleanly.

A new memory is on your branch only. It reaches your teammates when you merge.

## How a change reaches everyone

Every session follows these files **as they are on the default branch**. A
change on your branch affects your session, and nobody else's, until it is
merged.

Because a merged change steers every teammate's agent — and `.pi/` extensions
run in their sandboxes — Garth does not merge one in a single click. When your
branch changes `AGENTS.md`, `memory/` or `.pi/`, the merge button reads
**Merge into main…** and opens **This merge changes what every agent follows**.
It lists each file with its diff. Tick **I've read these changes, and they're
right for everyone on the project**, then merge.

The project's owner can go further and turn on **Protect instructions** in
[Project settings](../settings/#general): then only the owner merges a branch
that changes these files.

For a project from a git host, these files are reviewed in the pull request
like any other change.

## Your personal instructions

**Your profile → Agent → Personal instructions** are added to every session you
start, on every project. Only you see them. Use them for how you like to work —
*explain before you edit*, *I use pnpm, not npm*.

Keep facts about a project in its memory instead, so your teammates' agents
know them too.

:::caution
If the project has a skill with the same name as one in the org policy, the
agent uses the org's. The **Instructions** tab warns you; rename the project's
skill to use both.
:::
