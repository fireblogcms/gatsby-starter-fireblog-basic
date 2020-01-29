import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

function RecentPosts() {
  const data = useStaticQuery(graphql`
    query {
      fireblog {
        posts(last: 10) {
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
                  fluid(maxWidth: 200, maxHeight: 200) {
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
    <div className="recent-posts">
      <h3 className="block-title title is-4">Articles récents</h3>
      <ul>
        {posts.edges.map(edge => {
          return (
            <li key={edge.node.slug}>
              <div className="columns">
                <div className="column is-one-quarter">
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
                </div>
                <div className="column">
                  <div>
                    <h4 className="post-title title is-6">
                      {" "}
                      <Link to={`/post/${edge.node.slug}`}>
                        {edge.node.title}
                      </Link>
                    </h4>
                    <div>
                      <small>
                        {new Date(edge.node.publishedAt).toLocaleDateString()}
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

export default RecentPosts;
