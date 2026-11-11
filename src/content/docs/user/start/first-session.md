---
title: Your first session
description: Create a project, start a session, ask the agent for something, and put the result on the default branch.
---

This takes about five minutes and ends with a change merged into a project of
your own.

## 1. Create a project

On **Projects**, choose **New project**.

- **Name** — anything; you can rename it later.
- Leave **Import from** empty.
- Under **Start from**, pick **Empty**, or a runtime such as **Python (Flask)**
  for a small working app that deploys to Toft.
- Leave **Share with** empty for now. The project is private to you.
- Keep **Start a session on it now** ticked.

Choose **Create and start a session**.

## 2. Wait for the sandbox

The session page opens and says **Waiting for the sandbox…**, then **Cloning the
project and starting the agent…**. This usually takes a few seconds. When the
status next to your branch name says **Idle**, the agent is ready.

Your branch is named `session/<your-username>/<id>`. Everything you do in this
session happens on it.

## 3. Ask for something

Type in **Ask the agent…** and press Enter. Or pick one of the suggestions
under **Ready to work on …**, such as *Read AGENTS.md and memory/, then tell me
what this project is*.

While the agent works, the status says **Working** and each command it runs
appears in the conversation. Choose a command to see what it printed. You can
type again while it works: your message steers it after its current step.
**Stop** halts it.

## 4. Look at the changes

The **Changes** tab on the right lists every file the agent touched. Choose
**View diff** to read them.

## 5. Commit, push and merge

1. Under the list, leave the commit message empty to use the suggested one, or
   write your own.
2. Choose **Commit and push**. Your branch is now saved in Garth.
3. Choose **Merge into main** (or whatever the default branch is called) at the
   top of the page.

The project's **Overview** now shows your commit under **Recent commits**. Every
new session on the project starts from it.

## 6. Leave

You can simply close the tab. An idle session pauses on its own and resumes when
you open it again. When you are done with it for good, choose **⋯ → End
session…**. See [Pausing and ending](../../sessions/pausing-and-ending/).

## Next

- [Share the project](../../sharing/sharing-a-project/) with a teammate.
- [Deploy to Toft](../../toft/deploying/) by typing `/deploy`.
- Teach the agent about the project: [What the agent reads](../../projects/what-the-agent-reads/).
