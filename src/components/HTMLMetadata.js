/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function HTMLMetadata({ description, title, location, image = null }) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          lang
        }
      }
    }
  `);

  const meta = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:url`,
      content: location.href,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ];

  if (image) {
    meta.push({
      property: `og:image`,
      content: image,
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: data.site.siteMetadata.lang,
      }}
      title={title}
      titleTemplate={`%s | ${title}`}
      meta={meta}
    />
  );
}

HTMLMetadata.propTypes = {
  description: PropTypes.string.isRequired,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.string,
};

export default HTMLMetadata;
