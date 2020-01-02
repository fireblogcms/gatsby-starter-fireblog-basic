import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";

function PostTemplate({ data, location }) {
  const { blog, post } = data.fireblog;
  const { displayAuthor } = data.site.siteMetadata;
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

        {post.image.url && (
          <div className="post-image">
            <Img
              fluid={post.gatsbyImage.childImageSharp.fluid}
              alt={post.image.alt}
            />
          </div>
        )}
        <div
          className="post-detail"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {displayAuthor && (
          <div className="post-author">
            {post.author.picture && <img src={post.author.picture} />}
            <span className="name">{post.author.name}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        displayAuthor
      }
    }
    fireblog {
      blog {
        name
      }
      post(slug: $slug) {
        title
        content
        image {
          url
          alt
        }
        gatsbyImage {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        publishedAt
        author {
          name
          picture
          gatsbyPicture {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
