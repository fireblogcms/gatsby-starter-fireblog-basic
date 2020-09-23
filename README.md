# Gatsby blog starter for Fireblog CMS with PWA support

Combine Gatbsy (a modern static site generator ideal for JAMstack architectures) and Fireblog CMS to create a new blog experience: a super fast and simple back-office with a super fast and modern front-end!

Fireblog (https://fireblogcms.com) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try it for free (one month trial): https://app.fireblogcms.com.

## Features

- Fast and SEO friendly
- Offline mode
- Images optimization with Fireblog API
- Responsive
- Pagination
- Easy to customize with Sass & Bulma (https://bulma.io). See section "Customize for your brand"
- Google Analytics

## Getting started

### Requirements

node.js >= 10.13 is required. Make sure you have a compatible version running `node -v` command in your terminal.

If you have to install node, you might be interested in using `nvm` to install and switch easily between any node version.

### Installation

Generate starter code

```sh
npx gatsby new fireblog https://github.com/fireblogcms/gatsby-starter-fireblog
cd fireblog
```

Create a `.env` file copied from the `.env.template` file and set your environment variables

```sh
cp .env.template .env
```

You can now run dev server

```sh
npm run develop
```

Or build the production files

```sh
npm run build
```

Serve your final static locally

```bash
npm run serve
```

💫 Deploy

After the build, your blog is ready inside the `public` directory!

To deploy static sites, we love to use Netlify at fireblogcms.com because it is super easy to use and comes with great addons to makes your JAMstack sites spicier (lambdas functions, forms etc).

## Customize theme for your brand

- Put your own logo to `static/images/logo.png`
- Customize variables from `src/scss/_variables.scss` file
- Customize css theme by editing `src/scss/_theme.scss`
- Configure top menu links, Progressive Web App name, and more by editing `./gatsby-config.js` file
