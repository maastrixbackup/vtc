import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import login_img_1 from "../../images/login-icon6.png";
import login_img_2 from "../../images/login-icon5.png";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
const APILogin = APIURL() + "agent-login";
const APIForgotPwd = APIURL() + "forgotpassword";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
    },
    btn: {
        padding: "0 !important",
        color: "rgb(73, 80, 87) !important",
        float: "right",
        top: "-35px"
    }
}));
export default function Login(props) {

    const initialUserState = {
        authenticate_key: "abcd123XYZ",
        username: "",
        password: "",
        user_type: "1",
        showPassword: false
    }
    const initialForgotmailState = {
        authenticate_key: "abcd123XYZ",
        email: ""
    }
    let history = useHistory();
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const classes = useStyles();
    const [user, setUser] = useState(initialUserState);
    const [openWarning, setOpenWarning] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [captcha, setCaptcha] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [forgottenmail, setForgottenmail] = useState(initialForgotmailState);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
        setOpenModal(false);
    };
    const handleEmailChange = event => {
        const { name, value } = event.target;
        setForgottenmail({ ...forgottenmail, [name]: value });
    };
    const handleInputchange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    function onChange(value) {
        setCaptcha(true);
    }
    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleScroll = () => {
        window.scrollTo(0, 0);
    };
    const handleLogin = () => {
        if (captcha === false) {
            setMessage("Please verify Captcha");
            setOpenError(true);
        }
        else {
            setOpen(true);
            postRecord(APILogin, user)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        return {
                            user: JSON.stringify(res.data[0].response.data),
                            token: JSON.stringify(res.data[0].response.data)
                        };
                    }
                    else {
                        setMessage(res.data[0].response.message);
                        setOpenError(true);
                        setOpen(false);
                        throw res;
                    }
                })
                .then(resJson => {
                    if (resJson.user && resJson.token) {
                        dispatch({
                            type: "LOGIN",
                            payload: resJson
                        });
                        setOpen(false);
                        props.location.search !== ""
                            ? history.push(
                                APIPath() + props.location.search.replace("?ReturnURL=", "") + "/?auth"
                            )
                            : history.push(APIPath() + "agent-dashboard");

                    }
                    else {
                        setMessage("Login Failed! Try again");
                        setOpenError(true);
                        setOpen(false);
                    }
                })
        }

    };
    const sendForgotMail = (data) => {
        setOpenModal(false);
        if (data.email === "") {
            setMessage("Please enter email id");
            setOpenWarning(true);
        }
        else {
            setOpen(true);
            postRecord(APIForgotPwd, data)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        setMessage(res.data[0].response.message);
                        setOpenSuccess(true);
                    }
                    else {
                        setMessage(res.data[0].response.message);
                        setOpenError(true);
                    }
                    setOpen(false);
                })
                .catch(err => {

                });
        }

    }
    const openBox = () => {
        if (!$("#mob_btn").hasClass('active')) {
            $("#mob_btn").addClass('active');
            $("#mobilemenu").addClass('active');
            return $('body').css('overflow', 'hidden');
        } else {
            $("#mob_btn").removeClass('active');
            $("#mobilemenu").removeClass('active');
            return $('body').css('overflow', 'auto');
        }
    }
    return (
        <div>
        <Title title="Login"/>
            <section class="home_page">
                {/* <div class="mobile_on mobile_slide">
                    <div class="mob_head">
                        <div class="hm_logo">
                            <Link to={APIPath()}>
                                <img src={Logo} alt="Logo" title="Logo" />
                            </Link>
                        </div>
                        <div class="">
                            <div class="gee_mobile">
                                <button class="gee_hamburger">&#9776;</button>
                                <button class="gee_cross">&#735;</button>
                            </div>
                        </div>
                    </div>
                    <div class="gee_menu">
                        <ul>
                            <li>
                                <Link to={APIPath() + "login"}>Login</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "register"}>Register</Link>
                            </li>
                            <li class="">
                                <Link to={APIPath()}>Home</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "features"}>Features</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "agent"}>Agents</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "broker"}>Brokers</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "association"}>Associations</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "about-us"}>About</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "example"}>Example</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "pricing"}>Pricing</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "faq"}>Faq</Link>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <div class="mobile_on mobile_slide">
                    <div class="mob_head">
                        <div class="hm_logo">
                            <a href="#">
                                <img src={Logo} alt="Logo" title="Logo" />
                            </a>
                        </div>
                        <div id="mobilemenu">
                            <div class="mobilemenu-wrapper">
                                <div class="mobilemenu-trigger">
                                <button id="mob_btn" class="trigger" onClick={openBox}>
                                        <span class="box">
                                            <span class="bar top"></span>
                                            <span class="bar middle"></span>
                                            <span class="bar bottom"></span>
                                        </span>
                                    </button>
                                </div>
                                <div class="mobilemenu-view">
                                    <div class="menu">
                                        <ul>
                                            <li>
                                                <Link to={APIPath() + "login"}>Login</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "agent"}>Register</Link>
                                            </li>
                                            <li class="">
                                                <Link to={APIPath()}>Home</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "features"}>Features</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "agent"}>Agents</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "broker"}>Brokers</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "association"}>Associations</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "about-us"}>About</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "example"}>Example</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "pricing"}>Pricing</Link>
                                            </li>
                                            <li>
                                                <Link to={APIPath() + "faq"}>FAQ</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="spacer1px"></hr>
                <div class="home_page_banner inner_banner">
                    <img src={banner} alt="" title="" />
                    <div class="inner_banner_cont">
                        <div class="inner_banner_cont_sec">
                            <h2>Login</h2>
                            <h5>Our Story… One Day at a Time!</h5>
                        </div>
                    </div>
                    <div class="inner_page_breadcumb">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="inner_page_breadcumb_main">
                                        <ul>
                                            <li>
                                                <Link to={APIPath()}><i class="fas fa-home"></i>Home</Link>
                                            </li>
                                            <li>
                                                <a href="#">Login</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="head_sec">
                    <header class="desktop_sticky">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="head_main">
                                        <div class="head_cont_left">
                                            <ul>
                                                <li><a href="#"><i class="far fa-envelope"></i>Support@VirtualTourCafe.com</a></li>
                                                <li><a href="#"><i class="fas fa-phone-alt"></i>(877) 744-8285 / (925) 609-2408</a></li>
                                            </ul>
                                        </div>
                                        <div class="head_cont_right">
                                            <ul>
                                                <li><Link to={APIPath() + "appointment"} class="login_btn"><i class="fal fa-book"></i>Schedule Your Appointment</Link></li>
                                                <li><Link to={APIPath() + "login"} class="login_btn"><i class="far fa-lock-alt"></i>Login</Link></li>
                                                <li><Link to={APIPath() + "agent"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="head_menu_sec_new">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="head_sec_menu">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">
                                                <div class="vtc_logo">
                                                    <Link to={APIPath()}>
                                                        <img src={Logo} alt="Logo" title="Logo" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="head_sec_menu_main">
                                                    <ul>
                                                        <li>
                                                            <Link to={APIPath()}>Home</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "features"}>Features</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "agent"}>Agents</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "broker"}>Brokers</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "association"}>Associations</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "about-us"}>About</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "example"}>Example</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "pricing"}>Pricing</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "faq"}>FAQ</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="broker_office_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="broker_office_sec_main">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="broker_office_sec_single">
                                            <img src={login_img_1} />
                                            <h4>Login to Broker Office</h4>
                                            <p>Login as Broker Office or Master Account</p>
                                            <li><Link to={APIPath() + "broker-login"} class="have_pics" >Login<i class="fas fa-arrow-right"></i></Link></li>
                                            {/* <a href="#" class="need_pic">Login Now<i class="fas fa-arrow-right"></i></a> */}
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="broker_office_sec_single">
                                        <img src={login_img_2} />
                                            <h4>Login as Agent</h4>
                                            <p>Agent or Broker Individual Subscription</p>
                                            <li><Link to={APIPath() + "agent-login"} class="have_pics" >Login<i class="fas fa-arrow-right"></i></Link></li>
                                            {/* <a href="#" class="have_pics">Login Now<i class="fas fa-arrow-right"></i></a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="ftr_get">
                {/* <section class="get_in_touch">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="get_in_touch_main">
                                    <div class="get_in_touch_left">
                                        <div class="get_in_touch_left_head">
                                            <h2>Lets Get In Touch</h2>
                                        </div>
                                        <div class="get_in_touch_left_conts">
                                            <ul>
                                                <li><i class="fas fa-map-marked-alt"></i>6200 Stoneridge Mall Rd, Suite 300 Pleasanton CA 94588</li>
                                                <li><i class="fas fa-envelope"></i>support@VirtualTourCafe.com</li>
                                                <li><i class="fas fa-phone-square-alt"></i>(877) 744-8285 / (925) 609-2408</li>
                                            </ul>
                                        </div>
                                        <div class="get_start_now">
                                            <h4>Get Started Now</h4>
                                            <ul class="btns_pics">
                                                <li>
                                                    <a href="#" class="need_pic">I Need Photos<i class="fas fa-arrow-right"></i></a>
                                                </li>
                                                <li>
                                                    <a href="#" class="have_pics">I Have Photos<i class="fas fa-arrow-right"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="get_in_touch_right">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.013383949486!2d-121.92670638484266!3d37.69588472446775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fec0ad5427675%3A0xd52511e0d357c742!2s6200%20Stoneridge%20Mall%20Rd%2C%20Pleasanton%2C%20CA%2094588%2C%20USA!5e0!3m2!1sen!2sin!4v1628112704757!5m2!1sen!2sin" width="100%" height="400" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <Footer1></Footer1>
                <Footer />
            </div>
            <a onClick={handleScroll} id="return-to-top" class="bounce" style={{ display: "block", cursor: "pointer" }}><i class="fas fa-angle-double-up"></i></a>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} >
                    Forgot Password
                </DialogTitle>
                <DialogContent dividers>
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            //if (user.password !== user.conf_password) return;
                            sendForgotMail(forgottenmail);
                        }}>
                        <div class="input-block">
                            <i class="icon far fa-envelope"></i>
                            <input type="text" id="input-text2" required spellcheck="false" onChange={handleEmailChange} name="email" value={forgottenmail.email} />
                            <span class="placeholder">Enter Your Email</span>
                        </div>
                        <hr class="spacer30px"></hr>
                        <Button style={{ float: "right" }} color="primary" type="submit" variant="contained">Send Link</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openWarning} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};