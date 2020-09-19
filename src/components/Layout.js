import React from 'react';
import PropTypes from 'prop-types';
import RecentPosts from './RecentPosts';
import Socials from './Socials';
import Header from './Header';

function Layout({
  children,
  headerTitle,
  headerSubtitle,
  location,
  recentPosts,
}) {
  return (
    <div className="layout">
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        location={location}
      />
      <div className="container">
        <div className="columns">
          <div className="column">
            <section className="section">
              <main>{children}</main>
            </section>
          </div>
          {recentPosts && (
            <div className="column is-one-third">
              <aside>
                <section className="section">
                  <RecentPosts location={location} posts={recentPosts} />
                  <Socials />
                </section>
              </aside>
            </div>
          )}
        </div>
      </div>

      {/*
      <footer className="footer has-text-centered">
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
  headerSubtitle: PropTypes.string,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  recentPosts: PropTypes.array.isRequired,
};

export default Layout;
