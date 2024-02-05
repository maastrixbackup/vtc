import React, { useEffect, useState } from "react";
// import logo from "../../images/bid-logo-new.png";
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import Logo from "../../images/vtc-logo2.png";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
const APIGetSiteSetting = APIURL() + "sitesetting";
export default function AgentFooter(props) {
    const [data, setData] = useState({});
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
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();
    return (
        <div class="footer_sec">
            <footer>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="ftr_main">
                                <div class="ftr_main_logo">
                                    <img src={Logo} alt="" title="" />
                                </div>
                                <div class="ftr_main_cont">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <ul class="ftr_main_cont_top">
                                                <li>
                                                    <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                                                </li>
                                                {/* <li>
                                                    <a href={APIPath() + "agent-image-sets"}>Image Sets</a>
                                                </li> */}
                                                <li>
                                                    <a href={APIPath() + "agent-tour-list"}>Tours</a>
                                                </li>
                                                <li>
                                                    <a href={APIPath() + "agent-flyer"}>Flyers</a>
                                                </li>
                                                <li>
                                                    <a href={APIPath() + "agent-video-list"}>Videos</a>
                                                </li>
                                                <li>
                                                    <a href={APIPath() + "agent-setting"}>Settings</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <ul class="ftr_main_cont_btm">
                                                <li>
                                                    <a href="mailto:support@VirtualTourCafe.com"><i class="far fa-envelope"></i>support@VirtualTourCafe.com</a>
                                                </li>
                                                <li>
                                                    <a href="tel:(877) 744-8285 / (925) 609-2408"><i class="fas fa-phone-alt"></i>(877) 744-8285 / (925) 609-2408</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div class="ftr_copy_sec">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="ftr_copy_sec_main">
                                <p>All trademarks are properties of their respective owners. © {currentYear} - VirtualTourCafe, LLC All rights reserved. </p>
                                <Link to={APIPath() + "agent-privacy"}>Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}