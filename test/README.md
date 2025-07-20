# Test Suite Documentation

## Overview

This test suite provides comprehensive coverage for the nuxt-mixpanel module, including unit tests, integration tests, and end-to-end testing scenarios.

## Test Structure

### 1. Vue Plugin Tests (`test/mixpanel.test.js`)

- Plugin installation with various configurations
- Router integration and automatic page tracking
- Component integration and API usage
- Error handling scenarios

### 2. Nuxt Module Tests (`test/module.test.js`)

- Module configuration and option merging
- Environment variable handling
- Token validation and warnings
- Plugin injection logic
- Module disabling functionality

### 3. Plugin Tests (`test/plugin.test.js`)

- Nuxt plugin initialization
- Context and injection setup
- Store integration
- Router configuration logic
- Token priority handling

### 4. Integration Tests (`test/integration.test.js`)

- Complete user journey scenarios
- SPA routing integration
- Error handling in real-world scenarios
- Configuration variations

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Coverage Areas

✅ **Plugin Installation**: Testing Vue plugin registration and configuration
✅ **Router Integration**: Automatic page view tracking with Vue Router
✅ **Component Usage**: Testing $mixpanel availability in components
✅ **Event Tracking**: Verifying track(), identify(), and people methods
✅ **Configuration**: Testing various configuration options and priorities
✅ **Error Handling**: Graceful handling of initialization and tracking errors
✅ **Token Management**: Environment variables, module options, and runtime config
✅ **Store Integration**: Vuex store integration testing
✅ **Context Injection**: Nuxt context and injection testing

## Test Data

Tests use realistic e-commerce scenarios including:

- User registration and login flows
- Product catalog browsing
- Shopping cart interactions
- Purchase completion workflows
- Revenue tracking

## Mocking Strategy

- **mixpanel-browser**: Fully mocked with Jest to simulate Mixpanel API
- **consola**: Mocked for logging verification
- **Vue Router**: Mocked for route change simulation
- **Environment Variables**: Controlled for predictable testing

## Best Practices

1. **Isolation**: Each test is isolated with proper setup/teardown
2. **Realistic Scenarios**: Tests mirror real-world usage patterns
3. **Error Coverage**: Both happy path and error scenarios are tested
4. **Configuration Variants**: Multiple configuration combinations are tested
5. **Integration Focus**: Tests verify actual integration points, not just unit behavior
