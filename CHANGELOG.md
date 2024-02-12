# Changelog

## [2.1.0] - 2024-02-12

### Added

- Switch for internal/external shipping
- General Ralph build module

### Changed

- Updated to Ralph UI 21.1.0
- Removed deprecated component `CaCheckoutCarismar` and using `CaCheckoutInvoice` instead

### Fixed

- Do not show internal checkout confirm when external checkout

## [2.0.0] - 2023-12-14

### Added

- Support for Node 16 ✨
- CHANGELOG.md file

### Changed

- Updated to Nuxt.js 2.17.2
- Updated to Ralph UI 21.0.0
- Updated/Added/Removed a lot of other dependencies
- Updated js and scss linting
- Moved a lot of components and functions to Ralph UI
- Cleansing of `nuxt.config.js`, splitting functions into config files

### Removed

- Removed persitedState plugin, using new internal persist from Ralph UI
