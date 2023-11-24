import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import banner from "../../../images/vtc-banner.jpg";
import photo1 from "../../../images/photo-1.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import tours from "../../../images/tours.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
const APIGetUserData = APIURL() + "user-details";
export default function AgentEzPayment(props) {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [backButton, setBackButton] = useState(false);
  const [agentProfile, setAgentProfile] = useState("");
  useEffect(() => {
    $(".gee_cross").hide();
    $(".gee_menu").hide();
  }, []);
  const ShowMenu = () => {
    $(".gee_menu").slideToggle("slow", function () {
      $(".gee_hamburger").hide();
      $(".gee_cross").show();
    });
  }
  const HideMenu = () => {
    $(".gee_menu").slideToggle("slow", function () {
      $(".gee_cross").hide();
      $(".gee_hamburger").show();
    });
  }
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
          setAgentProfile(res.data[0].response.data.agent_profile.profile_img);
        }
      });
    }
  }, [context.state.user]);
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
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li>
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>                  
                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li class="active">
                      <Link to={APIPath() + "agent-video-list"}>Videos</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-preferred-vendor"}>Preferred Vendors</Link>
                    </li>
                    <li>
                      <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">Xpressdocs</a>
                    </li>
                    <li class="">
                      <Link to={APIPath() + "agent-support"}>Support</Link>
                    </li>
                  </ul>
                  <div class="gee_mobile">
                    <button onClick={() => ShowMenu()} class="gee_hamburger">&#9776;</button>
                    <button onClick={() => HideMenu()} class="gee_cross">&#735;</button>
                  </div>
                </div>
                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>
                   
                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li class="active">
                      <Link to={APIPath() + "agent-video-list"}>Videos</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-preferred-vendor"}>Preferred Vendors</Link>
                    </li>
                    <li>
                      <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">Xpressdocs</a>
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
      </section>
      <section class="product-sec">
        <div class="container-fluid">
          <div class="row product-row">
            <div class="col-lg-8">
              <div class="product-details">
                <table style={{ width: "100%" }}>
                  <tr class="header-box">
                    <th>Product</th>
                    <th>Product Info</th>
                    <th>Price</th>
                    <th></th>
                  </tr>

                  <tr class="product-name">
                    <td width="20%">
                      <div class="product-img">
                        <img src="images/pay-product1.jpg" />
                      </div>
                    </td>
                    <td width="50%" style={{ textAlign: "left" }}>
                      <div class="product-info">
                        <h4>House Build Core house</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </td>
                    <td width="20%">$15.00</td>
                    <td width="10%">
                      <a href="#">
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          style={{ color: "red" }}
                        ></i>
                      </a>
                    </td>
                  </tr>
                  <tr class="product-name">
                    <td width="20%">
                      <div class="product-img">
                        <img src="images/pay-product1.jpg" />
                      </div>
                    </td>
                    <td width="50%" style={{ textAlign: "left" }}>
                      <div class="product-info">
                        <h4>House Build Core house</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </td>
                    <td width="20%">$15.00</td>
                    <td width="10%">
                      <a href="#">
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          style={{ color: "red" }}
                        ></i>
                      </a>
                    </td>
                  </tr>
                  <tr class="product-name">
                    <td width="20%">
                      <div class="product-img">
                        <img src="images/pay-product1.jpg" />
                      </div>
                    </td>
                    <td width="50%" style={{ textAlign: "left" }}>
                      <div class="product-info">
                        <h4>House Build Core house</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </td>
                    <td width="20%">$15.00</td>
                    <td width="10%">
                      <a href="#">
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          style={{ color: "red" }}
                        ></i>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="pay-sec">
                <div class="pay-head">
                  <h5>Payment Details</h5>
                  <p>(Visa,MC,Amex Accepted)</p>
                </div>
                <div class="saved-tab">
                  <div class="visa-box">
                    <div class="visa-box-input">
                      <input type="radio" name="text" />
                    </div>
                    <div>
                      <h6>
                        <strong>Visa</strong>XXXX1679
                      </h6>
                      <p>Expire Date:07/2022</p>
                    </div>
                  </div>
                  <a href="#" class="cross">
                    X
                  </a>
                </div>
                <div class="saved-tab">
                  <div class="visa-box">
                    <div class="visa-box-input">
                      <input type="radio" name="text" />
                    </div>
                    <div>
                      <h6>
                        <strong>Visa</strong>XXXX1679
                      </h6>
                      <p>Expire Date:07/2022</p>
                    </div>
                  </div>
                  <a href="#" class="cross">
                    X
                  </a>
                </div>
                <div class="add-new">
                  <div class="accordion" id="accordionWithRadioExample">
                    <div class="card">
                      <div class="card-header">
                        <div class="custom-control custom-radio">
                          <input
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="customRadio1"
                          >
                            Add New
                          </label>
                        </div>
                      </div>

                      <div
                        id="collapseOne"
                        class="collapse"
                        data-parent="#accordionWithRadioExample"
                      >
                        <div class="card-body">
                          <form>
                            <div class="form-group">
                              <label>Card Type</label>
                              <select class="form-control">
                                <option>Select Card Type</option>
                                <option>Rupay</option>
                                <option>mastercard</option>
                                <option>visa</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label>Card Number</label>
                              <div class="input-group mb-2">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inlineFormInputGroup"
                                  placeholder="Valid Card Number"
                                />
                                <div class="input-group-prepend">
                                  <div class="input-group-text">
                                    <i
                                      class="fa fa-lock"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <label>Expire Date</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="MM"
                                style={{ width: "50%", display: "inline-block" }}
                              />
                              <input
                                type="text"
                                class="form-control"
                                placeholder="YY"
                                style={{ width: "50%", display: "inline-block" }}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group add-new">
                  <label>Promocode</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Promocode"
                    style={{ width: "67%", display: "inline-block" }}
                  />

                  <button type="submit" class="btn-apply">
                    Apply Now
                  </button>
                </div>
              </div>
              <div class="order-amount">
                <div class="head">
                  <p>Order Total</p>
                  <div class="amount">
                    <a href="#">$15.00</a>
                  </div>
                </div>
              </div>
              <div class="footer-btn">
                <button>Back</button>
                <button>Finalize Your Order</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
