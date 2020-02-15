<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# [BETA] Firestarter: a Gatsby's blog starter for Fireblog 🔥 with PWA support

Combine Gatbsy (A modern static site generator ideal for JAMstack architectures) and Fireblog to create a new blog experience : a super fast and simple back-office with a super fast and modern front-end !

Fireblog is a new headless CMS fully dedicated to blogging, you can try it here for free (one month trial) : https://app.fireblogcms.com/

This starter has been forked from [here](https://github.com/gatsbyjs/gatsby-starter-blog) and here [here](https://github.com/tomoyukikashiro/gatsby-starter-blog-amp-to-pwa) , thanks guys for your awesome work !

## AMP to PWA (WIP)

This starter has AMP to PWA Strategy (a.k.a. AMP as entry point into your PWA). Please check [original blog](https://www.ampproject.org/docs/integration/pwa-amp#amp-as-entry-point-into-your-pwa) for more detail.

## Features

- Pagination
- PWA (Progessive Web App), offline mode.
- (working on it) AMP support (Accelerated Mobile Page, a google web component framework)
- Images optimization with gatsby-image when possible
- Responsive
- Use your own logo and colors super easily with Sass & Bulma (https://bulma.io). See section "Customize for your brand"
- Google Analytics
- Social metatags for twitter, facebook, linkedin etc
- Preview 1900 external medias types (youtube, twitter, pinterest etc) with iframely (get your key here: https://iframely.com/) !
- Responsive navigation menu.

## Getting started

### Requirements

node.js >= 10.13 is required. Make sure you have a compatible version running `node -v` command in your terminal.

If you have to install node, you might be interested in using _nvm_ to install and switch easily between any node version.

### Installation

1. Download and execute Gatsby to create our blog:

```bash
$ npx gatsby new fireblog https://github.com/fireblogcms/gatsby-starter-fireblog
$ cd fireblog
```

2. Create a `.env` file and fill the variables from `.env.template` file.

- GATSBY_SITE_URL : the absolute URL of your site. For localhost, it will be "http://localhost:8000"
- GATSBY_FIREBLOG_GRAPHQL_ENDPOINT : url of your fireblog API. If not specified, a demo blog will be used so that you can try fireblog without creating an account.
- GATSBY_GOOGLE_ANALYTICS_TRACKING_ID : enable google analytics stats.

Running the dev server:

```bash
$ npm run develop
```

Build and serve the production files:

```bash
$ npm run build && npm run serve
```

## Customize for your brand

- Put your own logo to `static/images/logo.png`
- Edit `$primary` color from `src/scss/_variables.scss`. Feel free to customize any variables here !
- Customize css theme by editing `src/scss/_theme.scss`
- Configure top menu links, Progressive Web App name, and more by editing `./gatsby-config.js` file.

## 💫 Deploy

We love to use Netlify at fireblogcms.com because it is super easy to use and comes with great addons to makes your JAMstack site more spicy (lambdas function, forms etc).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fireblogcms/gatsby-starter-fireblog)
