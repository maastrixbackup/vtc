import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import Button from "@material-ui/core/Button";
import Slider from "react-rangeslider";
import Switch from "react-switch";
import dateFormat from "dateformat";
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
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetEzFlashCard = APIURL() + "get-flashvideo";
const APICreateFlashCard = APIURL() + "create-flashvideo";
const APICreateSubscribeFlashVideo = APIURL() + "create-subscribe-flashvideo";

export default function AgentEzFlashCard(props) {
  const tourId = props.match.params.flashid;
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9999,
      color: "#fff",
    },
  }));
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [sync, setSync] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [flashcardData, setFlashCardData] = useState([]);
  const [flashcardDatavalue, setFlashCardDatavalue] = useState({});
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDownload, setDownloadVideo] = useState("");
  const [loading, setLoading] = useState(false);

  // const [progressBar, setProgressBar] = useState(false);

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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
    setOpenVideoModal(false);
  };

  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tourId,
      };
      postRecord(APIGetEzFlashCard, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setFlashCardData(res.data[0].response.data);
        }
      });
    }
  }, [sync, context.state.user, tourId]);
  const setVideoModal = (video) => {
    setOpenVideoModal(true);
    setVideoUrl(video);
  };

  const createEzFlashCard = (flash_data, id, is_dwnld) => {
    if (is_dwnld === "1") {
      VideoFlashDownload(flash_data.flash_data);
    }
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: tourId,
      designid: id,
      orderid: "0",
      updateval: "0",
    };
    postRecord(APICreateFlashCard, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        //setDownloadVideo(res.data[0].response.data.file)
        //setPermissionAllow(res.data[0].response.data.permissionAllow)
        // setDesignId(res.data[0].response.data.designid)
        setSync(false);
      }
      setSync(true);
    });
  };
  const downloadAndUpdate = (id, data) => {
    flashcardDatavalue.authenticate_key = "abcd123XYZ";
    flashcardDatavalue.agentId = JSON.parse(context.state.user).agentId;
    flashcardDatavalue.tourid = tourId;
    flashcardDatavalue.designid = id;
    flashcardDatavalue.orderid = "0";
    flashcardDatavalue.updateval = "0";
  };
  const createSubscribeFlashVideo = (id, flash_data, is_dwnld) => {
    setOpen(true);
    if (is_dwnld === "0") {
      // VideoFlashDownload(flash_data);
      const obj1 = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tourId,
        designid: id,
        orderid: "0",
        updateval: "0",
      };
      postRecord(APICreateSubscribeFlashVideo, obj1)
        .then((res) => {
          setOpen(false);
          if (res.status === 201) {
            // setDownloadVideo(res.data.file)
            // var link = document.createElement("a");
            // link.href = res.data.file;
            // link.setAttribute("download", "video.mp4");
            // link.setAttribute("target", "_blank");
            // document.body.appendChild(link);
            // link.click();
            downloadImage(res.data.file);
            setSync(false);
          }
          setSync(true);
        })
        .catch(() => {
          setOpen(false);
        });
    } else {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tourId,
        designid: id,
        orderid: "0",
        updateval: "0",
      };
      postRecord(APICreateSubscribeFlashVideo, obj)
        .then((res) => {
          setOpen(false);
          if (res.status === 201) {
            setDownloadVideo(res.data.file);
            // setPermissionAllow(res.data[0].response.data.permissionAllow)
            //  setDesignId(res.data[0].response.data.designid)
            setSync(false);
          }
          setSync(true);
        })
        .catch(() => {
          setOpen(false);
        });
    }
  };
  const downloadImage = async (imageUrl) => {
    console.log(imageUrl, "imageUrl");
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const src = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = src;
      // link.replace(/\s/g, "%");
      link.href = link.href.replace(/\s/g, "%20");

      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const orderAndDownload = (id, flash_data) => {
    console.log(flash_data);
    //VideoFlashDownload(flash_data.flash_data);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: tourId,
      designid: id,
      orderid: "0",
      updateval: "0",
      design_amount: flash_data.design_amount,
    };
    localStorage.setItem("order_download_data", JSON.stringify(obj));
    // postRecord(APICreateSubscribeFlashVideo, obj).then((res) => {
    //   if (res.data[0].response.status === "success") {
    //     console.log(res.data[0].response);
    //     setDownloadVideo(res.data[0].response.data.file);
    //     localStorage.setItem("file_link", res.data[0].response.data.file);
    //     setSync(false);
    //   }
    //   setSync(true);
    // });
  };
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  const VideoFlashDownload = (videoDownload) => {
    toDataURL(videoDownload, function (dataUrl) {
      var link = document.createElement("a");
      link.href = dataUrl;
      console.log(dataUrl);
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
    });
    setDownloadVideo("");
  };

  const BindFlashButton = (data) => {
    if (data.btn === 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-90px",
          }}
          id="toggleHide"
        >
          <Button
            class="need_pic save_btn"
            style={{
              width: "100%",
              margin: "10px",
              borderStyle: "none",
              zIndex: "500",
            }}
            onClick={() => createSubscribeFlashVideo(data.id, data, "0")}
          >
            Download &amp; Update
          </Button>
        </div>
      );
    }
    if (data.btn === 1) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-90px",
          }}
          id="toggleHide"
        >
          <Button
            class="need_pic save_btn"
            style={{
              width: "100%",
              margin: "10px",
              borderStyle: "none",
              zIndex: "500",
            }}
            onClick={() => createSubscribeFlashVideo(data.id, data, "1")}
          >
            Create Subscribe Flash
          </Button>
        </div>
      );
    }
    if (data.btn === 2) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-90px",
          }}
          id="toggleHide"
        >
          <Button
            class="need_pic save_btn"
            style={{
              width: "100%",
              margin: "10px",
              borderStyle: "none",
              zIndex: "500",
            }}
            onClick={() => orderAndDownload(data.id, data)}
          >
            <Link to={APIPath() + "payment-page"}>
              Order & download ${data.design_amount}
            </Link>
          </Button>
        </div>
      );
    }
    if (data.btn === 3) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-90px",
          }}
          id="toggleHide"
        >
          <Button
            class="need_pic save_btn"
            style={{
              width: "100%",
              margin: "10px",
              borderStyle: "none",
              zIndex: "500",
            }}
            onClick={() => createEzFlashCard(data, data.id, "1")}
          >
            Download &amp; Update
          </Button>
        </div>
      );
    }
    if (data.btn === 4) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-90px",
          }}
          id="toggleHide"
        >
          <Button
            class="need_pic save_btn"
            style={{
              width: "100%",
              margin: "10px",
              borderStyle: "none",
              zIndex: "500",
            }}
            onClick={() => createEzFlashCard(data, data.id, "0")}
          >
            Create EZ Flash Card
          </Button>
        </div>
      );
    }
  };
  return (
    <>
      <AgentHeader />
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <AgentDashBoardHeader ShowMenu={ShowMenu} HideMenu={HideMenu} />

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
                      <Link to={APIPath() + "agent-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>
                    <li>
                      <a href="https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783">
                        Xpressdocs
                      </a>
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
        <div class="banner-title">
          <h2>Create Your Ez-FlashCard </h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  <ul class="nav nav-tabs list_sec" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#Action"
                        role="tab"
                      >
                        <i class="fas fa-cog"></i>Action
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="action_sec_right">
                  <ul>
                    <li class="save_order">
                      <Link to={APIPath() + "agent-video-list"}>
                        <span style={{ color: "white" }}>Go To Videos</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="spacer10px"></hr>
        </div>
      </section>
      <section class="top_ten_tour">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="recent_projects_tabs">
                <div class="tab_img">
                  <div class="row">
                    {flashcardData.length > 0 ? (
                      flashcardData.map((res) => (
                        <div class="col-lg-6 col-md-6">
                          <img
                            src={res.design_tag}
                            style={{
                              position: "absolute",
                              zIndex: "99",
                              right: "6px",
                              top: "32px",
                            }}
                          />
                          <h5 style={{ fontWeight: "bold" }}>
                            {res.design_name}
                          </h5>
                          <div class="recent_projects_tabs_img">
                            <img src={res.design_photo} alt="demo"></img>

                            <div class="recent_projects_tabs_img_conts">
                              <a
                                onClick={() => setVideoModal(res.design_sample)}
                                target="_blank"
                              >
                                <div class="recent_projects_tabs_img_conts_inner">
                                  <span class="link_icn">
                                    <i class="fas fa-play-circle"></i>
                                  </span>
                                  <h4>Sample Video</h4>
                                </div>
                              </a>
                            </div>
                            {BindFlashButton(res)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <div class="row">
                          <Skeleton
                            variant="text"
                            width={600}
                            height={600}
                            style={{
                              background: "#bbbbbb",
                              marginTop: "-164px",
                              marginLeft: "45px",
                            }}
                          />
                          <Skeleton
                            variant="text"
                            width={600}
                            height={600}
                            style={{
                              background: "#bbbbbb",
                              marginTop: "-164px",
                              marginLeft: "45px",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openVideoModal}
        style={{ marginTop: "5%" }}
      >
        <DialogTitle id="customized-dialog-title">
          <CancelIcon
            onClick={() => setOpenVideoModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="agent_pop_main">
              <div class="row">
                <div class="col-md-12">
                  <iframe
                    width="100%"
                    height="440"
                    src={videoUrl}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
