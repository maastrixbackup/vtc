import React, { useEffect, useState } from "react";
// import logo from "../../images/bid-logo-new.png";
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import ftr_log from "../../images/ftr-log.png";
import ftr_part1 from "../../images/ftr-part-1.png";
import ftr_part2 from "../../images/ftr-part-2.png";
import ftr_part3 from "../../images/ftr-part-3.png";
import ftr_bg from "../../images/ftr-bg.png";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { object } from "prop-types";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
export default function Footer(props) {
    const [data, setData] = useState({});
    const [iconData, setIconData] = useState({});
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
        window.scroll(0, 0);
        const obj = { authenticate_key: "abcd123XYZ" };
        postRecord(APIGetSocialIconLink, obj)
            .then(res => {
                if (res.data[0].response.status === "success") {
                    setIconData(res.data[0].response);

                }
            });
    }, []);
    return (
        <footer>
            <div class="ftr_main_sec" style={{ backgroundImage: "url(" + ftr_bg + ")", }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="ftr_main_inner">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="ftr_main_inner_left">
                                            <div class="ftr_main_inner_left_logo">
                                                {Object.keys(data).length > 0 ? (
                                                    <img src={data.sitefooterlogo} alt="Logo" title="Logo" />
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={50} style={{ background: "#bbbbbb" }} />
                                                )}
                                            </div>
                                            <div class="ftr_main_inner_left_para">
                                                <p>{Object.keys(data).length > 0 ? (
                                                    data.site_description
                                                ) : (
                                                    <Skeleton variant="text" width={515} height={300} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                            </div>
                                            <div class="ftr_main_inner_left_social_icn">
                                                <ul>

                                                    {Object.keys(iconData).length > 0 ? (
                                                        iconData.data.map(res => (
                                                            <li>
                                                                <a href={res.link} >
                                                                    <i class={res.class}></i>
                                                                </a>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        ""
                                                    )}

                                                    {/* <li>
                                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fab fa-youtube"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fab fa-linkedin"></i></a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 padd_left">
                                        <div class="ftr_main_right">
                                            <div class="ftr_main_right_head">
                                                <h4>Quick Links</h4>
                                            </div>
                                            <div class="ftr_main_right_conts">
                                                <div class="ftr_main_right_conts_single">
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
                                                    </ul>
                                                </div>
                                                <div class="ftr_main_right_conts_single">
                                                    <ul>
                                                        <li>
                                                            <Link to={APIPath() + "about-us"}>About Us</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "contact-us"}>Contact Us</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "blogs"}>Blog</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "terms-and-conditions"}>Terms and conditions</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={APIPath() + "privacy-policy"}>Privacy Policy</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="ftr_partner_logo">
                                                <ul>
                                                    <li>
                                                        <a target="_blank" href="http://www.bbb.org/greater-san-francisco/business-reviews/real-estate-services/virtualtourcafe-llc-in-pleasanton-ca-448872/#sealclick"><img src={ftr_part1} alt="" title="" /></a>
                                                    </li>
                                                    <li>
                                                        <a target="_blank" href="https://www.houzz.com/pro/virtualtourcafe/virtualtourcafe"><img src={ftr_part2} alt="" title="" /></a>
                                                    </li>
                                                    <li>
                                                        <a target="_blank" href="https://verify.authorize.net/anetseal/?pid=edffa4fc-8a26-431b-900f-5859eb0082f3&rurl=https://virtualtourcafe.com/"><img src={ftr_part3} alt="" title="" /></a>
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
            <div class="ftr_copy_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <p class="copy_sec_para">
                                {Object.keys(data).length > 0 ? (
                                    data.copyright
                                ) : (
                                    <Skeleton variant="text" width={200} height={50} style={{ background: "#bbbbbb" }} />
                                )} </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}