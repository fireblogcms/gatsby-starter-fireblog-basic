import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";
import Pagination from "../components/Pagination";
import ClockIcon from "../components/ClockIcon";

function PostListTemplate({ data, location, pageContext }) {
  const blog = data.fireblog.blog;
  const { postsPerPage, readMoreText } = data.site.siteMetadata;

  const { items: posts } = data.fireblog.posts;
  const recentPosts = data.fireblog.recentPosts.items;
  return (
    <Layout
      recentPosts={recentPosts}
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata title={blog.name} description={blog.description} />
      <div className="post-list">
        {posts.map(post => {
          return (
            <div className="post columns" key={post.slug}>
              {post.imagePostList && (
                <div className="column is-one-third">
                  <Link to={`/post/${post.slug}/`}>
                    <img
                      src={post.imagePostList.url}
                      alt={post.imagePostList.alt}
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
  query PostListQuery($postsPerPage: Int!, $page: Int!, $blog: ID!) {
    site {
      siteMetadata {
        postsPerPage
        displayAuthor
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
          teaser
          slug
          title
          content
          publishedAt
          updatedAt
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
    }
  }
`;
