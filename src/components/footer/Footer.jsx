import React from "react";

import "./_Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-root">
      <p className="footer-root__txt">
        By{" "}
        <a
          href="https://lookupzach.netlify.app"
          className="footer-root__lnk"
          target="_blank"
          rel="noreferrer"
        >
          zacky
        </a>
        {" "}copyright &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
