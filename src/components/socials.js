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
    <div className="block socials">
      <div className="block-title">Rejoins-nous</div>
      <ul className="list">
        {socials.linkedin && (
          <li>
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
          <li>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter-square.svg" alt="" />
            </a>
          </li>
        )}
        {socials.instagram && (
          <li>
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
