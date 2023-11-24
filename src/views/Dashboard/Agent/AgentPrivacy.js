import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import banner from "../../../images/vtc-banner.jpg";
import profile from "../../../images/profile.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import tours from "../../../images/tours.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
const APIGetUserData = APIURL() + "user-details";
export default function AgentFlyerList() {
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
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
      const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
      postRecord(APIGetUserData, objusr)
        .then(res => {
          if (res.data[0].response.status === "success") {
            setCurrentUser(res.data[0].response.data.agent_profile);
          }
        });
    }
  }, [context.state.user]);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  };
  return (
    <div>
      <AgentHeader />
      <section class="vtc_agent_banner" style={{ backgroundImage: "url(" + banner + ")" }}>
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
        <div class="banner-title"><h2>VirtualTourCafe, LLC Privacy Policy</h2>
        </div>
      </section>
      <section class="commonpage">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
              <p>VirtualTourCafe, LLC ("VirtualTourCafe") wants to take this opportunity to share its online privacy policy with you. Please read this policy carefully in its entirety. </p>
              <p>This policy may be modified periodically in order to continue conforming to applicable law and best practices. Please refer back to this document from time to time to ensure that you are aware of any changes or modifications, as that information will be available in this location.</p>
              <h4>Privacy Expectations</h4>
              <p>We understand that you have a right to privacy and we take that seriously. We take great strides to ensure that your personal information will remain private and as safe as possible.</p>

              <h4>Information Collected</h4>
              <p>We collect information from you at various stages, such as when you register on our site or fill out a form. Other types of information we may collect from you include: </p>

              <ul>
                <li> applications</li>
                <li> emails you send to us and receive from us;</li>
                <li> transactions you engage in with us;</li>
                <li> other forms of customer information that could prove useful for our business or to better serve you.</li>
              </ul>

              <h4>What we use the information for:</h4>

              <p>Information collected from you can be used in the following manner:</p>

              <ul>
                <li> in order to customize your experience, tailoring our service to your individual needs;</li>
                <li> improving our website and other materials;</li>
                <li> providing better customer service;</li>
                <li> processing transactions;</li>
                <li> to stay in contact with you;</li>
                <li> if required to disclose your personal information because of a court order or due to federal, state, or local law, we will disclose only the required information.</li>
              </ul>

              <p> Your information will NEVER be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering your specified service. </p>

              <h4>Information Protection:</h4>
              <p>Because we value your privacy, we have security measures in place to maintain your personal information.</p>

              <h4>Information Disclosure:</h4>
              <p>As mentioned, we do not sell, trade, or transfer your information to outside parties, aside from trusted third parties who assist us in maintaining and otherwise operating our business and providing excellent customer service to you.</p>

              <h4>Third Party Links from Our Site:</h4>

              <p>From time to time, we may highlight or offer third party opportunities, services, and products on our website. These third parties are not covered by our policies regarding privacy, terms and conditions, etc. Therefore, we are not responsible or liable for the content or activities provided by these sites. </p>
              <p>If you have any questions regarding this Privacy Policy, please contact us at: <a href="mailto:Policy@VirtualTourCafe.com "> Policy@VirtualTourCafe.com </a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  )
}