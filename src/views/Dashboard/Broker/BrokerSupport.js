import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import Logo from "../../../images/vtc-logo2.png";
import user from "../../../images/user.jpg";
import user_main from "../../../images/user-main.jpg";
import ava_img from "../../../images/ava-img.jpg";
import banner from "../../../images/vtc-banner.jpg";
import profile from "../../../images/profile.jpg";
import vendor1 from "../../../images/preferedvendor_1.png";
import vendor2 from "../../../images/preferedvendor_2.png";
import vendor3 from "../../../images/preferedvendor_3.png";
import vendor4 from "../../../images/preferedvendor_4.png";
import vendor5 from "../../../images/preferedvendor_5.png";
import tours from "../../../images/tours.jpg";
import Skeleton from "@material-ui/lab/Skeleton";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import BrokerHeader from "../Header/BrokerHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Title from "../../../CommonMethods/Title";
const APIGetUserData = APIURL() + "user-details";
const APIGetSiteSetting = APIURL() + "sitesetting";
export default function AgentSupport() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
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
    $(".gee_cross").hide();
    $(".gee_menu").hide();
  }, []);
  const ShowMenu = () => {
    $(".gee_menu").slideToggle("slow", function () {
      $(".gee_hamburger").hide();
      $(".gee_cross").show();
    });
  };
  const HideMenu = () => {
    $(".gee_menu").slideToggle("slow", function () {
      $(".gee_cross").hide();
      $(".gee_hamburger").show();
    });
  };
  return (
    <>
      <Title title="Broker Support" />
      <BrokerHeader />
      {/* <section class="vtc_agent_banner" style={{ backgroundImage: "url(" + banner + ")" }}>
                <div class="vtc_top_menu">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="vtc_agent_menu_top">
                                    <ul>
                                        <li >
                                            <Link to={APIPath() + "broker-dashboard"}>My Cafe Office</Link>
                                        </li>
                                        <li>
                                            <a href={APIPath() + "broker-agent"}>Agents</a>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-setting"}>Settings</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-reports"}>Broker Reports</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-preferred-vendor"}>Preferred Vendors</Link>
                                        </li>

                                        <li class="active">
                                            <Link to={APIPath() + "broker-support"}>Support</Link>
                                        </li>
                                    </ul>

                                    <div class="gee_mobile">
                                        <button class="gee_hamburger">&#9776;</button>
                                        <button class="gee_cross">&#735;</button>
                                    </div>
                                </div>
                                <div class="gee_menu">
                                    <ul>
                                        <li>
                                            <Link to={APIPath() + "broker-dashboard"}>My Cafe Office</Link>
                                        </li>
                                        <li>
                                            <a href={APIPath() + "broker-agent"}>Agents</a>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-setting"}>Settings</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-reports"}>Broker Reports</Link>
                                        </li>
                                        <li>
                                            <Link to={APIPath() + "broker-preferred-vendor"}>Preferred Vendors</Link>
                                        </li>

                                        <li class="active">
                                            <Link to={APIPath() + "broker-support"}>Support</Link>
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
                <div class="banner-title">
                    <h2>VirtualTourCafe Training And Support</h2>

                </div>
            </section>
            <section class="contact-page-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="sub-title-2"><span>Contact</span></div>
                            <h3 class="sec-title">
                                Get In Touch
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="contact-page-form">
                                <form action="#" method="post" class="row">
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-user"></i>
                                            <input type="text" name="name" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-envelope"></i>
                                            <input type="email" name="email" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-phone"></i>
                                            <input type="text" name="number" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-pencil-alt"></i>
                                            <input type="text" name="subject" placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-form">
                                            <i class="fal fa-edit"></i>
                                            <textarea name="message" placeholder="Your Message"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <button class="btn-style-one" type="submit">Send Message<i class="fas fa-angle-double-right"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="contct-box">
                                <i class="fa fa-phone"></i>
                                <h3>Call Us</h3>
                                <p>
                                    925-609-2408<br></br>

                                    877-744-8285 Toll Free
                                </p>
                            </div>
                            <div class="contct-box">
                                <i class="fa fa-envelope"></i>
                                <h3>Email Us</h3>
                                <p>
                                    <a href="mailto:Support@VirtualTourCafe.com">Support@VirtualTourCafe.com</a>
                                </p>
                            </div>
                            <div class="contct-box">
                                <i class="fa fa-map-marker"></i>
                                <h3>Location</h3>
                                <p>
                                    VirtualTourCafe, LLC
                                    6200 Stoneridge Mall Road, Suite 300,
                                    Pleasanton, CA 94588<br></br>
                                    <br></br>

                                    Mon-Fri 8am – 6pm<br></br>

                                    Saturday, 9am-4pm<br></br>

                                    <strong>Sunday Closed</strong>

                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="quomodo-map grayscale">
                                <iframe src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;coord=39.966528,-75.158284&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=p&amp;z=16&amp;iwloc=B&amp;output=embed" scrolling="no"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li>
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link class="active" to={APIPath() + "broker-support"}>Support</Link>
                    </li>
                  </ul>
                  <div class="gee_mobile">
                    <button onClick={() => ShowMenu()} class="gee_hamburger">
                      &#9776;
                    </button>
                    <button onClick={() => HideMenu()} class="gee_cross">
                      &#735;
                    </button>
                  </div>
                </div>
                <div class="gee_menu">
                  <ul>
                    <li>
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li class="active">
                      <Link to={APIPath() + "broker-support"}>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-title">
          <h2>VirtualTourCafe Training And Support</h2>
        </div>
      </section>
      <section class="contact-page-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="sub-title-2">
                <span>Contact</span>
              </div>
              <h3 class="sec-title">Get In Touch</h3>
            </div>
          </div>
          <div class="row">
            {/* <div class="col-lg-8">
                            <div class="contact-page-form">
                                <form action="#" method="post" class="row">
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-user"></i>
                                            <input type="text" name="name" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-envelope"></i>
                                            <input type="email" name="email" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-phone"></i>
                                            <input type="text" name="number" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-form">
                                            <i class="fal fa-pencil-alt"></i>
                                            <input type="text" name="subject" placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-form">
                                            <i class="fal fa-edit"></i>
                                            <textarea name="message" placeholder="Your Message"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <button class="btn-style-one" type="submit">Send Message<i class="fas fa-angle-double-right"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div> */}
            <div class="col-lg-12">
              <div class="contct-box">
                <i class="fa fa-phone"></i>
                <h3>Call Us</h3>
                <p>
                  {Object.keys(data).length > 0 ? (
                    <React.Fragment>
                      <span>{data.phone_number}</span>
                      <br></br>
                      <span>{data.phone_number_alt}</span>
                    </React.Fragment>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={150}
                      height={30}
                      style={{ background: "#bbbbbb" }}
                    />
                  )}
                </p>
              </div>
              <div class="contct-box">
                <i class="fa fa-envelope"></i>
                <h3>Email Us</h3>
                <p>
                  {Object.keys(data).length > 0 ? (
                    <a href={"mailto:" + data.site_email}>{data.site_email}</a>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={150}
                      height={30}
                      style={{ background: "#bbbbbb" }}
                    />
                  )}
                </p>
              </div>
              <div class="contct-box">
                <i class="fa fa-map-marker"></i>
                <h3>Location</h3>
                <p>
                  {Object.keys(data).length > 0 ? (
                    data.address
                  ) : (
                    <Skeleton
                      variant="text"
                      width={150}
                      height={30}
                      style={{ background: "#bbbbbb" }}
                    />
                  )}

                  {/* VirtualTourCafe, LLC
                                    6200 Stoneridge Mall Road, Suite 300,
                                    Pleasanton, CA 94588<br></br>
                                    <br></br>

                                    Mon-Fri 8am – 6pm<br></br>

                                    Saturday, 9am-4pm<br></br>

                                    <strong>Sunday Closed</strong> */}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="quomodo-map grayscale">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.013564692824!2d-121.92671174923642!3d37.69588047967465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fec0b2989813f%3A0xa503c91f44f0d323!2sVirtualTourCafe%2C%20LLC!5e0!3m2!1sen!2sin!4v1642834803781!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
                {/* <iframe src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;coord=39.966528,-75.158284&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=p&amp;z=16&amp;iwloc=B&amp;output=embed" scrolling="no"></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrokerFooter />
    </>
  );
}
