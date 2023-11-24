import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import video from "../../images/video.mp4";
import Footer from "../../components/Footer/Footer";
import logo from "../../images/vtc-logo.png";
import mission_bg from "../../images/mission-bg.jpg";
import phone from "../../images/phone.png";
import ftr_head from "../../images/ftr-head-bg.png";
import pic_bg from "../../images/pic-bg.png";
// import video_1 from "../../images/video3.mp4";
import user from "../../images/user.jpg";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import "./Landingpage.css";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetUserData = APIURL() + "user-details";
const APIHomeData = APIURL() + "homecontent";
const APIPartnerData = APIURL() + "company-logoList";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
const APIVisitorOption = APIURL() + "visitor-opt-newsletter";
const APITourData = APIURL() + "getTourData";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const options = {
  lazyLoad: true,
  loop: true,
  margin: 0,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 3500,
  autoplayHoverPause: false,
  autoHeight: true,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 1000,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left sp'></i>",
    "<i class='fa fa-angle-right sp'></i>",
  ],
  dots: false,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
};
const options1 = {
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 3500,
  autoplayHoverPause: false,
  autoHeight: true,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 2500,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
    },

    1024: {
      items: 4,
    },

    1366: {
      items: 5,
    },
  },
};
const options2 = {
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 3500,
  autoplayHoverPause: false,
  autoHeight: true,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 2500,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
};
const useStyles = makeStyles((theme) => ({
  recent_projects_head: {
    position: "relative",
    textAlign: "center",
    "& h2::after": {
      backgroundImage: "url(" + ftr_head + ")",
      content: '""',
      height: "4px",
      width: "50px",
      position: "absolute",
      textAlign: "center",
      right: "0",
      left: "0",
      bottom: "-20px",
      margin: "0 auto",
    },
    "& p": {
      color: "#353535",
      maxWidth: "1100px",
      margin: "0 auto",
      fontSize: " 18px",
      fontWeight: "600",
      lineHeight: "26px",
    },
    "& h2": {
      color: "#212d3e",
      margin: "0 0 45px 0",
      fontWeight: "600",
      fontFamily: "Jost",
      position: "relative",
      textAlign: "center",
    },
  },
  photo_sec_main_single: {
    position: "relative",
  },
  photo_sec_main_single_cont: {
    position: "relative",
    margin: "15px 0 0 0",
    textAlign: "center",
    "& h4": {
      position: "relative",
      fontFamily: "Jost",
      fontSize: "30px",
      fontWeight: "600",
      color: "#000",
      margin: "0 0 20px 0",
    },
    "& p": {
      fontWeight: "600",
    },
  },
  photo_sec_main_single_img: {
    position: "relative",
    textAlign: "center",
    minHeight: "115px",
    "& ::after": {
      backgroundImage: "url(" + pic_bg + ")",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      content: '""',
      height: "115px",
      width: "170px",
      position: "absolute",
      textAlign: "center",
      right: "0",
      left: "0",
      margin: "0 auto",
      top: "-100px",
      zIndex: "-1",
    },
  },
  our_partners_head: {
    position: "relative",
    textAlign: "center",
    "& h2::after": {
      backgroundImage: "url(" + ftr_head + ")",
      content: '""',
      height: "4px",
      width: "50px",
      position: "absolute",
      textAlign: "center",
      right: "0",
      left: "0",
      bottom: "-20px",
      margin: "0 auto",
    },
  },
}));
export default function LandingPage(props) {
  const metaCtx = MetaInfo();

  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [metaData, setMetaData] = useState({});
  const [tourData, setTourData] = useState({});
  const [data, setData] = useState({});
  const [homeData, setHomeData] = useState({});
  const [siteTitle, setSiteTitle] = useState("");
  const [partnerData, setPartnerData] = useState([]);
  const [service, setService] = useState("serv1");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openVideoModalTwo, setOpenVideoModalTwo] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [currentBroker, setCurrentBroker] = useState({});
  const [emaildata, setEmailData] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSiteSetting, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setData(res.data[0].response.data);
        setSiteTitle(res.data[0].response.data.site_title);
      }
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APITourData, obj).then((res) => {
      setTourData(res.data);
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIHomeData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setHomeData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIPartnerData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setPartnerData(res.data[0].response.dataDetails.dataProvider);
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
    setOpenVideoModal(false);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 1,
      };
      const res = await postRecord(APIURL() + "get-metadata", objusr);

      setMetaData(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        broker_id: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerDetails, objusr).then((res) => {
        setCurrentBroker(res.data[0].response.data.broker_profile);
      });
    }
  }, [context.state.user]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", broker_id: JSON.parse(context.state.user).role };

  //     }
  // }, [context.state.user])

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  const handleInputChange = (event) => {
    setEmailData(event.target.value);
  };
  const EmailFunctionality = () => {
    setOpen(true);
    const objusr = { authenticate_key: "abcd123XYZ", email_id: emaildata };
    postRecord(APIVisitorOption, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setOpen(false);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setOpen(true);
      }
    });
  };
  const opanWebsiteLink = (link) => {
    window.open(link, "_blank");
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
  useEffect(() => {
    metaCtx.setPageTitle(metaData.page);
    metaCtx.setMetaDesc(metaData.metaDesc);
    metaCtx.setMetaKw(metaData.metaKeyWords);
    metaCtx.setMetaTitle(metaData.metaTitle);
    metaCtx.setOgtitle(metaData.ogTitle);
    metaCtx.setOgDesc(metaData.ogDesc);
    metaCtx.setOgSiteName(metaData.ogSiteName);
    metaCtx.setTwitterCard(metaData.twitterCard);
    metaCtx.setTwitterSite(metaData.twitterSite);
    metaCtx.setTwitterTitle(metaData.twitterTitle);
    metaCtx.setTwitterDesc(metaData.twitterDesc);
  }, [metaData]);
  return (
    <div>
      <Title title="" />
      <section class="home_page">
        <div class="mobile_on mobile_slide">
          <div class="mob_head">
            <div class="hm_logo">
              <a href="#">
                <img src={logo} alt="Logo" title="Logo" />
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
        <div>
          <OwlCarousel margin={10} {...options} id="home_slide">
            <div class="home_page_banner">
              <img
                src="https://www.virtualtourcafe.com/alpha/static/media/hm-banner-new-3.3929ad35.webp"
                alt=""
                title=""
              />
              <div class="home_page_banner_cont mobile_on">
                <div>
                  <h1>THE PREMIER RESOURCE FOR REAL ESTATE PROFESSIONALS</h1>
                  <h4>
                    VirtualTourCafe, Your One Stop Solution for all your Real
                    Estate Marketing Needs.
                  </h4>
                </div>
              </div>
            </div>
            <div class="home_page_banner">
              <img
                src="https://www.virtualtourcafe.com/alpha/static/media/hm-banner-new-1.5ea1d5b3.webp"
                alt=""
                title=""
              />
              <div class="home_page_banner_cont mobile_on">
                <div>
                  <h1>THE PREMIER RESOURCE FOR REAL ESTATE PROFESSIONALS</h1>
                  <h4>
                    VirtualTourCafe, Your One Stop Solution for all your Real
                    Estate Marketing Needs.
                  </h4>
                </div>
              </div>
            </div>
            <div class="home_page_banner">
              <img
                src="https://www.virtualtourcafe.com/alpha/static/media/hm-banner-new-2.bdfcc160.webp"
                alt=""
                title=""
              />
              <div class="home_page_banner_cont mobile_on">
                <div>
                  <h1>THE PREMIER RESOURCE FOR REAL ESTATE PROFESSIONALS</h1>
                  <h4>
                    VirtualTourCafe, Your One Stop Solution for all your Real
                    Estate Marketing Needs.
                  </h4>
                </div>
              </div>
            </div>
            <div class="home_page_banner">
              <img
                src="https://www.virtualtourcafe.com/alpha/static/media/hm-banner-new.4b7e26c5.webp"
                alt=""
                title=""
              />
              <div class="home_page_banner_cont mobile_on">
                <div>
                  <h1>THE PREMIER RESOURCE FOR REAL ESTATE PROFESSIONALS</h1>
                  <h4>
                    VirtualTourCafe, Your One Stop Solution for all your Real
                    Estate Marketing Needs.
                  </h4>
                </div>
              </div>
            </div>
          </OwlCarousel>
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
                          <a href="mailto:support@VirtualTourCafe.com">
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
                          <a href="tel:(877) 744-8285 or (925) 609-2408">
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
                      {context.state.isAuthenticated &&
                      JSON.parse(context.state.user).role == "broker" ? (
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
                                <img src={user} alt="profile" />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img src={user} alt="" title="" />
                                </div>
                                <div class="content-text">
                                  <h6>{currentBroker.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "broker-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              {/* <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a> */}

                              <a
                                href={APIPath() + "broker-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>

                              <Link
                                to={APIPath() + "broker-reports"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>

                              {/* <a href="#" class="dropdown-item"><i class="fas fa-chart-line profile-icon"></i>Activity</a> */}

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
                      ) : context.state.isAuthenticated &&
                        JSON.parse(context.state.user).role == "agent" ? (
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
                              {/* <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a> */}

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

                              {/* <a href="#" class="dropdown-item"><i class="fas fa-chart-line profile-icon"></i>Activity</a> */}

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
                          {Object.keys(data).length > 0 ? (
                            <Link to={APIPath()}>
                              <img
                                className="uma"
                                src={logo}
                                alt="Logo"
                                title="Logo"
                              />
                            </Link>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={100}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="head_sec_menu_main">
                          <ul>
                            <li class="active">
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
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="banner_cont mobile_off">
                    {Object.keys(homeData).length > 0 ? (
                      <h1 class="animated fadeInLeft">
                        {homeData.home_banner_content.title}
                      </h1>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={550}
                        height={100}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                    {Object.keys(homeData).length > 0 ? (
                      <h4 class="animated fadeInRight">
                        {homeData.home_banner_content.sub_title}
                      </h4>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={550}
                        height={50}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-7 col-md-12 col-xl-6 mx-auto">
                  <div class="get_started">
                    {Object.keys(homeData).length > 0 ? (
                      <h4 class="animated fadeInRight">
                        {homeData.home_banner_content.description}
                      </h4>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={100}
                        height={50}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                    <ul class="btns_pics">
                      <li>
                        <Link to={APIPath() + "appointment"} class="need_pic">
                          I Need Photos<i class="fas fa-arrow-right"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "agent"} class="need_pic">
                          I Have Photos<i class="fas fa-arrow-right"></i>
                        </Link>
                      </li>
                    </ul>
                    <div class="watchvideo2" style={{ textAlign: "center" }}>
                      <a
                        onClick={() => setOpenVideoModalTwo(true)}
                        href="javascript:void(0)"
                      >
                        WATCH THE VIDEO <i class="fas fa-play-circle"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 mx-auto text-center contact_book_btn">
                  <a href="#pro" class="down_btn bounce">
                    <i class="fas fa-chevron-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        class="bg_shape"
        style={{
          backgroundImage:
            "url('https://www.virtualtourcafe.com/alpha/static/media/hm-bg-shape.270712f6.webp')",
        }}
      >
        <hr class="spacer40px"></hr>
        {Object.keys(homeData).length > 0 ? (
          <section class="professional_photos" id="pro">
            <div
              class="professional_photos_left wow fadeInLeft"
              data-wow-duration="1.4s"
            >
              {/* <img src={imagecheck1} alt=""/> */}
              <img
                src={homeData.professional_photos.ProfessionalPhotoShoot.image}
                alt=""
                title=""
              />
            </div>
            <div
              class="professional_photos_right wow fadeInRight"
              data-wow-duration="1.4s"
            >
              <h2>
                {homeData.professional_photos.ProfessionalPhotoShoot.title}
              </h2>
              <h3>
                {homeData.professional_photos.ProfessionalPhotoShoot.sub_title}
              </h3>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html:
                    homeData.professional_photos.ProfessionalPhotoShoot
                      .description,
                }}
              ></div>
              <Link to={APIPath() + "example"} class="websites_btn">
                Learn More
              </Link>
            </div>
          </section>
        ) : (
          ""
        )}
        <hr class="spacer1px"></hr>
        {Object.keys(homeData).length > 0 ? (
          <section class="wow_sellers">
            <div class="wow_sellers_left wow fadeInUp" data-wow-duration="1.6s">
              <h2>{homeData.professional_photos.WOWYourSellers.title}</h2>
              {/* <p>{homeData.professional_photos.WOWYourSellers.description}</p> */}
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      homeData.professional_photos.WOWYourSellers.description,
                  }}
                ></div>
              </div>
            </div>
            <div class="wow_sellers_right">
              <iframe
                src="https://my.matterport.com/show/?m=v5KwPp7TiPH"
                allowfullscreen=""
                width="100%"
                height="500"
                frameborder="0"
              ></iframe>
            </div>
            {/* <div class="wow_sellers_right wow fadeInDown" data-wow-duration="1.6s">
                            <img src={homeData.professional_photos.WOWYourSellers.image} alt="" title="" />
                            
                        </div> */}
          </section>
        ) : (
          ""
        )}
        <hr class="spacer1px"></hr>
      </div>
      <section class="service_provide" id="service">
        <div class="row">
          <div
            class="col-lg-4 col-md-4 p-0 wow fadeInLeft"
            data-wow-duration="1.8s"
          >
            <div class="service_provide_left_panel">
              <h3>Services We Provide</h3>
              <div class="service_provide_left_tab">
                <ul class="nav nav-tabs tabs-left">
                  {Object.keys(homeData).length > 0 ? (
                    <React.Fragment>
                      <li onClick={() => setService("serv1")} class="">
                        <a
                          data-toggle="tab"
                          class={service === "serv1" ? "active" : ""}
                        >
                          {" "}
                          {homeData.Services[0].title}
                        </a>
                      </li>
                      <li onClick={() => setService("serv2")} class="">
                        <a
                          data-toggle="tab"
                          class={service === "serv2" ? "active" : ""}
                        >
                          {" "}
                          {homeData.Services[1].title}
                        </a>
                      </li>
                      <li onClick={() => setService("serv3")} class="">
                        <a
                          data-toggle="tab"
                          class={service === "serv3" ? "active" : ""}
                        >
                          {" "}
                          {homeData.Services[2].title}
                        </a>
                      </li>
                      <li onClick={() => setService("serv4")} class="">
                        <a
                          data-toggle="tab"
                          class={service === "serv4" ? "active" : ""}
                        >
                          {" "}
                          {homeData.Services[3].title}
                        </a>
                      </li>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-lg-8 col-md-8 p-0 wow fadeInRight"
            data-wow-duration="1.8s"
          >
            <div class="tab-content">
              {Object.keys(homeData).length > 0 ? (
                <React.Fragment>
                  <div
                    class={
                      service === "serv1"
                        ? "service_provide_right tab-pane active"
                        : "service_provide_right tab-pane"
                    }
                    id="serv0"
                    style={{
                      backgroundImage:
                        "url(" + homeData.Services[0].imageS + ")",
                    }}
                  >
                    <div class="service_provide_right_ab">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: homeData.Services[0].description,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    class={
                      service === "serv2"
                        ? "service_provide_right tab-pane active"
                        : "service_provide_right tab-pane"
                    }
                    id="serv1"
                    style={{
                      backgroundImage:
                        "url(" + homeData.Services[1].imageS + ")",
                    }}
                  >
                    <div class="service_provide_right_ab">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: homeData.Services[1].description,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    class={
                      service === "serv3"
                        ? "service_provide_right tab-pane active"
                        : "service_provide_right tab-pane"
                    }
                    id="serv2"
                    style={{
                      backgroundImage:
                        "url(" + homeData.Services[2].imageS + ")",
                    }}
                  >
                    <div class="service_provide_right_ab">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: homeData.Services[2].description,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    class={
                      service === "serv4"
                        ? "service_provide_right tab-pane active"
                        : "service_provide_right tab-pane"
                    }
                    id="serv3"
                    style={{
                      backgroundImage:
                        "url(" + homeData.Services[3].imageS + ")",
                    }}
                  >
                    <div class="service_provide_right_ab">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: homeData.Services[3].description,
                        }}
                      ></div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <hr class="spacer1px"></hr>
      <section class="recent_projects">
        <div class="recent_projects_head">
          {Object.keys(homeData).length > 0 ? (
            <h2>{homeData.recent_projects.title}</h2>
          ) : (
            ""
          )}
          {Object.keys(homeData).length > 0 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.recent_projects.description,
              }}
            ></div>
          ) : (
            ""
          )}
        </div>
        <div class="recent_projects_tabs">
          <div class="recent_projects_tabs_head">
            <ul class="nav nav-tabs">
              <li>
                <a href="#Websites" data-toggle="tab" class="flash_btn active">
                  Websites
                </a>
              </li>
              <li>
                <a href="#FlashCard" data-toggle="tab" class="flash_btn">
                  EZ-FlashCard
                </a>
              </li>
            </ul>
          </div>
          <div class="tab_img">
            <div class="tab-content">
              <div class="tab-pane active" id="Websites">
                <div class="row">
                  {Object.keys(tourData).length > 0
                    ? tourData.map((res) => (
                        <div class="col-lg-4 col-md-4 wow">
                          <div class="recent_projects_tabs_img">
                            <img src={res.image} alt="" title="" />
                            <div
                              onClick={() => opanWebsiteLink(res.link)}
                              class="recent_projects_tabs_img_conts"
                            >
                              <div class="recent_projects_tabs_img_conts_inner">
                                <span class="link_icn">
                                  <i class="fas fa-link"></i>
                                </span>
                                <h5>{res.title}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div class="tab-pane" id="FlashCard">
                <div class="row">
                  {Object.keys(homeData).length > 0
                    ? homeData.Ez_FlashCard.map((res) => (
                        <div class="col-lg-4 col-md-4 wow">
                          <div class="recent_projects_tabs_img">
                            <img src={res.design_photo} alt="" title="" />
                            <div
                              onClick={() => setOpenVideoModal(true)}
                              class="recent_projects_tabs_img_conts"
                            >
                              <div class="recent_projects_tabs_img_conts_inner">
                                <span class="link_icn">
                                  <i class="fas fa-link"></i>
                                </span>
                                <h4>{res.design_name}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="photo_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="recent_projects_head pb-40">
                {Object.keys(homeData).length > 0 ? (
                  <h2>{homeData.subscribe_newsletter_right.title}</h2>
                ) : (
                  <Skeleton
                    variant="text"
                    width={550}
                    height={50}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="photo_sec_main">
                <div class="row">
                  {Object.keys(homeData).length > 0 ? (
                    <div
                      class="col-lg-4 col-md-4 wow zoomIn"
                      data-wow-duration="1.0s"
                    >
                      <div class="photo_sec_main_single">
                        <div class="photo_sec_main_single_img">
                          <img src={homeData.photo_sec.OneStopShop.image}></img>
                        </div>
                        <div class="photo_sec_main_single_cont">
                          <h4>{homeData.photo_sec.OneStopShop.title}</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                homeData.photo_sec.OneStopShop.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {Object.keys(homeData).length > 0 ? (
                    <div
                      class="col-lg-4 col-md-4 wow zoomIn"
                      data-wow-duration="1.4s"
                    >
                      <div class="photo_sec_main_single">
                        <div class="photo_sec_main_single_img">
                          <img
                            src={
                              homeData.photo_sec.OurPhotographersAreDifferent
                                .image
                            }
                          ></img>
                        </div>
                        <div class="photo_sec_main_single_cont">
                          <h4>
                            {
                              homeData.photo_sec.OurPhotographersAreDifferent
                                .title
                            }
                          </h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                homeData.photo_sec.OurPhotographersAreDifferent
                                  .description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {Object.keys(homeData).length > 0 ? (
                    <div
                      class="col-lg-4 col-md-4 wow zoomIn"
                      data-wow-duration="1.8s"
                    >
                      <div class="photo_sec_main_single">
                        <div class="photo_sec_main_single_img">
                          <img
                            src={
                              homeData.photo_sec.VIPPhotoProcessingIncluded
                                .image
                            }
                          ></img>
                        </div>
                        <div class="photo_sec_main_single_cont">
                          <h4>
                            {
                              homeData.photo_sec.VIPPhotoProcessingIncluded
                                .title
                            }
                          </h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                homeData.photo_sec.VIPPhotoProcessingIncluded
                                  .description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="recent_projects_head pt-3">
                <Link to={APIPath() + "appointment"} class="need_pic">
                  Schedule Photos<i class="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr class="spacer1px"></hr>
      <section>
        <div class="row">
          <div class="col-lg-6 col-md-12 p-0">
            <div class="our_mission_sec_blue">
              <h3>
                Our mission is to provide the <br></br>highest quality and best
                service!
              </h3>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-12 p-0 our_mission_sec"
            style={{ backgroundImage: "url(" + mission_bg + ")" }}
          >
            <div class="row">
              <div class="col-lg-3 col-md-4">
                <div class="free_consult">
                  <div class="free_consult_main">
                    {Object.keys(homeData).length > 0 ? (
                      <div>
                        <img
                          src={homeData.our_mission_sec_consultation.image}
                          alt=""
                          title=""
                        />
                        <h5>{homeData.our_mission_sec_consultation.title}</h5>
                      </div>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={550}
                        height={50}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-md-8 p-0">
                <img src={mission_bg} class="mobile_on" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="subscribe_newsletter"
        style={{
          backgroundImage:
            "url('https://www.virtualtourcafe.com/alpha/static/media/subscribe-bg.5c04d448.webp')",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="subscribe_newsletter_main">
                <div class="row align-items-center">
                  <div
                    class="col-lg-5 col-md-7 wow fadeInLeft"
                    data-wow-duration="2.0s"
                  >
                    <div class="subscribe_newsletter_left">
                      <div class="subscribe_newsletter_left_img">
                        {Object.keys(homeData).length > 0 ? (
                          <img
                            src={homeData.subscribe_newsletter_left.image}
                            alt=""
                            title=""
                          />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={550}
                            height={50}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}

                        <div class="sub_news">
                          {Object.keys(homeData).length > 0 ? (
                            <h5>{homeData.subscribe_newsletter_left.title}</h5>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={550}
                              height={50}
                              style={{
                                background: "#bbbbbb",
                                margin: "0 auto",
                              }}
                            />
                          )}
                          {Object.keys(homeData).length > 0 ? (
                            <h6>
                              {homeData.subscribe_newsletter_left.sub_title}
                            </h6>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={550}
                              height={50}
                              style={{
                                background: "#bbbbbb",
                                margin: "0 auto",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {Object.keys(homeData).length > 0 ? (
                        // <p>{homeData.subscribe_newsletter_left.description}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              homeData.subscribe_newsletter_left.description,
                          }}
                        ></div>
                      ) : (
                        <Skeleton
                          variant="text"
                          width={550}
                          height={50}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                      <div class="email_input">
                        <input
                          type="text"
                          name="emaildata"
                          onChange={handleInputChange}
                          placeholder="Email Address.. *"
                        />
                        <button type="button" onClick={EmailFunctionality}>
                          SEND
                        </button>
                      </div>
                      <p>We never spam. You can opt-out any time</p>
                      <div class="sub_mobile_no">
                        <div class="sub_mobile_icn">
                          <img src={phone} alt="" title="" />
                        </div>
                        <div class="sub_mobile_text">
                          <p>Give us A call !!!</p>
                          <h5>
                            <a href="tel:(877) 744-8285">(877) 744-8285</a>
                          </h5>
                          <h5>
                            <a href="tel:(925) 609-2408">(925) 609-2408</a>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-lg-7 col-md-5 wow fadeInRight"
                    data-wow-duration="2.0s"
                  >
                    <div class="why_best testim">
                      {Object.keys(homeData).length > 0 ? (
                        <h2>
                          {homeData.testimonial.testimonial_left.sub_title}
                        </h2>
                      ) : (
                        ""
                      )}
                      {Object.keys(homeData).length > 0 ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              homeData.testimonial.testimonial_left.description,
                          }}
                        ></p>
                      ) : (
                        ""
                      )}

                      {Object.keys(homeData).length > 0 ? (
                        <OwlCarousel
                          margin={10}
                          {...options2}
                          class="vtc_testimonial_right owl-carousel"
                          id="testimonial_slide"
                        >
                          {homeData.testimonial.testimonial_right.map((res) => (
                            <div class="vtc_testimonial_right_single">
                              <div class="vtc_testimonial_right_img_sec">
                                <div class="row">
                                  <div class="col-lg-2 col-md-2">
                                    <div class="vtc_testimonial_right_img">
                                      <img src={res.image} alt="" title="" />
                                    </div>
                                  </div>
                                  <div class="col-lg-10 col-md-12">
                                    <div class="vtc_testimonial_right_img_name">
                                      <h5>{res.name}</h5>
                                      <p>{res.position}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="vtc_testimonial_right_single_cont">
                                <p>{res.description}</p>
                              </div>
                            </div>
                          ))}
                        </OwlCarousel>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="our_partners">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="our_partners_head">
                {Object.keys(homeData).length > 0 ? (
                  <h2>{homeData.our_partners.title}</h2>
                ) : (
                  ""
                )}
              </div>
              {Object.keys(homeData).length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: homeData.our_partners.description,
                  }}
                ></div>
              ) : (
                ""
              )}
              {/* <div class="our_partners_contents owl-carousel" id="partner_slide"> */}
              {partnerData.length > 0 ? (
                <OwlCarousel margin={10} {...options1} id="partner_slide">
                  {partnerData.map((res) => (
                    <div class="our_partners_contents_single">
                      <img src={res.imageurl} alt="" title="" />
                    </div>
                  ))}
                </OwlCarousel>
              ) : (
                ""
              )}

              {/* </div> */}
            </div>
          </div>
        </div>
      </section>

      <div class="ftr_get">
        <Footer1></Footer1>
        <Footer />
        <Dialog
          maxWidth={maxWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openVideoModalTwo}
          style={{ marginTop: "5%" }}
        >
          <DialogTitle id="customized-dialog-title">
            <CancelIcon
              onClick={() => setOpenVideoModalTwo(false)}
              style={{ float: "right", cursor: "pointer", color: "black" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <iframe
              width="100%"
              height="440"
              src="https://www.virtualtourcafe.com/alpha/static/media/video3.31d6cfe0.mp4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </DialogContent>
        </Dialog>
        <Dialog
          maxWidth={maxWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openVideoModal}
          style={{ marginTop: "5%" }}
        >
          <DialogTitle id="customized-dialog-title">
            <CancelIcon
              onClick={() => setOpenVideoModal(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <div class="container">
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-md-12">
                    <iframe
                      width="100%"
                      height="440"
                      src="https://www.virtualtourcafe.com/alpha/static/media/video3.31d6cfe0.mp4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <a
        onClick={handleScroll}
        id="return-to-top"
        class="bounce"
        style={{ display: "block", cursor: "pointer" }}
      >
        <i class="fas fa-angle-double-up"></i>
      </a>
      {/* <a href="#" class="back-to-top" style={{ display: "none" }}><i class="fa fa-arrow-up" aria-hidden="true"></i></a> */}
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
