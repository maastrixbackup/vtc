import React, { useEffect, useState, useContext } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import user from "../../images/user.jpg";
import Captcha from "react-numeric-captcha";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIPath, APIURL } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer1 from "../../components/Footer/Footer1";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetContactData = APIURL() + "contactuspagecontent";
const APIGetUserData = APIURL() + "user-details";
const APIContactPageSendMail = APIURL() + "contactPage-SendMail";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function Contact() {
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const [contactData, setContactData] = useState({});
  const [msgData, setMsgData] = useState({});
  const [openWarning, setOpenWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSiteSetting, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetContactData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setContactData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
        }
      });
    }
  }, [context.state.user]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMsgData({ ...msgData, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMsgData({ ...msgData, [name]: value });
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setMsgData({ ...msgData, [name]: value.replace(/\D/g, "") });
  };
  const sendMessage = () => {
    if (captchaSuccess === false) {
      setMessage("Please enter a valid captcha code");
      setOpenError(true);
    } else {
      setOpen(true);
      const objuser = {
        authenticate_key: "abcd123XYZ",
        name: msgData.name,
        email: msgData.email,
        subject: msgData.subjectname,
        message: msgData.message,
      };
      postRecord(APIContactPageSendMail, objuser).then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setMsgData({});
          document.getElementById("message-form").reset();
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      });
    }
  };
  console.log(msgData);
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const handleMobchange = (value) => {
    setMsgData({ ...msgData, ["mobile"]: value });
  };
  const openBox = () => {
    if (!$("#mob_btn").hasClass("active")) {
      $("#mob_btn").addClass("active");
      $("#mobilemenu").addClass("active");
      return $("body").css("overflow", "hidden");
    } else {
      $("#mob_btn").removeClass("active");
      $("#mobilemenu").removeClass("active");
      return $("body").css("overflow", "auto");
    }
  };
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
                        <Link to={APIPath() + "preferred-vendors"}>
                          Preferred Vendors
                        </Link>
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
          {Object.keys(contactData).length > 0 ? (
            <img src={contactData.banner_section.image} alt="" title="" />
          ) : (
            <img src={banner} alt="" title="" />
          )}

          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(contactData).length > 0 ? (
                  contactData.banner_section.title
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h2>
              <h5>
                {Object.keys(contactData).length > 0 ? (
                  contactData.banner_section.sub_title
                ) : (
                  <Skeleton
                    variant="text"
                    width={450}
                    height={80}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h5>
            </div>
          </div>
          <div class="inner_page_breadcumb">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="inner_page_breadcumb_main">
                    <ul>
                      <li>
                        <Link to={APIPath()}>
                          <i class="fas fa-home"></i>Home
                        </Link>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
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
                        <li>
                          <a href="#">
                            <i class="far fa-envelope"></i>
                            {Object.keys(data).length > 0 ? (
                              data.site_email
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fas fa-phone-alt"></i>
                            {Object.keys(data).length > 0 ? (
                              data.phone_number
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="head_cont_right">
                      {context.state.isAuthenticated ? (
                        <ul>
                          {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                          <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                            <a
                              href="#"
                              class="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                              id="profileDropdown"
                              aria-expanded="false"
                            >
                              <div class="user_img">
                                <img
                                  src={currentUser && currentUser.profile_img}
                                  alt="profile"
                                />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img
                                    src={currentUser && currentUser.profile_img}
                                    alt="profile"
                                  />
                                </div>
                                <div class="content-text">
                                  <h6>{currentUser.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "agent-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              <a href="#" class="dropdown-item">
                                <i class="fas fa-user-edit profile-icon"></i>
                                Edit profile
                              </a>
                              <a
                                href={APIPath() + "agent-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>

                              <Link
                                to={APIPath() + "agent-support"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>

                              <Link
                                onClick={handleLogout}
                                to={APIPath()}
                                class="dropdown-item"
                              >
                                <i class="fas fa-sign-out-alt profile-icon"></i>
                                Sign Out
                              </Link>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            <Link
                              to={APIPath() + "appointment"}
                              class="login_btn"
                            >
                              <i class="fal fa-book"></i>Schedule Your
                              Appointment
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "login"} class="login_btn">
                              <i class="far fa-lock-alt"></i>Login
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "agent"} class="register_btn">
                              <i class="fas fa-edit"></i>Register
                            </Link>
                          </li>
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
                              <Link to={APIPath() + "association"}>
                                Associations
                              </Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "preferred-vendors"}>
                                Preferred Vendors
                              </Link>
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
      <section class="contact_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h4>
                {Object.keys(contactData).length > 0 ? (
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: contactData.banner_underneath_sec.title,
                    }}
                  ></div>
                ) : (
                  <Skeleton
                    variant="text"
                    width={450}
                    height={80}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h4>
              {Object.keys(contactData).length > 0 ? (
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: contactData.banner_underneath_sec.description,
                  }}
                ></div>
              ) : (
                <Skeleton
                  variant="text"
                  width={550}
                  height={200}
                  style={{ background: "#bbbbbb", margin: "0 auto" }}
                />
              )}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="contact_sec_main">
                <div class="row">
                  <div class="col-lg-5 col-md-5 col-12">
                    <div class="contact_sec_cont">
                      <ul>
                        <li class="">
                          <div class="contact_sec_cont_upper text-center p-5 m-3 color_1">
                            <span>
                              <svg
                                class="svg-inline--fa fa-mobile-alt fa-w-10 fa-3x"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="mobile-alt"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
                                ></path>
                              </svg>
                            </span>
                            <a href="" style={{ fontSize: "18px" }}>
                              {Object.keys(contactData).length > 0 ? (
                                contactData.for_mobile.title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={450}
                                  height={80}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </a>
                            <p>
                              {" "}
                              {Object.keys(contactData).length > 0 ? (
                                contactData.for_mobile.sub_title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={450}
                                  height={80}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </p>
                          </div>
                        </li>
                        <li class="">
                          <div class="contact_sec_cont_upper text-center p-5 m-3 color_2">
                            <svg
                              class="svg-inline--fa fa-envelope-open-text fa-w-16 fa-3x"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="envelope-open-text"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z"
                              ></path>
                            </svg>
                            <a href="" style={{ fontSize: "25px" }}>
                              {Object.keys(contactData).length > 0 ? (
                                contactData.for_email.title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={450}
                                  height={80}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </a>
                            <p>
                              {" "}
                              {Object.keys(contactData).length > 0 ? (
                                contactData.for_email.sub_title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={450}
                                  height={80}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="contact_sec_right">
                      <form id="message-form"
                        onSubmit={(event) => {
                          event.preventDefault();
                          sendMessage();
                        }}
                      >
                        <div class="contact_sec_right_single">
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            value={msgData.name}
                            required
                          />
                        </div>
                        <div class="contact_sec_right_single">
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={msgData.email}
                            required
                          />
                        </div>
                        <div class="contact_sec_right_single">
                          <ReactPhoneInput
                            country="us"
                            onlyCountries={["us"]}
                            value={msgData.mobile}
                            onChange={handleMobchange}
                            required
                          />
                          {/* <input type="text" name="mobile" placeholder="Mobile No" onChange={handlePhoneChange} value={msgData.mobile} maxLength={10} required /> */}
                        </div>
                        <div class="contact_sec_right_single">
                          <input
                            type="text"
                            name="companyname"
                            placeholder="Company Name"
                            onChange={handleInputChange}
                            value={msgData.companyname}
                          />
                        </div>
                        <div class="contact_sec_right_single">
                          <select
                            onChange={handleInputChange}
                            name="subjectname"
                            value={msgData.subjectname}
                          >
                            <option>Subject</option>
                            <option value="Interested in learning more about your Agents Subscription Options.">
                              Interested in learning more about your Agents
                              Subscription Options.
                            </option>
                            <option value="Interested in learning more about your Broker Office Discount Programs.">
                              Interested in learning more about your Broker
                              Office Discount Programs.
                            </option>
                            <option value="Interested in learning more about Associations Member Of Benefits Programs.">
                              Interested in learning more about your
                              Associations Member Of Benefits Programs.
                            </option>
                            <option value="Interested in learning more about your Do-It-For-Me Photography or 3D.">
                              Interested in learning more about your
                              Do-It-For-Me Photography or 3D.
                            </option>
                            <option value="Interested in learning more about becoming a VirtualTourCafe  Photographer.">
                              Interested in learning more about becoming a
                              VirtualTourCafe Photographer.
                            </option>{" "}
                            <option value="Interested in learning more about Partnering Opportunities.">
                              Interested in learning more about Partnering
                              Opportunities.
                            </option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div class="contact_sec_right_single">
                          <textarea
                            placeholder="Message"
                            onChange={handleInputChange}
                            name="message"
                            value={msgData.message}
                          ></textarea>
                        </div>
                        <div class="contact_sec_right_single">
                          <Captcha
                            onChange={(status) => setCaptchaSuccess(status)}
                          />
                        </div>
                        <div class="contact_sec_right_single">
                          <button type="submit" class="need_pic">
                            Send Message <i class="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="contact_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="contact_sec_main">
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-12">
                                        <div class="contact_sec_head">

                                            {Object.keys(contactData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            contactData.banner_underneath_sec.description
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                        <div class="contact_sec_cont">
                                            <ul>
                                                <li class="">
                                                    <div class="contact_sec_cont_upper text-center p-5 m-3 color_1">
                                                        <span><svg class="svg-inline--fa fa-mobile-alt fa-w-10 fa-3x" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mobile-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"></path></svg></span>
                                                        <a href="" style={{ fontSize: "18px" }}>
                                                            {Object.keys(contactData).length > 0 ? (
                                                                contactData.for_mobile.title
                                                            ) : (
                                                                <Skeleton variant="text" width={450} height={80} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                            )}
                                                        </a>
                                                        <p> {Object.keys(contactData).length > 0 ? (
                                                            contactData.for_mobile.sub_title
                                                        ) : (
                                                            <Skeleton variant="text" width={450} height={80} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                        )}</p>
                                                    </div>
                                                </li>
                                                <li class="">

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <div class="contact_sec_right">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <div class="ftr_get">
        <Footer1></Footer1>
        <Footer />
      </div>
      <a
        onClick={handleScroll}
        id="return-to-top"
        class="bounce"
        style={{ display: "block", cursor: "pointer" }}
      >
        <i class="fas fa-angle-double-up"></i>
      </a>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openWarning}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
