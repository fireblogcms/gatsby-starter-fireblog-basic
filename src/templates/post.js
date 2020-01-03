import React from "react";
import { graphql } from "gatsby";
import PostDetail from "../components/postDetail";

function PostTemplate({ data, location }) {
  const { blog, post } = data.fireblog;
  const siteMetadata = data.site.siteMetadata;
  return (
    <PostDetail
      blog={blog}
      post={post}
      siteMetadata={siteMetadata}
      location={location}
    />
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        displayAuthor
      }
    }
    fireblog {
      blog {
        name
      }
      post(slug: $slug) {
        title
        content
        image {
          url
          alt
        }
        gatsbyImage {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
              presentationWidth
            }
          }
        }
        publishedAt
        author {
          name
          picture
        }
      }
    }
  }
`;
