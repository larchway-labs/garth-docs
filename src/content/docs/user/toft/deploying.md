---
title: Deploying to Toft
description: Ask the agent to deploy, choose which Toft install it deploys to, sign in to Toft when asked, and follow your linked apps.
---

The agent deploys to Toft with Toft's own command,
`toft`. Garth signs each deploy as you on the way out, so no Toft key is ever
stored in the sandbox. Toft decides what you may do there, just as if you
deployed yourself.

## Asking for a deploy

Type a command in the conversation:

| Command | What the agent does |
|---|---|
| `/deploy` | Deploys this project and gives you the URL. |
| `/fix-deploy` | Reads a failed build's log, fixes the problem, deploys again. |
| `/try-app` | Deploys this branch as a separate new app, to try it without touching the real one. |
| `/toft-status` | Gives the app's URL, state and last deploys. |
| `/toft-logs` | Shows what the running app is logging. |

Or just say it: *deploy this to Toft*. A project made from a
[starter](../../projects/creating/#starting-from-a-starter) is ready to deploy as
it is.

## The Toft tab

The session's **Toft** tab, which only you see in your own session, shows:

- **Deploys go to** — the Toft install the agent deploys to, when your
  administrators have added more than one. Changing it applies at once.
- **Whether you are signed in** to that install.
- **This project's apps** on it — each [linked app](../../projects/settings/#toft-apps)
  with its address, **Deployed**, **Building** or **Build failed**, and when and
  from which branch it last deployed. **Not on Toft yet** means the name is
  linked but no app by that name exists there.

Where your sessions deploy by default is under
[Your profile → Connections](../../account/your-profile/#connections). A project's
first linked app sets it for that project.

## Signing in to Toft

Often there is nothing to do: Garth vouches for you to Toft, and the tab says you
are signed in.

When Toft cannot match you that way, choose **Sign in to …** on the tab.

1. Garth shows a short code, with **Open …** to the install.
2. In your own browser, signed in to Toft as you, approve the code.
3. The tab says you are signed in, and the agent carries on.

The key Toft gives stays with Garth for this session only, and is revoked when
the session ends. Your next session may ask again.

## When deploying is off

| The tab says | Why |
|---|---|
| **No Toft install yet** | An administrator has not added one. |
| **Off while a guest drives** | Someone you [shared the session](../../sharing/sharing-a-session/) with can drive. Deploys resume when they stop. |
| **Session not running** | Resume the session first. |

Every deploy is recorded in Garth's audit log with the session that made it.
