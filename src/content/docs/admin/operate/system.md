---
title: System
description: Admin → System — the checks on the control plane, cluster, gateway, storage and integrations, and every version.
---

**Admin → System** says whether the cluster, the model gateway, storage and the
integrations answer, and lists the versions of everything a session runs.

## Checks

Checks run every few minutes, and when you press **Run checks again**. Each is
**Passing**, **Worth a look** or **Failing**. A failing check is also listed on
Admin → Overview.

### Control plane

| Check | Passes when | Otherwise |
|---|---|---|
| **Database** | SQLite's integrity check passes | Fails with what it found |
| **Secrets at rest** | Secrets are sealed under a KMS key | Warns with a key file in the data directory; **fails** once Garth has a public address. Set `GARTH_KMS_KEY` |
| **Pod listener** | Names the address pods use and what it serves | — |
| **Sign-in** | Single sign-on is on | Warns while development sign-in is on; **fails** with development sign-in and a public address, or with no way to sign in |
| **Trusted sources** | Imports are limited to a list, or off | Warns on **Any git URL** |

### Cluster

| Check | Passes when |
|---|---|
| **Kubernetes API** | Reachable; names the version and node count |
| **Warm pool** | At least one sandbox is ready. Warns at 0 ready: the next session waits for a pod |
| **Sandbox isolation** | Every template has gVisor, a read-only root, a node pool of its own, and no host network, PID, IPC or paths. Fails naming what each lacks |
| **Network isolation** | A sandbox tried the UI listener and was kept from it. **Fails** if one got through: the cluster isn't enforcing NetworkPolicy at all. Not checked while the UI listener is on loopback |
| **Sandbox binding** | Every template sets `GARTH_INIT_KEY` to this control plane's key. Fails naming the templates without it, with the value to set. Warns while `GARTH_POD_BIND` isn't `enforce` |

Instance metadata on the session nodes isn't visible from here. Keep its hop
limit at 1 — see [A cluster](../../install/cluster/#nodes).

### Model gateway

| Check | Passes when |
|---|---|
| **Offered models** | At least one model is offered |
| **Bedrock** | The catalog answers; names how many Anthropic models the region has and how many this account is granted |

### Storage

**Data disk** — the disk `GARTH_DATA` is on. Warns at 80% used, fails at 90%.

### Integrations

**Email** and **Slack** warn while off and fail when their last test failed.
Each [git host](../../config/git-hosts/) that is on fails if it has no client id
and secret, and otherwise says how many people have connected.

## Garth

| Field | What it shows |
|---|---|
| **Version** | The release and the commit the binary was built from |
| **Built** | When the binary was built, and the Go version |
| **Up since** | When this process started |
| **Host** | The machine or pod name |
| **Data** | The data directory |
| **Stored tokens** | Encrypted with a KMS key, or with a key file beside them |
| **Database** | Its size, and the counts of people, projects and sessions |

## Cluster

The Kubernetes version and node count, the agent-sandbox version, and the
runtime classes the cluster has.

## In every session

The agent (Pi), pinned in the session image, and the session image itself.
