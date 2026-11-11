---
title: Reverse proxy and address
description: Put Caddy or an ingress in front of Garth, and how Garth learns its public address.
---

Garth's UI listener speaks plain HTTP. Put a TLS-terminating proxy in front:
[Caddy](https://caddyserver.com/) on one box, your ingress controller in a
cluster.

## Caddy

`deploy/caddy/garth.caddy` in the source is a starting point. With your own
name in place of `garth.example.com`:

```text
garth.example.com {
	encode zstd gzip
	log {
		output file /var/log/caddy/garth.log
		format json
	}
	reverse_proxy 127.0.0.1:8090
}
```

Copy it to `/etc/caddy/sites-enabled/garth.caddy`, then:

```bash
caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy proxies the session WebSocket as it is and keeps the `Host` header.

### Basic auth during a trial

While Garth runs with [development sign-in](../../identity/single-sign-on/#development-sign-in),
anyone who reaches the page signs in as anyone. The shipped file puts
`basic_auth` in front for that reason (make the hash with
`caddy hash-password`). If you keep basic auth, leave these two paths outside
it — Toft fetches them, and neither holds a secret:

```text
	@issuer path /.well-known/openid-configuration /oauth/jwks.json
	handle @issuer {
		reverse_proxy 127.0.0.1:8090
	}
	handle {
		basic_auth {
			garth BASIC_AUTH_HASH
		}
		reverse_proxy 127.0.0.1:8090
	}
```

Remove basic auth once single sign-on is on.

## An ingress

Send traffic to the `garth-ui` service on port 8090 in `garth-system`. It must:

- pass WebSocket upgrades;
- serve `/.well-known/openid-configuration` and `/oauth/jwks.json` to Toft
  installs on port 443;
- be the only thing that reaches port 8090 — the network policy in
  `control-plane.yaml` names the ingress controller; change it to match yours.

## Trusted proxies

Garth believes `X-Forwarded-For` and `X-Forwarded-Proto` only from the
ranges in `GARTH_TRUSTED_PROXIES` (comma-separated CIDRs). The default is
loopback, which is right for Caddy on the same box. In a cluster, set it to the
pod range your ingress controller runs in.

The forwarded address is what [Activity](../../operate/activity/) records as
an event's **IP address**.

## The public address

Garth's public address is not configured. It is the address an administrator
last signed in at **over https**, kept in the database. Once Garth has it:

- origin checks and redirects use it, never the request's `Host`;
- Garth is an OIDC issuer at that address, so Toft can trust it to vouch for
  people — see [Toft installs](../../config/toft-installs/);
- cookies are `Secure`.

To move Garth to a new name, point the proxy at it and sign in there as an
administrator.
