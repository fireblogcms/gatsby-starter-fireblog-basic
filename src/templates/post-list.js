import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";
import Pagination from "../components/Pagination";
import ClockIcon from "../components/ClockIcon";
import { recentPosts } from "../utils/graphQLFragments";

function PostListTemplate({ data, location, pageContext }) {
  const blog = data.fireblog.blog;
  const posts = data.fireblog.posts.items;
  const recentPosts = data.fireblog.recentPosts.items;
  const { postsPerPage, readMoreText } = data.site.siteMetadata;

  return (
    <Layout
      recentPosts={recentPosts}
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata
        location={location}
        title={blog.name}
        image={blog.image ? blog.image.url : null}
        description={blog.description}
      />
      <div className="post-list">
        {posts.map(post => {
          return (
            <div className="post columns" key={post.slug}>
              {post.thumbnail && (
                <div className="column is-one-third">
                  <Link to={`/post/${post.slug}/`}>
                    <img
                      loading="lazy"
                      src={post.thumbnail.url}
                      alt={post.thumbnail.alt}
                    />
                  </Link>
                </div>
              )}
              <div className="column">
                <h2 className="title is-3">
                  <Link to={`/post/${post.slug}/`}>{post.title}</Link>
                </h2>
                <div className="date">
                  <small>
                    <span className="date-clock">
                      <ClockIcon />
                    </span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="post-teaser content">
                  <p>{post.teaser}</p>
                </div>
                <Link
                  className="read-more button is-light"
                  to={`/post/${post.slug}/`}
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
  query PostListPageQuery($postsPerPage: Int!, $page: Int!, $blog: ID!) {
    site {
      siteMetadata {
        postsPerPage
        readMoreText
      }
    }
    fireblog {
      blog(filter: { _id: { eq: $blog } }) {
        name
        description
        image {
          url
          alt
        }
      }
      recentPosts: posts(
        itemsPerPage: 5
        page: 1
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        ...recentPosts
      }
      posts(
        itemsPerPage: $postsPerPage
        page: $page
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        pagination {
          totalItems
          totalPages
          hasNextPage
          hasPreviousPage
        }
        items {
          title
          slug
          teaser
          publishedAt
          thumbnail: image(
            w: 300
            h: 250
            fit: crop
            crop: center
            auto: [compress, format]
          ) {
            url
            alt
          }
        }
      }
    }
  }
`;
