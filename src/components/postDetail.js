import React, { useEffect, useRef } from "react";
import ImgNonStreched from "./ImgNonStreched";
import Layout from "./layout";
import SEO from "./seo";

function PostDetail({ post, blog, location, siteMetadata, preview = false }) {
  const { displayAuthor } = siteMetadata;
  const contentRef = useRef();
  useEffect(() => {
    // display rich links preview with iframely if here is a iframely key
    if (window.iframely && process.env.GATSBY_IFRAMELY_API_KEY) {
      contentRef.current.querySelectorAll("oembed[url]").forEach(element => {
        window.iframely.load(element, element.attributes.url.value);
      });
    }
  }, []);
  return (
    <Layout location={location} headerTitle={blog.name}>
      <SEO
        location={location}
        title={post.title}
        description={post.teaser}
        slug={post.slug}
        image={post.image ? post.image.url : null}
      />
      <div className="post full">
        <div className="post-title">
          <h1 className="title">{post.title}</h1>
        </div>
        <div className="post-date">
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
          className="post-detail"
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

export default PostDetail;
