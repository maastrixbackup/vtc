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
const APIGetAgentVendorData = APIURL() + "agent-get-preferedvendor";
export default function AgentPreferredVendor() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [preferredVendorData, setPreferredVendorData] = useState([]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
  //         postRecord(APIGetUserData, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     setCurrentUser(res.data[0].response.data.agent_profile);
  //                 }
  //             });
  //     }
  // }, [context.state.user]);
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
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetAgentVendorData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setPreferredVendorData(res.data[0].response.data.preferedvendor);
        }
      });
    }
  }, [context.state.user]);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div>
      <Title title="Broker Preffered Vendor" />
      <BrokerHeader setCurrentUser={setCurrentUser} currentUser={currentUser}/>
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
                      <Link
                        class="active"
                        to={APIPath() + "broker-preferred-vendor"}
                      >
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
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
                      <Link to={APIPath() + "bsroker-dashboard"}>
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
                    <li >
                      <Link class="active" to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
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
                    <li>{currentUser.paymentOption} - {currentUser.activeTours} Active Tours</li>
                    <li>Ala-Carte - Available Credits {currentUser.credits} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-title">
          <h2>Preferred Vendors</h2>
        </div>
      </section>
      <section class="prefered-vendor-main">
        {preferredVendorData.length > 0 ? (
          preferredVendorData.map((res) => (
            <section class="prefered-vendor">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-md-4">
                    <img src={res.image} alt="" />
                  </div>
                  <div class="col-md-8">
                    <h3>{res.company_name}</h3>
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: res.description,
                      }}
                    ></div>
                    <a href={res.link} class="btn-style-one">
                      Learn More <i class="fas fa-angle-double-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <Skeleton variant="text" width={300} height={600} />
              </div>
              <div class="col-md-8" style={{ marginTop: "120px" }}>
                <Skeleton variant="text" width={700} height={160} />
                <Skeleton variant="text" width={700} height={60} />
                <Skeleton variant="text" width={700} height={60} />
                <Skeleton variant="text" width={200} height={90} />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <Skeleton variant="text" width={300} height={600} />
              </div>
              <div class="col-md-8" style={{ marginTop: "120px" }}>
                <Skeleton variant="text" width={700} height={160} />
                <Skeleton variant="text" width={700} height={60} />
                <Skeleton variant="text" width={700} height={60} />
                <Skeleton variant="text" width={200} height={90} />
              </div>
            </div>
          </div>
        )}

        {/* <section class="prefered-vendor-grey">
                    <div class="container">
                        <div class="row align-items-center prefered-vendor-greybox">
                            <div class="col-md-8">
                                <h3>RealEZPhotoFix</h3>
                                <p>Do your photos need a little PRO touchup?  Let RealEZPhotoFix convert your good photos to GREAT photos in 24hrs!  Have a cloudy day, let RealEZPhotoFix change the sky to blue!  How about a virtual twilight...  RealEZPhotoFix does this and so much more!  How about remove a car from the driveway or a virtual cleanup, let RealEZPhotoFix declutter rooms or add furniture to vacant, cold rooms using our Virtual Staging Service!</p>

                                <a href="#" class="btn-style-one">Learn More <i class="fas fa-angle-double-right"></i></a>
                            </div>
                            <div class="col-md-4"><img src={vendor2} alt="" /></div>
                        </div>

                        <div class="row align-items-center prefered-vendor-greybox">
                            <div class="col-md-4"><img src={vendor3} alt="" /></div>
                            <div class="col-md-8">
                                <h3>Domains, Web Hosting, Web Marketing, SEO</h3>
                                <p>Purchase and manage your domains, create and manage your own websites, web marketing and even SEO packages!  MyCafeDomains is the place to get it done!  Domains start at under $5/month!!  Need Search Engine Optimization (SEO), get it done for under $2 a month.  Create your own website using the Web Builder for as little as $3.79/month!!</p>

                                <a href="#" class="btn-style-one">Learn More <i class="fas fa-angle-double-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>



                <section class="prefered-vendorbtm">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6"><div class="prefered-vendorbtm-box">
                                <img src={vendor4} alt="" />
                                <h3>Printing Services</h3>
                                <p>Your one-stop shop for printing services!  Everything from flyers to postcards, to sign-riders, zip-code mailers and so much more! </p>
                                <a href="#" class="btn-style-one">Learn More <i class="fas fa-angle-double-right"></i></a>
                            </div></div>
                            <div class="col-md-6"><div class="prefered-vendorbtm-box">
                                <img src={vendor5} alt="" />
                                <h3>CapitalONE</h3>
                                <p>CapitalONE has been there for me when no other bank would give me credit!  I went through a foreclosure and bankruptcy during the Great Recession after losing my job and being given the opportunity to start over with a new chapter in my life, which would become VirtualTourCafe!  I am grateful that CapitalONE helped me re-establish my credit and now I have an over 800 credit score!  WOW, I never had that before.

                                    For transparency, if you use this link, fill out the application and are approved, I will receive a referral fee.  So thank you for your support and I hope this helps you as much as it did me in re-establishing my credit, or just having a good credit company to work with.  My experience has been very good. </p>
                                <a href="#" class="btn-style-one">Learn More <i class="fas fa-angle-double-right"></i></a>
                            </div></div>
                        </div>
                    </div>
                </section> */}
      </section>

      <BrokerFooter />
    </div>
  );
}
