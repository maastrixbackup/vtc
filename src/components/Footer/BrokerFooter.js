import React, { useEffect, useState } from "react";
// import logo from "../../images/bid-logo-new.png";
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import Logo from "../../images/vtc-logo2.png";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
const APIGetSiteSetting = APIURL() + "sitesetting";
export default function BrokerFooter(props) {
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
                                                <li >
                                                    <Link to={APIPath() + "broker-dashboard"}>My Cafe Office</Link>
                                                </li>
                                                <li>
                                                    <a href={APIPath() + "broker-agent"}>Agents</a>
                                                </li>
                                                <li class="active">
                                                    <Link to={APIPath() + "broker-setting"}>Settings</Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <ul class="ftr_main_cont_btm">
                                                <li>
                                                    <a href="#"><i class="far fa-envelope"></i>support@VirtualTourCafe.com</a>
                                                </li>
                                                <li>
                                                    <a href="#"><i class="fas fa-phone-alt"></i>(877) 744-8285 / (925) 609-2408</a>
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