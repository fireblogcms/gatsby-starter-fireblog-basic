import { graphql } from 'gatsby';

export const recentPosts = graphql`
  fragment recentPosts on Fireblog_Post {
    slug
    title
    publishedAt
    thumbnail: image(
      w: 220
      h: 220
      fit: crop
      crop: center
      auto: [compress, format]
    ) {
      url
    }
  }
`;
