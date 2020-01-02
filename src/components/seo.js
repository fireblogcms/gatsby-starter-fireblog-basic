import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({
  description = null,
  lang = null,
  keywords = [],
  title,
  location,
  image = null
}) {
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

  const blog = data.fireblog.blog;
  if (!image && blog.image && blog.image.url) {
    image = blog.image.url;
  }
  if (!lang) {
    // if blog did not defined a contentDefaultLocale, use the one defined in gatsby-config.js.
    lang =
      blog.contentDefaultLocale && blog.contentDefaultLocale !== "und"
        ? blog.contentDefaultLocale
        : data.site.siteMetadata.lang;
  }
  const metaDescription = description || blog.description;
  const siteUrl = data.site.siteMetadata.siteUrl;

  const meta = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ];
  if (image) {
    meta.push({
      property: `og:image`,
      content: image
    });
    meta.push({
      property: `twitter:image`,
      content: image
    });
  }
  if (keywords.length > 0) {
    meta.push({
      name: "keywords",
      content: keywords.join(", ")
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${blog.name}`}
      link={[
        {
          rel: "canonical",
          href: `${siteUrl}${path}`
        },
        {
          rel: "amphtml",
          href: `${siteUrl}/amp${path}`
        }
      ]}
      meta={meta}
    />
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;
