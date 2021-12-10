import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";

import "./_loginScreen.scss";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  }

  useEffect(() => {
    if(accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);
  return (
    <div className="login">
        <div className="login__container">
            <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" width={130} />
            <button onClick={handleLogin}>Login with Google</button>
            <p>This project is made using YOUTUBE API</p>
        </div>
    </div>
  );
};

export default LoginScreen;
