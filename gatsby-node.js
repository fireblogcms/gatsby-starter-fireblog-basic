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

  let hasNextPage = true;
  let page = 1;
  while (hasNextPage) {
    const { data } = await graphql(
      `
        {
          fireblog {
            posts(itemsPerPage: ${config.siteMetadata.postsPerPage}, page: ${page}, filter: { blog: { eq : "${process.env.GATSBY_BLOG_ID}" } }) {
              pagination {
                totalItems
                totalPages
                hasNextPage
                hasPreviousPage
              }
              items {
                teaser
                slug
                title
                content
                publishedAt
                updatedAt
                image(auto:[compress,format]) {
                  url
                  alt
                }
                imagePostList:image(w:400, h:220, fit:crop, crop:center, auto:[compress,format]) {
                  url
                  alt
                }
              }
            }
          }
        }
      `
    );
    const { pagination, items: posts } = data.fireblog.posts;
    /**
     * Create a pagination page for this post list
     */
    let pagePath = page === 1 ? '/' : `/pages/${page}/`;
    let fullUrl = `${process.env.GATSBY_SITE_URL}${
      pagePath === '/' ? '' : pagePath
    }`;

    createPage({
      path: pagePath,
      component: blogPostList,
      context: {
        pagination,
        postsPerPage: config.siteMetadata.postsPerPage,
        blog: process.env.GATSBY_BLOG_ID,
        page: page,
        url: fullUrl,
      },
    });
    hasNextPage = pagination.hasNextPage;
    page++;

    /**
     * Create a page for each retrieved post.
     */
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
