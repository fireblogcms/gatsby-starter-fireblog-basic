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
        title={post.title}
        description={post.teaser}
        siteMetadata={siteMetadata}
        location={location}
        recentPosts={recentPosts}
      />
    </div>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $blog: ID!) {
    site {
      siteMetadata {
        displayAuthor
      }
    }
    fireblog {
      blog(filter: { _id: { eq: $blog } }) {
        name
        description
        image {
          alt
          url
        }
      }
      recentPosts: posts(
        itemsPerPage: 5
        page: 1
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        items {
          title
          slug
          publishedAt
          imagePostList: image(
            w: 400
            h: 220
            fit: crop
            crop: center
            auto: [compress, format]
          ) {
            url
            alt
          }
        }
      }
      post(filter: { slug: { eq: $slug } }) {
        title
        publishedAt
        teaser
        content
        image {
          url
          alt
        }
        publishedAt
      }
    }
  }
`;
