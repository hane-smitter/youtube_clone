import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthGuardPrivate = () => {
  const navigate = useNavigate();
  const [hideView, setHideView] = useState(true);
  const { accessToken, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      return navigate("/auth", { replace: true, state: { from: location } });
    }
    setHideView(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, loading]);

  if (loading) {
    return (
      <div style={{ color: "#fff", display: "grid", placeItems: "center" }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (hideView) return null;

  return <Outlet />;
};

export default AuthGuardPrivate;
