import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import 'react-voice-recorder/dist/index.css'
import Button from '@material-ui/core/Button';
import Slider from 'react-rangeslider';
import Switch from "react-switch";
import dateFormat from "dateformat";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import banner from "../../../images/vtc-banner.jpg";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import up_img from "../../../images/up.png";
import middle_img from "../../../images/middle.png";
import bottom_img from "../../../images/bottom.png";
import man from "../../../images/man.png";
import house_img from "../../../images/house-img.jpg";
import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import bannerImage from "../../../images/default-banner.jpg";
import photo from "../../../images/photo.jpg";
const APIGetUserData = APIURL() + "user-details";
const APISendContactMail = APIURL() + "get-Contact-Agent";
const APIGetActiveImagesetList = APIURL() + "get-activeimagesetlist";
const APIGetTourDetails = APIURL() + "tour-details";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentMylisting(props) {
    const TourId = props.match.params.listingId;
    const [sync, setSync] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openAgentinfo, setopenAgentInfo] = useState("");
    const [openContactinfo, setopenContactInfo] = useState("");
    const context = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [contactMail, setContactMail] = useState({});
    const [activeImageListData, setActiveImageListData] = useState([]);
    const [themeId, setThemeId] = useState("");
    const [id, setId] = useState("");
    useEffect(() => {
        $(".gee_cross").hide();
        $(".gee_menu").hide();
    }, []);
    const ShowMenu = () => {
        $(".gee_menu").slideToggle("slow", function () {
            $(".gee_hamburger").hide();
            $(".gee_cross").show();
        });
    }
    const HideMenu = () => {
        $(".gee_menu").slideToggle("slow", function () {
            $(".gee_cross").hide();
            $(".gee_hamburger").show();
        });
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    const [user, setUser] = useState({
        username: ""
    });
    const [captcha, setCaptcha] = useState("");
    const characters = 'abc123';
    useEffect(() => {
        generateString(6);
    }, []);
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCaptcha(result);
        //return result;
    }

    useEffect(() => {
        if (context.state.user) {
            const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
            postRecord(APIGetActiveImagesetList, objusr)
                .then(res => {
                    if (res.data[0].response.status === "success") {
                        setActiveImageListData(res.data[0].response.data);
                    }
                });
        }

    }, [context.state.user])
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
    // https://www.virtualtourcafe.com/tour/
    useEffect(() => {
        if (context.state.user) {
            const agent_id = JSON.parse(context.state.user).agentId;
            if (themeId === 1) {
                window.open("/tour/" + id, '_blank');
                setThemeId("");
            } else if (themeId === 2) {
                window.open("/tour/" + id, '_blank');
                setThemeId("");
            } else if (themeId === 3) {
                window.open("/tour/" + id, '_blank');
                setThemeId("");
            } else if (themeId === 4) {
                window.open("/tour/" + id, '_blank');
                setThemeId("");
            }
            else if (themeId === 5) {
                window.open("/tour/" + id, '_blank');
                setThemeId("");
            }
        }
    }, [context.state.user, id, themeId]);

    const inputHandleMailChange = (event) => {
        const { name, value } = event.target;
        setContactMail({ ...contactMail, [name]: value });
    }
    const ContactAgent = () => {
        if (captcha == user.username) {
            contactMail.authenticate_key = "abcd123XYZ";
            contactMail.tourId = TourId;
            contactMail.agentId = JSON.parse(context.state.user).agentId;
            contactMail.first_name = contactMail.first_name;
            contactMail.last_name = contactMail.last_name;
            contactMail.contact_email = contactMail.contact_email;
            postRecord(APISendContactMail, contactMail)
                .then(res => {
                })
        } else {
            setOpenError(true)
            setMessage("You Entered Invalid captcha")
        }

    }
    const generatenewcode = () => {
        generateString(6);
    }
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        user[name] = value;
        setUser(user);
    }
    const RedirectThemePage = (id) => {
        const objusr = { authenticate_key: "abcd123XYZ", agentId: JSON.parse(context.state.user).agentId, tourid: TourId }
        postRecord(APIGetTourDetails, objusr)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setThemeId(res.data[0].response.tourdetails.premium_tour_theme);
                }
            })
    }
    return (
        <>
            <AgentHeader />
            <section class="vtc_agent_banner" >
                <div class="vtc_top_menu">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="vtc_agent_menu_top">
                                    <ul>
                                        <li>
                                            <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                                        </li>
                                       
                                        <li>
                                            <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                                        </li>
                                        <li class="">
                                            <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-video-list"}>Videos</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-setting"}>Settings</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-preferred-vendor"}>Preferred Vendors</Link>
                                        </li>
                                        <li>
                                            <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">Xpressdocs</a>
                                        </li>
                                        <li class="">
                                            <Link to={APIPath() + "agent-support"}>Support</Link>
                                        </li>
                                    </ul>
                                    <div class="gee_mobile">
                                        <button onClick={() => ShowMenu()} class="gee_hamburger">&#9776;</button>
                                        <button onClick={() => HideMenu()} class="gee_cross">&#735;</button>
                                    </div>
                                </div>
                                <div class="gee_menu">
                                    <ul>
                                        <li class="">
                                            <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                                        </li>
                                        
                                        <li>
                                            <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                                        </li>
                                        <li class="">
                                            <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-video-list"}>Videos</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-setting"}>Settings</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-preferred-vendor"}>Preferred Vendors</Link>
                                        </li>
                                        <li>
                                            <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">Xpressdocs</a>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "agent-support"}>Support</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" style={{ marginTop: "-60px" }}>
                    <div class="row">
                        <div class="col-lg-12 col-md-12" >
                            <img src={bannerImage} style={{ width: "100%", backgroundSize: "cover" }} />
                        </div>
                        <div class="col-lg-12 col-md-12" style={{ marginTop: "20px" }}>
                            <div style={{ background: "linear-gradient(to right, #3276b5 0%,#0f999a 100%)", width: "100%", height: "90px", padding: "15px", color: "white" }}>
                                {/* <h5>{Object.keys(agentInfoData).length > 0 ? (
                                agentInfoData.fname + " " + agentInfoData.lname
                            ) : (
                                <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                            )}</h5> */}
                                {/* <h5>{Object.keys(agentInfoData).length > 0 ? (
                                agentInfoData.company
                            ) : (
                                <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                            )}</h5> */}
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12" style={{ marginTop: "20px" }}>
                            <div style={{ background: "#2187a8 ", width: "100%", height: "70px", padding: "10px" }}>
                                <div class="col-lg-12 col-md-12">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

                                        <div style={{ width: "40%", display: "flex", justifyContent: "space-around", alignItems: "center", lineHeight: "50px" }}>
                                            <div>
                                                <a onClick={() => setopenAgentInfo(true)} style={{ color: "#f8f9fa" }}>
                                                    <i class="fa fa-user" aria-hidden="true"></i>
                                                    <span style={{ margin: "5px" }}>Profile</span>
                                                </a>
                                            </div>
                                            <div>
                                                <a onClick={() => setopenContactInfo(true)} style={{ color: "#f8f9fa" }}>
                                                    <i class="far fa-id-card"></i>
                                                    <span style={{ margin: "5px" }}> Contact Agent</span> </a>
                                            </div>
                                        </div>
                                        <div class="action_sec_right">
                                            <ul>
                                                <li>
                                                    <span>order By</span>
                                                    <select>
                                                        <option>Status (asc)</option>
                                                        <option>Status (desc)</option>
                                                        <option>Creation Date (asc)</option>
                                                        <option>Creation Date (desc)</option>
                                                        <option>Price (asc)</option>
                                                        <option>Price (desc)</option>
                                                        <option>Bedrooms (asc)</option>
                                                        <option>Bedrooms (desc)</option>
                                                        <option>Bathrooms (asc)</option>
                                                        <option>Bathrooms (desc)</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section style={{ marginTop: "-145px" }}>
                <div class="container">
                    <div class="row" style={{  margin: "10px", marginTop: "0px" ,boxShadow: "0 0 4px #ccc",padding: "20px 10px",}}>
                        <div class="col-lg-4 col-md-4" style={{boxShadow: "0 0 4px #ccc",padding: "20px 10px"}}>
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <img src={photo} />
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col-lg-12 col-md-12" >
                                    <p>TEST
                                        , <br />dfds, Alberta, Canada,</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-5 col-md-5">
                                    <p>Tour ID</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                    <p>MLS</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                    <p>Price`</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                    <p>Status</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                    <p>Beds</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                    <p>Baths</p>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section class="container" style={{ marginTop: "-120px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
                <div class="row imagelist">
                    {activeImageListData.map(res => (
                        <div class="col-md-4"
                            onClick={() => {
                                RedirectThemePage(res.id);
                                setId(res.id);
                            }}
                            style={{ marginBottom: "30px" }}>
                            <div class="card" style={{ height: "100%" }}>
                                <img class="card-img-top" src={res.filename} alt="Card image cap" style={{ height: "260px", border: "5px solid white" }} />
                                <div class="card-body">
                                    <h5 class="card-title">{res.caption}</h5>
                                    <h5 class="card-title">{res.countryname}</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Tour ID</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.id}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>MLS</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.mls}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Price</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.price}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Status</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.categoryname}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Beds</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.Beds}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Baths</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.Baths}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <Dialog maxWidth={maxWidth} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openAgentinfo}>
                <DialogTitle id="customized-dialog-title" >
                    Amenities
                    <CancelIcon onClick={() => setopenAgentInfo(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                                //saveCompanyBanner();
                            }}>
                            <div class="agent_pop_main">
                                <div class="">
                                    <div class="browse_img_head">
                                        <h5>Personal Information</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                    <img src={photo} />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4">
                                                <p style={{ marginLeft: "10px" }}>{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.name
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.company
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Mobile-: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.mobile
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Email:{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.email
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Office: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.officephone
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Website: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.website
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
                                        <h5>Profile</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-12 col-md-12">
                                                <p style={{ textAlign: "justify" }}>In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo. In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo. In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
                                        <h5>Credentials</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-12 col-md-12">
                                                <p>N/A</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog maxWidth={maxWidth} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openContactinfo}>
                <DialogTitle id="customized-dialog-title" >
                    Contact Agent
                    <CancelIcon onClick={() => setopenContactInfo(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                                ContactAgent();
                            }}>
                            <div class="agent_pop_main">
                                <div class="">
                                    <div class="browse_img_head">
                                        <h5>Personal Information</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                First Name *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="text" name="first_name" value={contactMail.first_name} onChange={inputHandleMailChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Last Name *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="text" name="last_name" value={contactMail.last_name} onChange={inputHandleMailChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Email  *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="email" name="contact_email" value={contactMail.contact_email} onChange={inputHandleMailChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Phone
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="text" name="phone" value={contactMail.phone} onChange={inputHandleMailChange} class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Comments
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <textarea type="text" name="comments" value={contactMail.comments} onChange={inputHandleMailChange} class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Verify
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha"
                                                    name="username" onChange={handleChange} autocomplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-12">
                                                <h4 id="captcha" style={{ margin: "10px" }}>{captcha}</h4>
                                                <button id="succesBTN" onClick={generatenewcode} class="btn btn-primary ml-1" style={{ backgroundColor: "#ffa12d", borderStyle: "none" }}>regenerate</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
                                        <button type="submit" class="next_btn border-0">Send</button>
                                    </div>
                                    <p>* Required Fields</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Footer />
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

        </>
    )
}