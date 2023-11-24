import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
const APIGetUserData = APIURL() + "get-BrokerDetails";
const APISaveStatus = APIURL() + "change-agent-status";
const APIBrokerReferral = APIURL() + "get-broker";
const APILinkBroker = APIURL() + "link-broker";
const APIGetLinkedBroker = APIURL() + "get-linked-broker-details";
const APIUnLinkBroker = APIURL() + "unlink-broker";
const APIBrokerStatusChange = APIURL() + "broker-StatusChnage";
const APIBrokerDashBoard = APIURL() + "get-mycafe";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AgentHeader() {
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
  //const [status, setStatus] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [brokerDetails, setBrokerDetails] = useState({});
  const [openBrokerModal, setOpenBrokerModal] = useState(false);
  const [AgentBrokerDetails, setAgentBrokerDetails] = useState({});
  const [sync, setSync] = useState(false);
  const [accountStatus, setAccountStatus] = useState("");
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        broker_id: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.broker_profile);
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
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      // postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/get-mycafe", objusr)
      postRecord(APIBrokerDashBoard, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setAccountStatus(res.data[0].response.data.accountstatus);
        }
      });
    }
  }, [context.state.user]);
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
    var check = "0";
    if (nextChecked === true) {
      check = "1";
    } else {
      check = "0";
    }
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerId: JSON.parse(context.state.user).user_id,
      status: check,
    };
    postRecord(APIBrokerStatusChange, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAccountStatus(nextChecked);
        setOpenSuccess(true);
        setMessage(res.data[0].response.message);
      }
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
      confirmAlert({
        // title: 'Confirm to submit',
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
  return (
    <div>
      <section class="agent_dashboard">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="agent_dashboard_main broker_dashboard">
                <div class="agent_dashboard_left">
                  <h6>Welcome {currentUser.name}</h6>
                </div>
                {/* <div class="agent_dashboard_right">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenSubModal(true);
                    }}
                    class="subscribe_btn"
                  >
                    <i class="far fa-file-alt"></i>Subscribe
                  </a>
                </div> */}
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
                        <img src={Logo} alt="Logo" title="Logo" />
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
                            <i class="fas fa-user"></i>Account
                          </a>
                        </li>
                        {/* <li><Link to={APIPath() + "appointment"} style={{ color: "white", cursor: "pointer" }} class="acc_btn"  >Schedule Photos</Link></li> */}
                        <li class="dashboard nav-item nav-profile dropdown dropdown-animate show">
                          <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            id="profileDropdown"
                            aria-expanded="true"
                          >
                            <div class="user_img">
                              <img src={user} alt="" title="" />
                            </div>
                          </a>
                          <div
                            class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                            aria-labelledby="profileDropdown"
                          >
                            <div class="profile-header d-flex align-items-center">
                              <div class="thumb-area">
                                <img src={user} alt="profile" />
                              </div>
                              <div class="content-text">
                                <h6>{currentUser.name}</h6>
                              </div>
                            </div>
                            <Link
                              to={APIPath() + "broker-dashboard"}
                              class="dropdown-item"
                            >
                              <i class="fas fa-user profile-icon"></i>Dashboard
                            </Link>
                            <a
                              href={APIPath() + "broker-setting"}
                              class="dropdown-item"
                            >
                              <i class="fas fa-cog profile-icon"></i>Account
                              Settings
                            </a>

                            <a
                              href={APIPath() + "broker-support"}
                              class="dropdown-item"
                            >
                              <i class="fas fa-info-circle profile-icon"></i>
                              Support
                            </a>

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
        fullWidth={true}
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
                      checked={accountStatus}
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
              {/* <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <h6>Link to Broker</h6>
                                    <hr></hr>
                                    <div class="agent_sign_up_single">
                                        <label>Broker Referral Code</label>
                                        <div class="align_center">
                                            <input type="text" onChange={handleCodeChange} value={referralCode} placeholder="referral code" />
                                        </div>
                                    </div>
                                    <button onClick={handleLink} style={{ border: "#ffa124" }} type="submit" class="need_pic save_btn">Link</button>
                                </div>
                            </div> */}
              {/* <div class="row">
                                {Object.keys(AgentBrokerDetails).length > 0 ? (
                                    <div class="col-lg-12 col-md-12">
                                        <h3 style={{ color: "#ffa12d", margin: "20px auto 40px", textAlign: "center" }}>Linked Broker Detail</h3>
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
                                                <tr>
                                                </tr><tr>
                                                    <td>Address:</td>
                                                    <td>{AgentBrokerDetails.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button onClick={() => {
                                            handleUnLink(AgentBrokerDetails.brokerid);
                                        }} style={{ border: "#ffa124", marginTop: "0" }} type="submit" class="need_pic save_btn">UnLink</button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div> */}
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
                    <option value="40" selected="selected">
                      United States
                    </option>
                    <option value="39">Canada</option>
                    <option value="163">Afghanistan</option>
                    <option value="191">Albania</option>
                    <option value="74">Algeria</option>
                    <option value="192">Andorra</option>
                    <option value="75">Angola</option>
                    <option value="216">Anguilla</option>
                    <option value="238">Antarctica</option>
                    <option value="215">Antigua and Barbuda</option>
                    <option value="41">Argentina</option>
                    <option value="165">Armenia</option>
                    <option value="214">Aruba</option>
                    <option value="166">Ashmore and Cartier Islands</option>
                    <option value="63">Australia</option>
                    <option value="1">Austria</option>
                    <option value="164">Azerbaijan</option>
                    <option value="150">Bahrain</option>
                    <option value="167">Bangladesh</option>
                    <option value="217">Barbados</option>
                    <option value="78">Bassas da India</option>
                    <option value="3">Belarus</option>
                    <option value="2">Belgium</option>
                    <option value="43">Belize</option>
                    <option value="77">Benin</option>
                    <option value="73">Bermuda</option>
                    <option value="169">Bhutan</option>
                    <option value="44">Bolivia</option>
                    <option value="193">Bosnia and Herzegovina</option>
                    <option value="76">Botswana</option>
                    <option value="239">Bouvet Island</option>
                    <option value="45">Brazil</option>
                    <option value="175">British Indian Ocean Territory</option>
                    <option value="237">British Virgin Islands</option>
                    <option value="170">Brunei</option>
                    <option value="4">Bulgaria</option>
                    <option value="126">Burkina Faso</option>
                    <option value="79">Burundi</option>
                    <option value="171">Cambodia</option>
                    <option value="83">Cameroon</option>
                    <option value="86">Cape Verde</option>
                    <option value="218">Cayman Islands</option>
                    <option value="85">Central African Republic</option>
                    <option value="80">Chad</option>
                    <option value="46">Chile</option>
                    <option value="26">China</option>
                    <option value="179">Christmas Island</option>
                    <option value="225">Clipperton Island</option>
                    <option value="172">Cocos (Keeling) Islands</option>
                    <option value="47">Colombia</option>
                    <option value="84">Comoros</option>
                    <option value="81">Congo (Brazzaville)</option>
                    <option value="82">Congo (Kinshasa)</option>
                    <option value="133">Cook Islands</option>
                    <option value="132">Coral Sea Islands</option>
                    <option value="48">Costa Rica</option>
                    <option value="97">Cote D'Ivoire</option>
                    <option value="198">Croatia</option>
                    <option value="49">Cuba</option>
                    <option value="151">Cyprus</option>
                    <option value="5">Czech Republic</option>
                    <option value="6">Denmark</option>
                    <option value="87">Djibouti</option>
                    <option value="219">Dominica</option>
                    <option value="50">Dominican Republic</option>
                    <option value="189">East Timor</option>
                    <option value="52">Ecuador</option>
                    <option value="67">Egypt</option>
                    <option value="51">El Salvador</option>
                    <option value="88">Equatorial Guinea</option>
                    <option value="89">Eritrea</option>
                    <option value="194">Estonia</option>
                    <option value="90">Ethiopia</option>
                    <option value="91">Europa Island</option>
                    <option value="221">
                      Falkland Islands (Islas Malvinas)
                    </option>
                    <option value="195">Faroe Islands</option>
                    <option value="134">Fiji</option>
                    <option value="7">Finland</option>
                    <option value="8">France</option>
                    <option value="220">French Guiana</option>
                    <option value="135">French Polynesia</option>
                    <option value="240">
                      French Southern and Antarctic Lands
                    </option>
                    <option value="93">Gabon</option>
                    <option value="152">Gaza Strip</option>
                    <option value="173">Georgia</option>
                    <option value="9">Germany</option>
                    <option value="94">Ghana</option>
                    <option value="196">Gibraltar</option>
                    <option value="95">Glorioso Islands</option>
                    <option value="10">Greece</option>
                    <option value="222">Grenada</option>
                    <option value="223">Guadeloupe</option>
                    <option value="53">Guatemala</option>
                    <option value="197">Guernsey</option>
                    <option value="96">Guinea</option>
                    <option value="111">Guinea-Bissau</option>
                    <option value="224">Guyana</option>
                    <option value="54">Haiti</option>
                    <option value="241">
                      Heard Island and McDonald Islands
                    </option>
                    <option value="213">Holy See (Vatican City)</option>
                    <option value="55">Honduras</option>
                    <option value="174">Hong Kong</option>
                    <option value="11">Hungary</option>
                    <option value="28">India</option>
                    <option value="29">Indonesia</option>
                    <option value="153">Iran</option>
                    <option value="154">Iraq</option>
                    <option value="12">Ireland</option>
                    <option value="199">Isle of Man</option>
                    <option value="66">Israel</option>
                    <option value="13">Italy</option>
                    <option value="56">Jamaica</option>
                    <option value="30">Japan</option>
                    <option value="200">Jersey</option>
                    <option value="155">Jordan</option>
                    <option value="98">Juan de Nova Island</option>
                    <option value="180">Kazakhstan</option>
                    <option value="68">Kenya</option>
                    <option value="136">Kiribati</option>
                    <option value="156">Kuwait</option>
                    <option value="176">Kyrgyzstan</option>
                    <option value="181">Laos</option>
                    <option value="201">Latvia</option>
                    <option value="65">Lebanon</option>
                    <option value="100">Lesotho</option>
                    <option value="99">Liberia</option>
                    <option value="101">Libya</option>
                    <option value="203">Liechtenstein</option>
                    <option value="202">Lithuania</option>
                    <option value="204">Luxembourg</option>
                    <option value="182">Macau</option>
                    <option value="207">Macedonia</option>
                    <option value="102">Madagascar</option>
                    <option value="104">Malawi</option>
                    <option value="31">Malaysia</option>
                    <option value="184">Maldives</option>
                    <option value="105">Mali</option>
                    <option value="209">Malta</option>
                    <option value="226">Martinique</option>
                    <option value="107">Mauritania</option>
                    <option value="106">Mauritius</option>
                    <option value="103">Mayotte</option>
                    <option value="57">Mexico</option>
                    <option value="205">Moldova</option>
                    <option value="208">Monaco</option>
                    <option value="183">Mongolia</option>
                    <option value="206">Montenegro</option>
                    <option value="227">Montserrat</option>
                    <option value="69">Morocco</option>
                    <option value="108">Mozambique</option>
                    <option value="168">Myanmar (Burma)</option>
                    <option value="127">Namibia</option>
                    <option value="141">Nauru</option>
                    <option value="185">Nepal</option>
                    <option value="14">Netherlands</option>
                    <option value="229">Netherlands Antilles</option>
                    <option value="137">New Caledonia</option>
                    <option value="64">New Zealand</option>
                    <option value="58">Nicaragua</option>
                    <option value="109">Niger</option>
                    <option value="110">Nigeria</option>
                    <option value="138">Niue</option>
                    <option value="61">No Country</option>
                    <option value="139">Norfolk Island</option>
                    <option value="177">North Korea</option>
                    <option value="15">Norway</option>
                    <option value="157">Oman</option>
                    <option value="32">Pakistan</option>
                    <option value="59">Panama</option>
                    <option value="143">Papua New Guinea</option>
                    <option value="186">Paracel Islands</option>
                    <option value="230">Paraguay</option>
                    <option value="60">Peru</option>
                    <option value="33">Philippines</option>
                    <option value="142">Pitcairn Islands</option>
                    <option value="16">Poland</option>
                    <option value="17">Portugal</option>
                    <option value="158">Qatar</option>
                    <option value="112">Reunion</option>
                    <option value="18">Romania</option>
                    <option value="19">Russia</option>
                    <option value="113">Rwanda</option>
                    <option value="116">Saint Helena</option>
                    <option value="231">Saint Kitts and Nevis</option>
                    <option value="232">Saint Lucia</option>
                    <option value="236">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="148">Samoa</option>
                    <option value="212">San Marino</option>
                    <option value="122">Sao Tome and Principe</option>
                    <option value="159">Saudi Arabia</option>
                    <option value="115">Senegal</option>
                    <option value="210">Serbia</option>
                    <option value="114">Seychelles</option>
                    <option value="117">Sierra Leone</option>
                    <option value="34">Singapore</option>
                    <option value="20">Slovakia</option>
                    <option value="211">Slovenia</option>
                    <option value="131">Solomon Islands</option>
                    <option value="118">Somalia</option>
                    <option value="70">South Africa</option>
                    <option value="242">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="178">South Korea</option>
                    <option value="21">Spain</option>
                    <option value="187">Spratly Islands</option>
                    <option value="72">Sri Lanka</option>
                    <option value="119">Sudan</option>
                    <option value="228">Suriname</option>
                    <option value="129">Swaziland</option>
                    <option value="22">Sweden</option>
                    <option value="23">Switzerland</option>
                    <option value="160">Syria</option>
                    <option value="35">Taiwan</option>
                    <option value="188">Tajikistan</option>
                    <option value="124">Tanzania</option>
                    <option value="36">Thailand</option>
                    <option value="42">The Bahamas</option>
                    <option value="92">The Gambia</option>
                    <option value="121">Togo</option>
                    <option value="144">Tokelau</option>
                    <option value="145">Tonga</option>
                    <option value="233">Trinidad and Tobago</option>
                    <option value="120">Tromelin Island</option>
                    <option value="123">Tunisia</option>
                    <option value="24">Turkey</option>
                    <option value="190">Turkmenistan</option>
                    <option value="234">Turks and Caicos Islands</option>
                    <option value="146">Tuvalu</option>
                    <option value="125">Uganda</option>
                    <option value="25">Ukraine</option>
                    <option value="149">United Arab Emirates</option>
                    <option value="71">United Kingdom</option>
                    <option value="235">Uruguay</option>
                    <option value="37">Uzbekistan</option>
                    <option value="140">Vanuatu</option>
                    <option value="62">Venezuela</option>
                    <option value="38">Vietnam</option>
                    <option value="147">Wallis and Futuna</option>
                    <option value="161">West Bank</option>
                    <option value="128">Western Sahara</option>
                    <option value="162">Yemen</option>
                    <option value="130">Zambia</option>
                    <option value="27">Zimbabwe</option>
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
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="stateid"
                    value={subscribeData.stateid}
                  />
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
                    <optgroup label="Monthly Subscriptions">
                      <option value="39">
                        Platinum [Unlimited Active Tours - $39.99/mo]
                      </option>
                    </optgroup>
                    <optgroup label="Yearly Subscriptions">
                      <option value="399">
                        Platinum [Unlimited Active Tours - $399.00/yr]
                      </option>
                    </optgroup>
                    <optgroup label="Alacarte">
                      <option value="49">1 Active Tours - $49.00</option>
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
                    name="cc_no"
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
                <div class="col-md-6 formbox1">
                  <label>
                    Verification Code<span style={{ color: "#ffa12d" }}></span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleInputChange}
                    name="code"
                    value={subscribeData.code}
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <LoadCanvasTemplate />
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
