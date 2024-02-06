import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import wow_png from "../../images/wow-img-1.png";
import wow_png2 from "../../images/wow-img-2.png";
import wow_png3 from "../../images/wow-img-3.png";
import user from "../../images/user.jpg";
import bgshape from "../../images/hm-bg-shape.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
// import video from "../../images/video.mp4";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetFeatureData = APIURL() + "featurecontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
const APIHomeData = APIURL() + "homecontent";
const APITourData = APIURL() + "getTourData";

export default function Features() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [tourData, setTourData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [featureData, setFeatureData] = useState({});
  const [currentBroker, setCurrentBroker] = useState({});
  const [button, setButton] = useState(true);
  const [homeData, setHomeData] = useState({});
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
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
    postRecord(APITourData, obj).then((res) => {
      setTourData(res.data);
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetFeatureData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setFeatureData(res.data[0].response.data);
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
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIHomeData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setHomeData(res.data[0].response.data);
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenVideoModal(false);
  };
  const openBox = () => {
    if ($) {
      if (!$("#mob_btn").hasClass("active")) {
        $("#mob_btn").addClass("active");
        $("#mobilemenu").addClass("active");
        return $("body").css("overflow", "hidden");
      } else {
        $("#mob_btn").removeClass("active");
        $("#mobilemenu").removeClass("active");
        return $("body").css("overflow", "auto");
      }
    }
  };
  const opanWebsiteLink = (link) => {
    window.open(link, "_blank");
  };
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 2,
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
      <Title title="Features" />
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
          {Object.keys(featureData).length > 0 ? (
            <img
              src={featureData.feature_banner_content.image}
              alt=""
              title=""
            />
          ) : (
            <img src={banner} alt="" title="" />
          )}

          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(featureData).length > 0 ? (
                  featureData.feature_banner_content.title
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
                {Object.keys(featureData).length > 0 ? (
                  featureData.feature_banner_content.sub_title
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
                        <a href="#">Features</a>
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
                            <li class="active">
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
      <section
        class="wow_clients_sec bg_shape"
        style={{ backgroundImage: "url(" + bgshape + ")" }}
      >
        <div class="">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="wow_clients_sec_head">
                <h2>
                  {Object.keys(featureData).length > 0 ? (
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: featureData.wow_clients_sec.title,
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
                </h2>
              </div>
              <div class="wow_clients_sec_contents">
                <div class="row">
                  <div class="col-lg-6 col-md-12">
                    <div class="wow_clients_sec_contents_left">
                      {Object.keys(featureData).length > 0 ? (
                        <img
                          src={featureData.wow_clients_sec.image}
                          alt=""
                          title=""
                        />
                      ) : (
                        ""
                      )}
                      {/* <img src={checkimg} alt=""/> */}
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                    <div class="wow_clients_sec_contents_right">
                      <div class="wow_clients_sec_contents_right_head">
                        <h5>
                          {Object.keys(featureData).length > 0 ? (
                            featureData.wow_clients_sec.sub_title
                          ) : (
                            <Skeleton
                              variant="text"
                              width={250}
                              height={100}
                              style={{
                                background: "#bbbbbb",
                                margin: "0 auto",
                              }}
                            />
                          )}
                        </h5>
                        <p>
                          {Object.keys(featureData).length > 0 ? (
                            <div
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: featureData.wow_clients_sec.description,
                              }}
                            ></div>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={550}
                              height={200}
                              style={{
                                background: "#bbbbbb",
                                margin: "0 auto",
                              }}
                            />
                          )}
                        </p>
                      </div>
                      <div class="wow_clients_sec_contents_right_cont">
                        <div class="wow_clients_sec_contents_right_cont_single">
                          <img src={wow_png} alt="" title="" />
                          <span>
                            <h5>
                              {Object.keys(featureData).length > 0 ? (
                                featureData.wow_clients_sec
                                  .wow_clients_right_content
                                  .wow_clients_right_content_one.title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={250}
                                  height={100}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </h5>
                            <p>
                              {Object.keys(featureData).length > 0 ? (
                                <div
                                  // eslint-disable-next-line react/no-danger
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      featureData.wow_clients_sec
                                        .wow_clients_right_content
                                        .wow_clients_right_content_one
                                        .description,
                                  }}
                                ></div>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={550}
                                  height={70}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </p>
                          </span>
                        </div>
                        <div class="wow_clients_sec_contents_right_cont_single">
                          <img src={wow_png2} alt="" title="" />
                          <span>
                            <h5>
                              {Object.keys(featureData).length > 0 ? (
                                featureData.wow_clients_sec
                                  .wow_clients_right_content
                                  .wow_clients_right_content_two.title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={250}
                                  height={100}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </h5>
                            <p>
                              {Object.keys(featureData).length > 0 ? (
                                <div
                                  // eslint-disable-next-line react/no-danger
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      featureData.wow_clients_sec
                                        .wow_clients_right_content
                                        .wow_clients_right_content_two
                                        .description,
                                  }}
                                ></div>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={550}
                                  height={70}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </p>
                          </span>
                        </div>
                        <div class="wow_clients_sec_contents_right_cont_single mb-0">
                          <img src={wow_png3} alt="" title="" />
                          <span>
                            <h5>
                              {Object.keys(featureData).length > 0 ? (
                                featureData.wow_clients_sec
                                  .wow_clients_right_content
                                  .wow_clients_right_content_three.title
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={250}
                                  height={100}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </h5>
                            <p>
                              {Object.keys(featureData).length > 0 ? (
                                <div
                                  // eslint-disable-next-line react/no-danger
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      featureData.wow_clients_sec
                                        .wow_clients_right_content
                                        .wow_clients_right_content_three
                                        .description,
                                  }}
                                ></div>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={550}
                                  height={70}
                                  style={{
                                    background: "#bbbbbb",
                                    margin: "0 auto",
                                  }}
                                />
                              )}
                            </p>
                          </span>
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
      <section class="amazing_features">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="amazing_features_main">
                <div class="amazing_features_head">
                  <h2>
                    {Object.keys(featureData).length > 0 ? (
                      featureData.amazing_features.title
                    ) : (
                      <Skeleton
                        variant="text"
                        width={250}
                        height={100}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                  </h2>
                </div>
                {Object.keys(featureData).length > 0 ? (
                  <div
                    style={{ textAlign: "justify" }}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: featureData.amazing_features.description,
                    }}
                  ></div>
                ) : (
                  <Skeleton
                    variant="text"
                    width={550}
                    height={70}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
                <div class="amazing_features_contents">
                  <div class="row">
                    {Object.keys(featureData).length > 0 ? (
                      featureData.amazing_features.features.map((res, index) =>
                        index ===
                        featureData.amazing_features.features.length - 1 ? (
                          <div class="col-lg-12 col-md-6">
                            <div
                              id="kb"
                              class="carousel slide kb_elastic animate_text kb_wrapper"
                              data-ride="carousel"
                            >
                              <div class="carousel-inner">
                                <div class="carousel-item active verticalimage">
                                  <iframe
                                    width="100%"
                                    height="440"
                                    autoplay
                                    src={featureData.feature.matterport}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                  ></iframe>
                                  {/* <img src="https://youriguide.com/ezwk2_4266_barbara_ct_pleasanton_ca/" alt="slider 01" /> */}
                                </div>
                              </div>
                              <div class="my-bottom-img">
                                <div id="main-title">
                                  <h1 class="intro">
                                    <span class="inner">
                                      <span class="agent">
                                        iGuide 3D Tour and Floor Plan
                                      </span>
                                      <hr />
                                      <p class="subtitle">
                                        iGuide 3D Tour includes interactive
                                        floor plan with accurate measurements.
                                      </p>
                                    </span>
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="col-lg-4 col-md-6">
                            <div class="category category-1">
                              <span
                                class="category-inner"
                                style={{
                                  "background-image": `url(${res.thumb_image})`,
                                  "background-size": "cover",
                                }}
                              ></span>
                              <span class="category-title">
                                <h2>{res.title}</h2>
                              </span>
                              <span class="category-text">
                                <h2 class="hidden-xs">{res.title}</h2>
                                <span class="category-desc">
                                  <p>{res.description}</p>{" "}
                                </span>
                                <a
                                  href={res.link}
                                  class={"need_pic " + res.btn_class}
                                >
                                  {res.link_text}{" "}
                                  <i class="fas fa-arrow-right"></i>
                                </a>
                              </span>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <Skeleton
                        variant="text"
                        width={550}
                        height={70}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="recent_projects">
        <div class="recent_projects_head">
          {Object.keys(homeData).length > 0 ? (
            <h2>{homeData.recent_projects.title}</h2>
          ) : (
            ""
          )}
          {Object.keys(homeData).length > 0 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.recent_projects.description,
              }}
            ></div>
          ) : (
            ""
          )}
        </div>
        <div class="recent_projects_tabs">
          <div class="recent_projects_tabs_head">
            <ul class="nav nav-tabs">
              <li>
                <a href="#Websites" data-toggle="tab" class="flash_btn active">
                  Websites
                </a>
              </li>
              <li>
                <a href="#FlashCard" data-toggle="tab" class="flash_btn">
                  EZ-FlashCard
                </a>
              </li>
            </ul>
          </div>
          <div class="tab_img">
            <div class="tab-content">
              <div class="tab-pane active" id="Websites">
                <div class="row">
                  {Object.keys(tourData).length > 0
                    ? tourData.map((res) => (
                        <div class="col-lg-4 col-md-4 wow">
                          <div class="recent_projects_tabs_img">
                            <img src={res.image} alt="" title="" />
                            <div
                              onClick={() => opanWebsiteLink(res.link)}
                              class="recent_projects_tabs_img_conts"
                            >
                              <div class="recent_projects_tabs_img_conts_inner">
                                <span class="link_icn">
                                  <i class="fas fa-link"></i>
                                </span>
                                <h5>{res.title}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div class="tab-pane" id="FlashCard">
                <div class="row">
                  {Object.keys(homeData).length > 0
                    ? homeData.Ez_FlashCard.map((res) => (
                        <div class="col-lg-4 col-md-4 wow">
                          <div class="recent_projects_tabs_img">
                            <img src={res.design_photo} alt="" title="" />
                            <div
                              onClick={() => setOpenVideoModal(true)}
                              class="recent_projects_tabs_img_conts"
                            >
                              <div class="recent_projects_tabs_img_conts_inner">
                                <span class="link_icn">
                                  <i class="fas fa-link"></i>
                                </span>
                                <h4>{res.design_name}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        onClick={handleScroll}
        id="return-to-top"
        class="bounce"
        style={{ display: "block", cursor: "pointer" }}
      >
        <i class="fas fa-angle-double-up"></i>
      </a>
      <div class="ftr_get">
        <Footer1></Footer1>
        <Footer />
        <Dialog
          maxWidth={maxWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openVideoModal}
          style={{ marginTop: "5%" }}
        >
          <DialogTitle id="customized-dialog-title">
            <CancelIcon
              onClick={() => setOpenVideoModal(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <div class="container">
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-md-12">
                    <iframe
                      width="100%"
                      height="440"
                      src="https://www.virtualtourcafe.com/alpha/static/media/video3.31d6cfe0.mp4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
