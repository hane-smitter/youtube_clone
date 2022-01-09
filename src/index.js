import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";

import "./_base.scss";
import App from "./App";
import store from "./redux/store";

const ResolveScroll = ({ children }) => {
  const location = useLocation();
  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

ReactDom.render(
  <Provider store={store}>
    <Router>
      <ResolveScroll>
        <App />
      </ResolveScroll>
    </Router>
  </Provider>,
  document.getElementById("root")
);
