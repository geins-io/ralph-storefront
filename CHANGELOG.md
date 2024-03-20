# Changelog

## [2.3.0] - 2024-03-20

This update aims to improve TTFB and other performance metrics.

### Added

- Caching and compressing modules

### Changed

- Lazyloading components that might not need to be shown
- Better skeleton for product cards

## [2.2.0] - 2024-02-29

### Added

- Added `ralphLog` object in `nuxt.config.js` to enable/disable dev console logs
- Added lang key `FEEDBACK_ORGANIZATION_ID_NOT_VALID`
- Added `@vuese/cli` package to `devDependencies` to be able to show Ralph UI documentation locally

### Changed

- Using `nextPageLoading` and `prevPageLoading` in `CaListPage`, to make loading indicators work with Ralph UI 22.0.0
- Passing `:data="confirmSnippet"` to `CaCheckoutExternal` in confirm page instead of the old `:confirm="true"`
- Passing `:widget-data="widgetData"` to `CaWidgetArea` on content pages and removing the event handler
- Using only `MixProductPage` in product page since that mixin now includes `MixAddToCart` and `MixVariantHandler`

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
