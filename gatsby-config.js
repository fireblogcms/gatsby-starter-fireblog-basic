require("dotenv").config();

const config = {};

config.siteMetadata = {
  // default language of your site, also used as a html attribute
  lang: "en",
  // absolute url of your site, e.g https://example.com. Required
  // to build some links for AMP and PWA.
  siteUrl: process.env.GATSBY_SITE_URL,
  // how many posts are display per page on post list page
  postsPerPage: 20,
  // links for the top menu
  menuLinks: [
    {
      title: "Home",
      props: {
        to: "/"
      }
    },
    {
      title: "Back to site",
      props: {
        to: "https://fireblogcms.com",
        target: "_blank",
        id: "back-to-site"
      }
    }
  ],
  readMoreText: "Read more",
  followUsText: "Follow us",
  // Used when users install your blog to their
  // home screen on most mobile browsers
  manifestName: "Fireblog",
  manifestShortName: "Fireblog",

  // links to your social accounts.
  // @see components/socials.js
  // Use an empty string as value to disable a specific social network
  socials: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/"
  },

  displayAuthor: false
};

config.plugins = [
  `gatsby-plugin-sass`,
  // Simple config, passing URL
  {
    resolve: "gatsby-source-graphql",
    options: {
      // This type will contain remote schema Query type
      typeName: "Fireblog",
      // This is field under which it's accessible
      fieldName: "fireblog",
      // Url to query from. Use default demo blog if no env variable is found.
      url: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT
        ? process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT
        : "https://api.fireblogcms.com/graphql/blog/5e0cc6b2c96420000444d376"
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  // The web app manifest(part of the PWA specification) enabled by this plugin
  // allows users to add your site to their home screen
  // on most mobile browsers — see here.
  // The manifest provides configuration and icons to the phone.
  // this plugin should be listed before the offline plugin so
  // that it can cache the created manifest.webmanifest.
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      icon: `static/images/logo.png`,
      name: config.siteMetadata.manifestName,
      short_name: config.siteMetadata.manifestShortName,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`
    }
  },
  //{
  //  resolve: "gatsby-plugin-html2amp",
  //  options: {
  //    files: ["index.html", "pages/**/index.html", "post/**/index.html"],
  //    gaConfigPath: "gaConfig.json",
  //    dist: "public/amp",
  //    serviceWorker: {
  //      src: `https://${process.env.GATSBY_SITE_URL}/sw.js`,
  //      "data-iframe-src": `https://${process.env.GATSBY_SITE_URL}/amp-install-serviceworker.html`,
  //      layout: "nodisplay"
  //    }
  //  }
  //},
  // gatsby-plugin-offline MUST BE USED AFTER MANIFEST !
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: "gatsby-plugin-load-script",
    options: {
      disable: !process.env.GATSBY_IFRAMELY_API_KEY, // When do you want to disable it ?
      src: `https://cdn.iframe.ly/embed.js?api_key=${process.env.GATSBY_IFRAMELY_API_KEY}`
    }
  },
  // Add after these plugins if used
  {
    resolve: `gatsby-plugin-purgecss`,
    options: {
      // protect .content class from Bulma
      whitelistPatternsChildren: [/^content$/],
      printRejected: true, // Print removed selectors and processed file names
      develop: false // Enable while using `gatsby develop`
    }
  }
];

if (process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID
    }
  });
}

module.exports = config;
