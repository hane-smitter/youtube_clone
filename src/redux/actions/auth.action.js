import auth from "../../firebase";
import firebase from "firebase/app";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_PROFILE, LOGIN_FAIL } from "../constants";

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);

        console.log(res);
        const accessToken = res.credential.accessToken;
        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoURL: res.additionalUserInfo.profile.picture
        }
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