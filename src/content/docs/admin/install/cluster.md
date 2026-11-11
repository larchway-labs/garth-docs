---
title: A cluster
description: Run the control plane as a pod, sessions under gVisor on their own nodes, with the reference manifests for EKS.
---

In a real cluster the control plane is a pod too, on a node of its own, and
session pods run under gVisor on a node pool of their own. The reference
target is EKS with managed node groups; the manifests are in `deploy/k8s/`.

| File | What |
|---|---|
| `garth.yaml` | The `garth` namespace, its quota, gVisor, the session template and warm pool |
| `control-plane.yaml` | The `garth-system` namespace, the StatefulSet, its services, network policy, role and service account |
| `eks-nodegroups.md` | The two node groups and how to check them |
| `iam-control-plane.json` | The control plane's AWS policy |
| `deploy/control-plane/Dockerfile` | The control plane's image |

Values to replace are marked `CHANGE` in each file.

## Nodes

Two node groups are Garth's own. Nothing else is scheduled on either.

| Group | Label | Taint | Runs |
|---|---|---|---|
| `garth-control-plane` | `garth/pool=control-plane` | `garth/control-plane=true:NoSchedule` | The control plane |
| `garth-sessions` | `garth/pool=sessions` | `garth/sessions=true:NoSchedule` | Session pods, under gVisor |

Cluster add-ons (DNS, the CNI, the ingress controller) run on a third, general
group. Don't add tolerations for either taint to anything else.

**Session nodes** need:

- **gVisor.** `runsc` installed and registered with containerd as the `runsc`
  handler. The `gvisor` RuntimeClass in `garth.yaml` points at it.
- **Instance metadata** with tokens required and a hop limit of 1.
- **An instance role** with only what joining the cluster needs — nothing for
  Bedrock, KMS or S3.
- **A NetworkPolicy engine** — the VPC CNI's network policy agent, or Calico.
  Without one, every policy in the manifests is silently ignored.

**The control plane node** needs the same metadata options. Its AWS access is
its service account's role (IRSA), never the node's.

## The control plane's AWS role

`iam-control-plane.json` grants three things:

| Statement | Actions | For |
|---|---|---|
| `SealingKey` | `kms:Decrypt`, `kms:GenerateDataKey` on your key | Sealing stored secrets |
| `ModelGateway` | `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream` | Model calls |
| `ModelCatalog` | `bedrock:ListInferenceProfiles`, `bedrock:GetFoundationModelAvailability` | **Add model** on Admin → Models |

Attach it to the role named on the `garth-control-plane` service account.

## Install

1. Install [agent-sandbox v1.0.10](https://github.com/kubernetes-sigs/agent-sandbox)
   in the cluster.
2. Build both images and push them to your registry:
   `docker build -f deploy/control-plane/Dockerfile -t garth:$(go run ./cmd/garth version) .`
   and `docker build -t garth-session:0.4.7 sandbox/`.
3. In `garth.yaml`, set the session image **by digest**
   (`garth-session@sha256:…`), and size the `ResourceQuota` to the session
   node pool. Its defaults fit about fifty sessions. Apply it.
4. In `control-plane.yaml`, set the image by digest, the service account's
   role ARN, `AWS_REGION`, `GARTH_KMS_KEY`, `GARTH_TRUSTED_PROXIES` (your pod
   CIDR) and the network policy's ingress controller. Apply it.
5. Point your ingress at the `garth-ui` service on port 8090. See
   [Reverse proxy and address](../reverse-proxy/).

## Bind sandboxes to this control plane

Two settings start loose and are tightened once the cluster is running.

**`GARTH_INIT_KEY` in the template.** The control plane logs its public key at
start, and **Admin → System → Sandbox binding** shows it until every template
has it. Uncomment the `GARTH_INIT_KEY` line in the template's environment,
paste the value, and apply. The shim then takes its session only from this
control plane, and only an init made for its own pod.

**`GARTH_POD_BIND`.** It starts at `log`: a session token used from an address
other than its own pod's is logged and let through. Watch the log for a day
for "isn't its pod's" — a CNI that rewrites pod addresses would show there —
then set `enforce`.

## What `garth.yaml` holds sessions to

- **Pod Security `restricted`** on the namespace: the API server refuses a pod
  that is privileged, uses host namespaces or paths, runs as root or adds
  capabilities, whatever a template says.
- **A ResourceQuota** on what all sessions together may take.
- **A LimitRange**, so a template that forgets its limits still gets some:
  1 CPU and 1536 Mi memory by default.
- **A read-only root**, with `/workspace`, `/tmp` and the image user's home the
  only writable places.

## Checking it

From a session's terminal:

```bash
touch /usr/x        # fails: read-only root
dmesg | head -1     # mentions gVisor
```

From a session pod, port 8090 on the control plane is unreachable. Then open
**Admin → System**: **Sandbox isolation**, **Network isolation** and
**Sandbox binding** should all pass.
