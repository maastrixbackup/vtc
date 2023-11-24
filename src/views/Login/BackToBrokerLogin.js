import React, { useEffect, useState, useContext } from "react";
import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";

export default function BackToBroker(props) {
    const BrokerId = props.match.params.brokerId;
    let history = useHistory();
    const { dispatch } = useContext(AuthContext);
    useEffect(() => {
        const LoginData = {
            "user_id": parseInt(BrokerId),
            "role": "broker"
        }
        const new_data = {
            user: JSON.stringify(LoginData),
            token: JSON.stringify(LoginData)
        }
        dispatch({
            type: "LOGIN",
            payload: new_data
        });
        history.push(APIPath() + "broker-dashboard");
    }, [BrokerId]);
    return (
        <div>

        </div>
    );
};