import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import $ from "jquery";
import AddIcon from "@material-ui/icons/Add";
import { confirmAlert } from "react-confirm-alert";
import banner from "../../../images/vtc-banner.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import dateFormat from "dateformat";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import custom_theme from "../../../images/Flyerimages/custom_theme.jpg";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { id } from "date-fns/locale";
import { active } from "sortablejs";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CsvFiledownloader from "../../../components/CsvfileDownload/CsvFiledownloader";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import axios from "axios";
const APIGetProperty = APIURL() + "edit-property";
const APIUpdateProperty = APIURL() + "update-property-info";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetTheme = APIURL() + "get-Theme-Flyers";
const APISaveFlyerTheme = APIURL() + "save-flyers-theme";
const APIGetCustomizeThemeFlyer = APIURL() + "get-customizeThemeFlyers";
const APIUpdateFlyerTemplate = APIURL() + "update-FlyerTemplate";
const APIDeleteFlyerTemplate = APIURL() + "delete-Template";
const APICloneFlyerTemplate = APIURL() + "clone-Template";
const APIGetFirstThemeFlyer = APIURL() + "getFirst-Theme-Flyers";
const APIGetSecondThemeFlyer = APIURL() + "getSecond-Theme-Flyers";
const APIGetTourDetails = APIURL() + "tour-details";
const APILoadCraigList = APIURL() + "load-craiglist-modal";
const APIEditImageSecondDropdownThemeFlyers =
  APIURL() + "listImage-Theme-Flyers";
