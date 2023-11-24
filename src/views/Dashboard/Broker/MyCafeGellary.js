import bannerImage from "../../../images/default-banner.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import { confirmAlert } from "react-confirm-alert";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import defaultImage from "../../../images/defaultimage.jpg";
import avatar from "../../../images/avatar.png";
import logo from "../../../images/vtc-logo.png";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { AuthContext } from "../../../CommonMethods/Authentication";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
const APIGetAgentInfo = APIURL() + "agent-cafe-gallery";
const APIContactAgent = APIURL() + "get-Contact-Agent";

export default function MyCafeGellary(props) {
  const link_name = props.match.params.link;
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const agentId = props.match.params.agentId;
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 99991111,
      color: "#fff",
    },
  }));
  const initialContactState = {
    authenticate_key: "",
    agentId: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone: "",
    comments: "",
  };
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [sync, setSync] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openProfile, setOpenProfile] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [agentInfoData, setAgentInfoData] = useState({});
  const [agentPhoto, setAgentPhoto] = useState("");
  const [agentBanner, setAgentBanner] = useState("");
  const [tourData, setTourData] = useState([]);
  const [contactData, setContactData] = useState(initialContactState);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };

  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_cafe_gallery: agentId,
      };
      console.log(objusr);
      postRecord(APIGetAgentInfo, objusr).then((res) => {
        console.log(res.data[0].response.data);
        if (res.data[0].response.status === "success") {
          setAgentInfoData(res.data[0].response.data.agent_details);
          setAgentPhoto(res.data[0].response.data.agentphotouploadfile);
          setAgentBanner(res.data[0].response.data.agentcomapnybanner);
          setTourData(res.data[0].response.tourdata);
          // setLink(res.data[0].response.data.agent_details.mycafegallery)
          //console.log(res.data[0].response.data.agent_details);
          // setAgentInfoData({ ...agentInfoData, ["cnfpassword"]: res.data[0].response.data.agent_details.password });
        }
      });
    }
  }, [context.state.user, agentId, sync]);
  const selectOrderbyChange = (event) => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_cafe_gallery: agentId,
      order: event.target.value,
    };
    postRecord(APIGetAgentInfo, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setTourData(res.data[0].response.tourdata);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setTourData([]);
      }
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value });
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value.replace(/\D/g, "") });
  };
  const saveContactInfo = () => {
    setOpen(true);
    contactData.authenticate_key = "abcd123XYZ";
    contactData.agentId = agentInfoData.id;
    console.log(contactData);
    postRecord(APIContactAgent, contactData)
      .then((res) => {
        console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setOpen(false);
          setContactData(initialContactState);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setOpen(false);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  return (
    <>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 p-0">
              {agentBanner ? (
                <img
                  src={agentBanner}
                  style={{
                    width: "100%",
                    backgroundSize: "cover",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={bannerImage}
                  style={{
                    width: "100%",
                    backgroundSize: "cover",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section class="profile-sec">
        <div class="container">
          <div class="row profile-row-bg align-items-center">
            <div class="col-lg-6 col-md-6">
              <div class="profile-box">
                <div class="proile-img">
                  {agentPhoto ? (
                    <img
                      style={{
                        width: "120px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={agentPhoto}
                      alt=""
                    />
                  ) : (
                    <img src={avatar} alt="" />
                  )}
                </div>
                <div class="profile-text">
                  <h4 class="mb-0">
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.fname + " " + agentInfoData.lname
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </h4>
                  <p class="mb-3">
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.company
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <a href="#">
                    <i class="fas fa-phone-alt"></i> {agentInfoData.mobile}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="right-logo">
                <img
                  style={{ width: "100px" }}
                  src={agentInfoData.headerimage}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="profile-sec-inner">
        <div class="container">
          <div class="row align-items-center profile-row-bg2">
            <div class="col-lg-6">
              <div class="profile-inner">
                <a onClick={() => setOpenProfile(true)}>
                  <i class="fal fa-user"></i> Profile
                </a>
                <a onClick={() => setOpenContact(true)}>
                  <i class="fal fa-id-card"></i> Contact Me
                </a>
              </div>
            </div>
            <div class="col-lg-6 col-md-4">
              <div class="form-group">
                <label style={{ marginRight: "10px" }} for="text1">
                  Order By :
                </label>
                <select
                  onChange={selectOrderbyChange}
                  name="interior_area"
                  id="area"
                  class="selectbox_fancy2"
                >
                  <option value="isactive asc">Status (asc)</option>
                  <option value="isactive desc">Status (desc)</option>
                  <option value="creationdate asc">Creation Date (asc)</option>
                  <option selected="selected" value="creationdate desc">
                    Creation Date (desc)
                  </option>
                  <option value="price asc">Price (asc)</option>
                  <option value="price desc">Price (desc)</option>
                  <option value="totalbedrooms asc">Bedrooms (asc)</option>
                  <option value="totalbedrooms desc">Bedrooms (desc)</option>
                  <option value="totalbathrooms asc">Bathrooms (asc)</option>
                  <option value="totalbathrooms desc">Bathrooms (desc)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="profile-box-sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="profile_listing_main">
                <div class="row">
                  {tourData &&
                    tourData.map((res) => (
                      <div class="col-lg-4 col-md-4">
                        <a
                          href={`/tour/${res.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div class="profile_listing_single h-100">
                            <div class="profile-screen">
                              <img class="" alt="image" src={res.filename} />
                              <div class="profile-screen-name">
                                {res.caption}
                              </div>
                              <div class="profile-screen-desc">
                                <p>{res.countryname}</p>
                              </div>
                            </div>
                            <div class="profile_listing_single_inner">
                              <table class="table">
                                <tbody>
                                  <tr>
                                    <th width="40%">Tour ID</th>
                                    <td width="15%">:</td>
                                    <td width="45%">{res.id}</td>
                                  </tr>
                                  <tr>
                                    <th width="40%">MLS</th>
                                    <td width="15%">:</td>
                                    <td width="45%">{res.mls}</td>
                                  </tr>
                                  <tr>
                                    <th width="40%">Price</th>
                                    <td width="15%">:</td>
                                    <td width="45%">{res.price}</td>
                                  </tr>
                                  <tr>
                                    <th width="40%">Status</th>
                                    <td width="15%">:</td>
                                    <td width="45%">
                                      {res.isactive === 1
                                        ? "Active"
                                        : "Inactive"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th width="40%">Beds</th>
                                    <td width="15%">:</td>
                                    <td width="45%">{res.totalbedrooms}</td>
                                  </tr>
                                  <tr>
                                    <th width="40%">Baths</th>
                                    <td width="15%">:</td>
                                    <td width="45%">{res.totalbathrooms}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openProfile}
      >
        <DialogTitle id="customized-dialog-title">
          <i class="fa fa-user" aria-hidden="true"></i> Agent Info
          <CancelIcon
            onClick={() => setOpenProfile(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 mx-auto">
                <h5>Personal Information</h5>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-lg-06 col-md-06 mx-auto">
                <div>
                  <img style={{ width: "300px" }} src={agentPhoto} alt="demo" />
                </div>
              </div>
              <div class="col-lg-06 col-md-06 mx-auto">
                <div>
                  <p>
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.fname + " " + agentInfoData.lname
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <p>
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.company
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <p>
                    Mobile:
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.mobile
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <p>
                    Email:{" "}
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.email
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <p>
                    Office:{" "}
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.company
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                  <p>
                    Website:
                    {Object.keys(agentInfoData).length > 0 ? (
                      agentInfoData.website
                    ) : (
                      <Skeleton
                        variant="text"
                        width={150}
                        height={20}
                        style={{ background: "#bbbbbb" }}
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openContact}
      >
        <DialogTitle id="customized-dialog-title">
          <i class="fa fa-id-card" aria-hidden="true"></i> Contact Agent
          <CancelIcon
            onClick={() => setOpenContact(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 mx-auto">
                <h5>Personal Information</h5>
              </div>
            </div>
            <hr></hr>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveContactInfo();
              }}
            >
              <div class="row">
                <div class="col-md-3 formbox1">
                  <label>
                    First Name <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                </div>
                <div class="col-md-9 formbox1">
                  <input
                    type="text"
                    class="form-control"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={contactData.first_name}
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 formbox1">
                  <label>
                    Last Name <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                </div>
                <div class="col-md-9 formbox1">
                  <input
                    type="text"
                    class="form-control"
                    name="last_name"
                    placeholder="Last Name  "
                    onChange={handleChange}
                    value={contactData.last_name}
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 formbox1">
                  <label>
                    Email <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                </div>
                <div class="col-md-9 formbox1">
                  <input
                    type="email"
                    class="form-control"
                    name="contact_email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={contactData.contact_email}
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 formbox1">
                  <label>
                    Phone <span style={{ color: "#ffa12d" }}></span>
                  </label>
                </div>
                <div class="col-md-9 formbox1">
                  <input
                    type="tel"
                    class="form-control"
                    name="phone"
                    placeholder="Phone number"
                    onChange={handlePhoneChange}
                    value={contactData.phone}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 formbox1">
                  <label>
                    Comments <span style={{ color: "#ffa12d" }}></span>
                  </label>
                </div>
                <div class="col-md-9 formbox1">
                  <input
                    type="text"
                    class="form-control"
                    name="comments"
                    placeholder="Comments"
                    onChange={handleInputChange}
                    value={contactData.comments}
                  />
                </div>
              </div>
              {/* <div class="row" >
                            <div class="col-md-3 formbox1">
                                <label>Verify <span style={{ color: "#ffa12d" }}></span></label>
                            </div>
                            <div class="col-md-9 formbox1">
                                <input type="text" class="form-control" name="" placeholder="Verify" />
                            </div>
                        </div> */}
              <div class="row">
                <div
                  class="col-md-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button type="submit" class="next_btn border-0">
                    Save
                  </button>
                </div>
              </div>
            </form>

            <div class="row">
              <div class="col-md-12 formbox1">
                <label>
                  Required fields <span style={{ color: "#ffa12d" }}>*</span>
                </label>
              </div>
            </div>
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
    </>
  );
}
