import React, { useEffect, useRef } from "react";
import ImgNonStreched from "./ImgNonStreched";
import Layout from "./Layout";
import HTMLMetadata from "./HTMLMetadata";
import ClockIcon from "./ClockIcon";
import PropTypes from "prop-types";

function PostDetail({ post, blog, location, siteMetadata, preview = false }) {
  const { displayAuthor } = siteMetadata;
  const contentRef = useRef();
  useEffect(() => {
    // display rich links preview with iframely, if here is a iframely key
    if (window.iframely && process.env.GATSBY_IFRAMELY_API_KEY) {
      contentRef.current.querySelectorAll("oembed[url]").forEach(element => {
        window.iframely.load(element, element.attributes.url.value);
      });
    }
  }, []);

  return (
    <Layout
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata metadata={post.HTMLMetadata} location={location} />
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
          ref={contentRef}
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {displayAuthor && (
          <div className="post-author">
            {post.author.picture && <img alt="" src={post.author.picture} />}
            <span className="name">{post.author.name}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}

PostDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default PostDetail;
