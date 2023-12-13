import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import user_main from "../../../images/user-main.jpg";
import ava_img from "../../../images/ava-img.jpg";
import banner from "../../../images/vtc-banner.jpg";
import photo1 from "../../../images/photo-1.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import tours from "../../../images/tours.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
const APIGetUserData = APIURL() + "user-details";
export default function AgentFirstTour() {
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
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
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    };
    return (
        <div>
            <AgentHeader />
            <section class="vtc_agent_banner" style={{ backgroundImage: "url(" + banner + ")" }}>
                <div class="vtc_top_menu">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="vtc_agent_menu_top">
                                    <ul>
                                        <li>
                                            <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                                        </li>
                                       
                                        <li class="active">
                                            <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                                        </li>
                                        <li>
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
                                       
                                        <li class="active">
                                            <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                                        </li>
                                        <li>
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
                <div class="vtc_btm_menu">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="vtc_btm_menu_sec">
                                    <ul>
                                        <li>Yearly - Unlimited Active Tours</li>
                                        <li>Ala-Carte - Available Credits 1 </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="vtc_agent_profile">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="vtc_agent_profile_main">
                                <div class="row">
                                    <div class="col-lg-9 col-md-12">
                                        <div class="vtc_agent_profile_left">
                                            <div class="vtc_agent_profile_left_img">
                                                <img src={user_main} alt="" title="" />
                                            </div>
                                            <div class="vtc_agent_profile_left_cont">
                                                <h3>Kevin Smith</h3>
                                                <ul class="agent_docs">
                                                    <li><i class="fas fa-phone-alt"></i>123-111-2232</li>
                                                    <li><i class="far fa-envelope"></i>maastest3@gmail.com</li>
                                                    <li><i class="far fa-address-card"></i>MS03212</li>
                                                </ul>
                                                <p>In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo. In the Tours/Advanc.... </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="vtc_agent_profile_right">
                                            <img src={ava_img} alt="" title="" />
                                            <div class="right_prof_cont">
                                                <h5>Company Name</h5>
                                                <h6>032-142-3424</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="getting_started">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="getting_started_main">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4">
                                        <div class="getting_started_single">
                                            <div class="getting_started_single_img">
                                                <i class="far fa-hand-point-up"></i>
                                            </div>
                                            <span class="no_sec">01</span>
                                            <div class="getting_started_single_cont">
                                                <h5>Getting Started</h5>
                                                <h6>Get Some quick Tips</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="getting_started_single bg_blue">
                                            <div class="getting_started_single_img">
                                                <i class="fas fa-map-marked"></i>
                                            </div>
                                            <span class="no_sec">02</span>
                                            <div class="getting_started_single_cont">
                                                <h5>Your First Tour</h5>
                                                <h6>EASY STEPS 1-2-3</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="getting_started_single">
                                            <div class="getting_started_single_img">
                                                <i class="fas fa-cogs"></i>
                                            </div>
                                            <span class="no_sec">03</span>
                                            <div class="getting_started_single_cont">
                                                <h5>Advanced Users</h5>
                                                <h6>MANAGE IMAGESETS</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="property_info toggle_sec" style={{ display: "block" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="our_partners_head">
                                <h2>Property Information</h2>
                            </div>
                            <div class="property_info_cont" id="demo">
                                <section class="snap-scrolling-example">
                                    <div class="horizontal-images tab_main tabscroll-windows">
                                        <ul class="nav nav-tabs list_sec" role="tablist1">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#Images" role="tab1">
                                                    <span><i class="far fa-images"></i></span>
                                                    Select Images
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#Description" role="tab1"><span><i class="fas fa-pen"></i></span>Description</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#"><span><i class="fas fa-globe"></i></span>Features</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#"><span><i class="fas fa-clipboard"></i></span>Amenities</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#"><span><i class="fas fa-dollar-sign"></i></span>Pricing</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#"><span><i class="fas fa-map-marker-alt"></i></span>Location Information</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#"><span><i class="fas fa-file-alt"></i></span>Documents/Forms</a>
                                            </li>

                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <div class="browse_img tab-pane active" id="Images" role="tabpanel">
                                            <div class="browse_img_head">
                                                <h5>Browse Images</h5>
                                            </div>
                                            <div class="browse_img_conts_main">
                                                <div class="browse_img_conts">
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" data-toggle="tab" href="#home" role="tab"><i class="far fa-images"></i>Picture</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#profile" role="tab"><i class="fas fa-photo-video"></i>Videos</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#messages" role="tab"><i class="fas fa-camera-retro"></i>Panoramas</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-content" id="">
                                                    <div class="tab-pane active" id="home" role="tabpanel">
                                                        <h6 class="optimal_pic">Optimal picture size is 1075x768. Images should not be larger than 5mb file size and no smaller than 1075x768 or larger.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                    <div class="tab-pane" id="profile" role="tabpanel">
                                                        <h6 class="optimal_pic">Videos should be .mp4 file format and no larger than 50mb file size. Please be aware of MLS rules when adding videos with agent or broker branding and using MLS links as the videos will be included.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <input type="file" />
                                                                {/* <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small> */}
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                    <div class="tab-pane" id="messages" role="tabpanel">
                                                        <h6 class="optimal_pic">Panoramas should be full 360 degree panoramas and be no larger than 4096 pixels wide.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="browse_img tab-pane" id="Description" role="tabpanel">
                                            <div class="browse_img_head">
                                                <h5>Browse Images</h5>
                                            </div>
                                            <div class="browse_img_conts_main">
                                                <div class="browse_img_conts">
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" data-toggle="tab" href="#home" role="tab"><i class="far fa-images"></i>Picture</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#profile" role="tab"><i class="fas fa-photo-video"></i>Videos</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#messages" role="tab"><i class="fas fa-camera-retro"></i>Panoramas</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-content" id="">
                                                    <div class="tab-pane active" id="home" role="tabpanel">
                                                        <h6 class="optimal_pic">Optimal picture size is 1075x768. Images should not be larger than 5mb file size and no smaller than 1075x768 or larger.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                    <div class="tab-pane" id="profile" role="tabpanel">
                                                        <h6 class="optimal_pic">Videos should be .mp4 file format and no larger than 50mb file size. Please be aware of MLS rules when adding videos with agent or broker branding and using MLS links as the videos will be included.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                    <div class="tab-pane" id="messages" role="tabpanel">
                                                        <h6 class="optimal_pic">Panoramas should be full 360 degree panoramas and be no larger than 4096 pixels wide.<span class="close">X</span></h6>
                                                        <div class="drag_img_box">
                                                            <div class="drag_img_box_cont">
                                                                <i class="fas fa-image"></i>
                                                                <p>Drag you image here, or <strong>Browse</strong></p>
                                                                <small>Support JPG, JPEG2000, PNG </small>
                                                            </div>
                                                        </div>
                                                        <button type="button" class="next_btn">NEXT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="virtual_stagging">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="virtual_stagging_main">
                                <p>NEW!!!  EZ-FlashCard Videos!  SQUARE, SHORT, FAST videos optimized for social media!  Go to the Videos Tab, then select your video and click on EZ-FlashCard to create your EZ-FlashCard "SQUARE" Videos for social media!!!</p>
                                <p style={{ margin: "0 0 10px 0" }}>NEED VIRTUAL STAGING?</p>
                                <p>Turn cold, empty rooms into warm, inviting spaces using virtual staging!  We can also remove old furniture and replace with new!  Virtual Staging Just $32/photo</p>
                                <p>Using Your Own Photos?  Let us process or photo enhance your photos and make them much, much more professional for just $2/each!!</p>
                                <p>Goto <a href="#"> www.RealEZPhotoFix.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="most_view">
                <div class="">
                    <div class="">
                        <div class="">
                            <div class="our_partners_head">
                                <h2>See Who Uses VirtualTourCafe</h2>
                            </div>
                            <div class="recent_projects_tabs">
                                <div class="tab_img">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4">
                                            <div class="recent_projects_tabs_img">
                                                <img src={photo1} alt="" title="" />
                                                <div class="recent_projects_tabs_img_conts">
                                                    <a href="#" target="_blank">
                                                        <div class="recent_projects_tabs_img_conts_inner">
                                                            <span class="link_icn">
                                                                <i class="fas fa-link"></i>
                                                            </span>
                                                            <h4>Tours</h4>
                                                            <h5>test city,Alabama,United States,512600</h5>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4">
                                            <div class="recent_projects_tabs_img">
                                                <img src={photo2} alt="" title="" />
                                                <div class="recent_projects_tabs_img_conts">
                                                    <a href="#" target="_blank">
                                                        <div class="recent_projects_tabs_img_conts_inner">
                                                            <span class="link_icn">
                                                                <i class="fas fa-link"></i>
                                                            </span>
                                                            <h4>Tours</h4>
                                                            <h5>test city,Alabama,United States,512600</h5>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4">
                                            <div class="recent_projects_tabs_img">
                                                <img src={photo3} alt="" title="" />
                                                <div class="recent_projects_tabs_img_conts">
                                                    <a href="#" target="_blank">
                                                        <div class="recent_projects_tabs_img_conts_inner">
                                                            <span class="link_icn">
                                                                <i class="fas fa-link"></i>
                                                            </span>
                                                            <h4>Tours</h4>
                                                            <h5>test city,Alabama,United States,512600</h5>
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
                </div>
            </section>
            <section class="top_ten_tour">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="our_partners_head">
                                <h2>Your Top Ten Tours</h2>
                            </div>
                            <div class="top_ten_tour_img">
                                <img src={tours} alt="" title="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    )
}