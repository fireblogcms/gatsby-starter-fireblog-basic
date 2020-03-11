const path = require(`path`);
require("dotenv").config();
const config = require("./gatsby-config");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

/**
 * Create programmatically static pages for
 * our paginated post list and each post.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const blogPost = path.resolve(`./src/templates/post.js`);
  const blogPostList = path.resolve(`./src/templates/post-list.js`);
  let hasNextPage = true;
  let before = "";
  let page = 1;
  while (hasNextPage) {
    const { data } = await graphql(
      `
        {
          fireblog {
            posts(last: ${config.siteMetadata.postsPerPage}, before: "${before}"){
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  slug
                  title
                }
              }
            }
          }
        }
      `
    );

    const { pageInfo, totalCount } = data.fireblog.posts;
    /**
     * Create a pagination page for this post list
     */
    let pagePath = page === 1 ? "/" : `/pages/${page}/`;
    let fullUrl = `${process.env.GATSBY_SITE_URL}${
      pagePath === "/" ? "" : pagePath
    }`;
    createPage({
      path: pagePath,
      component: blogPostList,
      context: {
        paginationTotalCount: totalCount,
        postsPerPage: config.siteMetadata.postsPerPage,
        before,
        url: fullUrl
      }
    });
    hasNextPage = pageInfo.hasNextPage;
    before = pageInfo.endCursor;
    page++;

    /**
     * Create a page for each retrieved post.
     */
    data.fireblog.posts.edges.forEach(edge => {
      const pagePath = `/post/${edge.node.slug}/`;
      createPage({
        path: pagePath,
        component: blogPost,
        context: {
          slug: edge.node.slug,
          url: `${process.env.GATSBY_SITE_URL}${pagePath}`
        }
      });
    });
  }

  createRedirect({
    fromPath: `/pages/1`,
    isPermanent: false,
    redirectInBrowser: true,
    toPath: `/`
  });
};

/**
 * Add a resolver to use Gatbsy image component on fireblog's images.
 * @see https://www.gatsbyjs.org/docs/schema-customization/#feeding-remote-images-into-gatsby-image
 */
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions;
  createResolvers({
    Fireblog_Post: {
      gatsbyImage: {
        type: `File`,
        resolve(source, args, context, info) {
          if (!source.image.url) {
            return null;
          }
          return createRemoteFileNode({
            url: source.image.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    },
    Fireblog_User: {
      gatsbyPicture: {
        type: `File`,
        resolve(source, args, context, info) {
          if (!source.picture) {
            return null;
          }
          return createRemoteFileNode({
            url: source.picture,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    }
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
