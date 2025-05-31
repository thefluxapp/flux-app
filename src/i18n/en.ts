export const dict = {
  meta: {
    title: "Flux",
  },

  streams: {
    all: "All streams",
    my: {
      title: "Only my",
      empty: "Only logged-in users can see their own fluxes. Once you’re in, you'll see your list of active flows you’re following.",
    },
    meta: {
      title: "Streams",
    },
  },

  message: {
    reply: "Reply",
    like: "Like",
    submit: "Send",
  },

  new: {
    placeholder: "Start a new stream...",
  },

  stream: {
    more: "and {{count}} more",
    replies: "{{count}} replies",
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
    error: "Can’t send pushes to this device — try adding the site to your home screen",
    subscribed: "We’re already sending notifications to this device.",
    meta: {
      title: "Notifications",
    },
  },

  account: {
    title: "This will be your account page with all the settings and goodies",
    desc: "But we can't build it just yet :(",
  },

  soon: "Soon"
};
