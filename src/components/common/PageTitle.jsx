import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? `${title} | Playforia Admin Dashboard`
          : "Playforia | Admin Dashboard"}
      </title>
      <meta
        name="description"
        content={
          description
            ? ` ${description} `
            : "website for free online games! Playforia works on your any device. No downloads"
        }
      />
    </Helmet>
  );
};

export default PageTitle;
