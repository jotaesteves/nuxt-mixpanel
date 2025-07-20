// Example nuxt.config.js configuration
export default {
  // Modules
  modules: [
    'nuxt-mixpanel'
  ],

  // Mixpanel configuration
  mixpanel: {
    token: process.env.MIXPANEL_TOKEN || 'YOUR_MIXPANEL_TOKEN_HERE',
    config: {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: true,
      persistence: 'localStorage',
      // Add other Mixpanel config options here
    },
    disabled: process.env.NODE_ENV === 'development', // Optional: disable in development
    useRouter: true // Enable automatic page view tracking
  },

  // Runtime config for environment variables
  publicRuntimeConfig: {
    mixpanelToken: process.env.MIXPANEL_TOKEN
  }
};
