require("dotenv").config();

const config = {
  siteMetadata: {
    // default language of your site, used as a html attribute
    lang: "en",
    postsPerPage: 20,
    // absolute url of your site, e.g https://example.com. Required
    // to build some links for AMP and PWA.
    siteUrl: process.env.SITE_URL,
    // links to your social accounts.
    // @see components/socials.js
    // Use an empty string as value to disable a specific social network
    socials: {
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com",
      twitter: "https://www.twitter.com"
    },
    // hide or display post author.
    displayAuthor: false
  },
  plugins: [
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
        url: process.env.FIREBLOG_GRAPHQL_ENDPOINT
          ? process.env.FIREBLOG_GRAPHQL_ENDPOINT
          : "https://api.fireblogcms.com/graphql/blog/5e0cc6b2c96420000444d376"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl + "posts" + edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl + "posts" + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Fireblog RSS Feed"
          }
        ]
      }
    },
    */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fireblog Starter Blog`,
        short_name: `Fireblog Starter Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`
      }
    },
    {
      resolve: "gatsby-plugin-html2amp",
      options: {
        files: ["index.html", "pages/**/index.html", "post/**/index.html"],
        gaConfigPath: "gaConfig.json",
        dist: "public/amp",
        serviceWorker: {
          src: `https://${process.env.SITE_URL}/sw.js`,
          "data-iframe-src": `https://${process.env.SITE_URL}/amp-install-serviceworker.html`,
          layout: "nodisplay"
        }
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ]
};

if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
    }
  });
}

module.exports = config;
