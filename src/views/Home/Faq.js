import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import user from "../../images/user.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from '@material-ui/lab/Skeleton';
import { APIPath, APIURL } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetFaqData = APIURL() + "faqCatagoryWise";
const APIGetUserData = APIURL() + "user-details";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";

export default function Faq() {
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const [data, setData] = useState({});
    const [faqData, setFaqData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [currentBroker, setCurrentBroker] = useState({});
    const [appointment, setAppointment] = useState([]);
    const [dayShoot, setDayShoot] = useState([]);
    const [scheduling, setScheduling] = useState([]);

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
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIGetFaqData, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setFaqData(res.data[0].response.data);
                    setAppointment(res.data[0].response.data[0].data);
                    setDayShoot(res.data[0].response.data[1].data);
                    setScheduling(res.data[0].response.data[2].data)
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
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    };
    const handleScroll = () => {
        window.scrollTo(0, 0);
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
          pageId: 10,
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
        metaCtx.setOgtitle(metaData.ogTitle);
        metaCtx.setOgDesc(metaData.ogDesc);
        metaCtx.setOgSiteName(metaData.ogSiteName);
        metaCtx.setTwitterCard(metaData.twitterCard);
        metaCtx.setTwitterSite(metaData.twitterSite);
        metaCtx.setTwitterTitle(metaData.twitterTitle);
        metaCtx.setTwitterDesc(metaData.twitterDesc);
    }, [metaData]);
    return (
        <React.Fragment>
        <Title title="FAQ"/>
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
                    <img src={banner} alt="" title="" />
                    <div class="inner_banner_cont">
                        <div class="inner_banner_cont_sec">
                            <h2>FAQ</h2>
                        </div>
                    </div>
                    <div class="inner_page_breadcumb">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="inner_page_breadcumb_main">
                                        <ul>
                                            <li>
                                                <Link to={APIPath()}>Home</Link>
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
                                                    <img src={Logo} alt="" title="" />
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
                                                        <li class="active">
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
            <section class="faqpage">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-4">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#pag1" role="tab"
                                    aria-controls="home">{faqData.length > 0 ? (faqData[0].title) : ("")}</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#pag2" role="tab"
                                    aria-controls="profile">{faqData.length > 0 ? (faqData[1].title) : ("")}</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#pag3" role="tab"
                                    aria-controls="messages">{faqData.length > 0 ? (faqData[2].title) : ("")}</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-9 col-md-8">
                            <div class="tab-content">
                                <div class="tab-pane active" id="pag1" role="tabpanel">
                                    <div id="accordion" class="myaccordion">
                                        {appointment.length > 0 ? (appointment.map((res, index) => (
                                            <div class="card">
                                                <div class="card-header" id={"headingOne" + index}>
                                                    <button
                                                        class="d-flex align-items-center justify-content-between btn btn-link collapsed"
                                                        data-toggle="collapse" data-target={"#collapseOne" + index} aria-expanded="false"
                                                        aria-controls={"collapseOne" + index}>{res.question}
                                                        <span class="fa-stack fa-sm"><i class="far fa-angle-down"></i></span>
                                                    </button>
                                                </div>
                                                <div id={"collapseOne" + index} class="collapse" aria-labelledby="headingOne"
                                                    data-parent="#accordion">
                                                    <div class="card-body"

                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                res.answer
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>))) : ("")}
                                    </div>
                                </div>
                                <div class="tab-pane" id="pag2" role="tabpanel">
                                    <div id="accordion2" class="myaccordion">
                                        {dayShoot.length > 0 ? (dayShoot.map((res, index) => (<div class="card">
                                            <div class="card-header" id={"tab2headingOne" + index}>
                                                <button
                                                    class="d-flex align-items-center justify-content-between btn btn-link collapsed"
                                                    data-toggle="collapse" data-target={"#tab2collapseOne" + index} aria-expanded="false"
                                                    aria-controls="collapseOne">{res.question}
                                                    <span class="fa-stack fa-sm"><i class="far fa-angle-down"></i></span>
                                                </button>
                                            </div>
                                            <div id={"tab2collapseOne" + index} class="collapse" aria-labelledby={"tab2headingOne" + index}
                                                data-parent="#accordion2">
                                                <div class="card-body"

                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            res.answer
                                                    }}
                                                >
                                                </div>
                                            </div>
                                        </div>))) : ("")}


                                    </div>
                                </div>
                                <div class="tab-pane" id="pag3" role="tabpanel">
                                    <div id="accordion3" class="myaccordion">
                                        {scheduling.length > 0 ? (scheduling.map((res, index) => (
                                            <div class="card">
                                                <div class="card-header" id={"tab3headingOne" + index}>
                                                    <button
                                                        class="d-flex align-items-center justify-content-between btn btn-link collapsed"
                                                        data-toggle="collapse" data-target={"#tab3collapseOne" + index} aria-expanded="false"
                                                        aria-controls="collapseOne">{res.question}
                                                        <span class="fa-stack fa-sm"><i class="far fa-angle-down"></i></span>
                                                    </button>
                                                </div>
                                                <div id={"tab3collapseOne" + index} class="collapse" aria-labelledby={"tab3headingOne" + index}
                                                    data-parent="#accordion3">
                                                    <div class="card-body"

                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                res.answer
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : ("")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <a onClick={handleScroll} id="return-to-top" class="bounce" style={{ display: "block", cursor: "pointer" }}><i class="fas fa-angle-double-up"></i></a>
            <div class="ftr_get">
                <Footer1></Footer1>
                <Footer />
            </div>
        </React.Fragment>
    )
}