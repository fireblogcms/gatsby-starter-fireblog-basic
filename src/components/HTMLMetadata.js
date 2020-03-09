import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function HTMLMetadata({ metadata }) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          lang
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
  metadata: PropTypes.object.isRequired
};

export default HTMLMetadata;
