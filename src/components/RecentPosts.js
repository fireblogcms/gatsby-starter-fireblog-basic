import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import classNames from "classnames";
import PropTypes from "prop-types";

function RecentPosts({ location }) {
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
                  fluid(maxWidth: 300, maxHeight: 200) {
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

  // Hide recent posts on homepage for mobile
  const classes = classNames({
    "recent-posts": true,
    "is-hidden-mobile": location.pathname === "/"
  });
  return (
    <div className={classes}>
      <h3 className="block-title title is-5">Articles récents</h3>
      <ul>
        {posts.edges.map(edge => {
          return (
            <li key={edge.node.slug}>
              <div className="columns is-mobile">
                <div className="column is-one-quarter">
                  <div className="image">
                    {edge.node.gatsbyImage && (
                      <Link to={`/post/${edge.node.slug}/`}>
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
                      <Link to={`/post/${edge.node.slug}/`}>
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

RecentPosts.propTypes = {
  location: PropTypes.object.isRequired
};

export default RecentPosts;
