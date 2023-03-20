import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

import { login } from "../../redux/actions/auth.action";
import "./_loginScreen.scss";
import HelmetCustom from "../../components/HelmetCustom";
import YTlogo from "../../images/youtube.png";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [signInError, setSignInError] = useState("");
  const to = useRef(location?.state?.from?.pathname || "/a");

  const { isAuthenticated, error } = useAuthDetect();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(to.current, { replace: true });
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (error?.length) {
      setSignInError(error);
      setShowAlert(true);
    }
  }, [error]);

  return !isAuthenticated ? (
    <div className="login">
      <HelmetCustom
        description="Provide credentials to be authenticated"
        title="Login | Yt-mimic"
      />
      <div className="login__container">
        {showAlert && (
          <div className="error-box">
            <Alert
              variant="danger"
              onClose={handleCloseAlert}
              dismissible
              className="alert-customize"
            >
              <span>{`${signInError} Try again.`}</span>
            </Alert>
          </div>
        )}
        <img src={YTlogo} alt="youtube logo" width={130} />
        <button onClick={handleLogin}>Login with Google</button>
        <p>
          This project mimics the functionality of{" "}
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            Youtube
          </a>. Login to unlock more features such as commenting on videos.
        </p>
      </div>
    </div>
  ) : (
    <Navigate to="/a" />
  );
};

export default LoginScreen;
