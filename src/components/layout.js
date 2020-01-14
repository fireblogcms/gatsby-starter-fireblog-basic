import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import RecentPosts from "./recentPosts";
import Socials from "./socials";

function Layout({ children, headerTitle, location }) {
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
      <span name="top"></span>
      <header>
      <div class="menu">Menu
      <nav class="close">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </nav>
      </div>
     
      {headerContent}</header>
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
