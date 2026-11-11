---
title: First run
description: From a fresh start to single sign-on, a default model and a team that can sign in.
---

This is the order that works. Install first — see
[One k3s box](../../install/single-node/) or
[A cluster](../../install/cluster/).

## 1. Get in

A fresh Garth has no identity provider. Two ways in need none:

- **The local administrator.** On the machine, run
  `garth local-admin enable`. It prints a password once. See
  [The local administrator](../../identity/local-administrator/).
- **Development sign-in.** Start Garth with `GARTH_DEV_SIGN_IN=1` on a
  loopback UI listener and reach it through an SSH tunnel. Anyone who reaches
  the page signs in as any username, so keep it on loopback.

Use the local administrator when Garth is already behind a public address.

## 2. Sign in over https

Garth learns its **public address** the first time an administrator signs in
over https. It is not configured anywhere else. Toft and identity tokens use
it, so sign in once through your reverse proxy, not the tunnel. See
[Reverse proxy and address](../../install/reverse-proxy/).

## 3. Set up single sign-on

On **Admin → Sign-in**:

1. Register Garth with your identity provider. Use the **Redirect URI** the
   page shows: `https://garth.example.com/auth/callback`.
2. Paste the **Issuer URL**, **Client ID** and **Client secret**. Save.
3. Press **Test the connection**.
4. Turn on **Sign in with …**.

Then restart Garth without `GARTH_DEV_SIGN_IN`. See
[Single sign-on](../../identity/single-sign-on/).

## 4. Choose who can join

Still on **Admin → Sign-in**, set **Who can join**: anyone who signs in,
approval, or invite only. See [Who can join](../../identity/who-can-join/).

## 5. Check the models

**Admin → Models** starts with Claude Haiku 4.5 on Amazon Bedrock as the
default. The AWS account must be granted that model in Bedrock. Add others, or
OpenRouter. See [Models](../../config/models/).

## 6. Set limits

On **Admin → Settings**, set budgets, how long sessions live and the time zone
times are shown in. See [Settings](../../config/settings/).

## 7. Decide what may come in and go out

- **Admin → Trusted sources**: which repositories may become projects.
- **Admin → Sandbox**: where sandboxes may connect.
- **Admin → Git hosts**: GitHub and GitLab, so people connect their accounts.
- **Admin → Toft installs**: where sessions deploy.

## 8. Open Admin → System

Every check should pass or say why not. Fix what fails before you invite
people. See [System](../../operate/system/).
