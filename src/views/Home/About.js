import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Logo from "../../images/vtc-logo.png";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import user from "../../images/user.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from '@material-ui/lab/Skeleton';
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import subImage from "../../images/subimage.jpg";
import video_bg from "../../images/video_bg.jpg";
import icon1 from "../../images/icon1.png";
import icon2 from "../../images/icon2.png";
import icon3 from "../../images/icon3.png";
import RectangleImage from "../../images/rectangle-dots.png"
import ImageCircle from"../../images/circle-dots.png";
import ProcessCircle from "../../images/process-circle2.png";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAboutData = APIURL() + "aboutcontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetCompanyLogoList = APIURL() + "company-logoList";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
const APIHomeData = APIURL() + "homecontent";
const APIPartnerData = APIURL() + "company-logoList";
const options1 = {
    lazyLoad: true,
    loop: true,
    center: true,
    margin: 20,
    responsiveClass: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: false,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    smartSpeed: 1000,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 2
        },

        1024: {
            items: 4
        },

        1366: {
            items: 7
        }
    }
};

export default function About() {
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [data, setData] = useState({});
    const [aboutData, setAboutData] = useState({});
    const [logoData, setLogoData] = useState({});
    const [teamList, setTeamLIst] = useState([]);
    const [currentBroker, setCurrentBroker] = useState({});
    const [homeData, setHomeData] = useState({});
    const [partnerData, setPartnerData] = useState([]);
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
        postRecord(APIGetAboutData, obj)
            .then(res => {
                //console.log(res);
                if (res.data[0].response.status === "success") {
                    setAboutData(res.data[0].response.data);
                    setTeamLIst(res.data[0].response.data.teamlist);
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
    useEffect(() => {
        window.scroll(0, 0);
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIGetCompanyLogoList, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setLogoData(res.data[0].response.dataDetails);

                }
            });

    }, []);
    useEffect(() => {
        if (context.state.user) {
            const objusr = { authenticate_key: "abcd123XYZ", broker_id: JSON.parse(context.state.user).user_id };
            postRecord(APIGetBrokerDetails, objusr)
                .then(res => {
                    setCurrentBroker(res.data[0].response.data.broker_profile);
                })


        }
    }, [context.state.user])
    useEffect(() => {
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIHomeData, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setHomeData(res.data[0].response.data);
                }
            });
    }, []);
    useEffect(() => {
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIPartnerData, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setPartnerData(res.data[0].response.dataDetails.dataProvider);
                }
            });
    }, []);
    const handleScroll = () => {
        window.scrollTo(0, 0);
    };
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    };
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
    const metaCtx = MetaInfo();
    const [metaData, setMetaData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        const objusr = {
          authenticate_key: "abcd123XYZ",
          pageId: 7,
        };
        const res = await postRecord(APIURL() + "get-metadata", objusr);
  
        setMetaData(res.data);
      };
      fetchData();
    }, []);
    useEffect(() => {
      metaCtx.setPageTitle(metaData.page);
      metaCtx.setMetaDesc(metaData.metaDesc);
      metaCtx.setMetaKw(metaData.metaKeyWords);
      metaCtx.setMetaTitle(metaData.metaTitle);
      metaCtx.setOgtitle(metaData.ogDesc);
      metaCtx.setOgSiteName(metaData.ogSiteName);
      metaCtx.setTwitterCard(metaData.twitterCard);
      metaCtx.setTwitterSite(metaData.twitterSite);
      metaCtx.setTwitterTitle(metaData.twitterTitle);
      metaCtx.setTwitterDesc(metaData.twitterDesc);
    }, [metaData]);
    return (
        <div>
        <Title title="About"/>
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
                    {Object.keys(aboutData).length > 0 ? (
                        <img src={aboutData.banner_section.banner_img} alt="" title="" />

                    ) : (
                        <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                    )}
                    <div class="inner_banner_cont">
                        <div class="inner_banner_cont_sec">
                            <h2>{Object.keys(aboutData).length > 0 ? (
                                aboutData.banner_section.title
                            ) : (
                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}</h2>
                            <h5>{Object.keys(aboutData).length > 0 ? (
                                aboutData.banner_section.banner_underneath_title
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
                                                <Link to={APIPath() + "about-us"}>About Us</Link>
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
                                                <li><a href="mailto:support@VirtualTourCafe.com"><i class="far fa-envelope"></i>
                                                    {Object.keys(data).length > 0 ? (
                                                        data.site_email
                                                    ) : (
                                                        <Skeleton variant="text" width={150} height={30} style={{ background: "#bbbbbb" }} />
                                                    )}
                                                </a></li>
                                                <li><a href="tel:(877) 744-8285 or (925) 609-2408"><i class="fas fa-phone-alt"></i>
                                                    {Object.keys(data).length > 0 ? (
                                                        data.phone_number
                                                    ) : (
                                                        <Skeleton variant="text" width={150} height={30} style={{ background: "#bbbbbb" }} />
                                                    )}
                                                </a></li>
                                            </ul>
                                        </div>
                                        <div class="head_cont_right">
                                            {(context.state.isAuthenticated) && (JSON.parse(context.state.user).role == "broker") ? (
                                                <ul>
                                                    {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                                                    <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                                                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown" aria-expanded="false">
                                                            <div class="user_img">
                                                           <img src={user} alt="profile" />
                                                            </div>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top" aria-labelledby="profileDropdown" style={{ zIndex: "99" }}>
                                                            <div class="profile-header d-flex align-items-center">
                                                                <div class="thumb-area">
                                                                <img src={user} alt="profile" />
                                                                </div>
                                                                <div class="content-text">
                                                                    <h6>{currentBroker.name}</h6>
                                                                </div>
                                                            </div>
                                                            <Link to={APIPath() + "broker-dashboard"} class="dropdown-item"><i class="fas fa-user profile-icon"></i>Dashboard</Link>
                                                            <a href={APIPath() + "broker-setting"} class="dropdown-item"><i class="fas fa-cog profile-icon"></i>Settings</a>
                                                            <Link to={APIPath() + "broker-reports"} class="dropdown-item"><i class="fas fa-info-circle profile-icon"></i>Support</Link>
                                                            <Link onClick={handleLogout} to={APIPath()} class="dropdown-item"><i class="fas fa-sign-out-alt profile-icon"></i>Sign Out</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : ((context.state.isAuthenticated) && (JSON.parse(context.state.user).role == "agent") ? (
                                                <ul>
                                                    {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
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
                                                            <a href={APIPath() + "agent-setting"} class="dropdown-item"><i class="fas fa-cog profile-icon"></i>Settings</a>
                                                            <Link to={APIPath() + "agent-support"} class="dropdown-item"><i class="fas fa-info-circle profile-icon"></i>Support</Link>
                                                            <Link onClick={handleLogout} to={APIPath()} class="dropdown-item"><i class="fas fa-sign-out-alt profile-icon"></i>Sign Out</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) :
                                                (<ul>
                                                    <li><Link to={APIPath() + "appointment"} class="login_btn"><i class="fal fa-book"></i>Schedule Your Appointment</Link></li>
                                                    <li><Link to={APIPath() + "login"} class="login_btn"><i class="far fa-lock-alt"></i>Login</Link></li>
                                                    <li><Link to={APIPath() + "agent"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li>
                                                </ul>)
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
                                                        <li class="active">
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
            </section >
            <section class="personal_history">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="personal_history_main">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="personal_history_left">
                                            <h2>
                                                {Object.keys(aboutData).length > 0 ? (
                                                    aboutData.personalhistory.title
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </h2>
                                            {Object.keys(aboutData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            aboutData.personalhistory.desc
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="personal_history_right">
                                            {Object.keys(aboutData).length > 0 ? (
                                                <img src={aboutData.personalhistory.image} alt="" title="" />
                                            ) : (
                                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                            {/* <img src={HistoryImage} alt="" title="" /> */}
                                            <span class="year_exp " id="viewportPendulum">
                                                {/* <h6>24</h6> Years Experience */}
                                                {Object.keys(aboutData).length > 0 ? (
                                                    <div
                                                        // eslint-disable-next-line react/no-danger
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                aboutData.personalhistory.year_exp
                                                        }}
                                                    >
                                                    </div>
                                                ) : (
                                                    <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="shape collaborate-right" src={ProcessCircle} alt="" />
            </section>
            <div class="about-area mb-5 mt-5">
                <div class="container-fluid pl-0 pr-0">
                    <div class="about-inner-area">
                        <div class="row">
                            <div class="col-lg-6 col-md-12">
                                <div class="about-inner-image" style={{backgroundImage:"url(" + subImage + ")"}} >&nbsp;</div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="about-inner-content">
                                    <div class="">
                                        <h2>
                                            {Object.keys(aboutData).length > 0 ? (
                                                aboutData.time_spend_sec_right.title
                                            ) : (
                                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </h2>
                                        <p>{Object.keys(aboutData).length > 0 ? (
                                            aboutData.time_spend_sec_right.desc
                                        ) : (
                                            <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                        )}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about-area-middle" style={{backgroundImage:"url("+video_bg+")"}}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <h2>{Object.keys(aboutData).length > 0 ? (
                                aboutData.time_spend_sec_left.title
                            ) : (
                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}</h2>
                            <p> {Object.keys(aboutData).length > 0 ? (
                                aboutData.time_spend_sec_left.desc
                            ) : (
                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section class="features-section rel z-1 pt-80 pb-40 bg-blue text-white">
                <div class="container">
                    <div class="row justify-content-center">

                        <div class="col-lg-12">
                            <div class="row align-items-center">
                                <div class="col-lg-6">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="feature-item">
                                                <div class="image">
                                                    <img src={icon1} alt="Icon" />
                                                </div>
                                                <div class="">
                                                    <h4>{Object.keys(aboutData).length > 0 ? (
                                                        aboutData.our_mission.title
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}</h4>
                                                    <p>{Object.keys(aboutData).length > 0 ? (
                                                        <div style={{ textAlign: "justify" }}
                                                            // eslint-disable-next-line react/no-danger
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    aboutData.our_mission.desc
                                                            }}
                                                        >
                                                        </div>
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={500} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="feature-item">
                                                <div class="image">
                                                    <img src={icon2} alt="Icon" />
                                                </div>
                                                <div class="">
                                                    <h4>{Object.keys(aboutData).length > 0 ? (
                                                        aboutData.our_vision.title
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}</h4>
                                                    <p>{Object.keys(aboutData).length > 0 ? (
                                                        <div style={{ textAlign: "justify" }}
                                                            // eslint-disable-next-line react/no-danger
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    aboutData.our_vision.desc
                                                            }}
                                                        >
                                                        </div>
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={500} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="feature-item">
                                                <div class="image">
                                                    <img src={icon3} alt="Icon" />
                                                </div>
                                                <div class="">
                                                    <h4>{Object.keys(aboutData).length > 0 ? (
                                                        aboutData.VirtualTourCafe_liftsoff.title
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}
                                                    </h4>
                                                    <p>{Object.keys(aboutData).length > 0 ? (
                                                        <div style={{ textAlign: "justify" }}
                                                            // eslint-disable-next-line react/no-danger
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    aboutData.VirtualTourCafe_liftsoff.desc
                                                            }}
                                                        >
                                                        </div>
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={500} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <img class="rectangle-dots" src={RectangleImage} alt="Shape" />
                <img class="circle-dots" src={ImageCircle} alt="Shape" />
            </section>
            <section class="team-setion-two bg-lighter ">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="recent_projects_head pb-4">
                                <h2>Meet Our Team</h2>
                                <p>In addition to myself and my much, much better-half and co-founder, Hannele Rinta-Tuuri, we
                                    have built a team of caring people from around the world who share the same values and
                                    vision as we do for our customers. We feel truly blessed to be able to help families both
                                    here in the United States as well as other countries put food on the table and provide for
                                    their families! Thank you for helping us make our dream come true!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        {teamList.length > 0 ? (teamList.map(res => (
                            <div class="col-lg-4 col-md-4 col-sm-6">
                                <div class="team-member-two wow fadeInUp delay-0-2s animated"
                                    style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <div class="image">
                                        <img src={res.image_url} alt="Team Member" />
                                        <div class="social-style-two">
                                            <a href={res.facebook_url}><i class="fab fa-facebook-f"></i></a>
                                            <a href={res.twitter_url}><i class="fab fa-twitter"></i></a>
                                            <a href={res.instagram_url}><i class="fab fa-instagram"></i></a>
                                            <a href="#"><i class="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                    <div class="member-description">
                                        <h4>{res.name}</h4>
                                        <span>{res.designation}</span>
                                    </div>
                                </div>
                            </div>
                        ))) : ("")}


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
                                        __html:
                                            homeData.our_partners.description
                                    }}
                                >
                                </div>
                            ) : (
                                ""
                            )}
                            <div class="section-padding whouse-logo">
                                <OwlCarousel margin={10} {...options1} class="screenshot_slider owl-carousel">
                                    {partnerData.map(res => (
                                        <div class="item">
                                            <img src={res.imageurl} alt="" title="" />
                                        </div>
                                    ))}

                                </OwlCarousel>
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
        </div >
    );
};