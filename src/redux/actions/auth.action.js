import auth from "../../firebase";
import firebase from "firebase/app";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_PROFILE, LOGIN_FAIL, LOGOUT } from "../constants";

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
        const res = await auth.signInWithPopup(provider);

        // console.log(res);
        const accessToken = res.credential.accessToken;
        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoURL: res.additionalUserInfo.profile.picture
        }
        sessionStorage.setItem("ytmimic-access-token", accessToken);
        sessionStorage.setItem("ytmimic-user", JSON.stringify(profile));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken
        });
        dispatch({
            type: LOAD_PROFILE,
            payload: profile
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: LOGIN_FAIL,
            payload: err.message
        });
    }
}

export const logout = () => async dispatch => {
    await auth.signOut();
    dispatch({
        type: LOGOUT
    });
    sessionStorage.removeItem("ytmimic-access-token");
    sessionStorage.removeItem("ytmimic-user");
}