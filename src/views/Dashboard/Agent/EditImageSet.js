import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import "react-dropzone-uploader/dist/styles.css";
import $ from "jquery";
import ReactCrop from "react-image-crop";
import OwlCarousel from "react-owl-carousel";
import "react-image-crop/dist/ReactCrop.css";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dropzone from "react-dropzone";
import Slider from "react-rangeslider";
import Switch from "react-switch";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import banner from "../../../images/vtc-banner.jpg";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { makeStyles } from "@material-ui/core/styles";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { DateTimePicker } from "@material-ui/pickers";
import ReactPaginate from "react-paginate";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetUserData = APIURL() + "user-details";
const APIGetImagesetData = APIURL() + "get-edit-imageset-list";
const APIChangeService = APIURL() + "change-tour-service";
const APIChangeOrder = APIURL() + "change-image-order";
const APIDeleteImage = APIURL() + "delete-image-editimageset";
const APIUpdateProperty = APIURL() + "update-property-info";
const APIGetProperty = APIURL() + "edit-property";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetAmenities = APIURL() + "get-amenities";
const APISaveAmenities = APIURL() + "save-amenities";
const APIRemoveAmenities = APIURL() + "remove-amenities";
const APITourService = APIURL() + "tourservicelink";
const APIServiceMail = APIURL() + "tour-send-mail";
const APIOtherLink = APIURL() + "tourotherlink";
const APIOtherMail = APIURL() + "other-link-send-email";
const APIUpdateAmenity = APIURL() + "update-amenity";
const APIUpdateImageset = APIURL() + "image-adjustment-editimageset";
const APIGetImageEditor = APIURL() + "load-image-editor";
const APIUpdateTour = APIURL() + "update-tour";
const APIUpdateOrder = APIURL() + "change-order";
const APIGetDocumentDatas = APIURL() + "edit-property";
const APIAgentTrafficOption = APIURL() + "agent-update-traffic";
const APIcropImage = APIURL() + "save-cropper-image-tour";
const APIDeleteDocument = APIURL() + "delete-document";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function EditImageSet(props) {
  const imageset_id = props.match.params.imagesetid;
  const initialTrafficState = {
    reportrecipients: "",
    emailtrafficreport: "",
  };
  let history = useHistory();
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [tourList, setTourList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [blurValue, setBlurValue] = useState(0);
  const [brightValue, setBrightValue] = useState(10);
  const [grayValue, setGrayValue] = useState(0);
  const [contrastValue, setContrastValue] = useState(1);
  const [hueValue, setHueValue] = useState(0);
  const [invertValue, setInvertValue] = useState(0);
  const [opacityValue, setOpacityValue] = useState(100);
  const [saturateValue, setSaturateValue] = useState(10);
  const [sepiaValue, setSepiaValue] = useState(0);
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
  const [checked, setChecked] = useState(false);
  const [currentImagesetData, setCurrentImagesetData] = useState({});
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [sync, setSync] = useState(true);
  const [imageId, setImageId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [element, setElement] = useState("");
  const [newImageData, setNewImageData] = useState({});
  const [newVideoData, setNewVideoData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openAmenityModal, setOpenAmenityModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openTrafficModal, setOpenTrafficModal] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const [openEditImageModal, setOpenEditImageModal] = useState(false);
  const [currentImageData, setCurrentImageData] = useState({});
  const [srcImg, setSrcImg] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allAmenities, setAllAmenities] = useState({});
  const [appliancesAmenities, setAppliancesAmenities] = useState([]);
  const [communityAmenities, setCommunityAmenities] = useState([]);
  const [interiorAmenities, setInteriorAmenities] = useState([]);
  const [exteriorAmenities, setExteriorAmenities] = useState([]);
  const [amenityData, setAmenityData] = useState({});
  const [checkedAmenity, setCheckedAmenity] = useState([]);
  const [uncheckedAmenity, setUncheckedAmenity] = useState([]);
  const [serviceLinks, setServiceLinks] = useState({});
  const [otherLink, setOtherLink] = useState({});
  const [editImageData, setEditImageData] = useState({});
  const [rotatevalue, setRotateValue] = useState(0);
  const [offset, setOffset] = useState(1);
  const [postPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [trafficData, setTrafficData] = useState(initialTrafficState);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [totalDivs, setTotalDivs] = useState([]);
  const [fileName, setFilename] = useState("");
  const [sort, setSort] = useState(0);
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
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
        type: "5",
      };
      postRecord(APIGetDocumentDatas, objusr).then((res) => {
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
          //     // setTotalDivs(prev => [...prev, "Div" + i]);
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
  // useEffect(() => {
  //     if (Object.keys(documentLeadData).length === documentData.length) {
  //         documentData.forEach((res, i) => {
  //             setDocumentLeadData({ ...documentLeadData, ["leadcapture" + i]: res.leadcapture === 1 ? true : false });
  //         })
  //     }
  // }, [documentLeadData, documentData]);

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
  useEffect(() => {
    if (imageset_id && context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        id: imageset_id,
      };
      postRecord(APIGetImagesetData, objusr).then((res) => {
        console.log(res.data[0].response.data);
        if (res.data[0].response.status === "success") {
          setCurrentImagesetData(res.data[0].response.data);
        }
      });
    }
  }, [imageset_id, sync, context.state.user]);
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
          setPropertyData(res.data[0].response.data.toData);
        }
      });
    }
  }, [imageset_id, sync, context.state.user]);
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
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
      };
      postRecord(APIGetAmenities, objusr).then((res) => {
        setAllAmenities(res.data[0].response.data);
        setAppliancesAmenities(res.data[0].response.data.appliances);
        setCommunityAmenities(res.data[0].response.data.community);
        setInteriorAmenities(res.data[0].response.data.interior);
        setExteriorAmenities(res.data[0].response.data.exterior);
      });
    }
  }, [context.state.user, sync, imageset_id]);

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
        // console.log(res.data[0])
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
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
      };
      postRecord(APITourService, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setServiceLinks(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, imageset_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
      };
      postRecord(APIOtherLink, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setOtherLink(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, imageset_id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const handleAmenityChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  // const handleLeadChange = nextChecked => {
  //     setPropertyData({ ...propertyData, ["leadcapture"]: nextChecked });
  // };

  const handleOtherInputChange = (event) => {
    const { name, value } = event.target;
    setOtherLink({ ...otherLink, [name]: value });
  };
  const handleCaptionChange = (event, data) => {
    const { name, value } = event.target;

    const arr = [];
    dragImages.forEach((res) => {
      if (data.imageid === res.imageid) {
        res.caption = value;
      }
      arr.push(res);
    });
    setDragImages(arr);
  };
  const handleCheck = (event) => {
    setOtherLink({ ...otherLink, ["check"]: event });
  };
  const handleEditImageModal = () => {
    if (imageId === "") {
      setMessage("Please select one image");
      setOpenError(true);
    } else {
      setOpenEditImageModal(true);
      const new_data = currentImagesetData.image_set_list.filter((res) => {
        return res.imageid === imageId;
      });
      setCurrentImageData(new_data[0]);
      setSrcImg(new_data[0].file_url);
    }
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
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    //console.log(file)
  };
  const handleImageSubmit = (files, allFiles) => {
    const data = [];
    files.map((res) => {
      data.push(res.file);
    });
    setNewImageData({ ...newImageData, ["imageArr"]: data });
    //setNewImageData({ ...newImageData, ["imagecapturedateArr"]: new Date() });
    allFiles.forEach((f) => f.remove());
    setMessage("Image Uploaded Successfully");
    setOpenSuccess(true);
  };
  const handleVideoRemove = (data) => {
    const filteredPeople = uploadedVideos.filter(
      (item) => item.name !== data.name
    );
    setUploadedVideos(filteredPeople);
  };
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
  };
  const handleVideoSubmit = (files, allFiles) => {
    const data = [];
    files.map((res) => {
      data.push(res.file);
    });
    setNewVideoData({ ...newVideoData, ["video"]: data });
    //setNewVideoData({ ...newVideoData, ["imagecapturedatevideo"]: new Date() });
    allFiles.forEach((f) => f.remove());
    setMessage("Video Uploaded Successfully");
    setOpenSuccess(true);
  };
  const SendServiceMail = () => {
    setOpen(true);
    serviceLinks.authenticate_key = "abcd123XYZ";
    serviceLinks.agent_id = JSON.parse(context.state.user).agentId;
    serviceLinks.tourlink = serviceLinks.branded_link.tour_link;
    serviceLinks.videolink = serviceLinks.branded_link.video_link;
    serviceLinks.flyerlink = serviceLinks.branded_link.flyer_link;
    serviceLinks.standard = serviceLinks.mls_link.standard_link;
    serviceLinks.strict = serviceLinks.mls_link.strict_link;
    postRecord(APIServiceMail, serviceLinks)
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
  const handleOrderChange = (event) => {
    setSort(event.target.value);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
      sortyBy: event.target.value,
    };
    postRecord(APIChangeOrder, obj)
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
  const handleImageTourChange = (event, id) => {
    console.log(dragImages);
    dragImages.forEach((res) => {
      if (res.imageid === id) {
        if (event === true) {
          res.enableontour = 1;
        } else {
          res.enableontour = 0;
        }
      }
    });
    setDragImages(dragImages);
    // setTourList([]);
    setTourList(tourList);
  };
  const saveNewImage = () => {
    setOpen(true);
    newImageData.authenticate_key = "abcd123XYZ";
    newImageData.agent_id = JSON.parse(context.state.user).agentId;
    newImageData.tourId = imageset_id;
    newImageData.imageArr = uploadedImages;
    const formData = new FormData();
    for (let i in newImageData) {
      if (i === "imageArr") {
        for (let file of newImageData[i]) {
          formData.append("imageArr[]", file);
        }
      } else {
        formData.append(i, newImageData[i]);
      }
    }
    axios
      .post(APIURL() + `save-tour-image`, formData, {})
      //.post("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/save-tour-image", formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpenModal(false);
          setUploadedImages([]);
        } else {
          setOpen(false);
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
  const saveNewVideo = (data) => {
    setOpen(true);
    data.video = uploadedVideos;
    const formData = new FormData();
    for (let i in data) {
      if (i === "video") {
        for (let file of data[i]) {
          formData.append("video[]", file);
        }
      } else {
        formData.append(i, data[i]);
      }
    }
    axios
      .post(APIURL() + `add-video-editimageset`, formData, {})
      // .post("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/add-video-editimageset", formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpenVideoModal(false);
          setOpen(false);
          setUploadedVideos([]);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(true);
          setOpen(false);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
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
    if (imageUrl !== "") {
      if (imageId === "") {
        setMessage("Please select one image");
        setOpenError(true);
      } else {
        toDataURL(imageUrl, function (dataUrl) {
          var link = document.createElement("a");
          link.href = dataUrl;
          link.replace(/\s/g, "%");
          link.setAttribute("download", "image.jpg");
          document.body.appendChild(link);
          link.click();
        });
        setImageUrl("");
      }
    } else {
      if (imageId === "") {
        setMessage("Please select one image or video");
        setOpenError(true);
      } else {
        toDataURL(videoUrl, function (dataUrl) {
          var link = document.createElement("a");
          link.href = dataUrl;
          link.setAttribute("download", "video.mp4");
          document.body.appendChild(link);
          link.click();
        });
        setVideoUrl("");
      }
    }
  };
  const downloadQrCode = (image) => {
    toDataURL(image, function (dataUrl) {
      var link = document.createElement("a");
      link.href = dataUrl;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
    });
  };
  const handleDelete = () => {
    if (imageId === "") {
      setMessage("Please select one image");
      setOpenError(true);
    } else {
      confirmAlert({
        message: "Are you sure you want to delete this image ? ",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              const sd = [];
              sd.push(imageId);
              const obj = {
                authenticate_key: "abcd123XYZ",
                agent_id: JSON.parse(context.state.user).agentId,
                tourId: imageset_id,
                imageSet: sd,
              };
              postRecord(APIDeleteImage, obj).then((res) => {
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
    }
  };
  const savePropertyDescription = () => {
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
  };
  const savePropertyFeatures = () => {
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
  };
  const savePropertyPrice = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
    propertyData.tab_index = "3";
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
  };
  const savePropertyLocation = () => {
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
    console.log(propertyData);
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
    axios
      .post(APIUpdateProperty, formData, {})
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
    // postRecord(APIUpdateProperty, propertyData)
    //     .then(res => {
    //         if (res.data[0].response.status === "success") {
    //             setMessage(res.data[0].response.message);
    //             setOpenSuccess(true);
    //         }
    //         else {
    //             setMessage(res.data[0].response.message);
    //             setOpenError(true);
    //         }
    //     });
  };
  const addNewAmenity = (type) => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.agent_id = JSON.parse(context.state.user).agentId;
    amenityData.tourId = imageset_id;
    amenityData.type = type;
    postRecord(APISaveAmenities, amenityData)
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
  const removeAmenity = (id) => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.agent_id = JSON.parse(context.state.user).agentId;
    amenityData.tourId = imageset_id;
    amenityData.amenityId = id;
    postRecord(APIRemoveAmenities, amenityData)
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
  const SendOthereMail = () => {
    setOpen(true);
    otherLink.authenticate_key = "abcd123XYZ";
    otherLink.agent_id = JSON.parse(context.state.user).agentId;
    otherLink.tourId = imageset_id;
    postRecord(APIOtherMail, otherLink)
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
  const updateAppliancesAmenity = () => {
    setOpen(true);
    const checkedData = [];
    const uncheckedData = [];
    appliancesAmenities.forEach((res) => {
      if (res.countamenity === 1) {
        checkedData.push(res.id);
      }
      uncheckedData.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: imageset_id,
      idsArray: checkedData,
      notcheckedArr: uncheckedData,
      type: "1",
    };
    postRecord(APIUpdateAmenity, obj)
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
  const updateInteriorAmenity = () => {
    setOpen(true);
    const checkedData = [];
    const uncheckedData = [];
    interiorAmenities.forEach((res) => {
      if (res.countamenity === 1) {
        checkedData.push(res.id);
      }
      uncheckedData.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: imageset_id,
      idsArray: checkedData,
      notcheckedArr: uncheckedData,
      type: "2",
    };
    postRecord(APIUpdateAmenity, obj)
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
  const updateExteriorAmenity = () => {
    setOpen(true);
    const checkedData = [];
    const uncheckedData = [];
    exteriorAmenities.forEach((res) => {
      if (res.countamenity === 1) {
        checkedData.push(res.id);
      }
      uncheckedData.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: imageset_id,
      idsArray: checkedData,
      notcheckedArr: uncheckedData,
      type: "3",
    };
    postRecord(APIUpdateAmenity, obj)
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
  const updateCommunityAmenity = () => {
    setOpen(true);
    const checkedData = [];
    const uncheckedData = [];
    communityAmenities.forEach((res) => {
      if (res.countamenity === 1) {
        checkedData.push(res.id);
      }
      uncheckedData.push(res.id);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: imageset_id,
      idsArray: checkedData,
      notcheckedArr: uncheckedData,
      type: "4",
    };
    postRecord(APIUpdateAmenity, obj)
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

  const handleMyCafeGallery = (nextChecked) => {
    let check = nextChecked === true ? 1 : 0;
    setOtherLink({ ...otherLink, ["cafeValue"]: check });
  };
  const handleTourQrCode = (nextChecked) => {
    let check = nextChecked === true ? 1 : 0;
    setOtherLink({ ...otherLink, ["tourvalue"]: check });
  };
  const updateEditImagedata = () => {
    setOpen(true);
    editImageData.authenticate_key = "abcd123XYZ";
    editImageData.agent_id = JSON.parse(context.state.user).agentId;
    editImageData.tourid = imageset_id;
    editImageData.imgid = editImageData.id;
    postRecord(APIUpdateImageset, editImageData).then((res) => {
      if (res.data[0].response.status === "success") {
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(false);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setSync(false);
      }
      setOpen(false);
      setSync(true);
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
  const handleChange = (event, amenity) => {
    var arr = [];
    appliancesAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
      arr.push(res);
    });
    setAppliancesAmenities([]);
    setAppliancesAmenities(arr);
  };
  const handleInteriorChange = (event, amenity) => {
    var arr = [];
    interiorAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
      arr.push(res);
    });
    setInteriorAmenities([]);
    setInteriorAmenities(arr);
  };
  const handleCommunityChange = (event, amenity) => {
    var arr = [];
    communityAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
      arr.push(res);
    });
    setCommunityAmenities([]);
    setCommunityAmenities(arr);
  };
  const handleExteriorChange = (event, amenity) => {
    var arr = [];
    exteriorAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
      arr.push(res);
    });
    setExteriorAmenities([]);
    setExteriorAmenities(arr);
  };
  const handleServiceInputChange = (event) => {
    const { name, value } = event.target;
    setServiceLinks({ ...serviceLinks, [name]: value });
  };

  const handleReport = () => {
    window.open(APIPath() + "site/trafficreport/" + imageset_id, "_blank");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const panoroma = () => {
    history.push(APIPath() + "agent-panaroma/" + imageset_id);
    // window.location.href = APIPath() + "agent-panaroma/" + imageset_id;
  };
  const UpdateImageSetList = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      type: "imageset",
      imageArr: currentImagesetData,
    };
    postRecord(APIUpdateTour, obj)
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
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage + 1);
  };
  const updateAllCaption = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      type: "imageset",
      imageArr: currentImagesetData,
    };
    postRecord(APIUpdateTour, obj)
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
  const handleEmailStatusChange = (nextChecked) => {
    let check = nextChecked === true ? 1 : 0;
    setCurrentUser({ ...currentUser, ["emailStatus"]: check });
  };
  // const SaveTrafficReport = (event) => {
  //     //var check = event.target.checked === true ? 1 : 0;
  //     const obj = {
  //         authenticate_key: "abcd123XYZ",
  //         agentId: JSON.parse(context.state.user).agentId,
  //         tourId: imageset_id, emailStatus: currentUser.emailStatus, txtEmail: currentUser.email
  //     };
  //     console.log(obj);
  //     postRecord(APILoadTrafficReport, obj)
  //         .then(res => {
  //             console.log(res);
  //             if (res.data[0].response.status === "success") {
  //                 console.log()
  //             }
  //         })
  // }
  // console.log(currentUser.emailStatus);
  const SaveTrafficReport = () => {
    setOpen(true);
    trafficData.authenticate_key = "abcd123XYZ";
    trafficData.agent_id = JSON.parse(context.state.user).agentId;
    trafficData.tour_id = imageset_id;
    postRecord(APIAgentTrafficOption, trafficData)
      .then((res) => {
        //console.log(res);
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
  const handleTrafficChange = (nextChecked) => {
    setTrafficData({ ...trafficData, ["emailtrafficreport"]: nextChecked });
  };
  const handleTrafficInputChange = (event) => {
    const { name, value } = event.target;
    setTrafficData({ ...trafficData, [name]: value });
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
      setDragImages(currentImagesetData.image_set_list);
      if (currentImagesetData.image_set_list.length > 0) {
        var count = 200;
        currentImagesetData.image_set_list.forEach((res, index) => {
          if ((index + 1) % 3 === 0) {
            count = count + 200;
          }
          setDivHeight(
            parseInt(
              currentImagesetData.image_set_list.length *
                (count / currentImagesetData.image_set_list.length)
            )
          );
        });
      }
    }
  }, [currentImagesetData]);
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
    var arr = [];
    nextState.forEach((res) => {
      arr.push(res.imageid);
    });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: arr,
      type: "imageset",
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
                <AgentDashBoardHeader ShowMenu={ShowMenu} HideMenu={HideMenu} />

                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>
                    
                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li class="">
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
          <h2>Edit Your ImageSet</h2>
        </div>
      </section>
      <section class="new_edit_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  <ul class="">
                    <li class="">
                      <a href="#" class="active">
                        <i class="fas fa-image"></i>ImageSet Tools
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <section class="snap-scrolling-example">
                <div class="horizontal-images tabscroll-windows">
                  <OwlCarousel
                    loop={false}
                    margin={10}
                    {...options}
                    id="home_slide1"
                  >
                    <div className="asdf">
                      <a
                        className="owl_"
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        <span>
                          <i class="far fa-image"></i>
                        </span>
                        Add Images
                      </a>
                    </div>
                    <div className="asdf">
                      <a
                        onClick={() => {
                          setOpenVideoModal(true);
                        }}
                      >
                        <span>
                          <i class="fas fa-video"></i>
                        </span>
                        Add Video
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={handleEditImageModal}>
                        <span>
                          <i class="far fa-edit"></i>
                        </span>
                        Edit Image
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={downloadImage}>
                        <span>
                          <i class="fas fa-download"></i>
                        </span>
                        Download
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={handleDelete}>
                        <span>
                          <i class="far fa-trash-alt"></i>
                        </span>
                        Delete
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={() => updateAllCaption()}>
                        <span>
                          <i class="fas fa-pen"></i>
                        </span>
                        Update All Captions
                      </a>
                    </div>
                    <div className="asdf">
                      <a href="#" data-toggle="modal" data-target="#Property">
                        <span>
                          <i class="fas fa-info-circle"></i>
                        </span>
                        Property Information
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={() => setOpenAmenityModal(true)}>
                        <span>
                          <i class="fas fa-file-spreadsheet"></i>
                        </span>
                        Amenities
                      </a>
                    </div>

                    <div className="asdf">
                      <a href="#" data-toggle="modal" data-target="#Services">
                        <span>
                          <i class="fas fa-link"></i>
                        </span>
                        Service Links
                      </a>
                    </div>
                    <div className="asdf">
                      <a href="#" data-toggle="modal" data-target="#Links">
                        <span>
                          <i class="fas fa-external-link-alt"></i>
                        </span>
                        Other Links
                      </a>
                    </div>
                    <div className="asdf">
                      <a onClick={() => setOpenTrafficModal(true)}>
                        <span>
                          <i class="far fa-sticky-note"></i>
                        </span>
                        Traffic Reports
                      </a>
                    </div>
                    <div className="asdf">
                      {/* <a href="panorama.html"><span><i class="far fa-image"></i></span>Panoramas</a> */}
                      {/* <Link to={APIPath() + "agent-panoroma"}><span><i class="far fa-image"></i></span>Panoramas</Link> */}
                      <a onClick={() => panoroma()}>
                        <span>
                          <i class="far fa-image"></i>
                        </span>
                        Panoramas
                      </a>
                    </div>
                  </OwlCarousel>
                </div>
              </section>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="test_sec">
                <div class="test_sec_left">
                  <p>
                    <i class="fas fa-map-marker-alt"></i>test, Andorra
                  </p>
                </div>
                <div class="test_sec_right">
                  <button
                    type="button"
                    onClick={() => UpdateImageSetList()}
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
              <div class="action_sec_right">
                <ul>
                  <li style={{ margin: 0 }}>
                    <span>order By</span>
                    <select onChange={handleOrderChange} value={sort}>
                      <option>Select Order</option>
                      <option value="1">Alphabetically (ASC)</option>
                      <option value="2">Alphabetically (DESC)</option>
                      <option value="3">Date (ASC)</option>
                      <option value="4">Date (DESC)</option>
                      <option value="5">Captured Date (ASC)</option>
                      <option value="6">Captured Date (DESC)</option>
                    </select>
                  </li>
                </ul>
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
                rowHeight={400}
                style={{ height: 800 + "px" }}
              >
                {dragImages.map((res, index) => (
                  <GridItem className="top" key={res.imageid}>
                    <div
                      onClick={() => {
                        setImageId(res.imageid);
                        setImageUrl(
                          res.original_file_url
                            ? res.original_file_url
                            : res.file_url
                        );
                        setBaseUrl(res.file_url);
                        setVideoUrl(res.video_url);
                        handleImageId(res);
                      }}
                      class="col-lg-12 col-md-12"
                      style={{ cursor: "grab" }}
                    >
                      <div
                        id={"myDiv" + res.imageid}
                        class="select_img_set_box"
                        style={{ marginBottom: "20px" }}
                      >
                        <div class="row">
                          <div class="col-lg-12 col-md-12">
                            <div class="select_img_set_box_img">
                              <img
                                draggable="false"
                                src={res.file_url}
                                style={{ height: "185px" }}
                                alt=""
                              />
                              {res.image_type === "panoramas" ? (
                                <img
                                  src={res.flag_img}
                                  style={{
                                    position: "absolute",
                                    width: "90px",
                                    right: "5px",
                                    top: "5px",
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
                          <div class="col-lg-12 col-md-12">
                            <input
                              type="text"
                              name={"caption" + index}
                              onChange={(event) =>
                                handleCaptionChange(event, res)
                              }
                              value={res.caption}
                              placeholder={res.caption}
                              class="form-control"
                            />
                          </div>
                          <div
                            class="col-lg-9 col-md-9"
                            style={{ marginTop: "10px" }}
                          >
                            <label style={{ marginRight: "35px" }}>
                              Use this Image on tour ?
                              <span style={{ color: "#ffa12d" }}></span>
                            </label>
                          </div>
                          <div
                            class="col-lg-2 col-md-2"
                            style={{ marginTop: "7px" }}
                          >
                            <Switch
                              onChange={(event) =>
                                handleImageTourChange(event, res.imageid)
                              }
                              checked={res.enableontour}
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
                                                            setBaseUrl(res.file_url);
                                                            setVideoUrl(res.video_url);
                                                            handleImageId(res);
                                                        }} class="col-lg-4 col-md-12" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div id={"myDiv" + res.imageid} class="select_img_set_box" style={{ marginBottom: "20px" }}>
                                                                <div class="row">
                                                                    <div class="col-lg-5 col-md-5">
                                                                        <div class="select_img_set_box_img">
                                                                            <img src={res.file_url} style={{ height: "110px" }} alt="" />
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
                                                                        <input type="text" name="caption"
                                                                            onChange={(event) => handleCaptionChange(event, res)} value={res.filename}
                                                                            placeholder={res.filename} class="form-control" />
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
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title">
          Add Images
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
                saveNewImage();
              }}
            >
              <div class="agent_pop_main">
                <h6 class="optimal_pic mar_top">
                  Optimal picture size is 1075x768. Images should not be larger
                  than 5mb file size and no smaller than 1075x768 or larger.
                </h6>
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <Dropzone
                      accept="image/*"
                      onDrop={(acceptedFiles) => {
                        acceptedFiles.map((res) => {
                          if (
                            res.type == "image/jpeg" ||
                            res.type == "image/jpg" ||
                            res.type == "image/png"
                          ) {
                            setUploadedImages((oldArray) => [...oldArray, res]);
                          } else {
                            setMessage("Accepts only images");
                            setOpenError(true);
                          }
                        });
                      }}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    {uploadedImages.length > 0 && (
                      <React.Fragment>
                        <h4 style={{ marginTop: "20px" }}>Uploaded Files :</h4>
                        <div class="row">
                          {uploadedImages.map((res) => (
                            <div class="col-lg-2 col-md-2">
                              <img
                                style={{ height: "100px", width: "100%" }}
                                src={getImageFromUpload(res)}
                                alt="img"
                              />
                              <CancelIcon
                                onClick={() => handleImageRemove(res)}
                                style={{
                                  marginTop: "-124%",
                                  marginLeft: "86%",
                                  background: "#fff",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    )}
                    {/* <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            onSubmit={handleImageSubmit}
                                            accept="image/*"
                                            styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                                        /> */}
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
                    Submit<i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openVideoModal}
      >
        <DialogTitle id="customized-dialog-title">
          Add Video
          <CancelIcon
            onClick={() => setOpenVideoModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                newVideoData.authenticate_key = "abcd123XYZ";
                newVideoData.agent_id = JSON.parse(context.state.user).agentId;
                newVideoData.tourid = imageset_id;
                saveNewVideo(newVideoData);
              }}
            >
              <div class="agent_pop_main">
                <h6 class="optimal_pic mar_top">
                  Videos should be .mp4 file format and no larger than 500mb
                  file size. Please be aware of MLS rules when adding videos
                  with agent or broker branding and using MLS links as the
                  videos will be included
                </h6>
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        console.log(acceptedFiles);
                        acceptedFiles.map((res) => {
                          if (res.type == "video/mp4") {
                            setUploadedVideos((oldArray) => [...oldArray, res]);
                          } else {
                            setMessage("Please upload a valid mp4 file.");
                            setOpenError(true);
                          }
                        });
                      }}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    {uploadedVideos.length > 0 && (
                      <React.Fragment>
                        <h4 style={{ marginTop: "20px" }}>Uploaded Files :</h4>
                        <div class="row">
                          {uploadedVideos.map((res, index) => (
                            <React.Fragment>
                              <h6
                                style={{ marginLeft: "20px", color: "green" }}
                              >
                                {index + 1 + " : " + res.name}
                              </h6>
                              <CancelIcon
                                onClick={() => handleVideoRemove(res)}
                                style={{
                                  marginTop: "-4px",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </React.Fragment>
                    )}
                    {/* <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            onSubmit={handleVideoSubmit}
                                            accept="video/*"
                                            styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                                        /> */}
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
                    Submit<i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
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
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAmenityModal}
      >
        <DialogTitle id="customized-dialog-title">
          Amenities
          <CancelIcon
            onClick={() => setOpenAmenityModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
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
                <div class="tab-pane active" id="Appliances" role="tabpanel">
                  <div class="agent_pop_main_head padd_top">
                    <h5>Appliances</h5>
                  </div>
                  <div class="mar_top row">
                    {appliancesAmenities && appliancesAmenities.length > 0
                      ? appliancesAmenities.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <div class="switchToggle custom-control custom-switch">
                                <Switch
                                  onChange={(event) => {
                                    handleChange(event, res);
                                  }}
                                  checked={res.countamenity == 1 ? true : false}
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
                                {/*  */}
                              </div>
                              <p style={{ marginLeft: "20px" }}>
                                {res.amenityname}
                              </p>
                              {res.agentid ===
                              JSON.parse(context.state.user).agentId ? (
                                <HighlightOffIcon
                                  onClick={() => removeAmenity(res.id)}
                                  style={{
                                    left: "26%",
                                    position: "absolute",
                                    top: "-10px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        onChange={handleAmenityChange}
                        name="amenityname"
                        value={amenityData.amenityname}
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-6">
                      <Button
                        style={{
                          marginTop: "1px",
                          marginLeft: "-30px",
                          padding: "10px",
                        }}
                        onClick={() => addNewAmenity("1")}
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <Button
                        onClick={updateAppliancesAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="Interior" role="tabpanel">
                  <div class="agent_pop_main_head padd_top">
                    <h5>Interior Amenities</h5>
                  </div>
                  <div class="mar_top row">
                    {interiorAmenities && interiorAmenities.length > 0
                      ? interiorAmenities.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              {/* <p>{res.amenityname}</p> */}
                              <div class="switchToggle custom-control custom-switch">
                                <Switch
                                  onChange={(event) => {
                                    handleInteriorChange(event, res);
                                  }}
                                  checked={
                                    res.countamenity === 1 ? true : false
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
                              <p style={{ marginLeft: "20px" }}>
                                {res.amenityname}
                              </p>
                              {res.agentid ===
                              JSON.parse(context.state.user).agentId ? (
                                <HighlightOffIcon
                                  onClick={() => removeAmenity(res.id)}
                                  style={{
                                    left: "26%",
                                    position: "absolute",
                                    top: "-10px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        onChange={handleAmenityChange}
                        name="amenityname"
                        value={amenityData.amenityname}
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-6">
                      <Button
                        style={{
                          marginTop: "1px",
                          marginLeft: "-30px",
                          padding: "10px",
                        }}
                        onClick={() => addNewAmenity("2")}
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <Button
                        onClick={updateInteriorAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="Exterior" role="tabpanel">
                  <div class="agent_pop_main_head padd_top">
                    <h5>Exterior Amenities</h5>
                  </div>

                  <div class="mar_top row">
                    {Object.keys(exteriorAmenities).length > 0
                      ? exteriorAmenities.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              {/* <p>{res.amenityname}</p> */}
                              <div class="switchToggle custom-control custom-switch">
                                <Switch
                                  onChange={(event) => {
                                    handleExteriorChange(event, res);
                                  }}
                                  checked={
                                    res.countamenity === 1 ? true : false
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
                              <p style={{ marginLeft: "20px" }}>
                                {res.amenityname}
                              </p>
                              {res.agentid ===
                              JSON.parse(context.state.user).agentId ? (
                                <HighlightOffIcon
                                  onClick={() => removeAmenity(res.id)}
                                  style={{
                                    left: "26%",
                                    position: "absolute",
                                    top: "-10px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        onChange={handleAmenityChange}
                        name="amenityname"
                        value={amenityData.amenityname}
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-6">
                      <Button
                        style={{
                          marginTop: "1px",
                          marginLeft: "-30px",
                          padding: "10px",
                        }}
                        onClick={() => addNewAmenity("3")}
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <Button
                        onClick={updateExteriorAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="Community" role="tabpanel">
                  <div class="agent_pop_main_head padd_top">
                    <h5>Community Amenities</h5>
                  </div>
                  <div class="mar_top row">
                    {Object.keys(allAmenities).length > 0
                      ? communityAmenities.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              {/* <p>{res.amenityname}</p> */}
                              <div class="switchToggle custom-control custom-switch">
                                <Switch
                                  onChange={(event) => {
                                    handleCommunityChange(event, res);
                                  }}
                                  checked={
                                    res.countamenity === 1 ? true : false
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
                              <p style={{ marginLeft: "20px" }}>
                                {res.amenityname}
                              </p>
                              {res.agentid ===
                              JSON.parse(context.state.user).agentId ? (
                                <HighlightOffIcon
                                  onClick={() => removeAmenity(res.id)}
                                  style={{
                                    left: "26%",
                                    position: "absolute",
                                    top: "-10px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        onChange={handleAmenityChange}
                        name="amenityname"
                        value={amenityData.amenityname}
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-6">
                      <Button
                        style={{
                          marginTop: "1px",
                          marginLeft: "-30px",
                          padding: "10px",
                        }}
                        onClick={() => addNewAmenity("4")}
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <Button
                        onClick={updateCommunityAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
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
        open={openTrafficModal}
      >
        <DialogTitle id="customized-dialog-title">
          Traffic Report
          <CancelIcon
            onClick={() => setOpenTrafficModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              SaveTrafficReport();
            }}
          >
            <div class="agent_pop_main">
              <div class="agent_pop_main_head padd_top">
                <h5>Email Recipients (comma seperated)</h5>
              </div>
              <p class="padd_top">
                You could enter multiple email addresses separated by commas.
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
                      {/* <input type="text" name="" class="form-control" value={currentUser && currentUser.email} /> */}
                      <input
                        type="text"
                        onChange={handleTrafficInputChange}
                        value={trafficData.reportrecipients}
                        name="reportrecipients"
                        class="form-control"
                      />
                      <div class="d-flex">
                        <button
                          onClick={handleReport}
                          type="button"
                          class="next_btn"
                        >
                          View Report
                        </button>
                        <button type="submit" class="next_btn grey email_btn">
                          Send Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="agent_pop_main_head padd_top">
                <h5>Auto Forward</h5>
              </div>
              <div class="service_links">
                <div class="row padd_top">
                  <div class="col-lg-3 col-md-3">
                    <div class="service_links_left">
                      <h6>Email report every week:</h6>
                    </div>
                  </div>
                  <div class="col-lg-9 col-md-9">
                    <div class="service_links_right">
                      <div class="switchToggle custom-control custom-switch">
                        {/* <input type="checkbox" class="custom-control-input" id="customSwitch333" checked="" />
                                            <label class="custom-control-label" for="customSwitch333">&nbsp;</label> */}
                        {/* <input type="checkbox" class="custom-control-input" id="customSwitch1114" onChange={handleEmailStatusChange} value={Object.keys(currentUser).length > 0 && currentUser.emailStatus} checked={Object.keys(currentUser).length > 0 && currentUser.emailStatus === 1 ? true : false} /> */}
                        {/* <input typ="checkbox" class="custom-control-input" onchange={handleEmailStatusChange} id="customSwitch1114" value={currentUser.emailStatus} checked={currentUser.emailStatus === 1 ? true : false}></input> */}
                        {/* <label class="custom-control-label" for="customSwitch1114">&nbsp;</label> */}
                        {/* <Switch
                                                    onChange={handleEmailStatusChange}
                                                    checked={currentUser.emailStatus}
                                                    handleDiameter={28}
                                                    offColor="#5D5D5D"
                                                    onColor="#F6AD17"
                                                    offHandleColor="#fff"
                                                    onHandleColor="#fff"
                                                    height={35}
                                                    width={60}
                                                    name="emailStatus"
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
                                                /> */}
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
                          className="react-switch"
                        />
                      </div>
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
        </DialogContent>
      </Dialog>

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
                                    value={propertyData.caption}
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
                                  <label>Bedrooms</label>
                                  <input
                                    type="number"
                                    onChange={handleInputChange}
                                    name="totalbedrooms"
                                    value={propertyData.totalbedrooms}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>Bathrooms</label>
                                  <input
                                    type="number"
                                    onChange={handleInputChange}
                                    name="totalbathrooms"
                                    value={propertyData.totalbathrooms}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>Parking Space</label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="parkingspaces"
                                    value={propertyData.parkingspaces}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>Year Built</label>
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
                                  <label>Subdivision</label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="subdivision"
                                    value={propertyData.subdivision}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>LOT Size</label>
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
                                  <label>Garage Size</label>
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
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="mls"
                                    value={propertyData.mls}
                                    class="form-control"
                                  />
                                  {/* <select type="text" onChange={handleInputChange} name="mls" value={propertyData.mls} class="form-control formbox1select">
                                                                        <option>MLS</option>
                                                                        <option>MLS</option>
                                                                        <option>MLS</option>
                                                                        <option>MLS</option>
                                                                    </select> */}
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
                                    <option>USD</option>
                                    <option>CAD</option>
                                    <option>EUR</option>
                                  </select>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <label>
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="number"
                                    onChange={handleInputChange}
                                    name="price"
                                    value={propertyData.price}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    FLEXIBILITY{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    type="text"
                                    onChange={handleInputChange}
                                    name="priceflexibility"
                                    value={propertyData.priceflexibility}
                                    class="form-control formbox1select"
                                  >
                                    <option>Select option</option>
                                    <option>FIRM</option>
                                    <option>Negotiable</option>
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
                                  <label>ADDRESS</label>
                                  <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="address"
                                    value={propertyData.address}
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>PROPERTY TYPE</label>
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
                                  <label>STATUS </label>
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
                                  <label>Country</label>
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
                                  <label>STATE</label>
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
                                  <label>CITY</label>
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
                                  <label>ZIPCODE</label>
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
                                      readOnly
                                      onChange={(event) =>
                                        handleLeadChange(event, index)
                                      }
                                      checked={
                                        documentLeadData["leadcapture" + index]
                                          ? true
                                          : false
                                      }
                                      //  checked={documentData[leadcapture${index}] ? true : false}
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
              <div class="modal-body"></div>
              {/* <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="">Save</button>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="Services" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Service Links<i class="fas fa-link"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_pop_main_head">
                    <h5>Branded Links</h5>
                    <div class="row" style={{ paddingLeft: "20px" }}>
                      <div class="agent_info_sec_cont">
                        <ul>
                          <li>
                            <span>Tour :</span>{" "}
                            <a
                              href={
                                Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.tour_link
                              }
                            >
                              {Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.tour_link}
                            </a>{" "}
                          </li>
                          <li>
                            <span>Flyer :</span>{" "}
                            <a
                              href={
                                Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.flyer_link
                              }
                            >
                              {Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.flyer_link}
                            </a>{" "}
                          </li>
                          <li>
                            <span>Video :</span>{" "}
                            <a
                              href={
                                Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.video_link
                              }
                            >
                              {Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.branded_link.video_link}
                            </a>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    class="agent_pop_main_head"
                    style={{ paddingTop: "15px" }}
                  >
                    <h5>MLS Links</h5>
                    <div class="row" style={{ paddingLeft: "20px" }}>
                      <div class="agent_info_sec_cont">
                        <ul>
                          <li>
                            <span>Standard :</span>{" "}
                            <a
                              href={
                                Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.mls_link.standard_link
                              }
                            >
                              {Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.mls_link.standard_link}
                            </a>{" "}
                          </li>
                          <li>
                            <span>Strict :</span>{" "}
                            <a
                              href={
                                Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.mls_link.strict_link
                              }
                            >
                              {Object.keys(serviceLinks).length > 0 &&
                                serviceLinks.mls_link.strict_link}
                            </a>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    class="agent_pop_main_head"
                    style={{ paddingTop: "15px" }}
                  >
                    <h5>Email Links</h5>
                    <p style={{ paddingTop: "10px" }}>
                      You could enter multiple email addresses separated by
                      comma.
                    </p>
                  </div>
                  <div class="">
                    <input
                      type="text"
                      name="email"
                      value={serviceLinks.email}
                      onChange={handleServiceInputChange}
                      placeholder="Email"
                      class="form-control"
                    />
                    <button
                      type="button"
                      onClick={SendServiceMail}
                      class="next_btn"
                    >
                      Send
                    </button>
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
      <div class="agent_pop">
        <div id="Links" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Other Links<i class="fas fa-external-link-alt"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_pop_main_head">
                    <h5>QR Codes</h5>
                  </div>
                  <div class="row">
                    <div class="col-lg-3 col-md-3">
                      <div class="agent_pop_img">
                        <label>Tour:</label>
                        <img
                          src={
                            Object.keys(otherLink).length > 0
                              ? otherLink.qr_code.qr_image_link
                              : undefined
                          }
                          alt=""
                          title=""
                          style={{ margin: "0 0 10px 0" }}
                        />
                      </div>
                      <div class="download_qr">
                        <div class="switchToggle custom-control custom-switch">
                          <Switch
                            onChange={handleTourQrCode}
                            checked={otherLink.tourvalue}
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
                        {Object.keys(otherLink).length > 0 &&
                        otherLink.tourvalue === 1 ? (
                          <a
                            href="javascript:void()"
                            onClick={() => {
                              downloadQrCode(
                                otherLink.qr_code.mycafe_image_link
                              );
                            }}
                            class="next_btn download_btn"
                          >
                            Download
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-3">
                      <div class="agent_pop_img">
                        <label>MyCafeGallery:</label>
                        <img
                          src={
                            Object.keys(otherLink).length > 0
                              ? otherLink.qr_code.mycafe_image_link
                              : undefined
                          }
                          alt=""
                          title=""
                          style={{ margin: "0 0 10px 0" }}
                        />
                      </div>
                      <div class="download_qr">
                        <div class="switchToggle custom-control custom-switch">
                          <Switch
                            onChange={handleMyCafeGallery}
                            checked={otherLink.cafeValue}
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
                        {Object.keys(otherLink).length > 0 &&
                        otherLink.cafeValue === 1 ? (
                          <a
                            href="javascript:void()"
                            onClick={() => {
                              downloadQrCode(
                                otherLink.qr_code.mycafe_image_link
                              );
                            }}
                            class="next_btn download_btn"
                          >
                            Download
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="agent_pop_main_head padd_top">
                    <h5>Tour Links</h5>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>Service Link: </h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <a
                            href={
                              Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.service_link
                            }
                          >
                            {Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.service_link}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>MyCafeGallery (Branded): </h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <a
                            href={
                              Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.myCafeGallery_branded_link
                            }
                          >
                            {Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.myCafeGallery_branded_link}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>MyCafeGallery (Unbranded): </h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <a
                            href={
                              Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.myCafeGallery_unbranded_link
                            }
                          >
                            {Object.keys(otherLink).length > 0 &&
                              otherLink.mis_link.myCafeGallery_unbranded_link}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>Inventory Button: </h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <input
                            type="text"
                            name=""
                            class="form-control"
                            value="Inventory Button"
                          />
                          <button type="button" class="next_btn">
                            View Our VirtualTorCafe Inventory
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>Tour Widget:</h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <input
                            type="text"
                            name=""
                            class="form-control"
                            value="Tour Widget"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>Embed Code:</h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <input
                            type="text"
                            name=""
                            class="form-control"
                            value="Embed Code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="agent_pop_main_head padd_top">
                    <h5>Email Links</h5>
                  </div>
                  <p class="padd_top">
                    You could enter multiple email addresses seperated by comma.
                  </p>
                  <div class="service_links">
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="service_links_left">
                          <h6>Email:</h6>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="service_links_right">
                          <input
                            type="text"
                            onChange={handleOtherInputChange}
                            name="sendEmailTo"
                            value={otherLink.sendEmailTo}
                            class="form-control"
                            placeholder=""
                          />
                          <button
                            type="button"
                            onClick={SendOthereMail}
                            class="next_btn"
                          >
                            Send
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
      </div>
      {/* <div class="agent_pop">
                <div id="Traffic" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                               // SaveTrafficReport()
                            }}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Traffic Reports<i class="far fa-file-chart-pie"></i></h4>
                                </div>
                                <div class="modal-body">
                                    <div class="agent_pop_main">
                                        <div class="agent_pop_main_head padd_top">
                                            <h5>Email Recipients (comma seperated)</h5>
                                        </div>
                                        <p class="padd_top">You could enter multiple email addresses separated by commas.</p>
                                        <div class="service_links">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-3">
                                                    <div class="service_links_left">
                                                        <h6>To:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-lg-9 col-md-9">
                                                    <div class="service_links_right">
                                                        <input type="text" name="" class="form-control" placeholder="maastest3@gmail.com" />
                                                        <div class="d-flex">
                                                            <button type="button" class="next_btn">View Report</button>
                                                            <button type="button" class="next_btn grey email_btn">Send Email</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="agent_pop_main_head padd_top">
                                            <h5>Auto Forward</h5>
                                        </div>
                                        <div class="service_links">
                                            <div class="row padd_top">
                                                <div class="col-lg-3 col-md-3">
                                                    <div class="service_links_left">
                                                        <h6>Email report every week:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-lg-9 col-md-9">
                                                    <div class="service_links_right">
                                                        <div class="switchToggle custom-control custom-switch" >
                                                            <input type="checkbox" class="custom-control-input" id="customSwitch333" checked="" />
                                                            <label class="custom-control-label" for="customSwitch333">&nbsp;</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-default" data-dismiss="">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
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
    </div>
  );
}
