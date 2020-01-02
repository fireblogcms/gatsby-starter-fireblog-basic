import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

function RecentPosts() {
  const data = useStaticQuery(graphql`
    query {
      fireblog {
        posts(last: 5) {
          edges {
            node {
              title
              slug
              publishedAt
              image {
                url
                alt
              }
              gatsbyImage {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const posts = data.fireblog.posts;
  return (
    <div className="block recent-post">
      <div className="block-title">Articles récents</div>
      <ul className="list">
        {posts.edges.map(edge => {
          return (
            <li key={edge.node.slug}>
              <div className="image">
                {edge.node.gatsbyImage && (
                  <Link to={`/post/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.gatsbyImage.childImageSharp.fluid}
                      alt={edge.node.image.alt}
                    />
                  </Link>
                )}
              </div>
              <div className="infos">
                <div className="post-title">
                  {" "}
                  <Link to={`/post/${edge.node.slug}`}>{edge.node.title}</Link>
                </div>
                <div className="post-date">
                  {new Date(edge.node.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentPosts;
