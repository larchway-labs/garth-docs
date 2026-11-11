---
title: License
description: Admin → License — storing a key, what the license service is told, the verdicts, and why none of them stops anyone.
---

**Admin → License** is what this install is entitled to and until when, and
the open-source software its sessions run.

:::note[Checked, not enforced]
No verdict stops a session, refuses a person or locks a setting. An install
with no key, or an expired one, keeps working.
:::

## Storing a key

**Add a license key**, then paste the key you were sent. Garth keys start
`WKBN1-`. Case, hyphens and spaces don't matter. A Toft key is refused.

Storing a key sends nothing. Garth checks in shortly after, or at once with
**Check now** (at most once a minute). **Replace the license key** swaps it;
**Remove key…** makes the install unlicensed and stops it checking in.

## Checking in

Garth checks in with the license service about once a day, and an hour after a
failed attempt. It sends the key, the install ID, Garth's version and seat
counts — nothing named. `GARTH_LICENSE_URL` points it at another `https://`
endpoint.

It keeps the last answer through any failure. If the service hasn't answered for
longer than its last answer said to believe it, the page says so and the
administrators get one notice in the bell.

## What the page shows

| Field | What it is |
|---|---|
| **Licensed to** | The licensee and plan |
| **Term** | Through which day, or **No end date** |
| **People** | Everyone who signed in during the last 30 days, against the seats. Not enforced |
| **Installs** | Installs active on this license, against its limit |
| **Entitlements** | What the license includes. Something it doesn't include stays readable where it is already set up |
| **Open-source notices** | Software the session image redistributes, and its license |
| **Install ID** | Quote it to support; a license is issued against it. It isn't a secret |

The status is one of **No license**, **Not checked yet**, valid, **In grace**,
**Suspended**, **Revoked**, or **Not recognized** (the service doesn't know the
key). When the term has ended or the license is suspended or revoked,
Admin → Overview says so under **Needs attention**, adding that sessions keep
running either way.
