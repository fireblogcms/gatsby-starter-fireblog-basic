import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, location }) {
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
        }
      }
    }
  `);

  const blog = data.fireblog.blog;
  if (!lang) {
    // if blog did not defined a contentDefaultLocale, use the one defined in gatsby-config.js.
    lang =
      blog.contentDefaultLocale && blog.contentDefaultLocale !== "und"
        ? blog.contentDefaultLocale
        : data.site.siteMetadata.lang;
  }
  const metaDescription = description || blog.description;
  const siteUrl = data.site.siteMetadata.siteUrl;

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
      meta={[
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
          name: `twitter:creator`,
          content: data.site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: "",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;
