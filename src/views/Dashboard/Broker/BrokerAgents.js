import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import { confirmAlert } from "react-confirm-alert";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import photo1 from "../../../images/photo-1.jpg";
import broker_banner from "../../../images/broker-banner1.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import tours from "../../../images/tours.jpg";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import BrokerHeader from "../Header/BrokerHeader";
import Skeleton from "@material-ui/lab/Skeleton";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { Button } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import Title from "../../../CommonMethods/Title";
const APIGetDashboardData = APIURL() + "agent-dashboard";
const APIBrokerDashBoard = APIURL() + "get-mycafe";
const APISaveAgentCreate = APIURL() + "agent-create";
const APIGetAgenetData = APIURL() + "agent-List";
const APIDeleteAgent = APIURL() + "delete-Agent";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIResendMail = APIURL() + "resend-Mail";
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
export default function BrokerAgensts(props) {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openCreateAgents, setOpenCreateAgents] = useState(false);
  const [message, setMessage] = useState("");
  const [sync, setSync] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [agentGetData, setAgentGetdata] = useState([]);
  const [id, setId] = useState("");
  const [element, setElement] = useState("");
  const [offset, setOffset] = useState(1);
  const [postPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [hover, setHover] = useState(false);
  const [inputErrors, setinputErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    cnfemail: "",
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
      console.log(objusr);
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
    if (agentGetData.length > 0) {
      filterData();
    }
  }, [offset, agentGetData]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCountries, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllCountries(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      country_id: propertyData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
      }
    });
  }, [propertyData.countryid]);
  const filterData = async () => {
    const slice = agentGetData.slice(offset - 1, offset - 1 + postPerPage);
    setTotalData(slice);
    setAllData(slice);
    setPageCount(Math.ceil(agentGetData.length / postPerPage));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value });
  };
  const handleCheckBoxChange = (event) => {
    const Check = event.target.checked === true ? 1 : 0;
    setAgentData({ ...agentData, emailChk: Check });
  };
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
  const saveAgentData = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      fname: agentData.fname,
      lname: agentData.lname,
      email: agentData.email,
      emailChk: agentData.emailChk,
    };
    setOpen(true);

    postRecord(APISaveAgentCreate, objusr).then((res) => {
      setOpen(false);
      if (res.data[0].response.status === "success") {
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(true);
        setOpenCreateAgents(false);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setSync(true);
      }
      setSync(false);
    });
  };
  const handleEditModal = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      window.location.href = APIPath() + "broker-edit-agent/" + id;
    }
  };
  const handleEditAgent = (data) => {
    window.location.href = APIPath() + "broker-edit-agent/" + data.id;
  };
  const handleImageSetId = (data) => {
    var div = document.getElementById("myDiv" + data.id);
    if (element !== "") {
      element.classList.remove("active");
    }
    if (element === div) {
      div.classList.remove("active");
      setElement("");
      setId("");
    } else {
      div.classList.add("active");
      setElement(div);
      setId(data.id);
    }
  };
  const handleDeleteModal = () => {
    if (id === "") {
      setMessage("Please select one Agent");
      setOpenError(true);
    } else {
      handleDelete(id);
    }
  };
  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure you want to delete this Agent ? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const obj = {
              authenticate_key: "abcd123XYZ",
              brokerid: JSON.parse(context.state.user).user_id,
              agentId: id,
            };
            postRecord(APIDeleteAgent, obj).then((res) => {
              if (res.data[0].response.status === "success") {
                setMessage(res.data[0].response.message);
                setOpenSuccess(true);
                setSync(false);
              } else {
                setMessage(res.data[0].response.message);
                setOpenError(true);
                setSync(false);
              }
              setSync(true);
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const LoginSelectedAgent = () => {
    if (id === "") {
      setMessage("Please select one AgentList");
      setOpenError(true);
    } else {
      history.push(APIPath() + "broker-as-agent/" + id);
    }
  };
  const handlePageClick = (data) => {
    // console.log(data.selected);
    const selectedPage = data.selected;
    setOffset(selectedPage + 1);
  };
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const AgentFilterData = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.brokerid = JSON.parse(context.state.user).user_id;
    postRecord(APIGetAgenetData, propertyData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setAllData(res.data[0].response.data);
          if (res.data[0].response.data.length < 1) {
            setMessage("No data Found");
            setOpenError(true);
          }
        } else {
          setMessage(res.data[0].response.status);
          setAllData([]);
          setOpenError(true);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleInputSelectChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const selectOrderbyChange = (event) => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      order: event.target.value,
    };
    postRecord(APIGetAgenetData, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setAllData(res.data[0].response.data);
          console.log(res.data[0].response.data);
          setMessage(res.data[0].response.status);
          setOpenSuccess(true);
        } else {
          setAllData([]);
          setMessage(res.data[0].response.status);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const reSendMail = () => {
    if (id === "") {
      setMessage("Please select one AgentList");
      setOpenError(true);
    } else {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
        agentId: id,
      };
      postRecord(APIResendMail, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
          }
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
  };
  function changeHover(e) {
    setHover(true);
  }
  return (
    <div>
      <Title title="Broker Agents" />
      {/* <AgentHeader /> */}
      <BrokerHeader />
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
                    <li>
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link class="active" to={APIPath() + "broker-agent"}>
                        Agents
                      </Link>
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
                    <li class="active">
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
                    <li>Yearly - Unlimited Active Tours</li>
                    <li>Ala-Carte - Available Credits 1 </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-title">
          <h2>Manage Your Agents</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <nav class="navbar navbar-expand-lg navbar-light  navbar-blue">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav mr-auto">
                    <li
                      class="nav-item dropdown"
                      onMouseLeave={(e) => setHover(false)}
                      onMouseEnter={changeHover}
                    >
                      <a
                        class="nav-link nav-new-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-image"></i> Agents Tools
                      </a>
                      <div
                        className={
                          hover ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-2">
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenCreateAgents(true)}
                            >
                              <i class="fa fa-plus" aria-hidden="true"></i>{" "}
                              Create Agents
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handleEditModal}>
                              <i class="fas fa-pen"></i> Edit Selected Agents
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleDeleteModal}
                            >
                              <i class="fas fa-trash-alt"></i> Delete Selected
                              Agents
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => LoginSelectedAgent()}
                            >
                              <i class="fa fa-sign-in" aria-hidden="true"></i>{" "}
                              Login Selected Agents
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => reSendMail()}
                            >
                              <i class="fa fa-repeat" aria-hidden="true"></i>{" "}
                              Resend Welcome Email
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  {/* <ul class="nav nav-tabs list_sec" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#Manage"
                        role="tab"
                      >
                        <i class="fas fa-tasks"></i>Agents Tools
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#Filter"
                        role="tab"
                      >
                        <i class="fas fa-filter"></i>Agents Filter
                      </a>
                    </li>
                  </ul> */}
                </div>
                <div class="action_sec_right">
                  <ul>
                    <li>
                      <span>order By</span>
                      <select onChange={selectOrderbyChange}>
                        <option value="creationdate ASC">
                          Creation Date (asc)
                        </option>
                        <option selected="selected" value="creationdate DESC">
                          Creation Date (desc)
                        </option>
                        <option value="FNAME ASC">Name (asc)</option>
                        <option value="FNAME DESC">Name (desc)</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="tab-content">
                <div class="tab-pane " id="Manage" role="tabpanel">
                  <div class="property_info_cont agent_img_sets" id="demo">
                    <section id="examples" class="snap-scrolling-example">
                      <div id="content-1" class="content horizontal-images">
                        <ul class="list_sec" role="">
                          <li class="">
                            <a
                              class=""
                              onClick={() => setOpenCreateAgents(true)}
                            >
                              <span>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                              </span>
                              Create Agents
                            </a>
                          </li>
                          <li class="">
                            <a onClick={handleEditModal}>
                              <span>
                                <i class="fas fa-pen"></i>
                              </span>
                              Edit Selected Agents
                            </a>
                          </li>
                          <li class="">
                            {/* <a href="#"><span><i class="far fa-eye"></i></span>View Tour</a> */}
                            <a onClick={handleDeleteModal}>
                              <span>
                                <i class="fas fa-trash-alt"></i>
                              </span>
                              Delete Selected Agents
                            </a>
                          </li>
                          <li class="">
                            <a onClick={() => LoginSelectedAgent()}>
                              <span>
                                <i class="fa fa-sign-in" aria-hidden="true"></i>
                              </span>
                              Login Selected Agents
                            </a>
                          </li>
                          <li class="">
                            <a onClick={() => reSendMail()}>
                              <span>
                                <i class="fa fa-repeat" aria-hidden="true"></i>
                              </span>
                              Resend Welcome Email
                            </a>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
                <div class="tab-pane active" id="Filter" role="tabpanel">
                  <div class="filter_sec">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        AgentFilterData();
                      }}
                    >
                      <div class="row">
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <input
                              type="text"
                              name="searchtxt"
                              class="form-control"
                              value={propertyData.searchtxt}
                              placeholder="Name"
                              onChange={inputHandleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <input
                              type="text"
                              name="company"
                              value={propertyData.company}
                              class="form-control"
                              placeholder="Company"
                              onChange={inputHandleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <input
                              type="text"
                              name="email"
                              value={propertyData.email}
                              class="form-control"
                              placeholder="email"
                              onChange={inputHandleChange}
                            />
                          </div>
                        </div>
                        {/* <div class="col-lg-3 col-md-3">
                                                <div class="filter_sec_single">
                                                    <select class="form-control formbox1select">
                                                        <option>Select State</option>
                                                        <option>Select State</option>
                                                        <option>Select State</option>
                                                        <option>Select State</option>
                                                        <option>Select State</option>
                                                    </select>
                                                </div>
                                            </div> */}
                        {/* <div class="col-lg-3 col-md-3">
                                                <div class="filter_sec_single">
                                                    <input type="text" name="" class="form-control" placeholder="Zip Code" />
                                                </div>
                                            </div> */}
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <input
                              type="tel"
                              name="mobile"
                              value={propertyData.mobile}
                              class="form-control"
                              maxLength="12"
                              minLength="10"
                              placeholder="phone"
                              onChange={inputHandleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row padd_top">
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <input
                              type="tel"
                              name="city"
                              value={propertyData.city}
                              class="form-control"
                              placeholder="City"
                              onChange={inputHandleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <select
                              name="countryid"
                              value={propertyData.countryid}
                              onChange={handleInputSelectChange}
                              class="form-control formbox1select"
                            >
                              <option value="0">Select Country</option>
                              {allCountries.map((res) => (
                                <option value={res.id}>{res.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <select
                              name="stateid"
                              value={propertyData.stateid}
                              onChange={handleInputSelectChange}
                              class="form-control formbox1select"
                            >
                              <option value="0">Select State</option>
                              {allStates &&
                                allStates.map((res) => (
                                  <option value={res.id}>{res.name}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="filter_sec_single">
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <input
                                  type="text"
                                  name="zipcode"
                                  value={propertyData.zipcode}
                                  class="form-control"
                                  placeholder="Zip Code"
                                  onChange={inputHandleChange}
                                />
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <button type="submit" class="next_btn">
                                  FILTER
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="profile_listing_main">
                <div class="row">
                  {Object.keys(allData).length > 0
                    ? allData.map((res) => (
                        // <h2>{res.username}</h2>
                        <div
                          onClick={() => {
                            setId(res.id);
                            handleImageSetId(res);
                          }}
                          class="col-lg-4 col-md-4"
                        >
                          <div
                            id={"myDiv" + res.id}
                            class="profile_listing_single"
                            style={{ cursor: "pointer" }}
                          >
                            <div class="profile_listing_single_inner">
                              <div class="socila_avatar">
                                <div class="socila_avatar_img">
                                  <img class="" alt="agentimage" src={res.src} />
                                </div>
                                <div class="socila_avatar_cont">
                                  <h6>
                                    {res.fname} {res.lname}
                                  </h6>
                                  <p>Active Tour:{res.is_autotour}</p>
                                  <p>Company Name :{res.company}</p>
                                  <p class="">{res.address} </p>
                                  <p>Email:{res.email}</p>
                                </div>
                              </div>
                              <div class="socila_body">
                                <div class="socila_body_btn">
                                  <button onClick={() => handleEditAgent(res)}>
                                    <i class="far fa-edit"></i>Edit
                                  </button>
                                  <button onClick={() => handleDelete(res.id)}>
                                    <i class="far fa-trash-alt"></i>Delete
                                  </button>
                                </div>
                                <div class="socila_body_icn">
                                  <ul>
                                    <li>
                                      <label>Share:</label>
                                      <a href="#">
                                        <i class="fab fa-facebook-square fb"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i class="fab fa-twitter-square tw"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <Button
                                    className="brokerAgentBtn notLoggedIn" 
                                    disabled                             
                                  >
                                    <i
                                      class="fa fa-user"
                                      aria-hidden="true"
                                    ></i>
                                    Agent Has not Logged In
                                  </Button>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                  <Button
                                    className="brokerAgentBtn loginAgent"
                                    onClick={() => LoginSelectedAgent()}
                                  >
                                    <span>
                                      <i class="fa fa-sign-in"></i>
                                    </span>
                                    Login For This Agent
                                  </Button>
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
          <hr class="spacer10px"></hr>
          <hr class="spacer10px"></hr>
          {allData.length > 0 ? (
            <div class="row">
              <div class="col-lg-12">
                <ReactPaginate
                  previousLabel={"«"}
                  nextLabel={"»"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={3}
                  ageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  activeClassName="active"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <BrokerFooter />
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
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
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
                saveAgentData();
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
                        inputErrors.lname !== ""
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
                        inputErrors.email !== ""
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
                        inputErrors.cnfemail !== ""
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
    </div>
  );
}
