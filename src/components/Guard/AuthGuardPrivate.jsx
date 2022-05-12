import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuardPrivate = ({ children }) => {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);
  const [hideView, setHideView] = useState(true);
  //   const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setHideView(false);
    }
    if (accessToken === null) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, loading]);

  if (loading) {
    return (
      <div style={{ color: "#fff", display: "grid", placeItems: "center" }}>
        <h3>Loading...</h3>
      </div>
    );
  }
  if (hideView) {
    return null;
  }

  return children;
};

export default AuthGuardPrivate;
