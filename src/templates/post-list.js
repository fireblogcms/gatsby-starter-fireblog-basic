import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";
import Pagination from "../components/Pagination";
import ImgNonStreched from "../components/ImgNonStreched";
import ClockIcon from "../components/ClockIcon";

function PostListTemplate({ data, location, pageContext }) {
  const blog = data.fireblog.blog;
  const { postsPerPage, readMoreText } = data.site.siteMetadata;

  const edges = data.fireblog.posts.edges;
  return (
    <Layout
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata location={location} metadata={blog.HTMLMetadata} />
      <div className="post-list">
        {edges.map(edge => {
          return (
            <div className="post columns" key={edge.node.slug}>
              {edge.node.gatsbyImage && (
                <div className="column is-one-third">
                  <Link to={`/post/${edge.node.slug}/`}>
                    <ImgNonStreched
                      fluid={edge.node.gatsbyImage.childImageSharp.fluid}
                      alt={edge.node.image.alt}
                    />
                  </Link>
                </div>
              )}
              <div className="column">
                <h2 className="title is-3">
                  <Link to={`/post/${edge.node.slug}/`}>{edge.node.title}</Link>
                </h2>
                <div className="date">
                  <small>
                    <span className="date-clock">
                      <ClockIcon />
                    </span>
                    {new Date(edge.node.publishedAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="post-teaser content">
                  <p>{edge.node.teaser}</p>
                </div>
                <Link
                  className="read-more button is-light"
                  to={`/post/${edge.node.slug}/`}
                >
                  {readMoreText}
                </Link>
              </div>
            </div>
          );
        })}
        <Pagination
          location={location}
          totalResults={pageContext.paginationTotalCount}
          resultsPerPage={postsPerPage}
        />
      </div>
    </Layout>
  );
}

export default PostListTemplate;

export const pageQuery = graphql`
  query PostListQuery(
    $postsPerPage: Int!
    $before: Fireblog_Cursor!
    $url: String!
  ) {
    site {
      siteMetadata {
        postsPerPage
        displayAuthor
        readMoreText
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
        HTMLMetadata(url: $url) {
          title
          meta
        }
      }
      posts(last: $postsPerPage, before: $before) {
        edges {
          node {
            publishedAt
            updatedAt
            teaser
            slug
            title
            image {
              url
              alt
            }
            gatsbyImage {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 400) {
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
