import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: email,
      password: password,
    };
    let url =
      "https://academind-burger-builder-app.herokuapp.com/customer/register";
    if (!isSignup) {
      url =
        "https://academind-burger-builder-app.herokuapp.com/customer/log-in";
    }
    axios
      .post(url, authData)
      .then((response) => {
        if (response.status === 200 || 201) {
          const expirationDate = new Date(
            new Date().getTime() + 1000 * 60 * 60
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.userId);
          dispatch(authSuccess(response.data.token, response.data.userId));
          // dispatch(checkAuthTimeout(expirationDate));
        } else {
          console.log(response.data);
          dispatch(authFail(response.data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail("log in failed"));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

// This function below checks if there is an jwt token in local storage and if not then makes sure
//the user is logged out

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
