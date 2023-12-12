/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Recorder } from "react-voice-recorder";
import $ from "jquery";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Backdrop from "@material-ui/core/Backdrop";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CircularProgress from "@material-ui/core/CircularProgress";
import up_img from "../../../images/up.png";
import middle_img from "../../../images/middle.png";
import bottom_img from "../../../images/bottom.png";
import CancelIcon from "@material-ui/icons/Cancel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Dropzone from "react-dropzone";
import { confirmAlert } from "react-confirm-alert";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import { useParams } from "react-router-dom";
import DragAndDrop from "./DragAndDrop";
const APITourService = APIURL() + "tourservicelink";

const APIGetUserData = APIURL() + "user-details";
const APIGetAmenities = APIURL() + "get-amenities";
const APIGetProperty = APIURL() + "edit-property";
const APIUpdateProperty = APIURL() + "update-property-info";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APISaveAmenities = APIURL() + "save-amenities";
const APIRemoveAmenities = APIURL() + "remove-amenities";
const APIUpdateAmenity = APIURL() + "update-amenity";
const APISaveNewsLetter = APIURL() + "add-newsLetter";
const APILoadMenu = APIURL() + "load-menuoption";
const APIGetAnnouncement = APIURL() + "load-announcement";
const APIUpdateMenu = APIURL() + "update-menu";
const APISaveAnnouncement = APIURL() + "save-announcement";
const APIUpdateAnnouncement = APIURL() + "announcement";
const APIDeleteAnnouncement = APIURL() + "delete-announcement";
const APIGetEditTourList = APIURL() + "tour-list";
const APIGetTourDetails = APIURL() + "tour-details";
const APIChangeService = APIURL() + "change-tour-service";
const APIUpdateTour = APIURL() + "update-tour";
const APIGetBgMusic = APIURL() + "back-ground-music";
const APIUpdateBgMusic = APIURL() + "update-music";
const APIGetImageEditor = APIURL() + "load-image-editor";
const APIUpdateImageset = APIURL() + "image-adjustment-editimageset";
const APISaveYoutubeLinks = APIURL() + "save-youtube-links";
const APISaveWalkThrough = APIURL() + "save-walk-through";
const APIGetOfferedBanners = APIURL() + "get-flyerheader-details";
const APISaveCompanyBanner = APIURL() + "save-company-banner";
const APIDeleteTourImage = APIURL() + "delete-tour-image";
const APIGetCoAgentInfo = APIURL() + "coagent-info";
const APIAddCoAgent = APIURL() + "add-coagent";
const APIDeleteCoAgent = APIURL() + "delete-coagent";
const APIDeleteAgentImage = APIURL() + "delete-tour-image";
const APIGetThemes = APIURL() + "get-themes";
const APIUpdateThemes = APIURL() + "update-themes";
const APIUpdateAudio = APIURL() + "add-AudioFile";
const APIGetTourAudio = APIURL() + "get-AudioFile";
const APISaveDistributSetting = APIURL() + "get-SaveDistributeSettings";
const APIDistributeTour = APIURL() + "distribute-tour";
const APIGetDocumentDatas = APIURL() + "edit-property";
const APIDeleteDocument = APIURL() + "delete-document";
const APIDeleteMulitple = APIURL() + "delete-multiple-image";
const APIUpdateOrder = APIURL() + "change-order";
const APIcropImage = APIURL() + "save-cropper-image-tour";
const APIDeleteImage = APIURL() + "delete-image-editimageset";
const APIOtherMail = APIURL() + "other-link-send-email";
const APIServiceMail = APIURL() + "tour-send-mail";
const APIAgentTrafficOption = APIURL() + "agent-update-traffic";
const APIOtherLink = APIURL() + "tourotherlink";
const APIGetNewsLetter = APIURL() + "get-newsletter";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
const AgentEditTour = React.memo((props) => {
  const params = useParams();
  const tour_id = params.tourid;
  const imageset_id = params.tourid;
  const setGlobalLoading = props.setLoading;
  const setGlobalOpenPopUp = props.setOpenPopUp;
  const setGlobalMessage = props.setMessage;
  const setGlobalAlertType = props.setAlertType;
  const classes = useStyles();
  const initialMusicState = {
    musicid: "",
  };

  const initialAnnouncementState = {
    authenticate_key: "abcd123XYZ",
    agent_id: "",
    tourid: tour_id,
    fromtime_h: new Date(),
    totime_h: new Date(),
    announcedate: new Date(),
  };
  const initialVoiceData = {
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  };
  const initialNewsLetterData = {
    text: "",
  };
  const initialWalkthroughData = {
    code1: "",
    code2: "",
    caption2: "",
    caption1: "",
  };
  let history = useHistory();
  const context = useContext(AuthContext);
  const initialTrafficState = {
    reportrecipients: "",
    emailtrafficreport: "",
  };
  const [currentUser, setCurrentUser] = useState({});
  const [sync, setSync] = useState(true);
  const [musicData, setMusicData] = useState(initialMusicState);
  const [music, setMusic] = useState("");
  const [allAmenities, setAllAmenities] = useState({});
  const [appliancesAmenities, setAppliancesAmenities] = useState([]);
  const [communityAmenities, setCommunityAmenities] = useState([]);
  const [interiorAmenities, setInteriorAmenities] = useState([]);
  const [exteriorAmenities, setExteriorAmenities] = useState([]);
  const [openAmenityModal, setOpenAmenityModal] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [propertyData, setPropertyData] = useState({});
  const [message, setMessage] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [amenityData, setAmenityData] = useState({});
  const [newsLetterData, setNewsLetterData] = useState({
    initialNewsLetterData,
  });
  const [contactMenuData, setContactMenuData] = useState([]);
  const [detailMenuData, setDetailMenuData] = useState([]);
  const [shareMenuData, setShareMenuData] = useState([]);
  const [toolsMenuData, setToolsMenuData] = useState([]);
  const [viewerMenuData, setViewerMenuData] = useState([]);
  const [checkdMenu, setCheckedMenu] = useState([]);
  const [allMenuData, setAllMenuData] = useState([]);
  const [menuOrders, setMenuOrders] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  const [firstOrder, setFirstOrder] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [announcementData, setAnnouncementData] = useState(
    initialAnnouncementState
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedFrom, setSelectedFrom] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedTo, setSelectedTo] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const selectOrRemove = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages((selectedImages) =>
        selectedImages.filter((image) => image != id)
      );
    } else setSelectedImages((selectedImages) => [...selectedImages, id]);
  };

  const [editing, setEditing] = useState(false);
  const [tourList, setTourList] = useState([]);
  const [imageId, setImageId] = useState("");
  const [videoSelected, setVideoSelected] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [element, setElement] = useState("");
  const [currentTourData, setCurrentTourData] = useState([]);
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
  const [openFloorModal, setOpenFloorModal] = useState(false);
  const [currentMusic, setCurrentMusic] = useState({});

  const [editImageData, setEditImageData] = useState({});
  const [rotatevalue, setRotateValue] = useState(0);
  const [openYoutubeModal, setOpenYoutubeModal] = useState(false);
  const [youtubeLinkData, setYoutubeLinkData] = useState({});
  const [openWalkthroughModal, setOpenWalkThroughModal] = useState(false);
  const [walkthroughData, setWalkthroughData] = useState(
    initialWalkthroughData
  );
  const [openCompanyBanner, setOpenCompanyBanner] = useState(false);
  const [allBanners, setAllBanners] = useState([]);
  const [defaultBanner, setDefaultBanner] = useState("");
  const [headerImageId, setHeaderImageId] = useState("");
  const [customBannerImg, setCustomBannerImg] = useState("");
  const [offeredBannerImg, setOfferedBannerImg] = useState("");
  const [bannerData, setBannerData] = useState({});
  const [agentData, setAgentData] = useState({});
  const [agentPhoto, setAgentPhoto] = useState({});
  const [openNarrationModal, setOpenNarrationModal] = useState(false);
  const [openChangeOrderModal, setOpenChangeOrderModal] = useState(false);
  const [value, setValue] = useState(initialVoiceData);
  const [allThemes, setAllThemes] = useState({});
  const [currentAudio, setCurrentAudio] = useState("");
  const [narrationData, setNarrationData] = useState({});
  const [offset, setOffset] = useState(1);
  const [postPerPage] = useState(6);
  const [totalData, setTotalData] = useState([]);
  const [same, setSame] = useState(false);
  const [allData, setAllData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [themeId, setThemeId] = useState("");
  const [defaultsThemeId, setDefaultsThemeId] = useState("");
  const [isPremium, setIsPremium] = useState("");
  const [distributeData, setDistributeData] = useState({});
  const [documentData, setDocumentData] = useState([]);
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [totalDivs, setTotalDivs] = useState([]);
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
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [fileName, setFilename] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newImageData, setNewImageData] = useState({});
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [newVideoData, setNewVideoData] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [currentImagesetData, setCurrentImagesetData] = useState({});
  const [otherLink, setOtherLink] = useState({});
  const [serviceLinks, setServiceLinks] = useState({});
  const [openTrafficModal, setOpenTrafficModal] = useState(false);
  const [trafficData, setTrafficData] = useState(initialTrafficState);
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user)?.agentId,
        tourId: tour_id,
      };
      postRecord(APIOtherLink, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setOtherLink(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, tour_id]);
  useEffect(() => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user)?.agentId,
      tourId: tour_id,
    };
    postRecord(APITourService, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setServiceLinks(res.data[0].response.data);
        } else {
          //setSync(false);
        }
        //setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
      });
  }, [context.state.user, tour_id]);
  useEffect(() => {
    if (!propertyData.widgetcaption || propertyData.widgetcaption == "")
      setPropertyData({ ...propertyData, widgetcaption: propertyData.caption });
  }, [propertyData.caption, propertyData.widgetcaption]);
  useEffect(() => {
    if ($) {
      $(".gee_cross").hide();
      $(".gee_menu").hide();
    }
  }, [$]);
  const ShowMenu = () => {
    if ($) {
      $(".gee_menu").slideToggle("slow", function () {
        $(".gee_hamburger").hide();
        $(".gee_cross").show();
      });
    }
  };
  const HideMenu = () => {
    if ($) {
      $(".gee_menu").slideToggle("slow", function () {
        $(".gee_cross").hide();
        $(".gee_hamburger").show();
      });
    }
  };
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
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
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
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-background-music`, obj)
        .then((res) => {
          setMusicData(res.data[0].response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
      };
      postRecord(APIGetAmenities, objusr).then((res) => {
        setAllAmenities(res.data[0].response.data);
        setAppliancesAmenities(res.data[0].response.data.appliances);
        setCommunityAmenities(res.data[0].response.data.community);
        setInteriorAmenities(res.data[0].response.data.interior);
        setExteriorAmenities(res.data[0].response.data.exterior);
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
        type: "imageset",
      };
      postRecord(APIGetProperty, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setPropertyData(res.data[0].response.data.toData);
        }
      });
    }
  }, [sync, context.state.user, tour_id]);
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
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      axios
        .post(APIURL() + `load-menuoption`, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setContactMenuData([]);
            setDetailMenuData([]);
            setShareMenuData([]);
            setToolsMenuData([]);
            setViewerMenuData([]);
            setAllMenuData(res.data[0].response.data);
            const cont_data = res.data[0].response.data.option.contact;
            const detail_data = res.data[0].response.data.option.detail;
            const share_data = res.data[0].response.data.option.share;
            const tools_data = res.data[0].response.data.option.tools;
            const viewer_data = res.data[0].response.data.option.viewer;
            var obj = [
              {
                name: "Virtual Tour",
                order: res.data[0].response.data.tourtaborder.virtualshow,
              },
              {
                name: "Youtube",
                order: res.data[0].response.data.tourtaborder.videos,
              },
              {
                name: "Gallery",
                order: res.data[0].response.data.tourtaborder.theatre,
              },
              {
                name: "Floor Plans",
                order: res.data[0].response.data.tourtaborder.floorplans,
              },
            ];
            setMenuOrders(obj.sort((a, b) => (a.order > b.order ? 1 : -1)));
            for (var i = 0; i < cont_data.id.length; i++) {
              const obj = {
                id: cont_data.id[i],
                name: cont_data.text[i],
                status: cont_data.status[i],
              };
              setContactMenuData((prevArray) => [...prevArray, obj]);
              if (cont_data.status[i] === 1) {
                setCheckedMenu((checkdMenu) => [
                  ...checkdMenu,
                  cont_data.id[i],
                ]);
              }
            }
            for (var j = 0; j < detail_data.id.length; j++) {
              const obj = {
                id: detail_data.id[j],
                name: detail_data.text[j],
                status: detail_data.status[j],
              };
              setDetailMenuData((prevArray) => [...prevArray, obj]);
              if (detail_data.status[j] === 1) {
                setCheckedMenu((checkdMenu) => [
                  ...checkdMenu,
                  detail_data.id[j],
                ]);
              }
            }
            for (var k = 0; k < share_data.id.length; k++) {
              const obj = {
                id: share_data.id[k],
                name: share_data.text[k],
                status: share_data.status[k],
              };
              setShareMenuData((prevArray) => [...prevArray, obj]);
              if (share_data.status[k] === 1) {
                setCheckedMenu((checkdMenu) => [
                  ...checkdMenu,
                  share_data.id[k],
                ]);
              }
            }
            for (var l = 0; l < tools_data.id.length; l++) {
              const obj = {
                id: tools_data.id[l],
                name: tools_data.text[l],
                status: tools_data.status[l],
              };
              setToolsMenuData((prevArray) => [...prevArray, obj]);
              if (tools_data.status[l] === 1) {
                setCheckedMenu((checkdMenu) => [
                  ...checkdMenu,
                  tools_data.id[l],
                ]);
              }
            }
            for (var m = 0; m < viewer_data.id.length; m++) {
              const obj = {
                id: viewer_data.id[m],
                name: viewer_data.text[m],
                status: viewer_data.status[m],
              };
              setViewerMenuData((prevArray) => [...prevArray, obj]);
              if (viewer_data.status[m] === 1) {
                setCheckedMenu((checkdMenu) => [
                  ...checkdMenu,
                  viewer_data.id[m],
                ]);
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetAnnouncement, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAnnouncements(res.data[0].response.data);
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
      postRecord(APIGetEditTourList, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setTourList(res.data[0].response.dataDetails.dataProvider);
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
          setWalkthroughData(res.data[0].response.threeD);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  // useEffect(() => {
  //     if (document.getElementById("img_div") !== null) {
  //         document.getElementById("img_div").setAttribute(
  //             "style", "filter: blur(" + blurValue / 10 + "px)  brightness(" + brightValue / 10 + ") grayscale(" + grayValue + "%) contrast(" + contrastValue + ") hue-rotate(" + hueValue / 10 + "rad) invert(" + invertValue + "%) opacity(" + opacityValue + "%) saturate(" + saturateValue / 10 + ") sepia(" + sepiaValue + "%)");
  //     }
  // }, [imageUrl, sync, blurValue, editImageData, brightValue, grayValue, contrastValue, hueValue, invertValue, opacityValue, saturateValue, sepiaValue]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
      };
      postRecord(APIGetBgMusic, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentMusic(res.data[0].response.data.audioScr);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
        imageId: imageId,
        type: "tour",
      };
      postRecord(APIGetImageEditor, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setEditImageData(res.data[0].response.data.properties[0]);
          setBlurValue(res.data[0].response.data.properties[0].blur);
          setBrightValue(
            res.data[0].response.data.properties[0].brightness === 100
              ? 10
              : res.data[0].response.data.properties[0].brightness
          );
          setGrayValue(res.data[0].response.data.properties[0].grayscale);
          setContrastValue(
            res.data[0].response.data.properties[0].contrast === 0
              ? 1
              : res.data[0].response.data.properties[0].contrast
          );
          setHueValue(res.data[0].response.data.properties[0].huerotate);
          setInvertValue(res.data[0].response.data.properties[0].invert);
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
          setSepiaValue(res.data[0].response.data.properties[0].sepia);
          setRotateValue(res.data[0].response.data.properties[0].rotate);

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
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetOfferedBanners, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllBanners(res.data[0].response.flyerdetails);
          setDefaultBanner(res.data[0].response.defaultbannerimg);
          //setDefaultBanner(res.data[0].response.bannerimg);
          setHeaderImageId(res.data[0].response.headerimageid);
          setCustomBannerImg("");
          setCustomBannerImg(res.data[0].response.bannerimg);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: tour_id,
      };
      postRecord(APIGetCoAgentInfo, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAgentData(res.data[0].response.data.model);
          setAgentPhoto(res.data[0].response.data.imagePath);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    var filter_data = allBanners.filter((res) => {
      return res.id == headerImageId;
    });
    if (filter_data.length > 0) {
      setOfferedBannerImg(filter_data[0].url);
    } else {
      setOfferedBannerImg("");
    }
  }, [headerImageId, allBanners]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetThemes, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllThemes(res.data[0].response.dataTotalArray[0]);
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
      postRecord(APIGetTourAudio, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentAudio(res.data[0].response.file_path);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (tourList.length > 0) {
      filterData();
    }
  }, [offset, tourList]);

  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (themeId === 1) {
        window.open("/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 2) {
        window.open("/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 3) {
        window.open("/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 4) {
        window.open("/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 5) {
        window.open("/tour/" + tour_id, "_blank");
        setThemeId("");
      }
    }
  }, [themeId, context.state.user, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (defaultsThemeId && isPremium === 0) {
        window.open("/tour/" + tour_id, "_blank");
        setDefaultsThemeId("");
      }
    }
  }, [context.state.user, tour_id, isPremium, defaultsThemeId]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        id: tour_id,
      };
      postRecord(APIDistributeTour, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setDistributeData(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  const handleCheckboxChange = (event) => {
    if (event.target.checked === true) {
      setAllThemes({ ...allThemes, ["is_premium_theme"]: 1 });
    } else {
      setAllThemes({ ...allThemes, ["is_premium_theme"]: "0" });
    }
  };
  const handlePremiumRadioChange = (event) => {
    setAllThemes({
      ...allThemes,
      ["premium_tour_theme"]: parseInt(event.target.value),
    });
  };
  const handleTourRadioChange = (event) => {
    setAllThemes({ ...allThemes, ["themeid"]: parseInt(event.target.value) });
  };
  const handleDrag = (data) => {
    setFirstOrder(data);
  };
  const handleDrop = (data) => {
    for (var i = 0; i < menuOrders.length; i++) {
      // if (menuOrders[i].name === data.name) {
      //     menuOrders[i].order = firstOrder.order;
      // }
      // if (menuOrders[i].name === firstOrder.name) {
      //     menuOrders[i].order = data.order;
      // }
    }
    menuOrders.forEach((res) => {
      var obj = {
        name: res.name,
        order:
          res.name === data.name
            ? firstOrder.order
            : res.name === data.firstOrder
            ? data.order
            : res.order,
      };
      // if (res.name === data.name) {
      //     res.order = firstOrder.order;
      // }
    });
    // menuOrders.forEach(res => {
    //     if (res.name === firstOrder.name) {
    //         res.order = data.order;
    //     }
    // });
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
  const handleViewerChange = (event, data) => {
    viewerMenuData.forEach((res) => {
      if (res.id === data.id) {
        let index = getIndex(res.id, checkdMenu);
        if (event === true) {
          setCheckedMenu([...checkdMenu, res.id]);
          res.status = 1;
        } else {
          setCheckedMenu((checkdMenu) =>
            checkdMenu.filter((fp, i) => i !== index)
          );
          res.status = 0;
        }
      }
    });
    setViewerMenuData([]);
    setViewerMenuData(viewerMenuData);
  };
  const handleShareChange = (event, data) => {
    shareMenuData.forEach((res) => {
      if (res.id === data.id) {
        let index = getIndex(res.id, checkdMenu);
        if (event === true) {
          setCheckedMenu([...checkdMenu, res.id]);
          res.status = 1;
        } else {
          setCheckedMenu((checkdMenu) =>
            checkdMenu.filter((fp, i) => i !== index)
          );
          res.status = 0;
        }
      }
    });
    setShareMenuData([]);
    setShareMenuData(shareMenuData);
  };
  const handleDetailChange = (event, data) => {
    detailMenuData.forEach((res) => {
      if (res.id === data.id) {
        let index = getIndex(res.id, checkdMenu);
        if (event === true) {
          setCheckedMenu([...checkdMenu, res.id]);
          res.status = 1;
        } else {
          setCheckedMenu((checkdMenu) =>
            checkdMenu.filter((fp, i) => i !== index)
          );
          res.status = 0;
        }
      }
    });
    setDetailMenuData([]);
    setDetailMenuData(detailMenuData);
  };
  const handleContactChange = (event, data) => {
    contactMenuData.forEach((res) => {
      if (res.id === data.id) {
        let index = getIndex(res.id, checkdMenu);
        if (event === true) {
          setCheckedMenu([...checkdMenu, res.id]);
          res.status = 1;
        } else {
          setCheckedMenu((checkdMenu) =>
            checkdMenu.filter((fp, i) => i !== index)
          );
          res.status = 0;
        }
      }
    });
    setContactMenuData([]);
    setContactMenuData(contactMenuData);
  };
  const handleToolsChange = (event, data) => {
    toolsMenuData.forEach((res) => {
      if (res.id === data.id) {
        let index = getIndex(res.id, checkdMenu);
        if (event === true) {
          setCheckedMenu([...checkdMenu, res.id]);
          res.status = 1;
        } else {
          setCheckedMenu((checkdMenu) =>
            checkdMenu.filter((fp, i) => i !== index)
          );
          res.status = 0;
        }
      }
    });
    setToolsMenuData([]);
    setToolsMenuData(toolsMenuData);
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
      tourId: tour_id,
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
  const handleDateChange = (date) => {
    announcementData.announcedate = dateFormat(date, "yyyy-mm-dd");
    setSelectedDate(date);
  };
  const handleFromChange = (date) => {
    announcementData.fromtime_h = date;
    setSelectedFrom(date);
  };
  const handleToChange = (date) => {
    announcementData.totime_h = date;
    setSelectedTo(date);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  function getIndex(value, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }
  const handleYoutubeLinkChange = (event) => {
    const { name, value } = event.target;
    setYoutubeLinkData({ ...youtubeLinkData, [name]: value });
  };
  const handleWalkThroughChange = (event) => {
    const { name, value } = event.target;
    setWalkthroughData({ ...walkthroughData, [name]: value });
  };
  const handleAmenityChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const handleNewsChange = (event) => {
    const { name, value } = event.target;
    setNewsLetterData({ ...newsLetterData, [name]: value });
  };
  const handleMusicChange = (data) => {
    setMusic(data.path);
    setCurrentMusic(data);
    // musicData.musicid = data.musicid;
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
  // const handleLeadChange = nextChecked => {
  //     setPropertyData({ ...propertyData, ["leadcapture"]: nextChecked });
  // };

  const handleTourChange = (event) => {
    setOpen(true);
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleKenburnChange = (event) => {
    setOpen(true);
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      status: "kenburns",
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
  const handleLeadcaptureChange = (event) => {
    setOpen(true);
    var check = event.target.checked === true ? 1 : 0;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      status: "leadcapture",
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
      if (data.image_type == "video") setVideoSelected(true);
      else setVideoSelected(false);
      setImageId(data.id);
    }
    //setBlurValue(10);
  };
  const handleChangeMls = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        if (event === true) {
          res.enable_on_mls = 1;
        } else {
          res.enable_on_mls = 0;
        }
      }
    });
    // setTourList([]);
    setTourList(tourList);
  };
  const handleTourVideoSound = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        if (event === true) {
          res.video_music_type = 1;
        } else {
          res.video_music_type = 0;
        }
      }
    });
    // setTourList([]);
    setTourList(tourList);
  };
  const handleImageTourChange = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        if (event === true) {
          res.enableontour = 1;
        } else {
          res.enableontour = 0;
        }
      }
    });
    // setTourList([]);
    setTourList(tourList);
  };
  const handlefontTourChange = (event, id) => {
    var new_tourList = tourList;
    new_tourList.forEach((res) => {
      if (res.id === id) {
        res.tourfontstyle = event.target.value;
      }
    });
    // setTourList([]);
    setTourList(new_tourList);
  };

  const handlefontSizeTourChange = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        res.tourfontsize = event.target.value;
      }
    });
    // setTourList([]);
    setTourList(tourList);
  };
  const handleColorTourChange = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        res.tourfontcolor = event.target.value;
      }
    });
    // setTourList([]);
    setTourList(tourList);
  };
  function handleKenburnTourChange(event, id) {
    tourList.forEach((res) => {
      if (res.id === id) {
        if (event === true) {
          res.enablekenburns = 1;
        }
        if (event === false) {
          res.enablekenburns = 0;
        }
      }
    });
    //setTourList([]);
    setTourList(tourList);
  }

  const handleEditImageModal = () => {
    if (imageId === "") {
      setMessage("Please select one image");
      setOpenError(true);
    } else {
      setSync(true);
      setSync(false);
      setOpenEditImageModal(true);
    }
  };
  const handleFloorPlan = () => {
    history.push(APIPath() + "view-floor-plans/" + tour_id);
  };
  const handleSlideShow = () => {
    history.push(APIPath() + "agent-slide-show/" + tour_id);
  };
  const handlePanorama = () => {
    history.push(APIPath() + "agent-panaroma/" + tour_id);
  };
  const handleEditFloor = () => {
    history.push(APIPath() + "edit-floor-plan/" + tour_id);
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
  const handleRadioChange = (event, id) => {
    tourList.forEach((res) => {
      if (res.id === id) {
        res.tourfontlocation = event.target.value;
      }
    });
    setTourList(tourList);
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
  const handleImageChange = (event) => {
    setBannerData({ ...bannerData, image: event.target.files });
    setCustomBannerImg(URL.createObjectURL(event.target.files[0]));
    setHeaderImageId(0);

    //setBannerData({ ...bannerData, "header": 0 });
  };
  const deleteSelected = async (docid) => {
    const data = {
      authenticate_key: "abcd123XYZ",
      tourId: tour_id,
      imageId: selectedImages,
    };
    setOpen(true);
    try {
      const res = await axios.post(APIDeleteMulitple, data);
      setOpen(false);
      if (res.data[0].response.status === "success") {

        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(!sync);
        setSelectedImages([]);
      }
    } catch (error) {
      setOpen(false);
      
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
  const handleBannerChange = (event) => {
    setHeaderImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, image: "" });
  };
  const handleAgentChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value });
  };
  const handleAgentTextChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handleAgentPhoneChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value.replace(/\D/g, "") });
  };
  const handleAgentImageChange = (event) => {
    setAgentData({ ...agentData, photo: event.target.files });
    setAgentPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const handleOnChange = (val, fname) => {};
  const handleAudioStop = (data) => {
    setValue({ audioDetails: data });
  };
  const handleCountDown = (data) => {};
  const handleAudioUpload = (file) => {
    setNarrationData({ ...narrationData, file_two: value.audioDetails });
    setCurrentAudio(value.audioDetails.url);
    handleRest();
  };
  const handleRest = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      },
    };
    setValue({ audioDetails: reset });
  };
  const handleAudioChange = (event) => {
    setCurrentAudio(URL.createObjectURL(event.target.files[0]));
    setNarrationData({ ...narrationData, file: event.target.files });
  };
  const UpdateTourAudio = () => {
    narrationData.authenticate_key = "abcd123XYZ";
    narrationData.agentId = JSON.parse(context.state.user).agentId;
    narrationData.tourid = tour_id;
    const formData = new FormData();
    for (let i in narrationData) {
      if (i === "file") {
        for (let file of narrationData[i]) {
          formData.append("file", file);
        }
      } else if (i === "file_two") {
        formData.append(i, narrationData.file_two.blob);
      } else {
        formData.append(i, narrationData[i]);
      }
    }
    axios
      .post(APIUpdateAudio, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => console.log(err));
    // postRecord(APIUpdateAudio, formData)
    //     .then(res => {
    //         if (res.data[0].response.status === "success") {
    //             setMessage(res.data[0].response.message);
    //             setOpenSuccess(true);
    //             setSync(false);
    //         }
    //         else {
    //             setMessage(res.data[0].response.message);
    //             setOpenError(true);
    //             setSync(false);
    //         }
    //         setSync(true);
    //     });
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
  const updateThemes = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      themeId: allThemes.themeid,
      is_premium_theme: allThemes.is_premium_theme,
      premium_tour_theme: allThemes.premium_tour_theme,
    };
    postRecord(APIUpdateThemes, obj)
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
        setOpen(false);
        setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveAgentInfo = () => {
    setOpen(true);
    agentData.authenticate_key = "abcd123XYZ";
    agentData.agent_id = JSON.parse(context.state.user).agentId;
    agentData.tourId = tour_id;
    const formData = new FormData();
    for (let i in agentData) {
      if (i === "photo") {
        for (let file of agentData[i]) {
          formData.append("photo", file);
        }
      } else {
        formData.append(i, agentData[i]);
      }
    }
    axios
      .post(APIAddCoAgent, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpen(false);
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
  const deleteAgent = () => {
    agentData.authenticate_key = "abcd123XYZ";
    agentData.agent_id = JSON.parse(context.state.user).agentId;
    agentData.tourId = tour_id;
    agentData.coagentid = agentData.id;
    postRecord(APIDeleteCoAgent, agentData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
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
      });
  };
  const deleteAgentImage = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
      folder: "coagentphoto",
      defalutImage: "nophoto.jpg",
    };
    postRecord(APIDeleteAgentImage, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
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
      });
  };
  const saveCompanyBanner = () => {
    setOpen(true);
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.agent_id = JSON.parse(context.state.user).agentId;
    bannerData.tourId = tour_id;
    if (bannerData.image !== "") {
      bannerData.header = 0;
    }
    const formData = new FormData();
    for (let i in bannerData) {
      if (i === "image") {
        for (let file of bannerData[i]) {
          formData.append("image[]", file);
        }
      } else {
        formData.append(i, bannerData[i]);
      }
    }
    axios
      .post(APISaveCompanyBanner, formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(true);
        }
        setSync(false);
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const removeBanner = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
      folder: "companybanner",
      defalutImage: "default-banner.jpg",
    };
    postRecord(APIDeleteTourImage, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
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
      });
  };
  const savePropertyDescription = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = tour_id;
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
    propertyData.tourid = tour_id;
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
    propertyData.tourid = tour_id;
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
    propertyData.tourid = tour_id;
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
    propertyData.tourid = tour_id;
    propertyData.tab_index = "5";
    const formData = new FormData();
    // console.log(propertyData,"propertyData");
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
  const addNewAmenity = (type) => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.agent_id = JSON.parse(context.state.user).agentId;
    amenityData.tourId = tour_id;
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
    amenityData.tourId = tour_id;
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
      tourId: tour_id,
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
      tourId: tour_id,
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
      tourId: tour_id,
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
  const getNewsLetter = () => {
    newsLetterData.authenticate_key = "abcd123XYZ";
    newsLetterData.agent_id = JSON.parse(context.state.user).agentId;
    newsLetterData.tourId = tour_id;
    postRecord(APIGetNewsLetter, newsLetterData)
      .then((res) => {
        if (res.data[0].response.status == "success") {
          setNewsLetterData({
            ...res.data[0].response.data,
            text: res.data[0].response.data.formcode,
          });
          setSync(false);
        } else {
        }
        setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const saveNewsLetter = () => {
    setOpen(true);
    newsLetterData.authenticate_key = "abcd123XYZ";
    newsLetterData.agent_id = JSON.parse(context.state.user).agentId;
    newsLetterData.tourId = tour_id;
    postRecord(APISaveNewsLetter, newsLetterData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
          newsLetterData.text = "";
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
  const updateMenu = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      menu: checkdMenu,
      virtualtourmenu: allMenuData.tourtaborder.virtualshow,
      theatremenu: allMenuData.tourtaborder.theatre,
      videomenu: allMenuData.tourtaborder.videos,
      floorplanmenu: allMenuData.tourtaborder.floorplans,
      panoramamenu: 5,
    };
    postRecord(APIUpdateMenu, obj)
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
  const saveAnnouncement = () => {
    setOpen(true);
    // announcementData.fromtime_h = announcementData.fromtime_h.toLocaleTimeString();
    // announcementData.totime_h = announcementData.totime_h.toLocaleTimeString();
    announcementData.fromtime_h =
      announcementData.fromtime_h.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    announcementData.totime_h = announcementData.totime_h.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    );
    announcementData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APISaveAnnouncement, announcementData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
          setAnnouncementData(initialAnnouncementState);
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
  const editAnnouncement = (data) => {
    data.fromtime_h = new Date(
      "07/29/2019 " + data.fromtime + " " + data.fromampm
    );
    data.totime_h = new Date("07/29/2019 " + data.totime + " " + data.toampm);
    setAnnouncementData(data);
    setEditing(true);
  };
  const deleteAnnouncement = (data) => {
    const obj = {};
    obj.authenticate_key = "abcd123XYZ";
    obj.agent_id = JSON.parse(context.state.user).agentId;
    obj.tourid = tour_id;
    obj.id = data.id;
    postRecord(APIDeleteAnnouncement, obj)
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
  const updateAnnouncement = () => {
    setOpen(true);
    announcementData.authenticate_key = "abcd123XYZ";
    announcementData.agent_id = JSON.parse(context.state.user).agentId;
    announcementData.tourid = tour_id;
    announcementData.fromtime_h =
      announcementData.fromtime_h.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    announcementData.totime_h = announcementData.totime_h.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    );
    postRecord(APISaveAnnouncement, announcementData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
          setAnnouncementData(initialAnnouncementState);
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
  const updateTourListData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      type: "tour",
      imageArr: dragImages,
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
  const updateMusicData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      musicid: currentMusic.musicid,
    };
    postRecord(APIUpdateBgMusic, obj)
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

  const updateEditImagedata = () => {
    setOpen(true);
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
        setOpen(false);
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
  const saveYoutubeLink = () => {
    setOpen(true);
    youtubeLinkData.authenticate_key = "abcd123XYZ";
    youtubeLinkData.agent_id = JSON.parse(context.state.user).agentId;
    youtubeLinkData.tourId = tour_id;
    postRecord(APISaveYoutubeLinks, youtubeLinkData)
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
  const saveWalkThrough = () => {
    setOpen(true);
    const data = [];
    const data_one = [];
    data.push(walkthroughData.code1);
    data.push(walkthroughData.code2);
    data_one.push(walkthroughData.caption1);
    data_one.push(walkthroughData.caption2);
    walkthroughData.authenticate_key = "abcd123XYZ";
    walkthroughData.agent_id = JSON.parse(context.state.user).agentId;
    walkthroughData.tourId = tour_id;
    walkthroughData.embededcode = data;
    walkthroughData.caption = data_one;
    postRecord(APISaveWalkThrough, walkthroughData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
          // setWalkthroughData(initialWalkthroughData);
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

  const filterData = async () => {
    const endOffset = offset + postPerPage;
    setTotalData(tourList.slice(offset, endOffset));
    setDragImages(tourList);
    setPageCount(Math.ceil(tourList.length / postPerPage));
  };
  const handlePageClick = (event) => {
    // setOffset(selectedPage + 6);
    const newOffset = (event.selected * postPerPage) % tourList.length;
    setOffset(newOffset);
  };
  const viewtour = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
    };
    postRecord(APIGetTourDetails, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          if (res.data[0].response.tourdetails.isactive === 0) {
            window.open(
              APIPath() + "agent-video-non-active/" + tour_id,
              "_blank"
            );
          } else {
            setThemeId(res.data[0].response.tourdetails.premium_tour_theme);
            setIsPremium(res.data[0].response.tourdetails.is_premium_theme);
            setDefaultsThemeId(res.data[0].response.tourdetails.themeid);
          }
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const facebookLoginLink = () => {
    window.open(
      "https://www.facebook.com/login.php?skip_api_login=1&api_key=443725232478550&kid_directed_site=0&app_id=443725232478550&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fapp_id%3D443725232478550%26cbt%3D1650037099788%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df33f5ab944ead08%2526domain%253Dvirtualtourcafe.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fvirtualtourcafe.com%25252Ff25a4bf64f69478%2526relation%253Dopener%26client_id%3D443725232478550%26display%3Dpopup%26domain%3Dvirtualtourcafe.com%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fvirtualtourcafe.com%252Fagent%252Ftours%252Fedittour%252F4778003%26locale%3Den_US%26logger_id%3Df3c1a5e74cf591%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df361b68717ed25c%2526domain%253Dvirtualtourcafe.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fvirtualtourcafe.com%25252Ff25a4bf64f69478%2526relation%253Dopener%2526frame%253Df34c3a9b88b2254%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26scope%3Dread_stream%252Cpublish_stream%26sdk%3Djoey%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df361b68717ed25c%26domain%3Dvirtualtourcafe.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fvirtualtourcafe.com%252Ff25a4bf64f69478%26relation%3Dopener%26frame%3Df34c3a9b88b2254%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=en_GB&pl_dbl=0",
      "_blank"
    );
  };
  const handleEditImageset = () => {
    history.push(APIPath() + "edit-image-set/" + tour_id);
  };
  const [dragImages, setDragImages] = useState([]);
  useEffect(() => {
    if (allData.length > 0) {
      setDragImages(allData);
    }
  }, [allData]);

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
    // const nextState = swap(dragImages, sourceIndex, targetIndex);
    // setDragImages(nextState);
    // var arr = [];
    // nextState.forEach((res) => {
    //   arr.push(res.id);
    // });
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      imgid: idsArray,
      type: "tour",
    };
    postRecord(APIUpdateOrder, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setOpenChangeOrderModal(false);
          // setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          // setSync(false);
        }
        // setSync(true);
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  }
  const handleCaptionChange = (event, data) => {
    console.log(data);
    const { name, value } = event.target;
    const arr = [];
    dragImages.forEach((res) => {
      if (data.id === res.id) {
        res.caption = value;
      }
      arr.push(res);
    });
    // tourList.imageArr = {};
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
  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
  };
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const saveNewImage = () => {
    // setOpen(true);
    setGlobalLoading(true);
    setOpenModal(false);

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
          setGlobalMessage(res.data[0].response.message);
          setGlobalAlertType("success");
          setGlobalLoading(false);
          setGlobalOpenPopUp(true);
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpenModal(false);
          setUploadedImages([]);
        } else {
          setGlobalLoading(false);
          setGlobalMessage(res.data[0].response.message);
          setGlobalAlertType("error");

          setGlobalOpenPopUp(true);

          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(true);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setGlobalLoading(false);
        setGlobalMessage("Something Went Wrong. Please try again later...");
        setGlobalAlertType("error");

        setGlobalOpenPopUp(true);
      });
  };
  const handleVideoRemove = (data) => {
    const filteredPeople = uploadedVideos.filter(
      (item) => item.name !== data.name
    );
    setUploadedVideos(filteredPeople);
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
  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const src = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = src;
      // link.replace(/\s/g, "%");
      link.href = link.href.replace(/\s/g, "%20");
      if (videoSelected) link.setAttribute("download", "video.mp4");
      else link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  // const downloadImage = () => {
  //   if (imageUrl !== "") {
  //     if (imageId === "") {
  //       setMessage("Please select one image");
  //       setOpenError(true);
  //     } else {
  //       toDataURL(imageUrl, function (dataUrl) {
  //         var link = document.createElement("a");
  //         link.href = dataUrl;
  //         // link.replace(/\s/g, "%");
  //         link.href = link.href.replace(/\s/g, "%");
  //         link.setAttribute("download", "image.jpg");
  //         document.body.appendChild(link);
  //         link.click();
  //       });
  //       setImageUrl("");
  //     }
  //   } else {
  //     if (imageId === "") {
  //       setMessage("Please select one image or video");
  //       setOpenError(true);
  //     } else {
  //       toDataURL(videoUrl, function (dataUrl) {
  //         var link = document.createElement("a");
  //         link.href = dataUrl;
  //         link.href = link.href.replace(/\s/g, "%");
  //         link.setAttribute("download", "image.jpg");
  //         document.body.appendChild(link);
  //         link.click();
  //       });
  //       setVideoUrl("");
  //     }
  //   }
  // };
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
  const updateAllCaption = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      type: "imageset",
      imageArr: allData,
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
  const handleOtherInputChange = (event) => {
    const { name, value } = event.target;
    setOtherLink({ ...otherLink, [name]: value });
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
  const handleMyCafeGallery = (nextChecked) => {
    let check = nextChecked === true ? 1 : 0;
    setOtherLink({ ...otherLink, ["cafeValue"]: check });
  };
  const handleTourQrCode = (nextChecked) => {
    let check = nextChecked === true ? 1 : 0;
    setOtherLink({ ...otherLink, ["tourvalue"]: check });
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
  const handleServiceInputChange = (event) => {
    const { name, value } = event.target;
    setServiceLinks({ ...serviceLinks, [name]: value });
  };
  const handleTrafficChange = (nextChecked) => {
    setTrafficData({ ...trafficData, ["emailtrafficreport"]: nextChecked });
  };
  const handleReport = () => {
    window.open(APIPath() + "site/trafficreport/" + imageset_id, "_blank");
  };
  const handleTrafficInputChange = (event) => {
    const { name, value } = event.target;
    setTrafficData({ ...trafficData, [name]: value });
  };
  const SaveTrafficReport = () => {
    setOpen(true);
    trafficData.authenticate_key = "abcd123XYZ";
    trafficData.agent_id = JSON.parse(context.state.user).agentId;
    trafficData.tour_id = tour_id;
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
  const panoroma = () => {
    history.push(APIPath() + "agent-panaroma/" + imageset_id);
    // window.location.href = APIPath() + "agent-panaroma/" + imageset_id;
  };
  const applyToAll = (image) => {
    var new_tourList = tourList;
    new_tourList.forEach((res) => {
      res.tourfontstyle = image.tourfontstyle;
      res.tourfontsize = image.tourfontsize;
      res.tourfontcolor = image.tourfontcolor;
      res.tourfontlocation = image.tourfontlocation;
    });
    setTourList(new_tourList);
  };
  function changeHover(e) {
    setHover(true);
  }
  function changeHover1(e) {
    setHover1(true);
  }
  function changeHover2(e) {
    setHover2(true);
  }

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

                    <li class="active">
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
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
        <div class="banner-title">
          <h2>Edit Tour</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              {/* Navigation Menu */}

              {/* <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                  Dropdown button
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div> */}

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
                        <i class="fas fa-image"></i> Media Tools
                      </a>
                      <div
                        className={
                          hover ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-3">
                          <li>
                            <a class="dropdown-item" onClick={() => viewtour()}>
                              <i class="fas fa-eye"></i> View Tour
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenChangeOrderModal(true);
                              }}
                            >
                              <i class="far fa-image"></i> Change order
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              <i class="far fa-image"></i> Add Images
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenVideoModal(true);
                              }}
                            >
                              {" "}
                              <i class="fas fa-video"></i> Add Video
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={downloadImage}>
                              <i class="fas fa-download"></i> Download
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleDelete}>
                              <i class="far fa-trash-alt"></i> Delete
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => updateAllCaption()}
                            >
                              {" "}
                              <i class="fas fa-pen"></i> Update All Captions
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Property"
                            >
                              {" "}
                              <i class="fas fa-info-circle"></i> Property
                              Information
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenAmenityModal(true)}
                            >
                              {" "}
                              <i class="fas fa-file-spreadsheet"></i> Amenities
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Services"
                            >
                              {" "}
                              <i class="fas fa-link"></i> Service Links
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Links"
                            >
                              {" "}
                              <i class="fas fa-external-link-alt"></i> Other
                              Links
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenTrafficModal(true)}
                            >
                              {" "}
                              <i class="far fa-sticky-note"></i> Traffic Reports
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={() => panoroma()}>
                              {" "}
                              <i class="far fa-image"></i> Panoramas
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => updateTourListData()}
                            >
                              {" "}
                              <i class="fas fa-cog"></i> Update All Settings
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleEditImageModal}
                            >
                              {" "}
                              <i class="fas fa-edit"></i> Edit Image{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Distributetour"
                            >
                              {" "}
                              <i class="fas fa-table"></i> Distribute Tour
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href=""
                              data-toggle="modal"
                              data-target="#facebook"
                            >
                              {" "}
                              <i class="fab fa-facebook-f"></i> Post to Facebook
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      class="nav-item dropdown"
                      onMouseLeave={(e) => setHover1(false)}
                      onMouseEnter={changeHover1}
                    >
                      <a
                        class="nav-link nav-new-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-line-height"></i> Basic
                      </a>
                      <div
                        className={
                          hover1 ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-2">
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#menu_opt"
                            >
                              {" "}
                              <i class="fas fa-bars"></i> Menu Options
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#bg_music"
                            >
                              {" "}
                              <i class="fas fa-music"></i> Background Music
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenNarrationModal(true)}
                            >
                              <i class="fas fa-torii-gate"></i> Tour Narration{" "}
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
                              onClick={() => setOpenAmenityModal(true)}
                            >
                              {" "}
                              <i class="fas fa-sticky-note"></i> Amenities
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#open_house"
                            >
                              {" "}
                              <i class="fas fa-warehouse"></i> Open House
                              Announcements
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#Newsletter"
                              onClick={getNewsLetter}
                            >
                              <i class="fab fa-wpforms"></i> Add Newsletter Form
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      class="nav-item dropdown"
                      onMouseLeave={(e) => setHover2(false)}
                      onMouseEnter={changeHover2}
                    >
                      <a
                        class="nav-link nav-new-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-hand-point-right"></i> Advanced
                      </a>
                      <div
                        className={
                          hover2 ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-2">
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#themes"
                            >
                              {" "}
                              <i class="fas fa-gopuram"></i> Themes
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenCompanyBanner(true)}
                            >
                              {" "}
                              <i class="fas fa-building"></i> Company Banner
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#agent_pop_tab"
                            >
                              <i class="fas fa-user"></i> Co-listing agent{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => handleFloorPlan()}
                            >
                              <i class="fas fa-ruler-horizontal"></i> Floor
                              Plans
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleEditFloor}>
                              <i class="fas fa-wifi"></i> Floor-plan Hot-spot
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handlePanorama}>
                              {" "}
                              <i class="fas fa-photo-video"></i> Panoramas
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => handleSlideShow()}
                            >
                              {" "}
                              <i class="fas fa-sliders-h"></i> Slide-Show Editor
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenYoutubeModal(true);
                              }}
                            >
                              {" "}
                              <i class="fab fa-youtube"></i> Additional YouTube
                              Links
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenWalkThroughModal(true);
                              }}
                            >
                              {" "}
                              <i class="fas fa-home"></i> 3D Walkthrough Home
                              Tour
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
                        href="#ImageSetTools"
                        role="tab"
                      >
                        <i class="fas fa-image"></i>Media Tools
                      </a>
                    </li>*/}
              {/* <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                href="#Actions_tab"
                role="tab"
              >
                <i class="fas fa-cog"></i>Actions
              </a>
            </li> */}
              {/*<li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#Basic"
                        role="tab"
                      >
                        <i class="fas fa-line-height"></i> Basic
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#Advanced"
                        role="tab"
                      >
                        <i class="fas fa-hand-point-right"></i> Advanced
                      </a>
                    </li>
                  </ul>
                </div>
              </div>*/}
            </div>
          </div>
          {/*<div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="tab-content">
                <div
                  class="tab-pane"
                  id="Actions_tab"
                  role="tabpanel"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  <div class="property_info_cont agent_img_sets" id="demo">

                    <section class="snap-scrolling-example">



                      <div class="horizontal-images tab_main tabscroll-windows">
                        <ul class="list_sec" role="">
                          <li class="">
                            <a onClick={() => updateTourListData()}>
                              <span>
                                <i class="fas fa-cog"></i>
                              </span>
                              Update All Settings
                            </a>
                          </li>
                          <li class="">
                            <a onClick={handleEditImageModal}>
                              <span>
                                <i class="fas fa-edit"></i>
                              </span>
                              Edit Image{" "}
                            </a>
                          </li>
                          <li class="">
                            <a onClick={() => viewtour()}>
                              <span>
                                <i class="fas fa-eye"></i>
                              </span>
                              View Tour
                            </a>
                          </li>
                          <li class="">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Distributetour"
                            >
                              <span>
                                <i class="fas fa-table"></i>
                              </span>
                              Distribute Tour
                            </a>
                          </li>
                          <li class="">
                            <a
                              href=""
                              data-toggle="modal"
                              data-target="#facebook"
                            >
                              <span>
                                <i class="fab fa-facebook-f"></i>
                              </span>
                              Post to Facebook
                            </a>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
                <div
                  class="tab-pane"
                  id="Basic"
                  role="tabpanel"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  <div class="property_info_cont agent_img_sets" id="demo">
                    <section class="snap-scrolling-example">
                      <div class="horizontal-images tabscroll-windows">
                        <OwlCarousel margin={10} {...options} id="home_slide1">
                          <div className="asdf">
                            <a
                              class=""
                              href="#"
                              data-toggle="modal"
                              data-target="#menu_opt"
                            >
                              <span>
                                <i class="fas fa-bars"></i>
                              </span>
                              Menu Options
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#bg_music"
                            >
                              <span>
                                <i class="fas fa-music"></i>
                              </span>{" "}
                              Background Music
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={() => setOpenNarrationModal(true)}>
                              <span>
                                <i class="fas fa-torii-gate"></i>
                              </span>
                              Tour Narration{" "}
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
                          <div className="asdf">
                            <a onClick={() => setOpenAmenityModal(true)}>
                              <span>
                                <i class="fas fa-sticky-note"></i>
                              </span>{" "}
                              Amenities
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#open_house"
                            >
                              <span>
                                <i class="fas fa-warehouse"></i>
                              </span>
                              Open House Announcements
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Newsletter"
                            >
                              <span>
                                <i class="fab fa-wpforms"></i>
                              </span>
                              Add Newsletter Form
                            </a>
                          </div>
                        </OwlCarousel>
                      </div>
                    </section>
                  </div>
                </div>
                <div
                  class="tab-pane"
                  id="Advanced"
                  role="tabpanel"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  <div class="property_info_cont agent_img_sets" id="demo">
                    <section class="snap-scrolling-example">
                      <div class="horizontal-images tabscroll-windows">
                        <OwlCarousel margin={10} {...options} id="home_slide1">
                          <div className="asdf">
                            <a
                              class=""
                              href="#"
                              data-toggle="modal"
                              data-target="#themes"
                            >
                              <span>
                                <i class="fas fa-gopuram"></i>
                              </span>
                              Themes
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={() => setOpenCompanyBanner(true)}>
                              <span>
                                <i class="fas fa-building"></i>
                              </span>{" "}
                              Company Banner
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#agent_pop_tab"
                            >
                              <span>
                                <i class="fas fa-user"></i>
                              </span>
                              Co-listing agent{" "}
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={() => handleFloorPlan()}>
                              <span>
                                <i class="fas fa-ruler-horizontal"></i>
                              </span>
                              Floor Plans
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handleEditFloor}>
                              <span>
                                <i class="fas fa-wifi"></i>
                              </span>
                              Floor-plan Hot-spot
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handlePanorama}>
                              <span>
                                <i class="fas fa-photo-video"></i>
                              </span>
                              Panoramas
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={() => handleSlideShow()}>
                              <span>
                                <i class="fas fa-sliders-h"></i>
                              </span>
                              Slide-Show Editor
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => {
                                setOpenYoutubeModal(true);
                              }}
                            >
                              <span>
                                <i class="fab fa-youtube"></i>
                              </span>
                              Additional YouTube Links
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              onClick={() => {
                                setOpenWalkThroughModal(true);
                              }}
                            >
                              <span>
                                <i class="fas fa-home"></i>
                              </span>
                              3D Walkthrough Home Tour
                            </a>
                          </div>
                        </OwlCarousel>
                      </div>
                    </section>
                  </div>
                </div>
                <div
                  class="tab-pane active"
                  id="ImageSetTools"
                  role="tabpanel"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  <div class="property_info_cont agent_img_sets" id="demo">
                    <section class="snap-scrolling-example">
                      <div class="horizontal-images tabscroll-windows">
                        <OwlCarousel margin={10} {...options} id="home_slide1">
                          <div className="asdf">
                            <a onClick={() => viewtour()}>
                              <span>
                                <i class="fas fa-eye"></i>
                              </span>
                              View Tour
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              className="owl_"
                              onClick={() => {
                                setOpenChangeOrderModal(true);
                              }}
                            >
                              <span>
                                <i class="far fa-image"></i>
                              </span>
                              Change order
                            </a>
                          </div>
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
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Property"
                            >
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
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Services"
                            >
                              <span>
                                <i class="fas fa-link"></i>
                              </span>
                              Service Links
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Links"
                            >
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
                            <a href="panorama.html"><span><i class="far fa-image"></i></span>Panoramas</a>
                            <Link to={APIPath() + "agent-panoroma"}><span><i class="far fa-image"></i></span>Panoramas</Link>
                            <a onClick={() => panoroma()}>
                              <span>
                                <i class="far fa-image"></i>
                              </span>
                              Panoramas
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={() => updateTourListData()}>
                              <span>
                                <i class="fas fa-cog"></i>
                              </span>
                              Update All Settings
                            </a>
                          </div>
                          <div className="asdf">
                            <a onClick={handleEditImageModal}>
                              <span>
                                <i class="fas fa-edit"></i>
                              </span>
                              Edit Image{" "}
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#Distributetour"
                            >
                              <span>
                                <i class="fas fa-table"></i>
                              </span>
                              Distribute Tour
                            </a>
                          </div>
                          <div className="asdf">
                            <a
                              href=""
                              data-toggle="modal"
                              data-target="#facebook"
                            >
                              <span>
                                <i class="fab fa-facebook-f"></i>
                              </span>
                              Post to Facebook
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
          {/* <div class="row">
                <div class="col-lg-12 col-md-12">
                    <h6 class="optimal_pic mar_top">Note ! Drag-n-Drop to Rearrange Images for All Services.<span class="close">X</span></h6>
                </div>
            </div> */}
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="test_sec">
                <div class="test_sec_left"></div>
                <div class="test_sec_right">
                  {selectedImages.length > 0 && (
                    <button
                      onClick={deleteSelected}
                      type="button"
                      class="next_btn float-start"
                    >
                      Delete Selected
                    </button>
                  )}

                  <button
                    onClick={updateTourListData}
                    type="button"
                    class="next_btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="row" style={{ paddingTop: "20px" }}>
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
                  <li>
                    {/* <div class="download_qr">
                      <p class="img_set_para">Use Ken Burns Effects on Tour</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleKenburnChange}
                          value={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.kenburnsservice
                          }
                          checked={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.kenburnsservice === 1
                              ? true
                              : false
                          }
                          class="custom-control-input"
                          id="customSwitch1111114"
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch1111114"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div> 
                  </li>
                  <li>
                    <div class="download_qr">
                      <p class="img_set_para">Show Lead Capture</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleLeadcaptureChange}
                          value={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.showleadcapture
                          }
                          checked={
                            Object.keys(currentTourData).length > 0 &&
                            currentTourData.showleadcapture === 1
                              ? true
                              : false
                          }
                          class="custom-control-input"
                          id="customSwitch11111114"
                        />
                        <label
                          class="custom-control-label"
                          for="customSwitch11111114"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="row" style={{ height: "900px", overflowY: "auto" }}>
            {dragImages.map((res, index) => (
              <div
                onClick={() => {
                  setImageUrl(res.imageurl);
                  setImageId(res.id);
                  handleImageId(res);
                  selectOrRemove(res.id);
                }}
                class="col-lg-4 col-md-4"
              >
                <div
                  id={"myDiv" + res.id}
                  className={selectedImages.includes(res.id) ?"select_img_set_box new_edit_tour_sec selected" :"select_img_set_box new_edit_tour_sec"}
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
                        <div class="col-lg-12 col-md-12 mb-3">
                          <div class="select_img_set_box_img">
                            {res.image_type === "image" && (
                              <img
                                draggable="false"
                                src={res.imageurl}
                                alt=""
                              />
                            )}
                            {res.image_type === "video" && (
                              <img
                                draggable="false"
                                src="https://virtualtourcafe.com/images/video-default.jpg"
                                alt=""
                              />
                            )}
                            {res.image_type === "panoramas" ? (
                              <>
                                <img
                                  src={res.imageurl}
                                  style={{
                                    right: "5px",
                                    top: "5px",
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                  alt=""
                                  draggable="false"
                                />
                                <img
                                  src={res.flag_img}
                                  className="panaromaRibbon"
                                  alt=""
                                  draggable="false"
                                />
                              </>
                            ) : res.image_type != "video" ? (
                              <i
                                onClick={() => {
                                  setOpenEditImageModal(true);
                                  setFilename(res.filename);
                                }}
                                class="far fa-edit new_edit_btn"
                                style={{ top: "20px" }}
                              ></i>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="select_img_set_box_cont">
                            <input
                              type="text"
                              onEnter
                              tabIndex={index + 1}
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
                            Use this Image on tour ?
                            <span style={{ color: "#ffa12d" }}></span>
                          </label>
                        </div>
                        <div
                          class="col-md-3 formbox1"
                          style={{ marginTop: "7px" }}
                        >
                          <Switch
                            onChange={(event) =>
                              handleImageTourChange(event, res.id)
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
                        {res.image_type === "video" && (
                          <>
                            <div
                              class="col-md-9 formbox1"
                              style={{ marginTop: "10px" }}
                            >
                              <label style={{ marginRight: "35px" }}>
                                Sound ?
                                <span style={{ color: "#ffa12d" }}></span>
                              </label>
                            </div>
                            <div
                              class="col-md-3 formbox1"
                              style={{ marginTop: "7px" }}
                            >
                              <Switch
                                onChange={(event) =>
                                  handleTourVideoSound(event, res.id)
                                }
                                checked={res.video_music_type}
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
                            <div
                              class="col-md-9 formbox1"
                              style={{ marginTop: "10px" }}
                            >
                              <label style={{ marginRight: "35px" }}>
                                Include in MLS Tour ?
                                <span style={{ color: "#ffa12d" }}></span>
                              </label>
                            </div>
                            <div
                              class="col-md-3 formbox1"
                              style={{ marginTop: "7px" }}
                            >
                              <Switch
                                onChange={(event) =>
                                  handleChangeMls(event, res.id)
                                }
                                checked={res.enable_on_mls}
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
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id={"nav-profile" + res.id}
                      role="tabpanel"
                      aria-labelledby={"nav-profile-tab" + res.id}
                    >
                      <div class="row">
                        <div class="col-lg-4 col-md-4">
                          <div class="select_img_set_box_img">
                            <img src={res.imageurl} alt="" />
                            <i class="far fa-edit edit-btn"></i>
                          </div>
                        </div>
                        <div class="col-lg-8 col-md-8">
                          <div class="caption_setting">
                            <h6>Caption Setting</h6>
                          </div>
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <div class="socila_status_single cap_set">
                                <label>Font</label>
                                <select
                                  onChange={(event) =>
                                    handlefontTourChange(event, res.id)
                                  }
                                  value={res.tourfontstyle}
                                >
                                  <option
                                    value={"Georgia"}
                                    selected={
                                      res.tourfontstyle == "Georgia" ? true : ""
                                    }
                                  >
                                    Georgia
                                  </option>
                                  <option
                                    value={"Arial"}
                                    selected={
                                      res.tourfontstyle == "Arial" ? true : ""
                                    }
                                  >
                                    Arial
                                  </option>
                                  <option
                                    value={"Times New Roman"}
                                    selected={
                                      res.tourfontstyle == "Times New Roman"
                                        ? true
                                        : ""
                                    }
                                  >
                                    Times New Roman
                                  </option>
                                  <option
                                    value={"Verdana"}
                                    selected={
                                      res.tourfontstyle == "Verdana" ? true : ""
                                    }
                                  >
                                    Verdana
                                  </option>
                                  <option
                                    value={"Tahoma"}
                                    selected={
                                      res.tourfontstyle == "Tahoma" ? true : ""
                                    }
                                  >
                                    Tahoma
                                  </option>
                                </select>
                              </div>
                              <div class="socila_status_single cap_set">
                                <label>Size</label>
                                <select
                                  onChange={(event) =>
                                    handlefontSizeTourChange(event, res.id)
                                  }
                                  value={res.tourfontsize}
                                >
                                  <option value="22" selected="selected">
                                    22
                                  </option>
                                  <option value="24" selected="selected">
                                    24
                                  </option>
                                  <option value="26" selected="selected">
                                    26
                                  </option>
                                  <option value="28" selected="selected">
                                    28
                                  </option>
                                  <option value="30" selected="selected">
                                    30
                                  </option>
                                  <option value="32" selected="selected">
                                    32
                                  </option>
                                  <option value="34" selected="selected">
                                    34
                                  </option>
                                  <option value="36" selected="selected">
                                    36
                                  </option>
                                </select>
                              </div>
                              <div class="socila_status_single cap_set">
                                <label>Color</label>
                                <select
                                  onChange={(event) =>
                                    handleColorTourChange(event, res.id)
                                  }
                                  value={res.tourfontcolor}
                                >
                                  <option>Red</option>
                                  <option>green</option>
                                  <option>blue</option>
                                  <option>yellow</option>
                                  <option>cyan</option>
                                  <option>pink</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="caption_loc">
                            <div class="caption_setting">
                              <h6>Caption Location</h6>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2">
                          <div class="pre_tour_single">
                            <input
                              style={{ display: "none" }}
                              class="radio"
                              type="radio"
                              onChange={(event) => {
                                handleRadioChange(event, res.id);
                              }}
                              name={"caption" + res.id}
                              value="top"
                              id={"a" + res.id}
                              checked={
                                res.tourfontlocation === "top" ? true : false
                              }
                            />
                            <label id="lbl" for={"a" + res.id}>
                              <img src={up_img} />
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2">
                          <div class="pre_tour_single">
                            <input
                              class="radio"
                              type="radio"
                              onChange={(event) => {
                                handleRadioChange(event, res.id);
                              }}
                              name={"caption" + res.id}
                              value="center"
                              id={"b" + res.id}
                              checked={
                                res.tourfontlocation === "center" ? true : false
                              }
                            />
                            <label id="lbl" for={"b" + res.id}>
                              <img src={middle_img} />
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2">
                          <div class="pre_tour_single">
                            <input
                              class="radio"
                              type="radio"
                              onChange={(event) => {
                                handleRadioChange(event, res.id);
                              }}
                              name={"caption" + res.id}
                              value="bottom"
                              id={"c" + res.id}
                              checked={
                                res.tourfontlocation === "bottom" ? true : false
                              }
                            />
                            <label id="lbl" for={"c" + res.id}>
                              <img src={bottom_img} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 col-md-12">
                          <button
                            className="next_btn_apply_changes"
                            onClick={applyToAll.bind(this, res)}
                          >
                            Apply to all images
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div
                            class="tab-pane fade"
                            id={"nav-contact" + res.id}
                            role="tabpanel"
                            aria-labelledby={"nav-contact-tab" + res.id}
                          >
                            <div class="row">
                              <div class="col-lg-4 col-md-4">
                                <div class="select_img_set_box_img">
                                  <img src={res.imageurl} alt="" />
                                  <i class="far fa-edit edit-btn"></i>
                                </div>
                              </div>
                              <div class="col-lg-8 col-md-8">
                                <div class="caption_loc">
                                  <div class="caption_setting">
                                    <h6>
                                      Use Ken Burns Effects on This Image:{" "}
                                    </h6>
                                    <Switch
                                      onChange={(event) => {
                                        handleKenburnTourChange(event, res.id);
                                      }}
                                      checked={res.enablekenburns}
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
                            <hr class="brdr" />
                          </div> */}
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
                        {/* <a
                                class="nav-item last"
                                id={"nav-contact-tab" + res.id}
                                data-toggle="tab"
                                href={"#nav-contact" + res.id}
                                role="tab"
                                aria-controls={"nav-contact" + res.id}
                                aria-selected="false"
                              >
                                <i class="far fa-dot-circle"></i>
                              </a> */}
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr class="spacer10px"></hr>
        </div>
      </section>
      <Footer />
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
                      <button
                        onClick={updateAppliancesAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="contained"
                        color="#ffa12d"
                        className="next_btn"
                      >
                        Update
                      </button>
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
                      <button
                        onClick={updateInteriorAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                        className="next_btn"
                      >
                        Update
                      </button>
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
                      <button
                        onClick={updateExteriorAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                        className="next_btn"
                      >
                        Update
                      </button>
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
                      <button
                        onClick={updateCommunityAmenity}
                        startIcon={<SaveIcon />}
                        style={{ float: "right" }}
                        variant="outlined"
                        color="secondary"
                        className="next_btn"
                      >
                        Update
                      </button>
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
        open={openYoutubeModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional YouTube Links
          <CancelIcon
            onClick={() => setOpenYoutubeModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveYoutubeLink();
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #1</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl1"
                      value={youtubeLinkData.youtubeurl1}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption1"
                      value={youtubeLinkData.caption1}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #2</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl2"
                      value={youtubeLinkData.youtubeurl2}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption2"
                      value={youtubeLinkData.caption2}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #3</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl3"
                      value={youtubeLinkData.youtubeurl3}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption3"
                      value={youtubeLinkData.caption3}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #4</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl4"
                      value={youtubeLinkData.youtubeurl4}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption4"
                      value={youtubeLinkData.caption4}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #5</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl5"
                      value={youtubeLinkData.youtubeurl5}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption5"
                      value={youtubeLinkData.caption5}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 formbox1">
                    <label>You Tube link #6</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="youtubeurl6"
                      value={youtubeLinkData.youtubeurl6}
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 formbox1">
                    <label>Caption</label>
                    <input
                      type="text"
                      onChange={handleYoutubeLinkChange}
                      name="caption6"
                      value={youtubeLinkData.caption6}
                      class="form-control"
                    />
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
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openWalkthroughModal}
      >
        <DialogTitle id="customized-dialog-title">
          3D Walkthrough Home Tour
          <CancelIcon
            onClick={() => setOpenWalkThroughModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveWalkThrough();
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-md-12 formbox1">
                    <label>Embeded Code 1</label>
                    <textarea
                      onChange={handleWalkThroughChange}
                      name="code1"
                      rows="4"
                      value={walkthroughData.code1}
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="col-md-12 formbox1">
                    <label>Caption 1</label>
                    <input
                      type="text"
                      onChange={handleWalkThroughChange}
                      name="caption1"
                      value={walkthroughData.caption1}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 formbox1">
                    <label>Embeded Code 2</label>
                    <textarea
                      onChange={handleWalkThroughChange}
                      name="code2"
                      rows="4"
                      value={walkthroughData.code2}
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="col-md-12 formbox1">
                    <label>Caption 2</label>
                    <input
                      type="text"
                      onChange={handleWalkThroughChange}
                      name="caption2"
                      value={walkthroughData.caption2}
                      class="form-control"
                    />
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
        open={openCompanyBanner}
      >
        <DialogTitle id="customized-dialog-title">
          Company Banner
          <CancelIcon
            onClick={() => setOpenCompanyBanner(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <h6>Custom Banner</h6>
                    {customBannerImg === "" ? (
                      <img
                        src={defaultBanner}
                        alt=""
                        style={{ marginBottom: "10px" }}
                      />
                    ) : (
                      <img
                        src={customBannerImg}
                        alt=""
                        style={{
                          marginBottom: "10px",
                          width: "100%",
                          height: "80px",
                        }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <button
                      onClick={() => removeBanner()}
                      style={{
                        border: "#ffa124",
                        padding: "10px",
                        float: "right",
                        background: "#bbbbbb",
                        color: "#000",
                      }}
                      type="button"
                      class=""
                    >
                      Remove
                    </button>
                  </div>
                  <div class="col-lg-6 col-md-6 formbox1">
                    <h6>Offered Banners</h6>
                    {offeredBannerImg === "" ? (
                      <img
                        src={defaultBanner}
                        alt=""
                        style={{ marginBottom: "10px" }}
                      />
                    ) : (
                      <img
                        src={offeredBannerImg}
                        alt=""
                        style={{
                          marginBottom: "10px",
                          width: "100%",
                          height: "80px",
                        }}
                      />
                    )}

                    <select
                      value={headerImageId}
                      onChange={handleBannerChange}
                      class="form-control formbox1select"
                    >
                      <option value="0">None</option>
                      {allBanners.map((res) => (
                        <option value={res.id}>{res.imagename}</option>
                      ))}
                    </select>
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
        open={openNarrationModal}
      >
        <DialogTitle id="customized-dialog-title">
          Narration
          <CancelIcon
            onClick={() => setOpenNarrationModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="agent_pop_main">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <Recorder
                    record={true}
                    title={"New recording"}
                    // audioURL={Object.entries(value).length !== 0 && value.audioDetails.url}
                    // showUIAudio
                    handleAudioStop={(data) => handleAudioStop(data)}
                    handleOnChange={(value) => handleOnChange(value)}
                    handleAudioUpload={(data) => handleAudioUpload(data)}
                    handleCountDown={(data) => handleCountDown(data)}
                    // handleRest={() => handleRest()}
                    mimeTypeToUseWhenRecording={`audio/webm`}
                  />
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="row" style={{ margin: "70px 0px 60px 100px" }}>
                    <audio autoPlay controls src={currentAudio}>
                      <code>audio</code>
                    </audio>
                  </div>
                  <div class="row" style={{ margin: "70px 0px 60px 100px" }}>
                    <input
                      type="file"
                      onChange={handleAudioChange}
                      accept="audio/mp3,audio/*;capture=microphone"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 text-center">
                <button
                  onClick={() => UpdateTourAudio()}
                  style={{ border: "#ffa124" }}
                  type="submit"
                  class="need_pic save_btn"
                >
                  Update<i class="fas fa-arrow-right"></i>
                </button>
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
        open={openChangeOrderModal}
      >
        <DialogTitle className="umaModalTitle" id="customized-dialog-title">
          Change Order
          <CancelIcon
            onClick={() => setOpenChangeOrderModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
          <button
            className="next_btn"
            style={{ float: "right", marginRight: "20px" }}
            onClick={onChange}
          >
            Save
          </button>
        </DialogTitle>
        <DialogContent dividers>
          <DragAndDrop
            dragImages={dragImages}
            setDragImages={setDragImages}
            setIdsArray={setIdsArray}
          />
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
                            <a
                              target="_blank"
                              href={
                                distributeData && distributeData.facebookLink
                              }
                            >
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href={
                                distributeData && distributeData.twitterLink
                              }
                            >
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href={
                                distributeData && distributeData.shareArticle
                              }
                            >
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href={
                                distributeData && distributeData.pinitSharee
                              }
                            >
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
                                    value={
                                      distributeData &&
                                      distributeData.BrandedTourLink
                                    }
                                  />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <CopyToClipboard
                                    text={distributeData.BrandedTourLink}
                                  >
                                    <button class="next_btn">Copy</button>
                                  </CopyToClipboard>
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
                                    value={
                                      distributeData &&
                                      distributeData.n_BrandedTourLink
                                    }
                                  />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {" "}
                                  <CopyToClipboard
                                    text={distributeData.n_BrandedTourLink}
                                  >
                                    <button class="next_btn">Copy</button>
                                  </CopyToClipboard>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <div class="popup_tour_head">
                                            <h5>Video</h5>
                                        </div>
                                        <div class="socila_status">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="socila_status_single">
                                                        <label>Distribute Video</label>
                                                        <div class="switchToggle custom-control custom-switch">
                                                            <input type="checkbox" class="custom-control-input" id="customSwitch1114" />
                                                            <label class="custom-control-label" for="customSwitch1114">&nbsp;</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
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
                    <button
                      onClick={updateThemes}
                      type="button"
                      class="next_btn"
                    >
                      Save
                    </button>
                    <div class="app_preview mar_top">
                      <p>Use Premium Theme</p>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={
                            Object.keys(allThemes).length > 0 &&
                            allThemes.is_premium_theme === 1
                              ? true
                              : false
                          }
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
                    <div class="agent_pop_main_head padd_top">
                      <h5>Premium Tour Themes</h5>
                    </div>
                    <div class="pre_tour">
                      <div class="row">
                        {Object.keys(allThemes).length > 0 &&
                          allThemes.premiumArry.map((res) => (
                            <div class="col-lg-3 col-md-3 m-t-10">
                              <div class="pre_tour_single">
                                <input
                                  style={{ display: "none", cursor: "pointer" }}
                                  class="radio"
                                  type="radio"
                                  onChange={(event) => {
                                    handlePremiumRadioChange(event);
                                  }}
                                  name={"pre" + res.key}
                                  value={res.key}
                                  id={"a" + res.key}
                                  checked={
                                    allThemes.premium_tour_theme === res.key
                                      ? true
                                      : false
                                  }
                                />
                                <label id="lbl_pre" for={"a" + res.key}>
                                  <img
                                    style={{ cursor: "pointer" }}
                                    alt=""
                                    src={res.imageurl}
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div class="agent_pop_main_head padd_top">
                      <h5>Tour Themes</h5>
                    </div>
                    <div class="pre_tour">
                      <div class="row">
                        {Object.keys(allThemes).length > 0 &&
                          allThemes.datathemeArray.map((res) => (
                            <div
                              style={{ marginBottom: "30px" }}
                              class="col-lg-3 col-md-3"
                            >
                              <div class="pre_tour_single">
                                <input
                                  style={{ display: "none" }}
                                  class="radio"
                                  type="radio"
                                  onChange={(event) => {
                                    handleTourRadioChange(event);
                                  }}
                                  name={"tour" + res.themeId}
                                  value={res.themeId}
                                  id={"b" + res.themeId}
                                  checked={
                                    allThemes.themeid === res.themeId
                                      ? true
                                      : false
                                  }
                                />
                                <label id="lbl_pre" for={"b" + res.themeId}>
                                  <img
                                    style={{ cursor: "pointer" }}
                                    alt=""
                                    src={res.url}
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  onClick={updateThemes}
                  type="button"
                  class="next_btn"
                  data-dismiss=""
                >
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
              <div class="modal-header" style={{ display: "block" }}>
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
                      {viewerMenuData.length > 0
                        ? viewerMenuData.map((res) => (
                            <div class="col-lg-4 col-md-4">
                              <div class="app_preview">
                                <p style={{ marginLeft: "20px" }}>{res.name}</p>
                                <Switch
                                  onChange={(event) =>
                                    handleViewerChange(event, res)
                                  }
                                  checked={res.status}
                                  handleDiameter={17}
                                  offColor="#5D5D5D"
                                  onColor="#F6AD17"
                                  offHandleColor="#fff"
                                  onHandleColor="#fff"
                                  height={25}
                                  width={45}
                                  borderRadius={6}
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 13,
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
                                        fontSize: 13,
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
                          ))
                        : ""}
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Share</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {shareMenuData.length > 0
                        ? shareMenuData.map((res) => (
                            <div class="col-lg-4 col-md-4">
                              <div class="app_preview">
                                <p style={{ marginLeft: "20px" }}>{res.name}</p>
                                <Switch
                                  onChange={(event) =>
                                    handleShareChange(event, res)
                                  }
                                  checked={res.status}
                                  handleDiameter={17}
                                  offColor="#5D5D5D"
                                  onColor="#F6AD17"
                                  offHandleColor="#fff"
                                  onHandleColor="#fff"
                                  height={25}
                                  width={45}
                                  borderRadius={6}
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 13,
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
                                        fontSize: 13,
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
                          ))
                        : ""}
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Detail</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {detailMenuData.length > 0
                        ? detailMenuData.map((res) => (
                            <div class="col-lg-4 col-md-4">
                              <div class="app_preview">
                                <p style={{ marginLeft: "20px" }}>{res.name}</p>
                                <Switch
                                  onChange={(event) =>
                                    handleDetailChange(event, res)
                                  }
                                  checked={res.status}
                                  handleDiameter={17}
                                  offColor="#5D5D5D"
                                  onColor="#F6AD17"
                                  offHandleColor="#fff"
                                  onHandleColor="#fff"
                                  height={25}
                                  width={45}
                                  borderRadius={6}
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 13,
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
                                        fontSize: 13,
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
                          ))
                        : ""}
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Contact</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {contactMenuData.length > 0
                        ? contactMenuData.map((res) => (
                            <div class="col-lg-4 col-md-4">
                              <div class="app_preview">
                                <p style={{ marginLeft: "20px" }}>{res.name}</p>
                                <Switch
                                  onChange={(event) =>
                                    handleContactChange(event, res)
                                  }
                                  checked={res.status}
                                  handleDiameter={17}
                                  offColor="#5D5D5D"
                                  onColor="#F6AD17"
                                  offHandleColor="#fff"
                                  onHandleColor="#fff"
                                  height={25}
                                  width={45}
                                  borderRadius={6}
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 13,
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
                                        fontSize: 13,
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
                          ))
                        : ""}
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Tools</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {toolsMenuData.length > 0
                        ? toolsMenuData.map((res) => (
                            <div class="col-lg-4 col-md-4">
                              <div class="app_preview">
                                <p style={{ marginLeft: "20px" }}>{res.name}</p>
                                <Switch
                                  onChange={(event) =>
                                    handleToolsChange(event, res)
                                  }
                                  checked={res.status}
                                  handleDiameter={17}
                                  offColor="#5D5D5D"
                                  onColor="#F6AD17"
                                  offHandleColor="#fff"
                                  onHandleColor="#fff"
                                  height={25}
                                  width={45}
                                  borderRadius={6}
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 13,
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
                                        fontSize: 13,
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
                          ))
                        : ""}
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Tab Order</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div id="list2" class="row">
                      {menuOrders.length > 0
                        ? menuOrders.map((res) => (
                            <div
                              draggable={true}
                              onDragOver={(ev) => ev.preventDefault()}
                              onDragStart={() => handleDrag(res)}
                              onDrop={(event) => handleDrop(res)}
                              class="col-lg-3 col-md-3"
                            >
                              <div class="tab_sec_main_sec">
                                <i class="fas fa-home"></i>
                                <h6>{res.name}</h6>
                              </div>
                            </div>
                          ))
                        : ""}
                      {/* <div class="col-lg-3 col-md-3">
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
                                            </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => {
                    updateMenu();
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss=""
                >
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
                            <img src={agentPhoto} alt="" title="" />
                          </div>
                          <div class="agent_pop_tab_sec_single_cont uploadimage p-0">
                            <div class="custom-file" style={{ width: "40%" }}>
                              <input
                                onChange={handleAgentImageChange}
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
                              onClick={() => deleteAgentImage()}
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
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveAgentInfo();
                      }}
                    >
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>License No.</label>
                          <input
                            name="licenceno"
                            value={agentData.licenceno}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            First Name{" "}
                            <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            name="fname"
                            value={agentData.fname}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            Last Name{" "}
                            <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            name="lname"
                            value={agentData.lname}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                            required
                          />
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            Email <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            name="email"
                            value={agentData.email}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            Website <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            name="website"
                            value={agentData.website}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                            required
                          />
                        </div>
                        <div class="col-md-6 formbox1">
                          <div class="row">
                            <div class="col-md-6">
                              <label>
                                Mobile{" "}
                                <span style={{ color: "#ffa12d" }}>*</span>
                              </label>
                              <input
                                name="mobile"
                                value={agentData.mobile}
                                onChange={handleAgentChange}
                                type="text"
                                class="form-control"
                                required
                              />
                            </div>
                            <div class="col-md-6">
                              <label>
                                Office Phone{" "}
                                <span style={{ color: "#ffa12d" }}>*</span>
                              </label>
                              <input
                                name="officephone"
                                value={agentData.officephone}
                                onChange={handleAgentChange}
                                type="text"
                                class="form-control"
                                required
                              />
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
                          <input
                            name="companyname"
                            value={agentData.companyname}
                            onChange={handleAgentChange}
                            type="text"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>Agent Profile </label>
                          <textarea
                            name="profile"
                            value={agentData.profile}
                            onChange={handleAgentChange}
                            class="form-control"
                          ></textarea>
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>Credentials </label>
                          <textarea
                            name="credentials"
                            value={agentData.credentials}
                            onChange={handleAgentChange}
                            class="form-control"
                          ></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button type="submit" class="next_btn border-0">
                            UPDATE
                          </button>
                          <button
                            onClick={() => deleteAgent()}
                            type="button"
                            class="next_btn grey border-0"
                          >
                            REMOVE
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
                                      <span style={{ color: "red" }}>*</span>
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
                                      <span style={{ color: "red" }}>*</span>
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
                                      <span style={{ color: "red" }}>*</span>
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
        <div id="bg_music" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style={{ display: "block !important" }}>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Background Music<i class="fab fa-wpforms"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <div class="row">
                      <div
                        class="col-md-6"
                        style={{ height: "500px", overflowX: "scroll" }}
                      >
                        <ul style={{ display: "grid" }}>
                          <li style={{ margin: "10px" }}>
                            {" "}
                            <input
                              type="radio"
                              id="m0"
                              value="null"
                              onclick="play_this(this.id)"
                              name="mus"
                            />
                            <label style={{ marginLeft: "20px" }} for="m0">
                              {" "}
                              None{" "}
                            </label>{" "}
                          </li>
                          {musicData && musicData.all_music
                            ? musicData.all_music.map((res) => (
                                <li style={{ margin: "10px" }}>
                                  <input
                                    type="radio"
                                    onClick={() => handleMusicChange(res)}
                                    name="mus"
                                    value="Above_and_Beyond_full_mix"
                                    checked={
                                      currentMusic.musicid === res.musicid
                                    }
                                  />
                                  <label
                                    style={{ marginLeft: "20px" }}
                                    for="Above_and_Beyond_full_mix.mp3"
                                  >
                                    {res.caption}
                                  </label>
                                </li>
                              ))
                            : ""}
                        </ul>
                      </div>
                      <div
                        class="col-md-6"
                        style={{
                          margin: "150px auto",
                          display: "block",
                          left: "150px",
                        }}
                      >
                        <audio autoPlay controls src={music}>
                          <code>audio</code>
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  onClick={updateMusicData}
                  type="button"
                  class="btn btn-default"
                  data-dismiss=""
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="agent_pop">
        <div id="open_house" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Open House Announcements<i class="fab fa-wpforms"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <h6>Create Announcements</h6>
                    <hr class=""></hr>
                    <div class="row">
                      <div class="col-md-4 formbox1">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Date"
                              value={announcementData.announcedate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div class="col-md-4 formbox1">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="From"
                              value={announcementData.fromtime_h}
                              onChange={handleFromChange}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                              error={false}
                              helperText=""
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div class="col-md-4 formbox1">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="To"
                              value={announcementData.totime_h}
                              onChange={handleToChange}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                              error={false}
                              helperText=""
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        {editing ? (
                          <button
                            onClick={updateAnnouncement}
                            style={{ float: "right" }}
                            type="button"
                            class="next_btn border-0 mr-1"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            onClick={saveAnnouncement}
                            style={{ float: "right" }}
                            type="button"
                            class="next_btn border-0 mr-1"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                    <h6>Announcements</h6>
                    <hr class=""></hr>
                    {announcements.length > 0 ? (
                      <table
                        id="announcementTable"
                        class="table table-bordered"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <b>Announce date</b>
                            </td>
                            <td>
                              <b>From</b>
                            </td>
                            <td>
                              <b>To</b>
                            </td>
                            <td>
                              <b>Action</b>
                            </td>
                          </tr>
                          {announcements.map((res) => (
                            <tr>
                              <td valign="top">
                                {dateFormat(res.announcedate, "mm-dd-yyyy")}
                              </td>
                              <td valign="top">
                                {res.fromtime + " " + res.fromampm}
                              </td>
                              <td valign="top">
                                {res.totime + " " + res.toampm}
                              </td>
                              <td valign="top">
                                <Button
                                  style={{ padding: "4px" }}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => editAnnouncement(res)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  style={{ marginLeft: "10px", padding: "4px" }}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => deleteAnnouncement(res)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveNewsLetter();
                      }}
                    >
                      <div class="row">
                        <div class="col-md-12 formbox1">
                          <label>
                            Forms<span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <textarea
                            onChange={handleNewsChange}
                            name="text"
                            class="form-control"
                            rows="5"
                            value={newsLetterData.text}
                          >
                            {newsLetterData.text}
                          </textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button type="submit" class="next_btn border-0 mr-1">
                            Save
                          </button>
                          <button
                            type="button"
                            class="next_btn grey border-0"
                            onClick={() =>
                              setNewsLetterData(initialNewsLetterData)
                            }
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </form>
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
        <div id="facebook" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Post to Facebook<i class="fab fa-wpforms"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="browse_img">
                  <div class="browse_img_conts_main">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        //saveNewsLetter();
                      }}
                    >
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-body">
                              If you are a Macintosh User, please log in to your
                              Facebook account first, then click on "Continue"
                              button below.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button
                            onClick={facebookLoginLink}
                            class="next_btn border-0 mr-1"
                          >
                            Continue
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
                              target="_blank"
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
                              target="_blank"
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
                              target="_blank"
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
                              target="_blank"
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
                              target="_blank"
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
    </>
  );
});
export default AgentEditTour;
