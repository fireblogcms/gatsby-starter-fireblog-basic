import React from "react";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";
import { Link } from "gatsby";

function NotFoundPage({ data, location }) {
  return (
    <Layout location={location} headerTitle="404 Not Found">
      <HTMLMetadata metadata={{ title: "404: Not Found" }} />
      <h1 className="title is-1">PAGE NOT FOUND</h1>
      <img src="https://media.giphy.com/media/KKOMG9EB7VqBq/giphy.gif" />
      <p>You just hit a route that doesn&#39;t exist... </p>
      <br />
      <Link className="button is-primary" to="/">
        Go back to homepage
      </Link>
    </Layout>
  );
}

export default NotFoundPage;
