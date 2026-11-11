---
title: One k3s box
description: Run Garth on a single k3s node — agent-sandbox, the session image, the template and the control plane.
---

The smallest install: one machine running k3s, with the control plane as a
process on the node and session pods beside it. Good for a team trial. For
gVisor and separate nodes, see [A cluster](../cluster/).

## What you need

- A Linux machine with [k3s](https://k3s.io/) and Docker (to build the
  session image).
- Go, to build the control plane.
- AWS credentials the control plane can use to call Bedrock — on EC2, the
  instance role. See [Models](../../config/models/) for the actions it needs.
- A DNS name for Garth and a reverse proxy in front of it. See
  [Reverse proxy and address](../reverse-proxy/).

## 1. Install agent-sandbox

Once, as cluster admin:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/agent-sandbox/releases/download/v1.0.10/sandbox-with-extensions.yaml
```

Garth is built against agent-sandbox **v1.0.10**.

## 2. Build the session image

From the Garth source:

```bash
docker build -t garth-session:0.4.7 sandbox/
docker save garth-session:0.4.7 | sudo k3s ctr images import -
```

The template uses `imagePullPolicy: Never`, so the image must be in k3s's own
image store. See [The session image](../session-image/).

## 3. Apply the template and warm pool

```bash
kubectl apply -f deploy/k8s/single-node.yaml
kubectl -n garth get sandboxwarmpool garth   # READY 1
```

This makes:

| Object | Name | What |
|---|---|---|
| Namespace | `garth` | Where sessions run |
| SandboxTemplate | `garth-session` | The pod every session runs in, with its network policy |
| SandboxWarmPool | `garth` | One idle sandbox kept ready |

The template's network policy admits only `10.42.0.1` — the k3s `cni0`
bridge address, where the control plane is reached from pods — to the shim
port and the preview ports, and lets the pod reach only port 8091 there and
the cluster's DNS.

## 4. Build and run the control plane

```bash
go build -o bin/garth ./cmd/garth
KUBECONFIG=$HOME/.kube/k3s.yaml bin/garth
```

The control plane needs:

- a kubeconfig that can create `sandboxclaims` in `garth`, and
- AWS credentials that can call `bedrock:InvokeModel*`.

Run it under whatever supervises processes on the box (a systemd unit, for
example), with `GARTH_DATA` pointing at a directory that survives restarts.

The defaults fit this box:

| Variable | Default |
|---|---|
| `GARTH_UI_ADDR` | `127.0.0.1:8090` — loopback; the reverse proxy reaches it |
| `GARTH_POD_ADDR` | `10.42.0.1:8091` — the `cni0` address; must match the template's network policy |
| `GARTH_DATA` | `.data` |

Everything else is in the [environment reference](../../reference/environment/).

## 5. Reach it

Put a reverse proxy in front of `127.0.0.1:8090` — see
[Reverse proxy and address](../reverse-proxy/) — or, for the very first
start, tunnel `localhost:8090` over SSH.

Then follow [First run](../../start/first-run/).

## What this box does not give you

**Admin → System** says so plainly:

- **Sandbox isolation** fails: the single-node template has no gVisor, no
  read-only root and no node pool of its own.
- **Network isolation** is not checked: the UI listener is on loopback, so
  there is nothing for a sandbox to be kept from.
- **Secrets at rest** warns, or fails once Garth has a public address, until
  `GARTH_KMS_KEY` is set.

Those are what [A cluster](../cluster/) adds.
