---
title: Git hosts
description: Connect GitHub and GitLab so people's sessions fetch and push as them, under the host's own rules.
---

**Admin → Git hosts** lists the GitHub and GitLab this install works with.
Permissions come from the host: each person connects their own account, and
their sessions fetch and push their branch as them. Branch protection, required
reviews and checks there apply as they would to anyone.

Projects hosted only in Garth merge in Garth instead.

## How it works

- Each person connects under **Your profile → Connections**.
- The session image rewrites `https://<host>/`, `git@<host>:` and
  `ssh://<host>/` to Garth's pod listener, so a plain `git clone`, a
  submodule or a module fetch goes through Garth, which adds the person's
  token.
- Fetches are limited to [trusted sources](../trusted-sources/) and the
  project's declared repositories.
- The one push allowed is the session branch to the project's upstream.
- No host API passes through. `gh`, GitHub Packages, private registries and
  release assets that need a token fail rather than ask for one in the pod.
- Every request is in [Activity](../../operate/activity/) with the session that
  made it.

Tokens are kept on the control plane, sealed, and refreshed there.

## Setting up a host

A fresh install lists **GitHub** (`https://github.com`), off. **Add a host**
offers **GitHub Enterprise…** and **GitLab…**.

**Set up…** on a host:

1. Register Garth on the host — a GitHub App or an OAuth app on GitHub, an
   OAuth application on GitLab — with the **Callback URL** the dialog shows:
   `https://garth.example.com/auth/git/<host-id>/callback`.
2. Fill in **Name**, **Address** (`https://…`), **How people connect** (GitHub
   only), **Client id** and **Client secret**. The secret is stored encrypted
   and never shown again.
3. **Save**, then turn the host's switch on. It can't be turned on until its
   client id and secret are set.

Each host shows how people connect, its client, how many projects come from it
and how many people have connected.

## GitHub App or OAuth app

Prefer a **GitHub App**. Its user tokens reach only the repositories the app is
installed on. An **OAuth app**'s token reaches every repository the person can,
to read and write. The page warns while an OAuth app is in use on GitHub.

## Turning a host off

Its projects can't fetch or push as anyone until it is back. Nothing is
deleted.

**Admin → System** has a check for each host that is on: it fails if the host
has no client id and secret.
