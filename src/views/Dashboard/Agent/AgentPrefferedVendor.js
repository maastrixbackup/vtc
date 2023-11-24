import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import banner from "../../../images/vtc-banner.jpg";
import pattern from "../../../images/pattern-16.png";
import Skeleton from "@material-ui/lab/Skeleton";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetUserData = APIURL() + "user-details";
const APIGetAgentVendorData = APIURL() + "agent-get-preferedvendor";
export default function AgentPreferredVendor() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [preferredVendorData, setPreferredVendorData] = useState([]);
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
      <Title title="Agent Preffered Vendor" />
      <AgentHeader />
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <AgentDashBoardHeader ShowMenu={ShowMenu} HideMenu={HideMenu} />

                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li class="">
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-video-list"}>Videos</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-setting"}>Settings</Link>
                    </li>
                    <li class="active">
                      <Link to={APIPath() + "agent-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>
                    <li>
                      <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">
                        Xpressdocs
                      </a>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-support"}>Support</Link>
                    </li>
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
      <section class="pre_vendor_sec">
        <div class="circle-layer"></div>
        <div class="circle-layer-two"></div>
        <div
          class="pattern-layer"
          style={{ backgroundImage: "url(" + pattern + ")" }}
        ></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="pre_vendor_sec_main prefervendor-newversion">
                {preferredVendorData.length > 0 ? (
                  preferredVendorData.map((res) => (
                    <div class="row">
                      <div class="col-lg-12 col-md-12">
                        <div class="prefervendor-loop">
                          <img src={res.image} alt="" title="" />
                          <div class="vendor-contentarea">
                            <h3>{res.company_name}</h3>
                            <p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: res.description,
                                }}
                              ></div>
                            </p>
                            <a href={res.link} target="_blank" class="lrn_more">
                              Learn More<i class="fas fa-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
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
      </section>
      {/* <section class="prefered-vendor-main">
                {preferredVendorData.length > 0 ? (
                    preferredVendorData.map(res => (
                        <section class="prefered-vendor">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-md-4"><img src={res.image} alt="" /></div>
                                    <div class="col-md-8">
                                        <h3>{res.company_name}</h3>
                                        <div
                                            // eslint-disable-next-line react/no-danger
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    res.description
                                            }}
                                        >
                                        </div>
                                        <a href={res.link} class="btn-style-one">Learn More <i class="fas fa-angle-double-right"></i></a>
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
            </section> */}

      <Footer />
    </div>
  );
}
