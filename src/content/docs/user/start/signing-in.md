---
title: Signing in
description: How you get into Garth, what the messages on the sign-in page mean, and what to do when you cannot get in.
---

Open your Garth address — something like `https://garth.example.com` — and
choose **Sign in with …**. The button names your organization's single sign-on,
which your administrator set up. There is no self-service sign-up and no Garth
password to remember.

After signing in you land on **Projects**, or on the page you were trying to
open.

## Messages you may see

| Message | What it means |
|---|---|
| **Your account is waiting for approval** | Your account exists, but an administrator has to let you in. Choose **Check again** once they have. |
| **You need an invitation** | This install admits only people an administrator added. Ask them. |
| **Your account is suspended** | An administrator turned your account off. |
| **Your session ended. Sign in again.** | Your sign-in expired. Sign in and you return to the same page. |
| **Single sign-on didn't finish** | Your identity provider sent you back with an error. The text under it says why. |

The text under the first three is written by your administrator, so it usually
says who to ask.

## Other ways in

**Sign in as the local administrator** is for administrators, when single
sign-on is broken. You will not need it.

A **Username** box with no password is a development sign-in, used before single
sign-on is set up. Anyone who can reach the page can sign in as anyone, so treat
an install like that as open to everyone who can reach it.

## Signing out

Choose your avatar, top right, then **Sign out**. Signing out ends this browser's
access. It does not stop your sessions with the agent: they keep running, or
pause on their own when idle, and you can open them again from anywhere.

To sign out other browsers, see [Your profile](../../account/your-profile/#security).
