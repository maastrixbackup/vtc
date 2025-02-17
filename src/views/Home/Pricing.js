import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import rgt_img1 from "../../images/rgt-img-1.jpg";
import rgt_img2 from "../../images/rgt-img-2.jpg";
import rgt_img3 from "../../images/rgt-img-3.jpg";
import user from "../../images/user.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import ftr_head from "../../images/ftr-head-bg.png";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetPricingData = APIURL() + "pricingcontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
export default function Pricing() {
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [pricingData, setPricingData] = useState({});
  const [sync, setSync] = useState(true);
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
    if (sync) {
      const obj = { authenticate_key: "abcd123XYZ" };
      postRecord(APIGetPricingData, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setPricingData(res.data[0].response.data);
        }
      });
    }
  }, [pricingData, sync]);
  function findOffset(element) {
    var top = 0,
      left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left,
    };
  }
  useEffect(() => {
    if (Object.keys(pricingData).length > 0) {
      setSync(false);
      var stickyHeader = document.getElementById("sticky1");
      var headerOffset = findOffset(stickyHeader);

      window.onscroll = function () {
        // body.scrollTop is deprecated and no longer available on Firefox
        var bodyScrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        if (bodyScrollTop > headerOffset.top) {
          stickyHeader.classList.add("fixed");
        } else {
          stickyHeader.classList.remove("fixed");
        }
      };
    }
  }, [pricingData]);
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
  const handleTop = () => {
    $("body,html").animate(
      {
        scrollTop: 400,
      },
      500
    );
  };
  // $('#price-top1,#price-top2,#price-top3').click(function(){
  //     $("body,html").animate({
  //                scrollTop: 400
  //            }, 500)
  //  });
  const goToOrder = () => {
    history.push(APIPath() + "appointment");
  };
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 9,
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
      <Title title="Pricing" />
      <section class="home_page">
        <div class="mobile_on mobile_slide">
          <div class="mob_head">
            <div class="hm_logo">
              <Link to={APIPath()}>
                <img src={Logo} alt="Logo" title="Logo" />
              </Link>
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
          {Object.keys(pricingData).length > 0 ? (
            <img src={pricingData.banner_section.image} alt="" title="" />
          ) : (
            <Skeleton
              variant="text"
              width={250}
              height={100}
              style={{ background: "#bbbbbb", margin: "0 auto" }}
            />
          )}
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(pricingData).length > 0 ? (
                  pricingData.banner_section.title
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
                {Object.keys(pricingData).length > 0 ? (
                  pricingData.banner_section.sub_title
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
                        <a href="#">Pricing</a>
                      </li>
                    </ul>
                  </div>
                  <span class="startorder-btn">
                    <Link to={APIPath() + "appointment"}>
                      <i class="fas fa-chalkboard-teacher"></i> &nbsp; Start
                      Order
                    </Link>
                  </span>
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
                                  <img src={user} alt="" title="" />
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
                            <li class="active">
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
      <section class="page-gradient-color">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="amazing_features_head">
                    <h2>Plans &amp; Pricing</h2>
                  </div>
                </div>
              </div>
              <div class="row header" id="sticky1">
                <div class="col-lg-12 col-md-12 text-center">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#home"
                        onClick={handleTop}
                        id="price-top1"
                        style={{ borderRadius: "30px !important" }}
                      >
                        <i class="fas fa-box-open"></i> Standard{" "}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#menu1"
                        onClick={handleTop}
                        id="price-top2"
                      >
                        <i class="fas fa-briefcase"></i> Signature
                      </a>
                    </li>
                    {/* <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#menu2"
                        onClick={handleTop}
                        id="price-top3"
                      >
                        <i class="fas fa-head-vr"></i> Virtual
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="tab-content">
                    <div id="home" class="container tab-pane fade">
                      {Object.keys(pricingData).length > 0
                        ? pricingData.standard_package.map((res) => (
                            <div class="row pricing-main-frame">
                              <div class="col-md-12">
                                <div class="pricing-box-wh">
                                  <div class="pricing-box-photo">
                                    <img src={res.image} alt="" />
                                    <div class="pricing-box-price-amount">
                                      Starting at at ${res.min_price}
                                    </div>
                                    <div class="pricing-box-photo-title">
                                      {res.title}
                                    </div>
                                  </div>
                                  <div class="pricing-box-content">
                                    <div class="pricing-box-price">
                                      <table
                                        class="table"
                                        style={{ width: "100%" }}
                                        cellpadding="0"
                                        cellspacing="0"
                                      >
                                        <tbody>
                                          {res.body.map((priceData) => (
                                            <tr>
                                              <td
                                                width="25%"
                                                align="left"
                                                class="package-name"
                                              >
                                                {priceData.title}
                                              </td>
                                              <td
                                                width="60%"
                                                align="left"
                                                class="package-info"
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      priceData.description,
                                                  }}
                                                ></div>
                                              </td>
                                              <td
                                                width="15%"
                                                align="right"
                                                class="price"
                                              >
                                                <sup>$</sup>
                                                {priceData.price}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div class="pricing-box-btn">
                                    <Link
                                      class="booknowbtn"
                                      to={APIPath() + "appointment"}
                                      onClick={() => {
                                        localStorage.setItem(
                                          "package_id",
                                          res.id
                                        );
                                        var a = [];
                                        localStorage.setItem(
                                          "Combo_Package",
                                          JSON.stringify(a)
                                        );
                                        a.push(res.id);
                                        localStorage.setItem(
                                          "Carte_Package",
                                          JSON.stringify(a)
                                        );
                                      }}
                                    >
                                      Order{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                    <Link
                                      to={APIPath() + "example"}
                                      class="booknowbtn"
                                    >
                                      Sample{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                    <div id="menu1" class="container tab-pane active">
                      {Object.keys(pricingData).length > 0
                        ? pricingData.signature_package.map((res) => (
                            <div class="row pricing-main-frame">
                              <div class="col-md-12">
                                <div class="pricing-box-wh">
                                  <div class="pricing-box-photo">
                                    <img src={res.image} alt="" />
                                    <div class="pricing-box-photo-title">
                                      {res.title}
                                    </div>
                                  </div>
                                  <div class="pricing-box-content">
                                    <div class="pricing-box-price">
                                      <table
                                        class="table"
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                      >
                                        <tbody>
                                          {res.body.map((priceData) => (
                                            <tr>
                                              <td
                                                width="30%"
                                                align="left"
                                                class="package-name"
                                              >
                                                {priceData.title}
                                              </td>
                                              <td
                                                width="55%"
                                                align="left"
                                                class="package-info"
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      priceData.description,
                                                  }}
                                                ></div>
                                              </td>
                                              <td
                                                width="15%"
                                                align="right"
                                                class="price"
                                              >
                                                <sup>$</sup> {priceData.price}
                                                <Link
                                                  to={APIPath() + "appointment"}
                                                  class="order_now_btn"
                                                >
                                                  Order Now{" "}
                                                  <i class="far fa-angle-double-right"></i>
                                                </Link>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div class="pricing-box-btn">
                                    <Link
                                      class="booknowbtn"
                                      to={APIPath() + "appointment"}
                                    >
                                      Order{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                    <Link
                                      to={APIPath() + "example"}
                                      class="booknowbtn"
                                    >
                                      Sample{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                    <div id="menu2" class="container tab-pane fade">
                      <div class="row pricing-main-frame">
                        {Object.keys(pricingData).length > 0
                          ? pricingData.virtual_package.body.map((res) => (
                              <div class="col-md-6">
                                <div class="pricing-box-wh">
                                  <div class="pricing-box-photo">
                                    <div class="pricing-box-price-amount">
                                      $ {res.price}
                                    </div>
                                    <img src={res.image} alt="" />
                                    <div class="pricing-box-photo-title">
                                      {res.title}
                                    </div>
                                  </div>
                                  <div class="pricing-box-content">
                                    <div
                                      // eslint-disable-next-line react/no-danger
                                      dangerouslySetInnerHTML={{
                                        __html: res.description,
                                      }}
                                    ></div>
                                  </div>
                                  <div class="pricing-box-btn">
                                    <Link
                                      class="booknowbtn"
                                      to={APIPath() + "appointment"}
                                    >
                                      Order{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                    <Link
                                      to={APIPath() + "example"}
                                      class="booknowbtn"
                                    >
                                      Sample{" "}
                                      <i
                                        style={{
                                          marginRight: "0px",
                                          marginLeft: "10px",
                                        }}
                                        class="fas fa-arrow-right"
                                      ></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                    <div class="row justify-content-center pricing-btm">
                      <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="featured-box">
                          <div class="featured-content">
                            <i class="fas fa-life-ring"></i>
                            <h2>SUPPORT</h2>
                            <p>
                              We have a dedicated support team to provide
                              same-day response.
                              <br />
                              Text, call us, or email us:
                              <br />
                              (877) 744-8285 or (925) 609-2408
                              <br />
                              support@virtualtourcafe.com
                              <br />
                              <br />
                              Our business hours are
                              <br />
                              Sunday-Saturday 9-6PM.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="featured-box">
                          <div class="featured-content">
                            <i class="fas fa-briefcase"></i>
                            <h2>TERMS OF SERVICE</h2>
                            <p> </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="featured-box">
                          <div class="featured-content">
                            <i class="fas fa-file-certificate"></i>
                            <h2>LICENSING</h2>
                            <p></p>
                          </div>
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
      <section class="professional_pics_sec pt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="amazing_features_head">
                <h2>
                  {Object.keys(pricingData).length > 0 ? (
                    pricingData.photo_packages.title
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
              <p class="partner_para_recent">
                {Object.keys(pricingData).length > 0 ? (
                  pricingData.photo_packages.sub_title
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </p>
              <div class="professional_pics_sec_cont">
                <div class="row">
                  <div class="col-lg-7 col-md-7">
                    <div class="professional_pics_sec_cont_left">
                      <h3>All Photo Packages Include:</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <div class="features_sec_left new_features">
                        {Object.keys(pricingData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: pricingData.photo_packages.description,
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
                  <div class="col-lg-5 col-md-5">
                    <div class="professional_pics_sec_cont_right">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="professional_pics_sec_cont_right_left">
                            <img src={rgt_img1} alt="" title="" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <div class="professional_pics_sec_cont_right_right top_img">
                                <img src={rgt_img2} alt="" title="" />
                              </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                              <div class="professional_pics_sec_cont_right_right">
                                <img src={rgt_img3} alt="" title="" />
                              </div>
                            </div>
                          </div>
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
      <section class="unique_quality pricing-quality">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="unique_quality_main">
                <div class="row align-items-center">
                  <div class="col-lg-6 col-md-6">
                    <div class="unique_quality_left">
                      <h3>
                        {" "}
                        {Object.keys(pricingData).length > 0 ? (
                          pricingData.quality_service.title
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </h3>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 text-right">
                    <Link to={APIPath() + "appointment"}>
                      <div class="unique_quality_right">
                        <i class="fas fa-chalkboard-teacher"></i> &nbsp; Start
                        Order
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
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
