import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import broker_banner from "../../../images/broker-banner1.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import tours from "../../../images/tours.jpg";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import AgentHeader from "../Header/AgentHeader";
import BrokerHeader from "../Header/BrokerHeader";
import { Link, useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Title from "../../../CommonMethods/Title";
const APIGetDashboardData = APIURL() + "agent-dashboard";
const APIBrokerDashBoard = APIURL() + "get-mycafe";
const APISaveAgentCreate = APIURL() + "agent-create";
const CheckMail = APIURL() + "check-email";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function BrokerDashboard() {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [marketingData, setMarketingData] = useState({});
  const [marketingDataImage, SetMarketingDataImage] = useState({});
  const [mostViewed, SetMostViewed] = useState({});
  const [recentOfficeTour, SetRecentOfficeTour] = useState({});
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openCreateAgents, setOpenCreateAgents] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [sync, setSync] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [inputErrors, setinputErrors] = useState({
    fname: "blank",
    lname: "blank",
    email: "blank",
    cnfemail: "blank",
    fname_error: "",
    lname_error: "",
    email_error: "",
    cnfemail_error: "",
  });
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  function validateinp() {
    agentData.fname == "" || !agentData.fname
      ? setinputErrors((prevState) => ({
          ...prevState,
          fname: "error",
          fname_error: "First name cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          fname: "",
          fname_error: "",
        }));
    agentData.lname == "" || !agentData.lname
      ? setinputErrors((prevState) => ({
          ...prevState,
          lname: "error",
          lname_error: "Last name cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          lname: "",
          lname_error: "",
        }));
    agentData.email == "" || !agentData.email
      ? setinputErrors((prevState) => ({
          ...prevState,
          email: "error",
          email_error: "E-Mail Id cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          email: "",
          email_error: "",
        }));
    agentData.cnfemail == "" ||
    agentData.cnfemail != agentData.email ||
    !agentData.cnfemail
      ? setinputErrors((prevState) => ({
          ...prevState,
          cnfemail: "error",
          cnfemail_error: "E-Mail Confirmation does not match",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          cnfemail: "",
          cnfemail_error: "",
        }));
  }
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
        brokerid: JSON.parse(context.state.user).user_id,
      };
      // postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/get-mycafe", objusr)
      postRecord(APIBrokerDashBoard, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          // setDashboardData(res.data[0].response.data.agent_profile);
          setDashboardData(res.data[0].response);
          setMarketingData(res.data[0].response.More_Marketing_Services[0]);
          SetMarketingDataImage(
            res.data[0].response.More_Marketing_Services[0]
          );
          SetMostViewed(res.data[0].response.Most_Viewed[0]);
          SetRecentOfficeTour(res.data[0].response.Recent_Office_Tours[0]);
        }
      });
    }
  }, [context.state.user]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value });
  };
  const handleCheckBoxChange = (event) => {
    const Check = event.target.checked === true ? 1 : 0;
    setAgentData({ ...agentData, emailChk: Check });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  // const [currentUser, setCurrentUser] = useState({});
  // const [dashboardData, setDashboardData] = useState({});
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
  //         postRecord(APIGetUserData, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     setCurrentUser(res.data[0].response.data.agent_profile);
  //                 }
  //             });
  //     }
  // }, [context.state.user]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", agent_id: JSON.parse(context.state.user).agentId };
  //         postRecord(APIGetDashboardData, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     setDashboardData(res.data[0].response.data.agent_profile);
  //                 }
  //             });
  //     }
  // }, [context.state.user]);
  // console.log(agentData);
  const checkEmail = async (e) => {
    var response = "";
    response = await fetch(
      CheckMail,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authenticate_key: "abcd123XYZ",
          email: e.target.value,
        }),
      }
    );
    response = await response.json();
    if (response[0].response.status == "error") {
      setinputErrors((prevState) => ({
        ...prevState,
        email: "error",
        email_error: "E-Mail Already Exists",
      }));
    } else {
      setinputErrors((prevState) => ({
        ...prevState,
        email: "",
        email_error: "",
      }));
    }
  };
  const saveAgentData = (event) => {
    if (
      inputErrors.fname !== "" ||
      inputErrors.lname !== "" ||
      inputErrors.email !== "" ||
      inputErrors.cnfemail !== ""
    )
      return;
    // console.log('working');
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      fname: agentData.fname,
      lname: agentData.lname,
      email: agentData.email,
      emailChk: agentData.emailChk,
    };
    setOpen(true);

    postRecord(APISaveAgentCreate, objusr)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpenCreateAgents(false);
          event.target.reset();
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(true);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const goToImageSet = () => {
    history.push(APIPath() + "broker-agent");
  };
  return (
    <div>
      <Title title="Broker Dashboard" />
      {/* <AgentHeader /> */}
      <BrokerHeader setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + broker_banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li >
                      <Link class="active" to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
                    </li>
                  </ul>
                  <div class="gee_mobile">
                    <button onClick={() => ShowMenu()} class="gee_hamburger">
                      &#9776;
                    </button>
                    <button onClick={() => HideMenu()} class="gee_cross">
                      &#735;
                    </button>
                  </div>
                </div>
                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>Reports</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vtc_btm_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_btm_menu_sec">
                  <ul>
                    <li>{currentUser.paymentOption} - {currentUser.activeTours} Active Tours</li>
                    <li>Ala-Carte - Available Credits {currentUser.credits} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="getting_started">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="getting_started_main">
                <div class="row">
                  <div class="col-lg-4 col-md-4">
                    <a href="#" data-toggle="modal" data-target="#get_start">
                      <div class="getting_started_single">
                        <div class="getting_started_single_img">
                          <i class="fas fa-paper-plane"></i>
                        </div>
                        <span class="no_sec">01</span>
                        <div class="getting_started_single_cont">
                          <h5>Getting Started</h5>
                          <h6>Get Some quick Tips</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <a
                      href="javascript:void()"
                      onClick={() => setOpenCreateAgents(true)}
                    >
                      <div class="getting_started_single bg_blue" id="showmenu">
                        <div class="getting_started_single_img">
                          <i class="fas fa-map-marked"></i>
                        </div>
                        <span class="no_sec">02</span>
                        <div class="getting_started_single_cont">
                          <h5>Your First Step</h5>
                          <h6>Create Agent</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <a href="javascript:void()" onClick={goToImageSet}>
                      <div class="getting_started_single">
                        <div class="getting_started_single_img">
                          <i class="fas fa-cogs"></i>
                        </div>
                        <span class="no_sec">03</span>
                        <div class="getting_started_single_cont">
                          <h5>Advanced Settings</h5>
                          <h6>MANAGE AGENTS</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="getting_started">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="getting_started_main">
                <div class="row">
                  <div class="col-lg-4 col-md-4">
                    <div class="getting_started_single">
                      {/* <div class="getting_started_single_img">
                                                <i class="far fa-hand-point-up"></i>
                                            </div> */}
                      <span class="no_sec"></span>
                      <div class="getting_started_single_cont">
                        <h5>
                          Payment Type-
                          {Object.keys(dashboardData).length > 0 ? (
                            dashboardData.data.paymenttype
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </h5>
                        {/* <h6>Get Some quick Tips</h6> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <div class="getting_started_single bg_blue">
                      {/* <div class="getting_started_single_img">
                                                <i class="fas fa-map-marked"></i>
                                            </div> */}
                      <span class="no_sec"></span>
                      <div class="getting_started_single_cont">
                        <h5>
                          Subscription Active -{" "}
                          {Object.keys(dashboardData).length > 0 ? (
                            dashboardData.data.subscriptionactive
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </h5>
                        {/* <h6>EASY STEPS 1-2-3</h6> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <div class="getting_started_single">
                      {/* <div class="getting_started_single_img">
                                                <i class="fas fa-cogs"></i>
                                            </div> */}
                      <span class="no_sec"></span>
                      <div class="getting_started_single_cont">
                        <h5>
                          Agent Count-
                          {Object.keys(dashboardData).length > 0 ? (
                            dashboardData.data.agentcount
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </h5>
                        {/* <h6>MANAGE IMAGESETS</h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="virtual_stagging">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mx-auto">
                            <div class="virtual_stagging_main">
                                {Object.keys(dashboardData).length > 0 ? (
                                    <div
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                dashboardData.mycafemessage
                                        }}
                                    >
                                    </div>
                                ) : (
                                    <Skeleton variant="text" width={550} height={175} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                )}
                              
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <section class="vtc_agent_profile">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="vtc_agent_profile_main">
                <div class="row">
                  <div class="col-lg-9 col-md-12">
                    <div class="vtc_agent_profile_left">
                      <div class="vtc_agent_profile_left_cont">
                        <h2>More Marketing Services</h2>
                        {Object.keys(marketingData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: marketingData.description,
                            }}
                          ></div>
                        ) : (
                          <Skeleton
                            variant="text"
                            width={550}
                            height={175}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-12">
                    <div class="vtc_agent_profile_right">
                      {/* <img src={ava_img} alt="" title="" /> */}
                      {Object.keys(marketingDataImage).length > 0 ? (
                        <img src={marketingDataImage.logoImagePath} />
                      ) : (
                        <Skeleton
                          variant="text"
                          height={20}
                          style={{ background: "#bbbbbb" }}
                        />
                      )}
                      <div class="right_prof_cont">
                        <h5>
                          {Object.keys(marketingDataImage).length > 0 ? (
                            <h5>{marketingDataImage.company}</h5>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </h5>
                        <h6>
                          {Object.keys(marketingDataImage).length > 0 ? (
                            <h6>{marketingDataImage.phone}</h6>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="top_ten_tour">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="our_partners_head">
                <h2>Most Viewed</h2>
              </div>
              <div class="recent_projects_tabs">
                <div class="tab_img">
                  <div class="row">
                    <div class="col-lg-4 col-md-4">
                      <div class="recent_projects_tabs_img">
                        {Object.keys(mostViewed).length > 0 ? (
                          <img src={mostViewed.filepath} />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={150}
                            height={20}
                            style={{ background: "#bbbbbb" }}
                          />
                        )}
                        <div class="recent_projects_tabs_img_conts">
                          {Object.keys(mostViewed).length > 0 ? (
                            <a href={mostViewed.link} target="_blank">
                              <div class="recent_projects_tabs_img_conts_inner">
                                <span class="link_icn">
                                  <i class="fas fa-link"></i>
                                </span>
                                <h4>Tours</h4>
                                <h5>{mostViewed.value}</h5>
                              </div>
                            </a>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
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
        </div>
      </section>
      <section class="top_ten_tour">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="our_partners_head">
                <h2>Recent Office Tour</h2>
              </div>
              <div class="recent_projects_tabs">
                <div class="tab_img">
                  <div class="row">
                    <div class="col-lg-4 col-md-4">
                      <div class="recent_projects_tabs_img">
                        {Object.keys(mostViewed).length > 0 ? (
                          <img src={recentOfficeTour.filepath} />
                        ) : (
                          <Skeleton
                            variant="text"
                            width={150}
                            height={20}
                            style={{ background: "#bbbbbb" }}
                          />
                        )}
                        <div class="recent_projects_tabs_img_conts">
                          {Object.keys(recentOfficeTour).length > 0 ? (
                            //     <a href={recentOfficeTour.link} target="_blank">
                            //     <div class="recent_projects_tabs_img_conts_inner">
                            //         <span class="link_icn">
                            //             <i class="fas fa-link"></i>
                            //         </span>
                            //         <h4>Tours</h4>
                            //         <h5>{mostViewed.value}</h5>
                            //     </div>
                            // </a>
                            <div class="recent_projects_tabs_img_conts_inner">
                              <span class="link_icn">
                                <i class="fas fa-link"></i>
                              </span>
                              <h4>Tours</h4>
                              <h5>{recentOfficeTour.value}</h5>
                            </div>
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
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
        </div>
      </section>
      <BrokerFooter />
      <div class="agent_pop">
        <div id="get_start" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  <i class="fab fa-telegram-plane"></i> Getting Started
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_pop_main_head">
                    <h5>Welcome to VirtualTourCafe!</h5>
                  </div>
                  <div class="wlcm_sec">
                    <p>
                      To help you get started, please download the documents
                      below so you have them available when working on your
                      tours. Next, watch our short{" "}
                      <span>"Getting Started Video"</span> which will take you
                      step-by-step through the process of creating your first
                      tour and distributing it to the world!
                    </p>
                    <p>
                      And remember, we offer unlimited personal training so
                      don't hesitate to contact us if you have any questions or
                      need any help.
                    </p>
                    <p>
                      <strong>Call Toll Free :</strong> 877-744-8285
                    </p>
                    <p>
                      <strong>Email Us :</strong> support@virtualtourcafe.com
                    </p>
                    <button type="button" class="next_btn">
                      Help Center
                    </button>
                    <p class="padd_top">
                      Click <span>"PLAY"</span> to watch our short Getting
                      Started Video
                    </p>
                    <div class="wlcm_video_sec">
                      <video width="100%" height="350" controls autoplay>
                        <source
                          src="https://virtualtourcafe.com/videos/VTC_Getting_Started_Video_2017.mp4"
                          type=""
                        />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="">Save</button>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openCreateAgents}
      >
        <DialogTitle id="customized-dialog-title">
          Create Agent
          <CancelIcon
            onClick={() => setOpenCreateAgents(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                validateinp();
                saveAgentData(event);
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      First Name{" "}
                    </label>
                    <input
                      type="text"
                      name="fname"
                      value={agentData.fname}
                      onChange={handleInputChange}
                      onKeyUp={(e) =>
                        e.target.value.length > 0
                          ? (e.target.classList.add("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              fname: "",
                              fname_error: "",
                            })))
                          : (e.target.classList.remove("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              fname: "error",
                              fname_error: "First name cannot be blank",
                            })))
                      }
                      className={
                        inputErrors.fname == "error"
                          ? "form-control inperror"
                          : "form-control"
                      }
                    />
                    <p style={{ color: "red" }}>{inputErrors.fname_error}</p>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      {" "}
                      Last Name{" "}
                    </label>
                    <input
                      type="text"
                      name="lname"
                      value={agentData.lname}
                      onKeyUp={(e) =>
                        e.target.value.length > 0
                          ? (e.target.classList.add("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              lname: "",
                              lname_error: "",
                            })))
                          : (e.target.classList.remove("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              lname: "error",
                              lname_error: "Last name cannot be blank",
                            })))
                      }
                      onChange={handleInputChange}
                      className={
                        inputErrors.lname == "error"
                          ? "form-control inperror"
                          : "form-control"
                      }
                    />
                    <p style={{ color: "red" }}>{inputErrors.lname_error}</p>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      onBlur={(e) => checkEmail(e)}
                      value={agentData.email}
                      onChange={handleInputChange}
                      onKeyUp={(e) =>
                        regex.test(e.target.value)
                          ? (e.target.classList.add("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              email: "",
                              email_error: "",
                            })))
                          : (e.target.classList.remove("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              email_error: "Please Enter A Valid Email",
                            })))
                      }
                      className={
                        inputErrors.email == "error"
                          ? "form-control inperror"
                          : "form-control"
                      }
                    />
                    <p style={{ color: "red" }}>{inputErrors.email_error}</p>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      Confirm Email{" "}
                    </label>
                    <input
                      type="email"
                      name="cnfemail"
                      value={agentData.cnfemail}
                      onChange={handleInputChange}
                      onKeyUp={(e) =>
                        e.target.value === agentData.email
                          ? (e.target.classList.add("success"),
                            e.target.classList.remove("inperror"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              cnfemail: "",
                              cnfemail_error: "",
                            })))
                          : (e.target.classList.remove("success"),
                            setinputErrors((prevState) => ({
                              ...prevState,
                              cnfemail: "error",
                              cnfemail_error:
                                "E-Mail Confirmation  Does Not match",
                            })))
                      }
                      className={
                        inputErrors.cnfemail == "error"
                          ? "form-control inperror"
                          : "form-control"
                      }
                    />
                    <p style={{ color: "red" }}>{inputErrors.cnfemail_error}</p>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <input
                      type="checkbox"
                      name="emailChk"
                      value={agentData.emailChk}
                      onChange={handleCheckBoxChange}
                      style={{ marginTop: "10px" }}
                    />{" "}
                    Do Not Send Welcome Email
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12 text-center">
                  <button
                    style={{ border: "#ffa124" }}
                    type="submit"
                    class="need_pic save_btn"
                  >
                    Save<i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openWarning}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
