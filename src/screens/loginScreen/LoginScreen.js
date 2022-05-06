import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

import { login } from "../../redux/actions/auth.action";
import "./_loginScreen.scss";
import HelmetCustom from "../../components/HelmetCustom";
import YTlogo from "../../images/youtube.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [signInError, setSignInError] = useState("");

  const { accessToken, error } = useSelector((state) => state.auth);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);
  useEffect(() => {
    if (error?.length) {
      setSignInError(error);
      setShowAlert(true);
    }
  }, [error]);

  return (
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
        <img
          src={YTlogo}
          alt=""
          width={130}
        />
        <button onClick={handleLogin}>Login with Google</button>
        <p>
          This project mimics the functionality and user interface of{" "}
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            Youtube
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
