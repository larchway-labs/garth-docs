---
title: The session image
description: What the session image holds, building it, and adding templates for other toolsets.
---

Every session runs the **session image**, built from `sandbox/` in the Garth
source. The template that runs it is the toolset: a sandbox cannot install
system packages, so a new tool means a new image.

## What is in it

- **Pi**, the agent, pinned to one version and driven in RPC mode by a small
  Node shim.
- **git**, **toft** (the Toft CLI) and the usual command-line tools: ripgrep,
  fd, jq, sqlite3, a C toolchain and the common `-dev` libraries.
- **The language toolchains Toft deploys**, at the versions Toft gives an app
  that pins none: Python through uv, Node with npm, Go and R.
- **Toft's agent skills and commands**, installed with the Toft CLI.

**Admin → Sandbox → Template** shows the image, the Pi and Toft CLI versions,
the runtime class, and the CPU, memory and workspace limits.

## Building it

```bash
docker build -t garth-session:0.4.7 sandbox/
```

- **One k3s box:** import it with
  `docker save garth-session:0.4.7 | sudo k3s ctr images import -`.
- **A cluster:** push it to your registry and set the template's image by
  digest, so a session runs exactly the image that was built.

To roll out a new image, see [Upgrading](../../start/upgrading/#the-session-image).

:::note[Licenses]
Pi is MIT-licensed and agent-sandbox is Apache-2.0. The session image
redistributes Pi, so its notice travels with the image. **Admin → License**
lists the open-source notices.
:::

## Templates

A template is a `SandboxTemplate` in the `garth` namespace. Garth reads them
from the cluster at run time; nothing is registered in Garth itself.

**Admin → Templates** lists every template labelled `garth/template`, plus the
warm pool's own template. It shows each one's image, tools, resources, warm
sandboxes, who may use it, how many projects and live sessions are on it, and
its state: **Ready**, **Pulling image** or **Can't start**.

### Adding one

Apply a `SandboxTemplate` with the label. It appears within a minute.

```yaml
apiVersion: extensions.agents.x-k8s.io/v1beta1
kind: SandboxTemplate
metadata:
  name: garth-rust
  namespace: garth
  labels: { garth/template: "true" }
  annotations:
    garth/name: "Rust"
    garth/description: "Rust stable with cargo and clippy."
    garth/tools: "Rust 1.91, cargo, clippy, toft 0.9.14, Pi 1.5.0"
spec:
  podTemplate:
    spec:
      containers:
        - name: session
          image: garth-session-rust:0.1.0
          resources: { limits: { cpu: "2", memory: 3Gi } }
```

| Annotation | Shown as |
|---|---|
| `garth/name` | The template's name |
| `garth/description` | Its description |
| `garth/tools` | The tool chips under it, comma-separated |

Build a new template from `garth-session` — its network policy, security
context, volumes and `GARTH_INIT_KEY` — and change only the image and
resources. [System](../../operate/system/) checks every template for gVisor, a
read-only root, its own nodes and the init key.

Removing a template from the cluster removes it from Garth. Projects on it
fall back to the default.

### Choosing for projects

From a template's menu on **Admin → Templates**:

- **Make the default** — new projects start on it. Only a **Ready** template
  can be the default.
- **Let everyone use it**, or **Only some groups…** — then only those groups'
  members, and administrators, can put a project on it. The default is always
  open to everyone.
