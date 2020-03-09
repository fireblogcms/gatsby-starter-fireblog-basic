import React from "react";
import { graphql } from "gatsby";
import PostDetail from "../components/PostDetail";

function PostTemplate({ data, location }) {
  const { blog, post } = data.fireblog;
  const siteMetadata = data.site.siteMetadata;
  return (
    <div>
      <PostDetail
        blog={blog}
        post={post}
        siteMetadata={siteMetadata}
        location={location}
      />
    </div>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $url: String!) {
    site {
      siteMetadata {
        displayAuthor
      }
    }
    fireblog {
      blog {
        name
        description
        image {
          alt
          url
        }
      }
      post(slug: $slug) {
        HTMLMetadata(url: $url) {
          title
          meta
        }
        title
        publishedAt
        teaser
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
