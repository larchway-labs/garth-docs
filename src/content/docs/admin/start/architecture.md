---
title: Architecture
description: The control plane, its two listeners, the session sandboxes and what each one holds.
---

Garth is a place where a team works with a coding agent in the browser. A
**project** is a git repository. A **session** is one person working on one
project, on a branch of their own, in a sandbox pod of their own. What the
agent remembers and the skills it uses are files in the project's repository,
shared by merging.

It has two parts:

- **The control plane** — one Go binary, `garth`. It serves the web app and
  its API, owns the git repositories and the SQLite database, meters model
  calls, and starts and stops sandboxes.
- **Session sandboxes** — pods in a Kubernetes cluster, made by
  [agent-sandbox](https://github.com/kubernetes-sigs/agent-sandbox). Each runs
  the session image: a small shim and the agent, Pi, pinned to one version.

```text
browser ──WebSocket──▶ garth (control plane)            ──▶ SQLite, bare git repositories
                        ├─ UI listener   :8090  the web app and the API
                        └─ pod listener  :8091  reached by sandboxes only
                             ├─ /git/<project>.git   push confined to the session branch
                             ├─ /bedrock/…           the model gateway
                             ├─ /toft/…              deploys, as the person
                             ├─ /upstream/…          git hosts, as the person
                             └─ egress proxy         every other connection out
                        ──▶ SandboxClaim (agent-sandbox) ──▶ session pod: shim + Pi
```

## Two listeners

| Listener | Default | Serves | Reached by |
|---|---|---|---|
| UI | `127.0.0.1:8090` | The web app, the API, the session WebSocket | Browsers, through your reverse proxy or ingress |
| Pod | `10.42.0.1:8091` | Git, the model gateway, Toft, upstream git, the egress proxy | Session pods only |

A pod cannot reach the API. The pod listener serves only what a session
needs, and checks the session token on every request.

## What a sandbox holds

One credential: the **session token**. It arrives in memory when the session
starts and is dead once the session ends. Everything else stays with the
control plane:

- **Models.** The gateway signs Bedrock calls with the control plane's own AWS
  role, and adds the OpenRouter key to OpenRouter calls.
- **Git hosts.** The control plane adds the person's own token to fetches and
  to the push of their session branch.
- **Toft.** The control plane adds the person's short-lived key to each deploy.
- **Project secrets.** The pod sees a placeholder. The egress proxy swaps in
  the value only on HTTPS requests to the host the secret is declared for.

## A session's life

1. Someone opens a project. Garth claims a pod from the **warm pool**, so the
   session starts in seconds.
2. The pod clones the project from the pod listener onto
   `session/<user>/<id>`.
3. After each agent turn, and every few minutes while anything changed, the
   shim saves the workspace to hidden refs in the project's repository.
4. After the idle time on [Settings](../../config/settings/), the session
   **pauses**: the pod goes, the work stays. Resuming restores it onto any
   warm pod.
5. Work reaches the default branch only by a **merge**, done on the control
   plane. For a project from GitHub or GitLab, the branch is pushed there as
   the person and the host's own rules decide what lands.

## Where state lives

Everything is under `GARTH_DATA` (`.data` by default):

| Path | What |
|---|---|
| `garth.db` | The database: people, projects, sessions, usage, settings, the activity log |
| `repos/` | The bare git repositories, saved work in progress included |
| `seal.key` or `seal.key.kms` | The key stored secrets are sealed with — wrapped by KMS when `GARTH_KMS_KEY` is set |
| `cookie.key` | Signs sign-in cookies |

The control plane runs as one replica. SQLite, the repositories and the keys
it holds in memory all assume one.

## Isolation, in order of strength

- **Network policy.** A sandbox may reach the pod listener and the cluster's
  DNS, nothing else. See [Sandbox and network](../../config/sandbox-and-network/).
- **A locked-down pod.** Read-only root, uid 1000, every capability dropped,
  no service-account token.
- **gVisor**, in a cluster: session pods run under the `gvisor` runtime class.
- **Separate nodes**, in a cluster: the control plane never shares a node with
  a sandbox.

[System](../../operate/system/) checks each of these and says which are missing.
