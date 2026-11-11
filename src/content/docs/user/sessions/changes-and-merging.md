---
title: Committing and merging
description: Commit and push your session branch, merge it into the default branch, deal with conflicts, and how a project from a git host differs.
---

A session works on its own branch. Its changes reach everyone else in two
steps: you **push** the branch, then you **merge** it.

## The Changes tab

**Uncommitted changes** lists each file that differs from your last commit,
marked **M** (modified), **A** (added), **U** (new, not yet tracked), **D**
(deleted) or **R** (renamed). **View diff** shows them all. **Refresh** reads
git again — useful after you edit files in the terminal.

If you have commits that are not pushed yet, the tab says how many.

## Commit and push

Type a commit message, or leave the box empty to use the one Garth suggests
from the changed files (*Add app.py; update server.js*). Choose **Commit and
push**.

This pushes to your session branch only. Nothing on the default branch changes.
You can also ask the agent to commit and push; the result is the same.

Your commits carry the name and email under
[Your profile → Overview → Git identity](../../account/your-profile/#git-identity).

## Merging, on a project hosted in Garth

Choose **Merge into main** in the header. Garth merges your pushed branch on the
server:

| Result | What happened |
|---|---|
| **Merged into main** | Done. Every new session starts from it. |
| **main already has this branch** | Nothing new to merge. |
| **Nothing pushed yet — commit and push first** | Merge takes only what is pushed. |
| **Conflicts with main** | The default branch was left where it was. |

Anyone with access to the project can merge, unless the owner turned on
**Protect instructions** and your branch changes `AGENTS.md`, `memory/` or
`.pi/`. A branch that changes those files asks you to read and confirm them
first — see
[What the agent reads](../../projects/what-the-agent-reads/#how-a-change-reaches-everyone).

### Conflicts

A conflict names the files. Ask the agent to *merge main into this branch and
resolve the conflicts*, let it push, then choose **Merge into main** again.

## Projects from a git host

For a project imported from GitHub or GitLab, there is no merge button.
**Commit and push** pushes your branch to Garth and then on to the host, as you.
The conversation says **Pushed session/… to your-org/your-repo.** when it
arrives.

Then open a pull request for the branch on the host. The host's reviews and branch protection decide what reaches the default
branch.

The push to the host needs your account there. If you have not connected it,
the conversation says so; connect under
[Your profile → Connections](../../account/your-profile/#connections) and push
again. While a guest is driving your session, nothing is pushed to the host.

## Your work is saved as you go

Work you have not pushed lives in the sandbox. So that it survives the sandbox
going away, Garth keeps a copy after each of the agent's turns and every few
minutes while anything changes. The bottom of **Changes** says when it last
did.

It leaves out files that look like secrets — `.env` files, keys — and anything
`.gitignore` excludes. If a file looks like a secret, the copy is skipped and
**The last backup was skipped** names the file. Move it out of the project or
add it to `.gitignore`.

Installed packages and caches are not part of the copy. After a pause they are
installed again.
