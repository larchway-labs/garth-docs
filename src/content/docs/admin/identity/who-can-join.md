---
title: Who can join
description: Open, approval or invite only; the approval queue, invitations, and the messages people see at the door.
---

**Who can join** decides what happens the first time someone signs in. It is
on **Admin → Sign-in** and saves the moment you choose. Accounts that already
exist are unaffected.

| Choice | What a newcomer gets |
|---|---|
| **Anyone who signs in** | An account at once. The default |
| **Approval** | They can sign in, see a message, and wait in **People → Waiting for approval** |
| **Invite only** | Only people invited on People can join. Anyone else is turned away with a message |

Someone invited by email always gets in, whatever the choice. So does someone
already named in Garth before they first signed in — added to a group or
shared a project by username.

Everyone who joins is put in the **Everyone** group.

## Approving people

While anyone is waiting, **Admin → People** opens with **Waiting for
approval**: each person's name, email, how they signed in and when.

- **Approve** — they can use Garth. They are sent an email if
  [email](../../config/email-and-slack/) is set up, and must sign in again to
  start.
- **Decline…** — their account is removed. If they sign in again they join the
  queue again, or, while Garth is invite only, are turned away.

**Admin → Overview** lists anyone waiting under **Needs attention**.

## Invitations

**Invite people** on Admin → People takes email addresses, separated by
commas, spaces or new lines, and optionally groups to add them to (groups
created in Garth, not ones from sign-in).

- An invitation works once, the first time that address signs in.
- It lets them in whatever **Who can join** says, and puts them in its groups.
- Garth doesn't send the invitation. Tell them where to sign in.

Unused invitations are listed under **Invitations**, with who added each and
when. **Withdraw** cancels one.

## Messages

**Admin → Messages** holds what Garth says to people at the door, and a banner
for everyone inside.

| Message | Shown |
|---|---|
| **Waiting for approval** | To someone who signed in while new accounts need approval |
| **Not invited** | At sign-in, to someone without an invitation while Garth is invite only |
| **Suspended** | At sign-in, to someone an administrator suspended |

Each has a sensible default and can be up to 4,000 characters.

### Announcement

A banner across the top of every page, for everyone signed in.

- **Show the announcement** — the switch.
- **Tone** — **Information** (news, nothing to do), **Heads-up** (something
  to plan for) or **Problem** (something is broken now).
- **Hide after** — an optional date after which it disappears on its own.

A **Preview** shows it as people will see it.
