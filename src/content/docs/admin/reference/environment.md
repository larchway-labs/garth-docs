---
title: Environment reference
description: Every environment variable and flag the control plane reads at startup, with its default.
---

Garth keeps settings to what it needs before its database opens, or to reach
its infrastructure. Everything else is on the admin pages and kept in the
database — see [Settings](../../config/settings/).

Variables are read once, at startup; change one and restart. Each has a flag
of the same meaning (`garth -help` lists them).

## Listeners and addresses

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `GARTH_UI_ADDR` | `-ui` | `127.0.0.1:8090` | The browser listener. Keep it loopback behind a proxy on the same box |
| `GARTH_POD_ADDR` | `-pod` | `10.42.0.1:8091` | The pod listener: git, the model gateway, Toft, upstream git, the egress proxy. On k3s, the `cni0` address; must match the template's network policy |
| `GARTH_POD_URL` | `-pod-url` | `http://<pod addr>` | How pods reach the pod listener. In a cluster, the `garth-pods` service |
| `GARTH_TRUSTED_PROXIES` | `-trusted-proxies` | loopback | Comma-separated CIDRs whose `X-Forwarded-For` and `-Proto` are believed |

There is no setting for Garth's public address: it is where an administrator
last signed in over https. See
[Reverse proxy and address](../../install/reverse-proxy/#the-public-address).

## State and secrets

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `GARTH_DATA` | `-data` | `.data` | The database, repositories, seal key and cookie key. Created owner-only |
| `GARTH_KMS_KEY` | `-kms-key` | — | An AWS KMS key (id, ARN or alias) that wraps the key secrets are sealed with: git host tokens, project secrets, client secrets. Without it the key is a file in `GARTH_DATA` |

:::caution[Set the KMS key first]
Set `GARTH_KMS_KEY` before storing secrets. Switching later makes the ones
already stored unreadable.
:::

## Cluster

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `KUBECONFIG` | `-kubeconfig` | `~/.kube/config` | The kubeconfig. In a pod with no file, the service account is used |
| `GARTH_NAMESPACE` | `-namespace` | `garth` | Namespace of the warm pool and claims |
| `GARTH_POOL` | `-pool` | `garth` | The SandboxWarmPool sessions claim from |
| `POD_IP` | — | — | Set in a cluster from the pod's own address. The address sandboxes are tested against reaching, for **Network isolation** |

## Sandboxes

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `GARTH_POD_BIND` | `-pod-bind` | `log` | Take a session token only from its own pod's address: `enforce`, `log` (log it and the audit trail, let it through) or `off`. Run `log` for a day on a new cluster, then `enforce` |
| `GARTH_POD_MAX_IN_FLIGHT` | `-pod-max-in-flight` | `64` | Requests one sandbox may have in flight on the pod listener, proxy tunnels included. More get a 429. `0`: no limit |
| `GARTH_REPO_MAX_BYTES` | `-repo-max-bytes` | 2 GiB | The most one project's repository may hold before pushes from sandboxes are refused. `0`: no limit |

`GARTH_INIT_KEY` is set in the **template**, not on the control plane. See
[A cluster](../../install/cluster/#bind-sandboxes-to-this-control-plane).

## Models

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `AWS_REGION` | `-region` | `us-east-1` | The Bedrock region, and the KMS key's |
| `GARTH_OPENROUTER_URL` | `-openrouter-url` | OpenRouter's API | A regional OpenRouter endpoint |

AWS credentials come from the usual places: the instance role on one box, the
service account's role (IRSA) in a cluster. OpenRouter's key is saved on
Admin → Models, not here.

## Sign-in

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `GARTH_DEV_SIGN_IN` | `-dev-sign-in` | off | `1` turns on the bare-username sign-in, for a first start. Garth refuses to start with it on a UI listener that isn't loopback |
| `GARTH_DEV_SIGN_IN_ANYWHERE` | — | off | `1` lets development sign-in run on a non-loopback listener: anyone who reaches it signs in as anyone |

## License

| Variable | Flag | Default | What it does |
|---|---|---|---|
| `GARTH_LICENSE_URL` | `-license-url` | The license service | The license service's validate endpoint, `https://` |

## Commands

| Command | What it does |
|---|---|
| `garth` | Runs the control plane |
| `garth version` | Prints the version |
| `garth local-admin enable \| status \| disable` | Manages the [local administrator](../../identity/local-administrator/). Takes `--data`, `--password` and `--password-stdin` |
