import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";

import "./_loginScreen.scss";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  }
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
