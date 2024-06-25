import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";
import Button from "@material-ui/core/Button";
import Switch from "react-switch";
import Slider from "react-rangeslider";
import banner from "../../../images/vtc-banner.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import thumbpics1 from "../../../images/thumbpics1.jpg";
import thumbpics2 from "../../../images/thumbpics2.jpg";
import thumbpics3 from "../../../images/thumbpics3.jpg";
import thumbpics4 from "../../../images/thumbpics4.jpg";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { EditorState } from "draft-js";
import { ContentState, Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CsvFiledownloader from "../../../components/CsvfileDownload/CsvFiledownloader";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import OwlCarousel from "react-owl-carousel";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import ReactDOMServer from "react-dom/server";
import FlyerTheme1 from "./components/flyer/FlyerTheme1";
import FlyerTheme2 from "./components/flyer/FlyerTheme2";
import FlyerTheme3 from "./components/flyer/FlyerTheme3";
import FlyerTheme4 from "./components/flyer/FlyerTheme4";
import FlyerTheme5 from "./components/flyer/FlyerTheme5";
import FlyerTheme6 from "./components/flyer/FlyerTheme6";
import FlyerTheme7 from "./components/flyer/FlyerTheme7";
import FlyerTheme8 from "./components/flyer/FlyerTheme8";

const APIGetUserData = APIURL() + "user-details";
const APIGetImagesetData = APIURL() + "get-edit-imageset-list";
const APIChangeService = APIURL() + "change-tour-service";
const APIUpdateImageset = APIURL() + "image-adjustment-editimageset";
const APIGetImageEditor = APIURL() + "load-image-editor";
const APIGetProperty = APIURL() + "edit-property";
const APIUpdateProperty = APIURL() + "update-property-info";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetTourDetails = APIURL() + "tour-details";
const APILoadCraigList = APIURL() + "load-craiglist-modal";
const APISendFlyerMail = APIURL() + "send-flyer-mail";
const APIUpdateFlyer = APIURL() + "update-flyer";
const APIGetDocumentDatas = APIURL() + "edit-property";
const APIUpdateOrder = APIURL() + "change-order";
const APIcropImage = APIURL() + "save-cropper-image-tour";
const APIDeleteDocument = APIURL() + "delete-document";
const APIGetViewFlyerData = APIURL() + "view-flyer";
const DownloadPdf = APIURL() + "generatePdf";
const APIDownloadFlyerData = APIURL() + "download-flyer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AgentEditTour(props) {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9999,
      color: "#fff",
    },
    btn: {
      padding: "0 !important",
      color: "rgb(73, 80, 87) !important",
      float: "right",
      top: "-35px",
    },
  }));
  const imageset_id = props.match.params.flyerid;
  let history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [currentImagesetData, setCurrentImagesetData] = useState({});
  const [sync, setSync] = useState(true);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [element, setElement] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [propertyData, setPropertyData] = useState({ pricetype: "USD" });
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
  const [editImageData, setEditImageData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [craigeListOpen, setCraigeListOpen] = useState("");
  const [convertedContent1, setConverted1Content] = useState(null);
  const [convertedContent2, setConverted2Content] = useState(null);
  const [convertedContent3, setConverted3Content] = useState(null);
  const [csvFile, setCsvFile] = useState({});
  const [flyerList, setFlyerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState({});
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [totalDivs, setTotalDivs] = useState([]);
  const [documentData, setDocumentData] = useState([]);
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
  const [croppedImage, setCroppedImage] = useState([]);
  const [tourData, setTourData] = useState({});
  const [link, setLink] = useState("");
  const [allData, setAllData] = useState({});

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
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
        type: "5",
      };
      postRecord(APIGetDocumentDatas, objusr).then((res) => {
        // console.log(res.data[0]);

        if (res.data[0].response.status === "success") {
          setDocumentData(res.data[0].response.data.toDocument);
          // setTotalDivs([]);
          // setDocumentLeadData([]);
          // setDocumentNameData([]);
          // setDocumentImageData([]);
          // setDocumentPwdData([]);
          // var objLead = {};
          // var objName = {};
          // var objIamge = {};
          // var objPwd = {};
          // res.data[0].response.data.toDocument.forEach((res, i) => {
          //     setTotalDivs(prev => [...prev, "Div" + i]);
          //     // setDocumentLeadData(prev => [...prev, { ["leadcapture" + i]: res.leadcapture === 1 ? true : false }]);
          //     objLead["leadcapture" + i] = res.leadcapture === 1 ? true : false;
          //     objName["documentName" + i] = res.docname;
          //     objIamge["name" + i] = res.filename;
          //     objPwd["documentPassword" + i] = res.pwd;
          //     setDocumentLeadData(objLead);
          //     setDocumentNameData(objName);
          //     setDocumentImageData(objIamge);
          //     setDocumentPwdData(objPwd);

          // })
        }
      });
    }
  }, [context.state.user, sync]);
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
    if (imageset_id && context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        id: imageset_id,
        type: "flyer",
      };
      postRecord(APIGetImagesetData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentImagesetData(res.data[0].response.data);
          setFlyerList(res.data[0].response.data.image_set_list);
        }
      });
    }
  }, [imageset_id, sync, context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
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
  }, [context.state.user, imageset_id, imageId]);
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
        tourId: imageset_id,
        type: "imageset",
      };
      postRecord(APIGetProperty, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setPropertyData({
            ...propertyData,
            ...res.data[0].response.data.toData,
          });
          setEditorState1(
            EditorState.createWithContent(
              ContentState.createFromText(
                res.data[0].response.data.toData.features
              )
            )
          );
        }
      });
    }
  }, [sync, context.state.user, imageset_id]);
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
        return;
      }
      setAllStates([]);
      setPropertyData({ ...propertyData, stateid: "" });
    });
  }, [propertyData.countryid]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  const handleImageId = (data) => {
    var div = document.getElementById("myDiv" + data.imageid);
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
      setImageId(data.imageid);
    }
  };
  const handleTourChange = (event) => {
    setOpen(true);
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleFlyerChange = (event) => {
    setOpen(true);
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleVideoChange = (event) => {
    setOpen(true);
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
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
        setOpen(false);
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
    // var rotated = false;
    // var div = document.getElementById('img_div'),
    //     angle = rotated ? 0 : data;
    // div.style.webkitTransform = 'rotate(' + angle + 'deg)';
    // div.style.mozTransform = 'rotate(' + angle + 'deg)';
    // div.style.msTransform = 'rotate(' + angle + 'deg)';
    // div.style.oTransform = 'rotate(' + angle + 'deg)';
    // div.style.transform = 'rotate(' + angle + 'deg)';
    // rotated = !rotated;
  };
  const handleEditTheme = () => {
    history.push(APIPath() + "edit-flyer-theme/" + imageset_id);
  };

  const updateEditImagedata = () => {
    editImageData.authenticate_key = "abcd123XYZ";
    editImageData.agent_id = JSON.parse(context.state.user).agentId;
    editImageData.tourid = imageset_id;
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
      });
    const obj = {
      authenticate_key: "abcd123XYZ",
      tourId: imageset_id,
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "caption") {
      setPropertyData({
        ...propertyData,
        caption: value,
        widgetcaption: value,
      });
    } else setPropertyData({ ...propertyData, [name]: value });
  };
  const handleLeadChange = (nextChecked, index) => {
    setDocumentLeadData({
      ...documentLeadData,
      ["leadcapture" + index]: nextChecked === true ? 1 : 0,
    });
  };
  const handleDocNameChange = (event, index) => {
    setDocumentNameData({
      ...documentNameData,
      ["documentName" + index]: event.target.value,
    });
  };
  const handleDocImageChange = (event, index) => {
    setDocumentImageData({
      ...documentImageData,
      ["name" + index]: event.target.files[0],
    });
  };
  const handleDocPwdChange = (event, index) => {
    setDocumentPwdData({
      ...documentPwdData,
      ["documentPassword" + index]: event.target.value,
    });
  };
  const savePropertyDescription = () => {
    if (
      propertyData.caption.length < 1 ||
      propertyData.widgetcaption.length < 1
    ) {
      setMessage("Please Fill all the mandatory Fields");
      setOpenError(true);
    } else {
      setOpen(true);
      propertyData.authenticate_key = "abcd123XYZ";
      propertyData.agent_id = JSON.parse(context.state.user).agentId;
      propertyData.tourid = imageset_id;
      propertyData.tab_index = "1";
      postRecord(APIUpdateProperty, propertyData)
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
    }
  };
  const savePropertyFeatures = () => {
    if (
      propertyData.totalbedrooms == "" ||
      propertyData.totalbedrooms == null ||
      propertyData.totalbathrooms == "" ||
      propertyData.totalbathrooms == null ||
      propertyData.parkingspaces == "" ||
      propertyData.parkingspaces == null ||
      propertyData.yearbuilt == "" ||
      propertyData.yearbuilt == null ||
      propertyData.subdivision == "" ||
      propertyData.subdivision == null ||
      propertyData.lotsize == "" ||
      propertyData.lotsize == null ||
      propertyData.garagesize == "" ||
      propertyData.garagesize == null
    ) {
      setMessage("Please fill all the mandatory fields...");
      setOpenError(true);
    } else {
      setOpen(true);
      propertyData.authenticate_key = "abcd123XYZ";
      propertyData.agent_id = JSON.parse(context.state.user).agentId;
      propertyData.tourid = imageset_id;
      propertyData.tab_index = "2";
      postRecord(APIUpdateProperty, propertyData)
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
    }
  };
  const savePropertyPrice = () => {
    if (
      propertyData.price == "" ||
      propertyData.priceflexibility == "" ||
      propertyData.priceinfo == ""
    ) {
      setMessage("Please Fill all the Mandatory Columns..");
      setOpenError(true);
    } else {
      setOpen(true);
      propertyData.authenticate_key = "abcd123XYZ";
      propertyData.agent_id = JSON.parse(context.state.user).agentId;
      propertyData.tourid = imageset_id;
      propertyData.tab_index = "3";
      propertyData.features = convertedContent1;
      propertyData.feature2 = convertedContent2;
      propertyData.feature3 = convertedContent3;
      postRecord(APIUpdateProperty, propertyData)
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
    }
  };
  const savePropertyLocation = () => {
    if (
      propertyData.address == "" ||
      propertyData.address == null ||
      propertyData.typeid == "" ||
      propertyData.typeid == null ||
      propertyData.categoryid == "" ||
      propertyData.categoryid == null ||
      propertyData.countryid == "" ||
      propertyData.countryid == null ||
      propertyData.stateid == "" ||
      propertyData.stateid == null ||
      propertyData.city == "" ||
      propertyData.city == null ||
      propertyData.zipcode == "" ||
      propertyData.zipcode == null
    ) {
      setMessage("Please fill all the mandatory fields...");
      setOpenError(true);
    } else {
      setOpen(true);
      propertyData.authenticate_key = "abcd123XYZ";
      propertyData.agent_id = JSON.parse(context.state.user).agentId;
      propertyData.tourid = imageset_id;
      propertyData.tab_index = "4";
      postRecord(APIUpdateProperty, propertyData)
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
    }
  };
  const savePropertyForms = () => {
    setOpen(true);
    const doc_lead_arr = [];
    const doc_name_arr = [];
    const doc_image_arr = [];
    const doc_pwd_arr = [];
    const prev_data = [];
    Object.values(documentLeadData).forEach((res) => {
      doc_lead_arr.push(res);
    });
    Object.values(documentNameData).forEach((res) => {
      doc_name_arr.push(res);
    });
    Object.values(documentImageData).forEach((res) => {
      doc_image_arr.push(res);
    });
    Object.values(documentPwdData).forEach((res) => {
      doc_pwd_arr.push(res);
    });
    documentData.forEach((res) => {
      prev_data.push(res.id);
    });
    propertyData["leadcapture"] = doc_lead_arr;
    propertyData["documentName"] = doc_name_arr;
    propertyData["tourDocuments"] = doc_image_arr;
    propertyData["documentPassword"] = doc_pwd_arr;
    propertyData["doc_id"] = prev_data;
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
    propertyData.tab_index = "5";
    const formData = new FormData();
    for (let i in propertyData) {
      if (i === "leadcapture") {
        for (let file of propertyData[i]) {
          formData.append("leadcapture[]", file);
        }
      } else if (i === "documentName") {
        for (let file of propertyData[i]) {
          formData.append("documentName[]", file);
        }
      } else if (i === "tourDocuments") {
        for (let file of propertyData[i]) {
          formData.append("tourDocuments[]", file);
        }
      } else if (i === "documentPassword") {
        for (let file of propertyData[i]) {
          formData.append("documentPassword[]", file);
        }
      } else if (i === "doc_id") {
        for (let file of propertyData[i]) {
          formData.append("doc_id[]", file);
        }
      } else {
        formData.append(i, propertyData[i]);
      }
    }
    postRecord(APIUpdateProperty, formData, {})
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setDocumentLeadData([]);
          setDocumentNameData([]);
          setDocumentImageData([]);
          setDocumentPwdData([]);
          setTotalDivs([]);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setOpen(false);
        setSync(true);
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleViewModal = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
    };
    postRecord(APIGetTourDetails, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          // if (res.data[0].response.tourdetails.isactive === 0) {
          //   history.push(APIPath() + "agent-view-flyer/" + imageset_id);
          // } else {
          //   // window.location.href = APIPath() + "agent-view-flyer-active/" + id;
          //   history.push(APIPath() + "site/flyer/" + imageset_id);
          // }
          // history.push(APIPath() + "site/flyer/" + imageset_id,'_blank');
          window.open(APIPath() + "site/flyer/" + imageset_id, "_blank");
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const printFlyerModal = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
    };
    postRecord(APIGetTourDetails, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          if (res.data[0].response.tourdetails.isactive === 0) {
            //window.location.href = APIPath() + "agent-flyer-print/" + id;
            history.push(APIPath() + "site/flyer/" + imageset_id);
          } else {
            window.location.href =
              APIPath() + "agent-flyer-active-print/" + imageset_id;
            //history.push(APIPath() + "agent-flyer-active-print/" + id);
          }
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const PostCraigeList = async () => {
    setCraigeListOpen("agent_pop_tab");
    // const objusr = {
    //   authenticate_key: "abcd123XYZ",
    //   agent_id: JSON.parse(context.state.user).agentId,
    //   tourId: imageset_id,
    // };
    let htmlString;
    if (allData && allData.flyerId === "flyer01") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme1 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer02") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme2 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer03") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme3 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer04") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme4 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer05") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme5 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer06") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme6 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer07") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme7 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer08") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme8 tourData={tourData} allData={allData} link={link} />
      );
    } else {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme1 tourData={tourData} allData={allData} link={link} />
      );
    }
    setInputValue(htmlString);
    // postRecord(APILoadCraigList, objusr)
    //   .then((res) => {
    //     if (res.data[0].response.status === "success") {
    //       setInputValue(htmlString);
    //     }
    //   })
    //   .catch((err) => {
    //     setMessage("Something Went Wrong. Please try again later...");
    //     setOpenError(true);
    //   });
  };
  const [editorState1, setEditorState1] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState3, setEditorState3] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange1 = (state) => {
    setEditorState1(state);
    convertContentToHTML1();
  };
  const handleEditorChange2 = (state) => {
    setEditorState2(state);
    convertContentToHTML2();
  };
  const handleEditorChange3 = (state) => {
    setEditorState3(state);
    convertContentToHTML3();
  };
  const convertContentToHTML1 = () => {
    let currentContentAsHTML = convertToHTML(editorState1.getCurrentContent());
    console.log(currentContentAsHTML, "currentContentAsHTML");
    setConverted1Content(currentContentAsHTML);
  };
  const convertContentToHTML2 = () => {
    let currentContentAsHTML = convertToHTML(editorState2.getCurrentContent());
    setConverted2Content(currentContentAsHTML);
  };
  const convertContentToHTML3 = () => {
    let currentContentAsHTML = convertToHTML(editorState3.getCurrentContent());
    setConverted3Content(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmail({ ...currentEmail, [name]: value });
  };
  const handleCsvfileUpload = (event) => {
    setCsvFile({ ...csvFile, email_file: event.target.files });
  };
  const saveSendFlyerData = async () => {
    console.log(csvFile);
    setOpen(true);
    if (currentEmail.emails == undefined) {
      currentEmail.emails = "";
    }
    csvFile.authenticate_key = "abcd123XYZ";
    csvFile.agent_id = JSON.parse(context.state.user).agentId;
    csvFile.tourId = imageset_id;
    csvFile.emails = currentEmail.emails;
    let htmlString;
    if (allData && allData.flyerId === "flyer01") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme1 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer02") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme2 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer03") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme3 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer04") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme4 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer05") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme5 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer06") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme6 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer07") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme7 tourData={tourData} allData={allData} link={link} />
      );
    } else if (allData && allData.flyerId === "flyer08") {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme8 tourData={tourData} allData={allData} link={link} />
      );
    } else {
      htmlString = await ReactDOMServer.renderToString(
        <FlyerTheme1 tourData={tourData} allData={allData} link={link} />
      );
    }
    const formData = new FormData();
    formData.append("htmlString", htmlString);

    for (let i in csvFile) {
      if (i === "email_file") {
        for (let file of csvFile[i]) {
          formData.append("email_file", file);
        }
      } else {
        formData.append(i, csvFile[i]);
      }
    }
    postRecord(APISendFlyerMail, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
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
  const handleImageFlyerChange = (event, id) => {
    flyerList.forEach((res) => {
      if (res.imageid === id) {
        if (event === true) {
          res.enableonflyer = 1;
        } else {
          res.enableonflyer = 0;
        }
      }
    });
    setFlyerList(flyerList);
  };
  const removeDocData = async (docid) => {
    const data = {
      authenticate_key: "abcd123XYZ",
      docId: docid,
    };
    setOpen(true);

    const res = await axios.post(`${APIDeleteDocument}`, data);
    setOpen(false);

    if (res.data[0].response.status === "success") {
      var filter_data = documentData.filter((res) => {
        return res.id !== docid;
      });
      setDocumentData(filter_data);
    }
  };
  const updateFlyerListData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imageArr: flyerList,
    };
    postRecord(APIUpdateFlyer, obj)
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
  const handleEditImageset = () => {
    history.push(APIPath() + "agent-edit-tour/" + imageset_id);
  };
  const addNewDiv = () => {
    setTotalDivs([...totalDivs, "Div" + totalDivs.length]);
  };
  const removeDiv = () => {
    setTotalDivs(
      totalDivs.filter(function (item) {
        return item !== "Div" + (totalDivs.length - 1);
      })
    );
  };
  const [dragImages, setDragImages] = useState([]);
  const [divHeight, setDivHeight] = useState(400);
  useEffect(() => {
    if (Object.keys(currentImagesetData).length > 0) {
      setDragImages(flyerList);
      var count = 250;
      flyerList.forEach((res, index) => {
        if ((index + 1) % 3 === 0) {
          count = count + 250;
        }
        setDivHeight(parseInt(flyerList.length * (count / flyerList.length)));
      });
    }
  }, [currentImagesetData, flyerList]);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(dragImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragImages([]);
    setDragImages(items);
    var arr = [];
    items.forEach((res) => {
      arr.push(res.imageid);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: arr,
      type: "flyer",
    };
    console.log(obj);
    postRecord(APIUpdateOrder, obj)
      .then((res) => {
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
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(dragImages, sourceIndex, targetIndex);
    setDragImages(nextState);
    console.log(dragImages);
    var arr = [];
    nextState.forEach((res) => {
      arr.push(res.imageid);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: arr,
      type: "flyer",
    };

    postRecord(APIUpdateOrder, obj)
      .then((res) => {
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
  // useEffect(() => {
  //   if (context.state.user) {
  //     const objusr = {
  //       authenticate_key: "abcd123XYZ",
  //       tourId: imageset_id,
  //       agent_id: JSON.parse(context.state.user).agentId,
  //     };
  //     postRecord(APIGetViewFlyerData, objusr).then((res) => {
  //       if (res.data[0].response.status === "success") {
  //         setAllData(res.data[0].response);
  //         setTourData(res.data[0].response.tourData);
  //         setLink(res.data[0].response.tourData.tourid);
  //       } else {
  //       }
  //     });
  //   }
  // }, [sync, context.state.user, imageset_id]);
  const downloadPdf = async () => {
    setOpen(true);
    const objusr = {
      authenticate_key: "abcd123XYZ",
      tourId: imageset_id,
      agent_id: JSON.parse(context.state.user).agentId,
    };
    const res = await postRecord(APIDownloadFlyerData, objusr);
    if (res.data[0].response.status == "error") {
      setMessage(res.data[0].response.message);
      setOpenError(true);
      setOpen(false);
      return;
    }
    const tourData = res.data[0].response.tourData;
    const allData2 = res.data[0].response;
    const objusr1 = {
      authenticate_key: "abcd123XYZ",
      tourData: tourData,
      allData: allData2,
    };
    try {
      const res1 = await postRecord(DownloadPdf, objusr1);
      const response = await fetch(res1.data.pdf_link);
      const blob = await response.blob();
      const src = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = src;
      // link.replace(/\s/g, "%");
      link.href = link.href.replace(/\s/g, "%20");
      link.setAttribute("download", "Flyer.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <div>
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
                  imagesetId={imageset_id}
                />

                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li class="active">
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li>
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
          <h2>Edit flyer</h2>
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
                        <i class="fas fa-cog"></i> Flyer Tools
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
                              onClick={handleEditImageset}
                            >
                              <i class="far fa-image"></i> Go to related Tour
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#add_img"
                            >
                              <i class="fas fa-eye"></i> Send to friend
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                handleEditTheme();
                              }}
                            >
                              <i class="fas fa-magic"></i> Themes
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                handleViewModal();
                              }}
                            >
                              <i class="fas fa-eye"></i> View Flyer
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                printFlyerModal();
                              }}
                            >
                              <i class="fas fa-print"></i> Print Flyer
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href={`#${craigeListOpen}`}
                              data-toggle="modal"
                              onClick={() => PostCraigeList()}
                            >
                              <i class="fas fa-sticky-note"></i> Post To
                              Craigslist
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Property"
                            >
                              <i class="fas fa-home"></i> Property Information{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => downloadPdf()}
                            >
                              <i class="fas fa-file-pdf"></i> Download Flyer PDF
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* Navigation Menu */}
              {/*<div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  <ul class="nav nav-tabs list_sec" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#Actions_tab"
                        role="tab"
                      >
                        <i class="fas fa-cog"></i>Flyer Tools
                      </a>
                    </li>
                  </ul>

                </div>
              </div>*/}
            </div>
          </div>
          {/* <div class="row">
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
                      <div class="horizontal-images tab_main tabscroll-windows">
                        <OwlCarousel margin={10} {...options} id="home_slide1">
                          <div className="asdf">
                            <a class="" onClick={handleEditImageset}>
                              <span>
                                <i class="far fa-image"></i>
                              </span>
                              Go to related Tour
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#add_img"
                            >
                              <span>
                                <i class="fas fa-eye"></i>
                              </span>
                              Send to friend
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => {
                                handleEditTheme();
                              }}
                            >
                              <span>
                                <i class="fas fa-magic"></i>
                              </span>
                              Themes{" "}
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => {
                                handleViewModal();
                              }}
                            >
                              <span>
                                <i class="fas fa-eye"></i>
                              </span>
                              View Flyer
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => {
                                printFlyerModal();
                              }}
                            >
                              <span>
                                <i class="fas fa-print"></i>
                              </span>
                              Print Flyer
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href={`#${craigeListOpen}`}
                              data-toggle="modal"
                              onClick={() => PostCraigeList()}
                            >
                              <span>
                                <i class="fas fa-sticky-note"></i>
                              </span>
                              Post To Craigslist
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Property"
                            >
                              <span>
                                <i class="fas fa-home"></i>
                              </span>
                              Property Information{" "}
                            </a>
                          </div>
                        </OwlCarousel>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>*/}
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="test_sec">
                <div class="test_sec_left"></div>
                <div class="test_sec_right">
                  <button
                    type="button"
                    onClick={updateFlyerListData}
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
                          class="custom-control-input"
                          id="customSwitch1114"
                          onChange={handleTourChange}
                          value={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services
                              .virtualtourservice
                          }
                          checked={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services
                              .virtualtourservice === 1
                              ? true
                              : false
                          }
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
                          class="custom-control-input"
                          id="customSwitch11114"
                          onChange={handleFlyerChange}
                          value={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services.flyerservice
                          }
                          checked={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services
                              .flyerservice === 1
                              ? true
                              : false
                          }
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
                          class="custom-control-input"
                          id="customSwitch111114"
                          onChange={handleVideoChange}
                          value={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services.videoservice
                          }
                          checked={
                            Object.keys(currentImagesetData).length > 0 &&
                            currentImagesetData.image_set_services
                              .videoservice === 1
                              ? true
                              : false
                          }
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
                rowHeight={220}
                style={{ height: divHeight + "px" }}
              >
                {dragImages.map((res, index) => (
                  <GridItem key={res.imageid}>
                    <div
                      onClick={() => {
                        setImageId(res.imageid);
                        setImageUrl(res.file_url);
                        handleImageId(res);
                      }}
                      class="col-lg-12 col-md-12"
                      style={{ cursor: "grab" }}
                    >
                      <div
                        id={"myDiv" + res.imageid}
                        class="select_img_set_box"
                        style={{ cursor: "pointer" }}
                      >
                        <div class="row">
                          <div class="col-lg-5 col-md-5">
                            <div class="select_img_set_box_img customFlyerRibbon">
                              <img
                                src={res.file_url}
                                style={{ height: "110px", marginTop: "14px" }}
                                alt=""
                              />
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
                          <div class="col-lg-7 col-md-7">
                            <div class="select_img_set_box_cont">
                              <div
                                class="col-md-12 formbox1"
                                style={{ marginTop: "10px" }}
                              >
                                <label style={{ marginRight: "35px" }}>
                                  Use this Image on Flyer ?
                                  <span style={{ color: "#ffa12d" }}></span>
                                </label>
                              </div>
                              <div
                                class="col-md-12 formbox1"
                                style={{ marginTop: "7px" }}
                              >
                                <Switch
                                  onChange={(event) =>
                                    handleImageFlyerChange(event, res.imageid)
                                  }
                                  checked={res.enableonflyer}
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
                    </div>
                  </GridItem>
                ))}
              </GridDropZone>
            </div>
          </GridContextProvider>
          {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters" direction="horizontal">
                            {(provided) => (
                                <div className="row padd_top characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    {dragImages.map((res, index) => {
                                        return (
                                            <Draggable key={res.imageid} draggableId={res.imageid.toString()} index={index}>
                                                {(provided) => (
                                                    <div onClick={() => {
                                                        setImageId(res.imageid);
                                                        setImageUrl(res.file_url);
                                                        handleImageId(res);
                                                    }} class="col-lg-4 col-md-12" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <div id={"myDiv" + res.imageid} class="select_img_set_box" style={{ cursor: "pointer" }}>
                                                            <div class="row">
                                                                <div class="col-lg-5 col-md-5">
                                                                    <div class="select_img_set_box_img">
                                                                        <img src={res.file_url} style={{ height: "110px", marginTop: "14px" }} alt="" />
                                                                        {res.image_type === "panoramas" ? (
                                                                            <img src={res.flag_img} style={{ position: "absolute", width: "90px", right: "5px", top: "5px", border: "none", boxShadow: "none" }} alt="" />
                                                                        ) : (
                                                                            <i onClick={() => {
                                                                                setOpenEditImageModal(true);
                                                                                setFilename(res.filename);
                                                                            }} class="far fa-edit edit-btn" style={{ top: "20px" }}></i>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-7 col-md-7">
                                                                    <div class="select_img_set_box_cont">
                                                                        <div class="col-md-12 formbox1" style={{ marginTop: "10px" }}>
                                                                            <label style={{ marginRight: "35px" }}>Use this Image on Flyer ?<span style={{ color: "#ffa12d" }}></span></label>
                                                                        </div>
                                                                        <div class="col-md-12 formbox1" style={{ marginTop: "7px" }}>
                                                                            <Switch
                                                                                onChange={(event) => handleImageFlyerChange(event, res.imageid)}
                                                                                checked={res.enableonflyer}
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
                                                                                            paddingRight: 2
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
                                                                                            paddingRight: 2
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
                                                    </div>
                                                )}

                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> */}
        </div>
      </section>

      <Footer />
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveSendFlyerData();
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">
                    Send Flyer<i class="far fa-image"></i>
                  </h4>
                </div>
                <div class="modal-body">
                  <div class="agent_pop_main">
                    <div class="agent_pop_main_head padd_top">
                      <h5>Email Recipients (comma seperated)</h5>
                    </div>
                    <p class="padd_top">
                      You can enter multiple email addresses separated by
                      comma(Enter upto 25 email addresss).
                    </p>
                    <div class="service_links">
                      <div class="row">
                        <div class="col-lg-3 col-md-3">
                          <div class="service_links_left">
                            <h6>To:</h6>
                          </div>
                        </div>
                        <div class="col-lg-9 col-md-9">
                          <div class="service_links_right">
                            <input
                              type="text"
                              name="emails"
                              class="form-control"
                              value={currentEmail.emails}
                              onChange={HandleInputChange}
                            />
                          </div>
                        </div>
                        <div
                          class="d-flex"
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px",
                            color: "#ff8d00",
                          }}
                        >
                          <h4>OR</h4>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3 col-md-3">
                          <div class="service_links_left">
                            <h6>To:</h6>
                          </div>
                        </div>
                        <div class="col-lg-9 col-md-9">
                          <div class="service_links_right">
                            <input
                              name="email_file"
                              id="test"
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                              type="file"
                              class=""
                              onChange={handleCsvfileUpload}
                            />
                          </div>
                          <br></br>
                          <h6>
                            Upload CSV{" "}
                            <CsvFiledownloader value="cile downloader"></CsvFiledownloader>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-default" data-dismiss="">
                    Send
                  </button>
                </div>
              </div>
            </form>
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
          {/* <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Co-listing agent <i class="fas fa-user"></i></h4>
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
                                                            <input type="file" class="custom-file-input" id="customFileInput" aria-describedby="customFileInput" />
                                                            <label class="custom-file-label" for="customFileInput">Select file</label>
                                                        </div>
                                                        <button type="button" class="btn-style-two border-0">Remove</button>
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
                                                <label>First Name <span style={{ color: "#ffa12d" }}>*</span></label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 formbox1">
                                                <label>Last Name <span style={{ color: "#ffa12d" }}>*</span></label>
                                                <input type="text" class="form-control" />
                                            </div>
                                            <div class="col-md-6 formbox1">
                                                <label>Email <span style={{ color: "#ffa12d" }}>*</span></label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 formbox1">
                                                <label>Website <span style={{ color: "#ffa12d" }}>*</span></label>
                                                <input type="text" class="form-control" />
                                            </div>
                                            <div class="col-md-6 formbox1">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>Mobile <span style={{ color: "#ffa12d" }}>*</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label>Office Phone <span style={{ color: "#ffa12d" }}>*</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 formbox1">
                                                <label>Company name <span style={{ color: "#ffa12d" }}>*</span></label>
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
                                                <button type="button" class="next_btn border-0">UPDATE</button>
                                                <button type="button" class="next_btn grey border-0">REMOVE</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="">Save</button>
                            </div>
                        </div>
                    </div> */}
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  <i class="fas fa-sticky-note"></i> Post To Craigslist{" "}
                </h4>
              </div>
              <div class="modal-body">
                <div class="">
                  <div class="browse_img_head">
                    <h5>VirtuleTourCafe - Post to Craigslist</h5>
                  </div>
                  <div class="agent_pop_tab_sec">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 mx-auto">
                        <div class="agent_pop_tab_sec_single">
                          <p>
                            We have created a very simple "Widget" to help you
                            Post to Craigslist. Please follow these steps:
                          </p>
                          <p style={{ textAlign: "justify" }}>
                            If you are a Macintosh User, please log into your
                            Craigslist Account, then click on "Continue" button
                            below. highlight and right-click this link:
                            VirtualTourCafe - MyCafeToGo then "Add to Favorites"
                            or "Bookmark" the link. Alternatively, you can drag
                            the link to your Toolbar if your browser allows
                          </p>
                          <div class="agent_pop_tab_sec_single_cont uploadimage p-0"></div>
                          <div class="agent_pop_tab_sec_single">
                            <p style={{ textAlign: "center" }}>
                              <span
                                style={{ color: "#ffa12d", fontWeight: "bold" }}
                              >
                                1.
                              </span>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {" "}
                                COPY HTML
                              </span>{" "}
                              <br></br>
                              Copy the HTML code in the box below.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>HTML Code</h5>
                  </div>
                  <div class="agent_pop_tab_sec">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 mx-auto">
                        <div class="agent_pop_tab_sec_single">
                          <p>
                            To Post to Craigslist, select the city that is
                            closest to you.{" "}
                          </p>

                          <textarea
                            type="text"
                            readOnly
                            class="form-control"
                            editable={false}
                            value={inputvalue}
                          ></textarea>
                        </div>
                        <div
                          class="agent_pop_tab_sec_single"
                          style={{ marginTop: "20px" }}
                        >
                          <p style={{ textAlign: "center" }}>
                            <span
                              style={{ color: "#ffa12d", marginTop: "20px" }}
                            >
                              2.
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              OPEN CRAIGSLIST
                            </span>
                          </p>
                        </div>
                        <div class="agent_pop_tab_sec_single">
                          <p style={{ textAlign: "justify" }}>
                            Open the Craigslist website page for your city or
                            region (below), and follow the steps you normally
                            would to get to the page where you create your post.
                            If you are not already logged-in to your account,
                            you will be prompted to log in or use your email
                            address as a guest.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Post to Craigslist</h5>
                  </div>
                  <div class="agent_pop_tab_sec">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 mx-auto">
                        <div class="row">
                          <div class="col-lg-6 col-md-6 mx-auto">
                            <p>
                              To Post to Craigslist, select the city that is
                              closest to you.{" "}
                            </p>
                          </div>
                          <div class="col-lg-6 col-md-6 mx-auto">
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
                        <div class="row" style={{ marginTop: "60px" }}>
                          <div class="col-lg-4 col-md-4 mx-auto">
                            <div style={{ textAlign: "center" }}>
                              <h5>
                                <span style={{ color: "#ffa12d" }}> 3.</span>{" "}
                                LOGIN OR GUEST
                              </h5>
                              <span>
                                {/* <img src={opencraigslisactive_icon} /> */}
                              </span>
                              <p style={{ marginTop: "20px" }}>
                                Fill-in the Craigslist fields such as title,
                                price, etc.
                              </p>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4 mx-auto">
                            <div style={{ textAlign: "center" }}>
                              <h5>
                                <span style={{ color: "#ffa12d" }}> 4.</span>{" "}
                                SELECT REAL ESTATE FOR SALE
                              </h5>
                              <span>{/* <img src={fontawesomelogo} /> */}</span>
                              <p style={{ marginTop: "20px" }}>
                                SClick your mouse in the Posting Description
                                field and PASTE the HTML code. The HTML will
                                appear in the Posting Description field.
                              </p>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4 mx-auto">
                            <div style={{ textAlign: "center" }}>
                              <h5>
                                <span style={{ color: "#ffa12d" }}> 5.</span>{" "}
                                RETURN TO VTC
                              </h5>
                              <span>
                                {/* <img src={craigslisflyeractive_icon} /> */}
                              </span>
                              <p style={{ marginTop: "20px" }}>
                                nce all the fields are populated continue with
                                your Craigslist post to add your pictures and
                                complete your posting.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      Continue<i class="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
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
                            href="#Cus_flyer"
                            role="tab"
                          >
                            <i class="fas fa-money-bill"></i>Customize Flyer
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
                        <li class="nav-item" style={{ marginTop: "5px" }}>
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
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyDescription();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    CAPTION/TITLE{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="caption"
                                    value={propertyData.caption}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    WIDGET TITLE{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="widgetcaption"
                                    value={propertyData.widgetcaption}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 formbox1">
                                  <label>
                                    Description{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <textarea
                                    onChange={handleInputChange}
                                    name="description"
                                    value={propertyData.description}
                                    class="form-control"
                                    rows="6"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="profile" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyFeatures();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Bedrooms
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                onWheel={(e) => e.currentTarget.blur()}
                step={0.1}
                                    onChange={handleInputChange}
                                    name="totalbedrooms"
                                    value={propertyData.totalbedrooms}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Bathrooms{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                onWheel={(e) => e.currentTarget.blur()}
                step={0.1}
                                    onChange={handleInputChange}
                                    name="totalbathrooms"
                                    value={propertyData.totalbathrooms}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Parking Space{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="parkingspaces"
                                    value={propertyData.parkingspaces}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Year Built{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    onChange={handleInputChange}
                                    name="yearbuilt"
                                    value={propertyData.yearbuilt}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Subdivision{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="subdivision"
                                    value={propertyData.subdivision}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    LOT Size{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="lotsize"
                                    value={propertyData.lotsize}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Garage Size{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="garagesize"
                                    value={propertyData.garagesize}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>School District </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="schooldistrict"
                                    value={propertyData.schooldistrict}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>Square Footage </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="sqfootage"
                                    value={propertyData.sqfootage}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>MLS </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="mls"
                                    value={propertyData.mls}
                                    class="form-control formbox1select"
                                  >
                                    <option>MLS</option>
                                    <option>MLS</option>
                                    <option>MLS</option>
                                    <option>MLS</option>
                                  </select>
                                </div>
                              </div>
                              <label>Required For MLS Posting *</label>
                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="messages" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyPrice();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label>
                                    Price
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="pricetype"
                                    value={propertyData.pricetype}
                                    class="form-control formbox1select"
                                  >
                                    <option selected value="USD">
                                      USD
                                    </option>
                                    <option value="CAD">CAD</option>
                                    <option value="EUR">EUR</option>
                                  </select>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <label>
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="number"
                onWheel={(e) => e.currentTarget.blur()}
                step={0.1}
                                    onChange={handleInputChange}
                                    name="price"
                                    value={propertyData.price}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>FLEXIBILITY </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="priceflexibility"
                                    value={propertyData.priceflexibility}
                                    class="form-control formbox1select"
                                  >
                                    <option>Select option</option>
                                    <option value="FIRM">FIRM</option>
                                    <option value="Negotiable">
                                      Negotiable
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 formbox1">
                                  <label>
                                    ADDITIONAL PRICE INFORMATION{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <textarea
                                    onChange={handleInputChange}
                                    name="priceinfo"
                                    value={propertyData.priceinfo}
                                    class="form-control"
                                    rows="6"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="Cus_flyer" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyPrice();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-12 formbox1">
                                  <div>
                                    <label style={{ marginBottom: "15px" }}>
                                      Features column 1
                                    </label>
                                  </div>
                                  {/* <textarea rows="8" style={{ width: "70%", border: "1px solid black" }}>

                                                                    </textarea> */}
                                  <Editor
                                    editorState={editorState1}
                                    onEditorStateChange={handleEditorChange1}
                                    name="features"
                                    value={propertyData.features}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                  />
                                </div>
                                <div class="col-md-12 formbox1">
                                  <div>
                                    <label style={{ marginBottom: "15px" }}>
                                      Features column 2
                                    </label>
                                  </div>
                                  {/* <textarea rows="8" style={{ width: "70%", border: "1px solid black" }}>

                                                                    </textarea> */}
                                  <Editor
                                    editorState={editorState2}
                                    onEditorStateChange={handleEditorChange2}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                  />
                                </div>
                                <div class="col-md-12 formbox1">
                                  <div>
                                    <label style={{ marginBottom: "15px" }}>
                                      Features column 3
                                    </label>
                                  </div>
                                  {/* <textarea rows="8" style={{ width: "70%", border: "1px solid black" }}>

                                                                    </textarea> */}
                                  <Editor
                                    editorState={editorState3}
                                    onEditorStateChange={handleEditorChange3}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                  />
                                </div>
                                <div class="col-md-12 formbox1">
                                  <div>
                                    <label style={{ marginBottom: "15px" }}>
                                      Web Address
                                    </label>
                                  </div>
                                  {/* <textarea rows="8" style={{ width: "70%", border: "1px solid black" }}>

                                                                    </textarea> */}
                                  <input
                                    name="web_address"
                                    value={propertyData.web_address}
                                    onChange={(e) => handleInputChange(e)}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="location" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyLocation();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    ADDRESS{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="address"
                                    value={propertyData.address}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    PROPERTY TYPE{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="typeid"
                                    value={propertyData.typeid}
                                    class="form-control formbox1select"
                                  >
                                    <option value="1">
                                      Single Family Home
                                    </option>
                                    <option value="2">Condo</option>
                                    <option value="3">Townhouse</option>
                                    <option value="4">Coop</option>
                                    <option value="5">Apartment</option>
                                    <option value="6">Loft</option>
                                    <option value="7">
                                      Mobile/Manufactured
                                    </option>
                                    <option value="8">Farm/Ranch</option>
                                    <option value="9">Multi-Family</option>
                                    <option value="10">
                                      Income/Investment
                                    </option>
                                    <option value="11">Houseboat</option>
                                    <option value="12">
                                      Commercial Lot/Land
                                    </option>
                                    <option value="13">Not Applicable</option>
                                    <option value="14">Commercial</option>
                                    <option value="15">Duet</option>
                                    <option value="16">Duplex</option>
                                    <option value="17">Triplex</option>
                                    <option value="18">
                                      Commercial Rental
                                    </option>
                                    <option value="19">
                                      Residential Lot/Land
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    STATUS{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="categoryid"
                                    value={propertyData.categoryid}
                                    class="form-control formbox1select"
                                  >
                                    <option value="1">For Sale</option>
                                    <option value="2">For Rent</option>
                                    <option value="3">Sold</option>
                                    <option value="4">Contingent</option>
                                    <option value="5">Pending</option>
                                    <option value="6">Withdrawn</option>
                                    <option value="7">Community</option>
                                    <option value="8">Miscellaneous</option>
                                    <option value="9">Personal</option>
                                    <option value="10">Coming Soon</option>
                                    <option value="11">Draft</option>
                                    <option value="12">For Lease</option>
                                    <option value="13">
                                      For-Sale-By-Owner
                                    </option>
                                  </select>
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Country{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    name="countryid"
                                    value={propertyData.countryid}
                                    onChange={handleInputChange}
                                    class="form-control formbox1select"
                                  >
                                    <option value="0">Select Country</option>
                                    {allCountries.map((res) => (
                                      <option value={res.id}>{res.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    STATE{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    name="stateid"
                                    value={propertyData.stateid}
                                    onChange={handleInputChange}
                                    class="form-control formbox1select"
                                  >
                                    <option value="0">Select State</option>
                                    {allStates &&
                                      allStates.map((res) => (
                                        <option value={res.id}>
                                          {res.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    CITY{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="city"
                                    value={propertyData.city}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    ZIPCODE{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    onChange={handleInputChange}
                                    name="zipcode"
                                    value={propertyData.zipcode}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>NEIGHBORHOOD </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="neighbourhood"
                                    value={propertyData.neighbourhood}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>LATITUDE </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="latitude"
                                    value={propertyData.latitude}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>LONGITUDE </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="longitude"
                                    value={propertyData.longitude}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>AREA SCHOOLS LINK </label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="areaschoolslink"
                                    value={propertyData.areaschoolslink}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="docs" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyForms();
                              }}
                            >
                              <table
                                style={{ width: "100%", fontSize: "12px" }}
                                class="table table-bordered"
                              >
                                <thead>
                                  <tr>
                                    <td style={{ fontSize: "12px" }}>Sl.no</td>
                                    <td style={{ fontSize: "12px" }}>
                                      Lead Capture
                                    </td>
                                    <td style={{ fontSize: "12px" }}>Name</td>
                                    <td style={{ fontSize: "12px" }}>
                                      File Name
                                    </td>
                                    <td style={{ fontSize: "12px" }}>
                                      Password
                                    </td>
                                    <td style={{ fontSize: "12px" }}>Action</td>
                                    {/* <td style={{fontSize:"12px"}}>Actions</td> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {documentData.length > 0
                                    ? documentData.map((res, index) => (
                                        <tr>
                                          <td style={{ fontSize: "12px" }}>
                                            {index + 1}
                                          </td>
                                          <td style={{ fontSize: "12px" }}>
                                            {res.leadcapture === 1
                                              ? "true"
                                              : "false"}
                                          </td>
                                          <td style={{ fontSize: "12px" }}>
                                            {res.docname}
                                          </td>
                                          <td style={{ fontSize: "12px" }}>
                                            {res.filename}
                                          </td>
                                          <td style={{ fontSize: "12px" }}>
                                            {res.pwd}
                                          </td>
                                          <td style={{ fontSize: "12px" }}>
                                            <Button
                                              style={{ background: "red" }}
                                              onClick={() =>
                                                removeDocData(res.id)
                                              }
                                              startIcon={<CancelIcon />}
                                              variant="contained"
                                              color="primary"
                                            >
                                              Remove
                                            </Button>
                                          </td>
                                        </tr>
                                      ))
                                    : ""}
                                </tbody>
                              </table>
                              {totalDivs.map((res, index) => (
                                <div class="row">
                                  <div class="col-md-2 formbox1">
                                    <label style={{ marginRight: "15px" }}>
                                      LEAD CAPTURE
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <Switch
                                      onChange={(event) =>
                                        handleLeadChange(event, index)
                                      }
                                      checked={
                                        documentLeadData["leadcapture" + index]
                                          ? true
                                          : false
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
                                  <div class="col-md-2 formbox1">
                                    <label>
                                      Name{" "}
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name={"documentName" + index}
                                      value={
                                        documentNameData["documentName" + index]
                                      }
                                      onChange={(evt) =>
                                        handleDocNameChange(evt, index)
                                      }
                                      class="form-control"
                                    />
                                  </div>
                                  <div
                                    style={{ marginTop: "25px" }}
                                    class="col-md-4 formbox1"
                                  >
                                    <label style={{ marginRight: "15px" }}>
                                      File
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <input
                                      required
                                      type="file"
                                      accept="/*"
                                      onChange={(evt) =>
                                        handleDocImageChange(evt, index)
                                      }
                                    />
                                    {/* <span>{documentImageData["name" + index]}</span> */}
                                  </div>
                                  <div class="col-md-2 formbox1">
                                    <label>
                                      Password{" "}
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      name={"documentPassword" + index}
                                      value={
                                        documentPwdData[
                                          "documentPassword" + index
                                        ]
                                      }
                                      onChange={(evt) =>
                                        handleDocPwdChange(evt, index)
                                      }
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-2 formbox1">
                                    <Button
                                      style={{
                                        marginTop: "25px",
                                        background: "red",
                                      }}
                                      onClick={() => removeDiv()}
                                      startIcon={<CancelIcon />}
                                      variant="contained"
                                      color="primary"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div class="row">
                                <div class="col-md-6">
                                  <Button
                                    style={{ marginTop: "25px" }}
                                    onClick={() => addNewDiv()}
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    color="primary"
                                  >
                                    Add Document
                                  </Button>
                                </div>
                                <div class="col-md-6">
                                  <button
                                    type="submit"
                                    class="next_btn border-0"
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
