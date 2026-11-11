---
title: Trusted sources
description: Which git repositories may become projects, and which a session may fetch as the person running it.
---

**Admin → Trusted sources** decides two things:

- which repositories may be **imported** as projects, and
- which repositories a session may **fetch** through Garth as the person
  running it — a git dependency, a submodule, a Go module.

Anything else is refused, even if the person can read it. Otherwise a
teammate's committed extension could fetch your private repository into a
session branch the whole project reads.

## Importing projects

| Mode | What it allows |
|---|---|
| **Trusted sources only** | Only repositories matching the list |
| **Any git URL** | Anyone may import any repository they can reach |
| **Off** | Projects start empty; nothing is imported |

A fresh install starts on **Trusted sources only**, with each connected git
host's address followed by `/**`. An install that had projects before trusted
sources existed kept **Any git URL**.

The mode and its list save together: change them, then **Save** or
**Discard**. A list that is empty can't be saved in **Trusted sources only**.

## Patterns

A pattern is a host and path, without a scheme:

| Pattern | Matches |
|---|---|
| `github.com/your-org/billing` | That one repository |
| `github.com/your-org/*` | Everything under `your-org` |
| `github.com/your-org/**` | The same |
| `gitlab.example.com/**` | Everything on that host |
| `github.com/*/tools` | `tools` in any organization — `*` inside a path is one name |

Matching ignores case, the scheme, a user name and a trailing `.git`, so
`https://github.com/a/b.git` and `git@github.com:a/b` are the same repository.
A path with `.` or `..` in it never matches.

## Try a URL

Paste a repository URL to see whether the settings on the page — saved or not —
allow it.

## Existing projects

A change applies to new imports only. Projects already imported keep working;
their source is shown on each project's summary.

## Other repositories a project uses

A project can declare other repositories its sessions may fetch. One is added
only by someone whose own connection can read it, or when it is a trusted
source — so an owner can't list a repository only a teammate can read and have
the teammate's session fetch it.

**Admin → System → Trusted sources** warns while the mode is **Any git URL**.
