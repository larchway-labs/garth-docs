---
title: Models
description: Offer Bedrock and OpenRouter models, set their prices, choose the default and who may use each.
---

Sessions call models only through Garth's **model gateway**. It checks the
session is live, allows only configured models, meters every call, and signs
or authorizes it with the control plane's own credentials. A sandbox holds no
AWS credential and no OpenRouter key.

**Admin → Models** lists each model with its prices per million tokens
(**Input**, **Output**, **Cache read**), its spend **This month**, **Who** may
use it, and **Offered**. A switch saves the moment it is thrown.

## The default

A fresh install offers **Claude Haiku 4.5** on Amazon Bedrock as the default.
New sessions start on the default unless a person or one of their groups has
another.

The default can't be switched off, limited to groups or removed. Make another
the default first — **Make the default** in its menu, for a model that is
offered.

## Amazon Bedrock

The gateway re-signs each call with the control plane's AWS role, in
`AWS_REGION` (default `us-east-1`), and allows only `Converse` and
`ConverseStream`. The role needs the actions in
[A cluster](../../install/cluster/#the-control-planes-aws-role); on one box,
the instance role.

**Add model → Amazon Bedrock** lists what Bedrock offers in the region and
whether this AWS account has been granted each one:

| Badge | Meaning |
|---|---|
| **Access granted** | Can be added |
| **Access requested** | AWS hasn't granted it yet |
| **No access** | Request access in the Bedrock console first. Anthropic models ask for a short use-case form, once per account |

**Another model or inference profile** adds one by its Bedrock id or ARN —
an application inference profile for cost tracking, for example — with a
**Name people see**.

Prices are filled in from the list price. Change them if your agreement with
AWS differs. Every cost figure in Garth is priced from them. For a model added
by id, enter the rates AWS bills for it.

## OpenRouter

OpenRouter gives sessions many vendors' models, free ones included.

1. Under **OpenRouter** on Admin → Models, paste an API key (`sk-or-…`) and
   **Save key**. It is checked with OpenRouter, stored encrypted, and never
   shown again. The page shows its last four characters, who saved it and
   when.
2. **Add model → OpenRouter** then lists OpenRouter's models, searchable.
   **Free only** is on at first. A model marked **No tool use** can't drive
   the agent, so it can't be picked.

Spend is metered at what OpenRouter reports it charged, or at the listed rates
when it doesn't say.

:::caution[Free models]
OpenRouter rate-limits free models, and some of their providers keep prompts
to train on. Don't use them on code you can't share.
:::

**Replace…** swaps the key. **Remove…** stops OpenRouter calls until a key is
added again; the models stay listed and their history stays.

`GARTH_OPENROUTER_URL` points Garth at a regional endpoint instead of
OpenRouter's default API.

## Who may use a model

**Choose who can use it…** ticks groups.

- No group ticked: everyone may.
- Some ticked: only their members, and administrators, may. Others see it in
  the model picker as one to ask for, and their request is a notice in the
  administrators' bell. A session of theirs already on it is refused until
  they pick another model.

## Switching off and removing

- **Offered** off: new sessions can't pick it. Use this to stop offering one
  for a while.
- **Remove…**: new sessions can't use it, and sessions running on it switch to
  the default on their next message. Its usage history stays.
