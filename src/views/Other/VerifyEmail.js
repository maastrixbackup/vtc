import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import tick from "../../images/tick.png";
// import logo from "../../images/bid-logo-new.png";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
const APIVerifyMail = APIURL() + "verifyemail";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
    },
}));
export default function VerifyEmail(props) {
    const user_id = props.match.params.userid;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [exist, setExist] = useState(false);
    useEffect(() => {
        if (user_id) {
            setOpen(true);
            const obj = { "authenticate_key": "abcd123XYZ", "userid": user_id };
            postRecord(APIVerifyMail, obj)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        setOpen(false);
                        setExist(true);
                    }
                    else {
                        setOpen(false);
                        setExist(false);
                    }
                })
                .catch(err => {

                });
        }
    }, [user_id]);
    return (
        <div>
            
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};