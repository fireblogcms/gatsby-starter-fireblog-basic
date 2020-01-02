<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">
  Work in progress - Firefly :a Fireblog & Gatsby's blog starter with AMP & PWA support.
</h1>

## What's is this ?

This is a Gatsby's blog start which is forked from [here](https://github.com/gatsbyjs/gatsby-starter-blog) and here [here](https://github.com/tomoyukikashiro/gatsby-starter-blog-amp-to-pwa)

## AMP to PWA

This starter has AMP to PWA Strategy (a.k.a. AMP as entry point into your PWA). Please check [original blog](https://www.ampproject.org/docs/integration/pwa-amp#amp-as-entry-point-into-your-pwa) for more detail.

## Getting started

node >= 10.13 is required.

> I recommend using "nvm" if you need to install node : https://github.com/nvm-sh/nvm/blob/master/README.md
> It allows you to install and use the node version of your choice.

```bash
$ npx gatsby new fireblog https://github.com/fireblogcms/gatbsy-starter-fireblog-firefly
$ cd fireblog
```

Now create a `.env` file and fill the variables from `.env.template` file.

To develop locally:

```bash
$ yarn develop
```

To build and serve the production files:

```bash
$ yarn run build && yarn run serve
```

You can check articles in following URLs.

- Non-AMP：http://localhost:9000
- AMP：http://localhost:9000/amp/

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fireblogcms/gatbsy-starter-fireblog-firefly)

## TODO

- [ ] Remove min-with 268px for div wrapping images in posts list
- [ ] Post title should be a h1 tag, not h2
- [ ] Post list must handle posts without image nicely
- [ ] Add a way to come back to post lists when we are on a full post
- [ ] Add "last articles"
- [ ] Add social medias
- [ ] Add author
- [ ] check quotes, media, instagram, youtube etc
- [ ] pagination
- [ ] Next / Previous article
- [ ] fix Gatbsy picture for author.
