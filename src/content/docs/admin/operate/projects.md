---
title: Projects
description: Admin → Projects — every project, whoever owns it, and archiving the ones nobody uses.
---

**Admin → Projects** lists every project, whoever owns it: what it costs, how
much it is used, and who has it.

The figures at the top: **Projects** (shared and private), **Owned by
groups**, **Live sessions** with sessions in the last 30 days, and **This
month**'s model spend across projects.

Filter by **Owned by a person**, **Owned by a group**, **Idle 90 days** or
**Archived**, or search by name, owner or source. Each row shows the owner,
sessions in 30 days, last activity and the groups it is shared with. **Open**
takes you to the project.

## Access

A project has an owner — a person or a group — and the people and groups it
is shared with. A project with no members is private. Everyone with access
works the same way; only the owner, or for a group-owned project the group's
managers, changes access, transfers or deletes. A share can carry an end date.

Administrators act as owners of every project.

- **Private projects** on [Settings](../../config/settings/#projects) off
  shares every new project with everyone.
- A group marked [Managed by administrators](../../identity/groups-and-tags/#org-wide-groups)
  makes every administrator an owner of its projects.

## Where changes land

A session works on its own branch. Changes reach the default branch only by a
merge, done on the control plane. A push from a sandbox is confined to its own
branch, and deletes are refused.

A merge whose branch touches `AGENTS.md`, `memory/` or `.pi/` — what every
teammate's agent follows — shows those files with their diffs and merges only
once the person confirms they read them.

For a project from a git host, the branch is pushed there as the person, and
the host's branch protection and reviews decide what reaches main. Garth has no
pull-request flow of its own.

## Idle and archived

A project with no session for 90 days is marked **Idle**.

Archiving keeps a project readable by everyone with access, out of the project
list, with no new sessions, until it is unarchived. The owner or an
administrator archives it from the project. It is refused while a session on it
is running, and for the [org policy](../../config/settings/#org-policy)
project.
