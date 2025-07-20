# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2025-07-21

### Fixed

- Critical bug fix in vue-mixpanel.js: Added null check for options.config.debug to prevent "Cannot read properties of undefined" error
- Enhanced error handling in Mixpanel initialization with try-catch blocks
- Improved router integration error handling
- Fixed Jest test suite with proper mock isolation and setup
- Resolved consola mock initialization issues in test suite

### Added

- Enhanced error logging for failed Mixpanel initialization
- Better error handling for router integration failures
- Improved test setup with proper mock isolation between tests
- Additional test scenarios for error handling

### Changed

- Updated configuration merging logic to be more robust
- Improved test reliability with better mock management
- Enhanced error messages and logging throughout the codebase

## [1.0.2] - 2025-07-21

### Added

- Comprehensive test suite with Jest
  - Vue plugin unit tests
  - Nuxt module integration tests
  - Plugin injection and context tests
  - End-to-end integration scenarios
  - Real-world e-commerce user journey tests
- TypeScript declaration files for better IDE support
- NPM configuration file (.npmrc)
- GitHub Actions CI/CD workflow
- Babel configuration for ES6+ support in tests
- Test documentation and coverage reports
- Usage examples for various scenarios (components, Vuex, middleware)
- Test runner script for basic functionality verification

### Changed

- Added comprehensive test dependencies:
  - jest: ^29.7.0
  - @vue/test-utils: ^1.3.6
  - babel-jest: ^29.7.0
  - vue-jest: ^3.0.7
- Updated package.json with test scripts and metadata
- Version bump from 1.0.1 to 1.0.2

## [1.0.1] - 2025-07-21

### Added

- Enhanced documentation with comprehensive usage examples
- ESLint configuration for better code quality
- Example Nuxt.js configuration file
- Node.js engine requirements in package.json
- Better error handling and logging

### Changed

- Updated dependencies to latest versions:

  - mixpanel-browser: ^2.48.1
  - consola: ^3.2.3
  - eslint: ^8.57.0
  - eslint-plugin-vue: ^9.19.2

- Improved module function naming and structure
- Enhanced plugin configuration with better token handling
- Fixed logger references to use consola consistently

### Fixed

- Corrected index.js to properly export the module
- Fixed logger references in vue-mixpanel.js
- Improved error handling in module initialization
- Enhanced token validation and warnings

## [1.0.0] - Initial Release

### Features

- Basic Mixpanel integration for Nuxt.js
- Automatic page view tracking with Vue Router
- Environment variable support
- Configurable options
