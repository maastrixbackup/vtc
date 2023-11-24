import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";

import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const APILogin = APIURL() + "agent-login";
const APIForgotPwd = APIURL() + "forgotpassword";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
  btn: {
    padding: "0 !important",
    color: "rgb(73, 80, 87) !important",
    float: "right",
    top: "-35px",
  },
}));

function AdminVideoLogin(props) {
    const AgentId = props.match.params.agentId;
    const order_id = props.match.params.orderid;
    let history = useHistory();
    const params = useParams();
    const { dispatch } = useContext(AuthContext);
    console.log(params);
  
    useEffect(() => {
      const LoginData = {
        agentId: parseInt(AgentId),
        role: "agent",
      };
      const new_data = {
        user: JSON.stringify(LoginData),
        token: JSON.stringify(LoginData),
      };
      dispatch({
        type: "LOGIN",
        payload: new_data,
      });
      if (order_id) {
        history.push(APIPath() + `order-details/${order_id}`);
      } else history.push(APIPath() + "agent-dashboard/admin");
    }, [AgentId, order_id]);
    console.log("AgentId", AgentId);
    console.log("order_id", order_id);
  
    return <div></div>;
}

export default AdminVideoLogin