/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext, useRef } from "react";
import $ from "jquery";
import Switch from "react-switch";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import ImageUploader from "react-images-upload";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import banner from "../../../images/vtc-banner.jpg";
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { HTML5_FMT } from "moment";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const APIGetUserData = APIURL() + "user-details";
const APIGetDashboardData = APIURL() + "agent-dashboard";
const APIVerifyAccount = APIURL() + "resend-verification-mail";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetAmenities = APIURL() + "get-all-amenities";
const APIGetActiveToursList = APIURL() + "get-active-tours-list";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  active_panel: {
    display: "block !important",
    opacity: "1",
  },
  hide_panel: {
    display: "none",
    opacity: "0",
    position: "relative !important",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function AgentDashboard(props) {
  let AgentType = props.match.params.type;
  let history = useHistory();
  const context = useContext(AuthContext);
  const classes = useStyles();
  const initialImagesetState = {
    countryid: 40,
    stateid: "",
    city: "",
    categoryid: "",
    typeid: "",
    caption: "",
    pricetype: "",
    price: "",
    mls: "",
    virtualtourservice: 0,
    flyerservice: 0,
    videoservice: 0,
    picture: "",
    video: "",
    panorama: "",
    widget_title: "",
    description: "",
    totalbedrooms: "",
    totalbathrooms: "",
    parkingspaces: "",
    yearbuilt: "",
    subdivision: "",
    lotsize: "",
    garagesize: "",
    schooldistrict: "",
    sqfootage: "",
    priceflexibility: "",
    priceinfo: "",
    address: "",
    zipcode: "",
    neighbourhood: "",
    latitude: "",
    longitude: "",
    areaschoolslink: "",
    name: "",
    documentName: "",
    documentPassword: "",
    leadcapture: "",
    amenitiesId: "",
  };
  const mediainputRef = useRef();
  const [imagesetData, setImagesetData] = useState(initialImagesetState);
  const [currentUser, setCurrentUser] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [mostViewedData, setMostViewedData] = useState({});
  const [top10Tours, setTop10Tours] = useState([]);
  const [xaxisData, setXaxisData] = useState([]);
  const [yaxisData, setYaxisData] = useState([]);
  const [sync, setSync] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openCompanyeModal, setOpenCompanyModal] = useState(false);
  const [imageData, setImageData] = useState({});
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [companyPictures, setCompanyPictures] = useState({});
  const [step, setStep] = useState(1);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [appliancesAmenities, setAppliancesAmenities] = useState([]);
  const [communityAmenities, setCommunityAmenities] = useState([]);
  const [interiorAmenities, setInteriorAmenities] = useState([]);
  const [exteriorAmenities, setExteriorAmenities] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedPanorama, setUploadedPanorama] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [totalDivs, setTotalDivs] = useState(["Div0"]);
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [classType, setClassType] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [description, setDescription] = useState("");
  const [creditData, setCreditData] = useState({});

  useEffect(() => {
    switch (creditData.subId) {
      case 1:
        setClassType("header_icon_silver");
        setSubscriptionType("Monthly");
        setDescription(
          `Active Tours ${creditData.activeTours} of ${creditData.totalTours}`
        );
        break;

      case 2:
        setClassType("header_icon_gold");
        setSubscriptionType("Monthly");
        setDescription(
          `Active Tours ${creditData.activeTours} of ${creditData.totalTours}`
        );
        break;

      case 3:
        setClassType("header_icon_platinum");
        setSubscriptionType("Monthly");
        setDescription("Unlimited Active Tours");
        break;

      case 4:
        setClassType("header_icon_silver");
        setSubscriptionType("Yearly");
        setDescription(
          `Active Tours ${creditData.activeTours} of ${creditData.totalTours}`
        );
        break;

      case 5:
        setClassType("header_icon_gold");
        setSubscriptionType("Yearly");
        setDescription(
          `Active Tours ${creditData.activeTours} of ${creditData.totalTours}`
        );
        break;

      case 6:
        setClassType("header_icon_platinum");
        setSubscriptionType("Yearly");
        setDescription("Unlimited Active Tours");
        break;

      case 10:
        setClassType("header_icon_trial");
        setSubscriptionType("Monthly");
        setDescription("7 Day Free Trial");
        break;

      case 11:
        setClassType("header_icon_basic");
        setSubscriptionType("Monthly");
        setDescription("MLS Basic");
        break;

      case 12:
        setClassType("header_icon_basic");
        setSubscriptionType("Premium Monthly");
        setDescription("");
        break;

      case 13:
        setClassType("header_icon_basic");
        setSubscriptionType("Premium Yearly");
        setDescription("");
        break;

      default:
        setClassType("");
        setSubscriptionType("");
        setDescription("");
        break;
    }
  }, [creditData, creditData.activeTours, creditData.totalTours]);
  const renderLinkText = () => {
    if (creditData && creditData.linktype && creditData.linktype != "") {
      let linktext =
        creditData.linktype.charAt(0).toUpperCase() +
        creditData.linktype.slice(1);

      if (
        creditData.linktype === "group" &&
        creditData.totaltours !== undefined
      ) {
        linktext = creditData.totaltours
          ? `Active Tours ${creditData.activetours} of ${creditData.totaltours}`
          : "Broker subscription not found";
      }

      return (
        <li>
          Linked - {linktext}
          <span
            title={
              creditData.linktype === "group" &&
              creditData.subscriptionactive !== undefined &&
              !creditData.subscriptionactive
                ? "Subscription Expired"
                : ""
            }
            className={
              creditData.linktype === "group" &&
              creditData.subscriptionactive !== undefined &&
              !creditData.subscriptionactive
                ? "header_icon_expired"
                : "header_icon_linked"
            }
          ></span>
        </li>
      );
    }
    return null;
  };

  const renderSubscriptionInfo = () => {
    if (
      creditData.subscriptionid &&
      creditData.linktype !== "group" &&
      creditData.linktype !== "master" &&
      creditData.subscriptionid !== 7 &&
      creditData.subscriptionid !== 8 &&
      creditData.subscriptionid !== 9
    ) {
      return (
        <li>
          {creditData.type !== "" ? `${creditData.type} - ` : ""}
          {creditData.description}
          <span
            title={
              creditData.class === "header_icon_expired"
                ? "Subscription Expired"
                : ""
            }
            className={creditData.class}
          ></span>
        </li>
      );
    }
    return null;
  };

  const renderAlaCarteInfo = () => {
    if (
      creditData.linktype !== "group" &&
      creditData.linktype !== "master" &&
      (creditData.hasboughtalacarte || creditData.alacartecredits)
    ) {
      return (
        <li>
          Ala-Carte - Available Credits {creditData.alacartecredits}
          <span className="header_icon_alacarte"> </span>
        </li>
      );
    }
    return null;
  };
  const options = {
    title: {
      text: "",
    },
    chart: {
      type: "column",
    },
    xAxis: {
      title: {
        text: "Captions",
      },
      categories: xaxisData,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Tour hits",
      },
    },
    series: [{ data: yaxisData }],
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

  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
  };
  const handleVideoRemove = (data) => {
    const filteredPeople = uploadedVideos.filter(
      (item) => item.name !== data.name
    );
    setUploadedVideos(filteredPeople);
  };
  const handlePanoramaRemove = (data) => {
    const filteredPeople = uploadedPanorama.filter(
      (item) => item.name !== data.name
    );
    setUploadedPanorama(filteredPeople);
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

  // const handleImageChange = (event) => {
  //     setImagesetData({ ...imagesetData, "name": event.target.files });
  // }
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
  const showToggle = () => {
    $(".toggle_sec").slideToggle("slow");
  };
  const goToDescription = () => {
    if (
      uploadedImages.length !== 0 ||
      uploadedVideos.length !== 0 ||
      uploadedPanorama.length !== 0
    ) {
      setStep(2);
      setShowDesc(true);
      setShowImage(false);
      window.scrollTo(0, 700);
    } else {
      setMessage("Please Upload images / videos first to submit the form ...");
      setOpenWarning(true);
    }
  };
  const goBackToImage = () => {
    setStep(1);
    setShowDesc(false);
    setShowImage(true);
  };
  const goToFeature = () => {
    if (imagesetData.caption === "") {
      setMessage("Please add caption ...");
      setOpenWarning(true);
    } else {
      setStep(3);
      setShowDesc(false);
      setShowFeature(true);
      window.scrollTo(0, 700);
    }
  };
  const goBackToDesc = () => {
    setStep(2);
    setShowDesc(true);
    setShowFeature(false);
    window.scrollTo(0, 700);
  };
  const goToAmenities = () => {
    setStep(4);
    setShowAmenities(true);
    setShowFeature(false);
    window.scrollTo(0, 700);
  };
  const goBackToFeature = () => {
    setStep(3);
    setShowFeature(true);
    setShowAmenities(false);
    window.scrollTo(0, 700);
  };
  const goToPricing = () => {
    setStep(5);
    setShowPricing(true);
    setShowAmenities(false);
    window.scrollTo(0, 700);
  };
  const goBackToAmenities = () => {
    setStep(4);
    setShowAmenities(true);
    setShowPricing(false);
    window.scrollTo(0, 700);
  };
  const goTolocation = () => {
    setStep(6);
    setShowLocation(true);
    setShowPricing(false);
    window.scrollTo(0, 700);
  };
  const goBackToPricing = () => {
    setStep(5);
    setShowPricing(true);
    setShowLocation(false);
    window.scrollTo(0, 700);
  };
  const goToDocuments = () => {
    setStep(7);
    setShowLocation(false);
    setShowDocuments(true);
    window.scrollTo(0, 700);
  };
  const goBackToLocation = () => {
    setStep(6);
    setShowLocation(true);
    setShowDocuments(false);
    window.scrollTo(0, 700);
  };
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleImageSubmit = (files, allFiles) => {
    const data = [];
    files.map((res) => {
      data.push(res.file);
    });
    setImagesetData({ ...imagesetData, ["picture"]: data });
    allFiles.forEach((f) => f.remove());
    setMessage("Image Uploaded Successfully");
    setOpenSuccess(true);
    setUploadedImages(data);
  };
  const handleChangeStatus = ({ meta, file }, status) => {};
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const handleVideoSubmit = (files, allFiles) => {
    const data = [];
    files.map((res) => {
      data.push(res.file);
    });
    setImagesetData({ ...imagesetData, ["video"]: data });
    allFiles.forEach((f) => f.remove());
  };
  const handlePanoramaSubmit = (files, allFiles) => {
    const data = [];
    files.map((res) => {
      data.push(res.file);
    });
    setImagesetData({ ...imagesetData, ["panorama"]: data });
    allFiles.forEach((f) => f.remove());
    setUploadedImages(data);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "caption") {
      setImagesetData({ ...imagesetData, caption: value, widget_title: value });
    } else setImagesetData({ ...imagesetData, [name]: value });
  };
  const handleNumberChange = (event) => {
    const { name, value } = event.target;
    setImagesetData({ ...imagesetData, [name]: value.replace(/\D/g, "") });
  };
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetAmenities, objusr).then((res) => {
        // setAllAmenities(res.data[0].response.data);
        setAppliancesAmenities(res.data[0].response.data.appliances);
        setCommunityAmenities(res.data[0].response.data.community);
        setInteriorAmenities(res.data[0].response.data.interior);
        setExteriorAmenities(res.data[0].response.data.exterior);
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
        // console.log(res);
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetActiveToursList, objusr).then((res) => {
        // console.log(res);
        if (res.data[0].response.status === "success") {
          setCreditData(res.data[0].response);
        }
      });
    }
  }, [context.state.user, sync]);
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
      country_id: imagesetData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
      }
    });
  }, [imagesetData.countryid]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetDashboardData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setDashboardData(res.data[0].response.data.agent_profile);
          setMostViewedData(res.data[0].response.data);
          setTop10Tours(res.data[0].response.top10tours);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (top10Tours) {
      var x_data = [];
      var y_data = [];
      top10Tours.forEach((res) => {
        x_data.push(res.caption);
        y_data.push(parseInt(res.tourhits));
      });
      setXaxisData(x_data);
      setYaxisData(y_data);
    }
  }, [top10Tours]);
  // useEffect(() => {
  //     setImagesetData({ ...imagesetData, ["amenitiesId"]: allAmenities });
  // }, [allAmenities]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const verifyAccount = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
    };
    postRecord(APIVerifyAccount, objusr)
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
      });
  };
  const handleChange = (event, amenity) => {
    setAllAmenities([...allAmenities, amenity.id]);
    appliancesAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
    });
    setAppliancesAmenities([]);
    setAppliancesAmenities(appliancesAmenities);
  };
  const handleInteriorChange = (event, amenity) => {
    setAllAmenities([...allAmenities, amenity.id]);
    interiorAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
    });
    setInteriorAmenities([]);
    setInteriorAmenities(interiorAmenities);
  };
  const handleCommunityChange = (event, amenity) => {
    setAllAmenities([...allAmenities, amenity.id]);
    communityAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
    });
    setCommunityAmenities([]);
    setCommunityAmenities(communityAmenities);
  };
  const handleExteriorChange = (event, amenity) => {
    setAllAmenities([...allAmenities, amenity.id]);
    exteriorAmenities.forEach((res) => {
      if (res.id === amenity.id) {
        if (event === true) {
          res.countamenity = 1;
        } else {
          res.countamenity = 0;
        }
      }
    });
    setExteriorAmenities([]);
    setExteriorAmenities(exteriorAmenities);
  };
  const handleLogoChange = (element) => {
    setImageData({ ...imageData, ["agentphotouploadfile"]: element });
  };
  const handleCompanyChange = (element) => {
    setCompanyPictures({ ...companyPictures, ["logoImageName"]: element });
  };
  const saveProfilePictures = () => {
    imageData.authenticate_key = "abcd123XYZ";
    imageData.agent_id = JSON.parse(context.state.user).agentId;

    const formData = new FormData();
    for (let i in imageData) {
      if (i === "agentphotouploadfile") {
        for (let file of imageData[i]) {
          formData.append("agentphotouploadfile", file);
        }
      } else {
        formData.append(i, imageData[i]);
      }
    }
    axios
      .post(APIURL() + `agent-profile-upload-image`, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Uploaded Sucessfully.....");
          setOpenSuccess(true);
          setOpenProfileModal(false);
          setSync(true);
          // setImageData({ ...imageData, ["agentphotouploadfile"]: res.data[0].response.data.profile_image });
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setOpenProfileModal(false);
          setSync(true);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const saveCompanyPictures = () => {
    companyPictures.authenticate_key = "abcd123XYZ";
    companyPictures.agent_id = JSON.parse(context.state.user).agentId;
    const formData = new FormData();
    for (let i in companyPictures) {
      if (i === "logoImageName") {
        for (let file of companyPictures[i]) {
          formData.append("logoImageName", file);
        }
      } else {
        formData.append(i, companyPictures[i]);
      }
    }
    axios
      .post(APIURL() + `agent-company-information-upload-imgupdate`, formData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(false);
        setOpenCompanyModal(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const handleCompanyIamge = () => {
    history.push(APIPath() + "agent-setting/?company");
  };
  const handleProfileIamge = () => {
    history.push(APIPath() + "agent-setting/");
  };
  const saveImageset = () => {
    const checked_arr = [];
    const doc_lead_arr = [];
    const doc_name_arr = [];
    const doc_image_arr = [];
    const doc_pwd_arr = [];
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
    allAmenities.forEach((res) => {
      checked_arr.push(res);
    });
    setOpen(true);
    imagesetData["amenitiesId"] = checked_arr;
    imagesetData["leadcapture"] = doc_lead_arr;
    imagesetData["documentName"] = doc_name_arr;
    imagesetData["name"] = doc_image_arr;
    imagesetData["documentPassword"] = doc_pwd_arr;
    imagesetData.authenticate_key = "abcd123XYZ";
    imagesetData.agent_id = JSON.parse(context.state.user).agentId;
    imagesetData.picture = uploadedImages;
    imagesetData.video = uploadedVideos;
    imagesetData.panorama = uploadedPanorama;
    const formData = new FormData();
    for (let i in imagesetData) {
      if (i === "picture") {
        for (let file of imagesetData[i]) {
          formData.append("picture[]", file);
        }
      } else if (i === "panorama") {
        for (let file of imagesetData[i]) {
          formData.append("panorama[]", file);
        }
      } else if (i === "video") {
        for (let file of imagesetData[i]) {
          formData.append("video[]", file);
        }
      } else if (i === "amenitiesId") {
        for (let file of imagesetData[i]) {
          formData.append("amenitiesId[]", file);
        }
      } else if (i === "leadcapture") {
        for (let file of imagesetData[i]) {
          formData.append("leadcapture[]", file);
        }
      } else if (i === "documentName") {
        for (let file of imagesetData[i]) {
          formData.append("documentName[]", file);
        }
      } else if (i === "name") {
        for (let file of imagesetData[i]) {
          formData.append("name[]", file);
        }
      } else if (i === "documentPassword") {
        for (let file of imagesetData[i]) {
          formData.append("documentPassword[]", file);
        }
      } else {
        formData.append(i, imagesetData[i]);
      }
    }
    axios
      .post(APIURL() + `agent-save-imageset`, formData, {})
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          if (res.data[0].response.data.pictureAry.length > 0) {
            axios.post(
              APIURL() + `save-tour-picture`,
              {
                tourid: res.data[0].response.data.tourid,
                property: res.data[0].response.data.property,
                pictureAry: res.data[0].response.data.pictureAry,
              },
              {}
            );
          }
          if (res.data[0].response.data.panoramaImgAry.length > 0) {
            axios.post(
              APIURL() + `save-panarama-image`,
              {
                tourid: res.data[0].response.data.tourid,
                property: res.data[0].response.data.property,
                panoramaImgAry: res.data[0].response.data.panoramaImgAry,
                imagecapturedatepano:
                  res.data[0].response.data.imagecapturedatepano,
              },
              {}
            );
          }
          if (res.data[0].response.data.videoAry.length > 0) {
            axios.post(
              APIURL() + `save-tour-video`,
              {
                tourid: res.data[0].response.data.tourid,
                property: res.data[0].response.data.property,
                videoAry: res.data[0].response.data.videoAry,
                post: res.data[0].response.data.post,
              },
              {}
            );
          }
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setUploadedImages([]);
          setImagesetData(initialImagesetState);
          history.push(APIPath() + "agent-tour-list");
        } else {
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
  const goToImageSet = () => {
    history.push(APIPath() + "agent-image-sets");
  };

  return (
    <div>
      <Title title="Agent Dashboard" />
      <AgentHeader user={AgentType} />
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
                    <li>
                      <NavLink to={APIPath() + "agent-dashboard"}>
                        My Cafe
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={APIPath() + "agent-tour-list"}>
                        Tours
                      </NavLink>
                    </li>
                    <li>
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
        <div class="vtc_btm_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_btm_menu_sec">
                  <ul>
                    {creditData.linktype != "" && renderLinkText()} -{" "}
                    {creditData.linktype != "" && renderSubscriptionInfo()}
                    {renderAlaCarteInfo()}{" "}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="getting_started">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="getting_started_main">
                <div class="row">
                  <div class="col-lg-4 col-md-4">
                    <a href="#" data-toggle="modal" data-target="#get_start">
                      <div class="getting_started_single">
                        <div class="getting_started_single_img">
                          <i class="fas fa-paper-plane"></i>
                        </div>
                        <span class="no_sec">01</span>
                        <div class="getting_started_single_cont">
                          <h5>Getting Started</h5>
                          <h6>Get Some quick Tips</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <a href="javascript:void(0)">
                      <div
                        class="getting_started_single bg_blue"
                        id="showmenu"
                        onClick={showToggle}
                      >
                        <div class="getting_started_single_img">
                          <i class="fas fa-map-marked"></i>
                        </div>
                        <span class="no_sec">02</span>
                        <div class="getting_started_single_cont">
                          <h5>Your First Tour</h5>
                          <h6>EASY STEPS 1-2-3</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <Link to="agent-tour-list">
                      <div class="getting_started_single">
                        <div class="getting_started_single_img">
                          <i class="fas fa-cogs"></i>
                        </div>
                        <span class="no_sec">03</span>
                        <div class="getting_started_single_cont">
                          <h5>Advanced Users</h5>
                          <h6>MANAGE IMAGESETS</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="property_info toggle_sec" style={{ display: "none" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="our_partners_head">
                <h2>Property Information</h2>
              </div>
              <form id="msform">
                <ul id="progressbar">
                  <li class="active" id="account">
                    <i class="far fa-images"></i> Select Images
                  </li>
                  <li class={step > 1 ? "active" : ""} id="personal">
                    <i class="fas fa-pen"></i> Description
                  </li>
                  <li class={step > 2 ? "active" : ""} id="payment">
                    <i class="fas fa-globe"></i> Features
                  </li>
                  <li class={step > 3 ? "active" : ""} id="confirm">
                    <i class="fas fa-clipboard"></i> Amenities
                  </li>
                  <li class={step > 4 ? "active" : ""} id="pricing">
                    <i class="fas fa-dollar-sign"></i> Pricing
                  </li>
                  <li class={step > 5 ? "active" : ""} id="location">
                    <i class="fas fa-map-marker-alt"></i> Location Information
                  </li>
                  <li class={step > 6 ? "active" : ""} id="document">
                    <i class="fas fa-file-alt"></i> Documents/Forms
                  </li>
                </ul>
                <fieldset
                  id="firsttab"
                  className={
                    showImage ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Browse Images</h5>
                                </div>
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
                                          <i class="far fa-images"></i>Picture
                                        </a>
                                      </li>
                                      <li class="nav-item">
                                        <a
                                          class="nav-link"
                                          data-toggle="tab"
                                          href="#profile"
                                          role="tab"
                                        >
                                          <i class="fas fa-photo-video"></i>
                                          Videos
                                        </a>
                                      </li>
                                      <li class="nav-item">
                                        <a
                                          class="nav-link"
                                          data-toggle="tab"
                                          href="#messages"
                                          role="tab"
                                        >
                                          <i class="fas fa-camera-retro"></i>
                                          Panoramas
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="tab-content" id="">
                                    <div
                                      class="tab-pane active"
                                      id="home"
                                      role="tabpanel"
                                    >
                                      <h6 class="optimal_pic">
                                        Optimal picture size is 1075x768. Images
                                        should not be larger than 5mb file size
                                        and no smaller than 1075x768 or larger.
                                      </h6>
                                      <Dropzone
                                        accept="image/*"
                                        onDrop={(acceptedFiles) => {
                                          acceptedFiles.map((res) => {
                                            if (
                                              res.type == "image/jpeg" ||
                                              res.type == "image/jpg" ||
                                              res.type == "image/png"
                                            ) {
                                              setUploadedImages((oldArray) => [
                                                ...oldArray,
                                                res,
                                              ]);
                                            } else {
                                              setMessage("Accepts only images");
                                              setOpenError(true);
                                            }
                                          });
                                        }}
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          isDragActive,
                                        }) => (
                                          <div
                                            {...getRootProps({
                                              className: "dropzone",
                                            })}
                                          >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                              <p>Drop the files here ...</p>
                                            ) : (
                                              <p>
                                                Drag 'n' drop some files here,
                                                or click to select files
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </Dropzone>
                                      {uploadedImages.length > 0 && (
                                        <React.Fragment>
                                          <h4 style={{ marginTop: "20px" }}>
                                            Uploaded Files :
                                          </h4>
                                          <div class="row">
                                            {uploadedImages.map((res) => (
                                              <div class="col-lg-2 col-md-2">
                                                <img
                                                  style={{
                                                    height: "100px",
                                                    width: "100%",
                                                  }}
                                                  src={getImageFromUpload(res)}
                                                  alt="img"
                                                />
                                                <CancelIcon
                                                  onClick={() =>
                                                    handleImageRemove(res)
                                                  }
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
                                    </div>
                                    <div
                                      class="tab-pane"
                                      id="profile"
                                      role="tabpanel"
                                    >
                                      <h6 class="optimal_pic">
                                        Videos should be .mp4 file format and no
                                        larger than 50mb file size. Please be
                                        aware of MLS rules when adding videos
                                        with agent or broker branding and using
                                        MLS links as the videos will be
                                        included.<span class="close">X</span>
                                      </h6>
                                      <Dropzone
                                        onDrop={(acceptedFiles) => {
                                          acceptedFiles.map((res) => {
                                            if (res.type == "video/mp4") {
                                              setUploadedVideos((oldArray) => [
                                                ...oldArray,
                                                res,
                                              ]);
                                            } else {
                                              setMessage(
                                                "Please upload a valid mp4 file."
                                              );
                                              setOpenError(true);
                                            }
                                          });
                                        }}
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          isDragActive,
                                        }) => (
                                          <div
                                            {...getRootProps({
                                              className: "dropzone",
                                            })}
                                          >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                              <p>Drop the files here ...</p>
                                            ) : (
                                              <p>
                                                Drag 'n' drop some files here,
                                                or click to select files
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </Dropzone>
                                      {uploadedVideos.length > 0 && (
                                        <React.Fragment>
                                          <h4 style={{ marginTop: "20px" }}>
                                            Uploaded Files :
                                          </h4>
                                          <div class="row">
                                            {uploadedVideos.map(
                                              (res, index) => (
                                                <React.Fragment>
                                                  <h6
                                                    style={{
                                                      marginLeft: "20px",
                                                      color: "green",
                                                    }}
                                                  >
                                                    {index +
                                                      1 +
                                                      " : " +
                                                      res.name}
                                                  </h6>
                                                  <CancelIcon
                                                    onClick={() =>
                                                      handleVideoRemove(res)
                                                    }
                                                    style={{
                                                      marginTop: "-4px",
                                                      color: "red",
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                </React.Fragment>
                                              )
                                            )}
                                          </div>
                                        </React.Fragment>
                                      )}
                                    </div>
                                    <div
                                      class="tab-pane"
                                      id="messages"
                                      role="tabpanel"
                                    >
                                      <h6 class="optimal_pic">
                                        Panoramas should be full 360 degree
                                        panoramas and be no larger than 4096
                                        pixels wide.<span class="close">X</span>
                                      </h6>
                                      <Dropzone
                                        accept="image/*"
                                        onDrop={(acceptedFiles) => {
                                          console.log(acceptedFiles);
                                          acceptedFiles.map((res) => {
                                            if (
                                              res.type == "image/jpeg" ||
                                              res.type == "image/jpg" ||
                                              res.type == "image/png"
                                            ) {
                                              setUploadedPanorama(
                                                (oldArray) => [...oldArray, res]
                                              );
                                            } else {
                                              setMessage("Accepts only images");
                                              setOpenError(true);
                                            }
                                          });
                                        }}
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          isDragActive,
                                        }) => (
                                          <div
                                            {...getRootProps({
                                              className: "dropzone",
                                            })}
                                          >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                              <p>Drop the files here ...</p>
                                            ) : (
                                              <p>
                                                Drag 'n' drop some files here,
                                                or click to select files
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </Dropzone>
                                      {uploadedPanorama.length > 0 && (
                                        <React.Fragment>
                                          <h4 style={{ marginTop: "20px" }}>
                                            Uploaded Files :
                                          </h4>
                                          <div class="row">
                                            {uploadedPanorama.map((res) => (
                                              <div class="col-lg-2 col-md-2">
                                                <img
                                                  style={{
                                                    height: "100px",
                                                    width: "100%",
                                                  }}
                                                  src={getImageFromUpload(res)}
                                                  alt="img"
                                                />
                                                <CancelIcon
                                                  onClick={() =>
                                                    handlePanoramaRemove(res)
                                                  }
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goToDescription();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                                {/* <input type="button" name="next" class="next action-button" value="Next" onClick={goToDescription} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showDesc ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images1"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Description</h5>
                                </div>
                                <hr class="spacer30px" />
                                <div class="browse_img_conts_main text-left">
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Caption Title</label>
                                      <input
                                        type="text"
                                        name="caption"
                                        value={imagesetData.caption}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder="Caption"
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Widget Title</label>
                                      <input
                                        type="text"
                                        name="widget_title"
                                        value={imagesetData.widget_title}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder="Widget Title"
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-12 formset-input">
                                      <label>Description</label>
                                      <textarea
                                        class="form-control"
                                        name="description"
                                        value={imagesetData.description}
                                        onChange={handleInputChange}
                                        placeholder=""
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToImage();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goToFeature();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showFeature ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images2"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Features</h5>
                                </div>
                                <hr class="spacer30px" />
                                <div class="browse_img_conts_main text-left">
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Bedrooms</label>
                                      <input
                                        type="text"
                                        name="totalbedrooms"
                                        value={imagesetData.totalbedrooms}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Bathrooms</label>
                                      <input
                                        type="text"
                                        name="totalbathrooms"
                                        value={imagesetData.totalbathrooms}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Parking Space</label>
                                      <input
                                        type="text"
                                        name="parkingspaces"
                                        value={imagesetData.parkingspaces}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Year Built</label>
                                      <input
                                        type="text"
                                        name="yearbuilt"
                                        value={imagesetData.yearbuilt}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Subdivision</label>
                                      <input
                                        type="text"
                                        name="subdivision"
                                        value={imagesetData.subdivision}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Lot Size</label>
                                      <input
                                        type="text"
                                        name="lotsize"
                                        value={imagesetData.lotsize}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Garage Size</label>
                                      <input
                                        type="text"
                                        name="garagesize"
                                        value={imagesetData.garagesize}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>School District</label>
                                      <input
                                        type="text"
                                        name="schooldistrict"
                                        value={imagesetData.schooldistrict}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Square Footage</label>
                                      <input
                                        type="text"
                                        name="sqfootage"
                                        value={imagesetData.sqfootage}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>#MLS</label>
                                      <input
                                        type="text"
                                        name="mls"
                                        value={imagesetData.mls}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToDesc();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goToAmenities();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showAmenities ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Amenities</h5>
                                </div>
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
                                          <i class="fas fa-blender-phone"></i>
                                          Appliances
                                        </a>
                                      </li>
                                      <li class="nav-item">
                                        <a
                                          class="nav-link"
                                          data-toggle="tab"
                                          href="#Interior"
                                          role="tab"
                                        >
                                          <i class="fab fa-intercom"></i>
                                          Interior Amenities
                                        </a>
                                      </li>
                                      <li class="nav-item">
                                        <a
                                          class="nav-link"
                                          data-toggle="tab"
                                          href="#Exterior"
                                          role="tab"
                                        >
                                          <i class="fas fa-campground"></i>
                                          Exterior Amenities
                                        </a>
                                      </li>
                                      <li class="nav-item">
                                        <a
                                          class="nav-link"
                                          data-toggle="tab"
                                          href="#Community"
                                          role="tab"
                                        >
                                          <i class="fas fa-users"></i>Community
                                          Amenities
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
                                        {appliancesAmenities &&
                                        appliancesAmenities.length > 0
                                          ? appliancesAmenities.map((res) => (
                                              <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                  <div class="switchToggle custom-control custom-switch">
                                                    <Switch
                                                      onChange={(event) => {
                                                        handleChange(
                                                          event,
                                                          res
                                                        );
                                                      }}
                                                      checked={
                                                        res.countamenity === 1
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                  <p
                                                    style={{
                                                      marginLeft: "20px",
                                                    }}
                                                  >
                                                    {res.amenityname}
                                                  </p>
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </div>
                                    <div
                                      class="tab-pane"
                                      id="Interior"
                                      role="tabpanel"
                                    >
                                      <div class="agent_pop_main_head padd_top">
                                        <h5>Interior Amenities</h5>
                                      </div>
                                      <div class="mar_top row">
                                        {interiorAmenities &&
                                        interiorAmenities.length > 0
                                          ? interiorAmenities.map((res) => (
                                              <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                  {/* <p>{res.amenityname}</p> */}
                                                  <div class="switchToggle custom-control custom-switch">
                                                    <Switch
                                                      onChange={(event) => {
                                                        handleInteriorChange(
                                                          event,
                                                          res
                                                        );
                                                      }}
                                                      checked={
                                                        res.countamenity === 1
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                  <p
                                                    style={{
                                                      marginLeft: "20px",
                                                    }}
                                                  >
                                                    {res.amenityname}
                                                  </p>
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </div>
                                    <div
                                      class="tab-pane"
                                      id="Exterior"
                                      role="tabpanel"
                                    >
                                      <div class="agent_pop_main_head padd_top">
                                        <h5>Exterior Amenities</h5>
                                      </div>

                                      <div class="mar_top row">
                                        {Object.keys(exteriorAmenities).length >
                                        0
                                          ? exteriorAmenities.map((res) => (
                                              <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                  {/* <p>{res.amenityname}</p> */}
                                                  <div class="switchToggle custom-control custom-switch">
                                                    <Switch
                                                      onChange={(event) => {
                                                        handleExteriorChange(
                                                          event,
                                                          res
                                                        );
                                                      }}
                                                      checked={
                                                        res.countamenity === 1
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                  <p
                                                    style={{
                                                      marginLeft: "20px",
                                                    }}
                                                  >
                                                    {res.amenityname}
                                                  </p>
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </div>
                                    <div
                                      class="tab-pane"
                                      id="Community"
                                      role="tabpanel"
                                    >
                                      <div class="agent_pop_main_head padd_top">
                                        <h5>Community Amenities</h5>
                                      </div>
                                      <div class="mar_top row">
                                        {Object.keys(communityAmenities)
                                          .length > 0
                                          ? communityAmenities.map((res) => (
                                              <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                  {/* <p>{res.amenityname}</p> */}
                                                  <div class="switchToggle custom-control custom-switch">
                                                    <Switch
                                                      onChange={(event) => {
                                                        handleCommunityChange(
                                                          event,
                                                          res
                                                        );
                                                      }}
                                                      checked={
                                                        res.countamenity === 1
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
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
                                                  <p
                                                    style={{
                                                      marginLeft: "20px",
                                                    }}
                                                  >
                                                    {res.amenityname}
                                                  </p>
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToFeature();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goToPricing();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showPricing ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images2"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Pricing</h5>
                                </div>
                                <hr class="spacer30px" />
                                <div class="browse_img_conts_main text-left">
                                  <div class="row">
                                    <div class="col-md-3 formset-input formbox1select">
                                      <label>Price</label>
                                      <select
                                        class="form-control formbox1select"
                                        name="pricetype"
                                        value={imagesetData.prpricetypeice}
                                        onChange={handleInputChange}
                                      >
                                        <option>USD</option>
                                        <option>CAD</option>
                                        <option>EUR</option>
                                      </select>
                                    </div>
                                    <div class="col-md-3 formset-input">
                                      <input
                                        type="text"
                                        name="price"
                                        value={imagesetData.price}
                                        onChange={handleNumberChange}
                                        class="form-control"
                                        placeholder=""
                                        style={{ marginTop: "26px" }}
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input formbox1select">
                                      <label>Flexibility</label>
                                      <select
                                        class="form-control formbox1select"
                                        name="priceflexibility"
                                        value={imagesetData.priceflexibility}
                                        onChange={handleInputChange}
                                      >
                                        <option>Select Option</option>
                                        <option value="Firm">Firm</option>
                                        <option value="Negotiable">
                                          Negotiable
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-12 formset-input">
                                      <label>
                                        Additional Price Information
                                      </label>
                                      <textarea
                                        name="priceinfo"
                                        value={imagesetData.priceinfo}
                                        onChange={handleInputChange}
                                        class="form-control"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToAmenities();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goTolocation();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showLocation ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images2"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Location</h5>
                                </div>
                                <hr class="spacer30px" />
                                <div class="browse_img_conts_main text-left">
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Address</label>
                                      <input
                                        type="text"
                                        name="address"
                                        value={imagesetData.address}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input formbox1select">
                                      <label>Property Type</label>
                                      <select
                                        class="form-control formbox1select"
                                        name="typeid"
                                        value={imagesetData.typeid}
                                        onChange={handleInputChange}
                                      >
                                        <option value="1">
                                          Single Family Home
                                        </option>
                                        <option value="2" class="">
                                          Condo
                                        </option>
                                        <option value="3" class="">
                                          Townhouse
                                        </option>
                                        <option value="4" class="">
                                          Coop
                                        </option>
                                        <option value="5" class="">
                                          Apartment
                                        </option>
                                        <option value="6" class="active in">
                                          Loft
                                        </option>
                                        <option value="7">
                                          Mobile/Manufactured
                                        </option>
                                        <option value="8">Farm/Ranch</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input formbox1select">
                                      <label>Status</label>
                                      <select
                                        class="form-control formbox1select"
                                        id="Tours_categoryid"
                                        name="categoryid"
                                        value={imagesetData.categoryid}
                                        onChange={handleInputChange}
                                      >
                                        <option value="1">For Sale</option>
                                        <option value="2" class="">
                                          For Rent
                                        </option>
                                        <option value="3" class="">
                                          Sold
                                        </option>
                                        <option value="4" class="">
                                          Contingent
                                        </option>
                                        <option value="5" class="">
                                          Pending
                                        </option>
                                        <option value="6" class="active in">
                                          Withdrawn
                                        </option>
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
                                    <div class="col-md-6 formset-input formbox1select">
                                      <label>Country</label>
                                      <select
                                        name="countryid"
                                        value={imagesetData.countryid}
                                        onChange={handleInputChange}
                                        class="form-control formbox1select"
                                      >
                                        <option value="0">
                                          Select Country
                                        </option>
                                        {allCountries.map((res) => (
                                          <option value={res.id}>
                                            {res.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input formbox1select">
                                      <label>State</label>
                                      <select
                                        name="stateid"
                                        value={imagesetData.stateid}
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
                                    <div class="col-md-6 formset-input">
                                      <label>City</label>
                                      <input
                                        type="text"
                                        name="city"
                                        value={imagesetData.city}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Zip Code</label>
                                      <input
                                        type="text"
                                        name="zipcode"
                                        value={imagesetData.zipcode}
                                        onChange={handleNumberChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Neighbourhood</label>
                                      <input
                                        type="text"
                                        name="neighbourhood"
                                        value={imagesetData.neighbourhood}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Latitude</label>
                                      <input
                                        type="text"
                                        name="latitude"
                                        value={imagesetData.latitude}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div class="col-md-6 formset-input">
                                      <label>Longitude</label>
                                      <input
                                        type="text"
                                        name="longitude"
                                        value={imagesetData.longitude}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6 formset-input">
                                      <label>Area Schools link</label>
                                      <input
                                        type="text"
                                        name="areaschoolslink"
                                        value={imagesetData.areaschoolslink}
                                        onChange={handleInputChange}
                                        class="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToPricing();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goToDocuments();
                                  }}
                                >
                                  Next <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset
                  className={
                    showDocuments ? classes.active_panel : classes.hide_panel
                  }
                >
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="questiontab-formbox">
                          <div class="row">
                            <div class="col-xl-12">
                              <div
                                class="browse_img tab-pane active"
                                id="Images2"
                                role="tabpanel"
                              >
                                <div class="browse_img_head">
                                  <h5>Documents</h5>
                                </div>
                                <hr class="spacer30px" />
                                <div class="browse_img_conts_main text-left">
                                  {totalDivs.map((res, index) => (
                                    <div class="row">
                                      <div class="col-md-2 formbox1">
                                        <label style={{ marginRight: "15px" }}>
                                          LEAD CAPTURE
                                          <span
                                            style={{ color: "#ffa12d" }}
                                          ></span>
                                        </label>
                                        <Switch
                                          onChange={(event) =>
                                            handleLeadChange(event, index)
                                          }
                                          checked={
                                            documentLeadData[
                                              "leadcapture" + index
                                            ]
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
                                          <span
                                            style={{ color: "#ffa12d" }}
                                          ></span>
                                        </label>
                                        <input
                                          type="text"
                                          name={"documentName" + index}
                                          value={
                                            documentNameData[
                                              "documentName" + index
                                            ]
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
                                          <span
                                            style={{ color: "#ffa12d" }}
                                          ></span>
                                        </label>
                                        <input
                                          type="file"
                                          accept="/*"
                                          onChange={(evt) =>
                                            handleDocImageChange(evt, index)
                                          }
                                        />
                                      </div>
                                      <div class="col-md-2 formbox1">
                                        <label>
                                          Password{" "}
                                          <span
                                            style={{ color: "#ffa12d" }}
                                          ></span>
                                        </label>
                                        <input
                                          type="text"
                                          name={"documentPassword" + index}
                                          value={
                                            documentNameData[
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
                                        {index === 0 && (
                                          <Button
                                            style={{ marginTop: "25px" }}
                                            onClick={() => addNewDiv()}
                                            startIcon={<AddIcon />}
                                            variant="contained"
                                            color="primary"
                                          >
                                            Add
                                          </Button>
                                        )}
                                        {index > 0 && (
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
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div class="btn-question">
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    goBackToLocation();
                                  }}
                                  style={{ margin: "0 20px 0 0" }}
                                >
                                  {" "}
                                  <i
                                    style={{
                                      marginRight: "20px",
                                      marginLeft: "0",
                                    }}
                                    class="fas fa-arrow-left"
                                  ></i>
                                  back
                                </a>
                                <a
                                  class="let_start"
                                  onClick={() => {
                                    saveImageset();
                                  }}
                                >
                                  Final Submit{" "}
                                  <i class="fas fa-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="vtc_agent_profile">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="vtc_agent_profile_main">
                <div class="row">
                  <div class="col-lg-3 col-md-12">
                    <div class="card-box-design-profile">
                      <div class="vtc_agent_profile_left_img">
                        {Object.keys(dashboardData).length > 0 ? (
                          <React.Fragment>
                            <Link to={APIPath() + "agent-setting"}>
                              <img
                                src={dashboardData.profile_img}
                                alt=""
                                style={{ height: "90px", width: "100%" }}
                              />
                            </Link>
                            <a
                              onClick={() => {
                                setOpenProfileModal(true);
                              }}
                            >
                              <i class="fas fa-camera-alt"></i>
                            </a>
                            {/* <CameraAltIcon onClick={() => { setOpenProfileModal(true) }} style={{ marginTop: "-50px", background: "#fff", cursor: "pointer" }} /> */}
                          </React.Fragment>
                        ) : (
                          <Skeleton variant="text" width={250} height={70} />
                        )}
                      </div>
                      <div class="vtc_agent_profile_left_cont">
                        <h3>
                          {Object.keys(dashboardData).length > 0 ? (
                            dashboardData.name
                          ) : (
                            <Skeleton variant="text" width={250} height={70} />
                          )}
                        </h3>
                        <ul class="agent_docs">
                          {Object.keys(dashboardData).length > 0 ? (
                            dashboardData.mobile !== "" &&
                            dashboardData.mobile !== null && (
                              <React.Fragment>
                                <i class="fas fa-phone-alt"></i>
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    color: "#252525",
                                  }}
                                >
                                  {dashboardData.mobile}
                                </span>
                              </React.Fragment>
                            )
                          ) : (
                            <Skeleton variant="text" width={150} height={20} />
                          )}
                          <li style={{ fontSize: "12px" }}>
                            <i class="far fa-envelope"></i>
                            {Object.keys(dashboardData).length > 0 ? (
                              dashboardData.email
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={20}
                              />
                            )}
                          </li>
                        </ul>
                      </div>
                      <div class="agent-code">
                        <span>
                          <i class="far fa-id-card"></i>&nbsp;#
                          {dashboardData?.licenceno}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                    <div class="vtc_agent_profile_left">
                      <div class="vtc_agent_profile_left_cont">
                        <h3>About</h3>

                        {Object.keys(dashboardData).length > 0 ? (
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: dashboardData.profile_content,
                            }}
                          ></div>
                        ) : (
                          <Skeleton
                            variant="text"
                            width={550}
                            height={175}
                            style={{ background: "#bbbbbb", margin: "0 auto" }}
                          />
                        )}
                        {currentUser.mail_verification_status === 0 && (
                          <React.Fragment>
                            <h6>
                              Your Email is not verified .Please click here to
                              verify
                            </h6>
                            <button
                              type="button"
                              class="next_btn"
                              onClick={verifyAccount}
                            >
                              Verify Account
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-12">
                    <div class="vtc_agent_profile_right">
                      {Object.keys(currentUser).length > 0 ? (
                        <React.Fragment>
                          <img
                            src={currentUser.company_details.companylogo}
                            alt=""
                            title=""
                            style={{ height: "140px", cursor: "pointer" }}
                            onClick={handleCompanyIamge}
                          />
                          {/* <CameraAltIcon onClick={() => { setOpenCompanyModal(true) }} style={{ marginTop: "-66px", background: "#e8e6e6", cursor: "pointer" }} /> */}
                        </React.Fragment>
                      ) : (
                        <Skeleton variant="text" height={70} />
                      )}
                      <div class="right_prof_cont">
                        <h5>
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.company_details.company
                          ) : (
                            <Skeleton variant="text" width={50} height={20} />
                          )}
                        </h5>
                        <h6>
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.company_details.officephone
                          ) : (
                            <Skeleton variant="text" width={50} height={20} />
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="virtual_stagging">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="virtual_stagging_main">
                {Object.keys(dashboardData).length > 0 ? (
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: dashboardData.mycafemessage,
                    }}
                  ></div>
                ) : (
                  <Skeleton
                    variant="text"
                    width={550}
                    height={175}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
                {/* <p>NEW!!!  EZ-FlashCard Videos!  SQUARE, SHORT, FAST videos optimized for social media!  Go to the Videos Tab, then select your video and click on EZ-FlashCard to create your EZ-FlashCard "SQUARE" Videos for social media!!!</p>
                                <p style={{ margin: "0 0 10px 0" }}>NEED VIRTUAL STAGING?</p>
                                <p>Turn cold, empty rooms into warm, inviting spaces using virtual staging!  We can also remove old furniture and replace with new!  Virtual Staging Just $32/photo</p>
                                <p>Using Your Own Photos?  Let us process or photo enhance your photos and make them much, much more professional for just $2/each!!</p>
                                <p>Goto <a href="#"> www.RealEZPhotoFix.com</a></p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="most_view">
        <div class="">
          <div class="">
            <div class="">
              {Object.keys(mostViewedData).length > 0 &&
              mostViewedData.tour.tour_image !== "" ? (
                <div class="our_partners_head">
                  <h2>Your Most Viewed</h2>
                </div>
              ) : (
                ""
              )}
              <div class="recent_projects_tabs">
                <div class="tab_img">
                  <div class="row">
                    <div class="col-lg-4 col-md-4">
                      {Object.keys(mostViewedData).length > 0 &&
                      mostViewedData.tour.tour_image !== "" ? (
                        <a
                          href={`/tour/${mostViewedData.tour.tour_id}`}
                          target="_blank"
                        >
                          <div class="recent_projects_tabs_img">
                            <img
                              src={mostViewedData.tour.tour_image}
                              alt=""
                              title=""
                            />
                            <div class="recent_projects_tabs_img_conts">
                              <a>
                                <div class="recent_projects_tabs_img_conts_inner">
                                  <span class="link_icn">
                                    <i class="fas fa-link"></i>
                                  </span>
                                  <h4>{mostViewedData.tour.caption}</h4>
                                  <h5>{`${mostViewedData.tour.city},${mostViewedData.tour.statename},${mostViewedData.tour.countryname},${mostViewedData.tour.zipcode}`}</h5>
                                </div>
                              </a>
                            </div>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="col-lg-4 col-md-4">
                      {Object.keys(mostViewedData).length > 0 &&
                      mostViewedData.flyer.flyer_image !== "" ? (
                        <a
                          href={`/site/flyer/${mostViewedData.flyer.flyer_id}`}
                          target="_blank"
                        >
                          <div class="recent_projects_tabs_img">
                            <img
                              src={mostViewedData.flyer.flyer_image}
                              alt=""
                              title=""
                            />
                            <div class="recent_projects_tabs_img_conts">
                              <a>
                                <div class="recent_projects_tabs_img_conts_inner">
                                  <span class="link_icn">
                                    <i class="fas fa-link"></i>
                                  </span>
                                  <h4>{mostViewedData.flyer.caption}</h4>
                                  <h5>{`${mostViewedData.flyer.city},${mostViewedData.flyer.statename},${mostViewedData.flyer.countryname},${mostViewedData.flyer.zipcode}`}</h5>
                                </div>
                              </a>
                            </div>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="col-lg-4 col-md-4">
                      {Object.keys(mostViewedData).length > 0 &&
                      mostViewedData.video.video_image !== "" ? (
                        <a
                          href={`/agent-edit-video/${mostViewedData.video.video_id}`}
                          target="_blank"
                        >
                          <div class="recent_projects_tabs_img">
                            <img
                              src={mostViewedData.video.video_image}
                              alt=""
                              title=""
                            />
                            <div class="recent_projects_tabs_img_conts">
                              <a>
                                <div class="recent_projects_tabs_img_conts_inner">
                                  <span class="link_icn">
                                    <i class="fas fa-link"></i>
                                  </span>
                                  <h4>{mostViewedData.video.caption}</h4>
                                  <h5>{`${mostViewedData.video.city},${mostViewedData.video.statename},${mostViewedData.video.countryname},${mostViewedData.video.zipcode}`}</h5>
                                </div>
                              </a>
                            </div>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="top_ten_tour">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              {top10Tours.length > 0 ? (
                <React.Fragment>
                  <div class="our_partners_head">
                    <h2>Your Top Ten Tours</h2>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={options} />
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <div class="agent_pop">
        <div id="get_start" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  <i class="fab fa-telegram-plane"></i> Getting Started
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_pop_main_head">
                    <h5>Welcome to VirtualTourCafe!</h5>
                  </div>
                  <div class="wlcm_sec">
                    <p>
                      To help you get started, please download the documents
                      below so you have them available when working on your
                      tours. Next, watch our short{" "}
                      <span>"Getting Started Video"</span> which will take you
                      step-by-step through the process of creating your first
                      tour and distributing it to the world!
                    </p>
                    <p>
                      And remember, we offer unlimited personal training so
                      don't hesitate to contact us if you have any questions or
                      need any help.
                    </p>
                    <p>
                      <strong>Call Toll Free :</strong> 877-744-8285
                    </p>
                    <p>
                      <strong>Email Us :</strong> support@virtualtourcafe.com
                    </p>
                    <a
                      href="https://virtualtourcafe.zendesk.com/hc/en-us"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button type="button" class="next_btn">
                        Help Center
                      </button>
                    </a>

                    <p class="padd_top">
                      Click <span>"PLAY"</span> to watch our short Getting
                      Started Video
                    </p>
                    <div class="wlcm_video_sec">
                      <video width="100%" height="350" controls autoplay>
                        <source
                          src="https://virtualtourcafe.com/videos/VTC_Getting_Started_Video_2017.mp4"
                          type=""
                        />
                      </video>
                    </div>
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
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openProfileModal}
      >
        <DialogTitle id="customized-dialog-title">
          Upload Profile Picture
          <CancelIcon
            onClick={() => setOpenProfileModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="row">
            <div class="col-md-12">
              <ImageUploader
                withIcon={true}
                buttonText="Select Profile Picture"
                onChange={handleLogoChange}
                imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
                maxFileSize={2097152}
                withPreview={true}
                ref={mediainputRef}
                label="Max file size: 2mb,accepted: jpg|png|gif"
              />
            </div>
            <div class="col-md-12">
              <button
                style={{ float: "right" }}
                class="need_pic"
                onClick={() => saveProfilePictures()}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openCompanyeModal}
      >
        <DialogTitle id="customized-dialog-title">
          Upload Company Logo
          <CancelIcon
            onClick={() => setOpenCompanyModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="row">
            <div class="col-md-12">
              <ImageUploader
                withIcon={true}
                buttonText="Select Company Logo"
                onChange={handleCompanyChange}
                imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
                maxFileSize={2097152}
                withPreview={true}
                ref={mediainputRef}
                label="Max file size: 2mb,accepted: jpg|png|gif"
              />
            </div>
            <div class="col-md-12">
              <button
                style={{ float: "right" }}
                class="need_pic"
                onClick={() => saveCompanyPictures()}
              >
                Submit
              </button>
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
    </div>
  );
}
