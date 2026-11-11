---
title: The session page
description: The conversation with the agent, the header above it, the panel beside it, and how to switch models and make room in the context.
---

A session page has three parts: a header strip, the conversation on the left,
and a panel of tabs on the right. On a narrow screen the panel sits below.

## The header

From left to right:

- **The project's name** — back to the project page.
- **Your branch**, such as `session/dana/a1b2c3`.
- **The state**:

  | State | Means |
  |---|---|
  | **Starting** | The sandbox is coming up, or the agent is starting. |
  | **Idle** | Ready for your next message. |
  | **Working** | The agent is on a turn. |
  | **Disconnected** | Your browser lost the sandbox. It reconnects on its own. |
  | **Open elsewhere** | Another tab or window has this session. |
  | **Paused** / **Ended** | See [Pausing and ending](../pausing-and-ending/). |

- **Who is here**, when you have [shared the session](../../sharing/sharing-a-session/).
- **The model menu**, such as **Claude Haiku 4.5**.
- **What the session has cost so far.** Choose it to open **Usage**.
- **Terminal**, to open a shell below the conversation. See
  [The terminal and files](../terminal-and-files/).
- **Merge into main**, on a project hosted in Garth. See
  [Committing and merging](../changes-and-merging/).
- **⋯** — **Browse main**, **Share session…**, **Pause session** and **End
  session…**.

## Talking to the agent

Type in the box at the bottom and press **Enter**. **Shift+Enter** starts a new
line. **↑** brings back an earlier message from this session, and **↓** walks
forward again, as in a shell.

The paper clip attaches files: they are uploaded into `uploads/` in the
workspace and named in your message, so the agent can open them.

While the agent works:

- What you type **steers** it. It reads your message after its current step.
- **Stop** halts the turn.
- Each command it runs appears as a row with the tool's name. Choose the row to
  see the arguments and what it printed. A failed one is marked **Failed**.
- **Thinking**, where the model shows it, is folded away. Choose it to read.

If the model ends a turn with no reply at all, Garth says **The model ended its
turn without a reply**. Send the message again, or switch model.

## The panel

| Tab | What it is for |
|---|---|
| **Changes** | What is uncommitted, **Commit and push**, and when work was last saved. |
| **Files** | The sandbox's working copy, uncommitted changes included. |
| **Preview** | An app the agent is running in the sandbox. See [Previewing an app](../previews/). |
| **Toft** | Deploying as you. See [Deploying to Toft](../../toft/deploying/). |
| **Usage** | This session's cost, tokens and calls, and your month so far. |
| **Instructions** | What the agent is told to follow. See [What the agent reads](../../projects/what-the-agent-reads/). |

## Switching model

Open the model menu in the header. Each model shows its price per million
tokens in and out, or **Free**. The switch takes effect on your next message;
the conversation carries on with the new model.

A model marked **Limited to some groups. Ask for access** is one you cannot use
yet. Choosing it asks the administrators for it; they give access by adding you
to one of its groups.

Your default — the model new sessions start on — is under
[Your profile → Agent](../../account/your-profile/#agent). A project's owner can
set one for the project instead.

## The context meter

Under the message box, **Context** shows how full the model's context window
is. Near the top the agent summarizes on its own. Choose the meter to do it
yourself:

- **Summarize the earlier conversation** — the agent condenses what came before
  and carries on.
- **Start a new conversation…** — the agent forgets this conversation and starts
  again from `AGENTS.md` and the project's memory. The workspace, the branch and
  your commits stay as they are.

## Over budget

If a budget is spent, the page says **Over budget — the agent has stopped**. Your
workspace, branch and conversation are kept. You can still commit, push, merge
and use the terminal. The agent works again when the budget resets or an
administrator raises it; choose **Try again** then. See
[Usage and budgets](../../account/usage/).

## One tab at a time

A session is driven from one browser tab. Open it in a second tab and the first
says **This session is open in another tab or window, which now drives it.**
Choose **Use it here** to take it back.
