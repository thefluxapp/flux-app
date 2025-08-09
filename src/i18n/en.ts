export const dict = {
  meta: {
    title: "Flux",
  },

  header: {
    about: "What is a Flux?",
  },

  streams: {
    all: "All streams",
    my: {
      title: "Only my",
      empty:
        "Only logged-in users can see their own fluxes. Once you’re in, you'll see your list of active flows you’re following.",
    },
    meta: {
      title: "Streams",
    },
  },

  message: {
    reply: "Reply",
    replies: "Replies {{count}}",
    like: "Like",
    submit: "Send",
  },

  new: {
    placeholder: "Start a new stream...",
  },

  stream: {
    more: "and {{count}} more",
    replies: "To replies",
    auto: "Auto",
    summary: "Summary",
  },

  login: {
    title: "Sign in with a passkeys",
    desc: "You can use a fingerprint, face scan or screen lock instead of a password",
    email: "Email",
    hint: "Email is used only as an ID and for recovery, no notifications or codes are sent",
    button: "Login",
  },

  complete: {
    title: "Complete registration",
    desc: "Account not found, please complete sign up. The name are used by AI, so they must be filled in, and if you specify fake ones, then the algorithm may work worse",
    first_name: "First name",
    last_name: "Last name",
    button: "Sign up",
  },

  loader: {
    desc: "The stream shows the last 5 messages, the rest are summarized to a couple of sentences, which can be manually scaled and discover only the necessary.",
    unread: "XXX-unread",
    button: "Load more past messages",
  },

  notify: {
    title: "Notifications & Pushes",
    desc: "To get push notifications about new messages in your flows, you need to give the app permission. Tap the button to start getting pushes on this device.",
    button: "Allow Notifications",
    error:
      "Can’t send pushes to this device — try adding the site to your home screen",
    subscribed: "We’re already sending notifications to this device.",
    meta: {
      title: "Notifications",
    },
  },

  account: {
    title: "This will be your account page with all the settings and goodies",
    desc: "But we can't build it just yet :(",
  },

  about: {
    meta: {
      title: "What is a Flux?",
    },

    title: "What is a Flux?",
    desc: "Flux is a space where you speak and read at your own pace. Say it how you want. Read when it fits.",

    summary: {
      title: "Messages don’t pile up",
      text: [
        "Every message can start a new direction. It instantly gets a short summary — simple, clear, to the point.",
        "You don’t have to open everything. Just scroll and see what matters.",
        "You choose the detail — one line or a bit more. Flux adjusts to you.",
      ],
    },

    streams: {
      title: "New fluxes grow from any message",
      text: [
        "Conversations in Flux shift naturally. One thought leads to another — no friction.",
        "A new direction isn’t a new room. It’s just the next idea. It shows up right under the message — with a short summary of what’s inside.",
        "You stay in one view. Everything stays connected.",
      ],
    },

    adhoc: {
      title: "Instant side chats — no group needed",
      text: [
        "No need to create a new group just to talk. Pick a message, invite who you want — and start.",
        "Bring in one person. A few. Or no one — just to save the thought.",
        "Flux fits how people actually talk. Fast. Fluid. Straight to the point.",
      ],
    },

    rhythm: {
      title: "Your rhythm matters",
      text: [
        "New content comes fast. But there’s no rush. Each update has a short version — you choose when to go deeper.",
        "Go full detail when it’s worth it. Skim when it’s not. You’re always in sync, even if you’re days behind.",
      ],
    },

    ai: {
      title: "Built on AI — not built around it",
      text: [
        "Flux uses AI to make reading smoother. No fake bots. Just clean summaries and faster flow.",
        "It’s not a trendy add-on. It’s what makes Flux possible.",
      ],
    },
  },

  soon: "Soon",
};
