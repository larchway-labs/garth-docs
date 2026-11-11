---
title: Your profile
description: Your name and email, git identity, time zone, default model, personal instructions, git host and Toft connections, and where you are signed in.
---

Choose your avatar, top right, then **Your profile**. It has four tabs.

| Tab | What it holds |
|---|---|
| **Overview** | Your name and email, your git identity, your time zone. |
| **Agent** | Your default model, budget warnings, personal instructions. |
| **Connections** | Where you deploy on Toft, and your git host accounts. |
| **Security** | Where you are signed in, and how. |

## Overview

### About you

- **Name** — how teammates see you on projects and sessions.
- **Email** — where budget warnings go.

### Git identity

The name and address on the commits your sessions make.

- **Author name** — the name on your commits.
- **Author email** — use the address your git host knows, so commits link to
  your account there.

Choose **Save changes** when you have edited either section.

### Time zone

Every date and time in Garth is shown in the zone you pick under **Show times
in**:

| Option | Shows times in |
|---|---|
| **Garth's default** | The zone your administrators chose for the install — or, if they chose none, this browser's. The option names which. |
| **This browser** | Whatever zone the browser you are using is set to. Follows you as you travel. |
| **UTC** | UTC. |
| **Another zone…** | A zone you type, such as `Europe/London`. Type a few letters of a city and pick from the list, then choose **Save**. |

The help under it shows the time now in the zone you picked. A choice saves at
once and redraws every time on screen.

Spend charts count days in UTC whatever you choose, and CSV exports stay in UTC.

The panel on the right shows your **Username**, **Role** (**Member** or
**Administrator**), when you joined and when you were last seen.

## Agent

- **Model** — the one your new sessions start on. Administrators choose which
  are offered. A project's owner can set a model for the project instead, and you
  can switch in any session.
- **Budget warnings** — an email at 80% and at 100% of your monthly budget.
- **Personal instructions** — added to every session you start, on every
  project. Only you see them. See
  [What the agent reads](../../projects/what-the-agent-reads/#your-personal-instructions).

## Connections

### Toft

**Deploy to** — the Toft install your sessions deploy to unless you choose another
in a session. See [Deploying to Toft](../../toft/deploying/).

### Git hosts

Your accounts on the git hosts your administrator set up, such as GitHub or
GitLab. A session on a project from one fetches and pushes as you, so what you
may do there is up to the host.

Choose **Connect …** and approve Garth on the host. The row then shows the
account you connected as. **Disconnect** removes it; sessions on that host's
projects cannot push until you connect again.

If the host sent you back with an error, **The connection didn't finish** says
why.

## Security

**Where you're signed in** lists each browser signed in as you, with its address,
when it signed in and when it was last active. **This browser** is the one you
are using.

- **Sign out** beside a browser ends its access at once.
- **Sign out everywhere else…** signs out every browser but this one.

Neither stops your sessions with the agent. They keep running for you to open
from anywhere.

**How you sign in** shows your method — your organization's single sign-on, whose
password and two-factor are managed by your identity provider.
