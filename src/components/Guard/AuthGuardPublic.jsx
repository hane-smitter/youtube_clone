import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuardPublic = ({ children }) => {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      navigate("/a");
    }
    // eslint-disable-next-line
  }, [accessToken, loading]);

  if (loading)
    return (
      <div
        style={{
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Loading...</h3>
      </div>
    );

  return children;
};

export default AuthGuardPublic;
