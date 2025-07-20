# Changelog

All notable changes to this project will be documented in this file.

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

### Added

- Basic Mixpanel integration for Nuxt.js
- Automatic page view tracking with Vue Router
- Environment variable support
- Configurable options
