import React, { useEffect, useState } from "react";
// import logo from "../../images/bid-logo-new.png";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
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
export default function Footer1(props) {
  const [data, setData] = useState({});
  const [iconData, setIconData] = useState({});
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
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSocialIconLink, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setIconData(res.data[0].response);
      }
    });
  }, []);
  return (
    <>
      <section class="get_in_touch">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="get_in_touch_main">
                <div class="get_in_touch_left">
                  <div class="get_in_touch_left_head">
                    <h2>Lets Get In Touch</h2>
                  </div>
                  <div class="get_in_touch_left_conts">
                    <ul>
                      <li>
                        <i class="fas fa-map-marked-alt"></i>2041 East St, Suite 345, Concord, CA 94520-2126
                      </li>
                      <li>
                        <i class="fas fa-envelope"></i>
                        support@VirtualTourCafe.com
                      </li>
                      <li>
                        <i class="fas fa-phone-square-alt"></i>(877) 744-8285 /
                        (925) 609-2408
                      </li>
                    </ul>
                  </div>
                  <div class="get_start_now">
                    <h4>Get Started Now</h4>
                    <ul class="btns_pics">
                      <li>
                        <Link to={APIPath() + "appointment"} class="need_pic">
                          I Need Photos<i class="fas fa-arrow-right"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "agent"} class="have_pics">
                          I Have Photos<i class="fas fa-arrow-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="get_in_touch_right">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.9059083484385!2d-122.03451082523561!3d37.97932510035255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80856724248d5fe9%3A0x7af0b0c2611f13c6!2s2041%20East%20St%2C%20Concord%2C%20CA%2094520%2C%20USA!5e0!3m2!1sen!2sin!4v1718171144925!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
