import React, { useEffect, useRef } from "react";
import ImgNonStreched from "./ImgNonStreched";
import Layout from "./Layout";
import HTMLMetadata from "./HTMLMetadata";
import ClockIcon from "./ClockIcon";
import PropTypes from "prop-types";

function PostDetail({
  description,
  blog,
  post,
  title,
  location,
  preview = false
}) {
  return (
    <Layout
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata
        title={title}
        description={description}
        location={location}
      />
      <div className="post-detail">
        <h1 className="title is-1">{post.title}</h1>
        <div className="date">
          <span className="date-clock">
            <ClockIcon />
          </span>
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        {post.image.url && !preview && (
          <div className="post-image">
            <ImgNonStreched
              fluid={post.gatsbyImage.childImageSharp.fluid}
              alt={post.image.alt}
            />
          </div>
        )}
        {post.image.url && preview && (
          <div className="post-image">
            <img src={post.image.url} alt={post.image.alt} />
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
  location: PropTypes.object.isRequired
};

export default PostDetail;
