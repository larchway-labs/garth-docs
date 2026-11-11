---
title: Toft installs
description: Attach the Toft installs sessions deploy to, and let Toft trust Garth so sessions sign in on their own.
---

Garth is Toft's companion. What a session builds is deployed to Toft, and a
Toft app can lead back to the project its code lives in.

**Admin → Toft installs** lists where sessions deploy. People choose an install
by its name; Toft decides what each person may do there.

## Installs

Each row shows the install's name and address, how many projects deploy there,
and when and by whom it was added.

- **Add install…** — a **Name** people see (for example `Production`) and an
  **Address**, `https://…`. Names and addresses are unique.
- **Edit…** — changing the address moves the projects that deploy there too.
- **Make the default** — new projects and sessions deploy there.
- **Remove…** — sessions stop offering it. Apps already there keep running.
  Refused while any Toft app on it is linked to a project; unlink those in the
  projects' settings first.

The default can't be removed. Make another install the default first.

Until an administrator adds one, Garth uses a built-in default install, shown
as **From the server's configuration**. Add your own and make it the default.

Each attached install, and the apps it serves under its host, is an allowed
destination for sandboxes without a listing.

## How a session deploys

The agent's `toft` is pointed at the pod listener. Garth checks the session
token and forwards to the install with the person's own short-lived,
deploy-scoped key, which it holds and the pod never sees. Only Toft's deploy
routes pass — apps, stored files and who-am-I — nothing that manages keys or
sign-ins. The key is revoked when the session ends.

While someone else is driving a shared session, deploys are refused: a guest
must not deploy as the owner.

## Sign sessions in through Garth

Garth gets each person's key one of two ways:

| Way | When |
|---|---|
| **Garth vouches for them** | Toft trusts Garth as an issuer, and Garth can vouch for the person's email. No code to approve |
| **A code** | Otherwise. The person approves Toft's device sign-in from the session's Toft tab |

For the first, Garth must have a public address — it learns it the first time
an administrator signs in over https. The page then shows **Sign sessions in
through Garth** with the values a Toft administrator enters in each install
under **Admin → Authentication → Trusted issuers**:

| Value | What it is |
|---|---|
| **Issuer** | Garth's public address |
| **Subject claim** | `email` |
| **Audience, per install** | The install's address |

Each Toft install must reach Garth's `/.well-known/openid-configuration` and
`/oauth/jwks.json` on port 443. See
[Reverse proxy and address](../../install/reverse-proxy/).

Garth signs a five-minute identity token for the person and exchanges it for a
key. Toft matches the token's email, so Garth includes one only when the
identity provider verified it or an administrator set it on the person's page.
It never vouches for a development sign-in.

## Open in Garth

On Toft, an app's owners and editors get **Open in Garth** once a Toft
administrator sets Garth's address (`garth_url`, under Admin → Settings → This
install on Toft). The link opens Garth's page, which:

- refuses an install that isn't listed here;
- opens the app's project and starts or resumes the person's session;
- failing that, offers the person's project whose upstream is the same
  repository;
- failing that, offers to import the repository as a new project linked to the
  app, under the [trusted sources](../trusted-sources/) rule.

The link changes nothing by itself. Every step is the person's choice on
Garth's own page.
