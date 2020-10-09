import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import HTMLMetadata from '../components/HTMLMetadata';
import ClockIcon from '../components/ClockIcon';
import { recentPosts } from '../utils/graphQLFragments';

function PostTemplate({ data, location }) {
  const { blog, post, recentPosts } = data.fireblog;
  return (
    <Layout
      recentPosts={recentPosts}
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata
        title={post.title}
        description={post.teaser}
        location={location}
        image={post.image.url}
      />
      <div className="post-detail">
        <h1 className="title is-1">{post.title}</h1>
        <div className="date">
          <span className="date-clock">
            <ClockIcon />
          </span>
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        {post.image && (
          <div className="post-image">
            <img loading="lazy" src={post.image.url} />
          </div>
        )}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Layout>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlugPageQuery($slug: String!, $blog: ID!) {
    fireblog {
      blog(filter: { _id: { eq: $blog } }) {
        name
        description
        image {
          url
        }
      }
      recentPosts: posts(
        limit: 5
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        ...recentPosts
      }
      post(filter: { slug: { eq: $slug }, blog: { eq: $blog } }) {
        title
        publishedAt
        teaser
        content
        publishedAt
        image(w: 900, fit: crop, crop: center, auto: [compress, format]) {
          url
        }
      }
    }
  }
`;
