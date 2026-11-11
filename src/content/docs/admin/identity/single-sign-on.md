---
title: Single sign-on
description: Connect your identity provider over OpenID Connect on Admin → Sign-in, map claims, sync groups, and retire development sign-in.
---

People sign in with your organization's identity provider over OpenID
Connect: Okta, Entra ID, Google Workspace, Keycloak, Dex or any other OIDC
provider. It is set up on **Admin → Sign-in**.

## Register Garth

Create an application (a web client using the authorization code flow) at
your provider. Use the **Redirect URI** the page shows:

```text
https://garth.example.com/auth/callback
```

It is built from the address you opened the page at, so open it at Garth's
public address before you copy it.

## Single sign-on (OIDC)

| Field | What it is |
|---|---|
| **Button label** | What the sign-in page's button says. Default `Single sign-on` |
| **Issuer URL** | The provider's issuer, `https://` and without `/.well-known`. Discovery is read from `<issuer>/.well-known/openid-configuration` |
| **Client ID** | From the application you registered |
| **Client secret** | Stored encrypted and never shown again. Leave blank to keep the stored one |
| **Scopes** | Space-separated. Default `openid profile email groups`. `openid` is added if missing; include `groups` if group sync is on |

Press **Save**. The badge reads **Not set up**, **Off** or **On**.

## Who someone is

Read from the ID token at each sign-in.

| Field | Default | What it does |
|---|---|---|
| **Username claim** | `preferred_username` | Becomes their username in Garth. Usernames can't change later |
| **Groups claim** | `groups` | The claim listing their groups at the provider |
| **Sync groups** | On | Each provider group becomes a Garth group, membership updated at every sign-in. Groups people made in Garth are untouched |
| **Administrators group** | — | Members of this provider group are administrators. Empty: administrators are set by hand on People |

Garth vouches for a person's email to Toft only when the provider says it is
verified, or an administrator set it. See
[People](../people/#email).

## Test and switch on

1. **Test the connection.** Garth reads the discovery document, checks it names
   the issuer you entered, and sends the client id and secret to the token
   endpoint with a dummy code. A refused client fails the test; a refused code
   passes it. Save first: the test uses the stored settings.
2. **Sign in with …** — the switch. It can be turned on only after a test has
   passed.

The result of the last test stays on the page with its time.

## Development sign-in

The bare-username sign-in, for a first start before any provider exists.
Anyone who reaches the page signs in as any username — administrators
included.

- It is on only while Garth runs with `GARTH_DEV_SIGN_IN=1`.
- With it on, Garth **refuses to start** on a UI listener that isn't loopback,
  unless `GARTH_DEV_SIGN_IN_ANYWHERE=1` is also set.
- Garth never vouches to Toft for a development sign-in.

Once single sign-on works, restart Garth without `GARTH_DEV_SIGN_IN`. Until
you do, **Admin → System → Sign-in** warns; once Garth has a public address,
it fails.

:::caution
`GARTH_DEV_SIGN_IN_ANYWHERE=1` means anyone who can reach the listener signs
in as anyone. Use it only behind something else that keeps strangers out,
such as basic auth on the proxy.
:::

## When the provider is down

Single sign-on is the only way in for everyone but the local administrator.
If the provider breaks, sign in as `admin` — see
[The local administrator](../local-administrator/).
