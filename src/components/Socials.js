import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function Socials() {
  const data = useStaticQuery(graphql`
    query socialsQuery {
      site {
        siteMetadata {
          socials {
            linkedin
            twitter
            instagram
            facebook
            youtube
          }
          followUsText
        }
      }
    }
  `);
  const { socials, followUsText } = data.site.siteMetadata;
  const socialsIds = Object.keys(socials).filter(id =>
    socials[id] ? true : false
  );
  return (
    <div className="socials">
      <h3 className="block-title title is-5">{followUsText}</h3>
      <ul>
        {socialsIds.map(socialId => {
          return (
            <li key={socialId}>
              <a
                href={socials[socialId]}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={`/images/icon-${socialId}.svg`} alt="" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Socials;
