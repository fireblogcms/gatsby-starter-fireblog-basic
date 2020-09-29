import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function RecentPosts({ location, posts }) {
  // Hide recent posts on homepage for mobile
  const classes = classNames({
    'recent-posts': true,
    'is-hidden-mobile': location.pathname === '/',
  });
  return (
    <div className={classes}>
      <h3 className="block-title title is-5">Articles récents</h3>
      <ul>
        {posts.map(post => {
          return (
            <li key={post.slug}>
              <div className="columns is-mobile">
                <div className="column is-one-quarter">
                  <div className="image">
                    {post.thumbnail && (
                      <Link to={`/post/${post.slug}/`}>
                        <img loading="lazy" src={post.thumbnail.url} />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div>
                    <h4 className="post-title title is-6">
                      {' '}
                      <Link to={`/post/${post.slug}/`}>{post.title}</Link>
                    </h4>
                    <div>
                      <small>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

RecentPosts.propTypes = {
  location: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};

export default RecentPosts;
