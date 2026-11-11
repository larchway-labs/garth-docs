---
title: Email and Slack
description: How Garth reaches people outside the app — an SMTP relay and a Slack bot, each with a test.
---

**Admin → Email and Slack** is how Garth reaches people outside the app:
spending alerts, account approvals and problems administrators need to know
about. Both are off until set up.
Without them, those are shown in Garth only.

## Email

| Field | Default | Notes |
|---|---|---|
| **Send email** | Off | When off, alerts that ask for email are shown in Garth only |
| **SMTP server** | — | Your relay's host name |
| **Port and security** | `587`, STARTTLS | A port from 1 to 65535; **Connection security** is STARTTLS, TLS or none |
| **User name** | — | Leave empty if the relay needs none |
| **Password** | — | Stored encrypted; never shown again. Leave blank to keep the stored one |
| **From** | `Garth <garth@localhost>` | The sender people see |

**Send test email** sends to the address you enter, or yours. Save first: the
test uses the stored settings. The result stays on the page.

Garth emails:

- a person when their account is approved;
- whoever an alert tells by email;
- administrators, when the [org policy](../settings/#org-policy) can't be read.

Email goes to the address on the person's account. Someone without one gets
nothing by email.

## Slack

| Field | Notes |
|---|---|
| **Post to Slack** | Alerts that ask for Slack post here |
| **Bot token** | A Slack app's `xoxb-` token with `chat:write`. Stored encrypted; leave blank to keep it |
| **Default channel** | Used when an alert names none. Invite the app to it |

**Send test message** posts to the default channel. Once a test passes, the
page shows the workspace's name.

## Checks

**Admin → System → Integrations** shows **Email** and **Slack**: a warning while
one is off, a failure when its last test failed.
