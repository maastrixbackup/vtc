import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import user from "../../images/user.jpg";
import aso_img from "../../images/association_poster.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAssociationData = APIURL() + "associations";
const APIGetUserData = APIURL() + "user-details";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
export default function Associations() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [associationData, setAssociationData] = useState({});
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
    postRecord(APIGetAssociationData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAssociationData(res.data[0].response.data);
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
        pageId: 5,
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
      <Title title="Association" />
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
          {Object.keys(associationData).length > 0 ? (
            <img src={associationData.banner_section.image} alt="" title="" />
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
                {Object.keys(associationData).length > 0 ? (
                  associationData.banner_section.title
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
                {Object.keys(associationData).length > 0 ? (
                  associationData.banner_section.sub_title
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
                        <Link to={""}>Associations</Link>
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
                            <li>
                              <Link to={APIPath() + "broker"}>Brokers</Link>
                            </li>
                            <li class="active">
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
      <section class="features_sec accociations_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="features_sec_main">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="features_sec_left">
                      <h4>
                        {Object.keys(associationData).length > 0 ? (
                          associationData.banner_underneath_sec.title
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}{" "}
                      </h4>
                      {Object.keys(associationData).length > 0 ? (
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html:
                              associationData.banner_underneath_sec.description,
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
                      <Link
                        to={APIPath() + "association-quote"}
                        class="need_pic"
                      >
                        Request a Quote<i class="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="features_sec_right">
                      {Object.keys(associationData).length > 0 ? (
                        <video
                          style={{ width: "651px" }}
                          poster={aso_img}
                          width="320"
                          height="322"
                          controls
                        >
                          <source
                            src={associationData.member_benefit.image}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <Skeleton
                          variant="text"
                          width={250}
                          height={100}
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
      <section class="save_money_sec association_main_sec">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="save_money_sec_main">
              <div class="row">
                <div class="col-lg-6 col-md-6 p-0">
                  <div class="save_money_sec_left association_left">
                    <h4>
                      {Object.keys(associationData).length > 0 ? (
                        associationData.member_benefit.title
                      ) : (
                        <Skeleton
                          variant="text"
                          width={250}
                          height={100}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </h4>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 p-0">
                  <div class="save_money_sec_right">
                    {Object.keys(associationData).length > 0 ? (
                      <img
                        src={associationData.banner_underneath_sec.image}
                        alt=""
                        title=""
                      />
                    ) : (
                      <Skeleton
                        variant="text"
                        width={250}
                        height={100}
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
      <section class="auto_tour">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="auto_tour_main">
                <div class="row">
                  <div class="col-lg-3 col-md-6">
                    <div class="auto_tour_single">
                      <div class="auto_tour_single_img">
                        {Object.keys(associationData).length > 0 ? (
                          <img
                            src={associationData.ez_autotour.image}
                            alt=""
                            title=""
                          />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </div>
                      <div class="auto_tour_single_cont">
                        <h4>
                          {Object.keys(associationData).length > 0 ? (
                            associationData.ez_autotour.title
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
                        </h4>
                        {Object.keys(associationData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: associationData.ez_autotour.description,
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
                  <div class="col-lg-3 col-md-6">
                    <div class="auto_tour_single">
                      <div class="auto_tour_single_img">
                        {Object.keys(associationData).length > 0 ? (
                          <img
                            src={associationData.no_extra_fees.image}
                            alt=""
                            title=""
                          />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </div>
                      <div class="auto_tour_single_cont">
                        <h4>
                          {Object.keys(associationData).length > 0 ? (
                            associationData.no_extra_fees.title
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
                        </h4>
                        {Object.keys(associationData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: associationData.no_extra_fees.description,
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
                  <div class="col-lg-3 col-md-6">
                    <div class="auto_tour_single">
                      <div class="auto_tour_single_img">
                        {Object.keys(associationData).length > 0 ? (
                          <img
                            src={associationData.custom_options.image}
                            alt=""
                            title=""
                          />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </div>
                      <div class="auto_tour_single_cont">
                        <h4>
                          {Object.keys(associationData).length > 0 ? (
                            associationData.custom_options.title
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
                        </h4>
                        {Object.keys(associationData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html:
                                associationData.custom_options.description,
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
                  <div class="col-lg-3 col-md-6">
                    <div class="auto_tour_single">
                      <div class="auto_tour_single_img">
                        {Object.keys(associationData).length > 0 ? (
                          <img
                            src={associationData.training_support.image}
                            alt=""
                            title=""
                          />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={250}
                            height={100}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </div>
                      <div class="auto_tour_single_cont">
                        <h4>
                          {Object.keys(associationData).length > 0 ? (
                            associationData.training_support.title
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
                        </h4>
                        {Object.keys(associationData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html:
                                associationData.training_support.description,
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
        </div>
      </section>
      <section class="domenstration_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="domenstration_sec_main">
                <div class="domenstration_sec_left">
                  <h3>
                    {Object.keys(associationData).length > 0 ? (
                      associationData.see_for_yourself.title
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
                <div class="domenstration_sec_right">
                  <Link to={APIPath() + "association-quote"} class="need_pic">
                    Request a Quote<i class="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="subscription_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="subscription_sec_cont">
                <h4>
                  {Object.keys(associationData).length > 0 ? (
                    associationData.association_site_licence.title
                  ) : (
                    <Skeleton
                      variant="text"
                      width={250}
                      height={100}
                      style={{ background: "#bbbbbb", margin: "0 auto" }}
                    />
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="subscription_pricequote">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 mx-auto">
              <div class="subscribe-whitebox">
                <div class="subscribe-whitebox-top">
                  <h2>
                    {Object.keys(associationData).length > 0 ? (
                      associationData.association_site_licence.sub_title
                    ) : (
                      <Skeleton
                        variant="text"
                        width={250}
                        height={100}
                        style={{ background: "#bbbbbb", margin: "0 auto" }}
                      />
                    )}
                  </h2>{" "}
                </div>
                <div class="subscribe-whitebox-btm text-center">
                  {Object.keys(associationData).length > 0 ? (
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html:
                          associationData.association_site_licence.description,
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
                  <span class="d-inline-block">
                    <Link to={APIPath() + "contact-us"} class="need_pic">
                      Call Or Email for Quote<i class="fas fa-arrow-right"></i>
                    </Link>
                  </span>
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
