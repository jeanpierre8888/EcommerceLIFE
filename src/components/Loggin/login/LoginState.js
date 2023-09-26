import React, { useReducer } from "react";
import { LoginContext } from "./LoginContext";
import { LoginReducer } from "./LoginReducer";
// MSAL imports
import { loginRequest } from "../authConfig";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { WIDTHNAVBAR } from "../../GlobalConfig/types";;

const LoginState = (props) => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  if (
    !isAuthenticated &&
    inProgress !== InteractionStatus.Startup &&
    inProgress !== InteractionStatus.HandleRedirect
  ) {
    instance.loginRedirect(loginRequest);
  }
  const initialState = {
    user: {},
    widthNavBars: 0,
  };

  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const upLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const setWidthNavBars = (data) => {
    dispatch({
      type: WIDTHNAVBAR,
      payload: data,
    });
  };

  return (
    <LoginContext.Provider
      value={{
        widthNavBars: state.widthNavBars,
        setWidthNavBars,
        upLogoutRedirect,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
