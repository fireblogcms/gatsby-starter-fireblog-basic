require('dotenv').config();

module.exports = {
  siteMetadata: {
    // absolute url of your site, e.g https://example.com. Required
    // to build some absolute links.
    siteUrl: process.env.GATSBY_SITE_URL,
    // default language of your site, also used as a html attribute
    lang: 'en',
    // how many posts are display per page on post list page
    postsPerPage: 20,
    // links for the top menu
    menuLinks: [
      {
        title: 'Home',
        props: {
          to: '/',
        },
      },
      {
        title: 'Back to site',
        props: {
          to: 'https://fireblogcms.com',
          target: '_blank',
          id: 'back-to-site',
        },
      },
    ],
    readMoreText: 'Read more',
    followUsText: 'Follow us',
    recentPostsText: 'Latest posts',

    // links to your social accounts.
    // @see components/socials.js
    // Use an empty string as value to disable a specific social network
    socials: {
      linkedin: 'https://www.linkedin.com/',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://twitter.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
    },
  },
  plugins: [
    {
      resolve: `gatsby-theme-fireblog-basic`,
      options: {
        graphqlEndpoint: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT, // required
        blogId: process.env.GATSBY_BLOG_ID, // required
        analyticsTrackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID, // optinonal
        // blogPath: "/blog",
        manifestOptions: {
            icon: `static/images/logo.png`,
            // name of the application when site
            // is installed as an application (PWA)
            name: 'Coolest Fireblog',
            short_name: 'Fireblog',
            start_url: `/`,
            background_color: `#ffffff`,
            theme_color: `#663399`,
            display: `minimal-ui`,
        }
      }
    }
  ],
}