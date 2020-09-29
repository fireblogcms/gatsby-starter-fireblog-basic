const path = require(`path`);
require('dotenv').config();
const config = require('./gatsby-config');

/**
 * Create programmatically static pages for
 * our paginated post list and each post.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const blogPost = path.resolve(`./src/templates/post.js`);
  const blogPostList = path.resolve(`./src/templates/post-list.js`);

  const postsFilter = { blog: { eq: process.env.GATSBY_BLOG_ID } };
  const { data } = await graphql(
    `
      query postsCount($filter: Fireblog_PostFilter) {
        fireblog {
          postsCount(filter: $filter)
        }
      }
    `,
    { filter: postsFilter }
  );
  const postsCount = data.fireblog.postsCount;

  let limit = config.siteMetadata.postsPerPage;
  let page = 1;
  let skip = 0;
  let totalPages = Math.ceil(postsCount / limit);
  while (page <= totalPages) {
    const { data } = await graphql(
      `
        query posts($filter: Fireblog_PostFilter, $limit: Int!, $skip: Int) {
          fireblog {
            posts(
              limit: $limit
              skip: $skip
              filter: $filter
              sort: { publishedAt: desc }
            ) {
              teaser
              slug
              title
              content
              publishedAt
              updatedAt
              image(auto: [compress, format]) {
                url
              }
              imagePostList: image(
                w: 400
                h: 220
                fit: crop
                crop: center
                auto: [compress, format]
              ) {
                url
              }
            }
          }
        }
      `,
      { limit, skip, filter: postsFilter, blog: process.env.GATSBY_BLOG_ID }
    );

    /**
     * Create a pagination page for this post list
     */
    let pagePath = page === 1 ? '/' : `/pages/${page}/`;
    let fullUrl = `${process.env.GATSBY_SITE_URL}${
      pagePath === '/' ? '' : pagePath
    }`;

    // create post listing page for current page.
    createPage({
      path: pagePath,
      component: blogPostList,
      context: {
        skip: skip,
        limit: limit,
        postsCount: postsCount,
        blog: process.env.GATSBY_BLOG_ID,
        page: page,
        url: fullUrl,
      },
    });

    /**
     * Create a page for each retrieved post.
     */
    const { posts } = data.fireblog;
    posts.forEach(post => {
      const pagePath = `/post/${post.slug}/`;
      createPage({
        path: pagePath,
        component: blogPost,
        context: {
          blog: process.env.GATSBY_BLOG_ID,
          slug: post.slug,
          url: `${process.env.GATSBY_SITE_URL}${pagePath}`,
        },
      });
    });

    skip = page * limit;
    page++;
  }

  createRedirect({
    fromPath: `/pages/1`,
    isPermanent: false,
    redirectInBrowser: true,
    toPath: `/`,
  });
};

// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// @see also "./src/components/MenuLink.js" component.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadataMenuLinksProps {
      to: String!
      title: String
      rel: String
      target: String
      id: String
      className: String
    }
  `;
  createTypes(typeDefs);
};
