import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function HTMLMetadata({ metadata, location }) {
  const path = location.pathname;
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          siteUrl
          lang
        }
      }
      fireblog {
        blog {
          name
          description
          image {
            url
          }
        }
      }
    }
  `);

  return (
    <Helmet
      htmlAttributes={{
        lang: data.site.siteMetadata.lang
      }}
      title={metadata.title}
      meta={metadata.meta}
    />
  );
}

HTMLMetadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default HTMLMetadata;
