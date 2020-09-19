<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# A Gatsby's blog starter for Fireblog 🔥 with PWA support

Combine Gatbsy (A modern static site generator ideal for JAMstack architectures) and Fireblog to create a new blog experience : a super fast and simple back-office with a super fast and modern front-end !

Fireblog is a new headless CMS fully dedicated to blogging, you can try it here for free (one month trial) : https://app.fireblogcms.com/

## Features

- Fast and SEO friendly
- PWA (Progessive Web App), offline mode.
- Images optimization with fireblog API
- Responsive
- Pagination
- Easy to customize with Sass & Bulma (https://bulma.io). See section "Customize for your brand"
- Google Analytics
- Social metatags for sharing your posts on twitter, facebook, linkedin etc
- Automatic rich preview for + 1900 external media types (youtube, twitter, pinterest, typeform etc)
- Responsive navigation menu.

## Getting started

### Requirements

node.js >= 10.13 is required. Make sure you have a compatible version running `node -v` command in your terminal.

If you have to install node, you might be interested in using _nvm_ to install and switch easily between any node version.

### Installation

#### 1. Download and execute Gatsby to create your own blog:

```bash
$ npx gatsby new fireblog https://github.com/fireblogcms/gatsby-starter-fireblog
$ cd fireblog
```

#### 2. Create a `.env` file and fill all required variables from `.env.template` file.

Running the dev server:

```bash
$ npm run develop
```

Build the production files:

```bash
$ npm run build
```

Serve your final static blog !

```bash
$ npm run serve
```

#### 3. 💫 Deploy

Your final site is now ready to be served from "public" directory !

To deploy static sites, we love to use Netlify at fireblogcms.com because it is super easy to use and comes with great addons to makes your JAMstack sites more spicy (lambdas function, forms etc).

## Customize theme for your brand

- Put your own logo to `static/images/logo.png`
- Customize variables from `src/scss/_variables.scss` file.
- Customize css theme by editing `src/scss/_theme.scss`
- Configure top menu links, Progressive Web App name, and more by editing `./gatsby-config.js` file.
