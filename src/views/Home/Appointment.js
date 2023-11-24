import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import user from "../../images/user.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import StepOne from "./sections/Appointment/StepOne";
import Packages from "./sections/Appointment/Packages";
import PackagesTwo from "./sections/Appointment/PackagesTwo";
import MiscPackages from "./sections/Appointment/MiscPackages";
import ReviewTab from "./sections/Appointment/ReviewTab";
import PropertyTab from "./sections/Appointment/PropertyTab";
import FinalPreview from "./sections/Appointment/FinalPreview";
import CheckoutTab from "./sections/Appointment/CheckoutTab";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAppointmentData = APIURL() + "appointmentcontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetPackages = APIURL() + "all-packages";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";

export default function Appointment(props) {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [appointmentData, setAppointmentData] = useState({});
  const [appointment, setAppointment] = useState(true);
  const [packageTab, setPackageTab] = useState(false);
  const [secondPackageTab, setSecondPackageTab] = useState(false);
  const [miscPackageTab, setMiscPackageTab] = useState(false);
  const [reviewTab, setReviewTab] = useState(false);
  const [propertyTab, setPropertyTab] = useState(false);
  const [finalPreviewTab, setFinalPreviewtab] = useState(false);
  const [checkoutTab, setCheckoutTab] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [currentBroker, setCurrentBroker] = useState({});
  //
  useEffect(() => {
    if (localStorage.getItem("checkout") === "yes") {
      setFinalPreviewtab(true);
      setAppointment(false);
      localStorage.removeItem("checkout");
    } else setAppointment(true);
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("package_id") === "yes") {
  //     setFinalPreviewtab(true);
  //     setAppointment(false);
  //     localStorage.removeItem("checkout");
  //   } else setAppointment(true);
  // }, []);

  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSiteSetting, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setData(res.data[0].response.data);
      }
    });
    // if (props.location.search === "?order") {
    //     setAppointment(false);
    //     setFinalPreviewtab(true);
    // }

    if (props.location.search === "?auth") {
      setAppointment(false);
      setReviewTab(true);
    }
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetAppointmentData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAppointmentData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
        }
      });
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        broker_id: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerDetails, objusr).then((res) => {
        setCurrentBroker(res.data[0].response.data.broker_profile);
      });
    }
  }, [context.state.user]);

  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ", agent_id: "7010" };
    postRecord(APIGetPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllPackages(res.data[0].response.data);
      }
    });
  }, []);
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const openBox = () => {
    if (!$("#mob_btn").hasClass("active")) {
      $("#mob_btn").addClass("active");
      $("#mobilemenu").addClass("active");
      return $("body").css("overflow", "hidden");
    } else {
      $("#mob_btn").removeClass("active");
      $("#mobilemenu").removeClass("active");
      return $("body").css("overflow", "auto");
    }
  };
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 11,
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
    <div>
    <Title title="Appointment"/>
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
                        <Link to={APIPath() + "preferred-vendors"}>
                          Preferred Vendors
                        </Link>
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
          {Object.keys(appointmentData).length > 0 ? (
            <img src={appointmentData.banner_section.image} alt="" title="" />
          ) : (
            <img src={banner} alt="" title="" />
          )}
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(appointmentData).length > 0 ? (
                  appointmentData.banner_section.title
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h2>
              <h5>
                {Object.keys(appointmentData).length > 0 ? (
                  appointmentData.banner_section.sub_title
                ) : (
                  <Skeleton
                    variant="text"
                    width={450}
                    height={80}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h5>
            </div>
          </div>
          <div class="inner_page_breadcumb">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="inner_page_breadcumb_main">
                    <ul>
                      <li>
                        <Link to={APIPath()}>
                          <i class="fas fa-home"></i>Home
                        </Link>
                      </li>
                      <li>
                        <a href="#">Appointment</a>
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
                        <li>
                          <a href="#">
                            <i class="far fa-envelope"></i>
                            {Object.keys(data).length > 0 ? (
                              data.site_email
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fas fa-phone-alt"></i>
                            {Object.keys(data).length > 0 ? (
                              data.phone_number
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="head_cont_right">
                      {context.state.isAuthenticated &&
                      JSON.parse(context.state.user).role == "broker" ? (
                        <ul>
                          {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                          <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                            <a
                              href="#"
                              class="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                              id="profileDropdown"
                              aria-expanded="false"
                            >
                              <div class="user_img">
                                <img src={user} alt="profile" />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img src={user} alt="profile" />
                                </div>
                                <div class="content-text">
                                  <h6>{currentBroker.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "broker-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              {/* <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a> */}

                              <a
                                href={APIPath() + "broker-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>

                              <Link
                                to={APIPath() + "broker-reports"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>

                              {/* <a href="#" class="dropdown-item"><i class="fas fa-chart-line profile-icon"></i>Activity</a> */}

                              <Link
                                onClick={handleLogout}
                                to={APIPath()}
                                class="dropdown-item"
                              >
                                <i class="fas fa-sign-out-alt profile-icon"></i>
                                Sign Out
                              </Link>
                            </div>
                          </li>
                        </ul>
                      ) : context.state.isAuthenticated &&
                        JSON.parse(context.state.user).role == "agent" ? (
                        <ul>
                          {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                          <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                            <a
                              href="#"
                              class="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                              id="profileDropdown"
                              aria-expanded="false"
                            >
                              <div class="user_img">
                                <img
                                  src={currentUser && currentUser.profile_img}
                                  alt="profile"
                                />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img
                                    src={currentUser && currentUser.profile_img}
                                    alt="profile"
                                  />
                                </div>
                                <div class="content-text">
                                  <h6>{currentUser.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "agent-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              {/* <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a> */}

                              <a
                                href={APIPath() + "agent-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>

                              <Link
                                to={APIPath() + "agent-support"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>

                              {/* <a href="#" class="dropdown-item"><i class="fas fa-chart-line profile-icon"></i>Activity</a> */}

                              <Link
                                onClick={handleLogout}
                                to={APIPath()}
                                class="dropdown-item"
                              >
                                <i class="fas fa-sign-out-alt profile-icon"></i>
                                Sign Out
                              </Link>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            <Link
                              to={APIPath() + "appointment"}
                              class="login_btn"
                            >
                              <i class="fal fa-book"></i>Schedule Your
                              Appointment
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "login"} class="login_btn">
                              <i class="far fa-lock-alt"></i>Login
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "agent"} class="register_btn">
                              <i class="fas fa-edit"></i>Register
                            </Link>
                          </li>
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
                            <li>
                              <Link to={APIPath() + "agent"}>Agents</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "broker"}>Brokers</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "association"}>
                                Associations
                              </Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "preferred-vendors"}>
                                Preferred Vendors
                              </Link>
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
            </div>
          </div>
        </div>
      </section>
      <section class="appointment_page">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="appointment_page_left">
                <ul>
                  <li class={appointment ? "continue" : "completed"}>
                    <span class="image">
                      <i class="fas fa-check"></i>
                    </span>
                    <div class="steps-design">
                      <small>STEP 1</small>
                      <h4>Appointment Information</h4>
                    </div>
                  </li>
                  <li
                    class={
                      packageTab ? "continue" : appointment ? "" : "completed"
                    }
                  >
                    <span class="image">
                      <i class="fas fa-cart-arrow-down"></i>
                    </span>
                    <div class="steps-design">
                      <small>STEP 2</small>
                      <h4>Order</h4>
                    </div>
                  </li>
                  <li
                    class={
                      reviewTab || propertyTab || finalPreviewTab
                        ? "continue"
                        : checkoutTab
                        ? "completed"
                        : ""
                    }
                  >
                    <span class="image">
                      <i class="fas fa-clipboard-check"></i>
                    </span>
                    <div class="steps-design">
                      <small>STEP 3</small>
                      <h4>Review</h4>
                    </div>
                  </li>
                  <li class={checkoutTab ? "continue" : ""}>
                    <span class="image">
                      <i class="fas fa-credit-card"></i>
                    </span>
                    <div class="steps-design">
                      <small>STEP 4</small>
                      <h4>Checkout</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-8 col-md-8">
              {appointment ? (
                <StepOne
                  setAppointment={setAppointment}
                  setPackageTab={setPackageTab}
                  setSecondPackageTab={setSecondPackageTab}
                />
              ) : (
                ""
              )}
              {packageTab ? (
                <Packages
                  setAppointment={setAppointment}
                  setPackageTab={setPackageTab}
                  setSecondPackageTab={setSecondPackageTab}
                  allPackages={allPackages}
                  setMiscPackageTab={setMiscPackageTab}
                />
              ) : (
                ""
              )}
              {secondPackageTab ? (
                <PackagesTwo
                  setAppointment={setAppointment}
                  setPackageTab={setPackageTab}
                  setSecondPackageTab={setSecondPackageTab}
                  allPackages={allPackages}
                  setMiscPackageTab={setMiscPackageTab}
                />
              ) : (
                ""
              )}
              {miscPackageTab ? (
                <MiscPackages
                  setSecondPackageTab={setSecondPackageTab}
                  setMiscPackageTab={setMiscPackageTab}
                  setReviewTab={setReviewTab}
                />
              ) : (
                ""
              )}
              {reviewTab ? (
                <ReviewTab
                  setReviewTab={setReviewTab}
                  setPropertyTab={setPropertyTab}
                  setMiscPackageTab={setMiscPackageTab}
                />
              ) : (
                ""
              )}
              {propertyTab ? (
                <PropertyTab
                  setPropertyTab={setPropertyTab}
                  setFinalPreviewtab={setFinalPreviewtab}
                  setReviewTab={setReviewTab}
                />
              ) : (
                ""
              )}
              {finalPreviewTab ? (
                <FinalPreview
                  setFinalPreviewtab={setFinalPreviewtab}
                  setCheckoutTab={setCheckoutTab}
                  setPropertyTab={setPropertyTab}
                />
              ) : (
                ""
              )}
              {checkoutTab ? (
                <CheckoutTab
                  setCheckoutTab={setCheckoutTab}
                  setFinalPreviewtab={setFinalPreviewtab}
                  setAppointment={setAppointment}
                  setPackageTab={setPackageTab}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <div class="ftr_get">
        <Footer1></Footer1>
        <Footer />
      </div>
      <a
        onClick={handleScroll}
        id="return-to-top"
        class="bounce"
        style={{ display: "block", cursor: "pointer" }}
      >
        <i class="fas fa-angle-double-up"></i>
      </a>
    </div>
  );
}
