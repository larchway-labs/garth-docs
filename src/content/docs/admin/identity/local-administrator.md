---
title: The local administrator
description: The one account that signs in without an identity provider, turned on and reset only from the machine.
---

The local administrator, **`admin`**, signs in with a password instead of the
identity provider. It is for:

- a first start on a public listener, before single sign-on exists, and
- getting back in when single sign-on is broken.

It is **off** until you turn it on from the machine. That is also the only way
to set its password. Garth keeps only a hash; nothing retrieves the password.

## Commands

Run the `garth` binary on the control plane's machine (or in its pod). It
opens the database directly; the server need not be stopped.

```bash
GARTH_DATA=/path/to/data garth local-admin enable     # prints a generated password once
garth local-admin enable --password-stdin < file       # or set your own
garth local-admin enable --password '…'                 # or pass it inline
garth local-admin status
garth local-admin disable
```

| Command | Does |
|---|---|
| `enable` | Turns it on with a new password and ends the account's existing sign-ins |
| `status` | Says whether it is on, when the password was set, and whether it is locked |
| `disable` | Turns it off and ends its sign-ins. The sign-in route then answers 404 |

`--data` (or `GARTH_DATA`) names the data directory; the default is `.data`.
Each `enable` and `disable` is recorded in [Activity](../../operate/activity/)
as done by `garth local-admin`.

## Signing in

The sign-in page offers **Sign in as the local administrator** under the
single sign-on button. Enter `admin` and the password.

Ten wrong passwords in a row lock the account for 15 minutes. The count is per
account, not per address. Each failure is recorded in Activity with the
address it came from.

## Keeping it safe

- Leave it off when you don't need it. `disable` after a recovery.
- Store the password where your team keeps break-glass credentials.
- Give administrators their own accounts through single sign-on, so Activity
  names people.
