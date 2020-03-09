import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";

function NotFoundPage({ data, location }) {
  const title = data.fireblog.blog.name;
  return (
    <Layout location={location} headerTitle={title}>
      <HTMLMetadata metadata={{ title: "404: Not Found" }} />
      <h1>Page Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    fireblog {
      blog {
        name
      }
    }
  }
`;
