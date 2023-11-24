import bannerImage from "../../../images/era-banner.jpg";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CancelIcon from '@material-ui/icons/Cancel';
import { confirmAlert } from 'react-confirm-alert';
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import defaultImage from "../../../images/defaultimage.jpg";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { AuthContext } from "../../../CommonMethods/Authentication";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import defaultbanner from "../../../images/default-banner.jpg";
const APIGetSelectedVideo = APIURL() + "get-Selected-Video";



export default function AgentFlyerTour(props) {
    const tourId = props.match.params.flyertourid;
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const agentId = props.match.params.agentId;
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 9999,
            color: '#fff',
        },
    }));

    const { dispatch } = useContext(AuthContext);
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [sync, setSync] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [video, setvideo] = useState({});
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    // useEffect(() => {
    //     if (context.state.user) {
    //         const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId, id: tourId };
    //         postRecord(APIGetSelectedVideo, objusr)
    //             .then(res => {
    //                 if (res.data[0].response.status === "success") {
    //                     setvideo(res.data[0].response.data.image_set_list[0])
    //                 }
    //             });
    //     }
    // }, [sync, context.state.user, tourId]);
    return (
        <>
            <div id="default" class="themes">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class=" theme-banner">
                                <img src={defaultbanner} class="img-responsive" />
                                <img src=""
                                    class="img-responsive" />
                                <img src=""
                                    class="img-responsive" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <nav class="navbar navbar-default">
                                <div class="container-fluid">
                                    <div class="navbar-header">
                                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                            <span class="sr-only">Toggle navigation</span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                        </button>
                                    </div>
                                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul class="nav navbar-nav tabSeeting">
                                            <li class="dropdown">
                                                <a href="javascript:void(0);" class="dropdown-toggle"
                                                    data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <span class="iconmenu">
                                                        <i class="menuiocn icon-detail"></i></span>Details
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="load_property_info()" data-toggle="modal"
                                                            data-target="#Property-info"> Property Information</a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="load_amenities()" data-toggle="modal" data-target="#amenities">
                                                            Amenities
                                                        </a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a target="_blank"
                                                            href="">
                                                            Printable Flyer</a>
                                                    </li>
                                                </ul>
                                            </li>


                                            <li class="dropdown">
                                                <a href="javascript:void(0);" class="dropdown-toggle"
                                                    data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <span class="iconmenu">
                                                        <i class="menuiocn icon-contect"></i>
                                                    </span> Contact</a>
                                                <ul class="dropdown-menu">
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);" data-toggle="modal"
                                                            data-target="#agent-info"> Agent Info</a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="load_contact_agent()" data-toggle="modal"
                                                            data-target="#agent-contact"> Contact Agent</a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="load_schedule_form()" data-toggle="modal"
                                                            data-target="#schedule-appointment"> Schedule Appointment</a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a
                                                            href=""
                                                            target="_blank"> My Listings
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>


                                            <li class="dropdown">
                                                <a href="javascript:void(0);" class="dropdown-toggle"
                                                    data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <span class="iconmenu">
                                                        <i class="menuiocn icon-support"></i
                                                        ></span>Tools
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="viewMap('mapContent', 'ROADMAP');"> Map View
                                                        </a>
                                                    </li>
                                                    <li style={{ display: "block" }}>
                                                        <a href="javascript:void(0);"
                                                            onclick="viewMap('mapContent', 'SATELLITE');"> Aerial View
                                                        </a>
                                                    </li>
                                                    <li style={{ display: "block" }}><a href="javascript:void(0);" onclick="load_mortage()"
                                                        data-toggle="modal" data-target="#mortageDiv"> Mortgage Calculator</a>
                                                    </li>
                                                    <li style={{ display: "block" }}><a href="javascript:void(0);"
                                                        onclick="load_walk_over()" data-toggle="modal"
                                                        data-target="#walkoverDiv"> Walk Score</a></li>
                                                    <li style={{ display: "block" }}><a href="javascript:void(0);"
                                                        onClick="">
                                                        Area Schools</a></li>
                                                </ul>
                                            </li>


                                            <li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle"
                                                data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <span class="iconmenu"><i class="menuiocn icon-share"></i></span> Share</a>
                                                <ul class="dropdown-menu">

                                                    <li style={{ display: "block" }}><a href="javascript:void(0);"
                                                        onclick="send_to_friend()"> Send to a Friend</a></li>
                                                    <li style={{ display: "block" }}><a href="javascript:void(0);"> Save Tour to Desktop
                                                    </a></li>
                                                    <li style={{ display: "block" }}><a href="javascript:void(0);"
                                                        onclick="service_link()"> Service Links </a> </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12 ">
                            <div class="relative">
                                <div id="contentDiv" class="tour-boxvtimg themevideo-box">

                                    <div class="customloader vt-loder" id="common_loader" style={{ display: "none" }}>
                                        <img style={{ width: "70px !important", height: "72px !important" }}
                                            class="img-responsive center-block one"
                                            src="" />
                                    </div>

                                    <div id="" class="html5-fullscreen-api fsDiv">
                                        <div id="imageEffect" class="slideshow_box">
                                            {Object.keys(video).length > 0 ? (
                                            <iframe width="100%" height="480" src={video.file_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            
                                        ) : (
                                            <Skeleton variant="text" width={500} height={500} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-sm-4 col-xs-12">
                            <div class="sidebar">
                                <div class="sidebar-img">
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <img src="" class="img-responsive" />
                                        </div>
                                        <div class="col-lg-7">
                                            <div class="profile-name"></div>
                                            <div class="profile-info"></div>
                                            <div class="profile-info"></div>
                                            <div class="profile-info"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="left-property">

                                    <div class="sidebarinner">

                                        <div class="property-info">
                                            <label>Mobile</label>
                                        </div>
                                        <div class="property-info">
                                            <label>Office</label>
                                        </div>
                                        <div class="property-info">
                                            <label>Agent Lic#</label>
                                        </div>
                                    </div>
                                    <div class="siderbar-heading">
                                        <h3>Property Info</h3>
                                    </div>
                                    <div class="siderbar-price">
                                        <label>Price </label>
                                        <span class="price">'N/A'</span>
                                    </div>
                                    <div class="sidebarinner">
                                        <div class="property-info">
                                            <label> Bedrooms <span class="pull-right">:</span></label>

                                        </div>
                                        <div class="property-info">
                                            <label> Bathrooms <span class="pull-right">:</span></label>'N/A'
                                        </div>
                                        <div class="property-info">
                                            <label> Lot Size <span class="pull-right">:</span></label> 'N/A'
                                        </div>
                                        <div class="property-info">
                                            <label> Interior Sq. Ft <span class="pull-right">:</span></label> 'N/A'
                                        </div>
                                        <div class="property-discription">
                                            <label> Description</label>
                                            <span id="miniStory" class="more-content">
                                                <a id="readMore" onclick="readmore()" href="javascript:void(0)">Read More...</a>
                                            </span>
                                            <span id="longStory" class="less-content" style={{ display: "none" }}>
                                                <a id="readLess" onclick="lessmore()" href="javascript:void(0)">Read Less...</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-sm-8 col-xs-12">
                            <div class="newsletter-heading">
                                <h3><a href="javascript:void(0);" class="pull-left" data-toggle="modal"
                                    data-target="#news-letter">
                                    <img
                                        src="https://virtualtourcafe.com/images/theme/icon-newsletter.png" /> Newsletter </a></h3>
                                <h3><a href="javascript:void(0);" class="pull-left" onclick="loadAnnouncement()"><img
                                    src="https://virtualtourcafe.com/images/theme/announsment.png" /> Open House
                                    Announcement</a></h3>
                                <ul class="list-inline pull-right">
                                    <li> <a href="javascript:void(0);">
                                        <img
                                            src="https://virtualtourcafe.com/images/theme/twitter.png" />
                                    </a> </li>
                                    <li> <a href="javascript:void(0);">
                                        <img
                                            src="https://virtualtourcafe.com/images/theme/facebook.png" />
                                    </a> </li>
                                </ul>
                            </div>
                            <div class="theme-footer">
                                <img src="https://virtualtourcafe.com/images/footer-logo.png" />
                                <span class="pull-right">Copyrights Reserved

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="Property-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                </div>
                <div class="modal fade" id="announcement" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div id="scheduleLoader"></div>
                </div>
                <div class="modal fade" id="agent-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-lg modal-selector" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div class="popup-head">
                                    <h4 class="modal-title" id="myModalLabel"> Agent Info</h4>
                                </div>
                            </div>
                            <div class="modal-body ">
                                <div class="popup-inner">
                                    <div class="box-wrap">
                                        <h4>Personal Information</h4>
                                        <div class="row m-b-30">
                                            <div class="col-sm-4 col-lg-3">
                                                <img src="" class="img-responsive" />
                                            </div>
                                            <div class="col-sm-8 col-lg-9">
                                                <div class="m-b-20">
                                                    <p> </p>

                                                </div>
                                                <p> <strong>Mobile-:</strong> </p>

                                                <p> <strong> Email-:</strong> </p>

                                                <p> <strong>Office-:</strong> </p>

                                                <p> <strong> Website-:</strong> </p>
                                            </div>
                                        </div>
                                        <div class="row m-b-30">
                                            <div class="col-sm-12">
                                                <h4>Profile</h4>
                                                <p>"N/A"</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <h4> Credentials</h4>

                                                <p> "N/A" </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="news-letter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-lg modal-selector" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div class="popup-head">
                                    <h4 class="modal-title" id="myModalLabel"> Newsletter </h4>
                                </div>
                            </div>
                            <div class="modal-body ">
                                <div class="popup-inner">
                                    <div class="box-wrap">
                                        <h4>Newsletter</h4>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="agent-contact" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="popupLoader"></div>
                </div>
                <div class="modal fade" id="schedule-appointment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="scheduleLoader"></div>
                </div>
                <div class="modal fade" id="load_map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="mapLoader"></div>
                </div>
                <div class="modal fade" id="amenities" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="mapLoader"></div>
                </div>
                <div class="modal fade" id="mortageDiv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="mortageLoader"></div>
                </div>
                <div class="modal fade" id="leadcapture" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="leadLoader"></div>
                </div>
                <div id="service-links" class="modal fade bs-example-modal-lg19" tabindex="-1" role="dialog"
                    aria-labelledby="myLargeModalLabel01" data-keyboard="false" data-backdrop="static">
                    <div id="serviceLinksLoader"></div>
                    <div id="serviceLinks"></div>
                </div>
                <div id="send-tofriend" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
                    aria-labelledby="myLargeModalLabel01">
                    <div id="friendDiv"></div>
                </div>
                <div class="modal fade" id="walkoverDiv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    data-keyboard="false" data-backdrop="static">
                    <div id="walkoverLoader"></div>
                    <div class="modal-dialog  modal-selector" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div class="popup-head">
                                    <h4 class="modal-title" id="myModalLabel"> Walk Score </h4>
                                </div>
                            </div>
                            <div class="modal-body" id="modalContent" style={{ display: "none" }}>
                                <div id="walkoverLoader"></div>
                                <div id="walkOverContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" name="hiddenCheck" id="hiddenCheck" value="0" />
            <input type="hidden" name="isTourRun" id="isTourRun" value="0" />
            <div class="container">
            </div>
            <input type="hidden" name="iframeHtml" id="iframeHtml" value="">
            </input>
        </>
    )
}