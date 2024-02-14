/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import banner from "../../../images/vtc-banner.jpg";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FacebookProvider, Share } from "react-facebook";
import Dropzone from "react-dropzone";
import man from "../../../images/man.png";
import up_img from "../../../images/up.png";
import middle_img from "../../../images/middle.png";
import bottom_img from "../../../images/bottom.png";
import Switch from "react-switch";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import dateFormat from "dateformat";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Recorder } from "react-voice-recorder";
const APIGetFloorList = APIURL() + "edit-floor-Plans";
const APIUpdateMenu = APIURL() + "update-menu";
const APIUpdateBgMusic = APIURL() + "update-music";
const APIGetProperty = APIURL() + "edit-property";
const APIUpdateProperty = APIURL() + "update-property-info";
const APIGetAmenities = APIURL() + "get-amenities";
const APIRemoveAmenities = APIURL() + "remove-amenities";
const APISaveAmenities = APIURL() + "save-amenities";
const APIUpdateAmenity = APIURL() + "update-amenity";
const APISaveAnnouncement = APIURL() + "save-announcement";
const APIDeleteAnnouncement = APIURL() + "delete-announcement";
const APIGetAnnouncement = APIURL() + "load-announcement";
const APISaveNewsLetter = APIURL() + "add-newsLetter";
const APIGetThemes = APIURL() + "get-themes";
const APIUpdateThemes = APIURL() + "update-themes";
const APISaveCompanyBanner = APIURL() + "save-company-banner";
const APIDeleteTourImage = APIURL() + "delete-tour-image";
const APIGetOfferedBanners = APIURL() + "get-flyerheader-details";
const APIGetCoAgentInfo = APIURL() + "coagent-info";
const APIAddCoAgent = APIURL() + "add-coagent";
const APIDeleteCoAgent = APIURL() + "delete-coagent";
const APIDeleteAgentImage = APIURL() + "delete-tour-image";
const APISaveYoutubeLinks = APIURL() + "save-youtube-links";
const APISaveWalkThrough = APIURL() + "save-walk-through";
const APIGetTourAudio = APIURL() + "get-AudioFile";
const APIUpdateAudio = APIURL() + "add-AudioFile";
const APIGetTourDetails = APIURL() + "tour-details";
const APIDistributeTour = APIURL() + "distribute-tour";
const APIGetDocumentDatas = APIURL() + "edit-property";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetBgMusic = APIURL() + "back-ground-music";
const APIDeleteDocument = APIURL() + "delete-document";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function EditFloorPlan(props) {
  const tour_id = props.match.params.tourid;
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
  const initialNewsLetterData = {
    text: "",
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
  const initialWalkthroughData = {
    code1: "",
    code2: "",
    caption1: "",
    caption2: "",
  };
  let history = useHistory();
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [floorPlanData, setFloorPlandata] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [contactMenuData, setContactMenuData] = useState([]);
  const [detailMenuData, setDetailMenuData] = useState([]);
  const [shareMenuData, setShareMenuData] = useState([]);
  const [toolsMenuData, setToolsMenuData] = useState([]);
  const [viewerMenuData, setViewerMenuData] = useState([]);
  const [checkdMenu, setCheckedMenu] = useState([]);
  const [allMenuData, setAllMenuData] = useState([]);
  const [menuOrders, setMenuOrders] = useState([]);
  const [firstOrder, setFirstOrder] = useState({});
  const [sync, setSync] = useState(true);
  const [musicData, setMusicData] = useState(initialMusicState);
  const [music, setMusic] = useState("");
  const [currentMusic, setCurrentMusic] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [openAmenityModal, setOpenAmenityModal] = useState(false);
  const [allAmenities, setAllAmenities] = useState({});
  const [appliancesAmenities, setAppliancesAmenities] = useState([]);
  const [communityAmenities, setCommunityAmenities] = useState([]);
  const [interiorAmenities, setInteriorAmenities] = useState([]);
  const [exteriorAmenities, setExteriorAmenities] = useState([]);
  const [amenityData, setAmenityData] = useState({});
  const [announcementData, setAnnouncementData] = useState(
    initialAnnouncementState
  );
  const [editing, setEditing] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedFrom, setSelectedFrom] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedTo, setSelectedTo] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [announcements, setAnnouncements] = useState([]);
  const [newsLetterData, setNewsLetterData] = useState({
    initialNewsLetterData,
  });
  const [allThemes, setAllThemes] = useState({});
  const [openCompanyBanner, setOpenCompanyBanner] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [customBannerImg, setCustomBannerImg] = useState("");
  const [defaultBanner, setDefaultBanner] = useState("");
  const [offeredBannerImg, setOfferedBannerImg] = useState("");
  const [headerImageId, setHeaderImageId] = useState("");
  const [allBanners, setAllBanners] = useState([]);
  const [agentData, setAgentData] = useState({});
  const [agentPhoto, setAgentPhoto] = useState({});
  const [openYoutubeModal, setOpenYoutubeModal] = useState(false);
  const [youtubeLinkData, setYoutubeLinkData] = useState({});
  const [walkthroughData, setWalkthroughData] = useState(
    initialWalkthroughData
  );
  const [openWalkthroughModal, setOpenWalkThroughModal] = useState(false);
  const [narrationData, setNarrationData] = useState({});
  const [openNarrationModal, setOpenNarrationModal] = useState(false);
  const [currentAudio, setCurrentAudio] = useState("");
  const [value, setValue] = useState(initialVoiceData);
  const [openFloorModal, setOpenFloorModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [themeId, setThemeId] = useState("");
  const [defaultsThemeId, setDefaultsThemeId] = useState("");
  const [isPremium, setIsPremium] = useState("");
  const [distributeData, setDistributeData] = useState({});
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [totalDivs, setTotalDivs] = useState([]);
  const [open, setOpen] = useState(false);
  const [documentData, setDocumentData] = useState([]);

  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
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
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: tour_id,
      };
      postRecord(APIGetFloorList, objusr).then((res) => {
        console.log(res.data[0].response);
        if (res.data[0].response.status === "success") {
          setFloorPlandata(res.data[0].response.data);
          if (res.data[0].response.data.model.length > 0) {
            setCurrentImage(res.data[0].response.data.model[0].file_path);
          }
        }
      });
    }
  }, [context.state.user, tour_id]);
  useEffect(() => {
    if (Object.keys(floorPlanData).length > 0) {
      window.scroll({
        top: 700,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [floorPlanData]);
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
  const viewtour = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        if (res.data[0].response.tourdetails.isactive === 0) {
          window.open(
            APIPath() + "agent-video-non-active/" + tour_id,
            "_blank"
          );
          // window.location.href = APIPath() + "agent-video-non-active/" + tour_id;
        } else {
          setThemeId(res.data[0].response.tourdetails.premium_tour_theme);
          setIsPremium(res.data[0].response.tourdetails.is_premium_theme);
          setDefaultsThemeId(res.data[0].response.tourdetails.themeid);
        }
      }
    });
  };
  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (themeId === 1) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 2) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 3) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 4) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setThemeId("");
      } else if (themeId === 5) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setThemeId("");
      }
    }
  }, [themeId, context.state.user, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (defaultsThemeId && isPremium === 0) {
        window.open("https://www.virtualtourcafe.com/tour/" + tour_id, "_blank");
        setDefaultsThemeId("");
      }
    }
  }, [context.state.user, tour_id, isPremium, defaultsThemeId]);
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
        type: "imageset",
      };
      postRecord(APIGetProperty, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setPropertyData(res.data[0].response.data.toData);
        }
      });
    }
  }, [sync, context.state.user, tour_id]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleApplianceChange = (event, amenity) => {
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
      postRecord(APIGetOfferedBanners, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllBanners(res.data[0].response.flyerdetails);
          setDefaultBanner(res.data[0].response.defaulturl);
          setHeaderImageId(res.data[0].response.headerimageid);
          setCustomBannerImg("");
          setCustomBannerImg(res.data[0].response.bannerimg);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  const handleEditTour = () => {
    history.push(APIPath() + "agent-edit-tour/" + tour_id);
  };
  const handleEditImageset = () => {
    history.push(APIPath() + "edit-image-set/" + tour_id);
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
  const handleDrag = (data) => {
    setFirstOrder(data);
  };
  const handleMusicChange = (data) => {
    setMusic(data.path);
    setCurrentMusic(data);
    // musicData.musicid = data.musicid;
  };
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name == "caption"){
      setPropertyData({ ...propertyData, caption: value,widgetcaption:value });
    }
    else
    setPropertyData({ ...propertyData, [name]: value });
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
  const handleAmenityChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const handleDrop = (data) => {
    for (var i = 0; i < menuOrders.length; i++) {
      // if (menuOrders[i].name === data.name) {
      //     console.log(menuOrders[i].order);
      //     console.log(firstOrder.order);
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
    //         console.log(firstOrder);
    //         console.log(data);
    //         res.order = data.order;
    //     }
    // });
    // console.log(menuOrders);
  };
  function getIndex(value, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  }

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
  const updateMusicData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tour_id,
      musicid: currentMusic.musicid,
    };
    // console.log(obj);
    postRecord(APIUpdateBgMusic, obj)
      .then((res) => {
        // console.log(res.data[0]);
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
  const savePropertyDescription = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = tour_id;
    propertyData.tab_index = "1";
    postRecord(APIUpdateProperty, propertyData)
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
  const savePropertyFeatures = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = tour_id;
    propertyData.tab_index = "2";
    postRecord(APIUpdateProperty, propertyData)
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
  const savePropertyPrice = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = tour_id;
    propertyData.tab_index = "3";
    postRecord(APIUpdateProperty, propertyData)
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
  const savePropertyLocation = () => {
    setOpen(true);
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = tour_id;
    propertyData.tab_index = "4";
    postRecord(APIUpdateProperty, propertyData)
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
  const removeAmenity = (id) => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.agent_id = JSON.parse(context.state.user).agentId;
    amenityData.tourId = tour_id;
    amenityData.amenityId = id;
    postRecord(APIRemoveAmenities, amenityData)
      .then((res) => {
        //console.log(res);
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
  const addNewAmenity = (type) => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.agent_id = JSON.parse(context.state.user).agentId;
    amenityData.tourId = tour_id;
    amenityData.type = type;
    postRecord(APISaveAmenities, amenityData)
      .then((res) => {
        //console.log(res);
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
        //console.log(res);
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
        //console.log(res);
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
        //console.log(res);
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

  const handleApplChange = (event, amenity) => {
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
    // console.log(announcementData);
    postRecord(APISaveAnnouncement, announcementData)
      .then((res) => {
        //console.log(res);
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
    setOpen(true);
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const updateAnnouncement = () => {
    setOpen(true);
    //console.log(announcementData);
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
        //console.log(res.data[0]);
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
  const saveNewsLetter = () => {
    setOpen(true);
    newsLetterData.authenticate_key = "abcd123XYZ";
    newsLetterData.agent_id = JSON.parse(context.state.user).agentId;
    newsLetterData.tourId = tour_id;
    postRecord(APISaveNewsLetter, newsLetterData)
      .then((res) => {
        //console.log(res);
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
  const handleNewsChange = (event) => {
    const { name, value } = event.target;
    setNewsLetterData({ ...newsLetterData, [name]: value });
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
        setSync(true);
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleCheckboxChange = (event) => {
    if (event.target.checked === true) {
      setAllThemes({ ...allThemes, ["is_premium_theme"]: 1 });
    } else {
      setAllThemes({ ...allThemes, ["is_premium_theme"]: 0 });
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
  const saveCompanyBanner = () => {
    setOpen(true);
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.agent_id = JSON.parse(context.state.user).agentId;
    bannerData.tourId = tour_id;
    if (bannerData.image !== "") {
      bannerData.header = 0;
    }
    //console.log(bannerData);
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
        //console.log(res);
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
  const handleImageChange = (event) => {
    setBannerData({ ...bannerData, image: event.target.files });
    setCustomBannerImg(URL.createObjectURL(event.target.files[0]));
    setHeaderImageId(0);

    //setBannerData({ ...bannerData, "header": 0 });
  };
  const handleBannerChange = (event) => {
    setHeaderImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, image: "" });
  };
  const removeBanner = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
      folder: "companybanner",
      defalutImage: "default-banner.jpg",
    };
    //console.log(obj);
    postRecord(APIDeleteTourImage, obj)
      .then((res) => {
        //console.log(res);
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
  const deleteAgent = () => {
    setOpen(true);
    agentData.authenticate_key = "abcd123XYZ";
    agentData.agent_id = JSON.parse(context.state.user).agentId;
    agentData.tourId = tour_id;
    agentData.coagentid = agentData.id;
    //console.log(agentData);
    postRecord(APIDeleteCoAgent, agentData)
      .then((res) => {
        //console.log(res);
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
  const deleteAgentImage = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: tour_id,
      folder: "coagentphoto",
      defalutImage: "nophoto.jpg",
    };
    //console.log(obj);
    postRecord(APIDeleteAgentImage, obj)
      .then((res) => {
        //console.log(res);
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
  const handleAgentChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value });
  };
  const handleAgentImageChange = (event) => {
    setAgentData({ ...agentData, photo: event.target.files });
    setAgentPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const handleYoutubeLinkChange = (event) => {
    const { name, value } = event.target;
    setYoutubeLinkData({ ...youtubeLinkData, [name]: value });
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
        //console.log(res);
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
  const saveYoutubeLink = () => {
    setOpen(true);
    youtubeLinkData.authenticate_key = "abcd123XYZ";
    youtubeLinkData.agent_id = JSON.parse(context.state.user).agentId;
    youtubeLinkData.tourId = tour_id;
    postRecord(APISaveYoutubeLinks, youtubeLinkData)
      .then((res) => {
        //console.log(res.data[0]);
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
    // console.log(walkthroughData);
    postRecord(APISaveWalkThrough, walkthroughData)
      .then((res) => {
        // console.log(res.data[0]);
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
  const handleWalkThroughChange = (event) => {
    const { name, value } = event.target;
    setWalkthroughData({ ...walkthroughData, [name]: value });
  };
  const UpdateTourAudio = () => {
    setOpen(true);
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
    // postRecord(APIUpdateAudio, formData)
    //     .then(res => {
    //         console.log(res.data[0])
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
  const handleOnChange = (val, fname) => {};
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    //console.log(file)
  };
  const handleImageSubmit = (files, allFiles) => {
    setOpen(true);
    floorPlanData.imageArr = uploadedImages;
    floorPlanData.authenticate_key = "abcd123XYZ";
    floorPlanData.agent_id = JSON.parse(context.state.user).agentId;
    floorPlanData.tourId = tour_id;
    const formData = new FormData();
    for (let i in floorPlanData) {
      if (i === "imageArr") {
        for (let file of floorPlanData[i]) {
          formData.append("imageArr[]", file);
        }
      } else {
        formData.append(i, floorPlanData[i]);
      }
    }
    axios
      .post(APIURL() + `add-floor-plans`, formData, {})
      // .post("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/add-floor-plans", formData, {})
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
          setOpenFloorModal(false);
          setUploadedImages([]);
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
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
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
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li>
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
                    <li class="">
                      <Link to={APIPath() + "agent-support"}>Support</Link>
                    </li>
                  </ul>
                  <div class="gee_mobile">
                    <button onClick={() => ShowMenu()} class="gee_hamburger">
                      &#9776;
                    </button>
                    <button onClick={() => HideMenu()} class="gee_cross">
                      &#735;
                    </button>
                  </div>
                </div>
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
          <h2>Edit Floor Plan</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
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
                        <i class="fas fa-cog"></i> Actions
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
                              onClick={() => handleEditTour()}
                            >
                              <i class="far fa-image"></i> Back to Tour Images
                            </a>
                          </li>
                          
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenFloorModal(true)}
                            >
                              <i class="fas fa-plus"></i> Add Floor Plans
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={() => viewtour()}>
                              <i class="fas fa-eye"></i> View Tour
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#Distributetour"
                            >
                              <i class="fas fa-table"></i> Distribute Tour
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#facebook"
                            >
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
                              href="#"
                              data-toggle="modal"
                              data-target="#menu_opt"
                            >
                              <i class="fas fa-bars"></i> Menu Options
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#bg_music"
                            >
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
                              href="#"
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
                              <i class="fas fa-sticky-note"></i> Amenities{" "}
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#open_house"
                            >
                              <i class="fas fa-warehouse"></i> Open House
                              Announcements{" "}
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#Newsletter"
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
                              href="#"
                              data-toggle="modal"
                              data-target="#themes"
                            >
                              <i class="fas fa-gopuram"></i> Themes
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => setOpenCompanyBanner(true)}
                            >
                              <i class="fas fa-building"></i> Company Banner
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#agent_pop_tab"
                            >
                              <i class="fas fa-user"></i> Co-listing agent
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleFloorPlan}>
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
                              <i class="fas fa-photo-video"></i> Panoramas
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleSlideShow}>
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
              {/* <div class="action_sec_main">
                                <div class="action_sec_left action_sec_tab">
                                    <ul class="nav nav-tabs list_sec" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#Actions_tab" role="tab"><i class="fas fa-cog"></i>Actions</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#Basic" role="tab"><i class="fas fa-line-height"></i>Basic</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#Advanced" role="tab"><i class="fas fa-hand-point-right"></i>Advanced</a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
            </div>
          </div>
          {/* <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="tab-content">
                                <div class="tab-pane active" id="Actions_tab" role="tabpanel">
                                    <div class="property_info_cont agent_img_sets" id="demo">
                                        <section class="snap-scrolling-example">
                                            <div class="horizontal-images tabscroll-windows">
                                                <ul class="list_sec">
                                                    <li class="">
                                                        <a onClick={() => handleEditTour()}>
                                                            <span><i class="far fa-image"></i></span>
                                                            Back to Tour Images
                                                        </a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => handleEditImageset()}>
                                                            <span><i class="far fa-image"></i></span>
                                                            Go to related ImageSet
                                                        </a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => setOpenFloorModal(true)}>
                                                            <span><i class="fas fa-plus"></i></span>Add Floor Plans</a>
                                                    </li>

                                                    <li class="">
                                                        <a onClick={() => viewtour()}><span><i class="fas fa-eye"></i></span>View Tour</a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#Distributetour"><span><i class="fas fa-table"></i></span>Distribute Tour</a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#facebook"><span><i class="fab fa-facebook-f"></i></span>Post to Facebook</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div class="tab-pane" id="Basic" role="tabpanel">
                                    <div class="property_info_cont agent_img_sets" id="demo">
                                        <section class="snap-scrolling-example">
                                            <div class="horizontal-images tabscroll-windows">
                                                <ul class="list_sec">
                                                    <li class="">
                                                        <a class="" href="#" data-toggle="modal" data-target="#menu_opt">
                                                            <span><i class="fas fa-bars"></i></span>
                                                            Menu Options
                                                        </a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#bg_music"><span><i class="fas fa-music"></i></span> Background Music</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => setOpenNarrationModal(true)}><span><i class="fas fa-torii-gate"></i></span>Tour Narration </a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#Property"><span><i class="fas fa-home"></i></span>Property Information </a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => setOpenAmenityModal(true)}><span><i class="fas fa-sticky-note"></i></span> Amenities</a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#open_house"><span><i class="fas fa-warehouse"></i></span>Open House Announcements</a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#Newsletter"><span><i class="fab fa-wpforms"></i></span>Add Newsletter Form</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div class="tab-pane" id="Advanced" role="tabpanel">
                                    <div class="property_info_cont agent_img_sets" id="demo">
                                        <section class="snap-scrolling-example">
                                            <div class="horizontal-images tabscroll-windows">
                                                <ul class="list_sec">
                                                    <li class="">
                                                        <a class="" href="#" data-toggle="modal" data-target="#themes">
                                                            <span><i class="fas fa-gopuram"></i></span>
                                                            Themes
                                                        </a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => setOpenCompanyBanner(true)}><span><i class="fas fa-building"></i></span> Company Banner</a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#" data-toggle="modal" data-target="#agent_pop_tab"><span><i class="fas fa-user"></i></span>Co-listing agent </a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={handleFloorPlan}><span><i class="fas fa-ruler-horizontal"></i></span>Floor Plans</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={handleEditFloor}><span><i class="fas fa-wifi"></i></span>Floor-plan Hot-spot</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={handlePanorama}><span><i class="fas fa-photo-video"></i></span>Panoramas</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={handleSlideShow}><span><i class="fas fa-sliders-h"></i></span>Slide-Show Editor</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => { setOpenYoutubeModal(true) }}><span><i class="fab fa-youtube"></i></span>Additional YouTube Links</a>
                                                    </li>
                                                    <li class="">
                                                        <a onClick={() => { setOpenWalkThroughModal(true) }}><span><i class="fas fa-home"></i></span>3D Walkthrough Home Tour</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="test_sec">
                <div class="test_sec_left"></div>
              </div>
            </div>
          </div>
          <div class="row" style={{ paddingTop: "20px" }}>
            <div class="col-lg-12 col-md-12">
              {currentImage ? (
                <img
                  style={{
                    margin: "0 auto",
                    display: "block",
                    height: "400px",
                  }}
                  src={currentImage}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            <div class="col-lg-12 col-md-12">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Floor Plans
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div class="row">
                    {Object.keys(floorPlanData).length > 0
                      ? floorPlanData.model.map((res) => (
                          <div class="col-lg-3 col-md-3">
                            <img
                              onClick={() => setCurrentImage(res.file_path)}
                              style={{
                                marginBottom: "20px",
                                cursor: "pointer",
                              }}
                              src={res.file_path}
                              alt=""
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Tour Images
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div class="row">
                    {Object.keys(floorPlanData).length > 0
                      ? floorPlanData.tourImages.map((res) => (
                          <div class="col-lg-3 col-md-3">
                            <img
                              onClick={() => setCurrentImage(res.file_path)}
                              style={{
                                marginBottom: "20px",
                                cursor: "pointer",
                              }}
                              src={res.file_path}
                              alt=""
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Panoramas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div class="row">
                    {Object.keys(floorPlanData).length > 0
                      ? floorPlanData.panoramImages.map((res) => (
                          <div class="col-lg-3 col-md-3">
                            <img
                              onClick={() => setCurrentImage(res.file_path)}
                              style={{
                                marginBottom: "20px",
                                cursor: "pointer",
                              }}
                              src={res.file_path}
                              alt=""
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </AccordionDetails>
              </Accordion>
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
                        {viewerMenuData.length > 0
                          ? viewerMenuData.map((res) => (
                              <div class="col-lg-4 col-md-4">
                                <div class="app_preview">
                                  <p style={{ marginLeft: "20px" }}>
                                    {res.name}
                                  </p>
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
                                  <p style={{ marginLeft: "20px" }}>
                                    {res.name}
                                  </p>
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
                                  <p style={{ marginLeft: "20px" }}>
                                    {res.name}
                                  </p>
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
                                  <p style={{ marginLeft: "20px" }}>
                                    {res.name}
                                  </p>
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
                                  <p style={{ marginLeft: "20px" }}>
                                    {res.name}
                                  </p>
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
                      <div class="row">
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
          <div id="bg_music" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div
                  class="modal-header"
                  style={{ display: "block !important" }}
                >
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <select
                                      type="text"
                                      onChange={handleInputChange}
                                      name="pricetype"
                                      value={propertyData.pricetype}
                                      class="form-control formbox1select"
                                    >
                                     <option value="USD">USD</option>
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
                                      onChange={handleInputChange}
                                      name="price"
                                      value={propertyData.price}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      FLEXIBILITY{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <select
                                      name="countryid"
                                      value={propertyData.countryid}
                                      onChange={handleInputChange}
                                      class="form-control formbox1select"
                                    >
                                      <option value="0">Select Country</option>
                                      {allCountries.map((res) => (
                                        <option value={res.id}>
                                          {res.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      STATE{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
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
                                      <td style={{ fontSize: "12px" }}>
                                        Sl.no
                                      </td>
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
                                      <td style={{ fontSize: "12px" }}>
                                        Action
                                      </td>
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
                                        <span
                                          style={{ color: "#ffa12d" }}
                                        ></span>
                                      </label>
                                      <Switch
                                        readOnly
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
                                      {/* <span>{documentImageData["name" + index]}</span> */}
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
                                      handleApplianceChange(event, res);
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
                                format="dd/MM/yyyy"
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
                                  {dateFormat(res.announcedate, "dd-mm-yyyy")}
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
                                    style={{
                                      marginLeft: "10px",
                                      padding: "4px",
                                    }}
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
                              value={newsLetterData.text}
                              name="text"
                              class="form-control"
                              rows="5"
                            ></textarea>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <button
                              type="submit"
                              class="next_btn border-0 mr-1"
                            >
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
                              <div class="col-lg-3 col-md-3">
                                <div class="pre_tour_single">
                                  <input
                                    style={{
                                      display: "none",
                                      cursor: "pointer",
                                    }}
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
                  <button type="button" class="btn btn-default" data-dismiss="">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 formbox1">
                            <label>
                              Website{" "}
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              name="website"
                              value={agentData.website}
                              onChange={handleAgentChange}
                              type="text"
                              class="form-control"
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
          open={openFloorModal}
        >
          <DialogTitle id="customized-dialog-title">
            Add Floor plans
            <CancelIcon
              onClick={() => setOpenFloorModal(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <div class="container">
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
                    <button
                      onClick={handleImageSubmit}
                      type="button"
                      class="next_btn"
                      data-dismiss=""
                      style={{ float: "right" }}
                    >
                      Save
                    </button>
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
                                    {" "}
                                    <button class="next_btn">Copy</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p>Multple Listng Service (MLS)</p>
                          <div class="table_sec">
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
                                  <button class="next_btn">Copy</button>
                                </td>
                              </tr>
                            </tbody>
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
                                If you are a Macintosh User, please log in to
                                your Facebook account first, then click on
                                "Continue" button below.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <FacebookProvider appId="1016898119220556">
                              <Share href="http://www.facebook.com">
                                {({ handleClick, loading }) => (
                                  <button
                                    type="button"
                                    class="next_btn border-0 mr-1"
                                    disabled={loading}
                                    onClick={handleClick}
                                  >
                                    Share
                                  </button>
                                )}
                              </Share>
                            </FacebookProvider>
                            {/* <button class="next_btn border-0 mr-1">Continue</button> */}
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
      </section>
      <Footer />
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
