import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import user from "../../images/user.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from '@material-ui/lab/Skeleton';
import ownpic from "../../images/own-pic-1.jpg";
import saveImg from "../../images/save-img-1.jpg";
import playIcon from "../../images/play-icn.png";
import killPic1 from "../../images/kili-pack1.jpg";
import killPic2 from "../../images/kili-pack2.jpg";
import killPic3 from "../../images/kili-pack3.jpg";
import killPic4 from "../../images/kili-pack4.jpg";
import subimg from "../../images/sub-img.jpg";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAgentData = APIURL() + "agentcontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetCompanyLogoList = APIURL() + "company-logoList";
export default function PhotosAgent() {
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [data, setData] = useState({});
    const [logoData, setLogoData] = useState({});
    const [agentData, setAgentData] = useState({});
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [sync, setSync] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
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
        postRecord(APIGetAgentData, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setAgentData(res.data[0].response.data);
                    setSiteTitle(res.data[0].response.data.clientlogo.title);
                    setSiteDescription(res.data[0].response.data.clientlogo.sub_title);

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
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    };
    return (
        <>
            <section class="home_page">
                <div class="mobile_on mobile_slide">
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
                <hr class="spacer1px"></hr>
                <div class="home_page_banner inner_banner">
                    {Object.keys(agentData).length > 0 ? (
                        <img src={agentData.banner_section.image} alt="" title="" />
                    ) : (
                        <img src={banner} alt="" title="" />
                    )}
                    <div class="inner_banner_cont">
                        <div class="inner_banner_cont_sec">
                            <h2>{Object.keys(agentData).length > 0 ? (
                                agentData.banner_section.title
                            ) : (
                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                            )}</h2>
                            <h5>{Object.keys(agentData).length > 0 ? (
                                agentData.banner_section.sub_title
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
                                                <a href="#">Photos Agents</a>
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
                                                        <li >
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
                                                            <Link to={APIPath() + "faq"}>Faq</Link>
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
            <section class="own_pics_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="own_pics_sec_main">
                                <div class="row">
                                    <div class="col-lg-8 col-md-8">
                                        <div class="own_pics_sec_left">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="own_pics_sec_left_top">
                                                        <h5>Have Your Own Photos?</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="own_pics_sec_left_bottom">
                                                        <div class="own_pics_sec_left_bottom_img">
                                                            <img src={ownpic} />
                                                        </div>
                                                        <div class="own_pics_sec_left_bottom_cont">
                                                            <h6>All Photo Packages Include:</h6>
                                                            <div class="features_sec_left">
                                                                <ul>
                                                                    <li>Premium Property Websites</li>
                                                                    <li>Social Media Video</li>
                                                                    <li>Print Friendly Flyer PDF</li>
                                                                    <li>Branded and Unbranded (MLS) Links</li>
                                                                    <li>EZ-FlashCard Videos (unlimited plans)</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="own_pics_sec_left_bottom">
                                                        <div class="own_pics_sec_left_bottom_img">
                                                            <img src={ownpic} />
                                                        </div>
                                                        <div class="own_pics_sec_left_bottom_cont">
                                                            <h6>Need Photo Enhancement?</h6>
                                                            <p>For just $2/photo we will enhance your photos to look like a professional took them! Our proprietary 15-step process will correct the color, whitebalance, brightness, straighten the photo and even change cloudy skies to blue! All in 24hrs!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="own_pics_sec_right">
                                            <h4>Pick a Plan and WOW Your SELLERS! No Contracts, No Setup Fees, Anytime</h4>
                                            <p>Use your photos or your photographers photos to create a virtual tour, flyer and video in just a few simple steps. Choose a plan that meets your needs, from a single-use Pay-As-You-Go subscription to an unlimited monthly or annual subscription to save money if you are doing at least 8- 10 listings a year. Included with our unlimited plans is our EZ-FlashCard Videos designed for social networking sites and email marketing! They are fast, square, short videos optimized for social media sites!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="save_money_sec">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="save_money_sec_main">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 p-0">
                                    <div class="save_money_sec_left">
                                        <h4>Create a Virtual Tour/Property Website, Flyer and Video… Easy as 1-2-3!</h4>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 p-0">
                                    <div class="save_money_sec_right">
                                        <img src={saveImg} alt="" title="" />
                                        <div class="save_money_sec_right_play">
                                            <a href="#">
                                                <img src={playIcon} alt="" title="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="subscription_pricequote mt-0 pb-0 photo_agent_sub">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <div class="subscribe-whitebox">
                                <div class="subscribe-whitebox-top"><h2>Platinum Unlimited Subscription<br />($39.99/Mo)</h2> </div>
                                <div class="subscribe-whitebox-btm text-center">
                                    <ul>
                                        <li>Unlimited Virtual Tours</li>
                                        <li>Unlimited Print Friendly Flyers</li>
                                        <li>Unlimited Video Tours</li>
                                        <li>Responsive Property Website</li>
                                        <li>Advanced Lead Generation</li>
                                        <li>Advanced SEO</li>
                                        <li>Social Media Integration</li>
                                        <li><strong>10% Off RealEZPhotoFix</strong></li>
                                    </ul>
                                    <span class="d-inline-block">
                                        <a href="#" data-toggle="modal" data-target="#Monthly_Sub" class="have_pics">Click To Subscribe<i class="fas fa-arrow-right"></i></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="subscribe-whitebox">
                                <div class="subscribe-whitebox-top"><h2>Platinum Unlimited Subscription<br />($399.00/Mo)</h2> </div>
                                <div class="subscribe-whitebox-btm text-center">
                                    <ul>
                                        <li>Unlimited Virtual Tours</li>
                                        <li>Unlimited Print Friendly Flyers</li>
                                        <li>Unlimited Video Tours</li>
                                        <li>Responsive Property Website</li>
                                        <li>Advanced Lead Generation</li>
                                        <li>Advanced SEO</li>
                                        <li>Social Media Integration</li>
                                        <li><strong>10% Off RealEZPhotoFix</strong></li>
                                        <i>Annual Subscription saves you $79.98 or 17%</i>
                                    </ul>
                                    <span class="d-inline-block">
                                        <a href="#" class="have_pics">Click To Subscribe<i class="fas fa-arrow-right"></i></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="subscribe-whitebox">
                                <div class="subscribe-whitebox-top"><h2>Pay-As-You-Go<br />($49.00/Each)</h2> </div>
                                <div class="subscribe-whitebox-btm text-center">
                                    <ul>
                                        <li>One-time use virtual tour</li>
                                        <li>Use on one-property</li>
                                        <li>Hosted for one-year</li>
                                        <li>Includes Printer Friendly flyer</li>
                                        <li>Includes YouTube video tour</li>
                                        <li>Responsive Property Website</li>
                                    </ul>
                                    <span class="d-inline-block">
                                        <a href="#" class="have_pics">Click To Subscribe<i class="fas fa-arrow-right"></i></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="money_back" style={{ backgroundImage: "url(" + subimg + ")" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 text-center">
                            <div class="subscription_sec_cont">
                                <h4>30 Day Money-Back Guarantee!<br />Or</h4>
                                <a href="#" class="need_pic">TRY IT FREE<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr class="spacer1px"></hr>
            <section class="amazing_features">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="amazing_features_main">
                                <div class="amazing_features_head">
                                    <h2>I Need Photos</h2>
                                </div>
                                <p class="partner_para">Currently serving the greater San Francisco Bay Area, South Bay, Peninsula,North Bay to Santa Rosa, East Bay to Tracy, Stockton, San Joaquin Valley and Sacramento areas.</p>
                                <div class="good-kili-sec-card">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
                                            <div class="zanzi_bch_hldys_box">
                                                <a href="#">
                                                    <div class="zanzi_bch_hldys_box_fig">
                                                        <img src={killPic1} alt="" title="" />
                                                    </div>
                                                </a>
                                                <div class="zanzi_bch_hldys_box_info">
                                                    <h3>Photography & Videos</h3>
                                                    <p>Our photographers use only the highest quality professional cameras and lenses to create stunning images for your listing to help you sell fast!</p>
                                                    <a href="#">Learn More</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
                                            <div class="zanzi_bch_hldys_box">
                                                <div class="zanzi_bch_hldys_box_info">
                                                    <h3>Matterport 3D WalkThrough Tours Sell Houses Faster!</h3>
                                                    <p>Stand out from other agents and become the Marketing Expert in your area by showcasing your listings with a 3D WalkThrough Home Tour!</p>
                                                    <a href="#">Learn More</a>
                                                </div>
                                                <a href="#">
                                                    <div class="zanzi_bch_hldys_box_fig">
                                                        <img src={killPic2} alt="" title="" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
                                            <div class="zanzi_bch_hldys_box">
                                                <a href="#">
                                                    <div class="zanzi_bch_hldys_box_fig">
                                                        <img src={killPic3} alt="" title="" />
                                                    </div>
                                                </a>
                                                <div class="zanzi_bch_hldys_box_info">
                                                    <h3>Aerial Drone Photos & Video</h3>
                                                    <p>Aerial drone photos provide an elevated view of the home and property not available from the ground. Take it to an even higher level with aerial video to truly showcase the property and views from all angles!</p>
                                                    <a href="#">Learn More</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
                                            <div class="zanzi_bch_hldys_box">
                                                <div class="zanzi_bch_hldys_box_info">
                                                    <h3>Virtual Staging</h3>
                                                    <p>Studies have shown that a staged house sells faster and for a higher price! Virtual staging is a low-cost, fast and easy way to turn an empty cold room into a warm inviting home!</p>
                                                    <a href="#">Learn More</a>
                                                </div>
                                                <a href="#">
                                                    <div class="zanzi_bch_hldys_box_fig">
                                                        <img src={killPic4} alt="" title="" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="shedule_pic_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="amazing_features_main">
                                <div class="amazing_features_head">
                                    <h2>Shedule Photo Shoot</h2>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 mx-auto">
                                        <div class="associations_qoute_right shdule_pic_shoot">
                                            <div class="associations_qoute_right_single">
                                                <input type="text" name="" placeholder="Full Name" />
                                                <i class="fa fa fa-user"></i>
                                            </div>
                                            <div class="associations_qoute_right_single">
                                                <input type="text" name="" placeholder="Email" />
                                                <i class="fa fa fa-envelope"></i>
                                            </div>
                                            <div class="associations_qoute_right_single">
                                                <input type="text" name="" placeholder="Phone No" />
                                                <i class="fa fa fa-phone"></i>
                                            </div>
                                            <div class="contact_sec_right_single">
                                                <button type="submit" class="send_btn">Create An Accountant</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="ftr_get">
                <Footer1></Footer1>
                <Footer />
                <div class="agent_pop" style={{ zIndex: "50000" }}>
                    <div id="Monthly_Sub" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <form
                                onSubmit={event => {
                                    event.preventDefault();
                                    // saveSendFlyerData();
                                }}>
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Agent SignUp</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4">
                                                        <label>First Name:</label>
                                                    </div>
                                                    <div class="col-lg-8 col-md-8">
                                                        <input type="text" class="form-control"/>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4">
                                                        <label>First Name:</label>
                                                    </div>
                                                    <div class="col-lg-8 col-md-8">
                                                        <input type="text" class="form-control"/>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4">
                                                        <label>First Name:</label>
                                                    </div>
                                                    <div class="col-lg-8 col-md-8">
                                                        <input type="text" class="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                            <div class="row">
                                                    <div class="col-lg-4 col-md-4">
                                                        <label>Last Name:</label>
                                                    </div>
                                                    <div class="col-lg-8 col-md-8">
                                                        <input type="text" class="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-default" data-dismiss="">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}