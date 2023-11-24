import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import user from "../../images/user.jpg";
import banner from "../../images/broker-banner.jpg";
import icon_5 from "../../images/icon5.png";
import icon_6 from "../../images/icon6.png";
import icon_7 from "../../images/icon7.png";
import icon_8 from "../../images/icon8.png";
import agent_feature from "../../images/subpics1.jpg";
import broker_office from "../../images/subpics2.jpg";
import brokervideothumb from "../../images/poster2.jpg";
import rectangle_dots from "../../images/rectangle-dots.png";
import circle_dots from "../../images/circle-dots.png";
import money_back from "../../images/money-back.jpg";
import or_symbol from "../../images/or-symbol.png";
import subscription_bg from "../../images/sub-img.jpg";
import pattern from "../../images/pattern-1-orange.png";
import playIcon from "../../images/play-icn.png";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { AuthContext } from "../../CommonMethods/Authentication";
import { postRecord } from "../../CommonMethods/Save";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetBrokerData = APIURL() + "brokercontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
export default function Broker() {
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [brokerData, setBrokerData] = useState({});
  const [currentBroker, setCurrentBroker] = useState({});
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
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetBrokerData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setBrokerData(res.data[0].response.data);
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
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const goToContact = () => {
    history.push(APIPath() + "contact-us");
  };
  const goToAgent = () => {
    history.push(APIPath() + "association-quote");
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
        pageId: 4,
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
      <Title title="Broker" />
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
          {Object.keys(brokerData).length > 0 ? (
            <img src={brokerData.banner_section.image} alt="" title="" />
          ) : (
            <img src={banner} alt="" title="" />
          )}
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(brokerData).length > 0 ? (
                  brokerData.banner_section.title
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
                {Object.keys(brokerData).length > 0 ? (
                  brokerData.banner_section.sub_title
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
                        <a href="#">Brokers</a>
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
                          <a href="mailto:support@VirtualTourCafe.com">
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
                          <a href="tel:(877) 744-8285 or (925) 609-2408">
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
                            <li class="active">
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
      <section class="inner_wlcm_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="inner_wlcm_sec_main brokerpage">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <h4>
                      {Object.keys(brokerData).length > 0 ? (
                        brokerData.banner_underneath_sec.title
                      ) : (
                        <Skeleton
                          variant="text"
                          width={250}
                          height={100}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </h4>
                    {Object.keys(brokerData).length > 0 ? (
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: brokerData.banner_underneath_sec.description,
                        }}
                      ></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-lg-6 col-md-6 onclick-video-play">
                    {Object.keys(brokerData).length > 0 ? (
                      <React.Fragment>
                        <video id="video" poster={brokervideothumb} controls>
                          <source src={brokerData.save_money_sec.image} />
                        </video>
                      </React.Fragment>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={250}
                        height={100}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                    {/* {Object.keys(brokerData).length > 0 ? (
                                            <iframe width="100%" height="300px" src={brokerData.save_money_sec.image} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        ) : (
                                            <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                        )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="features_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="our_partners_head">
                <h2>Unlimited Virtual Tours for Every Agent</h2>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="features_sec_main">
                <div class="row align-items-start">
                  <div class="col-lg-6 col-md-6">
                    <div class="features_sec_left">
                      <img src={agent_feature} alt="" />
                      <hr class="spacer20px" />
                      <h4>
                        {Object.keys(brokerData).length > 0 ? (
                          brokerData.features_sec_main_left.title
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </h4>
                      {Object.keys(brokerData).length > 0 ? (
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html:
                              brokerData.features_sec_main_left.description,
                          }}
                        ></div>
                      ) : (
                        <Skeleton
                          variant="text"
                          width={550}
                          height={200}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="features_sec_left">
                      <img src={broker_office} alt="" />
                      <hr class="spacer20px" />
                      <h4>
                        {Object.keys(brokerData).length > 0 ? (
                          brokerData.broker_ofc_feature_right.title
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </h4>
                      {Object.keys(brokerData).length > 0 ? (
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html:
                              brokerData.broker_ofc_feature_right.description,
                          }}
                        ></div>
                      ) : (
                        <Skeleton
                          variant="text"
                          width={550}
                          height={200}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="features-section rel z-1 pt-80 pb-40 bg-blue text-white">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center mb-5">
              <h4>
                <span style={{ color: "#ffa124" }}>
                  Save Money, Attract and Retain
                </span>{" "}
                agents while bringing in more leads and selling houses faster
                with modern marketing tools!
              </h4>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="row align-items-center">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="feature-item">
                        <div class="image">
                          <img src={icon_5} alt="Icon" />
                        </div>
                        <div class="content">
                          <h4>Admin Panel</h4>
                          <p>
                            Back office provides for broker or admin to add,
                            delete and manage all agent accounts from any
                            location. Create tours for any and all agents in the
                            office and view traffic and marketing reports. Agent
                            access is also included if desired.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="feature-item">
                        <div class="image">
                          <img src={icon_6} alt="Icon" />
                        </div>
                        <div class="content">
                          <h4>Save Money</h4>
                          <p>
                            Save time and money with a broker office discount.
                            Reduces cost and offers a value to the agents and
                            the broker by providing consistency, branding and
                            centralized administration.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="feature-item">
                        <div class="image">
                          <img src={icon_7} alt="Icon" />
                        </div>
                        <div class="content">
                          <h4>Traffic Reports</h4>
                          <p>
                            Traffic reports available for each individual agent,
                            each property and the entire office. See which
                            properties and which agents are getting most views,
                            and from where.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="feature-item">
                        <div class="image">
                          <img src={icon_8} alt="Icon" />
                        </div>
                        <div class="content">
                          <h4>Branding</h4>
                          <p>
                            Control the branding for the office from one central
                            location. Create custom office banners and color
                            schemes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="rectangle-dots" src={rectangle_dots} alt="Shape" />
        <img class="circle-dots" src={circle_dots} alt="Shape" />
      </section>

      {/* <section class="brokers_admin_sec">
                <div class="pattern-layer-one" style={{ backgroundImage: "url(" + pattern + ")", }} ></div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="brokers_admin_sec_main">
                                <div class="row">
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                        <div class="brokers_admin_sec_single">
                                            <div class="brokers_admin_sec_img">
                                                {Object.keys(brokerData).length > 0 ? (
                                                    <img src={brokerData.admin_panel.image} alt="" title="" />
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </div>
                                            <h3>{Object.keys(brokerData).length > 0 ? (
                                                brokerData.admin_panel.title
                                            ) : (
                                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}</h3>
                                            {Object.keys(brokerData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            brokerData.admin_panel.description
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                        <div class="brokers_admin_sec_single" >
                                            <div class="brokers_admin_sec_img">
                                                {Object.keys(brokerData).length > 0 ? (
                                                    <img src={brokerData.save_money.image} alt="" title="" />
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </div>
                                            <h3>
                                                {Object.keys(brokerData).length > 0 ? (
                                                    brokerData.save_money.title
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </h3>
                                            {Object.keys(brokerData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            brokerData.save_money.description
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                        <div class="brokers_admin_sec_single">
                                            <div class="brokers_admin_sec_img">
                                                {Object.keys(brokerData).length > 0 ? (
                                                    <img src={brokerData.traffic_reports.image} alt="" title="" />
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </div>
                                            <h3>
                                                {Object.keys(brokerData).length > 0 ? (
                                                    brokerData.traffic_reports.title
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </h3>
                                            {Object.keys(brokerData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            brokerData.traffic_reports.description
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                        <div class="brokers_admin_sec_single no_aft">
                                            <div class="brokers_admin_sec_img">
                                                {Object.keys(brokerData).length > 0 ? (
                                                    <img src={brokerData.branding.image} alt="" title="" />
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </div>
                                            <h3>
                                                {Object.keys(brokerData).length > 0 ? (
                                                    brokerData.branding.title
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </h3>
                                            {Object.keys(brokerData).length > 0 ? (
                                                <div
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            brokerData.branding.description
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <section class="own_pics_sec photoagent-top choosemonthly">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h4>
                {Object.keys(brokerData).length > 0 ? (
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: brokerData.subscription_sec_cont.title,
                    }}
                  ></div>
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h4>

              {/* <h4>
                                {Object.keys(brokerData).length > 0 ? (
                                    brokerData.subscription_sec_cont.title
                                ) : (
                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                )}
                            </h4> */}
            </div>
          </div>
        </div>
      </section>
      <section class="subscription_pricequote mt-0 pb-0 photo_agent_sub broker-price">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 mx-auto">
              <div class="row">
                <div class="col-12 col-md-6 col-xl-6 d-flex">
                  <article class="w-100 mx-auto mb-6 position-relative bg-white shadow rounded text-center priceColumn">
                    <h3 class="fwMedium mb-6">
                      {Object.keys(brokerData).length > 0 ? (
                        brokerData.monthly_subscription.title
                      ) : (
                        <Skeleton
                          variant="text"
                          width={250}
                          height={100}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </h3>

                    <hr class="my-6" />
                    <ul class="list-unstyled pcFeaturesList text-left mb-0">
                      <li>
                        10 Agents <span>$99/mo</span>
                      </li>
                      <li>
                        11-25 Agents <span>$199/mo</span>
                      </li>
                      <li>
                        26-50 Agents <span>$299/mo</span>
                      </li>
                      <li>
                        51-100 Agents <span>$399/mo</span>
                      </li>
                    </ul>
                    <a
                      href="javascript:void(0)"
                      onClick={goToContact}
                      class="btn btnThemeAlt position-absolute border-0 p-0 mx-auto"
                      data-hover="Select"
                    >
                      <button class="have_pics">
                        Over 100 Agents Call for Quote
                        <i class="fas fa-arrow-right"></i>
                      </button>
                    </a>
                  </article>
                </div>
                <div class="col-12 col-md-6 col-xl-6 d-flex">
                  <article class="w-100 mx-auto mb-6 position-relative bg-white shadow rounded text-center priceColumn">
                    <h3 class="fwMedium mb-6">Yearly Subscription</h3>
                    <hr class="my-6" />
                    <ul class="list-unstyled pcFeaturesList text-left mb-0">
                      <li>
                        3-10 Agents <span>$990/yr</span>
                      </li>
                      <li>
                        11-25 Agents <span>$1990/yr</span>
                      </li>
                      <li>
                        26-50 Agents <span>$2990/yr</span>
                      </li>
                      <li>
                        51-100 Agents <span>$3990/yr</span>
                      </li>
                    </ul>
                    <a
                      href="javascript:void(0)"
                      onClick={goToContact}
                      class="btn btnThemeAlt position-absolute border-0 p-0 mx-auto"
                      data-hover="Select"
                    >
                      <button class="have_pics">
                        Over 100 Agents Call for Quote
                        <i class="fas fa-arrow-right"></i>
                      </button>
                    </a>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="save_money_sec">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="save_money_sec_main">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 pl-0">
                                    <div class="save_money_sec_right">
                                        <section class="subscription_sec brokerpagesubsc" style={{ backgroundImage: "url(" + subscription_bg + ")", }}>
                                            <div class="container"><div class="row">
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="subscription_sec_cont">
                                                        <h4 >
                                                            {Object.keys(brokerData).length > 0 ? (
                                                                brokerData.subscription_sec_cont.title
                                                            ) : (
                                                                <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                            )}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </section>
                                        <section class="subscription_pricequote brokerpricetitle">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="subscribe-whitebox">
                                                            <div class="subscribe-whitebox-top"><h2 style={{}}>
                                                                {Object.keys(brokerData).length > 0 ? (
                                                                    brokerData.monthly_subscription.title
                                                                ) : (
                                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                                )}
                                                            </h2> </div>
                                                            <div class="subscribe-whitebox-btm text-center">
                                                                {Object.keys(brokerData).length > 0 ? (
                                                                    <div
                                                                        // eslint-disable-next-line react/no-danger
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                brokerData.monthly_subscription.description
                                                                        }}
                                                                    >
                                                                    </div>
                                                                ) : (
                                                                    <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                                )}
                                                                <span class="d-inline-block">
                                                                    <Link to={APIPath() + "contact-us"} class="have_pics">Over 100 Agents Call for Quote<i class="fas fa-arrow-right"></i></Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="subscribe-whitebox">
                                                            <div class="subscribe-whitebox-top"><h2>
                                                                {Object.keys(brokerData).length > 0 ? (
                                                                    brokerData.yearly_subscription.title
                                                                ) : (
                                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                                )}
                                                            </h2> </div>
                                                            <div class="subscribe-whitebox-btm text-center">
                                                                {Object.keys(brokerData).length > 0 ? (
                                                                    <div
                                                                        // eslint-disable-next-line react/no-danger
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                brokerData.yearly_subscription.description
                                                                        }}
                                                                    >
                                                                    </div>
                                                                ) : (
                                                                    <Skeleton variant="text" width={550} height={200} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                                )}
                                                                <span class="d-inline-block">
                                                                    <Link to={APIPath() + "contact-us"} class="have_pics">Over 100 Agents Call for Quote<i class="fas fa-arrow-right"></i></Link>
                                                                </span>
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
                    </div>
                </div>
            </section> */}
      <section class="money_back_guarantee">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 ml-auto">
              <div class="subscription_sec_cont2">
                <h4>Need Photo Enhancement?</h4>
                <p>
                  Select VIP Concierge Service and we will do it all for you,
                  including photo enhancement. Our proprietary 15-step process
                  will correct the color, whitebalance, brightness, straighten
                  the photo and even change cloudy skies to blue! All in 24hrs!
                </p>
                <div class="moneyback-right-design">
                  <div class="moneyback-right-design1">
                    <img src={money_back} alt="" />
                  </div>
                  <div class="moneyback-right-design2">
                    <img src={or_symbol} alt="" />
                  </div>
                  <div class="moneyback-right-design3">
                    <a onClick={goToAgent} class="need_pic">
                      Request a Quote<i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="subscription_sec_cont">
                  <hr class="spacer1px" />
                  <small>
                    7 Days Unlimited <strong>FREE TRIAL</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="domenstration_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-md-12 mx-auto">
              <div class="domenstration_sec_main">
                <div class="domenstration_sec_left">
                  <h3>Request Demonstration</h3>
                </div>
                <div class="domenstration_sec_right">
                  <a
                    href="javascript:void(0)"
                    onClick={goToContact}
                    class="have_pics"
                  >
                    Contact Us<i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="money_back_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="money_back_sec_main">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="money_back_sec_left" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <h2>
                                                {Object.keys(brokerData).length > 0 ? (
                                                    brokerData.money_back_sec.title
                                                ) : (
                                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                )}
                                            </h2>
                                            <Link to={APIPath() + "contact-us"}>
                                                <div class="need_pic qoute">
                                                    {Object.keys(brokerData).length > 0 ? (
                                                        brokerData.money_back_sec.sub_title
                                                    ) : (
                                                        <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                                    )}
                                                    <i class="fas fa-arrow-right"></i></div></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
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
