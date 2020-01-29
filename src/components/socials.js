import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function Socials() {
  const data = useStaticQuery(graphql`
    query socialsQuery {
      site {
        siteMetadata {
          socials {
            linkedin
            twitter
            instagram
          }
        }
      }
    }
  `);
  const socials = data.site.siteMetadata.socials;

  return (
    <div className="socials">
      <h3 className="block-title title is-4">Follow Us</h3>
      <ul className="columns is-mobile">
        {socials.linkedin && (
          <li className="column">
            <a
              href={socials.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/images/linkedin.svg" alt="" />
            </a>
          </li>
        )}
        {socials.twitter && (
          <li className="column">
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter-square.svg" alt="" />
            </a>
          </li>
        )}
        {socials.instagram && (
          <li className="column">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/instagram.svg" alt="" />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Socials;
