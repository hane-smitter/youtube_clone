import React from "react";
import { Helmet } from "react-helmet";

const HelmetCustom = ({
  title = "Youtube Mimic",
  description = "A mimic of the real youtube application",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" description={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HelmetCustom;
