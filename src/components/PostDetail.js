import React from 'react';
import Layout from './Layout';
import HTMLMetadata from './HTMLMetadata';
import ClockIcon from './ClockIcon';
import PropTypes from 'prop-types';

function PostDetail({ blog, post, location, recentPosts }) {
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

PostDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  recentPosts: PropTypes.array.isRequired,
};

export default PostDetail;
