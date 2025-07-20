# nuxt-mixpanel

[![npm version](https://badge.fury.io/js/nuxt-mixpanel.svg)](https://badge.fury.io/js/nuxt-mixpanel)

Unofficial Nuxt.js module for Mixpanel integration.

## Features

- 🚀 Easy Mixpanel integration with Nuxt.js
- 📊 Automatic page view tracking with Vue Router
- ⚙️ Configurable options
- 🔧 Environment variable support
- 📱 Client-side only (SSR safe)

## Installation

```bash
npm install nuxt-mixpanel
# or
yarn add nuxt-mixpanel
```

## Setup

Add the module to your `nuxt.config.js`:

```javascript
export default {
  modules: ["nuxt-mixpanel"],

  mixpanel: {
    token: "YOUR_MIXPANEL_TOKEN",
  },
};
```

## Configuration

### Environment Variables

You can also configure the token using environment variables:

```bash
MIXPANEL_TOKEN=your_token_here
```

### Module Options

```javascript
export default {
  mixpanel: {
    token: "YOUR_MIXPANEL_TOKEN",
    config: {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    },
    name: "mixpanel", // optional
    disabled: false, // optional
    useRouter: true, // optional, enables automatic page tracking
  },
};
```

## Usage

### In components

```javascript
export default {
  mounted() {
    // Track an event
    this.$mixpanel.track("Button Clicked", {
      button: "header-cta",
      page: this.$route.path,
    });

    // Identify a user
    this.$mixpanel.identify("user-123");

    // Set user properties
    this.$mixpanel.people.set({
      $email: "user@example.com",
      $name: "John Doe",
    });
  },
};
```

### In Vuex store

```javascript
// In your Vuex actions
export default {
  actions: {
    login({ commit }, user) {
      // Your login logic
      commit("SET_USER", user);

      // Track login event
      this.$mixpanel.track("User Login", {
        method: "email",
      });
    },
  },
};
```

### In asyncData or plugins

```javascript
export default {
  asyncData({ $mixpanel }) {
    $mixpanel.track("Page Loaded", {
      page: "home",
    });
  },
};
```

## Automatic Page Tracking

By default, this module will automatically track page views when using Vue Router. You can disable this by setting `useRouter: false` in the module options.

The tracked event will be named 'Page Viewed' and include the full path of the page.

## License

[MIT License](./LICENSE)
