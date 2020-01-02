import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Pagination from "../components/Pagination";
import Img from "gatsby-image";

function PostListTemplate({ data, location, pageContext }) {
  const siteTitle = data.fireblog.blog.name;
  const postsPerPage = data.site.siteMetadata.postsPerPage;

  const edges = data.fireblog.posts.edges;
  return (
    <Layout location={location} headerTitle={siteTitle}>
      <SEO location={location} title="all posts" />
      <div className="list-posts">
        {edges.map(edge => {
          return (
            <div className="post resume" key={edge.node.slug}>
              <div className="post-image" style={{ minWidth: "268px" }}>
                {edge.node.gatsbyImage && (
                  <Link to={`/post/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.gatsbyImage.childImageSharp.fluid}
                      alt={edge.node.image.alt}
                    />
                  </Link>
                )}
              </div>
              <div className="post-title">
                <h2 className="title">
                  <Link to={`/post/${edge.node.slug}`}>{edge.node.title}</Link>
                </h2>
              </div>
              <div className="post-date">
                {new Date(edge.node.publishedAt).toLocaleDateString()}
              </div>
              <div className="post-teaser">
                <p>{edge.node.teaser}</p>
              </div>
              <div className="post-link">
                <Link className="read-more" to={`/post/${edge.node.slug}`}>
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
        <Pagination
          totalResults={pageContext.paginationTotalCount}
          resultsPerPage={postsPerPage}
        />
      </div>
    </Layout>
  );
}

export default PostListTemplate;

export const pageQuery = graphql`
  query PostListQuery($postsPerPage: Int!, $before: Fireblog_Cursor!) {
    site {
      siteMetadata {
        postsPerPage
        displayAuthor
      }
    }
    fireblog {
      blog {
        name
        description
        image {
          url
          alt
        }
      }
      posts(last: $postsPerPage, before: $before) {
        edges {
          node {
            publishedAt
            teaser
            slug
            title
            image {
              url
              alt
            }
            gatsbyImage {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
