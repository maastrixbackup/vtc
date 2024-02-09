import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { APIPath } from "../src/CommonMethods/Fetch";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./views/Home/LandingPage";
import About from "./views/Home/About";
import Contact from "./views/Home/Contact";
import PrivacyPolicy from "./views/Home/PrivacyPolicy";
import Terms from "./views/Home/Terms";
import Features from "./views/Home/Features";
import Agent from "./views/Home/Agent";
import Broker from "./views/Home/Broker";
import Pricing from "./views/Home/Pricing";
import Login from "./views/Login/Login";
import LoginAuth from "./views/Login/LoginAuth";
import BrokerLogin from "./views/Login/BrokerLogin";
import Register from "./views/Register/Register";
import AgentRegister from "./views/Register/AgentRegister";
import Associations from "./views/Home/Associations";
import PreferredVendors from "./views/Home/PreferredVendors";
import Example from "./views/Home/Example";
import Appointment from "./views/Home/Appointment";
import AssociationQuote from "./views/Home/AssociationQuote";
import Blog from "./views/Home/Blog";
import AgentDashboard from "./views/Dashboard/Agent/AgentDashboard";
import AgentVideoList from "./views/Dashboard/Agent/AgentVideoList";
import AgentImageSets from "./views/Dashboard/Agent/AgentImageSets";
import AgentSetting from "./views/Dashboard/Agent/AgentSetting";
import AgentFirstTour from "./views/Dashboard/Agent/AgentFirstTour";
import AgentFlyerList from "./views/Dashboard/Agent/AgentFlyerList";
import AgentPrefferedVendor from "./views/Dashboard/Agent/AgentPrefferedVendor";
import AgentSupport from "./views/Dashboard/Agent/AgentSupport";
import AgentPanaroma from "./views/Dashboard/Agent/AgentPanaroma";
import AgentPrivacy from "./views/Dashboard/Agent/AgentPrivacy";
import ResetPassword from "./views/Login/ResetPassword";
import EditImageSet from "./views/Dashboard/Agent/EditImageSet";
import AgentTourList from "./views/Dashboard/Agent/AgentTourList";
import AgentEditTour from "./views/Dashboard/Agent/AgentEditTour";
import AgentEditFlyer from "./views/Dashboard/Agent/AgentEditFlyer";
import AgentEditVideo from "./views/Dashboard/Agent/AgentEditVideo";
import AgentSlideShow from "./views/Dashboard/Agent/AgentSlideShow";
import AgentOrderList from "./views/Dashboard/Agent/AgentOrderList";
import AgentPendingOrderList from "./views/Dashboard/Agent/AgentPendingOrderList";
import TrafficReport from "./views/Other/TrafficReport";
import AgentFloorPlan from "./views/Dashboard/Agent/AgentFloorPlan";
import EditFloorPlan from "./views/Dashboard/Agent/EditFloorPlan";
import EditFlyerTheme from "./views/Dashboard/Agent/EditFlyerTheme";
import BrokerDashboard from "./views/Dashboard/Broker/BrokerDashboard";
import BrokerSetting from "./views/Dashboard/Broker/BrokerSetting";
import BrokerReports from "./views/Dashboard/Broker/BrokerReports";
import BrokerSupport from "./views/Dashboard/Broker/BrokerSupport";
import BrokerPrefferedVendor from "./views/Dashboard/Broker/BrokerPrefferedVendor";
import BrokerAgents from "./views/Dashboard/Broker/BrokerAgents";
import Faq from "./views/Home/Faq";
import BrokerEditAgent from "./views/Dashboard/Broker/BrokerEditAgent";
import MyCafeGellary from "./views/Dashboard/Broker/MyCafeGellary";
import BrokerTrafficReport from "./views/Dashboard/Broker/BrokerTrafficReport";
import AgentViewFlyer from "./views/Dashboard/Agent/AgentViewFlyer";
import AgentViewFlyerActive from "./views/Dashboard/Agent/AgentViewFlyerActive";
import AgentVideoSelected from "./views/Dashboard/Agent/AgentViewSelectedVideo";
import AgentEzFlashCard from "./views/Dashboard/Agent/AgentEzFlashCard";
import AgentFlyerPrint from "./views/Dashboard/Agent/AgentFlyerPrint";
import AgentFlyerTour from "./views/Dashboard/Agent/AgentFlyerTour";
import AgentViewFlyerprint from "./views/Dashboard/Agent/AgentViewFlyerPrint";
import AgentMylisting from "./views/Dashboard/Agent/AgentMyListing";
import AgentVideoNonActive from "./views/Dashboard/Agent/AgentVideoNonActice";
import Captcha from "./components/ReactTextCaptcha/Captcha";
import AgentAdminLogin from "./views/Login/AgentAdminLogin";
import AdminAsBroker from "./views/Login/AdminAsBroker";
import AgentDownloadFlyer from "./views/Dashboard/Agent/AgentDownloadFlyer";
import BrokerAsAgent from "./views/Login/BrokerAsAgent";
import PhotosAgent from "./views/Home/PhotosAgent";
import BackToBroker from "./views/Login/BackToBrokerLogin";
import SessionTimeout from "../src/CommonMethods/SessionTimeout";
import AgentEzPayment from "./views/Dashboard/Agent/AgentEzPayment";
import AgentPendingOrderDetails from "./views/Dashboard/Agent/AgentPendingOrderDetails";
import AgentOrderDetails from "./views/Dashboard/Agent/AgentOrderDetails";
import MyOfficeGallery from "./views/Dashboard/Broker/MyOfficeGallery";
import MyOfficeNonBrandedGallery from "./views/Dashboard/Broker/MyOfficeNonBrandedGallery";
import TwitterAuth from "./views/Dashboard/Agent/TwitterAuth";
// import PaymentPage from "./Home/sections/PaymentPage";
import PaymentPage from "./views/Home/sections/Appointment/PaymentPage";
import Title from "./CommonMethods/Title";
import Loader from "react-js-loader";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DragAndDrop from "./views/Dashboard/Agent/DragAndDrop";
import AdminVideoLogin from "./views/Login/AdminVideoLogin";
import MetaTags from "./components/MetaTags";

