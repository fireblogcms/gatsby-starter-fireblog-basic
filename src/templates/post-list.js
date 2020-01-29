import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Pagination from "../components/Pagination";
import ImgNonStreched from "../components/ImgNonStreched";
import ClockIcon from "../components/ClockIcon";

function PostListTemplate({ data, location, pageContext }) {
  const title = data.fireblog.blog.name;
  const postsPerPage = data.site.siteMetadata.postsPerPage;

  const edges = data.fireblog.posts.edges;
  return (
    <Layout location={location} headerTitle={title}>
      <SEO location={location} title={`${title} | all posts`} />
      <div className="post-list">
        {edges.map(edge => {
          return (
            <div className="post columns" key={edge.node.slug}>
              {edge.node.gatsbyImage && (
                <div className="column is-one-quarter">
                  <Link to={`/post/${edge.node.slug}`}>
                    <ImgNonStreched
                      fluid={edge.node.gatsbyImage.childImageSharp.fluid}
                      alt={edge.node.image.alt}
                    />
                  </Link>
                </div>
              )}
              <div className="column">
                <h2 className="title is-2">
                  <Link to={`/post/${edge.node.slug}`}>{edge.node.title}</Link>
                </h2>
                <div className="date">
                  <small>
                    <span className="date-clock">
                      <ClockIcon />
                    </span>
                    {new Date(edge.node.publishedAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="has-text-justified">
                  <p>{edge.node.teaser}</p>
                </div>
                <Link className="read-more" to={`/post/${edge.node.slug}`}>
                  Continue reading
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
                fluid(maxWidth: 400, maxHeight: 350) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
