---
title: Upgrading
description: Versions, upgrading the control plane and the session image, and moving from Workbench.
---

## Versions

Garth is versioned **0.0.N**, from 0.0.1. Each release bumps N by one. A
release is tagged `v0.0.N`.

- `garth version` prints the version.
- **Admin → System → Garth → Version** shows it with the commit the binary was
  built from. `+dirty` after the commit means the tree had changes.

The session image has its own version (for example `garth-session:0.4.7`),
and so does the agent it pins. **Admin → System → In every session** lists
them.

## The control plane

An upgrade is a new binary and a restart.

1. Build the new version, or its image:
   `docker build -f deploy/control-plane/Dockerfile -t garth:$(go run ./cmd/garth version) .`
2. Stop the old process and start the new one, or roll the StatefulSet to the
   new image (by digest).

The database migrates itself at startup. Migrations only go forward: a
released one is never edited, only followed by another. There is no separate
migration step and no down path.

:::caution[Copy the data directory first]
Rolling the binary back across a schema change is not supported. Before an
upgrade, stop Garth and copy `GARTH_DATA`, or snapshot its volume.
:::

Sign-ins survive a restart: they are kept in the database, and the cookie key in `GARTH_DATA`.

## The session image

1. Build the new image and make it available to the cluster (import it into
   k3s, or push it to your registry).
2. Change `image:` in the template and apply it.

New sessions use the new image. **Idle** sandboxes in the warm pool made from
the older image are replaced one a minute; **Admin → Sandbox → Warm pool**
shows them as **Being replaced**. A sandbox someone's session holds is never
touched — it moves to the new image when that session next resumes.

## After an upgrade

1. Open **Admin → System** and press **Run checks again**.
2. Check **Version** names the release you meant.
3. Open a session to confirm a pod starts.

## Moving from Workbench

Garth was called Workbench. On a box that ran it under the old name:

- `workbench.db` is renamed to `garth.db` on the first start.
- Saved work under `refs/workbench/` moves to `refs/garth/`.
- The cluster objects have new names. Apply `deploy/k8s/single-node.yaml`
  (namespace `garth`, template and image `garth-session`), then delete the
  `workbench` namespace once no session runs there.
- Install `deploy/caddy/garth.caddy` in place of `workbench.caddy`. The site
  keeps its address.
- Everyone signs in again: the cookie's name changed.
