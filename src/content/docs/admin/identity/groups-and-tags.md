---
title: Groups and tags
description: Self-service and synced groups, what a group gives its members, org-wide groups, and cost-allocation tags.
---

## Groups

A group is a set of people. Projects can be shared with a group or owned by
one, and administrators use groups to decide who may use a
[model](../../config/models/) or a [template](../../install/session-image/#choosing-for-projects).

There are two kinds:

| Kind | Made by | Members change |
|---|---|---|
| **Created here** | Anyone, or only administrators — see below | By the group's managers, in Garth |
| **From sign-in** | [Group sync](../single-sign-on/#who-someone-is) | In the identity provider, arriving when each person next signs in |

Everyone who joins is in **Everyone**.

### Who can create groups

On **Admin → Settings → Projects → Who can create groups**: **Everyone** (the
default) or **Administrators**. Whoever creates a group manages it. A group
always keeps one manager.

### Admin → Groups

Every group, with its managers and what it has access to. Filter by **Created
here**, **From sign-in** or **No active manager** — a group whose managers have
all left or been suspended. Open one to change it as an administrator; your
changes are recorded in Activity.

### What a group gives its members

On a group's page, under **For members**, an administrator sets:

| Field | Applies |
|---|---|
| **Default model** | The model members' sessions start on, if they have none of their own |
| **Monthly budget per person** | A member's monthly limit, if they have none of their own |
| **Daily budget per person** | A member's daily limit, if they have none of their own |

A person's own settings come first. Someone in several groups gets the
**largest** budget and the first model they may use.

### Org-wide groups

**Managed by administrators**, under **Org-wide** on a group's page, is for a
group that belongs to the organization rather than one team. Every
administrator then manages it and acts as owner of the projects it owns. Make
someone a manager before turning it off.

## Tags

**Admin → Tags** holds labels attached to people and groups, one value per
tag — for example `cost-center = 4410`.

- A tag's key is lowercase letters, digits, `-`, `_` and `.`, up to 40
  characters, starting with a letter or digit. It can't be renamed later.
- Values are set on a person's page or a group's page, by administrators.
- A person's own value comes before their groups'.

Turn on **Cost allocation** for a tag and [Costs](../../operate/monitoring/#costs)
can split spend by its values.
