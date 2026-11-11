---
title: Sandbox and network
description: Admin → Sandbox — the template, the warm pool, package installs, and where a sandbox may connect.
---

**Admin → Sandbox** is what every session runs in: one pod per person per
project, from one template, on a warm pool.

## Template

The image, the agent (Pi) and Toft CLI versions, the runtime class, the CPU
and memory limits, and the workspace size. These come from the cluster's
template. To change them, change the template — see
[The session image](../../install/session-image/).

## Warm pool

Idle sandboxes kept ready so a session starts in seconds. The section shows how
many are ready of the pool's size, the image new ones are made from, and each
idle sandbox: **Ready**, **Starting** or **Being replaced**.

- A sandbox made from an older image is replaced, one a minute.
- A claimed sandbox is someone's session and isn't listed or touched.
- The size is set on [Settings](../settings/#sandbox), 0 to 10.

## Locked down

The template is the toolset. A session changes its workspace, never its system:

- Read-only root filesystem — writes go to `/workspace` and `/tmp` only.
- Runs as uid 1000, no sudo, no package manager.
- Every Linux capability dropped; no privilege escalation.
- No service-account token; no cloud credentials.
- A new tool means a new template image.

### Project dependencies

| Choice | What it allows |
|---|---|
| **Off** | `uv add` and `npm install` fail; only what the image has |
| **From your mirrors** | Into the project only, from the mirrors listed under it |
| **Public registries** (default) | PyPI, npm and the like — into the project only |

Dependencies land in the project's own environment (`.venv`,
`node_modules`), never the system. The registry must also be an allowed
destination below. A mirror's address is `https://`, and its host is allowed
automatically.

## Network

Every sandbox's network policy lets it reach only Garth's pod listener and the
cluster's DNS. Everything bound for the internet goes through the pod
listener's **egress proxy**, which:

- applies the allowed destinations below;
- refuses private addresses — the VPC, the cluster, instance metadata —
  after DNS, whatever the name resolved to;
- adds a [project secret](#project-secrets) on its way to the host it is for.

The **Network** section lists what a sandbox can and can't reach.

### Allowed destinations

**Sandbox internet access**:

| Mode | What a sandbox may reach |
|---|---|
| **Listed only** (recommended, the default) | Only the hosts in the list. Stops a session sending what it reads elsewhere |
| **Public internet** | Any public address on ports 80 and 443. Private ranges stay blocked |

Each entry is a host name, or `*.example.com` for its subdomains, with **What
it's for**. A fresh install lists the public package registries:

| Host | For |
|---|---|
| `github.com` | Clone dependencies and read public code |
| `*.githubusercontent.com` | Release downloads |
| `registry.npmjs.org`, `registry.yarnpkg.com` | npm and Yarn packages |
| `pypi.org`, `files.pythonhosted.org` | Python packages |
| `proxy.golang.org`, `sum.golang.org` | Go modules and their checksums |
| `crates.io`, `static.crates.io` | Rust crates |
| `cloud.r-project.org`, `p3m.dev` | R packages |

Always allowed, without a listing: the model gateway, the project's git, the
package mirrors, and each attached [Toft install](../toft-installs/) with the
apps it serves under its host.

A change applies to sandboxes started after the save. Every change is recorded
in Activity.

### Project secrets

A project's secret is declared with the host or hosts it is for. The sandbox's
environment holds a placeholder; the egress proxy replaces it with the value,
in the header or query it appears in, only on HTTPS requests to those hosts.
To do that, the proxy opens those requests with a certificate from its own CA —
the one certificate a sandbox trusts.

**Waiting for a listing** names hosts a project secret is bound to that
sandboxes can't reach, with the projects. The secret goes nowhere until you
list the host or open the network.

## Credentials in a sandbox

| | |
|---|---|
| **Session token** | The only one. Held in memory, never on disk; dead once the session ends |
| **AWS** | None. The gateway signs model calls with its own role |
| **Git hosts** | None. Garth adds the person's token to fetches and to the push of their branch |
| **Toft** | None. Garth adds the person's key to each deploy |

## Limits on the pod listener

Every sandbox can reach the pod listener, so what it may ask of it is bounded.
These are environment variables on the control plane:

| Variable | Default | What it bounds |
|---|---|---|
| `GARTH_POD_MAX_IN_FLIGHT` | `64` | Requests one sandbox may have in flight, proxy tunnels included. More get a 429. `0`: no limit |
| `GARTH_REPO_MAX_BYTES` | 2 GiB | The most one project's repository may hold before pushes from sandboxes are refused. `0`: no limit |
| `GARTH_POD_BIND` | `log` | Take a session token only from its own pod's address: `enforce`, `log` or `off` |

Repeated bad tokens from one pod address are slowed and logged with that
address.

:::note[What the network can't close]
A session can still read what the project may use and send it out inside
allowed traffic — a commit on its branch, a deploy to Toft. Review on merge,
Toft's own access rules and [Activity](../../operate/activity/) are what answer
that.
:::
