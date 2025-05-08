import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import OwlCarousel from "react-owl-carousel";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "react-rangeslider";
import $ from "jquery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import banner from "../../../images/vtc-banner.jpg";
import Switch from "react-switch";
import CancelIcon from "@material-ui/icons/Cancel";
import thumbpics1 from "../../../images/thumbpics1.jpg";
import thumbpics2 from "../../../images/thumbpics2.jpg";
import thumbpics3 from "../../../images/thumbpics3.jpg";
import thumbpics4 from "../../../images/thumbpics4.jpg";
import man from "../../../images/man.png";
import one from "../../../images/1.jpg";
import two from "../../../images/2.jpg";
import three from "../../../images/3.jpg";
import four from "../../../images/4.jpg";
import five from "../../../images/5.jpg";
import six from "../../../images/6.jpg";
import seven from "../../../images/7.jpg";
import eight from "../../../images/8.jpg";
import nine from "../../../images/9.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import DragAndDrop from "./DragAndDrop";
const APIGetUserData = APIURL() + "user-details";
const APIGetVideoList = APIURL() + "get-videoList";
const APIChangeService = APIURL() + "change-tour-service";
const APIGetTourDetails = APIURL() + "tour-details";
const APIUpdateVideos = APIURL() + "update-Videos";
const APIPreviewVideo = APIURL() + "preview-video";
const APIDownloadVideo = APIURL() + "download-video";
const APIPreviewImage = APIURL() + "load-image";
const APIVideoPromotion = APIURL() + "load-video-promotion";
const APIUpdateVideoPromotion = APIURL() + "update-promotions";
const APIGetImageEditor = APIURL() + "load-image-editor";
const APIUpdateImageset = APIURL() + "image-adjustment-editimageset";
const APIUpdateOrder = APIURL() + "change-order";
const APIcropImage = APIURL() + "save-cropper-image-tour";
const APIUpdateDistributeTour = APIURL() + "update-distribute-tour";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function AgentEditVideo(props) {
  let history = useHistory();
  const classes = useStyles();
  const tour_id = props.match.params.tourid;
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [showDynamicModal, setShowDynamicModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoLIst, setVideoList] = useState([]);
  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [currentTourData, setCurrentTourData] = useState({});
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [element, setElement] = useState("");
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [openPreviewVideoModal, setOpenPreviewVideoModal] = useState(false);
  const [id, setId] = useState("");
  const [openVideoPromoModal, setOpenVideoPromoModal] = useState(false);
  const [videoPromoData, setVideoPromoData] = useState({});
  const [offset, setOffset] = useState(0);
  const [postPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [videourl, setVideoUrl] = useState("");
  const [openPreviewImageModal, setOpenPreviewImageModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditImageModal, setOpenEditImageModal] = useState(false);
  const [blurValue, setBlurValue] = useState(0);
  const [brightValue, setBrightValue] = useState(10);
  const [grayValue, setGrayValue] = useState(0);
  const [contrastValue, setContrastValue] = useState(1);
  const [hueValue, setHueValue] = useState(0);
  const [invertValue, setInvertValue] = useState(0);
  const [opacityValue, setOpacityValue] = useState(100);
  const [saturateValue, setSaturateValue] = useState(10);
  const [sepiaValue, setSepiaValue] = useState(0);
  const [rotatevalue, setRotateValue] = useState(0);
  const [previousblurValue, setpreviousblurValue] = useState(0);
  const [previousbrightValue, setpreviousBrightValue] = useState(10);
  const [previousgrayValue, setpreviousGrayValue] = useState(0);
  const [previouscontrastValue, setpreviousContrastValue] = useState(1);
  const [previoushueValue, setpreviousHueValue] = useState(0);
  const [previousinvertValue, setpreviousInvertValue] = useState(0);
  const [previousopacityValue, setpreviousOpacityValue] = useState(100);
  const [previoussaturateValue, setpreviousSaturateValue] = useState(10);
  const [previoussepiaValue, setpreviousSepiaValue] = useState(0);
  const [previousrotatevalue, setpreviousRotateValue] = useState(0);
  const [editImageData, setEditImageData] = useState({});
  const [hover, setHover] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [fileName, setFilename] = useState("");
  const [croppedImage, setCroppedImage] = useState([]);
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
  let isDragging = false;
  let scrollFrame = null;
  let lastMouseY = 0;
  
  function startAutoScroll(container) {
    function smoothScroll() {
      if (!isDragging || !container) return;
  
      const rect = container.getBoundingClientRect();
      const topZone = rect.top + rect.height * 0.2;
      const bottomZone = rect.bottom - rect.height * 0.2;
  
      let scrollDelta = 0;
      if (lastMouseY < topZone) {
        scrollDelta = -Math.max(2, (topZone - lastMouseY) / 5);
      } else if (lastMouseY > bottomZone) {
        scrollDelta = Math.max(2, (lastMouseY - bottomZone) / 5);
      }
  
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      const newScrollTop = container.scrollTop + scrollDelta;
  
      // Clamp scroll to prevent overflow
      if (newScrollTop >= 0 && newScrollTop <= maxScrollTop) {
        container.scrollTop = newScrollTop;
      }
  
      scrollFrame = requestAnimationFrame(smoothScroll);
    }
  
    scrollFrame = requestAnimationFrame(smoothScroll);
  }
  
  function stopAutoScroll() {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = null;
    isDragging = false;
    document.body.style.userSelect = "";
  }
  function handleDragStart() {
    const container = document.getElementById("gridContainer");
    if (!container) return;
  
    isDragging = true;
    document.body.style.userSelect = "none";
    startAutoScroll(container);
  }
  
  function handleDrag(e) {
    lastMouseY = e.clientY;
  }
  
  function handleDragEnd() {
    stopAutoScroll();
  }
  
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
        imageId: imageId,
        type: "flyers",
      };
      postRecord(APIGetImageEditor, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setEditImageData(res.data[0].response.data.properties[0]);
          setBlurValue(
            res.data[0].response.data.properties[0].blur === null
              ? 0
              : res.data[0].response.data.properties[0].blur
          );
          setBrightValue(
            res.data[0].response.data.properties[0].brightness === 100
              ? 10
              : res.data[0].response.data.properties[0].brightness
          );
          setGrayValue(
            res.data[0].response.data.properties[0].grayscale === null
              ? 0
              : res.data[0].response.data.properties[0].grayscale
          );
          setContrastValue(
            res.data[0].response.data.properties[0].contrast === 0
              ? 1
              : res.data[0].response.data.properties[0].contrast
          );
          setHueValue(
            res.data[0].response.data.properties[0].huerotate === null
              ? 0
              : res.data[0].response.data.properties[0].huerotate
          );
          setInvertValue(
            res.data[0].response.data.properties[0].invert === null
              ? 0
              : res.data[0].response.data.properties[0].invert
          );
          setOpacityValue(
            res.data[0].response.data.properties[0].opacity === 0
              ? 100
              : res.data[0].response.data.properties[0].opacity
          );
          setSaturateValue(
            res.data[0].response.data.properties[0].saturation === 100
              ? 10
              : res.data[0].response.data.properties[0].saturation
          );
          setSepiaValue(
            res.data[0].response.data.properties[0].sepia === null
              ? 0
              : res.data[0].response.data.properties[0].sepia
          );
          setRotateValue(
            res.data[0].response.data.properties[0].rotate === null
              ? 0
              : res.data[0].response.data.properties[0].rotate
          );

          setpreviousblurValue(
            res.data[0].response.data.properties[0].blur === null
              ? 0
              : res.data[0].response.data.properties[0].blur
          );
          setpreviousBrightValue(
            res.data[0].response.data.properties[0].brightness === 100
              ? 10
              : res.data[0].response.data.properties[0].brightness
          );
          setpreviousGrayValue(
            res.data[0].response.data.properties[0].grayscale === null
              ? 0
              : res.data[0].response.data.properties[0].grayscale
          );
          setpreviousContrastValue(
            res.data[0].response.data.properties[0].contrast === 0
              ? 1
              : res.data[0].response.data.properties[0].contrast
          );
          setpreviousHueValue(
            res.data[0].response.data.properties[0].huerotate === null
              ? 0
              : res.data[0].response.data.properties[0].huerotate
          );
          setpreviousInvertValue(
            res.data[0].response.data.properties[0].invert === null
              ? 0
              : res.data[0].response.data.properties[0].invert
          );
          setpreviousOpacityValue(
            res.data[0].response.data.properties[0].opacity === 0
              ? 100
              : res.data[0].response.data.properties[0].opacity
          );
          setpreviousSaturateValue(
            res.data[0].response.data.properties[0].saturation === 100
              ? 10
              : res.data[0].response.data.properties[0].saturation
          );
          setpreviousSepiaValue(
            res.data[0].response.data.properties[0].sepia === null
              ? 0
              : res.data[0].response.data.properties[0].sepia
          );
          setpreviousRotateValue(
            res.data[0].response.data.properties[0].rotate === null
              ? 0
              : res.data[0].response.data.properties[0].rotate
          );
        }
      });
    }
  }, [context.state.user, tour_id, imageId]);
  const resetImageValues = () => {
    setBlurValue(previousblurValue);
    setBrightValue(previousbrightValue);
    setGrayValue(previousgrayValue);
    setContrastValue(previouscontrastValue);
    setHueValue(previoushueValue);
    setInvertValue(previousinvertValue);
    setOpacityValue(previousopacityValue);
    setSaturateValue(previoussaturateValue);
    setSepiaValue(previoussepiaValue);
    setRotateValue(previousrotatevalue);
  };
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
        }
      });
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetVideoList, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setVideoList(res.data[0].response.dataProvider);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetTourDetails, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentTourData(res.data[0].response.tourdetails);
          setDistributeVideoChecked(!!res.data[0].response.createVideo);
          setCreateVideoStatus(res.data[0].response.createVideoStatus);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (videoLIst.length > 0) {
      filterData();
    }
  }, [offset, videoLIst]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  const handlePreviewVideo = () => {
    setSync(true);
    setSync(false);
    setOpenPreviewVideoModal(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
      videoId: imageId,
    };
    postRecord(APIPreviewVideo, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setVideoUrl(res.data[0].response.data.filePath);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleBlurChange = (value) => {
    setBlurValue(value);
    setEditImageData({ ...editImageData, blur: value });
  };
  const handleBrightChange = (value) => {
    setBrightValue(value);
    setEditImageData({ ...editImageData, brightness: value });
  };
  const handleGrayChange = (value) => {
    setGrayValue(value);
    setEditImageData({ ...editImageData, grayscale: value });
  };
  const handleContrastChange = (value) => {
    setContrastValue(value);
    setEditImageData({ ...editImageData, contrast: value });
  };
  const handleHueChange = (value) => {
    setHueValue(value);
    setEditImageData({ ...editImageData, huerotate: value });
  };
  const handleInvertChange = (value) => {
    setInvertValue(value);
    setEditImageData({ ...editImageData, invert: value });
  };
  const handleOpacityChange = (value) => {
    setOpacityValue(value);
    setEditImageData({ ...editImageData, opacity: value });
  };
  const handleSaturateChange = (value) => {
    setSaturateValue(value);
    setEditImageData({ ...editImageData, saturation: value });
  };
  const handleSepiaChange = (value) => {
    setSepiaValue(value);
    setEditImageData({ ...editImageData, sepia: value });
  };
  const handleRotate = (data) => {
    setRotateValue(data);
    setEditImageData({ ...editImageData, rotate: data });
  };

  const updateEditImagedata = () => {
    editImageData.authenticate_key = "abcd123XYZ";
    editImageData.agent_id = JSON.parse(context.state.user).agentId;
    editImageData.tourid = tour_id;
    editImageData.imgid = editImageData.id;
    postRecord(APIUpdateImageset, editImageData)
      .then((res) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
    const obj = {
      authenticate_key: "abcd123XYZ",
      tourId: tour_id,
      imageId: editImageData.id,
      imageName: croppedImage,
      iscrop: 1,
    };

    const formData = new FormData();
    for (let i in obj) {
      if (i === "imageName") {
        for (let file of obj[i]) {
          formData.append("imageName", file);
        }
      } else {
        formData.append(i, obj[i]);
      }
    }
    axios
      .post(APIcropImage, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
        } else {
          setOpen(false);
        }
        setSync(false);
      })
      .catch((err) => console.log(err));
  };
  const handlePreviewImage = () => {
    if (imageId === "") {
      setMessage("Please select one image");
      setOpenError(true);
    } else {
      setSync(true);
      setSync(false);
      setOpenPreviewImageModal(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
        imageId: imageId,
      };
      postRecord(APIPreviewImage, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setImageUrl(res.data[0].response.data.filepath);
          }
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
  };
  const handleImageId = (data) => {
    var div = document.getElementById("myDiv" + data.id);
    if (element !== "") {
      element.classList.remove("active");
    }
    if (element === div) {
      div.classList.remove("active");
      setElement("");
      setImageId("");
    } else {
      div.classList.add("active");
      setElement(div);
      setImageId(data.id);
    }
  };
  const handleTourChange = (event) => {
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      status: "tour",
      virtualtourservice: check,
    };
    postRecord(APIChangeService, obj)
      .then((res) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleFlyerChange = (event) => {
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      status: "flyer",
      flyerservice: check,
    };
    postRecord(APIChangeService, obj)
      .then((res) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleVideoChange = (event) => {
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      status: "video",
      videoservice: check,
    };
    postRecord(APIChangeService, obj)
      .then((res) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleVideoTourChange = (event, id) => {
    var data = [];
    videoLIst.forEach((res) => {
      if (res.id === id) {
        if (event === true) {
          res.enableonvideo = 1;
        } else {
          res.enableonvideo = 0;
        }
      }
      data.push(res);
    });
    setVideoList(data);
  };
  const handleHorRadioChange = (event, id) => {
    var data = [];
    videoLIst.forEach((res) => {
      if (res.id === id) {
        res.camera_horizontal = event.target.value;
      }
      data.push(res);
    });
    setVideoList(data);
  };
  const handleVerRadioChange = (event, id) => {
    var data = [];
    videoLIst.forEach((res) => {
      if (res.id === id) {
        res.camera_vertical = event.target.value;
      }
      data.push(res);
    });
    setVideoList(data);
  };
  const handleZoomRadioChange = (event, id) => {
    var data = [];
    videoLIst.forEach((res) => {
      if (res.id === id) {
        res.camera_zoom = event.target.value;
      }
      data.push(res);
    });
    setVideoList(data);
  };
  const updateVideoList = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      imageArr: videoLIst,
    };
    postRecord(APIUpdateVideos, obj)
      .then((res) => {
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleVideoPromo = () => {
    setOpenVideoPromoModal(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
    };
    postRecord(APIVideoPromotion, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setVideoPromoData(res.data[0].response.data);
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
  };
  const handlePodcastChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttopodcast"]: checked === true ? 1 : 0,
    });
  };
  const updateVideoPromo = () => {
    setOpen(true);
    videoPromoData.authenticate_key = "abcd123XYZ";
    videoPromoData.agent_id = JSON.parse(context.state.user).agentId;
    videoPromoData.tourId = tour_id;
    postRecord(APIUpdateVideoPromotion, videoPromoData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
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
  const handleVideoInputChange = (event) => {
    const { name, value } = event.target;
    setVideoPromoData({ ...videoPromoData, [name]: value });
  };
  const handleYoutubeChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttoyoutube"]: checked === true ? 1 : 0,
    });
  };
  const handleVimeoChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttovimeo"]: checked === true ? 1 : 0,
    });
  };
  const handleTruveoChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttotruveo"]: checked === true ? 1 : 0,
    });
  };

  const filterData = async () => {
    const endOffset = offset + postPerPage;
    setTotalData(videoLIst.slice(offset, endOffset));
    setDragImages(videoLIst);
    setPageCount(Math.ceil(videoLIst.length / postPerPage));
  };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * postPerPage) % videoLIst.length;
    setOffset(newOffset);
  };
  const BackToTourImage = () => {
    history.push(APIPath() + "agent-edit-tour/" + tour_id);
  };
  const GoToRelatedImageset = () => {
    history.push(APIPath() + "agent-edit-tour/" + tour_id);
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
  const downloadImage = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
    };
    setLoading(true);
    postRecord(APIDownloadVideo, obj)
      .then((res) => {
        setLoading(false);

        if (res.data[0].response.status === "success") {
          const videoUrl = res.data[0].response.data;

          const link = document.createElement("a");
          link.href = videoUrl;
          link.setAttribute("target", "_blank");
          link.setAttribute("download", "video.mp4");
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setOpen(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };

  const [dragImages, setDragImages] = useState([]);
  useEffect(() => {
    if (allData.length > 0) {
      setDragImages(allData);
    }
  }, [allData]);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(dragImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragImages([]);
    setDragImages(items);
    var arr = [];
    items.forEach((res) => {
      arr.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: arr,
      type: "video",
    };
    postRecord(APIUpdateOrder, obj)
      .then((res) => {
        console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          // setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    var img = document.getElementById("sd");
    // img.setAttribute('crossOrigin', 'anonymous');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(40, 60, 20, 20);
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL();
    setCroppedImage([dataURLtoFile(base64Image, fileName)]);
    setImageUrl(base64Image);
  };
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const [idsArray, setIdsArray] = useState([]);
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(dragImages, sourceIndex, targetIndex);
    setDragImages(nextState);
    console.log(dragImages);

    var arr = [];
    nextState.forEach((res) => {
      arr.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: arr,
      type: "video",
    };
    console.log(obj);
    postRecord(APIUpdateOrder, obj)
      .then((res) => {
        console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          // setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  }
  const handleCaptionChange = (event, data) => {
    const { name, value } = event.target;
    const arr = [];
    dragImages.forEach((res) => {
      if (data.id === res.id) {
        res.caption = value;
      }
      arr.push(res);
    });
    setDragImages(arr);
  };
  const options = {
    lazyLoad: true,
    loop: false,
    margin: 0,
    responsiveClass: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    autoplay: false,
    autoplayTimeout: 3500,
    autoplayHoverPause: false,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    smartSpeed: 1000,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left sp'></i>",
      "<i class='fa fa-angle-right sp'></i>",
    ],
    dots: false,
    responsive: {
      0: {
        items: 6,
      },

      600: {
        items: 6,
      },

      1024: {
        items: 6,
      },

      1366: {
        items: 6,
      },
    },
  };
  function changeHover(e) {
    setHover(true);
  }
  const [distributeVideoChecked, setDistributeVideoChecked] = useState(false);
  const [createVideoStatus, setCreateVideoStatus] = useState(false);

  const handleDistributeVideoChange = (event) => {
    setDistributeVideoChecked(event);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      state: event === true ? 1 : "0",
      tourId: tour_id,
    };
    postRecord(APIUpdateDistributeTour, obj)
      .then((res) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  return (
    <div>
      {loading && (
        <div class="load-bar">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      )}
      <AgentHeader />
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <AgentDashBoardHeader
                  ShowMenu={ShowMenu}
                  HideMenu={HideMenu}
                  imagesetId={tour_id}
                />

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
          <h2>Edit Video</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              {/* Navigation Menu */}
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
                        <i class="fas fa-cog"></i> Video Edit
                      </a>
                      <div
                        className={
                          hover ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-2">
                          <li>
                            <a class="dropdown-item" onClick={handleVideoPromo}>
                              <i class="fas fa-photo-video"></i> Distribute
                              Video
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handleVideoPromo}>
                              <i class="fas fa-video"></i> Video Promotion{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handlePreviewVideo}
                            >
                              <i class="fas fa-magic"></i> Preview Video Frame{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handlePreviewImage}
                            >
                              <i class="fas fa-eye"></i> Preview Image Frame
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={downloadImage}>
                              <i class="fas fa-print"></i> Download Video
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => GoToRelatedImageset()}
                              data-toggle="modal"
                              data-target="#"
                            >
                              <i class="fas fa-newspaper"></i> Go to related
                              Tour
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setShowDynamicModal(true)}
                              style={{ marginBottom: "20px" }}
                            >
                              <i class="fas fa-magic"></i> Change Order
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* Navigation Menu */}
              {/* 
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  <ul class="nav nav-tabs list_sec" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#Actions_tab"
                        role="tab"
                      >
                        <i class="fas fa-cog"></i>Video Edit
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
               */}
            </div>
          </div>
          {/*
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="tab-content">
                <div
                  class="tab-pane active"
                  id="Actions_tab"
                  role="tabpanel"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  <div class="property_info_cont agent_img_sets" id="demo">
                    <section class="snap-scrolling-example">
                      <div class="horizontal-images tabscroll-windows">
                        <OwlCarousel margin={10} {...options} id="home_slide1">
                          <div className="asdf">
                            <a onClick={handleVideoPromo}>
                              <span>
                                <i class="fas fa-photo-video"></i>
                              </span>
                              Distribute Video
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handleVideoPromo}>
                              <span>
                                <i class="fas fa-video"></i>
                              </span>
                              Video Promotion{" "}
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handlePreviewVideo}>
                              <span>
                                <i class="fas fa-magic"></i>
                              </span>
                              Preview Video Frame{" "}
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handlePreviewImage}>
                              <span>
                                <i class="fas fa-eye"></i>
                              </span>
                              Preview Image Frame
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={downloadImage}>
                              <span>
                                <i class="fas fa-print"></i>
                              </span>
                              Download Video
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => BackToTourImage()}
                              data-toggle="modal"
                              data-target="#"
                            >
                              <span>
                                <i class="fas fa-mail-bulk"></i>
                              </span>
                              Back to Tour Images
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => GoToRelatedImageset()}
                              data-toggle="modal"
                              data-target="#"
                            >
                              <span>
                                <i class="fas fa-newspaper"></i>
                              </span>
                              Go to related Tour
                            </a>
                          </div>
                        </OwlCarousel>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        */}
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="test_sec">
                <div class="test_sec_left row">
                  <div class="mx-3">
                    <Switch
                      onChange={(event) => handleDistributeVideoChange(event)}
                      checked={distributeVideoChecked}
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
                          Off
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
                          On
                        </div>
                      }
                      className="react-switch"
                    />
                  </div>
                  <span>Status :{createVideoStatus}</span>
                </div>
                <div class="test_sec_right">
                  <button
                    onClick={() => updateVideoList()}
                    type="button"
                    class="next_btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ paddingTop: "20px" }}>
            <div class="col-lg-12 col-md-12">
              <div class="image_service">
                <ul>
                  <li>
                    <h6>Image Set Services</h6>
                  </li>
                  <li>
                    <div class="download_qr">
                      <p class="img_set_para">Tour Service</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleTourChange}
                          value={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.virtualtourservice
                          }
                          checked={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.virtualtourservice === 1
                              ? true
                              : false
                          }
                          class="custom-control-input"
                          id="customSwitch1114"
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch1114"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="download_qr">
                      <p class="img_set_para">Flyer Service</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleFlyerChange}
                          value={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.flyerservice
                          }
                          checked={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.flyerservice === 1
                              ? true
                              : false
                          }
                          class="custom-control-input"
                          id="customSwitch11114"
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch11114"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="download_qr">
                      <p class="img_set_para">Video Service</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleVideoChange}
                          value={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.videoservice
                          }
                          checked={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.videoservice === 1
                              ? true
                              : false
                          }
                          class="custom-control-input"
                          id="customSwitch111114"
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch111114"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <GridContextProvider onChange={onChange}>
            <div>
              <GridDropZone
                boxesPerRow={3}
                rowHeight={420}
                style={{
                  height: "900px",
                  overflow: "visible",
                  overflowX: "hidden",
                }}
              >
                {dragImages.map((res, index) => (
                  <GridItem key={res.id}>
                    <div
                      onClick={() => {
                        setImageUrl(res.filepath);
                        setImageId(res.id);
                        handleImageId(res);
                      }}
                      class="col-lg-12 col-md-12"
                    >
                      <div
                        id={"myDiv" + res.id}
                        style={{ cursor: "pointer" }}
                        class="select_img_set_box new_edit_tour_sec"
                      >
                        <div
                          class="tab-content py-3 px-3 px-sm-0"
                          id="nav-tabContent"
                        >
                          <div
                            class="tab-pane fade show active"
                            id={"nav-home" + res.id}
                            role="tabpanel"
                            aria-labelledby={"nav-home-tab" + res.id}
                          >
                            <div class="row">
                              <div class="col-12">
                                <div class="select_img_set_box_img">
                                  <img src={res.filepath} alt="" />
                                  {res.image_type === "panoramas" ? (
                                    <img
                                      className="ribbon"
                                      src={res.flag_img}
                                      style={{
                                        position: "absolute",
                                        width: "57px",
                                        right: "5px",
                                        top: "13px",
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                      draggable={false}
                                      alt=""
                                    />
                                  ) : (
                                    <i
                                      onClick={() => {
                                        setOpenEditImageModal(true);
                                        setFilename(res.filename);
                                      }}
                                      class="far fa-edit edit-btn"
                                      style={{ top: "20px" }}
                                    ></i>
                                  )}
                                </div>
                              </div>
                              <div class="col-12 mt-2">
                                <div class="select_img_set_box_cont">
                                  <input
                                    type="text"
                                    name=""
                                    onChange={(event) =>
                                      handleCaptionChange(event, res)
                                    }
                                    value={res.caption}
                                    placeholder={res.caption}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div
                                class="col-md-9 formbox1"
                                style={{ marginTop: "10px" }}
                              >
                                <label style={{ marginRight: "35px" }}>
                                  Use this Image on video ?
                                  <span style={{ color: "#ffa12d" }}></span>
                                </label>
                              </div>
                              <div
                                class="col-md-3 formbox1"
                                style={{ marginTop: "7px" }}
                              >
                                <Switch
                                  onChange={(event) => {
                                    handleVideoTourChange(event, res.id);
                                  }}
                                  checked={
                                    res.enableonvideo === 1 ? true : false
                                  }
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
                          <div
                            class="tab-pane fade"
                            id={"nav-profile" + res.id}
                            role="tabpanel"
                            aria-labelledby={"nav-profile-tab" + res.id}
                          >
                            <div class="row">
                              <div class="col-12">
                                <div class="select_img_set_box_img">
                                  <img src={res.filepath} alt="" />
                                  {res.image_type === "image" ? (
                                    <i
                                      data-toggle="modal"
                                      data-target="#edit_img"
                                      class="far fa-edit edit-btn"
                                    ></i>
                                  ) : res.image_type === "panoramas" ? (
                                    <img
                                      src={res.flag_img}
                                      style={{
                                        position: "absolute",
                                        width: "80px",
                                        right: "5px",
                                        top: "5px",
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                      draggable={false}
                                      alt=""
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div class="col-12 mt-2">
                                <div class="caption_setting">
                                  <h6>Caption Setting</h6>
                                </div>
                                <div class="row">
                                  <div class="col-lg-12 col-md-12">
                                    <div class="table-responsive">
                                      <table class="table image-settings">
                                        <thead>
                                          <tr>
                                            <th>Horizontal</th>
                                            <th>Vertical</th>
                                            <th>Zooming</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr class="mini-chk">
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleHorRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"hor" + res.id}
                                                value="none"
                                                id={"hra" + res.id}
                                                checked={
                                                  res.camera_horizontal ===
                                                  "none"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"hra" + res.id}
                                              >
                                                <img src={one} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleVerRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"ver" + res.id}
                                                value="none"
                                                id={"vra" + res.id}
                                                checked={
                                                  res.camera_vertical === "none"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"vra" + res.id}
                                              >
                                                <img src={four} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleZoomRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"zoom" + res.id}
                                                value="none"
                                                id={"zooma" + res.id}
                                                checked={
                                                  res.camera_zoom === "none"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"zooma" + res.id}
                                              >
                                                <img src={seven} />
                                              </label>
                                            </td>
                                          </tr>
                                          <tr class="mini-chk">
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleHorRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"hor" + res.id}
                                                value="right"
                                                id={"hrb" + res.id}
                                                checked={
                                                  res.camera_horizontal ===
                                                  "right"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"hrb" + res.id}
                                              >
                                                <img src={two} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleVerRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"ver" + res.id}
                                                value="top"
                                                id={"vrb" + res.id}
                                                checked={
                                                  res.camera_vertical === "top"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"vrb" + res.id}
                                              >
                                                <img src={five} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleZoomRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"zoom" + res.id}
                                                value="in"
                                                id={"zoomb" + res.id}
                                                checked={
                                                  res.camera_zoom === "in"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"zoomb" + res.id}
                                              >
                                                <img src={eight} />
                                              </label>
                                            </td>
                                          </tr>
                                          <tr class="mini-chk">
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleHorRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"hor" + res.id}
                                                value="left"
                                                id={"hrc" + res.id}
                                                checked={
                                                  res.camera_horizontal ===
                                                  "left"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"hrc" + res.id}
                                              >
                                                <img src={three} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleVerRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"ver" + res.id}
                                                value="bottom"
                                                id={"vrc" + res.id}
                                                checked={
                                                  res.camera_vertical ===
                                                  "bottom"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"vrc" + res.id}
                                              >
                                                <img src={six} />
                                              </label>
                                            </td>
                                            <td>
                                              <input
                                                style={{ display: "none" }}
                                                class="radio"
                                                type="radio"
                                                onChange={(event) => {
                                                  handleZoomRadioChange(
                                                    event,
                                                    res.id
                                                  );
                                                }}
                                                name={"zoom" + res.id}
                                                value="out"
                                                id={"zoomc" + res.id}
                                                checked={
                                                  res.camera_zoom === "out"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                id="lbl"
                                                for={"zoomc" + res.id}
                                              >
                                                <img src={nine} />
                                              </label>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="nav_tab_sec">
                          <nav>
                            <div
                              class="nav nav-tabs nav-fill"
                              id="nav-tab"
                              role="tablist"
                            >
                              <a
                                class="nav-item active first"
                                id={"nav-home-tab" + res.id}
                                data-toggle="tab"
                                href={"#nav-home" + res.id}
                                role="tab"
                                aria-controls={"#nav-home" + res.id}
                                aria-selected="true"
                              >
                                <i class="far fa-dot-circle"></i>
                              </a>
                              <a
                                class="nav-item middle"
                                id={"nav-profile-tab" + res.id}
                                data-toggle="tab"
                                href={"#nav-profile" + res.id}
                                role="tab"
                                aria-controls={"nav-profile" + res.id}
                                aria-selected="false"
                              >
                                <i class="far fa-dot-circle"></i>
                              </a>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </GridDropZone>
            </div>
          </GridContextProvider>
        </div>
      </section>

      <Footer />

      <Dialog
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPreviewVideoModal}
      >
        <DialogTitle id="customized-dialog-title">
          Preview Video Frame
          <CancelIcon
            onClick={() => setOpenPreviewVideoModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="agent_pop_main">
              <div class="row">
                <div class="col-md-12">
                  {videourl ? (
                    <video autoPlay width="620" height="240" controls>
                      <source src={videourl} type="video/mp4" />
                    </video>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPreviewImageModal}
      >
        <DialogTitle id="customized-dialog-title">
          Preview Image Frame
          <CancelIcon
            onClick={() => setOpenPreviewImageModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="agent_pop_main">
              <div class="row">
                <div class="col-md-12">
                  {imageUrl ? <img src={imageUrl} alt="" /> : ""}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openVideoPromoModal}
      >
        <DialogTitle id="customized-dialog-title">
          Video Promotion
          <CancelIcon
            onClick={() => setOpenVideoPromoModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="agent_pop_main">
            <div class="agent_pop_main_head">
              <h5>You Tube</h5>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateVideoPromo();
              }}
            >
              <div class="video_promo">
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Title</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <input
                          type="text"
                          onChange={handleVideoInputChange}
                          name="videotitle"
                          class="form-control"
                          value={videoPromoData.videotitle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Description</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <textarea
                          rows="3"
                          onChange={handleVideoInputChange}
                          name="videodescription"
                          class="form-control"
                          value={videoPromoData.videodescription}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>
                          Keywords (comma seperated Each keyword max:30,
                          min:2)(Total Max:500)
                        </h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <textarea
                          onChange={handleVideoInputChange}
                          name="videokeywords"
                          rows="3"
                          class="form-control"
                          value={videoPromoData.videokeywords}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Link</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <input
                          type="text"
                          onChange={handleVideoInputChange}
                          name="youtubelink"
                          class="form-control"
                          value={videoPromoData.youtubelink}
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Vimeo Link</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <input
                          type="text"
                          onChange={handleVideoInputChange}
                          name="vimeolink"
                          class="form-control"
                          value={videoPromoData.vimeolink}
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Post To Youtube?</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        <Switch
                          onChange={handleYoutubeChange}
                          checked={videoPromoData.posttoyoutube}
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
                        {/* <div class="switchToggle custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitch1114" name="posttoyoutube" onChange={handleCheckboxChange} value={videoPromoData.posttoyoutube} checked={videoPromoData.posttoyoutube === 1 ? true : false} />
                                                    <label class="custom-control-label" for="customSwitch1114">&nbsp;</label>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Post To Vimeo?</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        {/* <div class="switchToggle custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitch1114" name="posttovimeo" onChange={handleCheckboxChange} value={videoPromoData.posttovimeo} checked={videoPromoData.posttovimeo === 1 ? true : false} />
                                                    <label class="custom-control-label" for="customSwitch1114">&nbsp;</label>
                                                </div> */}
                        <Switch
                          onChange={handleVimeoChange}
                          checked={videoPromoData.posttovimeo}
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
                </div>
                <div class="agent_pop_main_head">
                  <h5>Truveo</h5>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Enable Video For Truveo?</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        {/* <div class="switchToggle custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitch1114" name="posttotruveo" onChange={handleCheckboxChange} value={videoPromoData.posttotruveo} checked={videoPromoData.posttotruveo === 1 ? true : false} />
                                                    <label class="custom-control-label" for="customSwitch1114">&nbsp;</label>
                                                </div> */}
                        <Switch
                          onChange={handleTruveoChange}
                          checked={videoPromoData.posttotruveo}
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
                </div>
                <div class="agent_pop_main_head">
                  <h5>Podcast</h5>
                </div>
                <div class="video_promo_single">
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="video_promo_title">
                        <h5>Enable Video For Podcast?</h5>
                      </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                      <div class="video_promo_right">
                        {/* <div class="switchToggle custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitch1114" name="posttopodcast" onChange={handleCheckboxChange} value={videoPromoData.posttopodcast} checked={videoPromoData.posttopodcast === 1 ? true : false} />
                                                    <label class="custom-control-label" for="customSwitch1114">&nbsp;</label>
                                                </div> */}
                        <Switch
                          onChange={handlePodcastChange}
                          checked={videoPromoData.posttopodcast}
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
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                save
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditImageModal}
      >
        <DialogTitle id="customized-dialog-title">
          Image Adjustment
          <CancelIcon
            onClick={() => setOpenEditImageModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="">
            <div class="browse_img_conts_main">
              <div class="row">
                <div class="col-md-6" style={{ marginTop: "20px" }}>
                  {imageUrl && imageUrl ? (
                    <ReactCrop
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                    >
                      <img
                        id="sd"
                        alt=""
                        src={imageUrl}
                        style={{
                          filter:
                            "blur(" +
                            previousblurValue / 10 +
                            "px)  brightness(" +
                            previousbrightValue / 10 +
                            ") grayscale(" +
                            previousgrayValue +
                            "%) contrast(" +
                            previouscontrastValue +
                            ") hue-rotate(" +
                            previoushueValue / 10 +
                            "rad) invert(" +
                            previousinvertValue +
                            "%) opacity(" +
                            previousopacityValue +
                            "%) saturate(" +
                            previoussaturateValue / 10 +
                            ") sepia(" +
                            previoussepiaValue +
                            "%)",
                          transform: "rotate(" + previousrotatevalue + "deg)",
                        }}
                      />
                    </ReactCrop>
                  ) : (
                    ""
                  )}
                  <div class="row">
                    <div class="col-md-3">
                      <button
                        onClick={() => {
                          cropImageNow();
                        }}
                        type="button"
                        class="next_btn border-0"
                      >
                        Apply
                      </button>
                    </div>
                    <div class="col-md-9">
                      <div class="row padd_top">
                        <div class="col-lg-3 col-md-3">
                          <div class="service_links_left">
                            <h6>Rotate:</h6>
                          </div>
                        </div>
                        <div class="col-lg-9 col-md-9">
                          <div class="rotate_link">
                            <ul>
                              <li>
                                <a
                                  id="anchor"
                                  onClick={() => handleRotate(180)}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-solid fa-rotate-left"
                                    style={{ marginRight: "8px" }}
                                  ></i>
                                  180°
                                </a>
                              </li>
                              <li>
                                <a id="anchor" onClick={() => handleRotate(90)}>
                                  <i
                                    class="fa fa-solid fa-rotate-left"
                                    style={{ marginRight: "8px" }}
                                  ></i>
                                  90°
                                </a>
                              </li>
                              <li>
                                <a
                                  id="anchor"
                                  onClick={() => handleRotate(-90)}
                                >
                                  <i
                                    class="fa fa-solid fa-rotate-right"
                                    style={{ marginRight: "8px" }}
                                  ></i>
                                  -90°
                                </a>
                              </li>
                              <li>
                                <a id="anchor" onClick={() => handleRotate(0)}>
                                  <i
                                    class="fa fa-solid fa-rotate-right"
                                    style={{ marginRight: "8px" }}
                                  ></i>
                                  -180°
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" style={{ marginTop: "20px" }}>
                  <img
                    id="sd"
                    alt=""
                    src={imageUrl}
                    style={{
                      filter:
                        "blur(" +
                        blurValue / 10 +
                        "px)  brightness(" +
                        brightValue / 10 +
                        ") grayscale(" +
                        grayValue +
                        "%) contrast(" +
                        contrastValue +
                        ") hue-rotate(" +
                        hueValue / 10 +
                        "rad) invert(" +
                        invertValue +
                        "%) opacity(" +
                        opacityValue +
                        "%) saturate(" +
                        saturateValue / 10 +
                        ") sepia(" +
                        sepiaValue +
                        "%)",
                      transform: "rotate(" + rotatevalue + "deg)",
                    }}
                  />
                </div>
                <div class="col-md-6" style={{ marginTop: "20px" }}>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Blur</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={blurValue}
                        onChange={handleBlurChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Grayscale</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={grayValue}
                        onChange={handleGrayChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Brightness</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={brightValue}
                        onChange={handleBrightChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Contrast</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={contrastValue}
                        onChange={handleContrastChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Huerotate</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={hueValue}
                        onChange={handleHueChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6" style={{ marginTop: "20px" }}>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Invert</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={invertValue}
                        onChange={handleInvertChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Opacity</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={opacityValue}
                        onChange={handleOpacityChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Saturate</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={saturateValue}
                        onChange={handleSaturateChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2 col-md-2">
                      <label style={{ marginTop: "14px" }}>Sepia</label>
                    </div>
                    <div class="col-lg-10 col-md-10">
                      <Slider
                        min={0}
                        max={100}
                        value={sepiaValue}
                        onChange={handleSepiaChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-1"></div>
              </div>
              <div class="row">
                <div class="col-md-5"></div>
                <div class="col-md-7">
                  <button
                    onClick={() => {
                      updateEditImagedata();
                    }}
                    type="button"
                    class="next_btn border-0"
                  >
                    UPDATE
                  </button>
                  <button
                    onClick={() => {
                      resetImageValues();
                    }}
                    type="button"
                    class="next_btn border-0"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div class="agent_pop">
        <div id="Distributetour" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Distribute Tour<i class="fad fa-chart-network"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="popup_tour_main">
                  <div class="popup_tour">
                    <div class="popup_tour_head">
                      <h5>Tour</h5>
                    </div>
                  </div>
                  <div class="dist_tour_cont">
                    <div class="dist_tour_cont_socila">
                      <h6 class="social_head">Be Social-Share Your Tour</h6>
                      <div class="blog_left_inner_share inner_blog">
                        <ul>
                          <li>
                            <a target="_blank" href="">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="">
                              <i class="fab fa-pinterest-p"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="dist_tour_cont_socila_copy">
                      <h6 class="social_head">Copy & Paste Links to:</h6>
                      <div class="dist_tour_cont_socila_copy_cont">
                        <p>
                          Zillow Group (Zillow/Trulia/HotPads), Homes.com and
                          Others.
                        </p>
                        <div class="table_sec">
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "20%" }}>
                                  Branded Tour Link:
                                </td>
                                <td style={{ width: "60%" }}>
                                  <input
                                    readonly="true"
                                    type="text"
                                    value="https://virtualtourcafe.com/tour/576170"
                                  />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {" "}
                                  <button class="next_btn">Copy</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p>Multple Listng Service (MLS)</p>
                        <div class="table_sec">
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "20%" }}>
                                  Un-Branded Tour Link:
                                </td>
                                <td style={{ width: "60%" }}>
                                  <input
                                    readonly="true"
                                    type="text"
                                    value="https://virtualtourcafe.com/tour/576170"
                                  />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {" "}
                                  <button class="next_btn">Copy</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="popup_tour_head">
                      <h5>Video</h5>
                    </div>
                    <div class="socila_status">
                      <div class="row">
                        <div class="col-lg-12 col-md-12">
                          <div class="socila_status_single">
                            <label>Distribute Video</label>
                            <div class="switchToggle custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customSwitch1114"
                              />
                              <label
                                class="custom-control-label"
                                for="customSwitch1114"
                              >
                                &nbsp;
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="add_img" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Add Images<i class="far fa-image"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_pop_main_head">
                    <h5>Select Images</h5>
                  </div>
                  <h6 class="optimal_pic mar_top">
                    Optimal picture size is 1075x768. Images should not be
                    larger than 5mb file size and no smaller than 1075x768 or
                    larger.
                  </h6>
                  <div class="drag_img_box">
                    <div class="drag_img_box_cont">
                      <i class="fas fa-image"></i>
                      <p>
                        Drag you image here, or <strong>Browse</strong>
                      </p>
                      <small>Support JPG, JPEG2000, PNG </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="themes" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Themes<i class="fas fa-gopuram"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="themes_main">
                    <p>
                      Select any theme and use with your brokerage banner or
                      branding – themes are color designs only and can be used
                      by any agent or broker.
                    </p>
                    <button type="button" class="next_btn">
                      Save
                    </button>
                    <div class="app_preview mar_top">
                      <p>Use Premium Theme</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customSwitch20"
                          checked=""
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch20"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                    <div class="agent_pop_main_head padd_top">
                      <h5>Premium Tour Themes</h5>
                    </div>
                    <div class="pre_tour">
                      <div class="row">
                        <div class="col-lg-3 col-md-3">
                          <div class="pre_tour_single">
                            <label class="container_new">
                              <img src={thumbpics1} />
                              <input
                                type="radio"
                                checked="checked"
                                name="radio"
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="pre_tour_single">
                            <label class="container_new">
                              <img src={thumbpics2} />
                              <input type="radio" checked="" name="radio" />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="pre_tour_single">
                            <label class="container_new">
                              <img src={thumbpics3} />
                              <input type="radio" checked="" name="radio" />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                          <div class="pre_tour_single">
                            <label class="container_new">
                              <img src={thumbpics4} />
                              <input type="radio" name="radio" />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="menu_opt" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Menu Option<i class="fas fa-bars"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Viewer</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Vitual Tour</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch202"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch202"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Gallery</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch21"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch21"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Floor Plans</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch22"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch22"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Youtube Videos</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Share</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Send to a Friend</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch20"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch20"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Save Tour</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch21"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch21"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Service Links</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch22"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch22"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Social Media</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Detail</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Property Information</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch20"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch20"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Amenities</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch21"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch21"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Printable Flyer</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch22"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch22"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Contact</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Agent Info</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch20"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch20"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Contact Agent</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch21"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch21"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Schedule Appointment</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch22"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch22"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>My Listings</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>My Website</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Tools</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Map View</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch20"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch20"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Street View</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch21"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch21"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Mortgage Calculator</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch22"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch22"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Walk Score</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <p>Area Schools</p>
                          <div class="switchToggle custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch201"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch201"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Tab Order</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="tab_sec_main_sec">
                          <i class="fas fa-home"></i>
                          <h6>Virtual Tour</h6>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-3">
                        <div class="tab_sec_main_sec">
                          <i class="far fa-images"></i>
                          <h6>Gallery</h6>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-3">
                        <div class="tab_sec_main_sec">
                          <i class="fas fa-ruler-horizontal"></i>
                          <h6>Floor Plans</h6>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-3">
                        <div class="tab_sec_main_sec">
                          <i class="fab fa-youtube"></i>
                          <h6>Youtube</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="agent_pop_tab" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Co-listing agent <i class="fas fa-user"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Viewer</h5>
                  </div>
                  <div class="agent_pop_tab_sec">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 mx-auto">
                        <div class="agent_pop_tab_sec_single">
                          <div class="agent_pop_tab_sec_single_img">
                            <img src={man} alt="" title="" />
                          </div>
                          <div class="agent_pop_tab_sec_single_cont uploadimage p-0">
                            <div class="custom-file" style={{ width: "40%" }}>
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFileInput"
                                aria-describedby="customFileInput"
                              />
                              <label
                                class="custom-file-label"
                                for="customFileInput"
                              >
                                Select file
                              </label>
                            </div>
                            <button
                              type="button"
                              class="btn-style-two border-0"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Personal Information</h5>
                  </div>
                  <div class="personalinfo">
                    <div class="row">
                      <div class="col-md-6 formbox1">
                        <label>License No.</label>
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-md-6 formbox1">
                        <label>
                          First Name <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 formbox1">
                        <label>
                          Last Name <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-md-6 formbox1">
                        <label>
                          Email <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 formbox1">
                        <label>
                          Website <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-md-6 formbox1">
                        <div class="row">
                          <div class="col-md-6">
                            <label>
                              Mobile <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input type="text" class="form-control" />
                          </div>
                          <div class="col-md-6">
                            <label>
                              Office Phone{" "}
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 formbox1">
                        <label>
                          Company name{" "}
                          <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 formbox1">
                        <label>Agent Profile </label>
                        <textarea class="form-control"></textarea>
                      </div>
                      <div class="col-md-6 formbox1">
                        <label>Credentials </label>
                        <textarea class="form-control"></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <button type="button" class="next_btn border-0">
                          UPDATE
                        </button>
                        <button type="button" class="next_btn grey border-0">
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="Amenities" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Amenities<i class="fas fa-file-spreadsheet"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <div class="browse_img_conts">
                      <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#Appliances"
                            role="tab"
                          >
                            <i class="fas fa-blender-phone"></i>Appliances
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#Interior"
                            role="tab"
                          >
                            <i class="fab fa-intercom"></i>Interior Amenities
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#Exterior"
                            role="tab"
                          >
                            <i class="fas fa-campground"></i>Exterior Amenities
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#Community"
                            role="tab"
                          >
                            <i class="fas fa-users"></i>Community Amenities
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content" id="">
                      <div
                        class="tab-pane active"
                        id="Appliances"
                        role="tabpanel"
                      >
                        <div class="agent_pop_main_head padd_top">
                          <h5>Appliances</h5>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="Interior" role="tabpanel">
                        <div class="agent_pop_main_head padd_top">
                          <h5>Interior Amenities</h5>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="Exterior" role="tabpanel">
                        <div class="agent_pop_main_head padd_top">
                          <h5>Exterior Amenities</h5>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="Community" role="tabpanel">
                        <div class="agent_pop_main_head padd_top">
                          <h5>Community Amenities</h5>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Central Vacuum</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dishwasher</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Double Oven</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Dryer</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="mar_top row">
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Electric Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch20"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch20"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Garbage Disposal</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch21"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch21"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p>Gas Range Cooktop</p>
                              <div class="switchToggle custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customSwitch22"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customSwitch22"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="Property" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Property Information<i class="fas fa-info-circle"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <div class="browse_img_conts">
                      <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                          >
                            <i class="fas fa-user-edit"></i>Description
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                          >
                            <i class="fas fa-globe"></i>Features
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#messages"
                            role="tab"
                          >
                            <i class="fas fa-money-bill"></i>Pricing
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#location"
                            role="tab"
                          >
                            <i class="fas fa-location-arrow"></i>Location
                            Information
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#docs"
                            role="tab"
                          >
                            <i class="fab fa-wpforms"></i>Docs/Forms
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content" id="">
                      <div class="tab-pane active" id="home" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bedrooms
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bathrooms{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Parking Space{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Year Built{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Subdivision{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  LOT Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Garage Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>School District </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>Square Footage </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>MLS </label>
                                <select
                                  type="text"
                                  class="form-control formbox1select"
                                >
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <button type="button" class="next_btn border-0">
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="profile" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bedrooms
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bathrooms{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Parking Space{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Year Built{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Subdivision{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  LOT Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Garage Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>School District </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>Square Footage </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>MLS </label>
                                <select
                                  type="text"
                                  class="form-control formbox1select"
                                >
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <button type="button" class="next_btn border-0">
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="messages" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bedrooms
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bathrooms{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Parking Space{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Year Built{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Subdivision{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  LOT Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Garage Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>School District </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>Square Footage </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>MLS </label>
                                <select
                                  type="text"
                                  class="form-control formbox1select"
                                >
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <button type="button" class="next_btn border-0">
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="location" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bedrooms
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bathrooms{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Parking Space{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Year Built{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Subdivision{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  LOT Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Garage Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>School District </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>Square Footage </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>MLS </label>
                                <select
                                  type="text"
                                  class="form-control formbox1select"
                                >
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <button type="button" class="next_btn border-0">
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="docs" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bedrooms
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Bathrooms{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Parking Space{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  Year Built{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Subdivision{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>
                                  LOT Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>
                                  Garage Size{" "}
                                  <span style={{ color: "#ffa12d" }}>*</span>
                                </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>School District </label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 formbox1">
                                <label>Square Footage </label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="col-md-6 formbox1">
                                <label>MLS </label>
                                <select
                                  type="text"
                                  class="form-control formbox1select"
                                >
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                  <option>MLS</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <button type="button" class="next_btn border-0">
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="Newsletter" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Add NewsLetter<i class="fab fa-wpforms"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <div class="row">
                      <div class="col-md-12 formbox1">
                        <label>
                          Forms<span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <textarea class="form-control" rows="5"></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <button type="button" class="next_btn border-0 mr-1">
                          Save
                        </button>
                        <button type="button" class="next_btn grey border-0">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="">
                  Save
                </button>
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={showDynamicModal}
        onClose={() => setShowDynamicModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Edit Video Frames
          <CancelIcon
            onClick={() => setShowDynamicModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            padding: "16px",
            height: "80vh",
            position: "relative"
          }}
        >
          {/* --- Start Modal Content --- */}
          <GridContextProvider
            onChange={onChange}
            scrollable={true}
            scrollSpeed={15}
          >
            <div
              id="gridContainer"
              className="grid-container videoeditmodal"
              style={{
                height: "100%",
                position: "relative",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <GridDropZone
                boxesPerRow={3}
                rowHeight={200}
                style={{
                  height: Math.ceil(dragImages.length / 3) * 200 + "px",
                  position: "relative",
                  width: "100%",
                  paddingBottom: "60px",
                }}
              >
                {dragImages.map((res, index) => (
                  <GridItem
                    key={res.id}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                  >
                    <div
                      onClick={() => {
                        setImageUrl(res.filepath);
                        setImageId(res.id);
                        handleImageId(res);
                      }}
                      className="col-lg-12 col-md-12"
                    >
                      <div
                        id={"myDiv" + res.id}
                        style={{ cursor: "pointer" }}
                        class="select_img_set_box new_edit_tour_sec"
                      >
                        <div
                          class="tab-content py-3 px-3 px-sm-0 py-sm-0"
                          id="nav-tabContent"
                        >
                          <div
                            class="tab-pane fade show active"
                            id={"nav-home" + res.id}
                            role="tabpanel"
                            aria-labelledby={"nav-home-tab" + res.id}
                          >
                            <div class="row">
                              <div class="col-12">
                                <div class="select_img_set_box_img">
                                  <img src={res.filepath} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </GridDropZone>
            </div>
          </GridContextProvider>
          {/* --- End Modal Content --- */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
