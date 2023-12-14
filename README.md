[![Start Geins Free Trial][geins-tiral-img]][geins-tiral-url] [![Geins Docs][geins-docs-img]][geins-docs-url]

[![geins](https://raw.githubusercontent.com/geins-io/resources/master/images/banners/repos/ralph.jpg)](https://www.geins.io)

# Ralph Storefront - PWA Launchpad for Geins Commerce

This is a [Nuxt.js](https://v2.nuxt.com/) storefront fully integrated with Geins Commerce.

## Pre-requisites

- Geins account - [Get a free trial here](https://www.geins.io)
- [Node.js](https://nodejs.org/en/) 16.x.x

## Getting started

1. Sign up for a free trial at [geins.io](https://www.geins.io)
2. Fork this repository
3. Create an .env file in the root of your project. See the file [.env.example](.env.example) for a specification of what variables you need to set.
4. Now you're ready to start developing your storefront

## Start development environment

Install dependencies and then start the development server with hot reload

```bash
npm install
npm run dev
```

You can now access your storefront at [localhost:3000](http://localhost:3000)

## General setup

### Nuxt config

In the Nuxt config file [nuxt.config.js](nuxt.config.js) you can set up most things, for example routes configuration and your runtime config (global variables that are accessed through the `$config` object). Please refer to the [Nuxt Configuration Glossary](https://v2.nuxt.com/docs/configuration-glossary) for more information.

### Channel settings

You will find some channel settings in [config/channel-settings.js](config/channel-settings.js). This is a good place to set up and add variables that differs between channels. All variables added to the `theme` propery will get converted into global CSS variables and can be used throughout the application. The channel settings are imported into the Nuxt config file and can be used for setup there.

### Design setup

#### Assets

Add your desired logos and fonts etc to the `assets` folder. In the `static` folder, you should replace the `favicon.ico`, `icon.png` and the `meta-image-fallback.jpg` with your own. Here is also where you can add assets for your Geins generated mails, in the `static/mail` folder.

#### Styles

In the `styles` folder, you'll find all the styles for the application. For the general setup, it is suggested to look through the `styles/variables` folder, and also the `styles/globlal` and the `styles/helpers` folders.

All styles are written in [SASS](https://sass-lang.com/), and the styles are structured according to the [BEM methodology](http://getbem.com/introduction/).

## Components

Ralph Storefront utilizes [Ralph UI](https://www.npmjs.com/package/@geins/ralph-ui), a component and core functionality library for Ralph Storefront. This is where most of the components are located. You can override any component from Ralph UI by creating a component with the same name in the `components` folder. The `components` folder is structured according to the [Atomic Design methodology](https://atomicdesign.bradfrost.com/chapter-2/).

### Override Ralph UI components

The easiest way to override a component or style from Ralph UI is to use the `ralph-ride` command. This will create a scss file or both component and scss files in the correct folder structure, and you can then edit them to your liking.

```bash
npm run ralph-ride
```

### Create new components

If you want to create a new component, you can use the `ralph-create` command. This will create a component file and a scss file in the correct folder structure, and you can then edit them to your liking.

```bash
npm run ralph-create
```

### Ralph UI components documentation

To see the current documentation for the version of Ralph UI you are using, run the following command:

```bash
npm run ralph-ui-docs
```

This will open upp a locally hosted documentation page for your version of Ralph UI.

## Pages

In the `pages` folder, you'll find all the pages for the application. File names that begin with an underscore are used for dynamic routes. For example, `product/_alias.vue` is used to generate the product detail page dynamically based on the alias in the url. Read more about pages in the [Nuxt documentation](https://v2.nuxt.com/docs/directory-structure/pages).

## Layouts

In the `layouts` folder, you can add or edit the layouts for the application. Read more about layouts in the [Nuxt documentation](https://v2.nuxt.com/docs/directory-structure/layouts#layouts-directory).

## Build for production

When you want to test your site for production locally, this is how you build for production and launch the server

```bash
npm run build
npm run start
```

## Learn more

Visit the Geins Commerce [documentation](https://docs.geins.io) to learn more about Geins Commerce, Ralph Storefront and everything else in the Geins Commerce ecosystem.

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](CHANGELOG.md).

[geins-docs-url]: https://docs.geins.io
[geins-docs-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-docs-read-v3.json
[geins-tiral-url]: https://www.geins.io
[geins-tiral-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-fee-tiral.json
