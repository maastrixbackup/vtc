import React, { useState, useEffect, useContext } from "react";
import AgentSetting from "../Agent/AgentSetting";

export default function TwitterAuth() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const popupWindowURL = new URL(window.location.href);
        const code = popupWindowURL.searchParams.get('code');
        setToken(code);
        // setting(code);
        const state = popupWindowURL.searchParams.get('state');
        if (state && code) {
            (async () => {
                await localStorage.setItem('twitter', `${code}`);
            })();
            window.close();
        }
        if (state?.includes('_pinterest') && code) {
            localStorage.setItem('pinterest', code);
            window.close();
        }
    }, []);
    return (
        "Hello"
    )
}