const APIgetCustomThemeFlyers = APIURL() + "get-Custom-Theme-Flyers";
const APIUpdateCustomFlyerTemplate = APIURL() + "update-Custom-FlyerTemplate";
const APISendFlyerMail = APIURL() + "send-flyer-mail";
const APIGetDocumentDatas = APIURL() + "edit-property";
const APIDeleteDocument = APIURL() + "delete-document";
const APIDownloadFlyerData = APIURL() + "download-flyer";
const DownloadPdf = APIURL() + "generatePdf";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function EditFlyerTheme(props) {
  const imageset_id = props.match.params.flyerid;
  const Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);
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
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);
  const initialEmailValue = {
    currentEmail: {
      emails: "",
    },
  };
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [propertyData, setPropertyData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [image, setImage] = useState(custom_theme);
  const [themeImage, setThemeImage] = useState("");
  const [expanded, setExpanded] = React.useState("panel1");
  const [themeData, setThemeData] = useState({});
  const [editFlyerThemeData, setEditFlyerThemeData] = useState({});
  const [editFlyerDesigner, setEditFlyerDesigner] = useState(false);
  const [cloneFlyerDesigner, setCloneFlyerDesigner] = useState(false);
  const [deleteFlyerDesigner, setDeleteFlyerDesigner] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [smallWidth, setSmallWidth] = React.useState("sm");
  const [mediumWidth, setMedimWidth] = React.useState("md");
  const [customEditFlyThemeData, setCustomEditFlythemeData] = useState({});
  const [secondThemeData, setSecondthemeData] = useState([]);
  const [flyerId, setFlyerId] = useState({});
  const [flyerImage, setFlyerImage] = useState({});
  const [defaultTheme, setDefaultTheme] = useState("");
  const [inputvalue, setInputValue] = useState("");
  const [craigeListOpen, setCraigeListOpen] = useState("");
  const [activeSelect, setActiveSelcet] = useState(false);
  const [tempName, setTempName] = useState("");
  const [themesId, setThemesId] = useState("");
  const [themeDataInfo, setThemeDataInfo] = useState([]);
  const [offeredTheme, setOfferedTheme] = useState("");
  const [offeredTheme1, setOfferedTheme1] = useState("");
  const [flyerOneSide, setFlyerOneSide] = useState([]);
  const [flyerTwoSide, setFlyerTwoSide] = useState([]);
  const [bannerData, setBannerData] = useState({});
  const [offeredThemeImage, setOfferedThemeImage] = useState("");
  const [offeredThemeImage1, setOfferedThemeImage1] = useState("");
  const [csvFile, setCsvFile] = useState({});
  const [tempData, setTempdata] = useState({});
  const [list2Data, setList2Data] = useState("");
  const [tempTheme, setTempTheme] = useState({});
  const [flyerInputTxt, setFlyerInputTxt] = useState("");
  const [editthemeDesigner, setEditThemeDesigner] = useState(false);
  const [editThemeCustomizedata, setEditThemeCustomizedData] = useState({});
  const [convertedContent, setConvertedContent] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentEmail, setCurrentEmail] = useState(initialEmailValue);
  const [open, setOpen] = useState(false);
  const [documentLeadData, setDocumentLeadData] = useState([]);
  const [documentNameData, setDocumentNameData] = useState([]);
  const [documentImageData, setDocumentImageData] = useState([]);
  const [documentPwdData, setDocumentPwdData] = useState([]);
  const [totalDivs, setTotalDivs] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [hover, setHover] = useState(false);
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
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
        type: "imageset",
      };
      postRecord(APIGetProperty, objusr).then((res) => {
        //console.log(res);
        if (res.data[0].response.status === "success") {
          // console.log(res.data[0].response.status)
          setPropertyData(res.data[0].response.data.toData);
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
      }
    });
  }, [propertyData.countryid]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        tourid: imageset_id,
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetTheme, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          // console.log(res.data[0].response);
          setEditFlyerThemeData(res.data[0].response);
          setThemeDataInfo(res.data[0].response.data);
          setThemesId(res.data[0].response.data[0].theme_id);
        }
      });
    }
  }, [sync, context.state.user, imageset_id]);
  useEffect(() => {
    if (context.state.user && themesId) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentid: JSON.parse(context.state.user).agentId,
        tourId: imageset_id,
        themeId: themesId,
      };
      postRecord(APIGetCustomizeThemeFlyer, objusr).then((res) => {
        // console.log(res);
        if (res.data[0].response.status === "success") {
          setCustomEditFlythemeData(res.data[0].response.data[0]);
        }
      });
    }
  }, [sync, context.state.user, imageset_id, themesId]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", agentId: JSON.parse(context.state.user).agentId, tourid: imageset_id };
  //         postRecord(APIGetFirstThemeFlyer, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     console.log(res.data[0].response.data);
  //                     setFlyerId(res.data[0].response.data);
  //                     setFlyerOneSide(res.data[0].response.data.One_Sided_Details);
  //                     setFlyerTwoSide(res.data[0].response.data.Two_Sided_Details);
  //                     setDefaultTheme(res.data[0].response.data.One_Sided_Details[0].img);
  //                 }
  //             })
  //     }
  // }, [sync, context.state.user, imageset_id])
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: imageset_id,
      };
      postRecord(APIGetFirstThemeFlyer, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setFlyerId(res.data[0].response.Data[0].custom_flyers);
          setFlyerOneSide(res.data[0].response.Data[1].One_Sided_Details);
          setFlyerTwoSide(res.data[0].response.Data[2].Two_Sided_Details);
          // console.log(res.data[0].response.data);
          // setFlyerId(res.data[0].response.data);
          // setFlyerOneSide(res.data[0].response.data.One_Sided_Details);
          // setFlyerTwoSide(res.data[0].response.data.Two_Sided_Details);
          // setDefaultTheme(res.data[0].response.data.One_Sided_Details[0].img);
        }
      });
    }
  }, [sync, context.state.user, imageset_id]);

  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: imageset_id,
      };
      postRecord(APIGetSecondThemeFlyer, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setSecondthemeData(res.data[0].response.Data);
        }
      });
    }
  }, [sync, context.state.user, imageset_id]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ",
  //         agentId: JSON.parse(context.state.user).agentId,
  //         tourid: imageset_id };
  //         postRecord(APIgetCustomThemeFlyers, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     setSecondthemeData(res.data[0].response.data);
  //                 }
  //             })
  //     }
  // }, [sync, context.state.user, imageset_id])

  // useEffect(() => {
  //     var filter_data = flyerOneSide.filter(res => {
  //         //console.log(res.value)
  //         let getFlyerId = res.value;
  //         let valueOfFlyerId = getFlyerId.slice(6)
  //         return valueOfFlyerId == themeData.flyer_id;

  //     });
  //     if (filter_data.length > 0) {
  //         setOfferedTheme(filter_data[0].img);

  //     }
  //     else {
  //         setOfferedTheme("");
  //     }
  // }, [flyerOneSide, themeData]);
  // useEffect(() => {
  //     var filter_data = flyerTwoSide.filter(res => {
  //         let getFlyerId = res.value;
  //         let valueOfFlyerId = getFlyerId.slice(6)
  //         return valueOfFlyerId === themeData.flyer_id;
  //     });
  //     if (filter_data.length > 0) {
  //         setOfferedTheme(filter_data[0].img);
  //         setOfferedTheme1(filter_data[0].img2)
  //     }
  //     else {
  //         setOfferedTheme("");
  //     }
  // }, [flyerTwoSide, themeData]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
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

  const savePropertyDescription = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  //console.log(customEditFlyThemeData);
  const savePropertyFeatures = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const savePropertyPrice = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const savePropertyInfromation = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const savePropertyLocation = () => {
    propertyData.authenticate_key = "abcd123XYZ";
    propertyData.agent_id = JSON.parse(context.state.user).agentId;
    propertyData.tourid = imageset_id;
    propertyData.tab_index = "5";
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
  const handleEditTheme = () => {
    history.push(APIPath() + "edit-flyer-theme/" + imageset_id);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleFlyInputChange = (event) => {
    const { name, value } = event.target;
    setCustomEditFlythemeData({ ...customEditFlyThemeData, [name]: value });
  };

  const handleFlyerChnage = (event) => {
    const name = event.target.name;
    setTempTheme(event.target.value);
    const data = JSON.parse(event.target.value);
    if (data.type === "custom") {
      themeData.themeId = data.templatename + "-" + data.themeid;
      themeData.customid = data.id;
      setThemeData({ ...themeData, [name]: "flyer0" + data.id });
    } else {
      setThemeData({ ...themeData, [name]: "flyer0" + data.value });
    }

    const customThemeImage = flyerId.filter((res) => {
      return res.value == data.value;
    });
    const filter_data = flyerOneSide.filter((res) => {
      return res.value == data.value;
    });
    const filter_data1 = flyerTwoSide.filter((res) => {
      return res.value == data.value;
    });
    if (customThemeImage.length > 0) {
      setOfferedTheme(custom_theme);
      setOfferedTheme1("");
      setActiveSelcet(false);
    }
    if (filter_data.length > 0) {
      setOfferedTheme(filter_data[0].img);
      setOfferedTheme1("");
      setActiveSelcet(true);
    }
    if (filter_data1.length > 0) {
      setOfferedTheme(filter_data1[0].img);
      setOfferedTheme1(filter_data1[0].img2);
      setActiveSelcet(true);
    }
    setBannerData({ ...bannerData, image: "" });
  };
  useEffect(() => {
    // This effect will run whenever themeData is updated
    handleThemeChange({
      target: {
        value: JSON.stringify({ title: "Default", value: "default-1" }),
      },
    });
  }, [themeData]);
  //console.log(offeredTheme);
  //console.log(offeredTheme1);
  // const handleThemeChange = (event) => {
  //     const name = event.target.name;
  //     setTempdata(event.target.value)
  //     const data = JSON.parse(event.target.value);
  //     setThemeData({ ...themeData, [name]: data.value });
  //     // setThemeData({ ...themeData, ["list2"]: data.valueAPI });
  //     setList2Data(data.valueAPI);
  //     console.log(data.valueAPI);
  //     editImageSecondDropdownThemeFlyers(data);
  //     setBannerData({ ...bannerData, "image": "" });

  // }
  // // console.log(bannerData);
  // //console.log(themeData)
  // const editImageSecondDropdownThemeFlyers = (data) => {
  //     setThemeData({ ...themeData, ["themeId"]: data.value });
  //     themeData.authenticate_key = "abcd123XYZ";
  //     themeData.agentId = JSON.parse(context.state.user).agentId;
  //     themeData.tourid = imageset_id;
  //     themeData.list1 = themeData.flyer_id;
  //     // themeData.list2 = themeData.themeId;
  //     // console.log(themeData.themeId);
  //     postRecord(APIEditImageSecondDropdownThemeFlyers, themeData)
  //         .then(res => {
  //             // console.log(res);
  //             if (res.data[0].response.status === "success") {
  //                 // console.log(res.data[0].response.data);
  //                 setOfferedThemeImage(res.data[0].response.data[0])
  //                 setOfferedThemeImage1(res.data[0].response.data[1])
  //                 setSync(false);
  //             }
  //             setSync(true);
  //         })
  // }

  const handleThemeChange = (event) => {
    // const name = event.target.name;
    setTempdata(event.target.value);
    const data = JSON.parse(event.target.value);
    var themevalue = data.value;
    editImageSecondDropdownThemeFlyers(themevalue);
  };
  const editImageSecondDropdownThemeFlyers = (data) => {
    themeData.authenticate_key = "abcd123XYZ";
    themeData.agentId = JSON.parse(context.state.user)?.agentId;
    themeData.tourid = imageset_id;
    themeData.list1 = themeData.flyer_id;
    // themeData.list2 = data;
    themeData.themeId = data;

    postRecord(APIEditImageSecondDropdownThemeFlyers, themeData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          // console.log(res.data[0].response.data);
          setOfferedThemeImage(res.data[0].response.data[0]);
          setOfferedThemeImage1(res.data[0].response.data[1]);
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

  const cloneThisTemplate = (data) => {
    confirmAlert({
      message: "Are you sure you want to clone this template ? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const obj = {
              authenticate_key: "abcd123XYZ",
              agentid: JSON.parse(context.state.user).agentId,
              templateId: data.id,
            };
            postRecord(APICloneFlyerTemplate, obj).then((res) => {
              // console.log(res);
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
  };
  const deleteThisTemplate = (data) => {
    confirmAlert({
      message: "Are you sure you want to delete this template ? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const obj = {
              authenticate_key: "abcd123XYZ",
              agentid: JSON.parse(context.state.user).agentId,
              templateId: data.id,
            };
            postRecord(APIDeleteFlyerTemplate, obj).then((res) => {
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
  const saveSelectFlyerTheme = () => {
    setOpen(true);
    themeData.authenticate_key = "abcd123XYZ";
    themeData.tourId = imageset_id;
    themeData.agent_id = JSON.parse(context.state.user).agentId;
    themeData.flyerId = themeData.flyer_id;
    themeData.list1 = themeData.flyer_id;
    themeData.list2 = list2Data;
    themeData.themeName = themeData.themeId;
    postRecord(APISaveFlyerTheme, themeData).then((res) => {
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
  };

  const cloneRow = () => {};
  const deleteRow = () => {};
  const updateEditFlyerTemplate = () => {
    customEditFlyThemeData.authenticate_key = "abcd123XYZ";
    customEditFlyThemeData.agent_id = JSON.parse(context.state.user).agentId;
    customEditFlyThemeData.tourId = imageset_id;
    customEditFlyThemeData.hdnCustomeThemeId =
      customEditFlyThemeData.customthemeid;
    customEditFlyThemeData.txtFlyerName = customEditFlyThemeData.templateName;
    postRecord(APIUpdateFlyerTemplate, customEditFlyThemeData).then((res) => {
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
    });
  };
  const handleViewModal = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      //console.log(res);
      if (res.data[0].response.status === "success") {
        if (res.data[0].response.tourdetails.isactive === 0) {
          // history.push(APIPath() + "site/flyer/" + imageset_id, "_blank");
          window.open(APIPath() + "site/flyer/" + imageset_id, "_blank");
        } else {
          // window.location.href = APIPath() + "agent-view-flyer-active/" + id;
          history.push(APIPath() + "site/flyer/" + imageset_id, "_blank");
        }
      }
    });
  };
  const printFlyerModal = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourid: imageset_id,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      // console.log(res);
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
    });
  };
  const PostCraigeList = () => {
    setCraigeListOpen("agent_pop_tab");
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourId: imageset_id,
    };
    //console.log(objusr);
    postRecord(APILoadCraigList, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        //console.log(res.data[0].response.data);
        setInputValue(res.data[0].response.data);
      }
    });
  };

  // React Text Editor

  const [editorState1, setEditorState1] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState3, setEditorState3] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange1 = (state) => {};
  const handleEditorChange2 = (state) => {
    // const { name, value } = state.target;
    // setPropertyData({ ...propertyData, [name]: value });
    setEditorState2(state);
    convertContentToHTML2();
  };
  const handleEditorChange3 = (state) => {
    // const { name, value } = state.target;
    // setPropertyData({ ...propertyData, [name]: value });
    setEditorState3(state);
    convertContentToHTML3();
  };
  const convertContentToHTML1 = () => {
    let currentContentAsHTML = convertToHTML(editorState1.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const convertContentToHTML2 = () => {
    let currentContentAsHTML = convertToHTML(editorState1.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const convertContentToHTML3 = () => {
    let currentContentAsHTML = convertToHTML(editorState1.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  //console.log(customEditFlyThemeData.customthemeid)
  const flyerInputTextChange = (event) => {
    const { name, value } = event.target;
    // console.log(value)
    setCustomEditFlythemeData({ ...customEditFlyThemeData, [name]: value });
  };
  const EditFlyerDesigner = (data) => {
    GetEditFlyerDesigner(data.id);
  };
  const GetEditFlyerDesigner = (customid) => {
    setEditThemeDesigner(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      customvalue: customid,
    };
    postRecord(APIgetCustomThemeFlyers, obj).then((res) => {
      //console.log(res.data[0].response);
      if (res.data[0].response.status === "success") {
        setEditThemeCustomizedData(res.data[0].response.flyerData[0]);
      }
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
  const handleEditThemeInputChange = (event) => {
    const { name, value } = event.target;
    setEditThemeCustomizedData({ ...editThemeCustomizedata, [name]: value });
  };
  const updateEditThemeTemplate = (data) => {
    editThemeCustomizedata.authenticate_key = "abcd123XYZ";
    editThemeCustomizedata.agent_id = JSON.parse(context.state.user).agentId;
    editThemeCustomizedata.customvalue = data.id;
    editThemeCustomizedata.tourId = imageset_id;
    postRecord(APIUpdateCustomFlyerTemplate, editThemeCustomizedata).then(
      (res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          //setOpenSuccess(true);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
      }
    );
  };
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmail({ ...currentEmail, [name]: value });
  };
  const handleCsvfileUpload = (event) => {
    setCsvFile({ ...csvFile, email_file: event.target.files });
  };
  const saveSendFlyerData = () => {
    setOpen(true);
    if (currentEmail.emails == undefined) {
      currentEmail.emails = "";
    }
    csvFile.authenticate_key = "abcd123XYZ";
    csvFile.agent_id = JSON.parse(context.state.user).agentId;
    csvFile.tourId = imageset_id;
    csvFile.emails = currentEmail.emails;
    const formData = new FormData();
    for (let i in csvFile) {
      if (i === "email_file") {
        for (let file of csvFile[i]) {
          formData.append("email_file", file);
        }
      } else {
        formData.append(i, csvFile[i]);
      }
    }
    postRecord(APISendFlyerMail, formData, {}).then((res) => {
      if (res.data[0].response.status === "success") {
        setOpen(false);
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setOpen(false);
      }
    });
  };
  const handleEditImageset = () => {
    history.push(APIPath() + "edit-image-set/" + imageset_id);
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
  function changeHover(e) {
    setHover(true);
  }
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
          <h2>Edit theme flyer</h2>
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
                              href="#"
                              onClick={() =>
                                history.push(
                                  APIPath() + "agent-edit-flyer/" + imageset_id
                                )
                              }
                            >
                              <i class="far fa-image"></i> Go back to flyer
                              settings
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
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
                              <i class="fas fa-magic"></i> Themes{" "}
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
                              data-toggle="modal"
                              data-target="#Distributetour"
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
              {/* <div class="action_sec_main">
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
                        <ul class="list_sec" role="">
                          <li class="">
                            <a class="" onClick={handleEditImageset}>
                              <span>
                                <i class="far fa-image"></i>
                              </span>
                              Go to related ImageSet
                            </a>
                          </li>
                          <li class="">
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
                          </li>
                          <li class="">
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
                          </li>
                          <li class="">
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
                          </li>
                          <li class="">
                            <a
                              onClick={() => {
                                printFlyerModal();
                              }}
                              data-toggle="modal"
                              data-target="#Distributetour"
                            >
                              <span>
                                <i class="fas fa-print"></i>
                              </span>
                              Print Flyer
                            </a>
                          </li>
                          <li class="">
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
                          </li>
                          <li class="">
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
              <div class="profile_listing_main">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveSelectFlyerTheme();
                  }}
                >
                  <div
                    class="row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div class="col-md-4">
                      <label for="FlyerTheme" style={{ marginBottom: "10px" }}>
                        Select Flyer Theme
                      </label>
                      <select
                        class="form-control formbox1select"
                        onChange={handleFlyerChnage}
                        name="flyer_id"
                        value={tempTheme}
                        className="custom-select"
                        style={{ height: "45px" }}
                      >
                        <option value="">Choose a flyer theme</option>
                        <optgroup label="Custom">
                          {Object.keys(flyerId).length > 0 ? (
                            flyerId.map((res) => (
                              <option value={JSON.stringify(res)}>
                                {res.templatename}
                              </option>
                            ))
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </optgroup>
                        <optgroup label="One Sided Flyer">
                          {flyerOneSide.length > 0
                            ? flyerOneSide.map((res, index) => (
                                <option value={JSON.stringify(res)}>
                                  {res.title}{" "}
                                </option>
                              ))
                            : ""}
                        </optgroup>
                        <optgroup label="Two Sided Flyer">
                          {flyerTwoSide.length > 0
                            ? flyerTwoSide.map((res, index) => (
                                <option value={JSON.stringify(res)}>
                                  {res.title}{" "}
                                </option>
                              ))
                            : ""}
                        </optgroup>
                      </select>
                    </div>
                    <div class="col-md-4">
                      {/* <img src={defaultTheme} alt="demo images" /> */}
                      {/* <img src={defaultFlyerimg}/> */}
                      {offeredTheme === "" ? (
                        <img src={defaultTheme} alt="" style={{}} />
                      ) : (
                        <div>
                          <img src={offeredTheme} alt="" style={{}} />
                          <img src={offeredTheme1} alt="" style={{}} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    class="row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div class="col-md-4">
                      {activeSelect === true ? (
                        <>
                          <select
                            class="selectpicker form-control bs-select-hidden"
                            data-size="5"
                            onChange={handleThemeChange}
                            name="themeId"
                            value={tempData}
                            className="custom-select"
                            style={{ height: "45px" }}
                          >
                            <option value="" selected>
                              Select a theme
                            </option>
                            {secondThemeData.map((res) => (
                              <option value={JSON.stringify(res)}>
                                {res.title}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {activeSelect === true ? (
                      <div class="col-md-4">
                        {offeredThemeImage === "" ? (
                          <img src="" alt="" style={{}} />
                        ) : (
                          <div>
                            <img src={offeredThemeImage} alt=""></img>
                            <img src={offeredThemeImage1} alt=""></img>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {/* {
                                                offeredThemeImage === "" ? (
                                                    <img src="" alt="" style={{}} />
                                                ) : (
                                                    <div>
                                                        <img src={offeredThemeImage}></img>
                                                        <img src={offeredThemeImage1}></img>
                                                    </div>
                                                )
                                            } */}
                    {/* {offeredTheme === "" ? (
                                                <img src={defaultTheme} alt="" style={{}} />
                                            ) : (
                                                <div>
                                                    <img src={offeredTheme} alt="" style={{}} />
                                                    <img src={offeredTheme1} alt="" style={{}} />
                                                </div>
                                            )} */}
                  </div>
                  <div class="row">
                    <div class="col-lg-12 col-md-12 text-center">
                      <button
                        style={{ border: "#ffa124" }}
                        type="submit"
                        class="need_pic save_btn"
                      >
                        Save<i class="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="row" style={{ paddingTop: "20px", margin: "30px" }}>
          <div class="col-lg-12 col-md-12">
            <Accordion
              square
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  Edit Flyer Themes
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <input type="hidden" name="themesId" value={themesId} />
                        {Object.keys(editFlyerThemeData).length > 0 ? (
                          // <img src={editFlyerThemeData.data[0].url} alt='flyertheme' />
                          <div>
                            <img
                              src={editFlyerThemeData.data[0].url}
                              alt="flyertheme"
                            />
                            <img src={editFlyerThemeData.data[0].url2} />
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {Object.keys(editFlyerThemeData).length > 0
                          ? dateFormat(
                              editFlyerThemeData.data[0].updated_at,
                              "dd-mm-yyyy"
                            )
                          : ""}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#ffa124", color: "white" }}
                          onClick={() => setEditFlyerDesigner(true)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
            <Accordion
              square
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  Custom Themes
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <table class="table table-bordered">
                  <tbody id="tableToModify">
                    {Object.keys(editFlyerThemeData).length > 0
                      ? editFlyerThemeData.flyerData.map((res) => (
                          <tr id="rowToClone">
                            <td>
                              <h5>{res.templatename}</h5>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <h5>
                                {dateFormat(res.updated_at, "dd-mm-yyyy")}
                              </h5>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#ffa124",
                                  color: "white",
                                }}
                                onClick={() => EditFlyerDesigner(res)}
                              >
                                Edit
                              </Button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#ffa124",
                                  color: "white",
                                }}
                                onClick={() => cloneThisTemplate(res)}
                              >
                                Clone
                              </Button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#ffa124",
                                  color: "white",
                                }}
                                onClick={() => deleteThisTemplate(res)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        {/* <input type="text" class="form-control" value="" name="templateName" onChange={handleInputChange} ></input> */}
        <Dialog
          maxWidth={mediumWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={editFlyerDesigner}
        >
          <DialogTitle id="customized-dialog-title">
            Flyer Designer 1
            <CancelIcon
              onClick={() => setEditFlyerDesigner(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <div class="container">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  //saveContactPerson();
                  updateEditFlyerTemplate();
                }}
              >
                <div class="agent_pop_main">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 text-center">
                      <Accordion
                        square
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            Flyer Name
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div class="col-md-12">
                            <label
                              style={{ float: "left", marginBottom: "10px" }}
                            >
                              Template Name
                            </label>
                            <input
                              autoFocus="autoFocus"
                              type="text"
                              class="form-control"
                              name="templateName"
                              value={customEditFlyThemeData.templateName}
                              onChange={handleFlyInputChange}
                            />
                            {/* <input type="text" class="form-control" value={customEditFlyThemeData.templateName} name="templateName" ></input> */}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        square
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            Title
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div class="col-lg-12 col-md-12">
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Text Align
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    onChange={handleFlyInputChange}
                                    name="align"
                                    value={customEditFlyThemeData.align}
                                  >
                                    <option value="0">Selct Align</option>
                                    <option value="LEFT">LEFT</option>
                                    <option value="RIGHT">RIGHT</option>
                                    <option value="CENTER">CENTER</option>
                                  </select>
                                </div>
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Size
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control "
                                    onChange={handleFlyInputChange}
                                    name="fontSize"
                                    value={customEditFlyThemeData.fontSize}
                                  >
                                    <option value="0">Selct Size</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                    <option value="20">20</option>
                                    <option value="24">24</option>
                                    <option value="26">26</option>
                                  </select>
                                </div>
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Family
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control "
                                    onChange={handleFlyInputChange}
                                    name="fontFamily"
                                    value={customEditFlyThemeData.fontFamily}
                                  >
                                    <option value="0">Selct Font Family</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="RoboGeorgiato">
                                      Georgia
                                    </option>
                                    <option value="Courier New">
                                      Courier New
                                    </option>
                                    <option value="Arial">Arial</option>
                                    <option value="Tahoma">Tahoma</option>
                                    <option value="Trebuchet MS">
                                      Trebuchet MS
                                    </option>
                                    <option value="Times New Roman">
                                      Times New Roman
                                    </option>
                                    <option value="Palatino Linotype">
                                      Palatino Linotype
                                    </option>
                                    <option value="Lucida Sans Unicode">
                                      Lucida Sans Unicode
                                    </option>
                                    <option value="Lucida Console">
                                      Lucida Console
                                    </option>
                                    <option value="MS Serif">MS Serif</option>
                                    <option value="Comic Sans MS">
                                      Comic Sans MS
                                    </option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Andale">Andale</option>
                                    <option value="Futura">Futura</option>
                                    <option value="Gill Sans">Gill Sans</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        square
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            Agent Information
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div class="col-lg-12 col-md-12">
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Size
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    style={{ height: "45px" }}
                                    onChange={handleFlyInputChange}
                                    name="agentFontSize"
                                    value={customEditFlyThemeData.agentFontSize}
                                  >
                                    <option value="0">Selct Size</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                    <option value="20">20</option>
                                    <option value="24">24</option>
                                    <option value="26">26</option>
                                  </select>
                                </div>

                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Family
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    style={{ height: "45px" }}
                                    onChange={handleFlyInputChange}
                                    name="agentFontFamily"
                                    value={
                                      customEditFlyThemeData.agentFontFamily
                                    }
                                  >
                                    <option value="0">Selct Font Family</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="RoboGeorgiato">
                                      Georgia
                                    </option>
                                    <option value="Courier New">
                                      Courier New
                                    </option>
                                    <option value="Arial">Arial</option>
                                    <option value="Tahoma">Tahoma</option>
                                    <option value="Trebuchet MS">
                                      Trebuchet MS
                                    </option>
                                    <option value="Times New Roman">
                                      Times New Roman
                                    </option>
                                    <option value="Palatino Linotype">
                                      Palatino Linotype
                                    </option>
                                    <option value="Lucida Sans Unicode">
                                      Lucida Sans Unicode
                                    </option>
                                    <option value="Lucida Console">
                                      Lucida Console
                                    </option>
                                    <option value="MS Serif">MS Serif</option>
                                    <option value="Comic Sans MS">
                                      Comic Sans MS
                                    </option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Andale">Andale</option>
                                    <option value="Futura">Futura</option>
                                    <option value="Gill Sans">Gill Sans</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        square
                        expanded={expanded === "panel4"}
                        onChange={handleChange("panel4")}
                      >
                        <AccordionSummary
                          aria-controls="panel4d-content"
                          id="panel4d-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            Company Information
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div class="col-lg-12 col-md-12">
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Size
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    style={{ height: "45px" }}
                                    onChange={handleFlyInputChange}
                                    name="companyFontSize"
                                    value={
                                      customEditFlyThemeData.companyFontSize
                                    }
                                  >
                                    <option value="0">Selct Size</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                    <option value="20">20</option>
                                    <option value="24">24</option>
                                    <option value="26">26</option>
                                  </select>
                                </div>
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Family
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    onChange={handleFlyInputChange}
                                    name="companyfontFamily"
                                    value={
                                      customEditFlyThemeData.companyfontFamily
                                    }
                                  >
                                    <option value="0">Selct Font Family</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="RoboGeorgiato">
                                      Georgia
                                    </option>
                                    <option value="Courier New">
                                      Courier New
                                    </option>
                                    <option value="Arial">Arial</option>
                                    <option value="Tahoma">Tahoma</option>
                                    <option value="Trebuchet MS">
                                      Trebuchet MS
                                    </option>
                                    <option value="Times New Roman">
                                      Times New Roman
                                    </option>
                                    <option value="Palatino Linotype">
                                      Palatino Linotype
                                    </option>
                                    <option value="Lucida Sans Unicode">
                                      Lucida Sans Unicode
                                    </option>
                                    <option value="Lucida Console">
                                      Lucida Console
                                    </option>
                                    <option value="MS Serif">MS Serif</option>
                                    <option value="Comic Sans MS">
                                      Comic Sans MS
                                    </option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Andale">Andale</option>
                                    <option value="Futura">Futura</option>
                                    <option value="Gill Sans">Gill Sans</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        square
                        expanded={expanded === "panel4"}
                        onChange={handleChange("panel4")}
                      >
                        <AccordionSummary
                          aria-controls="panel4d-content"
                          id="panel4d-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            Description
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div class="col-lg-12 col-md-12">
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <label
                                  style={{
                                    display: "flex",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Font Size
                                </label>
                                <div class="socila_status_single cap_set">
                                  <select
                                    class="form-control"
                                    style={{ height: "45px" }}
                                    onChange={handleFlyInputChange}
                                    name="descfontsize"
                                    value={customEditFlyThemeData.descfontsize}
                                  >
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>16</option>
                                    <option>18</option>
                                    <option>20</option>
                                    <option>24</option>
                                    <option>26</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>

                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#ffa124",
                          color: "white",
                          margin: "20px",
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#ffa124", color: "white" }}
                        onClick={() => setEditFlyerDesigner(false)}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          maxWidth={mediumWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={cloneFlyerDesigner}
        >
          <DialogTitle id="customized-dialog-title">
            Are you sure you want to clone selected flyer
            <CancelIcon
              onClick={() => setCloneFlyerDesigner(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ffa124",
                    color: "white",
                    margin: "20px",
                  }}
                  type="submit"
                  onClick={() => setCloneFlyerDesigner(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffa124", color: "white" }}
                  onClick={cloneRow}
                >
                  Ok
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog
          maxWidth={mediumWidth}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={deleteFlyerDesigner}
        >
          <DialogTitle id="customized-dialog-title">
            Are you sure you want to delete selected flyer
            <CancelIcon
              onClick={() => setDeleteFlyerDesigner(false)}
              style={{ float: "right", cursor: "pointer" }}
            />
          </DialogTitle>
          <DialogContent dividers>
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#ffa124",
                        color: "white",
                        margin: "20px",
                      }}
                      type="submit"
                      onClick={() => setDeleteFlyerDesigner(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#ffa124", color: "white" }}
                      onClick={deleteRow}
                    >
                      Ok
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                      <div class="tab-pane" id="Cus_flyer" role="tabpanel">
                        <div class="prop_info">
                          <div class="personalinfo">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePropertyInfromation();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-12 formbox1">
                                  <div>
                                    <label style={{ marginBottom: "15px" }}>
                                      Features column 1
                                    </label>
                                  </div>
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
                                    name="features2"
                                    value={propertyData.features2}
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
                                    name="features3"
                                    value={propertyData.features3}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
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
                                    type="text"
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
        <div id="agent_pop_tab" class="modal fade" role="dialog">
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
                              {/* <span><img src={opencraigslisactive_icon} /></span> */}
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
                              {/* <span><img src={fontawesomelogo} /></span> */}
                              <p style={{ marginTop: "20px" }}>
                                Click your mouse in the Posting Description
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
      <Dialog
        maxWidth={mediumWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={editthemeDesigner}
      >
        <DialogTitle id="customized-dialog-title">
          Flyer Designer
          <CancelIcon
            onClick={() => setEditThemeDesigner(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveContactPerson();
                updateEditThemeTemplate(editThemeCustomizedata);
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-lg-12 col-md-12 text-center">
                    <Accordion
                      square
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Flyer Name
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div class="col-md-12">
                          <label
                            style={{ float: "left", marginBottom: "10px" }}
                          >
                            Template Name
                          </label>
                          <input
                            autoFocus="autoFocus"
                            type="text"
                            class="form-control"
                            name="templatename"
                            value={editThemeCustomizedata.templatename}
                            onChange={handleEditThemeInputChange}
                          />
                          {/* <input type="text" class="form-control" value={customEditFlyThemeData.templateName} name="templateName" ></input> */}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Title
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div class="col-lg-12 col-md-12">
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Text Align
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  onChange={handleEditThemeInputChange}
                                  name="align"
                                  value={editThemeCustomizedata.align}
                                >
                                  <option value="0">Selct Align</option>
                                  <option value="Left">LEFT</option>
                                  <option value="Right">RIGHT</option>
                                  <option value="center">CENTER</option>
                                </select>
                              </div>
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Size
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control "
                                  onChange={handleEditThemeInputChange}
                                  name="titlefontsize"
                                  value={editThemeCustomizedata.titlefontsize}
                                >
                                  <option value="0">Selct Size</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="16">16</option>
                                  <option value="18">18</option>
                                  <option value="20">20</option>
                                  <option value="24">24</option>
                                  <option value="26">26</option>
                                </select>
                              </div>
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Family
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control "
                                  onChange={handleEditThemeInputChange}
                                  name="titlefontstyle"
                                  value={editThemeCustomizedata.titlefontstyle}
                                >
                                  <option value="0">Selct Font Family</option>
                                  <option value="Roboto">Roboto</option>
                                  <option value="Verdana">Verdana</option>
                                  <option value="RoboGeorgiato">Georgia</option>
                                  <option value="Courier New">
                                    Courier New
                                  </option>
                                  <option value="Arial">Arial</option>
                                  <option value="Tahoma">Tahoma</option>
                                  <option value="Trebuchet MS">
                                    Trebuchet MS
                                  </option>
                                  <option value="Times New Roman">
                                    Times New Roman
                                  </option>
                                  <option value="Palatino Linotype">
                                    Palatino Linotype
                                  </option>
                                  <option value="Lucida Sans Unicode">
                                    Lucida Sans Unicode
                                  </option>
                                  <option value="Lucida Console">
                                    Lucida Console
                                  </option>
                                  <option value="MS Serif">MS Serif</option>
                                  <option value="Comic Sans MS">
                                    Comic Sans MS
                                  </option>
                                  <option value="Helvetica">Helvetica</option>
                                  <option value="Impact">Impact</option>
                                  <option value="Andale">Andale</option>
                                  <option value="Futura">Futura</option>
                                  <option value="Gill Sans">Gill Sans</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Agent Information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div class="col-lg-12 col-md-12">
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Size
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  style={{ height: "45px" }}
                                  onChange={handleEditThemeInputChange}
                                  name="agentfontsize"
                                  value={editThemeCustomizedata.agentfontsize}
                                >
                                  <option value="0">Selct Size</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="16">16</option>
                                  <option value="18">18</option>
                                  <option value="20">20</option>
                                  <option value="24">24</option>
                                  <option value="26">26</option>
                                </select>
                              </div>

                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Family
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  style={{ height: "45px" }}
                                  onChange={handleEditThemeInputChange}
                                  name="agentfontstyle"
                                  value={editThemeCustomizedata.agentfontstyle}
                                >
                                  <option value="0">Selct Font Family</option>
                                  <option value="Roboto">Roboto</option>
                                  <option value="Verdana">Verdana</option>
                                  <option value="RoboGeorgiato">Georgia</option>
                                  <option value="Courier New">
                                    Courier New
                                  </option>
                                  <option value="Arial">Arial</option>
                                  <option value="Tahoma">Tahoma</option>
                                  <option value="Trebuchet MS">
                                    Trebuchet MS
                                  </option>
                                  <option value="Times New Roman">
                                    Times New Roman
                                  </option>
                                  <option value="Palatino Linotype">
                                    Palatino Linotype
                                  </option>
                                  <option value="Lucida Sans Unicode">
                                    Lucida Sans Unicode
                                  </option>
                                  <option value="Lucida Console">
                                    Lucida Console
                                  </option>
                                  <option value="MS Serif">MS Serif</option>
                                  <option value="Comic Sans MS">
                                    Comic Sans MS
                                  </option>
                                  <option value="Helvetica">Helvetica</option>
                                  <option value="Impact">Impact</option>
                                  <option value="Andale">Andale</option>
                                  <option value="Futura">Futura</option>
                                  <option value="Gill Sans">Gill Sans</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                    >
                      <AccordionSummary
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Company Information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div class="col-lg-12 col-md-12">
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Size
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  style={{ height: "45px" }}
                                  onChange={handleEditThemeInputChange}
                                  name="companyfontsize"
                                  value={editThemeCustomizedata.companyfontsize}
                                >
                                  <option value="0">Selct Size</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="16">16</option>
                                  <option value="18">18</option>
                                  <option value="20">20</option>
                                  <option value="24">24</option>
                                  <option value="26">26</option>
                                </select>
                              </div>
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Family
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  onChange={handleEditThemeInputChange}
                                  name="companyfontFamily"
                                  value={
                                    editThemeCustomizedata.companyfontstyle
                                  }
                                >
                                  <option value="0">Selct Font Family</option>
                                  <option value="Roboto">Roboto</option>
                                  <option value="Verdana">Verdana</option>
                                  <option value="RoboGeorgiato">Georgia</option>
                                  <option value="Courier New">
                                    Courier New
                                  </option>
                                  <option value="Arial">Arial</option>
                                  <option value="Tahoma">Tahoma</option>
                                  <option value="Trebuchet MS">
                                    Trebuchet MS
                                  </option>
                                  <option value="Times New Roman">
                                    Times New Roman
                                  </option>
                                  <option value="Palatino Linotype">
                                    Palatino Linotype
                                  </option>
                                  <option value="Lucida Sans Unicode">
                                    Lucida Sans Unicode
                                  </option>
                                  <option value="Lucida Console">
                                    Lucida Console
                                  </option>
                                  <option value="MS Serif">MS Serif</option>
                                  <option value="Comic Sans MS">
                                    Comic Sans MS
                                  </option>
                                  <option value="Helvetica">Helvetica</option>
                                  <option value="Impact">Impact</option>
                                  <option value="Andale">Andale</option>
                                  <option value="Futura">Futura</option>
                                  <option value="Gill Sans">Gill Sans</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                    >
                      <AccordionSummary
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "18px" }}
                        >
                          Description
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div class="col-lg-12 col-md-12">
                          <div class="row">
                            <div class="col-lg-12 col-md-12">
                              <label
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                Font Size
                              </label>
                              <div class="socila_status_single cap_set">
                                <select
                                  class="form-control"
                                  style={{ height: "45px" }}
                                  onChange={handleEditThemeInputChange}
                                  name="descfontsize"
                                  value={editThemeCustomizedata.descfontsize}
                                >
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>16</option>
                                  <option>18</option>
                                  <option>20</option>
                                  <option>24</option>
                                  <option>26</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#ffa124",
                        color: "white",
                        margin: "20px",
                      }}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#ffa124", color: "white" }}
                      onClick={() => setEditThemeDesigner(false)}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
