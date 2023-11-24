import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import $ from "jquery";
import banner from "../../../images/vtc-banner.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetOrderDetails = APIURL() + "orders-details";
export default function AgentOrderDetails(props) {
  const order_id = props.match.params.orderid;
  const context = useContext(AuthContext);
  const [allOrders, setAllOrders] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState({});
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
        orderid: order_id,
      };
      postRecord(APIGetOrderDetails, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllOrders(res.data[0].response.data);
          setPropertyInfo(res.data[0].response.data.orderdetails);
        }
      });
    }
  }, [context.state.user, order_id]);
  return (
    <div>
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
                    <li>
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
          <h2>Order Details</h2>
        </div>
      </section>
      <section class="vtc_agent_profile">
        <div class="container">
          {Object.keys(allOrders).length > 0 &&
          allOrders.packagedetails !== undefined ? (
            <div class="row">
              <div class="col-md-12">
                <h3>Packages</h3>
                <div class="step_progress">
                  <div class="progress" style={{ height: "20px" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h6>No Packages Found</h6>
          )}
          <div class="Order_cont">
            <div class="row">
              {Object.keys(allOrders).length > 0 &&
              allOrders.packagedetails !== undefined
                ? allOrders.packagedetails.map((sd) => (
                    <div class="col-md-4">
                      <div class="package-box-description">
                        <div class="package-box-appointment1">
                          <span class="pricetag"> $ {sd.price}</span>
                          {/* <span class="delete-package"><a onClick={()=>removeSubPackages(sd.id)}><i class="fas fa-trash-alt"></i></a></span> */}
                          <img
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={sd.image}
                          />
                          <h4>{sd.title}</h4>
                        </div>
                        <div
                          class="package-box-appointment1-content"
                          style={{ minHeight: "auto" }}
                        >
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: sd.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <hr class="spacer50px" />
            {Object.keys(allOrders).length > 0 &&
              allOrders.miscellaneouspackage !== undefined && (
                <div class="row">
                  <div class="col-md-12">
                    <h3>Miscellaneous Packages</h3>
                    <div class="step_progress">
                      <div class="progress" style={{ height: "20px" }}>
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            <div class="row">
              {Object.keys(allOrders).length > 0 &&
              allOrders.miscellaneouspackage !== undefined
                ? allOrders.miscellaneouspackage.map((sd) => (
                    <div class="col-md-4">
                      <div class="package-box-description">
                        <div class="package-box-appointment1">
                          <span class="pricetag"> $ {sd.price}</span>
                          {/* <span class="delete-package"><a onClick={()=>removeSubPackages(sd.id)}><i class="fas fa-trash-alt"></i></a></span> */}
                          <img
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={sd.image}
                          />
                          <h4>{sd.title}</h4>
                        </div>
                        <div
                          class="package-box-appointment1-content"
                          style={{ minHeight: "auto" }}
                        >
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: sd.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            {/* <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="package_sec">
                                    {Object.keys(allOrders).length > 0 && allOrders.miscellaneouspackage !== undefined ? (
                                        allOrders.miscellaneouspackage.map(sd => (
                                            <div class="listing_sec" style={{ border: "1px solid #9393936e", padding: "10px" }}>
                                                <div class="listing_sec_main">
                                                    <div class="listing_sec_main_img">
                                                        <img style={{ height: "200px", objectFit: "cover" }} src={sd.image} alt="" />
                                                        <span>$ {sd.price}</span>
                                                    </div>
                                                    <h3>{sd.title}</h3>
                                                    <div
                                                        // eslint-disable-next-line react/no-danger
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                sd.description
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div> */}
            <hr class="spacer50px" />
            <div class="row">
              <div class="col-md-12">
                <h3>Property Information</h3>
                <div class="step_progress">
                  <div class="progress" style={{ height: "20px" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td width="20%">
                      <b>Caption :</b>
                    </td>
                    <td width="30%">{propertyInfo.caption}</td>
                    <td width="20%">
                      <b>Description :</b>
                    </td>
                    <td width="30%">{propertyInfo.description}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>Bed Room :</b>
                    </td>
                    <td width="30%">{propertyInfo.bed_room}</td>
                    <td width="20%">
                      <b>Bath Room :</b>
                    </td>
                    <td width="30%">{propertyInfo.bath_room}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>Year Built :</b>
                    </td>
                    <td width="30%">{propertyInfo.year_built}</td>
                    <td width="20%">
                      <b>Square Footage :</b>
                    </td>
                    <td width="30%">{propertyInfo.square_footage}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>MLS :</b>
                    </td>
                    <td width="30%">{propertyInfo.mls}</td>
                    <td width="20%">
                      <b>Price :</b>
                    </td>
                    <td width="30%">{propertyInfo.price}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h3>Appointment Information</h3>
                <div class="step_progress">
                  <div class="progress" style={{ height: "20px" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td width="20%">
                      <b>Street Address:</b>
                    </td>
                    <td width="30%">{propertyInfo.street_address}</td>
                    <td width="20%">
                      <b>First Choice :</b>
                    </td>
                    <td width="30%">
                      {dateFormat(propertyInfo.first_choice, "dd-mm-yyyy") +
                        "  " +
                        propertyInfo.first_time}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>City:</b>
                    </td>
                    <td width="30%">{propertyInfo.city}</td>
                    <td width="20%">
                      <b>Second Choice :</b>
                    </td>
                    <td width="30%">
                      {dateFormat(propertyInfo.second_choice, "dd-mm-yyyy") +
                        "  " +
                        propertyInfo.second_time}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>Zipcode:</b>
                    </td>
                    <td width="30%">{propertyInfo.zipcode}</td>
                    <td width="20%">
                      <b>Third Choice :</b>
                    </td>
                    <td width="30%">
                      {dateFormat(propertyInfo.third_choice, "dd-mm-yyyy") +
                        "  " +
                        propertyInfo.third_time}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="20%">
                      <b>State:</b>
                    </td>
                    <td width="30%">{propertyInfo.state}</td>
                    <td width="20%"></td>
                    <td width="30%"></td>
                  </tr>
                  <tr>
                    <td width="30%">
                      <b>Property Access Information :</b>
                    </td>
                    <td colspan="3">{propertyInfo.notes}</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="4">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
