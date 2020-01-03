/**
 * This page is only here for real-time preview inside fireblog.
 * The "real" gatbsy page for post is "templates/post.js"
 */
import React, { useState, useEffect } from "react";
import PostDetail from "../components/postDetail";

const previewQuery = `
  query previewQuery($id: ID!) {
    blog {
      name
      description
    }
    post(_id: $id) {
      slug
      title
      content
      image {
        url
        alt
      }
      publishedAt
      author {
        name
        picture
    }
  }
}
`;

function fetchPost(id) {
  return fetch(process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: previewQuery,
      variables: `{"id": "${id}" }`
    })
  })
    .then(response => {
      return response.json();
    })
    .then(responseAsJson => {
      return responseAsJson;
      //this.setState({ loading: false, data: responseAsJson.data });
    });
}

function PreviewPost({ location }) {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPost(id).then(result => {
      setData(result.data);
      console.log("result", result);
    });
  }, []);

  return (
    <div>
      {data && (
        <PostDetail
          preview={true}
          blog={data.blog}
          post={data.post}
          siteMetadata={{}}
          location={location}
        />
      )}
    </div>
  );
}

export default PreviewPost;