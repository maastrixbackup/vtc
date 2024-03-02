import React, { useState, useEffect, useContext, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../images/vtc-logo2.png";
import user from "../../../images/user.jpg";
import Slider from "react-rangeslider";
import Switch from "react-switch";
import ImageUploader from "react-images-upload";
import profile1 from "../../../images/profile1.jpg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button, ButtonGroup } from "@material-ui/core";
import banner from "../../../images/vtc-banner.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import { confirmAlert } from "react-confirm-alert";
import { Link, useHistory } from "react-router-dom";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import BrokerHeader from "../Header/BrokerHeader";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { CSVLink } from "react-csv";
import vtclogo from "../../../images/vtc-logo2.png";
import ReactPaginate from "react-paginate";
import Title from "../../../CommonMethods/Title";
const APIGetUserData = APIURL() + "user-details";
const APISaveCompanyInfo = APIURL() + "save-Company-Info";
const APIGetCountryList = APIURL() + "get-CountryList";
const APIGetStateList = APIURL() + "get-StateList";
const APISaveAccountInfo = APIURL() + "save-Account-Info";
const APISaveContactInfo = APIURL() + "save-Contact-Info";
const APIGetAgenetData = APIURL() + "agent-List";
const APIGetAgentNeverList = APIURL() + "agent-NeverList";
const APIGetLoadTourList = APIURL() + "load-TourList";
const APIGetDistributeToYOutube = APIURL() + "distribute-ToYoutube";
const APIGetTrafficReport = APIURL() + "trafficreportcontent-Broker";
const APISendMail = APIURL() + "send-TrafficReport";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 99991111,
    color: "#fff",
  },
}));
export default function BrokerReports() {
  const initialTrafficState = {
    reportrecipients: "",
    emailtrafficreport: "",
  };
  let history = useHistory();
  const context = useContext(AuthContext);
  const classNamees = useStyles();
  const mediainputRef = useRef();
  const { dispatch } = useContext(AuthContext);
  const [companyInfoData, setCompanyInfoData] = useState({});
  const [sync, setSync] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [music, setMusic] = useState("");
  const [open, setOpen] = useState(false);
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [agentData, setAgentData] = useState({});
  const [agentGetData, setAgentGetdata] = useState([]);
  const [agentNeverData, setAgentNeverData] = useState({});
  const [agentNeverSignIn, setAgentNeverSignIn] = useState([]);
  const [id, setId] = useState("");
  const [element, setElement] = useState("");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openTrafficReport, setOpenTrafficReport] = useState(false);
  const [trafficData, setTrafficData] = useState(initialTrafficState);
  const [DistributeYoutube, setDistributeYoutube] = useState({});
  const [DistributeYoutubeData, setDistributeYoutubeData] = useState([]);
  const [youtubeData, setYoutubeData] = useState(false);
  const [loadTourListDat, SetTourListData] = useState([]);
  const [trafficEmail, setTrafficeEmail] = useState("");
  const APISaveTrafficReport = APIURL() + "save-TrafficEmail";
  const [hover, setHover] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
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
      const objuser = {
        authenticate_key: "abcd123XYZ",
        BrokerId: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetTrafficReport, objuser).then((res) => {
        if (res.data[0].response.status === "success") {
          setTrafficeEmail(res.data[0].response.data.BrokerDetails[0].email);
        }
      });
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      // postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/agent-List", objusr)
      postRecord(APIGetAgenetData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setAgentData(res.data[0].response);
          setAgentGetdata(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetAgentNeverList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setAgentNeverSignIn(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetLoadTourList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          SetTourListData(res.data[0].response.list);
        }
      });
    }
  }, [context.state.user, sync]);
  const agent = agentGetData;

  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", brokerid: JSON.parse(context.state.user).user_id, month: DistributeYoutube.month, year: DistributeYoutube.year };
  //         postRecord(APIGetDistributeToYOutube,objusr)
  //         .then(res=>{
  //         })
  //     }
  // }, [context.state.user, sync])

  const headers = [
    {
      label: "Name",
      key: "fname",
    },
    {
      label: "Email ID",
      key: "email",
    },
    {
      label: "Address",
      key: "address",
    },
  ];

  const csvLink = {
    headers: headers,
    data: agent,
    filename: "Agent.csv",
  };

  const loadData = loadTourListDat;
  const headersValues = [
    {
      label: "Sr.no",
      key: "fname",
    },
    {
      label: "Tour No",
      key: "id",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Agent Name",
      key: "fullname",
    },
    {
      label: "status",
      key: "active_sts",
    },
    {
      label: "Distribute",
      key: "distributed",
    },
  ];
  const csvLink1 = {
    headers: headersValues,
    data: loadData,
    filename: "AgentTourList.csv",
  };
  const headersValues2 = [
    {
      label: "Sr.no",
      key: "fname",
    },
    {
      label: "Tour No",
      key: "id",
    },

    {
      label: "Agent Name",
      key: "fullname",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Services",
      key: "active_sts",
    },
    {
      label: "Distribute",
      key: "isactive",
    },
  ];
  const csvLink2 = {
    headers: headersValues2,
    data: loadData,
    filename: "AgentServiceList.csv",
  };
  const handleImageSetId = (data) => {
    var div = document.getElementById("myDiv" + data.id);
    if (element !== "") {
      element.classNameList.remove("active");
    }
    if (element === div) {
      div.classNameList.remove("active");
      setElement("");
      setId("");
    } else {
      div.classNameList.add("active");
      setElement(div);
      setId(data.id);
    }
  };
  const handleTrafficChange = (nextChecked) => {
    setTrafficData({ ...trafficData, ["emailtrafficreport"]: nextChecked });
  };
  const handleTrafficInputChange = (event) => {
    const { name, value } = event.target;
    // setTrafficData({ ...trafficData, [name]: value });
    setTrafficeEmail(event.target.value);
    setTrafficData({
      ...trafficData,
      ["reportrecipients"]: event.target.value,
    });
  };
  const AgentPrint = () => {
    var printContent = document.getElementById("printcontainer");
    var WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };
  const YoutubePrint = () => {
    var printContent = document.getElementById("Youtube");
    var WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };
  const AgentNeverLoginPrint = () => {
    var printContent = document.getElementById("agentneverlogin");
    var WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };
  const ViewReport = () => {
    history.push(APIPath() + "broker-traffic-report");
  };
  const sendMail = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      text: trafficEmail,
    };
    postRecord(APISendMail, obj)
      .then((res) => {
        console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          trafficData.reportrecipients = "";
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleMonthChange = (event) => {
    const { name, value } = event.target;

    setDistributeYoutube({ ...DistributeYoutube, [name]: value });
  };
  const HandleYearChange = (event) => {
    const { name, value } = event.target;
    setDistributeYoutube({ ...DistributeYoutube, [name]: value });
  };
  const SearchFilter = () => {
    youTubeSetting();
  };
  const youTubeSetting = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      month: DistributeYoutube.month,
      year: DistributeYoutube.year,
    };
    if (
      DistributeYoutube.month == 0 ||
      !DistributeYoutube.month ||
      !DistributeYoutube.year ||
      DistributeYoutube.year == 0
    ) {
      setMessage("Please select a month and a year");
      setOpenError(true);
      return;
    }
    postRecord(APIGetDistributeToYOutube, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setDistributeYoutubeData(res.data[0].response.data);
          setYoutubeData(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveTrafficData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      txtEmail: trafficData.reportrecipients,
      emailStatus: trafficData.emailtrafficreport,
    };
    postRecord(APISaveTrafficReport, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Traffic Report Data updated successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.msg);
          setOpenError(true);
        }
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  function changeHover(e) {
    setHover(true);
  }
  return (
    <div>
      <Title title="Broker Reports" />
      <BrokerHeader setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <section
        className="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div className="vtc_top_menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="vtc_agent_menu_top">
                  <ul>
                    <li>
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
                    <li className="active">
                      <Link class="active" to={APIPath() + "broker-reports"}>
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

                  <div className="gee_mobile">
                    <button
                      onClick={() => ShowMenu()}
                      className="gee_hamburger"
                    >
                      &#9776;
                    </button>
                    <button onClick={() => HideMenu()} className="gee_cross">
                      &#735;
                    </button>
                  </div>
                </div>
                <div className="gee_menu">
                  <ul>
                    <li className="active">
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
                      <Link class="active" to={APIPath() + "broker-reports"}>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vtc_btm_menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="vtc_btm_menu_sec">
                  <ul>
                    <li>{currentUser.paymentOption} - {currentUser.activeTours} Active Tours</li>
                    <li>Ala-Carte - Available Credits {currentUser.credits} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-title">
          <h2>Office Reports</h2>
        </div>
      </section>
      <section
        className="property_info toggle_sec"
        style={{ display: "block" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 mx-auto">
              <div className="our_partners_head">
                <h2>Office Report</h2>
              </div>
              <nav className="navbar navbar-expand-lg navbar-light  navbar-blue">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li
                      className="nav-item dropdown"
                      onMouseLeave={(e) => setHover(false)}
                      onMouseEnter={changeHover}
                    >
                      <a
                        className="nav-link nav-new-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-image"></i> Office Report
                      </a>
                      <div
                        className={
                          hover ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul className="column-count-2">
                          <li>
                            <a
                              className="dropdown-item"
                              data-toggle="tab"
                              href="#AgentList"
                              role="tab1"
                            >
                              <i className="fas fa-user"></i> Agent List
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              data-toggle="tab"
                              href="#AgentNeverSignIn"
                              role="tab1"
                            >
                              <i className="fas fa-mail-bulk"></i> Agent List
                              Never Signed in
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              data-toggle="tab"
                              href="#Tourlist"
                              role="tab1"
                            >
                              <i className="far fa-credit-card"></i> Tour List
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              data-toggle="tab"
                              href="#TourServices"
                              role="tab1"
                            >
                              <i className="fas fa-video"></i> Tour Services
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => setOpenTrafficReport(true)}
                              role="tab1"
                            >
                              <i className="fas fa-paste"></i> Traffic Report{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              data-toggle="tab"
                              href="#DistributeYoutube"
                              role="tab1"
                            >
                              <i className="fab fa-youtube"></i> Distributed to
                              Youtube
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="property_info_cont" id="demo">
                <section id="examples" className="snap-scrolling-example">
                  {/* <div
                    id="content-1"
                    className="content horizontal-images tab_main"
                  >
                    <ul className="nav nav-tabs list_sec" role="tablist1">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#AgentList"
                          role="tab1"
                        >
                          <span>
                            <i className="fas fa-user"></i>
                          </span>
                          Agent List
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#AgentNeverSignIn"
                          role="tab1"
                        >
                          <span>
                            <i className="fas fa-mail-bulk"></i>
                          </span>
                          Agent List Never Signed in
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#Tourlist"
                          role="tab1"
                        >
                          <span>
                            <i className="far fa-credit-card"></i>
                          </span>
                          Tour List
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#TourServices"
                          role="tab1"
                        >
                          <span>
                            <i className="fas fa-video"></i>
                          </span>
                          Tour Services
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => setOpenTrafficReport(true)}
                          role="tab1"
                        >
                          <span>
                            {" "}
                            <i className="fas fa-paste"></i>{" "}
                          </span>
                          Traffic Report{" "}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#DistributeYoutube"
                          role="tab1"
                        >
                          <span>
                            <i className="fab fa-youtube"></i>
                          </span>{" "}
                          Distributed to Youtube
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div className="tab-content">
                    <div
                      className="browse_img tab-pane active"
                      id="AgentList"
                      role="tabpanel"
                    >
                      <div className="browse_img_conts_main">
                        <div className="row">
                          <div className="col-md-12 formbox1">
                            <div style={{ marginTop: "20px" }}>
                              <CSVLink {...csvLink}>
                                <Button
                                  style={{
                                    backgroundColor: "#ffa12d",
                                    height: "40px",
                                    color: "whitesmoke",
                                    marginRight: "10px",
                                  }}
                                >
                                  {" "}
                                  <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                  ></i>
                                  Download
                                </Button>
                              </CSVLink>
                              <Button
                                onClick={() => AgentPrint()}
                                style={{
                                  backgroundColor: "#2d3e50",
                                  height: "40px",
                                  color: "whitesmoke",
                                }}
                              >
                                <i className="fa fa-print" aria-hidden="true">
                                  Print
                                </i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="profile_listing_main">
                              <div className="row">
                                {Object.keys(agentData).length > 0
                                  ? agentGetData.map((res) => (
                                      <div
                                        onClick={() => {
                                          setId(res.id);
                                          handleImageSetId(res);
                                        }}
                                        className="col-lg-4 col-md-4"
                                      >
                                        <div
                                          id={"myDiv" + res.id}
                                          className="profile_listing_single"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="profile_listing_single_inner">
                                            <div className="socila_avatar">
                                              <div className="socila_avatar_img">
                                                <img
                                                  className=""
                                                  alt="image"
                                                  src={res.src}
                                                />
                                              </div>
                                              <div className="socila_avatar_cont">
                                                <h6>
                                                  {res.fname} {res.lname}
                                                </h6>
                                                <p>
                                                  Active Tour:{res.is_autotour}
                                                </p>
                                                <p>Email:{res.email}</p>
                                              </div>
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
                    </div>
                    <div
                      className="tab-pane"
                      id="AgentNeverSignIn"
                      role="tabpanel"
                    >
                      <div className="filter_sec">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <Button
                              onClick={() => AgentNeverLoginPrint()}
                              style={{
                                backgroundColor: "#2d3e50",
                                height: "40px",
                                color: "whitesmoke",
                              }}
                            >
                              <i className="fa fa-print" aria-hidden="true">
                                Print
                              </i>
                            </Button>
                            <div className="profile_listing_main">
                              <div className="row">
                                {agentNeverSignIn.length > 0
                                  ? agentNeverSignIn.map((res) => (
                                      <div
                                        onClick={() => {
                                          setId(res.id);
                                          handleImageSetId(res);
                                        }}
                                        className="col-lg-4 col-md-4"
                                      >
                                        <div
                                          id={"myDiv" + res.id}
                                          className="profile_listing_single"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="profile_listing_single_inner">
                                            <div className="socila_avatar">
                                              <div className="socila_avatar_img">
                                                <img
                                                  className=""
                                                  alt="image"
                                                  src={res.src}
                                                />
                                              </div>
                                              <div className="socila_avatar_cont">
                                                <h6>
                                                  {res.fname} {res.lname}
                                                </h6>
                                                <p>
                                                  Active Tour:{res.is_autotour}
                                                </p>
                                                <p>Email:{res.email}</p>
                                              </div>
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
                    </div>
                    <div
                      className="tab-pane"
                      id="AgentNeverSignIn"
                      role="tabpanel"
                    >
                      <div className="filter_sec">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="profile_listing_main">
                              <div className="row">
                                {Object.keys(agentData).length > 0
                                  ? agentGetData.map((res) => (
                                      <div
                                        onClick={() => {
                                          setId(res.id);
                                          handleImageSetId(res);
                                        }}
                                        className="col-lg-4 col-md-4"
                                      >
                                        <div
                                          id={"myDiv" + res.id}
                                          className="profile_listing_single"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="profile_listing_single_inner">
                                            <div className="socila_avatar">
                                              <div className="socila_avatar_img">
                                                <img
                                                  className=""
                                                  alt="image"
                                                  src={res.src}
                                                />
                                              </div>
                                              <div className="socila_avatar_cont">
                                                <h6>
                                                  {res.fname} {res.lname}
                                                </h6>
                                                <p>
                                                  Active Tour:{res.is_autotour}
                                                </p>
                                                <p>Email:{res.email}</p>
                                              </div>
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
                    </div>
                    <div className="tab-pane" id="Tourlist" role="tabpanel">
                      <div className="filter_sec">
                        <div className="row">
                          <div className="col-lg-12 col-sm-12">
                            <CSVLink {...csvLink1}>
                              <Button
                                style={{
                                  backgroundColor: "#ffa12d",
                                  height: "40px",
                                  color: "whitesmoke",
                                  marginRight: "10px",
                                }}
                              >
                                {" "}
                                <i
                                  className="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                                Download
                              </Button>
                            </CSVLink>
                          </div>
                          <div className="col-lg-12 col-sm-12">
                            <table
                              className="table table-bordered"
                              style={{ marginTop: "20px" }}
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th style={{ textAlign: "center" }}>Sr.no</th>
                                  <th style={{ textAlign: "center" }}>
                                    Tour No
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Address
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Agent Name
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Status
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Distributed
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {loadTourListDat.length > 0
                                  ? loadTourListDat.map((res, index) => (
                                      <tr>
                                        <td style={{ textAlign: "center" }}>
                                          {index + 1}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {res.id}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {res.address}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {res.fname} {res.lname}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {res.isactive == 0
                                            ? "in Active"
                                            : "Active"}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          N/A
                                        </td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="TourServices" role="tabpanel">
                      <div className="filter_sec">
                        <div className="row">
                          <div className="col-lg-12 col-sm-12">
                            <div className="col-lg-12 col-sm-12">
                              <CSVLink {...csvLink2}>
                                <Button
                                  style={{
                                    backgroundColor: "#ffa12d",
                                    height: "40px",
                                    color: "whitesmoke",
                                    marginRight: "10px",
                                  }}
                                >
                                  {" "}
                                  <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                  ></i>
                                  Download
                                </Button>
                              </CSVLink>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                              <table
                                className="table table-bordered"
                                style={{ marginTop: "20px" }}
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th style={{ textAlign: "center" }}>
                                      Sr.no
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Tour No
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Agent Name
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Address
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Services
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Date Created
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {loadTourListDat.length > 0
                                    ? loadTourListDat.map((res, index) => (
                                        <tr>
                                          <td style={{ textAlign: "center" }}>
                                            {index + 1}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.id}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.fname} {res.lname}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.address}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.videoservice == 0
                                              ? ""
                                              : "Video"}
                                            ,
                                            {res.virtualtourservice == 0
                                              ? ""
                                              : "Tour"}
                                            ,
                                            {res.flyerservice == 0
                                              ? ""
                                              : "Flyer"}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.creationdate}
                                          </td>
                                        </tr>
                                      ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane"
                      id="DistributeYoutube"
                      role="tabpanel"
                    >
                      <div>
                        <div className="filter_sec">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="filterbox d-inline-block">
                                <ul>
                                  <li>Month</li>
                                  <li>
                                    <select
                                      className="form-control"
                                      name="month"
                                      value={DistributeYoutube.month}
                                      onChange={handleMonthChange}
                                    >
                                      <option value="0">Month</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                    </select>
                                  </li>
                                  <li
                                    style={{
                                      marginRight: "30px",
                                      marginLeft: "40px",
                                    }}
                                  >
                                    Choose your Account:
                                  </li>
                                  <li>
                                    <select
                                      className="form-control"
                                      name="year"
                                      value={DistributeYoutube.year}
                                      onChange={HandleYearChange}
                                    >
                                      <option value="0">Year</option>
                                      <option value="2010">2010</option>
                                      <option value="2011">2011</option>
                                      <option value="2012">2012</option>
                                      <option value="2013">2013</option>
                                      <option value="2014">2014</option>
                                      <option value="2015">2015</option>
                                      value<option value="2016">2016</option>
                                      <option value="2017">2017</option>
                                      <option value="2018">2018</option>
                                      <option value="2019">2019</option>
                                      <option value="2020">2020</option>
                                      <option value="2021">2021</option>
                                      <option value="2022">2022</option>
                                      <option value="2023">2023</option>
                                      <option value="2024">2024</option>
                                      <option value="2025">2025</option>
                                    </select>
                                  </li>
                                  <li className="inline-mob">
                                    <button
                                      type="button"
                                      className="btn-style-one smallsize2"
                                      style={{
                                        marginRight: "0px",
                                        marginLeft: "40px",
                                      }}
                                      onClick={SearchFilter}
                                    >
                                      Search
                                    </button>
                                  </li>
                                  <li className="inline-mob">
                                    <button
                                      type="button"
                                      className="btn-style-one smallsize2 grey"
                                      onClick={YoutubePrint}
                                    >
                                      Print
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-11">
                              {youtubeData == false ? (
                                <div
                                  className="alert alert-primary"
                                  role="alert"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <span> No Record Found</span>
                                </div>
                              ) : (
                                <table
                                  className="table table-bordered"
                                  style={{ marginTop: "20px" }}
                                >
                                  <thead className="thead-light">
                                    <tr>
                                      <th style={{ textAlign: "center" }}>
                                        Tour Id
                                      </th>
                                      <th style={{ textAlign: "center" }}>
                                        Caption
                                      </th>
                                      <th style={{ textAlign: "center" }}>
                                        Youtube Date
                                      </th>
                                      <th style={{ textAlign: "center" }}>
                                        Agent
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {DistributeYoutubeData.length > 0 ? (
                                      DistributeYoutubeData.map((res) => (
                                        <tr>
                                          <td style={{ textAlign: "center" }}>
                                            {res.id}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.caption}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.youtubedate}
                                          </td>
                                          <td style={{ textAlign: "center" }}>
                                            {res.agentname}
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <div
                                        className="alert alert-primary"
                                        role="alert"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          marginBottom: "20px",
                                        }}
                                      >
                                        <span> No Record Found</span>
                                      </div>
                                    )}
                                  </tbody>
                                </table>
                              )}
                            </div>
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
      </section>

      <BrokerFooter />
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openTrafficReport}
      >
        <DialogTitle id="customized-dialog-title">
          <i className="fas fa-paste    "></i> Traffic Report
          <CancelIcon
            onClick={() => setOpenTrafficReport(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div className="container">
            <div className="agent_pop_main">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      saveTrafficData();
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <h5 style={{ margin: "20px" }}>
                          Email Recipients (comma seperated)
                        </h5>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <h6 style={{ margin: "20px" }}>
                          You could enter multiple email addresses separated by
                          commas.
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 formbox1">
                        <label style={{ marginLeft: "20px" }}>
                          To:<span style={{ color: "#ffa12d" }}></span>
                        </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          type="text"
                          onChange={handleTrafficInputChange}
                          value={trafficEmail}
                          name="email"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div
                        className="col-lg-12 col-md-12"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          onClick={ViewReport}
                          style={{
                            backgroundColor: "#ffa12d",
                            height: "40px",
                            color: "whitesmoke",
                            marginRight: "10px",
                          }}
                        >
                          View Report
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#2d3e50",
                            height: "40px",
                            color: "whitesmoke",
                            marginRight: "10px",
                          }}
                          onClick={sendMail}
                        >
                          Send Mail
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <h5 style={{ margin: "20px" }}>Auto Forward</h5>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-6">
                        <label style={{ marginRight: "35px" }}>
                          Email report every week
                          <span style={{ color: "#ffa12d" }}></span>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="switchToggle custom-control custom-switch">
                          <Switch
                            onChange={handleTrafficChange}
                            checked={trafficData.emailtrafficreport}
                            handleDiameter={28}
                            offColor="#5D5D5D"
                            onColor="#F6AD17"
                            offHandleColor="#fff"
                            onHandleColor="#fff"
                            height={35}
                            width={60}
                            borderRadius={6}
                            uncheckedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 15,
                                  color: "white",
                                  paddingRight: 2,
                                }}
                              >
                                No
                              </div>
                            }
                            checkedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 15,
                                  color: "white",
                                  paddingRight: 2,
                                }}
                              >
                                Yes
                              </div>
                            }
                            classNameName="react-switch"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 text-center">
                        <button
                          style={{ border: "#ffa124" }}
                          type="submit"
                          className="need_pic save_btn"
                        >
                          Save<i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="agent_pop" id="printcontainer">
        <div id="Newsletter" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="browse_img">
                  <div className="browse_img_conts_main">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "20px",
                      }}
                    >
                      <div>
                        <img src={vtclogo} alt="demo" />
                      </div>
                      <div>
                        <h2>Agent listing</h2>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <table width="100%">
                        <tr>
                          <td>
                            <h2>name</h2>
                          </td>
                          <td>
                            <h2>email</h2>
                          </td>
                          <td>
                            <h2>address</h2>
                          </td>
                        </tr>
                        {agentGetData.length > 0
                          ? agentGetData.map((res) => (
                              <tr>
                                <td>
                                  <h3>{res.fname}</h3>
                                </td>
                                <td>
                                  <h3>{res.email}</h3>
                                </td>
                                <td>
                                  <h3>{res.address}</h3>
                                </td>
                              </tr>
                            ))
                          : ""}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="agent_pop" id="Youtube">
        <div id="Newsletter" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="browse_img">
                  <table
                    className="table table-bordered"
                    style={{ marginTop: "20px" }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th style={{ textAlign: "center" }}>Tour Id</th>
                        <th style={{ textAlign: "center" }}>Caption</th>
                        <th style={{ textAlign: "center" }}>Youtube Date</th>
                        <th style={{ textAlign: "center" }}>Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DistributeYoutubeData.length > 0 ? (
                        DistributeYoutubeData.map((res) => (
                          <tr>
                            <td style={{ textAlign: "center" }}>{res.id}</td>
                            <td style={{ textAlign: "center" }}>
                              {res.caption}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {res.youtubedate}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {res.agentname}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div
                          className="alert alert-primary"
                          role="alert"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "20px",
                          }}
                        >
                          <span> No Record Found</span>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="agent_pop" id="agentneverlogin">
        <div id="Newsletter" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="browse_img">
                  <div className="browse_img_conts_main">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "20px",
                      }}
                    >
                      <div>
                        <img src={vtclogo} alt="demo" />
                      </div>
                      <div>
                        <h2>Agent Never Loginlisting</h2>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <table width="100%">
                        <tr>
                          <td>
                            <h2>name</h2>
                          </td>
                          <td>
                            <h2>email</h2>
                          </td>
                          <td>
                            <h2>address</h2>
                          </td>
                        </tr>
                        {agentNeverSignIn.length > 0
                          ? agentNeverSignIn.map((res) => (
                              <tr>
                                <td>
                                  <h3>{res.fname}</h3>
                                </td>
                                <td>
                                  <h3>{res.email}</h3>
                                </td>
                                <td>
                                  <h3>{res.address}</h3>
                                </td>
                              </tr>
                            ))
                          : ""}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <Backdrop classNameName={classNamees.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
