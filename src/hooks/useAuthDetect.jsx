import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthDetect = () => {
  const { accessToken, error } = useSelector((state) => state.auth);
  const [isAuth, setIsAuth] = useState(false);

  useLayoutEffect(() => {
    if (accessToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [accessToken]);

  return {
    isAuthenticated: isAuth,
    error,
  };
};

export { useAuthDetect };
