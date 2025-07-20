// Example usage patterns for nuxt-mixpanel

// 1. Basic component usage
export default {
  name: 'HomePage',
  mounted() {
    // Track page visit
    this.$mixpanel.track('Home Page Visited', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    });
  },
  methods: {
    trackButtonClick(buttonName) {
      this.$mixpanel.track('Button Clicked', {
        button_name: buttonName,
        page: this.$route.path,
        timestamp: new Date().toISOString()
      });
    },

    identifyUser(userId, userProps = {}) {
      // Identify the user
      this.$mixpanel.identify(userId);

      // Set user properties
      this.$mixpanel.people.set({
        '$email': userProps.email,
        '$name': userProps.name,
        '$created': userProps.createdAt,
        ...userProps
      });
    }
  }
};

// 2. Vuex store integration
export const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      const user = await this.$auth.login(credentials);
      commit('SET_USER', user);

      // Track login event
      this.$mixpanel.track('User Login', {
        method: 'email',
        success: true,
        timestamp: new Date().toISOString()
      });

      // Identify user in Mixpanel
      this.$mixpanel.identify(user.id);
      this.$mixpanel.people.set({
        '$email': user.email,
        '$name': user.name,
        '$last_login': new Date().toISOString()
      });

      return user;
    } catch (error) {
      this.$mixpanel.track('User Login', {
        method: 'email',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  async purchase({ commit }, { productId, amount, currency = 'USD' }) {
    // Track purchase event
    this.$mixpanel.track('Purchase', {
      product_id: productId,
      amount: amount,
      currency: currency,
      timestamp: new Date().toISOString()
    });

    // Track revenue
    this.$mixpanel.people.track_charge(amount, {
      product_id: productId,
      currency: currency
    });
  }
};

// 3. Plugin usage (in plugins/ directory)
export default function({ $mixpanel, error }) {
  // Track application errors
  if (error) {
    $mixpanel.track('Application Error', {
      error_message: error.message,
      error_stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  // Track page views globally (if not using router integration)
  if (process.client) {
    window.addEventListener('beforeunload', () => {
      $mixpanel.track('Page Unload', {
        page: window.location.pathname,
        duration: Date.now() - window.pageStartTime,
        timestamp: new Date().toISOString()
      });
    });
  }
}

// 4. Async data usage
export default {
  async asyncData({ $mixpanel, params, error }) {
    try {
      const data = await fetchData(params.id);

      // Track successful data load
      $mixpanel.track('Data Loaded', {
        data_type: 'product',
        data_id: params.id,
        timestamp: new Date().toISOString()
      });

      return { data };
    } catch (err) {
      // Track data loading error
      $mixpanel.track('Data Load Error', {
        data_type: 'product',
        data_id: params.id,
        error: err.message,
        timestamp: new Date().toISOString()
      });

      error({ statusCode: 500, message: 'Data loading failed' });
    }
  }
};

// 5. Middleware usage (in middleware/ directory)
export default function({ $mixpanel, route, redirect }) {
  // Track route changes
  $mixpanel.track('Route Change', {
    from: route.from?.path,
    to: route.path,
    timestamp: new Date().toISOString()
  });

  // Track protected route access
  if (route.meta?.requiresAuth && !$auth.loggedIn) {
    $mixpanel.track('Unauthorized Access Attempt', {
      route: route.path,
      timestamp: new Date().toISOString()
    });

    return redirect('/login');
  }
}