var hist = createBrowserHistory();
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AppRoutes() {
  const [loading, setLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopUp(false);
  };
  return (
    <>
      {loading ? (
        <Loader
          type="hourglass"
          bgColor={"#ffa12d"}
          title={
            "You can continue to add information to your tour while we upload the images."
          }
          color={"#ffffff"}
          size={100}
        />
      ) : (
        ""
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openPopUp}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
      <MetaTags />

      <Router history={hist} basename="/">
        <Switch>
          <PrivateRoute
            path={APIPath() + "my-non-brand-gallery/:agentId"}
            component={MyOfficeNonBrandedGallery}
          />
          <PrivateRoute
            path={APIPath() + "my-office-gallery/:agentId"}
            component={MyOfficeGallery}
          />
          <Route path={APIPath() + "dnd"} component={DragAndDrop} />
          <Route
            path={APIPath() + "order-details/:orderid/:agentId"}
            component={AgentAdminLogin}
          />
          <PrivateRoute
            path={APIPath() + "order-details/:orderid"}
            component={AgentOrderDetails}
          />
          <PrivateRoute
            path={APIPath() + "pending-order-details/:orderid"}
            component={AgentPendingOrderDetails}
          />
          <PrivateRoute
            path={APIPath() + "edit-flyer-theme/:flyerid?"}
            component={EditFlyerTheme}
          />
          <PrivateRoute
            path={APIPath() + "edit-floor-plan/:tourid?"}
            component={EditFloorPlan}
          />
          <PrivateRoute
            path={APIPath() + "view-floor-plans/:tourid?"}
            componentWithProps={
              <AgentFloorPlan
                setLoading={setLoading}
                setMessage={setMessage}
                setAlertType={setAlertType}
                setOpenPopUp={setOpenPopUp}
              />
            }
          />
          <PrivateRoute
            path={APIPath() + "site/trafficreport/:tourid?"}
            component={TrafficReport}
          />
          <PrivateRoute
            path={APIPath() + "agent-pending-order-list"}
            component={AgentPendingOrderList}
          />
          <PrivateRoute
            path={APIPath() + "agent-order-list"}
            component={AgentOrderList}
          />
          <PrivateRoute
            path={APIPath() + "agent-slide-show/:tourid?"}
            component={AgentSlideShow}
          />
          <PrivateRoute
            path={APIPath() + "agent-edit-video/:tourid?"}
            component={AgentEditVideo}
          />
          <PrivateRoute
            path={APIPath() + "agent-edit-flyer/:flyerid?"}
            component={AgentEditFlyer}
          />
          <PrivateRoute
            path={APIPath() + "agent-edit-tour/:tourid?"}
            component={AgentEditTour}
            componentWithProps={
              <AgentEditTour
                setLoading={setLoading}
                setMessage={setMessage}
                setAlertType={setAlertType}
                setOpenPopUp={setOpenPopUp}
              />
            }
          />
          <PrivateRoute
            path={APIPath() + "agent-tour-list"}
            componentWithProps={
              <AgentTourList
                setLoading={setLoading}
                setMessage={setMessage}
                setAlertType={setAlertType}
                setOpenPopUp={setOpenPopUp}
              />
            }
            // render={(props) => <AgentTourList setLoading={setLoading} {...props} /> }
          />
          <PrivateRoute
            path={APIPath() + "edit-image-set/:imagesetid?"}
            component={EditImageSet}
          />
          <PrivateRoute
            path={APIPath() + "agent-privacy"}
            component={AgentPrivacy}
          />
          <PrivateRoute
            path={APIPath() + "agent-panaroma/:tourid?"}
            component={AgentPanaroma}
          />
          <PrivateRoute
            path={APIPath() + "agent-support"}
            component={AgentSupport}
          />
          <PrivateRoute
            path={APIPath() + "agent-preferred-vendor"}
            component={AgentPrefferedVendor}
          />
          <PrivateRoute
            path={APIPath() + "agent-flyer"}
            component={AgentFlyerList}
          />
          <PrivateRoute
            path={APIPath() + "agent-first-tour"}
            component={AgentFirstTour}
          />
          <PrivateRoute
            path={APIPath() + "agent-setting/:company?"}
            component={AgentSetting}
          />
          <PrivateRoute
            path={APIPath() + "broker-setting"}
            component={BrokerSetting}
          />
          <PrivateRoute
            path={APIPath() + "agent-image-sets"}
            component={AgentImageSets}
          />
          <PrivateRoute
            path={APIPath() + "agent-video-list"}
            component={AgentVideoList}
          />
          <PrivateRoute
            path={APIPath() + "agent-dashboard/:type?"}
            component={AgentDashboard}
          />
          <PrivateRoute
            path={APIPath() + "broker-dashboard"}
            component={BrokerDashboard}
          />
          <PrivateRoute
            path={APIPath() + "broker-reports"}
            component={BrokerReports}
          />
          <PrivateRoute
            path={APIPath() + "payment-page"}
            component={PaymentPage}
          />
          <PrivateRoute
            path={APIPath() + "broker-support"}
            component={BrokerSupport}
          />
          <PrivateRoute
            path={APIPath() + "broker-preferred-vendor"}
            component={BrokerPrefferedVendor}
          />
          <PrivateRoute
            path={APIPath() + "broker-agent/:brokerid?"}
            component={BrokerAgents}
          />
          <PrivateRoute
            path={APIPath() + "broker-edit-agent/:agentid?"}
            component={BrokerEditAgent}
          />
          {/* <PrivateRoute
            path={APIPath() + "agent-view-flyer/:flyerid?"}
            component={AgentViewFlyer}
          /> */}
          <PrivateRoute
            path={APIPath() + "my-cafe-gellary/:agentId"}
            component={MyCafeGellary}
          />
          <Route
            exact
            path={APIPath() + "site/flyer/:flyerid?"}
            component={AgentViewFlyerActive}
          />
          <PrivateRoute
            exact
            path={APIPath() + "agent-download-flyer/:downladids?"}
            component={AgentViewFlyerActive}
          />
          <PrivateRoute
            path={APIPath() + "video/:videoid/"}
            component={AgentVideoSelected}
          />
          <PrivateRoute
            path={APIPath() + "agent-ezflash-card/:flashid?"}
            component={AgentEzFlashCard}
          />
          <PrivateRoute
            path={APIPath() + "agent-flyer-active-print/:printids?"}
            component={AgentViewFlyerActive}
          />
          <PrivateRoute
            path={APIPath() + "agent-flyer-print/:printids?"}
            component={AgentViewFlyerprint}
          />
          <PrivateRoute
            path={APIPath() + "agent-my-listing/:listingId?"}
            component={AgentMylisting}
          />
          <PrivateRoute
            path={APIPath() + "agent-flyer-tour/:flyertourid?"}
            component={AgentFlyerTour}
          />
          <PrivateRoute
            path={APIPath() + "agent-video-non-active/:videoId?"}
            component={AgentVideoNonActive}
          />
          <Route
            path={APIPath() + "broker-traffic-report"}
            component={BrokerTrafficReport}
          />
          <PrivateRoute
            path={APIPath() + "agent-panoroma"}
            component={AgentPanaroma}
          />
          <Route
            path={APIPath() + "reset-password/:id?"}
            component={ResetPassword}
          />
          <PrivateRoute
            path={APIPath() + "ezpricingpage"}
            component={AgentEzPayment}
          />
          <Route
            path={APIPath() + "twitterauth/:auth?"}
            component={TwitterAuth}
          />
          <Route path={APIPath() + "faq"} component={Faq} />
          <Route path={APIPath() + "blogs"} component={Blog} />
          <Route
            path={APIPath() + "association-quote"}
            component={AssociationQuote}
          />
          <Route path={APIPath() + "appointment"} component={Appointment} />
          <Route path={APIPath() + "example"} component={Example} />
          <Route
            path={APIPath() + "preferred-vendors"}
            component={PreferredVendors}
          />
          <Route path={APIPath() + "association"} component={Associations} />
          <Route
            path={APIPath() + "agent-register"}
            component={AgentRegister}
          />
          <Route path={APIPath() + "register"} component={Register} />
          <Route path={APIPath() + "login"} component={LoginAuth} />
          <Route path={APIPath() + "agent-login"} component={Login} />
          <Route path={APIPath() + "broker-login"} component={BrokerLogin} />
          <Route path={APIPath() + "pricing"} component={Pricing} />
          <Route path={APIPath() + "broker"} component={Broker} />
          <Route path={APIPath() + "agent"} component={Agent} />
          <Route path={APIPath() + "features"} component={Features} />
          <Route path={APIPath() + "terms-and-conditions"} component={Terms} />
          <Route
            path={APIPath() + "privacy-policy"}
            component={PrivacyPolicy}
          />
          <Route path={APIPath() + "contact-us"} component={Contact} />
          <Route path={APIPath() + "about-us"} component={About} />
          <Route path={APIPath() + "captcha"} component={Captcha} />
          <Route
            path={APIPath() + "admin-as-agent/:agentId?"}
            component={AgentAdminLogin}
          />
          <Route
            path={APIPath() + "admin-as-agent-mobile/:agentId?/:videoId?"}
            component={AgentAdminLogin}
          />
          <Route
            path={APIPath() + "admin-as-broker/:brokerId?"}
            component={AdminAsBroker}
          />
          <Route
            path={APIPath() + "broker-as-agent/:agentId?"}
            component={BrokerAsAgent}
          />
          <Route
            path={APIPath() + "back-to-broker/:brokerId?"}
            component={BackToBroker}
          />
          <Route path={APIPath() + "photos-agent"} component={PhotosAgent} />
          <Route path={APIPath()} exact component={LandingPage} />
        </Switch>
        <SessionTimeout loading={loading} history={hist}></SessionTimeout>
      </Router>
    </>
  );
}
