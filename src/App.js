import React, { useReducer, useEffect, useMemo } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { reducer } from "./CommonMethods/Authentication";
import { AuthContext } from "./CommonMethods/Authentication";
import MetaTagsContext from "./CommonMethods/MetaTagsContext";
var CryptoJS = require("crypto-js");
export default function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const VerifyAuth = () => {
    try {
      var encKey = "873518d8d7a146f184173f87b86ffc35";

      var userbytes =
        localStorage.getItem("user") &&
        CryptoJS.AES.decrypt(localStorage.getItem("user"), encKey);

      let user = userbytes && userbytes.toString(CryptoJS.enc.Utf8);
      const token = userbytes && userbytes.toString(CryptoJS.enc.Utf8);
      // eslint-disable-next-line no-const-assign
      if (user && token) {
        dispatch({
          type: "LOGIN",
          payload: {
            user,
            token,
          },
        });
      } else dispatch({ type: "LOGOUT" });
    } catch (error) {}
  };
  useEffect(() => {
    VerifyAuth();
  }, []);
  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <AuthContext.Provider value={contextValue}>
      <MetaTagsContext>
        <AppRoutes />
      </MetaTagsContext>
    </AuthContext.Provider>
  );
}
