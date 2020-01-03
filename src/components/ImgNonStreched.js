import Img from "gatsby-image";
import React from "react";

/**
 * @see https://www.gatsbyjs.org/packages/gatsby-image/#avoiding-stretched-images-using-the-fluid-type
 *
 * "As mentioned previously, images using the fluid type are stretched
 * to match the container’s width. In the case where the
 * image’s width is smaller than the available viewport,
 * the image will stretch to match the container,
 * potentially leading to unwanted problems and worsened image quality.
 *  To counter this edge case one could wrap the Img component
 * in order to set a better maxWidth:"
 */
const ImgNonStreched = props => {
  let normalizedProps = props;
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: "0 auto" // Used to center the image
      }
    };
  }

  return <Img {...normalizedProps} />;
};

export default ImgNonStreched;
