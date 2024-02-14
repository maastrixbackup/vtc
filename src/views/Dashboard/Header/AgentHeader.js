import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../images/vtc-logo2.png";
import user from "../../../images/user.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Switch from "react-switch";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Captcha from "react-numeric-captcha";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import ReCAPTCHA from "react-google-recaptcha";
const APIGetUserData = APIURL() + "user-details";
const APISaveStatus = APIURL() + "change-agent-status";
const APIBrokerReferral = APIURL() + "get-broker";
const APILinkBroker = APIURL() + "link-broker";
const APIGetLinkedBroker = APIURL() + "get-linked-broker-details";
const APIUnLinkBroker = APIURL() + "unlink-broker";
const APISubscription = APIURL() + "agent-signup";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AgentHeader(props) {
  let history = useHistory();
  const initialSubState = {
    fname: "",
    lname: "",
    email: "",
    officephone: "",
    zipcode: "",
    countryid: "",
    city: "",
  };
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [opensubModal, setOpenSubModal] = useState(false);
  const [subscribeData, setSubscribeData] = useState(initialSubState);
  const [status, setStatus] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [brokerDetails, setBrokerDetails] = useState({});
  const [openBrokerModal, setOpenBrokerModal] = useState(false);
  const [AgentBrokerDetails, setAgentBrokerDetails] = useState({});
  const [sync, setSync] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [backButton, setBackButton] = useState(false);
  const [backToBroker, setbackToBroker] = useState(false);
  const [brokerId, setBrokerId] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  function onChange(value) {
    setCaptchaSuccess(true);
  }
  useEffect(() => {
    let user = props.user;
    if (user === "admin") {
      setBackButton(true);
    } else {
      setBackButton(false);
    }
  }, [user]);
  useEffect(() => {
    let user = props.user;
    if (user === "broker") {
      setbackToBroker(true);
    } else {
      setbackToBroker(false);
    }
  }, [user]);
  useEffect(() => {
    if (context.state.user) {
      // loadCaptchaEnginge(6);
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
          setBrokerId(res.data[0].response.data.agent_profile.allData.brokerid);
          setStatus(res.data[0].response.data.agent_profile.status);
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
      postRecord(APIGetLinkedBroker, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setAgentBrokerDetails(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      subscribeData.fname = currentUser.name.split(" ")[0];
      subscribeData.lname = currentUser.name.split(" ")[1];
      subscribeData.email = currentUser.email;
    }
  }, [currentUser]);
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
      country_id: subscribeData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        return;
      }
      setAllStates([]);
      setSubscribeData({ ...subscribeData, stateid: "" });
    });
  }, [subscribeData.countryid]);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const handleStatusChange = (nextChecked) => {
    setStatus(nextChecked);
    setOpenModal(false);
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure you want to change your account status ? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const objusr = {
              authenticate_key: "abcd123XYZ",
              agent_id: JSON.parse(context.state.user).agentId,
              status: nextChecked === true ? 1 : 0,
            };
            postRecord(APISaveStatus, objusr).then((res) => {
              if (res.data[0].response.status === "success") {
                setMessage(res.data[0].response.message);
                setOpenSuccess(true);
              } else {
                setMessage(res.data[0].response.message);
                setOpenError(true);
              }
            });
          },
        },
        {
          label: "No",
          onClick: () => {
            setStatus(false);
          },
        },
      ],
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    //setOpenModal(false);
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({ ...subscribeData, [name]: value });
  };
  const handlePaymentCardNoChange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({
      ...subscribeData,
      [name]: value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    });
  };
  const handleCodeChange = (event) => {
    setReferralCode(event.target.value);
  };
  const handleLink = () => {
    if (referralCode === "") {
      setMessage("please enter a referral code");
      setOpenWarning(true);
    } else {
      setOpenModal(false);

      confirmAlert({
        message:
          "You have chosen to link to a new broker by doing so you will be unlinked from your current broker. Are you sure you want to continue? ",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              const obj = {
                authenticate_key: "abcd123XYZ",
                agent_id: JSON.parse(context.state.user).agentId,
                code: referralCode,
              };
              postRecord(APIBrokerReferral, obj).then((res) => {
                if (res.data[0].response.status === "success") {
                  setBrokerDetails(res.data[0].response.data);
                  setOpenBrokerModal(true);
                } else {
                  setMessage(res.data[0].response.message);
                  setOpenError(true);
                }
              });
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };
  const handleBrokerOk = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      code: referralCode,
    };
    postRecord(APILinkBroker, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Broker Linked Successfully !!");
          setOpenSuccess(true);
          //setAgentBrokerDetails(res.data[0].response.data);
          setOpenBrokerModal(false);
          setSync(true);
          setSync(false);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const handleUnLink = (id) => {
    confirmAlert({
      message: "Are you sure you want to unlink from the current broker?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const obj = {
              authenticate_key: "abcd123XYZ",
              agent_id: JSON.parse(context.state.user).agentId,
              brokerId: id,
            };
            postRecord(APIUnLinkBroker, obj).then((res) => {
              if (res.data[0].response.status === "success") {
                setMessage("Broker Un Linked Successfully !!");
                setOpenSuccess(true);
                setAgentBrokerDetails({});
                setSync(true);
                setSync(false);
              }
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
  const BacktoAdmin = () => {
    window.location.href = "https://virtualtourcafe.com/admin/dashboard";
  };
  const BacktoBroker = () => {
    history.push(APIPath() + "back-to-broker/" + brokerId);
  };
  const SaveSubscription = () => {
    if (captchaSuccess === false) {
      setMessage("Please enter a valid captcha code");
      setOpenError(true);
    } else {
      setMessage("Please Wait ....");
      setOpenWarning(true);
      subscribeData.authenticate_key = "abcd123XYZ";
      subscribeData.agent_id = JSON.parse(context.state.user).agentId;
      subscribeData.amount = subscribeData.subscriptions;
      if (subscribeData.subscriptions === "39.99") {
        subscribeData.sub_id = 3;
      }
      if (subscribeData.subscriptions === "399.00") {
        subscribeData.sub_id = 6;
      }
      if (subscribeData.subscriptions === "49.00") {
        subscribeData.sub_id = 7;
      }
      postRecord(APISubscription, subscribeData)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
          }
          setOpenWarning(false);
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
        });
    }
  };
  return (
    <div>
      <section class="agent_dashboard">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="agent_dashboard_main">
                <div class="agent_dashboard_left">
                  <h6>Welcome {currentUser.name}</h6>
                </div>
                <div class="agent_dashboard_right">
                  {backToBroker ? (
                    <a
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => BacktoBroker()}
                      class="subscribe_btn"
                    >
                      Back To Broker
                    </a>
                  ) : (
                    ""
                  )}
                  {backButton ? (
                    <a
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => BacktoAdmin()}
                      class="subscribe_btn"
                    >
                      Back To Admin
                    </a>
                  ) : (
                    ""
                  )}

                  <Link
                    to={APIPath() + "appointment"}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    class="subscribe_btn"
                  >
                    <i class="fal fa-book"></i>Schedule Your Appointment
                  </Link>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenSubModal(true);
                    }}
                    class="subscribe_btn"
                  >
                    <i class="far fa-file-alt"></i>Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="dash_logo_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="dash_logo_sec_main">
                <div class="row">
                  <div class="col-lg-3 col-md-3">
                    <div class="dash_logo_sec_logo">
                      <Link to={APIPath()}>
                        <img
                          src="https://virtualtourcafe.com/static/media/vtc-logo2.3bde24ac.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg-9 col-md-9">
                    <div class="dash_logo_sec_right">
                      <ul>
                        <li>
                          <a
                            onClick={() => setOpenModal(true)}
                            style={{ color: "white", cursor: "pointer" }}
                            class="acc_btn"
                          >
                            <i class="fas fa-user"></i>Account Status
                          </a>
                        </li>
                        <li>
                          <Link
                            to={APIPath() + "agent-order-list"}
                            class={
                              props.path == "/agent-order-list"
                                ? "acc_btn active"
                                : "acc_btn"
                            }
                          >
                            <i class="fas fa-shopping-cart"></i>My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={APIPath() + "agent-pending-order-list"}
                            class={
                              props.path == "/agent-pending-order-list"
                                ? "acc_btn active"
                                : "acc_btn"
                            }
                          >
                            <i class="fas fa-cart-arrow-down"></i>My Pending
                            Order
                          </Link>
                        </li>
                        <li class="dashboard nav-item nav-profile dropdown dropdown-animate show">
                          <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            id="profileDropdown"
                            aria-expanded="true"
                          >
                            <div class="user_img">
                              <img
                                src={currentUser && currentUser.profile_img}
                                alt=""
                                title=""
                              />
                            </div>
                          </a>
                          <div
                            class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                            aria-labelledby="profileDropdown"
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
                              <i class="fas fa-user profile-icon"></i>Dashboard
                            </Link>

                            {/* <a href="#" class="dropdown-item"><i class="fas fa-user-edit profile-icon"></i>Edit profile</a> */}
                            {/* <a href={APIPath() + "agent-setting"} class="dropdown-item"><i class="fas fa-cog profile-icon"></i>Settings</a> */}

                            <a
                              href={APIPath() + "agent-setting"}
                              class="dropdown-item"
                            >
                              <i class="fas fa-cog profile-icon"></i>Settings
                            </a>

                            {/* <a href="#" class="dropdown-item"><i class="fas fa-cog profile-icon"></i>Account Settings</a> */}

                            {/* <a href="#" class="dropdown-item"><i class="fas fa-info-circle profile-icon"></i>Support</a> */}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title">
          Account Status
          <CancelIcon
            onClick={() => setOpenModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div class="row">
                <div class="col-lg-4 col-md-4">
                  <div class="agent_sign_up_single">
                    <label style={{ marginRight: "30px" }}>Active</label>
                    <Switch
                      onChange={handleStatusChange}
                      checked={status}
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
                      className="react-switch"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <h6>Link to Broker</h6>
                  <hr></hr>
                  <div class="agent_sign_up_single">
                    <label>Broker Referral Code</label>
                    <div class="align_center">
                      <input
                        type="text"
                        onChange={handleCodeChange}
                        value={referralCode}
                        placeholder="referral code"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleLink}
                    style={{ border: "#ffa124" }}
                    type="submit"
                    class="need_pic save_btn"
                  >
                    Link
                  </button>
                </div>
              </div>
              <div class="row">
                {Object.keys(AgentBrokerDetails).length > 0 ? (
                  <div class="col-lg-12 col-md-12">
                    <h3
                      style={{
                        color: "#ffa12d",
                        margin: "20px auto 40px",
                        textAlign: "center",
                      }}
                    >
                      Linked Broker Detail
                    </h3>
                    <table class=" table table-bordered m-t-15">
                      <tbody>
                        <tr>
                          <td>Broker Name:</td>
                          <td>{AgentBrokerDetails.brokername}</td>
                        </tr>
                        <tr>
                          <td>Company:</td>
                          <td>{AgentBrokerDetails.company}</td>
                        </tr>

                        <tr>
                          <td>Email:</td>
                          <td>{AgentBrokerDetails.brokeremail}</td>
                        </tr>
                        <tr>
                          <td>Phone:</td>
                          <td>{AgentBrokerDetails.brokerphone}</td>
                        </tr>
                        <tr></tr>
                        <tr>
                          <td>Address:</td>
                          <td>{AgentBrokerDetails.address}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      onClick={() => {
                        handleUnLink(AgentBrokerDetails.brokerid);
                      }}
                      style={{ border: "#ffa124", marginTop: "0" }}
                      type="submit"
                      class="need_pic save_btn"
                    >
                      UnLink
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openBrokerModal}
      >
        <DialogTitle id="customized-dialog-title">
          Are you sure you want to link to this broker?
          <CancelIcon
            onClick={() => setOpenBrokerModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="row">
              <table class=" table table-bordered m-t-15">
                <tbody>
                  <tr>
                    <td>Company:</td>
                    <td>{brokerDetails.company}</td>
                  </tr>
                  <tr>
                    <td>Contact Person:</td>
                    <td>{brokerDetails.contactperson}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{brokerDetails.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{brokerDetails.phone}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td>Website:</td>
                    <td>{brokerDetails.website}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <Button
                onClick={() => setOpenBrokerModal(false)}
                style={{ left: "67%" }}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBrokerOk}
                style={{ left: "70%" }}
                variant="outlined"
                color="primary"
              >
                Ok
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={handleClose}
        maxWidth={maxWidth}
        aria-labelledby="customized-dialog-title"
        open={opensubModal}
      >
        <DialogTitle
          style={{ background: "#FFA12D", color: "white" }}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Agent Subscriptions
          <CancelIcon
            onClick={() => {
              setOpenSubModal(false);
            }}
            style={{ float: "right", color: "#fff", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                SaveSubscription();
              }}
            >
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    First Name <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="fname"
                    value={subscribeData.fname}
                    disabled
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Last Name <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="lname"
                    value={subscribeData.lname}
                    disabled
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Email <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="email"
                    value={subscribeData.email}
                    disabled
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Phone <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="officephone"
                    value={subscribeData.officephone}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Address <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="address"
                    value={subscribeData.address}
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Zip <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="zipcode"
                    value={subscribeData.zipcode}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Country <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    data-size="5"
                    maxlength="50"
                    class="form-control formbox1select"
                    onChange={handleInputChange}
                    value={subscribeData.countryid}
                    name="countryid"
                  >
                    <option value="">---Select Country---</option>
                    {allCountries.map((res) => (
                      <option value={res.id}>{res.name}</option>
                    ))}
                  </select>
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    City <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="city"
                    value={subscribeData.city}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    State <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    name="stateid"
                    value={subscribeData.stateid}
                    onChange={handleInputChange}
                    class="form-control formbox1select"
                  >
                    <option value="0">Select State</option>
                    {allStates &&
                      allStates.map((res) => (
                        <option value={res.id}>{res.name}</option>
                      ))}
                  </select>

                  {/* <input type="text" class="form-control" onChange={handleInputChange} name="stateid" value={subscribeData.stateid} /> */}
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <h6 style={{ fontWeight: "700" }}>Subscription</h6>
                  <hr></hr>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Select Subscription{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    name="subscriptions"
                    onChange={handleInputChange}
                    value={subscribeData.subscriptions}
                  >
                    <option value="0">Select Subscription</option>
                    <optgroup label="Monthly Subscriptions">
                      <option value="39.99">
                        Platinum [Unlimited Active Tours - $39.99/mo]
                      </option>
                    </optgroup>
                    <optgroup label="Yearly Subscriptions">
                      <option value="399.00">
                        Platinum [Unlimited Active Tours - $399.00/yr]
                      </option>
                    </optgroup>
                    <optgroup label="Alacarte">
                      <option value="49.00">1 Active Tours - $49.00</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Credit Card Number{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handlePaymentCardNoChange}
                    maxLength="22"
                    name="cc_no"
                    value={subscribeData.cc_no}
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Card Verification Number{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="cvv"
                    value={subscribeData.cvv}
                  />
                </div>
              </div>
              <div class="row">
                <label style={{ width: "100%" }}>
                  Expiration Date <span style={{ color: "#ffa12d" }}>*</span>
                </label>
                <div class="col-md-3 formbox1">
                  <select
                    name="cc_month"
                    onChange={handleInputChange}
                    value={subscribeData.cc_month}
                    class=" form-control formbox1select"
                  >
                    <option value="">Select Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div class="col-md-3 formbox1">
                  <select
                    name="cc_year"
                    onChange={handleInputChange}
                    value={subscribeData.cc_year}
                    class=" form-control formbox1select"
                  >
                    <option value="">Select Year</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Amount <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="subscriptions"
                    value={subscribeData.subscriptions}
                    readOnly
                  />
                </div>
              </div>
              <div class="row"></div>
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <h6 style={{ fontWeight: "700" }}>Misc</h6>
                  <hr></hr>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 formbox1">
                  <label>
                    Promotional Code<span style={{ color: "#ffa12d" }}></span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="promocode"
                    value={subscribeData.promocode}
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Referral Code<span style={{ color: "#ffa12d" }}></span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="referralcode"
                    value={subscribeData.referralcode}
                  />
                </div>
              </div>
              <div class="row">
                {/* <div class="col-md-6 formbox1">
                                    <label>Verification Code<span style={{ color: "#ffa12d" }}></span></label>
                                    <input type="text" class="form-control" onChange={handleInputChange} name="code" value={subscribeData.code} />
                                </div> */}
                <div class="col-md-12 formbox1">
                  <ReCAPTCHA
                    sitekey="6LfHSiwgAAAAAAHtot668mAzqqmXqcre4wXdHbf-"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div class="row">
                <div class="agent_sign_up_single">
                  <label style={{ marginRight: "30px" }}>
                    I understand I am purchasing a monthly(yearly) subscription
                    and will be rebilled every month (year) and I may cancel at
                    any time
                  </label>
                  <Switch
                    onChange={handleChange}
                    checked={checked}
                    handleDiameter={28}
                    offColor="#f44336"
                    onColor="#42d701"
                    offHandleColor="#42d701"
                    onHandleColor="#f44336"
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
                    className="react-switch"
                  />
                </div>
              </div>
              <button class="need_pic" style={{ float: "right" }}>
                Save
              </button>
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
    </div>
  );
}
