import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import RecentPosts from "./recentPosts";
import Socials from "./socials";
import { Helmet } from "react-helmet";

function Layout({ children, headerTitle, location }) {
  /*
  useEffect(() => {
    // display rich links preview with iframely
    if (iframely && process.env.GATSBY_IFRAMELY_API_KEY) {
      this.$refs.content.querySelectorAll("oembed[url]").forEach(element => {
        iframely.load(element, element.attributes.url.value);
      });
    }
  });
  */
  let headerContent;
  if (location.pathname === "/") {
    headerContent = <h1>{headerTitle}</h1>;
  } else {
    headerContent = (
      <div className="header-title">
        <Link to="/">{headerTitle}</Link>
      </div>
    );
  }
  return (
    <div className="layout gasby-theme">
      <a name="top"></a>
      <header>{headerContent}</header>
      <section className="content">
        <main>{children}</main>
        <aside>
          <RecentPosts />
          <Socials />
        </aside>
      </section>
      <footer>
        <div className="scrolltotop">
          <a href="#top">
            <img src="/images/chevron-up.svg" alt="Scroll to top" />
          </a>
        </div>
      </footer>
      {/*      
      <footer>
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://fireblogcms.com">fireblog</a> &{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
      */}
    </div>
  );
}

Layout.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;
