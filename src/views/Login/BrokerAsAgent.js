import React, { useEffect, useState, useContext } from "react";
import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
export default function BrokerAsAgent(props) {
    const AgentId = props.match.params.agentId;
    let history = useHistory();
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const LoginData = {
            "agentId": parseInt(AgentId),
            "role": "agent"
        }
        const new_data = {
            user: JSON.stringify(LoginData),
            token: JSON.stringify(LoginData)
        }
        dispatch({
            type: "LOGIN",
            payload: new_data
        });
        history.push(APIPath() + "agent-dashboard/broker");
    }, [AgentId]);



    return (
        <div>

        </div>
    );
};