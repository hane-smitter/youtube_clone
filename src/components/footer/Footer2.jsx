import React from "react";

import "./_Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-root">
      <p className="footer-root__txt">
        copyright &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
