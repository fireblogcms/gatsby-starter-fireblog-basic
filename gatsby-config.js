require("dotenv").config();

module.exports = {
  siteMetadata: {
    postsPerPage: 2,
    lang: "en",
    siteUrl: process.env.SITE_URL,
    socials: {
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com",
      twitter: "https://www.twitter.com"
    }
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
        // Url to query from
        url: process.env.FIREBLOG_GRAPHQL_ENDPOINT
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
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
            title: "Gatsby RSS Feed"
          }
        ]
      }
    },
    */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fireblog Starter Blog`,
        short_name: `Fireblog Gatbsy Blog`,
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
