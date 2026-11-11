---
title: Previewing an app
description: See an app the agent is running in your sandbox, in the session's Preview tab or a tab of its own.
---

When the agent starts a web app in the sandbox, you can use it from the
session's **Preview** tab.

## Seeing it

1. Ask the agent to start the app — for example *run the dev server*. It must
   listen on a port from 1024 up, on `0.0.0.0`.
2. Open **Preview**. Under **Ports listening in the sandbox** each port appears
   with the program behind it.
3. Choose a port. The app shows below.

The bar above the app has **Reload the preview**, and a button that opens it in
a new browser tab.

If it says **Nothing is listening yet**, the app has not started, is on a port
below 1024, or listens only on `localhost`. Ask the agent to fix that.

## Who can see it

Only people with access to the project. A preview is never on the internet.

The page runs apart from Garth, so it cannot act as you in Garth — it does not
get your sign-in. An app that needs its own login still asks for one.

## When it stops

A preview lasts as long as the program in the sandbox. When the session pauses,
whatever was running stops; after you resume, ask the agent to start it again.

To show the app to people outside the project, deploy it to Toft. See
[Deploying to Toft](../../toft/deploying/).
