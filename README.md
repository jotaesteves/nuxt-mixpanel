# nuxt-mixpanel

[![npm version](https://badge.fury.io/js/nuxt-mixpanel.svg)](https://badge.fury.io/js/nuxt-mixpanel)
[![Test Suite](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/jotaesteves/nuxt-mixpanel)

Unofficial Nuxt.js module for Mixpanel integration.

## Features

- 🚀 Easy Mixpanel integration with Nuxt.js
- 📊 Automatic page view tracking with Vue Router
- ⚙️ Configurable options
- 🔧 Environment variable support
- 📱 Client-side only (SSR safe)
- 🧪 Comprehensive test coverage
- 📝 TypeScript declarations included
- 🔄 GitHub Actions CI/CD ready
- 🛡️ Robust error handling and logging
- 🔧 Production-ready and battle-tested

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

## Verification

To verify that Mixpanel is working correctly:

1. **Check Browser Console**: Enable debug mode to see tracking events

   ```javascript
   mixpanel: {
     config: {
       debug: true;
     }
   }
   ```

2. **Check Network Tab**: Look for requests to Mixpanel's API endpoints

3. **Use Mixpanel's Live View**: Monitor events in real-time in your Mixpanel dashboard

## Troubleshooting

### Common Issues

**Module not working:**

- Ensure your Mixpanel token is correctly set
- Check that the module is properly registered in `nuxt.config.js`
- Verify that `mixpanel-browser` dependency is installed

**TypeScript errors:**

- Make sure TypeScript can find the type definitions
- Add `"types": ["nuxt-mixpanel"]` to your `tsconfig.json` if needed

**Page tracking not working:**

- Ensure `useRouter` is not set to `false`
- Check that Vue Router is properly configured in your Nuxt app
- Verify router integration in browser dev tools

**Configuration errors:**

- Recent versions (1.0.3+) include improved error handling for configuration issues
- Check the browser console for detailed error messages
- Ensure options.config is properly defined when using debug mode

### Recent Bug Fixes (v1.0.3)

- **Fixed critical configuration bug**: Resolved "Cannot read properties of undefined (reading 'debug')" error
- **Enhanced error handling**: Added try-catch blocks around Mixpanel initialization
- **Improved router integration**: Better error handling for router setup failures
- **Test suite reliability**: Fixed Jest mock isolation and setup issues

## Development

### Testing

This module includes a comprehensive test suite built with Jest covering 100+ test scenarios:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run linting
npm run lint
```

### Test Coverage

The test suite covers:

- ✅ **Vue Plugin Installation**: Testing Vue plugin registration and configuration with various options
- ✅ **Router Integration**: Automatic page view tracking with Vue Router and SPA navigation
- ✅ **Component Usage**: Testing $mixpanel availability and usage in Vue components
- ✅ **Event Tracking**: Verifying track(), identify(), and people methods functionality
- ✅ **Configuration Handling**: Testing various configuration options, priorities, and edge cases
- ✅ **Error Handling**: Graceful handling of initialization and tracking errors
- ✅ **Token Management**: Environment variables, module options, and runtime configuration
- ✅ **Store Integration**: Vuex store integration and context injection testing
- ✅ **Real-world Scenarios**: Complete e-commerce user journey testing from registration to purchase
- ✅ **Edge Cases**: Missing configurations, invalid tokens, network failures

### Quality Assurance

- **100+ automated tests** covering all major functionality
- **Comprehensive error handling** with graceful fallbacks
- **Production-ready** with battle-tested code
- **TypeScript support** with complete type definitions
- **ESLint integration** for code quality
- **CI/CD pipeline** with GitHub Actions

### Testing Examples

The test suite includes realistic scenarios like:

- User registration and authentication flows
- E-commerce shopping cart interactions
- Revenue tracking and user analytics
- SPA routing and page view tracking
- Error recovery and resilience testing

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## TypeScript Support

This module includes TypeScript declarations. If you're using TypeScript, you'll get full type checking and IntelliSense support for the Mixpanel integration.

## What's New

### Version 1.0.3 - Enhanced Stability

- **🛡️ Robust Error Handling**: Comprehensive try-catch blocks prevent initialization failures
- **🔧 Configuration Safety**: Fixed critical bugs with undefined configuration options
- **🧪 Test Suite Improvements**: Enhanced test reliability with better mock isolation
- **📊 Better Logging**: Improved error messages and debugging information

### Version 1.0.2 - Comprehensive Testing

- **🧪 100+ Test Scenarios**: Complete test coverage for all functionality
- **🔄 CI/CD Integration**: Automated testing with GitHub Actions
- **📝 TypeScript Support**: Full type definitions for better development experience
- **📚 Enhanced Documentation**: Comprehensive examples and troubleshooting guides

## Examples

For more detailed examples, check the `/examples` directory in the repository, which includes:

- Component usage patterns
- Vuex integration examples
- Middleware implementations
- Plugin configurations

## License

[MIT License](./LICENSE)
