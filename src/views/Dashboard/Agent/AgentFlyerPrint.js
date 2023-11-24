import React, { useState, useEffect, useContext } from "react";
import { Recorder } from "react-voice-recorder";
import $ from "jquery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import banner from "../../../images/vtc-banner.jpg";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import up_img from "../../../images/up.png";
import middle_img from "../../../images/middle.png";
import bottom_img from "../../../images/bottom.png";
import man from "../../../images/man.png";
import house_img from "../../../images/house-img.jpg";
import CancelIcon from "@material-ui/icons/Cancel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import logo from "../../../images/wallpaper.jpg";
import photo from "../../../images/photo.jpg";
import logo1 from "../../../images/logo.jpg";
import Skeleton from "@material-ui/lab/Skeleton";
import { id } from "date-fns/locale";
const APIGetViewFlyerData = APIURL() + "view-flyer";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentFlyerPrint(props) {
  const printids = props.match.params.printids;
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [sync, setSync] = useState(true);
  const [data, setData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [tourData, setTourData] = useState({});
  const [link, setLink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        tourId: printids,
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetViewFlyerData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setTourData(res.data[0].response.tourData);
          setData(res.data[0].response);
          setImgUrl(res.data[0].response.image_url[0])
          setLink(res.data[0].response.tourData.tourid);
        }
      });
    }
  }, [sync, context.state.user, printids]);
  console.log("tourData",tourData);
  useEffect(() => {
    if (Object.keys(tourData).length > 0) {
      //let print = document.getElementById("print");
      window.print();
    }
  }, [tourData]);
  return (
    <>
      <div id="print">
        {/* <div class="container" >
                    <div class="container-fluid"  >
                        <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", height: "auto" }}>
                            <div class="col-lg-7 col-md-7" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }} >
                                <p style={{ color: "white", textAlign: "center", width: "100%", lineHeight: "80px" }}>
                                    TEST<br></br>
                                    {Object.keys(tourData).length > 0 ? (
                                    <span style={{ textTransform: "uppercase" }}>{tourData.city} {tourData.countryname}</span>
                                ) : (
                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                )}
                                </p>
                            </div>
                            <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(52, 52, 52)", marginLeft: "10px" }}>
                                <div class="row">
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                        <img src={photo} width="80px" height="80px" style={{ border: "2px solid white", margin: "5px" }}></img>
                                        <img src={logo1} width="80px" height="100px" style={{ border: "2px solid white" }}></img>
                                    </div>
                                    <div style={{ textAlign: "center", width: '100%', color: "white" }}>
                                    {Object.keys(tourData).length > 0 ? (
                                            <span style={{ textTransform: "capitalize" }}>{tourData.caption} {tourData.countryname}</span>
                                        ) : (
                                            <Skeleton variant="text" width={250} height={60} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                        )}
                                    </div>
                                    <div style={{ textAlign: "center", width: '100%', color: "white" }}>
                                        <p style={{ color: "white" }}>Lic# MS03212s</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", marginTop: "05px" }}>
                            <div class="col-lg-7 col-md-7" style={{ marginLeft: "10px", backgroundImage: "url(" + logo + ")", backgroundSize: "cover", backgroundPosition: "fixed", height: "500px" }} >

                            </div>
                            <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }}>
                                <h5></h5>
                            </div>
                        </div>
                        <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", height: "250px", marginTop: "05px" }}>
                            <div class="col-lg-7 col-md-7" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }} >
                                <h5>
                                    Offered At: c$36,587,648
                                </h5>
                                <h6>Features</h6>
                                <div style={{ display: "flex", justifyContent: "space-around", alignItem: "center", width: "100%" }} >
                                    <div>
                                        <p style={{ color: "white" }}> BEDROOMS :</p>
                                        <p style={{ color: "white" }}>BATHROOMS :</p>
                                        <p style={{ color: "white" }}>GARAGE</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "white" }}>YEAR BUILT :</p>
                                        <p style={{ color: "white" }}>LOT SIZE:</p>
                                        <p style={{ color: "white" }}>INTERIOR SQ. FT :</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(52, 52, 52)", marginLeft: "10px" }}>
                                <div class="row">
                                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "80px" }}>
                                        <p style={{ color: "white" }}>https://virtualtourcafe.com/tour/4778003</p>
                                        <p style={{ color: "white" }}>All information deemed reliable, but not guaranteed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div> */}
        <div class="container">
          <div class="container-fluid">
            <div
              class="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                width: "100%",
                height: "auto",
              }}
            >
              <div
                class="col-lg-7 col-md-7"
                style={{
                  backgroundColor: "rgb(0, 174, 229)",
                  marginLeft: "10px",
                }}
              >
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    lineHeight: "80px",
                  }}
                >
                  {tourData.caption}<br></br>
                  {Object.keys(tourData).length > 0 ? (
                    <span style={{ textTransform: "uppercase" }}>
                      {tourData.city} {tourData.countryname}
                    </span>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={250}
                      height={100}
                      style={{ background: "#bbbbbb", margin: "0 auto" }}
                    />
                  )}
                </p>
              </div>
              <div
                class="col-lg-4 col-md-4"
                style={{
                  backgroundColor: "rgb(52, 52, 52)",
                  marginLeft: "10px",
                }}
              >
                <div class="row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={data.agentphoto !=null?data.agentphoto:photo}
                      width="80px"
                      height="80px"
                      alt="alt"
                      style={{ border: "2px solid white", margin: "5px" }}
                    ></img>
                    <img
                      src={data.companylogo !=null?data.companylogo:logo1}
                      width="80px"
                      height="100px"
                      style={{ border: "2px solid white" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      {Object.keys(tourData).length > 0 ? (
                        <span style={{ textTransform: "capitalize" }}>
                          {tourData.caption} {tourData.countryname}
                        </span>
                      ) : (
                        <Skeleton
                          variant="text"
                          width={250}
                          height={60}
                          style={{ background: "#bbbbbb", margin: "0 auto" }}
                        />
                      )}
                    </p>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      {tourData.companyname}
                    </p>
                    <p style={{ color: "white" }}>123-111-2232</p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    <p style={{ color: "white" }}>Lic# MS03212s</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                width: "100%",
                marginTop: "05px",
              }}
            >
              <div
                class="col-lg-7 col-md-7"
                style={{
                  marginLeft: "10px",
                  backgroundImage: "url(" + imgUrl + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "fixed",
                  height: "500px",
                }}
              ></div>
              <div
                class="col-lg-4 col-md-4"
                style={{
                  backgroundColor: "rgb(0, 174, 229)",
                  marginLeft: "10px",
                }}
              >
                <h5></h5>
              </div>
            </div>
            <div
              class="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                width: "100%",
                height: "250px",
                marginTop: "05px",
              }}
            >
              <div
                class="col-lg-7 col-md-7"
                style={{
                  backgroundColor: "rgb(0, 174, 229)",
                  marginLeft: "10px",
                }}
              >
                <h5>{tourData.price ?`Offered At: $ ${tourData.price}` :""}</h5>
                <h6>Features</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItem: "center",
                    width: "100%",
                  }}
                >
                  <div>
                    <p style={{ color: "white" }}> BEDROOMS : {tourData.totalbedrooms}</p>
                    <p style={{ color: "white" }}>BATHROOMS : {tourData.totalbathrooms}</p>
                    <p style={{ color: "white" }}>GARAGE {tourData.garagesize}</p>
                  </div>
                  <div>
                    <p style={{ color: "white" }}>YEAR BUILT : {tourData.yearbuilt}</p>
                    <p style={{ color: "white" }}>LOT SIZE: {tourData.lotsize}</p>
                    <p style={{ color: "white" }}>INTERIOR SQ. FT : {tourData.sqfootage}</p>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-4 col-md-4"
                style={{
                  backgroundColor: "rgb(52, 52, 52)",
                  marginLeft: "10px",
                }}
              >
                <div class="row">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      marginTop: "80px",
                    }}
                  >
                    {/* <p style={{ color: "white" }}>https://virtualtourcafe.com/tour/4778003</p> */}
                    <p class="img_set_para">
                      <a style={{ color: "black" }}>
                        <span
                          style={{
                            color: "",
                            textDecoration: "underline",
                            fontStyle: "italic",
                            marginBottom: "5px",
                          }}
                        >
                          https://virtualtourcafe.com/agent-flyer-tour/{link}
                        </span>
                      </a>
                    </p>
                    <p style={{ color: "white" }}>
                      All information deemed reliable, but not guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}
