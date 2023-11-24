import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import user from "../../images/user.jpg";
import Captcha from "react-numeric-captcha";
import map_img from "../../images/c-map.png";
import Footer from "../../components/Footer/Footer";
import Skeleton from '@material-ui/lab/Skeleton';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAssociationData = APIURL() + "associationquotecontent";
const APIGetUserData = APIURL() + "user-details";
const APISaveQuote = APIURL() + "request-quote";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
    bullet: {
        display: "inline-block",
        margin: "2px",
        transform: "scale(2)",
        color: "red !important",
        fontWeight: "bold"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
    },
}));
export default function AssociationQuote() {
    const initialState = {
        authenticate_key: "abcd123XYZ",
        name: "",
        title: "",
        association_name: "",
        email: "",
        phone: "",
        no_of_member: "",
        message: ""
    }
    const classes = useStyles();
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const [openWarning, setOpenWarning] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [data, setData] = useState({});
    const [associationData, setAssociationData] = useState({});
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const [associationState, setAssociationState] = useState(initialState);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    useEffect(() => {
        window.scroll(0, 0);
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIGetSiteSetting, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setData(res.data[0].response.data);
                }
            });
    }, []);
    useEffect(() => {
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIGetAssociationData, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setAssociationData(res.data[0].response.data);
                }
            });
    }, []);
    useEffect(() => {
        if (context.state.user) {
            const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
            postRecord(APIGetUserData, objusr)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        setCurrentUser(res.data[0].response.data.agent_profile);
                    }
                });
        }
    }, [context.state.user]);
    const handleScroll = () => {
        window.scrollTo(0, 0);
    };
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssociationState({ ...associationState, [name]: value });
    }
    const saveAssociationQuote = () => {
        if (captchaSuccess === false) {
            setMessage("Please enter a valid captcha code");
            setOpenError(true);
        }
        else {
            setOpen(true);
            postRecord(APISaveQuote, associationState)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        setMessage(res.data[0].response.message);
                        setOpenSuccess(true);
                        setAssociationState(initialState);
                    }
                    else {
                        setMessage(res.data[0].response.message);
                        setOpenError(true);
                    }
                    setOpen(false);
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
            <section class="home_page">
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
                    {Object.keys(associationData).length > 0 ? (
                        <img src={associationData.banner_section.image} alt="" title="" />
                    ) : (
                        <img src={banner} alt="" title="" />
                    )}
                    <div class="inner_banner_cont">
                        <div class="inner_banner_cont_sec">
                            <h2>{Object.keys(associationData).length > 0 ? (
                                associationData.banner_section.title
                            ) : (
                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}</h2>
                            <h5>{Object.keys(associationData).length > 0 ? (
                                associationData.banner_section.sub_title
                            ) : (
                                <Skeleton variant="text" width={450} height={80} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}</h5>
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
                                                <a href="#">Association</a>
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
                                                <li><a href="#"><i class="far fa-envelope"></i>
                                                    {Object.keys(data).length > 0 ? (
                                                        data.site_email
                                                    ) : (
                                                        <Skeleton variant="text" width={150} height={30} style={{ background: "#bbbbbb" }} />
                                                    )}
                                                </a></li>
                                                <li><a href="#"><i class="fas fa-phone-alt"></i>
                                                    {Object.keys(data).length > 0 ? (
                                                        data.phone_number
                                                    ) : (
                                                        <Skeleton variant="text" width={150} height={30} style={{ background: "#bbbbbb" }} />
                                                    )}
                                                </a></li>
                                            </ul>
                                        </div>
                                        <div class="head_cont_right">
                                            {context.state.isAuthenticated ? (
                                                <ul>
                                                    <li><Link to={APIPath() + "agent"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li>
                                                    <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                                                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown" aria-expanded="false">
                                                            <div class="user_img">
                                                                <img src={currentUser && currentUser.profile_img} alt="profile" />
                                                            </div>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top" aria-labelledby="profileDropdown" style={{ zIndex: "99" }}>
                                                            <div class="profile-header d-flex align-items-center">
                                                                <div class="thumb-area">
                                                                    <img src={currentUser && currentUser.profile_img} alt="profile" />
                                                                </div>
                                                                <div class="content-text">
                                                                    <h6>{currentUser.name}</h6>

                                                                </div>
                                                            </div>
                                                            <Link to={APIPath() + "agent-dashboard"} class="dropdown-item"><i class="fas fa-user profile-icon"></i>Dashboard</Link>
                                                            <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a>
                                                            <a href={APIPath() + "agent-setting"} class="dropdown-item"><i class="fas fa-cog profile-icon"></i>Settings</a>

                                                            <Link to={APIPath() + "agent-support"} class="dropdown-item"><i class="fas fa-info-circle profile-icon"></i>Support</Link>

                                                            <Link onClick={handleLogout} to={APIPath()} class="dropdown-item"><i class="fas fa-sign-out-alt profile-icon"></i>Sign Out</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <ul>
                                                    <li><Link to={APIPath() + "appointment"} class="login_btn"><i class="fal fa-book"></i>Schedule Your Appointment</Link></li>
                                                    <li><Link to={APIPath() + "login"} class="login_btn"><i class="far fa-lock-alt"></i>Login</Link></li>
                                                    <li><Link to={APIPath() + "agent"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li>
                                                </ul>
                                            )}
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
                                                        <li >
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
            <section class="associations_qoute" style={{ backgroundImage: "url(" + map_img + ")" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-md-10 mx-auto">
                            <div class="associations_qoute_main">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="associations_qoute_left">
                                            {Object.keys(associationData).length > 0 ? (
                                                <img src={associationData.banner_underneath_sec.image} alt="" title="" />
                                            ) : (
                                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <form onSubmit={event => {
                                            event.preventDefault();
                                            saveAssociationQuote();
                                        }}>
                                            <div class="associations_qoute_right">
                                                <div class="associations_qoute_right_single">
                                                    <input type="text" name="name" onChange={handleInputChange} value={associationState.name} placeholder="Full Name" required />
                                                    <i class="fa fa fa-user"></i>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <select name="title" onChange={handleInputChange} value={associationState.title}>
                                                        <option value="">Please select one</option>
                                                        <option value="Executive/CEO">Executive/CEO</option>
                                                        <option value="President">President</option>
                                                        <option value="Director">Director</option>
                                                        <option value="Manager">Manager</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <input type="text" name="association_name" onChange={handleInputChange} value={associationState.association_name} placeholder="Association Name" required />
                                                    <i class="fa fa fa-envelope"></i>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <input type="text" name="email" onChange={handleInputChange} value={associationState.email} placeholder="Email" required />
                                                    <i class="fa fa fa-envelope"></i>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <input type="text" name="phone" onChange={handleInputChange} value={associationState.phone} placeholder="Phone" required />
                                                    <i class="fa fa fa-phone"></i>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <input type="text" name="no_of_member" onChange={handleInputChange} value={associationState.no_of_member} placeholder="No Of Members" />
                                                    <i class="fa fa fa-users"></i>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <textarea name="message" onChange={handleInputChange} value={associationState.message} placeholder="Any Query Please Text Here.." rows="5"></textarea>
                                                </div>
                                                <div class="associations_qoute_right_single">
                                                    <Captcha
                                                        onChange={status => setCaptchaSuccess(status)}
                                                    />
                                                </div>
                                                <div class="contact_sec_right_single">
                                                    <button type="submit" class="need_pic">Request Quote <i class="fas fa-arrow-right"></i></button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="ftr_get">
                <Footer1 />
                <Footer />
            </div>
            <a onClick={handleScroll} id="return-to-top" class="bounce" style={{ display: "block", cursor: "pointer" }}><i class="fas fa-angle-double-up"></i></a>
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