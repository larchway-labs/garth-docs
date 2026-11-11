---
title: Sharing a project
description: Give people or groups access to a project on its Access tab, for good or until a date.
---

A project with nobody on its **Access** tab is private to its owner. Share it and
the people you add can do what you can: start sessions, push, and merge.

There are no roles on a project. What reaches the default branch of a project
from a git host is up to the host's branch protection and reviews.

## Adding people

On the project's **Access** tab, under **People with access**:

1. Choose **Add person** and type a username.
2. Pick how long: **No end date**, **For 1 day**, **For 1 week** or **For 1
   month**.
3. Choose **Save access**.

You can share with someone who has not signed in yet: they find the project
when they first do. You can also share while creating a project, under **Share
with**.

## Adding groups

Under **Groups with access**, choose **Add group**, pick one, pick how long, and
choose **Save group access**. Everyone in the group has access, including people
who join it later.

Prefer a group to a list of names: access follows the team as people come and
go. See [Groups](../groups/).

## Temporary shares

A share with an end date says so on the Access tab and in the person's project
list (*Ends tomorrow*, *Until Dec 1*). When it ends, their access ends, and so
does any session they have on the project.

## Who changes access

Only the owner changes the Access tab — or, for a group-owned project, the
group's managers. Everyone else sees the list read-only.

Administrators can change any project's access too. They are told that it is
recorded in the activity log.

## Removing someone

Choose the cross beside them and save. Their live session on the project ends
with their access.

:::caution
Everyone with access can start a session, and a session can read the project's
environment. Think about a project's
[secrets](../../projects/settings/#environment) before sharing it.
:::
