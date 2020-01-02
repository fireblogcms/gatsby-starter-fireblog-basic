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
    createPage({
      path: page === 1 ? "/" : `/pages/${page}`,
      component: blogPostList,
      context: {
        paginationTotalCount: totalCount,
        postsPerPage: config.siteMetadata.postsPerPage,
        before
      }
    });
    hasNextPage = pageInfo.hasNextPage;
    before = pageInfo.endCursor;
    page++;

    /**
     * Create a page for each retrieved post.
     */
    data.fireblog.posts.edges.forEach(edge => {
      createPage({
        path: `/post/${edge.node.slug}/`,
        component: blogPost,
        context: {
          slug: edge.node.slug
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
