---
title: Sharing a live session
description: Invite people on the project into your session to watch it as it happens, or to drive the agent with you.
---

Your session is yours: only you can drive it. To work through something with a
teammate, invite them in.

## Inviting someone

1. In your session, choose **⋯ → Share session…**.
2. Under **Add someone from the project**, pick a person. Only people with
   access to the project are offered.
3. Choose **Watching** or **Can drive** for them.
4. Choose **Save**.

Send them the **Link** shown in the dialog. It works only for the people on the
list.

| Access | They can |
|---|---|
| **Watching** | Follow the conversation as it happens. They cannot send messages, read the workspace or open the terminal. |
| **Can drive** | Send messages to the agent too, and read the workspace under **Files**. Their messages are marked with their name. |

Neither gets a terminal, uploads, the **Toft** tab or **Commit and push**: those
stay yours.

Who is in the session shows in its header, as avatars with *watching* or
*driving*. To stop sharing, open **Share session…** again, choose the cross
beside them and save.

## While someone drives, nothing leaves as you

The agent works in your sandbox with your access. So while a guest who can drive
is in the session, it cannot fetch from your git hosts, push to them, or deploy
to Toft as you. The **Toft** tab says **Off while a guest drives**.

Once a guest has sent the agent anything, that holds for as long as the sandbox
lives, even after they leave — what they started may still be running. It ends
when the session next resumes on a new sandbox, for example after a pause.

Pushes to Garth itself still work, so you can commit and merge.
