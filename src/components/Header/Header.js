import React, { useEffect, useState, useContext } from "react";
// import logo from "../../images/bid-logo-new.png";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { APIURL, APIPath, fetchAllRecords } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
const APIGetUserData = APIURL() + "userdetails";
const APIGetSitesetting = APIURL() + "sitesetting";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    has_sub: {
        '&::after': {
            content: '""',
            marginLeft: "5px",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #fe5804",
            display: "inline-block",
            marginTop: "5px"
        },
    },
}));
export default function Header() {
    let history = useHistory();
    const classes = useStyles();
    // const [logo, setLogo] = useState("");
    // useEffect(() => {
    //     const obj = { authenticate_key: "abcd123XYZ" };
    //     postRecord(APIGetSitesetting, obj)
    //         .then(res => {
    //             setLogo(res.data[0].response.data.sitelogo);
    //         });

    // }, []);
    return (
        <div></div>
    );
}