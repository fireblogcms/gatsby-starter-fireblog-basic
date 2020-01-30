import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import RecentPosts from "./recentPosts";
import Socials from "./socials";
import Header from "./header";

function Layout({ children, headerTitle, location }) {
  let headerContent;
  if (location.pathname === "/") {
    headerContent = <h1 className="title is-1">{headerTitle}</h1>;
  } else {
    headerContent = (
      <div className="header-title">
        <Link className="title is-1" to="/">
          {headerTitle}
        </Link>
      </div>
    );
  }
  return (
    <div className="layout gasby-theme">
      <span name="top"></span>
      <Header>{headerContent}</Header>

      <div className="container">
        <div className="columns">
          <div className="column">
            <section className="section">
              <main>{children}</main>
            </section>
          </div>
          <div className="column is-one-quarter">
            <aside>
              <section className="section">
                <RecentPosts location={location} />
                <Socials />
              </section>
            </aside>
          </div>
        </div>
      </div>

      <footer className="footer has-text-centered">
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://fireblogcms.com">fireblog</a> &{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;
