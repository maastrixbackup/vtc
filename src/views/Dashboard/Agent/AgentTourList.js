import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";
import ShareLink from "react-facebook-share-link";
import TwitterLink from "react-twitter-share-link";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import banner from "../../../images/vtc-banner.jpg";
import profile from "../../../images/profile.jpg";
import Switch from "react-switch";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import { event } from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import Title from "../../../CommonMethods/Title";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Dropzone from "react-dropzone";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import AgentDashBoardHeader from "./AgentDashBoardHeader";

const APIDistributeTour = APIURL() + "distribute-tour";
const APIVideoPromotion = APIURL() + "load-video-promotion";
const APISaveDistributeSetting = APIURL() + "save-distribute-settings";
const APIUpdateDistributeTour = APIURL() + "update-distribute-tour";
const APIGetUserData = APIURL() + "user-details";
const APIPullListing = APIURL() + "pull-listing";
const APIGetImagesetList = APIURL() + "get-imagesetlist";
const APIChangeService = APIURL() + "change-tour-service";
const APIChangeStatus = APIURL() + "change-status";
const APIDeleteImageset = APIURL() + "delete-imageset";
const APIActivate = APIURL() + "change-image-status";
const APISaveToDeskTop = APIURL() + "savetodesktop";
const APIGetStates = APIURL() + "get-states";
const APIGetCategory = APIURL() + "get-categories";
const APIGetPropertyType = APIURL() + "get-Propertytype";
const APIGetTourDetails = APIURL() + "tour-details";
const APILoadDomainManager = APIURL() + "get-loadDomainmanager";
const APIUpdateVideoPromotion = APIURL() + "update-promotions";
const APIDomainOrder = APIURL() + "agent-domain-order";
const APIGetCountries = APIURL() + "get-countries";
const APIDomainSearch = APIURL() + "domain-search";
const APITourService = APIURL() + "tourservicelink";
const APISendMail = APIURL() + "send-TrafficReport";
const APISaveTrafficReport = APIURL() + "save-trafficReport";
const APIDuplicate = APIURL() + "duplicateimageset";
const initialDomainOrderState = {
  authenticate_key: "abcd123XYZ",
  agent_id: "",
  tour_id: "",
  domainname: "",
  domain: "",
  ccno: "",
  cvv: "",
  exp_month: "",
  exp_year: "",
  amount: "25",
};
const initialImagesetState = {
  countryid: 40,
  stateid: "",
  city: "",
  categoryid: "",
  typeid: "",
  caption: "",
  pricetype: "USD",
  price: "",
  mls: "",
  virtualtourservice: 1,
  flyerservice: 1,
  videoservice: 1,
  picture: "",
  video: "",
  panorama: "",
};
const APIActiveTours = APIURL() + "active-tours";
const APIServiceMail = APIURL() + "tour-send-mail";

const APILoadCraigList = APIURL() + "load-craiglist-modal";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function AgentTourList(props) {
  useLayoutEffect(() => {
    localStorage.removeItem("id");
  }, []);
  let history = useHistory();
  const setGlobalLoading = props.setLoading;
  const setGlobalOpenPopUp = props.setOpenPopUp;
  const setGlobalMessage = props.setMessage;
  const setGlobalAlertType = props.setAlertType;
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const [openWarning, setOpenWarning] = useState(false);
  const context = useContext(AuthContext);
  const [uploadedPanorama, setUploadedPanorama] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [openVideoPromoModal, setOpenVideoPromoModal] = useState(false);
  const [DomainName, setDomainName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [DomainExtension, setDomainExtension] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [distributeVideoChecked, setDistributeVideoChecked] = useState(false);
  const [domainOrderData, setDomainOrderData] = useState(
    initialDomainOrderState
  );
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [extensionName, setExtensionName] = useState([]);
  const [activeTour, setActiveTour] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [openCraiglist, setOpenPostCraiglist] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const [distributeTourLink, setDistributeTourLink] = useState({});
  const [imagesetList, setImagesetList] = useState([]);
  const [sync, setSync] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [craiglistData, setCraiglistData] = useState("");
  const [id, setId] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [element, setElement] = useState("");
  const [propertyData, setPropertyData] = useState({});
  const [allStates, setAllStates] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [orderByData, setOrderByData] = useState({});
  const [propertyType, setPropertyType] = useState([]);
  const [propertyDataType, setPropertyTypeData] = useState({});
  const [domainData, setDomainData] = useState([]);
  const [imagesetData, setImagesetData] = useState(initialImagesetState);
  const [openTrafficModal, setOpenTrafficModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [postPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [same, setSame] = useState(false);
  const [themeId, setThemeId] = useState("");
  const [defaultsThemeId, setDefaultsThemeId] = useState("");
  const [isPremium, setIsPremium] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDistributeModal, setOpenDistributeModal] = useState(false);
  const [videoPromoData, setVideoPromoData] = useState({});
  const [craigeListOpen, setCraigeListOpen] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [serviceLinks, setServiceLinks] = useState({});
  const [trafficData, setTrafficdata] = useState("");
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCountries, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllCountries(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (context.state.user) {
      //  console.log(JSON.parse(context.state.user).agentId);
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
  const [agentDataPullListing, setAgentDataPullListing] = useState(null);

  useEffect(() => {
    if (context?.state?.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };

      postRecord(APIGetUserData, objusr).then((res) => {
        const agentProfile =
          res?.data?.[0]?.response?.data?.agent_profile.mls_id;
        setAgentDataPullListing(agentProfile);
      });
    }
  }, [context?.state?.user]);

  const handlePullListing = async () => {
    setLoading(true);
    setGlobalMessage("Please wait while pulling your data...");
    setGlobalAlertType("info");
    setGlobalOpenPopUp(true);

    const payload = {
      mls_id: agentDataPullListing,
    };

    try {
      const res = await postRecord(APIPullListing, payload);
      const data = res?.data;
      const message = data?.message || "Unexpected response";

      if (data?.status === "success") {
        setGlobalMessage(message);
        setGlobalAlertType("success");
        setGlobalOpenPopUp(true);
      } else {
        setGlobalMessage(message);
        setGlobalAlertType("error");
        setGlobalOpenPopUp(true);
      }
    } catch (err) {
      setGlobalMessage("Something went wrong!");
      setGlobalAlertType("error");
      setGlobalOpenPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (context.state.user) {
      setLoading(true);
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        pageNumber: pageNumber,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.countryid,
        zipcode: propertyData.zipcode,
        category: categoryInfo.category,
        property: propertyDataType.property,
        tourid: propertyData.tourid,
        mls: propertyData.mls,
      };
      postRecord(APIGetImagesetList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setImagesetList(res.data[0].response.data);
          setOrderByData(res.data[0].response.orderby);
          setPageCount(res.data[0].response.datacount);

          setRefresh(false);
          setLoading(false);
        }
      });
    }
  }, [context.state.user, sync, pageNumber]);

  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ", country_id: 40 };
    postRecord(APIGetStates, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
      }
    });
  }, [propertyData.countryid]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      country_id: imagesetData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        return;
      }
      setAllStates([]);
      setImagesetData({ ...imagesetData, stateid: "" });
    });
  }, [imagesetData.countryid]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCategory, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setCategoryData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetPropertyType, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setPropertyType(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (themeId === 1 && isPremium === 1) {
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");

        setThemeId("");
      } else if (themeId === 2 && isPremium === 1) {
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");

        setThemeId("");
      } else if (themeId === 3 && isPremium === 1) {
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");

        setThemeId("");
      } else if (themeId === 4 && isPremium === 1) {
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");

        setThemeId("");
      } else if (themeId === 5) {
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");

        setThemeId("");
      }
    }
  }, [themeId, context.state.user, id, isPremium]);
  useEffect(() => {
    if (context.state.user) {
      const agent_id = JSON.parse(context.state.user).agentId;
      if (defaultsThemeId && isPremium === 0) {
        // window.location.href = "http://localhost:3001/theme-template5/" + id + APIPath() + agent_id + APIPath() + defaultsThemeId;
        // window.location.href = "/tour/theme-template5/" + id + "/" + agent_id;
        window.open("https://virtualtourcafe.com/tour/" + id, "_blank");
        setDefaultsThemeId("");
      }
    }
  }, [context.state.user, id, isPremium, defaultsThemeId]);
  useEffect(() => {
    if (imagesetList.length > 0) {
      filterData();
    } else {
      setAllData([]);
    }
  }, [offset, imagesetList]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setRefresh(false);
  //   }, 2000);
  // }, [allData]);
  useEffect(() => {
    if ($) {
      $(".gee_cross").hide();
      $(".gee_menu").hide();
    }
  }, []);
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
  const filterData = async () => {
    const endOffset = offset + postPerPage;
    setTotalData(imagesetList.slice(offset, endOffset));
    setAllData(imagesetList.slice(offset, endOffset));
    // setPageCount(Math.ceil(imagesetList.length / postPerPage));
    setRefresh(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };
  const handleImageSetId = (data) => {
    var div = document.getElementById("myDiv" + data.id);
    if (element !== "") {
      element.classList.remove("active");
    }
    if (element === div) {
      div.classList.remove("active");
      setElement("");
      setId("");
    } else {
      div.classList.add("active");
      setElement("");
      setElement(div);
      setId(data.id);
    }
  };
  const handleTourServiceChange = (event, tid) => {
    //var check = data.virtualtourservice === 1 ? 0 : 1;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      status: "tour",
      virtualtourservice: event,
      tourid: tid,
    };
    // console.log(obj);
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
  const handleFlyerServiceChange = (event, tid) => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tid,
      status: "flyer",
      flyerservice: event,
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
  const handleVideoServiceChange = (event, tid) => {
    //var check = data.videoservice === 1 ? 0 : 1;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tid,
      status: "video",
      videoservice: event,
    };
    //console.log(obj);
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
  const handleEditImageset = (data) => {
    history.push(APIPath() + "agent-edit-tour/" + data.id);
  };
  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure you want to delete this imageset ? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const obj = {
              authenticate_key: "abcd123XYZ",
              agent_id: JSON.parse(context.state.user).agentId,
              tourId: id,
            };
            postRecord(APIDeleteImageset, obj)
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
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handleStatusChange = (event, id) => {
    // let Tour = document.getElementById("statusId");

    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: id,
      opt: event.target.value,
    };
    postRecord(APIChangeStatus, obj)
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
  const handleActivateChange = (event, tid) => {
    // var check = event === false ? 0 : 1;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tid,
      isactive: event,
    };
    postRecord(APIActivate, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(
            res.data[0].response.message ||
              "Something Went Wrong. Please try again later..."
          );
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
  const goToImageSet = () => {
    if (id === "") {
      setMessage("Please select one from tourlist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "edit-image-set/" + id);
    }
  };
  const editTour = () => {
    if (!localStorage.getItem("id") || localStorage.getItem("id") === "") {
      setMessage("Please select one from tourlist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "agent-edit-tour/" + localStorage.getItem("id"));
    }
  };
  const handleSaveToDesktop = () => {
    if (!localStorage.getItem("id") || localStorage.getItem("id") === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpen(true);
      var DesktopId = document.getElementById("desktopId");
      DesktopId.value = localStorage.getItem("id");
      const objusr = {
        authenticate_key: "abcd123XYZ",
        tourId: localStorage.getItem("id"),
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APISaveToDeskTop, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            var url = res.data[0].response.data.zip_link;
            window.open(url, "_blank");
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const selectCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategoryInfo({ ...categoryInfo, [name]: value });
  };

  const selectOrderbyChange = (event) => {
    const { name, value } = event.target;
    setOrderByData({ ...orderByData, [name]: value });
    setLoading(true);

    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      order: event.target.value,
      pageNumber: pageNumber,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.countryid,
      zipcode: propertyData.zipcode,
      category: categoryInfo.category,
      property: propertyDataType.property,
      tourid: propertyData.tourid,
      mls: propertyData.mls,
    };
    postRecord(APIGetImagesetList, objusr)
      .then((res) => {
        //console.log(res);
        if (res.data[0].response.status === "success") {
          setImagesetList(res.data[0].response.data);
          setMessage(res.data[0].response.status);
          setOpenSuccess(true);
          setPageCount(res.data[0].response.datacount);

          setRefresh(false);
          setLoading(false);
          //setSync(false)
        } else {
          setMessage(res.data[0].response.status);
          setOpenError(true);
          //setSync(false);
        }
        //setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  //console.log(orderByData);
  const propertyHandleChange = (event) => {
    const { name, value } = event.target;
    //setPropertyData({ ...propertyData, [name]: value });
    setPropertyTypeData({ ...propertyDataType, [name]: value });
  };
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };
  const filterTourData = () => {
    setOpen(true);
    setLoading(true);

    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.countryid,
      zipcode: propertyData.zipcode,
      category: categoryInfo.category,
      property: propertyDataType.property,
      tourid: propertyData.tourid,
      mls: propertyData.mls,
      pageNumber: pageNumber,
    };
    postRecord(APIGetImagesetList, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          if (res.data[0].response.data.length > 0) {
            setImagesetList(res.data[0].response.data);
            setPageCount(res.data[0].response.datacount);

            setRefresh(false);
            setLoading(false);
          } else {
            setImagesetList([]);
          }
          setMessage(res.data[0].response.status);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.status);
          setOpenError(true);
          setSync(false);
        }
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
    const newOffset = (event.selected * postPerPage) % imagesetList.length;
    setOffset(newOffset);
  };
  const viewtour = () => {
    if (!localStorage.getItem("id") || localStorage.getItem("id") === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: localStorage.getItem("id"),
      };
      postRecord(APIGetTourDetails, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            if (res.data[0].response.tourdetails.isactive === 0) {
              window.open(
                APIPath() +
                  "agent-video-non-active/" +
                  localStorage.getItem("id"),
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
    }
  };
  const handleDistributeTour = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpenDistributeModal(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        id: id,
        imageset: "yes",
      };
      postRecord(APIDistributeTour, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setDistributeTourLink(res.data[0].response.data);
          }
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
  };
  const handlePostModal = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpenPostCraiglist(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
      };
      postRecord(APILoadCraigList, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setCountryData(res.data[0].response.States);
            setCraiglistData(res.data[0].response.data);
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
    }
  };
  const handleVideoPromo = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpenVideoPromoModal(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
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
    }
  };
  const DomainManger = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      //setCraigeListOpen("agent_pop_tab");

      var craigListId = document.getElementById("DomainMangerID");
      setCraigeListOpen("Domain_Manager");
      craigListId.value = id;

      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
      };
      postRecord(APILoadDomainManager, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            //setInputValue(res.data[0].response.data);
            setDomainData(res.data[0].response.data);
          }
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
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
  const copyTextTour = () => {
    var copyText = document.getElementById("copytexttour");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    setMessage("Copied");
    setOpenSuccess(true);
  };
  const copyTextMls = () => {
    var copyText = document.getElementById("copytextmls");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    setMessage("Copied");
    setOpenSuccess(true);
  };
  const handleDistributeVideoChange = (event) => {
    setDistributeVideoChecked(event);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      state: event === true ? 1 : 0,
      tourId: id,
    };
    postRecord(APIUpdateDistributeTour, obj)
      .then((res) => {
        if (res.data[0].response.status == "success") {
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
  const saveDistributeSetting = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      tourId: id,
      delete_settings: "delete",
      add_settings: "add",
    };
    postRecord(APISaveDistributeSetting, obj)
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
  const handlePodcastChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttopodcast"]: checked === true ? 1 : 0,
    });
  };
  const handleVimeoChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttovimeo"]: checked === true ? 1 : 0,
    });
  };
  const handleYoutubeChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttoyoutube"]: checked === true ? 1 : 0,
    });
  };
  const handleVideoInputChange = (event) => {
    const { name, value } = event.target;
    setVideoPromoData({ ...videoPromoData, [name]: value });
  };
  const updateVideoPromo = () => {
    setOpen(true);
    videoPromoData.authenticate_key = "abcd123XYZ";
    videoPromoData.agent_id = JSON.parse(context.state.user).agentId;
    videoPromoData.tourId = id;
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
  const handleTruveoChange = (checked) => {
    setVideoPromoData({
      ...videoPromoData,
      ["posttotruveo"]: checked === true ? 1 : 0,
    });
  };
  const OrderDomain = () => {
    setOpen(true);
    domainOrderData.agent_id = JSON.parse(context.state.user).agentId;
    domainOrderData.domainname = DomainName;
    domainOrderData.domain = DomainExtension;
    postRecord(APIDomainOrder, domainOrderData)
      .then((res) => {
        console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.msg);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.msg);
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
  const handleDomainName = (event) => {
    setDomainName(event.target.value);
  };
  const SelectExtensioName = (event) => {
    setDomainExtension(event.target.value);
  };
  const SearchDomain = () => {
    setOpen(true);
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      domainname: DomainName,
      domain: DomainExtension,
    };
    postRecord(APIDomainSearch, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          if (res.data[0].response.available == true) {
            setMessage("Domain Name Is Available");
            setOpenSuccess(true);
          } else {
            setMessage("domain name is unavailable or already registered.");
            setOpenError(true);
          }
          setOpen(false);
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
  const handleDomainOrderChange = (event) => {
    const { name, value } = event.target;
    setDomainOrderData({ ...domainOrderData, [name]: value });
  };
  const handlePaymentCardNoChange = (event) => {
    const { name, value } = event.target;
    setDomainOrderData({
      ...domainOrderData,
      [name]: value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    });
  };
  const handlePaymentPhoneChange = (event) => {
    const { name, value } = event.target;
    setDomainOrderData({
      ...domainOrderData,
      [name]: value.replace(/\D/g, ""),
    });
  };
  const saveImageset = (data) => {
    if (
      uploadedImages.length !== 0 ||
      uploadedVideos.length !== 0 ||
      uploadedPanorama.length !== 0
    ) {
      // setOpen(true);
      setGlobalLoading(true);
      setOpenModal(false);

      data.authenticate_key = "abcd123XYZ";
      data.agent_id = JSON.parse(context.state.user).agentId;
      data.caption = imagesetData.caption;
      data.picture = uploadedImages;
      data.video = uploadedVideos;
      data.panorama = uploadedPanorama;
      const formData = new FormData();
      for (let i in data) {
        if (i === "picture") {
          for (let file of data[i]) {
            formData.append("picture[]", file);
          }
        } else if (i === "panorama") {
          for (let file of data[i]) {
            formData.append("panorama[]", file);
          }
        } else if (i === "video") {
          for (let file of data[i]) {
            formData.append("video[]", file);
          }
        } else {
          formData.append(i, data[i]);
        }
      }
      axios
        .post(APIURL() + `agent-save-imageset`, formData, {})
        .then((res) => {
          setGlobalLoading(false);
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
            setGlobalMessage(res.data[0].response.message);
            setGlobalAlertType("success");
            setGlobalOpenPopUp(true);
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
            setSync(true);
            setOpenModal(false);
            setUploadedImages([]);
            setImagesetData(initialImagesetState);
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
            setSync(true);
            setGlobalMessage(res.data[0].response.message);
            setGlobalAlertType("error");
            setGlobalOpenPopUp(true);
          }
          setSync(false);
        })
        .catch((err) => {
          setMessage(
            "Some of the Images are Corrupt Please Check and Upload Again..."
          );
          setGlobalMessage(
            "Some of the Images are Corrupt Please Check and Upload Again..."
          );
          setGlobalAlertType("success");
          setGlobalOpenPopUp(true);
          setOpenError(true);
          setGlobalLoading(false);
        });
    } else {
      setMessage("Please Upload images / videos first to submit the form ...");
      setOpenWarning(true);
    }
  };
  const handleVideoChange = (nextChecked) => {
    setImagesetData({
      ...imagesetData,
      ["videoservice"]: nextChecked === true ? 1 : 0,
    });
  };
  const handleFlyerChange = (nextChecked) => {
    setImagesetData({
      ...imagesetData,
      ["flyerservice"]: nextChecked === true ? 1 : 0,
    });
  };
  const handleTourChange = (nextChecked) => {
    setImagesetData({
      ...imagesetData,
      ["virtualtourservice"]: nextChecked === true ? 1 : 0,
    });
  };
  const handlePanoramaRemove = (data) => {
    const filteredPeople = uploadedPanorama.filter(
      (item) => item.name !== data.name
    );
    setUploadedPanorama(filteredPeople);
  };
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const handleVideoRemove = (data) => {
    const filteredPeople = uploadedVideos.filter(
      (item) => item.name !== data.name
    );
    setUploadedVideos(filteredPeople);
  };
  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
  };
  const handleInputChangeImageSet = (event) => {
    const { name, value } = event.target;
    setImagesetData({ ...imagesetData, [name]: value });
  };
  const handleDeleteModal = () => {
    if (!localStorage.getItem("id") || localStorage.getItem("id") === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      handleDelete(localStorage.getItem("id"));
    }
  };
  const handleServiceLink = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpenServiceModal(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
      };
      postRecord(APITourService, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setServiceLinks(res.data[0].response.data);
            // setMessage(res.data[0].response.message);
            // setOpenSuccess(true);
            //setSync(false);
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
            //setSync(false);
          }
          //setSync(true);
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
  };
  const handleServiceInputChange = (event) => {
    const { name, value } = event.target;
    setServiceLinks({ ...serviceLinks, [name]: value });
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
  const handleTraffic = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpenTrafficModal(true);
    }
  };
  const saveTrafficData = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      tourId: id,
      txtEmail: trafficData.reportrecipients,
      emailStatus: trafficData.weekly_status,
    };
    postRecord(APISaveTrafficReport, obj)
      .then((res) => {
        if (res.data[0].response.status === "Success") {
          setMessage("Traffic Report Data updated successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.msg);
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
  const handleMailStatusChange = (event) => {
    setTrafficdata({
      ...trafficData,
      ["weekly_status"]: event === true ? 1 : 0,
    });
  };
  const sendEmail = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).agentId,
      text: trafficData.reportrecipients,
    };
    postRecord(APISendMail, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.msg);
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
  const handleReport = () => {
    window.open(APIPath() + "site/trafficreport/" + id, "_blank");
  };
  const handleMailChange = (event) => {
    const { value } = event.target;
    setTrafficdata({ ...trafficData, ["reportrecipients"]: value });
  };

  function changeHover(e) {
    setHover(true);
  }
  function changeHover1(e) {
    setHover1(true);
  }
  const handleDuplicate = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      setOpen(true);
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
      };
      postRecord(APIDuplicate, obj)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
            setSync(false);
            setOpen(false);
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
            setSync(false);
            setOpen(false);
          }
          setSync(true);
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
          setOpen(false);
        });
    }
  };
  return (
    <>
      {loading && (
        <div class="load-bar">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      )}

      <Title title="Agent Tour List" />
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

                    <li class="active">
                      <Link class="active" to={APIPath() + "agent-tour-list"}>
                        Tours
                      </Link>
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
          <h2>Manage Your Virtual Tours</h2>
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
                        <i class="fas fa-tasks"></i> Manage Tours
                      </a>
                      <div
                        className={
                          hover ? "show dropdown-menu" : "dropdown-menu"
                        }
                        aria-labelledby="navbarDropdown"
                      >
                        <ul class="column-count-3">
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              <i class="far fa-image"></i> Create a Virtual Tour
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={editTour}>
                              {" "}
                              <i class="fas fa-pen"></i> Edit Tour
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={viewtour}>
                              {" "}
                              <i class="far fa-eye"></i> View Tour
                            </a>
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleDuplicate}>
                              <span>
                                <i class="far fa-clone"></i>
                              </span>
                              Duplicate Tour
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleDeleteModal}
                            >
                              {" "}
                              <i class="fas fa-trash-alt"></i> Delete Tour
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleServiceLink}
                            >
                              {" "}
                              <i class="fas fa-link"></i> Service Links
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleSaveToDesktop}
                            >
                              {" "}
                              <i class="fas fa-desktop"></i> Save To Desktop
                            </a>
                            <input type="hidden" id="desktopId" value="" />
                          </li>

                          <li>
                            <a class="dropdown-item" onClick={handleTraffic}>
                              {" "}
                              <i class="far fa-file-chart-pie"></i> Traffic
                              Report
                            </a>
                            <input type="hidden" id="desktopId" value="" />
                          </li>
                          {agentDataPullListing !== null && (
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={handlePullListing}
                              >
                                {" "}
                                <i class="far fa-file-chart-pie"></i> Pull
                                Listing
                              </a>
                              <input type="hidden" id="desktopId" value="" />
                            </li>
                          )}
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
                        <i class="fas fa-globe"></i> Distribute
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
                              onClick={handleDistributeTour}
                            >
                              <i class="fad fa-chart-network"></i> Distribute
                              Tour
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handlePostModal}>
                              <i class="fas fa-paste"></i> Post to Craigslist
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handleVideoPromo}>
                              <i class="fas fa-video"></i> Video Promotion{" "}
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handleVideoPromo}>
                              <i class="fas fa-photo-video"></i> Distribute
                              Video
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="modal"
                              data-target="#Property"
                            >
                              {" "}
                              <i class="fas fa-home"></i> Single Property Domain
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href={`#${craigeListOpen}`}
                              data-toggle="modal"
                              onClick={() => DomainManger()}
                            >
                              {" "}
                              <i class="fas fa-user-tie"></i> Domain Manager
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  {/*<ul class="nav nav-tabs list_sec" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-toggle="tab"
                          href="#Manage"
                          role="tab"
                        >
                          <i class="fas fa-tasks"></i>Tour Manage
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Filter"
                          role="tab"
                        >
                          <i class="fas fa-filter"></i>Tour Filter
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Distribute"
                          role="tab"
                        >
                          <i class="fas fa-globe"></i>Distribute
                        </a>
                      </li>
                    </ul>*/}
                </div>
                <div class="action_sec_right">
                  <ul>
                    <li>
                      <span>order By</span>
                      <select
                        data-size="5"
                        name="value_order"
                        value={orderByData.value_order}
                        onChange={selectOrderbyChange}
                      >
                        <option value="isactive DESC">Active</option>
                        <option value="isactive ASC">Inactive</option>
                        <option value="creationdate ASC">
                          Creation Date (asc)
                        </option>
                        <option value="creationdate DESC">
                          Creation Date (desc)
                        </option>
                        <option value="tourid ASC">TourID (asc)</option>
                        <option value="tourid DESC">TourID (desc)</option>
                        <option value="caption ASC">Caption (asc)</option>
                        <option value="caption DESC">Caption (desc)</option>
                        <option value="price ASC">Price (asc)</option>
                        <option value="price DESC">Price (desc)</option>
                        <option value="statename ASC">State (asc)</option>
                        <option value="statename DESC">State (desc)</option>
                        <option value="categoryname ASC">Status (asc)</option>
                        <option value="categoryname DESC">Status (desc)</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {allData.length > 0 && (
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="tab-content">
                  <div
                    class="tab-pane"
                    id="Manage"
                    role="tabpanel"
                    style={{ width: "100%", overflow: "auto" }}
                  >
                    <div class="property_info_cont agent_img_sets" id="demo">
                      <section class="snap-scrolling-example">
                        <div class="horizontal-images tabscroll-windows">
                          <OwlCarousel
                            margin={10}
                            {...options}
                            id="home_slide1"
                          >
                            <div className="asdf">
                              {" "}
                              <a
                                class=""
                                onClick={() => {
                                  setOpenModal(true);
                                }}
                              >
                                <span>
                                  <i class="far fa-image"></i>
                                </span>
                                Create a Virtual Tour
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a onClick={editTour}>
                                <span>
                                  <i class="fas fa-pen"></i>
                                </span>
                                Edit Tour
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a onClick={viewtour}>
                                <span>
                                  <i class="far fa-eye"></i>
                                </span>
                                View Tour
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a onClick={handleDeleteModal}>
                                <span>
                                  <i class="fas fa-trash-alt"></i>
                                </span>
                                Delete Tour
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a onClick={handleServiceLink}>
                                <span>
                                  <i class="fas fa-link"></i>
                                </span>
                                Service Links
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a class="" onClick={handleSaveToDesktop}>
                                <span>
                                  <i class="fas fa-desktop"></i>
                                </span>
                                Save To Desktop
                                <input type="hidden" id="desktopId" value="" />
                              </a>
                            </div>
                            <div className="asdf">
                              {" "}
                              <a class="" onClick={handleTraffic}>
                                <span>
                                  <i class="far fa-file-chart-pie"></i>
                                </span>
                                Traffic Report
                              </a>
                              <input type="hidden" id="desktopId" value="" />
                            </div>
                            {agentDataPullListing !== null && (
                              <div className="asdf">
                                {" "}
                                <a class="" onClick={handlePullListing}>
                                  <span>
                                    <i class="far fa-file-chart-pie"></i>
                                  </span>
                                  Pull Listing
                                </a>
                                <input type="hidden" id="desktopId" value="" />
                              </div>
                            )}
                          </OwlCarousel>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div class="tab-pane active" id="Filter" role="tabpanel">
                    <div class="filter_sec">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          //saveWalkThrough();
                          filterTourData();
                        }}
                      >
                        <div class="row">
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <input
                                type="text"
                                name="address"
                                value={propertyData.address}
                                onChange={inputHandleChange}
                                class="form-control"
                                placeholder="Street Address"
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <input
                                type="text"
                                name="city"
                                value={propertyData.city}
                                onChange={inputHandleChange}
                                class="form-control"
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <select
                                name="countryid"
                                value={propertyData.countryid}
                                onChange={handleInputChange}
                                class="form-control formbox1select"
                              >
                                <option value="0">Select State</option>
                                {allStates &&
                                  allStates.map((res) => (
                                    <option value={res.id}>{res.name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <input
                                type="text"
                                name="zipcode"
                                value={propertyData.zipcode}
                                onChange={inputHandleChange}
                                class="form-control"
                                placeholder="Zip Code"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row padd_top">
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <select
                                class="form-control formbox1select"
                                onChange={selectCategoryChange}
                                name="category"
                                value={categoryInfo.category}
                              >
                                <option value="0">Select Category</option>
                                {categoryData &&
                                  categoryData.map((res) => (
                                    <option value={res.id}>
                                      {res.catagory}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <select
                                class="form-control formbox1select"
                                onChange={propertyHandleChange}
                                name="property"
                                value={propertyDataType.property}
                              >
                                <option value="0">Select Property</option>
                                {propertyType &&
                                  propertyType.map((res) => (
                                    <option value={res.id}>
                                      {res.propertyType}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="filter_sec_single">
                              <input
                                type="text"
                                name="tourid"
                                value={propertyData.tourid}
                                onChange={inputHandleChange}
                                class="form-control"
                                placeholder="Tour ID"
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3">
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <div class="filter_sec_single">
                                  <input
                                    type="text"
                                    name="mls"
                                    value={propertyData.mls}
                                    onChange={inputHandleChange}
                                    class="form-control"
                                    placeholder="#MLS"
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <button type="submit" class="next_btn">
                                  FILTER
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="tab-pane" id="Distribute" role="tabpanel">
                    <div class="property_info_cont agent_img_sets" id="demo">
                      <section class="snap-scrolling-example">
                        <div class="horizontal-images tabscroll-windows">
                          <ul class="list_sec" role="">
                            <li class="">
                              <a onClick={handleDistributeTour}>
                                <span>
                                  <i class="fad fa-chart-network"></i>
                                </span>
                                Distribute Tour
                              </a>
                            </li>
                            <li class="">
                              <a onClick={handlePostModal}>
                                <span>
                                  <i class="fas fa-paste"></i>
                                </span>{" "}
                                Post to Craigslist
                              </a>
                            </li>
                            <li class="">
                              <a onClick={handleVideoPromo}>
                                <span>
                                  <i class="fas fa-video"></i>
                                </span>
                                Video Promotion{" "}
                              </a>
                            </li>
                            <li class="">
                              <a onClick={handleVideoPromo}>
                                <span>
                                  <i class="fas fa-photo-video"></i>
                                </span>
                                Distribute Video
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
                                </span>{" "}
                                Single Property Domain
                              </a>
                            </li>
                            <li class="">
                              {/* <a href="#"><span><i class="fas fa-user-tie"></i></span>Domain Manager</a> */}
                              <a
                                href={`#${craigeListOpen}`}
                                data-toggle="modal"
                                onClick={() => DomainManger()}
                              >
                                <span>
                                  <i class="fas fa-user-tie"></i>
                                </span>{" "}
                                Domain Manager
                              </a>
                              <input
                                type="hidden"
                                id="DomainMangerID"
                                value=""
                              />
                            </li>
                          </ul>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="profile_listing_main">
                <div class="row">
                  {allData.length > 0 && !loading ? (
                    allData.map((res) => (
                      <div
                        onClick={() => {
                          localStorage.setItem("id", res.id);
                          setId(res.id);
                          handleImageSetId(res);
                        }}
                        class="col-lg-4 col-md-4"
                      >
                        <div
                          id={"myDiv" + res.id}
                          class="profile_listing_single"
                          style={{ cursor: "pointer" }}
                          onDoubleClick={() => handleEditImageset(res)}
                        >
                          <div class="profile-screen">
                            <img
                              src={res.filename}
                              style={{ height: "178px", width: "355px" }}
                            />
                            <div class="profile-screen-name">{res.caption}</div>
                            <div class="profile-screen-name address">{`${
                              res.address ? res.address : ""
                            } ${res.city ? res.city : ""} ${
                              res.zipcode ? res.zipcode : ""
                            }`}</div>
                            <div class="profile-screen-desc">
                              <div class="profile-screen-desc1">
                                <a onClick={() => handleEditImageset(res)}>
                                  <i class="far fa-edit"></i>
                                </a>
                                <a onClick={() => handleDelete(res.id)}>
                                  <i class="far fa-trash-alt"></i>
                                </a>
                              </div>
                              <div class="profile-screen-desc2">
                                <ul>
                                  <li>
                                    <label>Share:</label>
                                    <ShareLink
                                      link={
                                        "https://virtualtourcafe.com/tour/" +
                                        id +
                                        JSON.parse(context.state.user).agentId
                                      }
                                    >
                                      {(link) => (
                                        <a href={link} target="_blank">
                                          <i class="fab fa-facebook-square fb"></i>
                                        </a>
                                      )}
                                    </ShareLink>
                                  </li>

                                  <li>
                                    <TwitterLink
                                      link={
                                        "https://virtualtourcafe.com/tour/" +
                                        id +
                                        JSON.parse(context.state.user).agentId
                                      }
                                    >
                                      {(link) => (
                                        <a href={link} target="_blank">
                                          <i class="fab fa-twitter-square tw"></i>
                                        </a>
                                      )}
                                    </TwitterLink>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="profile_listing_single_inner">
                            <div class="socila_status">
                              <div className="datesContainer">
                                <div class="socila_status_single">
                                  <label>Created Date :-</label>
                                  <p>{res.createdDate}</p>
                                </div>
                                <div class="socila_status_single">
                                  <label>Updated Date :-</label>
                                  <p>{res.updatedDate}</p>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Status</label>
                                    <input
                                      type="hidden"
                                      value={res.id}
                                      id="statusId"
                                    />
                                    <select
                                      onChange={(event) =>
                                        handleStatusChange(event, res.id)
                                      }
                                      value={res.categoryid}
                                    >
                                      <option value="">Select</option>
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
                                </div>
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Price</label>
                                    <p>{res.price}</p>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Activate/Visible </label>
                                    <div class="switchToggle custom-control custom-switch">
                                      <Switch
                                        onChange={(event) =>
                                          handleActivateChange(event, res.id)
                                        }
                                        checked={res.isactive}
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
                                </div>
                              </div>
                            </div>
                            <div class="socila_status">
                              <div class="row">
                                <div class="col-lg-4 col-md-4">
                                  <div class="socila_status_single">
                                    <label>TOUR SERVICE</label>
                                    <div class="switchToggle custom-control custom-switch c1">
                                      <Switch
                                        onChange={(event) =>
                                          handleTourServiceChange(event, res.id)
                                        }
                                        checked={res.virtualtourservice}
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
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <div class="socila_status_single">
                                    <label>FLYER SERVICE</label>
                                    <div class="switchToggle custom-control custom-switch c1">
                                      <Switch
                                        onChange={(event) =>
                                          handleFlyerServiceChange(
                                            event,
                                            res.id
                                          )
                                        }
                                        checked={res.flyerservice}
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
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <div class="socila_status_single">
                                    <label>VIDEO SERVICE </label>
                                    <div class="switchToggle custom-control custom-switch c1">
                                      <Switch
                                        onChange={(event) =>
                                          handleVideoServiceChange(
                                            event,
                                            res.id
                                          )
                                        }
                                        checked={res.videoservice}
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : refresh === true || loading ? (
                    <div class="row">
                      <Skeleton
                        variant="text"
                        width={360}
                        height={800}
                        style={{
                          background: "#bbbbbb",
                          marginTop: "-164px",
                          marginLeft: "35px",
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width={360}
                        height={800}
                        style={{
                          background: "#bbbbbb",
                          marginTop: "-164px",
                          marginLeft: "45px",
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width={360}
                        height={800}
                        style={{
                          background: "#bbbbbb",
                          marginTop: "-164px",
                          marginLeft: "45px",
                        }}
                      />
                    </div>
                  ) : (
                    <React.Fragment>
                      <h4 style={{ margin: "0 auto" }}>No Tours Found.</h4>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr class="spacer10px"></hr>
          <div class="row">
            <div class="col-lg-12">
              <ReactPaginate
                previousLabel={"«"}
                nextLabel={"»"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                ageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
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
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openDistributeModal}
      >
        <DialogTitle id="customized-dialog-title">
          Distribute Tour
          <CancelIcon
            onClick={() => setOpenDistributeModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
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
                        rel="noreferrer"
                        href={
                          Object.keys(distributeTourLink).length > 0
                            ? distributeTourLink.facebookLink
                            : ""
                        }
                      >
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={
                          Object.keys(distributeTourLink).length > 0
                            ? distributeTourLink.twitterLink
                            : ""
                        }
                      >
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={
                          Object.keys(distributeTourLink).length > 0
                            ? distributeTourLink.shareArticle
                            : ""
                        }
                      >
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={
                          Object.keys(distributeTourLink).length > 0
                            ? distributeTourLink.pinitSharee
                            : ""
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
                    Zillow Group (Zillow/Trulia/HotPads), Homes.com and Others.
                  </p>
                  <div class="table_sec">
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "20%" }}>Branded Tour Link:</td>
                          <td style={{ width: "60%" }}>
                            <input
                              readonly="true"
                              type="text"
                              value={
                                Object.keys(distributeTourLink).length > 0
                                  ? distributeTourLink.BrandedTourLink
                                  : ""
                              }
                              id="copytexttour"
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {" "}
                            <button
                              class="next_btn"
                              onClick={() => copyTextTour()}
                            >
                              Copy
                            </button>
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
                                Object.keys(distributeTourLink).length > 0
                                  ? distributeTourLink.n_BrandedTourLink
                                  : ""
                              }
                              id="copytextmls"
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {" "}
                            <button class="next_btn" onClick={copyTextMls}>
                              Copy
                            </button>
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
                      <label style={{ marginLeft: "45%" }}>
                        Distribute Video
                      </label>
                      <div
                        style={{ marginLeft: "44%", marginTop: "7px" }}
                        class="switchToggle custom-control custom-switch"
                      >
                        <Switch
                          onChange={(event) =>
                            handleDistributeVideoChange(event)
                          }
                          checked={distributeVideoChecked}
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
            onClick={() => saveDistributeSetting()}
          >
            save
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openCraiglist}
      >
        <DialogTitle id="customized-dialog-title">
          PostCraigeList
          <CancelIcon
            onClick={() => setOpenPostCraiglist(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="agent_pop_main">
            <div class="agent_pop_main_head">
              <h5>VirtuleTourCafe - Post to Craigslist</h5>
            </div>
            <div class="agent_pop_cont">
              <p>
                We have created a very simple "Widget" to help you Post to
                Craigslist. Please follow these steps:
              </p>
              <p>
                If you are a Macintosh User, please log into your Craigslist
                Account, then click on "Continue" button below.{" "}
                <strong>highlight</strong> and <strong>right-click</strong> this
                link: <a href="#"> VirtualTourCafe - MyCafeToGo</a> then{" "}
                <strong>"Add to Favorites"</strong> or "Bookmark" the link.
                Alternatively, you can drag the link to your Toolbar if your
                browser allows.
              </p>
            </div>
            <div class="agent_copy">
              <h5>
                <span>1.</span>COPY HTML
              </h5>
              <p>Copy the HTML code in the box below.</p>
            </div>
            <div class="agent_pop_main_head">
              <h5>HTML Code</h5>
            </div>
            <div class="agent_pop_cont">
              <p>
                To Post to Craigslist, select the city that is closest to you.
              </p>
              <textarea
                value={craiglistData}
                readonly
                editable={false}
                rows="6"
              ></textarea>
            </div>
            <div class="agent_copy">
              <h5>
                <span>2.</span>OPEN CRAIGSLIST
              </h5>
              <p>
                Open the Craigslist website page for your city or region
                (below), and follow the steps you normally would to get to the
                page where you create your post. If you are not already
                logged-in to your account, you will be prompted to log in or use
                your email address as a guest.
              </p>
            </div>
            <div class="agent_pop_main_head">
              <h5>Post to Craigslist</h5>
            </div>
            <div class="post_list">
              <p>
                To Post to Craigslist, select the city that is closest to you.
              </p>
              <select id="" class="form-control">
                <option
                  value="https://post.craigslist.org/"
                  selected="selected"
                >
                  Craigslist Home
                </option>

                <optgroup label="US Cities">
                  <option value="https://post.craigslist.org/c/sfo">
                    SF bay area
                  </option>

                  <option value="https://post.craigslist.org/c/abi">
                    abilene
                  </option>

                  <option value="https://post.craigslist.org/c/cak">
                    akron / canton
                  </option>

                  <option value="https://post.craigslist.org/c/anc">
                    alaska
                  </option>

                  <option value="https://post.craigslist.org/c/alb">
                    albany
                  </option>

                  <option value="https://post.craigslist.org/c/abq">
                    albuquerque
                  </option>

                  <option value="https://post.craigslist.org/c/aoo">
                    altoona-johnstown
                  </option>

                  <option value="https://post.craigslist.org/c/ama">
                    amarillo
                  </option>

                  <option value="https://post.craigslist.org/c/ame">
                    ames, IA
                  </option>

                  <option value="https://post.craigslist.org/c/aaa">
                    ann arbor
                  </option>

                  <option value="https://post.craigslist.org/c/anp">
                    annapolis
                  </option>

                  <option value="https://post.craigslist.org/c/app">
                    appleton-oshkosh-FDL
                  </option>

                  <option value="https://post.craigslist.org/c/ash">
                    asheville
                  </option>

                  <option value="https://post.craigslist.org/c/ahn">
                    athens, GA
                  </option>

                  <option value="https://post.craigslist.org/c/ohu">
                    athens, OH
                  </option>

                  <option value="https://post.craigslist.org/c/atl">
                    atlanta
                  </option>

                  <option value="https://post.craigslist.org/c/aub">
                    auburn
                  </option>

                  <option value="https://post.craigslist.org/c/aug">
                    augusta
                  </option>

                  <option value="https://post.craigslist.org/c/aus">
                    austin
                  </option>

                  <option value="https://post.craigslist.org/c/bak">
                    bakersfield
                  </option>

                  <option value="https://post.craigslist.org/c/bal">
                    baltimore
                  </option>

                  <option value="https://post.craigslist.org/c/btr">
                    baton rouge
                  </option>

                  <option value="https://post.craigslist.org/c/bpt">
                    beaumont / port arthur
                  </option>

                  <option value="https://post.craigslist.org/c/bli">
                    bellingham
                  </option>

                  <option value="https://post.craigslist.org/c/bnd">
                    bend
                  </option>

                  <option value="https://post.craigslist.org/c/bgm">
                    binghamton
                  </option>

                  <option value="https://post.craigslist.org/c/bhx">
                    birmingham
                  </option>

                  <option value="https://post.craigslist.org/c/bhm">
                    birmingham, AL
                  </option>

                  <option value="https://post.craigslist.org/c/vpi">
                    blacksburg
                  </option>

                  <option value="https://post.craigslist.org/c/bmg">
                    bloomington
                  </option>

                  <option value="https://post.craigslist.org/c/bln">
                    bloomington-normal
                  </option>

                  <option value="https://post.craigslist.org/c/boi">
                    boise
                  </option>

                  <option value="https://post.craigslist.org/c/bnc">
                    boone
                  </option>

                  <option value="https://post.craigslist.org/c/bos">
                    boston
                  </option>

                  <option value="https://post.craigslist.org/c/bou">
                    boulder
                  </option>

                  <option value="https://post.craigslist.org/c/blg">
                    bowling green
                  </option>

                  <option value="https://post.craigslist.org/c/bro">
                    brownsville
                  </option>

                  <option value="https://post.craigslist.org/c/bwk">
                    brunswick, GA
                  </option>

                  <option value="https://post.craigslist.org/c/buf">
                    buffalo
                  </option>

                  <option value="https://post.craigslist.org/c/cap">
                    cape cod / islands
                  </option>

                  <option value="https://post.craigslist.org/c/cbd">
                    carbondale
                  </option>

                  <option value="https://post.craigslist.org/c/cat">
                    catskills
                  </option>

                  <option value="https://post.craigslist.org/c/ced">
                    cedar rapids
                  </option>

                  <option value="https://post.craigslist.org/c/cnj">
                    central NJ
                  </option>

                  <option value="https://post.craigslist.org/c/cmu">
                    central michigan
                  </option>

                  <option value="https://post.craigslist.org/c/chm">
                    champaign urbana
                  </option>

                  <option value="https://post.craigslist.org/c/chs">
                    charleston, SC
                  </option>

                  <option value="https://post.craigslist.org/c/crw">
                    charleston, WV
                  </option>

                  <option value="https://post.craigslist.org/c/cha">
                    charlotte
                  </option>

                  <option value="https://post.craigslist.org/c/uva">
                    charlottesville
                  </option>

                  <option value="https://post.craigslist.org/c/cht">
                    chattanooga
                  </option>

                  <option value="https://post.craigslist.org/c/chq">
                    chautauqua
                  </option>

                  <option value="https://post.craigslist.org/c/chi">
                    chicago
                  </option>

                  <option value="https://post.craigslist.org/c/chc">
                    chico
                  </option>

                  <option value="https://post.craigslist.org/c/cin">
                    cincinnati, OH
                  </option>

                  <option value="https://post.craigslist.org/c/ckv">
                    clarksville, TN
                  </option>

                  <option value="https://post.craigslist.org/c/cle">
                    cleveland
                  </option>

                  <option value="https://post.craigslist.org/c/cst">
                    college station
                  </option>

                  <option value="https://post.craigslist.org/c/cos">
                    colorado springs
                  </option>

                  <option value="https://post.craigslist.org/c/cou">
                    columbia / jeff city
                  </option>

                  <option value="https://post.craigslist.org/c/cae">
                    columbia, SC
                  </option>

                  <option value="https://post.craigslist.org/c/col">
                    columbus
                  </option>

                  <option value="https://post.craigslist.org/c/csg">
                    columbus, GA
                  </option>

                  <option value="https://post.craigslist.org/c/crp">
                    corpus christi
                  </option>

                  <option value="https://post.craigslist.org/c/crv">
                    corvallis/albany
                  </option>

                  <option value="https://post.craigslist.org/c/dal">
                    dallas / fort worth
                  </option>

                  <option value="https://post.craigslist.org/c/dnv">
                    danville
                  </option>

                  <option value="https://post.craigslist.org/c/day">
                    dayton / springfield
                  </option>

                  <option value="https://post.craigslist.org/c/dab">
                    daytona beach
                  </option>

                  <option value="https://post.craigslist.org/c/dil">
                    decatur, IL
                  </option>

                  <option value="https://post.craigslist.org/c/dlw">
                    delaware
                  </option>

                  <option value="https://post.craigslist.org/c/den">
                    denver
                  </option>

                  <option value="https://post.craigslist.org/c/dsm">
                    des moines
                  </option>

                  <option value="https://post.craigslist.org/c/det">
                    detroit metro
                  </option>

                  <option value="https://post.craigslist.org/c/dhn">
                    dothan, AL
                  </option>

                  <option value="https://post.craigslist.org/c/dbq">
                    dubuque
                  </option>

                  <option value="https://post.craigslist.org/c/dlh">
                    duluth / superior
                  </option>

                  <option value="https://post.craigslist.org/c/eid">
                    east idaho
                  </option>

                  <option value="https://post.craigslist.org/c/eor">
                    east oregon
                  </option>

                  <option value="https://post.craigslist.org/c/nlo">
                    eastern CT
                  </option>

                  <option value="https://post.craigslist.org/c/enc">
                    eastern NC
                  </option>

                  <option value="https://post.craigslist.org/c/esh">
                    eastern shore
                  </option>

                  <option value="https://post.craigslist.org/c/eau">
                    eau claire
                  </option>

                  <option value="https://post.craigslist.org/c/elp">
                    el paso
                  </option>

                  <option value="https://post.craigslist.org/c/elm">
                    elmira-corning
                  </option>

                  <option value="https://post.craigslist.org/c/eri">
                    erie, PA
                  </option>

                  <option value="https://post.craigslist.org/c/eug">
                    eugene
                  </option>

                  <option value="https://post.craigslist.org/c/evv">
                    evansville
                  </option>

                  <option value="https://post.craigslist.org/c/far">
                    fargo / moorhead
                  </option>

                  <option value="https://post.craigslist.org/c/fnm">
                    farmington, NM
                  </option>

                  <option value="https://post.craigslist.org/c/fay">
                    fayetteville
                  </option>

                  <option value="https://post.craigslist.org/c/fyv">
                    fayetteville, AR
                  </option>

                  <option value="https://post.craigslist.org/c/flg">
                    flagstaff / sedona
                  </option>

                  <option value="https://post.craigslist.org/c/fnt">
                    flint
                  </option>

                  <option value="https://post.craigslist.org/c/msl">
                    florence / muscle shoals
                  </option>

                  <option value="https://post.craigslist.org/c/flo">
                    florence, SC
                  </option>

                  <option value="https://post.craigslist.org/c/key">
                    florida keys
                  </option>

                  <option value="https://post.craigslist.org/c/ftc">
                    fort collins / north CO
                  </option>

                  <option value="https://post.craigslist.org/c/fsm">
                    fort smith, AR
                  </option>

                  <option value="https://post.craigslist.org/c/fwa">
                    fort wayne
                  </option>

                  <option value="https://post.craigslist.org/c/fdk">
                    fredericksburg
                  </option>

                  <option value="https://post.craigslist.org/c/fre">
                    fresno
                  </option>

                  <option value="https://post.craigslist.org/c/fmy">
                    ft myers / SW florida
                  </option>

                  <option value="https://post.craigslist.org/c/anb">
                    gadsden-anniston
                  </option>

                  <option value="https://post.craigslist.org/c/gnv">
                    gainesville
                  </option>

                  <option value="https://post.craigslist.org/c/gls">
                    galveston
                  </option>

                  <option value="https://post.craigslist.org/c/gld">
                    gold country
                  </option>

                  <option value="https://post.craigslist.org/c/gil">
                    grand island
                  </option>

                  <option value="https://post.craigslist.org/c/grr">
                    grand rapids
                  </option>

                  <option value="https://post.craigslist.org/c/grb">
                    green bay
                  </option>

                  <option value="https://post.craigslist.org/c/gbo">
                    greensboro
                  </option>

                  <option value="https://post.craigslist.org/c/gsp">
                    greenville / upstate
                  </option>

                  <option value="https://post.craigslist.org/c/gpt">
                    gulfport / biloxi
                  </option>

                  <option value="https://post.craigslist.org/c/nfk">
                    hampton roads
                  </option>

                  <option value="https://post.craigslist.org/c/hrs">
                    harrisburg
                  </option>

                  <option value="https://post.craigslist.org/c/shd">
                    harrisonburg
                  </option>

                  <option value="https://post.craigslist.org/c/htf">
                    hartford
                  </option>

                  <option value="https://post.craigslist.org/c/usm">
                    hattiesburg
                  </option>

                  <option value="https://post.craigslist.org/c/hnl">
                    hawaii
                  </option>

                  <option value="https://post.craigslist.org/c/hky">
                    hickory / lenoir
                  </option>

                  <option value="https://post.craigslist.org/c/hhi">
                    hilton head
                  </option>

                  <option value="https://post.craigslist.org/c/hou">
                    houston
                  </option>

                  <option value="https://post.craigslist.org/c/hud">
                    hudson valley
                  </option>

                  <option value="https://post.craigslist.org/c/hmb">
                    humboldt county
                  </option>

                  <option value="https://post.craigslist.org/c/hts">
                    huntington-ashland
                  </option>

                  <option value="https://post.craigslist.org/c/hsv">
                    huntsville
                  </option>

                  <option value="https://post.craigslist.org/c/imp">
                    imperial county
                  </option>

                  <option value="https://post.craigslist.org/c/ind">
                    indianapolis
                  </option>

                  <option value="https://post.craigslist.org/c/inl">
                    inland empire
                  </option>

                  <option value="https://post.craigslist.org/c/iac">
                    iowa city
                  </option>

                  <option value="https://post.craigslist.org/c/ith">
                    ithaca
                  </option>

                  <option value="https://post.craigslist.org/c/jxn">
                    jackson, MI
                  </option>

                  <option value="https://post.craigslist.org/c/jan">
                    jackson, MS
                  </option>

                  <option value="https://post.craigslist.org/c/jxt">
                    jackson, TN
                  </option>

                  <option value="https://post.craigslist.org/c/jax">
                    jacksonville
                  </option>

                  <option value="https://post.craigslist.org/c/jys">
                    jersey shore
                  </option>

                  <option value="https://post.craigslist.org/c/jbr">
                    jonesboro
                  </option>

                  <option value="https://post.craigslist.org/c/jln">
                    joplin
                  </option>

                  <option value="https://post.craigslist.org/c/kzo">
                    kalamazoo
                  </option>

                  <option value="https://post.craigslist.org/c/ksc">
                    kansas city, MO
                  </option>

                  <option value="https://post.craigslist.org/c/kpr">
                    kennewick-pasco-richland
                  </option>

                  <option value="https://post.craigslist.org/c/rac">
                    kenosha-racine
                  </option>

                  <option value="https://post.craigslist.org/c/grk">
                    killeen / temple / ft hood
                  </option>

                  <option value="https://post.craigslist.org/c/knx">
                    knoxville
                  </option>

                  <option value="https://post.craigslist.org/c/lse">
                    la crosse
                  </option>

                  <option value="https://post.craigslist.org/c/lft">
                    lafayette
                  </option>

                  <option value="https://post.craigslist.org/c/laf">
                    lafayette / west lafayette
                  </option>

                  <option value="https://post.craigslist.org/c/lkc">
                    lake charles
                  </option>

                  <option value="https://post.craigslist.org/c/lal">
                    lakeland
                  </option>

                  <option value="https://post.craigslist.org/c/lns">
                    lancaster, PA
                  </option>

                  <option value="https://post.craigslist.org/c/lan">
                    lansing
                  </option>

                  <option value="https://post.craigslist.org/c/lrd">
                    laredo
                  </option>

                  <option value="https://post.craigslist.org/c/lcr">
                    las cruces
                  </option>

                  <option value="https://post.craigslist.org/c/lvg">
                    las vegas
                  </option>

                  <option value="https://post.craigslist.org/c/lwr">
                    lawrence
                  </option>

                  <option value="https://post.craigslist.org/c/law">
                    lawton
                  </option>

                  <option value="https://post.craigslist.org/c/alt">
                    lehigh valley
                  </option>

                  <option value="https://post.craigslist.org/c/lex">
                    lexington, KY
                  </option>

                  <option value="https://post.craigslist.org/c/lma">
                    lima / findlay
                  </option>

                  <option value="https://post.craigslist.org/c/lnk">
                    lincoln
                  </option>

                  <option value="https://post.craigslist.org/c/lit">
                    little rock
                  </option>

                  <option value="https://post.craigslist.org/c/lgu">
                    logan
                  </option>

                  <option value="https://post.craigslist.org/c/isp">
                    long island
                  </option>

                  <option value="https://post.craigslist.org/c/lax">
                    los angeles
                  </option>

                  <option value="https://post.craigslist.org/c/lou">
                    louisville
                  </option>

                  <option value="https://post.craigslist.org/c/lbb">
                    lubbock
                  </option>

                  <option value="https://post.craigslist.org/c/lyn">
                    lynchburg
                  </option>

                  <option value="https://post.craigslist.org/c/mcn">
                    macon
                  </option>

                  <option value="https://post.craigslist.org/c/mad">
                    madison
                  </option>

                  <option value="https://post.craigslist.org/c/mne">
                    maine
                  </option>

                  <option value="https://post.craigslist.org/c/mhk">
                    manhattan, KS
                  </option>

                  <option value="https://post.craigslist.org/c/mkt">
                    mankato
                  </option>

                  <option value="https://post.craigslist.org/c/mfd">
                    mansfield
                  </option>

                  <option value="https://post.craigslist.org/c/ewv">
                    martinsburg
                  </option>

                  <option value="https://post.craigslist.org/c/mca">
                    mcallen / edinburg
                  </option>

                  <option value="https://post.craigslist.org/c/mfr">
                    medford-ashland-klamath
                  </option>

                  <option value="https://post.craigslist.org/c/mem">
                    memphis, TN
                  </option>

                  <option value="https://post.craigslist.org/c/mdo">
                    mendocino county
                  </option>

                  <option value="https://post.craigslist.org/c/mer">
                    merced
                  </option>

                  <option value="https://post.craigslist.org/c/mil">
                    milwaukee
                  </option>

                  <option value="https://post.craigslist.org/c/min">
                    minneapolis / st paul
                  </option>

                  <option value="https://post.craigslist.org/c/mob">
                    mobile
                  </option>

                  <option value="https://post.craigslist.org/c/mod">
                    modesto
                  </option>

                  <option value="https://post.craigslist.org/c/mhv">
                    mohave county
                  </option>

                  <option value="https://post.craigslist.org/c/mlu">
                    monroe, LA
                  </option>

                  <option value="https://post.craigslist.org/c/mnt">
                    montana
                  </option>

                  <option value="https://post.craigslist.org/c/mtb">
                    monterey bay
                  </option>

                  <option value="https://post.craigslist.org/c/mgm">
                    montgomery
                  </option>

                  <option value="https://post.craigslist.org/c/wvu">
                    morgantown
                  </option>

                  <option value="https://post.craigslist.org/c/mun">
                    muncie / anderson
                  </option>

                  <option value="https://post.craigslist.org/c/mkg">
                    muskegon
                  </option>

                  <option value="https://post.craigslist.org/c/myr">
                    myrtle beach
                  </option>

                  <option value="https://post.craigslist.org/c/nsh">
                    nashville
                  </option>

                  <option value="https://post.craigslist.org/c/nhm">
                    new hampshire
                  </option>

                  <option value="https://post.craigslist.org/c/hvn">
                    new haven
                  </option>

                  <option value="https://post.craigslist.org/c/nor">
                    new orleans
                  </option>

                  <option value="https://post.craigslist.org/c/nyc">
                    new york city
                  </option>

                  <option value="https://post.craigslist.org/c/ndk">
                    north dakota
                  </option>

                  <option value="https://post.craigslist.org/c/njy">
                    north jersey
                  </option>

                  <option value="https://post.craigslist.org/c/nms">
                    north mississippi
                  </option>

                  <option value="https://post.craigslist.org/c/nmi">
                    northern michigan
                  </option>

                  <option value="https://post.craigslist.org/c/nct">
                    northwest CT
                  </option>

                  <option value="https://post.craigslist.org/c/oca">
                    ocala
                  </option>

                  <option value="https://post.craigslist.org/c/odm">
                    odessa / midland
                  </option>

                  <option value="https://post.craigslist.org/c/ogd">
                    ogden-clearfield
                  </option>

                  <option value="https://post.craigslist.org/c/vps">
                    okaloosa / walton
                  </option>

                  <option value="https://post.craigslist.org/c/okc">
                    oklahoma city
                  </option>

                  <option value="https://post.craigslist.org/c/olp">
                    olympic peninsula
                  </option>

                  <option value="https://post.craigslist.org/c/oma">
                    omaha / council bluffs
                  </option>

                  <option value="https://post.craigslist.org/c/orc">
                    orange county
                  </option>

                  <option value="https://post.craigslist.org/c/cor">
                    oregon coast
                  </option>

                  <option value="https://post.craigslist.org/c/orl">
                    orlando
                  </option>

                  <option value="https://post.craigslist.org/c/obx">
                    outer banks
                  </option>

                  <option value="https://post.craigslist.org/c/psp">
                    palm springs, CA
                  </option>

                  <option value="https://post.craigslist.org/c/pfn">
                    panama city, FL
                  </option>

                  <option value="https://post.craigslist.org/c/pkb">
                    parkersburg-marietta
                  </option>

                  <option value="https://post.craigslist.org/c/pns">
                    pensacola / panhandle
                  </option>

                  <option value="https://post.craigslist.org/c/pia">
                    peoria
                  </option>

                  <option value="https://post.craigslist.org/c/phi">
                    philadelphia
                  </option>

                  <option value="https://post.craigslist.org/c/phx">
                    phoenix
                  </option>

                  <option value="https://post.craigslist.org/c/pit">
                    pittsburgh
                  </option>

                  <option value="https://post.craigslist.org/c/plb">
                    plattsburgh-adirondacks
                  </option>

                  <option value="https://post.craigslist.org/c/poc">
                    poconos
                  </option>

                  <option value="https://post.craigslist.org/c/phn">
                    port huron
                  </option>

                  <option value="https://post.craigslist.org/c/pdx">
                    portland, OR
                  </option>

                  <option value="https://post.craigslist.org/c/prc">
                    prescott
                  </option>

                  <option value="https://post.craigslist.org/c/pvu">
                    provo / orem
                  </option>

                  <option value="https://post.craigslist.org/c/pub">
                    pueblo
                  </option>

                  <option value="https://post.craigslist.org/c/plm">
                    pullman / moscow
                  </option>

                  <option value="https://post.craigslist.org/c/mli">
                    quad cities, IA/IL
                  </option>

                  <option value="https://post.craigslist.org/c/ral">
                    raleigh / durham / CH
                  </option>

                  <option value="https://post.craigslist.org/c/rea">
                    reading
                  </option>

                  <option value="https://post.craigslist.org/c/rdd">
                    redding
                  </option>

                  <option value="https://post.craigslist.org/c/prv">
                    rhode island
                  </option>

                  <option value="https://post.craigslist.org/c/ric">
                    richmond
                  </option>

                  <option value="https://post.craigslist.org/c/roa">
                    roanoke
                  </option>

                  <option value="https://post.craigslist.org/c/rmn">
                    rochester, MN
                  </option>

                  <option value="https://post.craigslist.org/c/rcs">
                    rochester, NY
                  </option>

                  <option value="https://post.craigslist.org/c/rfd">
                    rockford
                  </option>

                  <option value="https://post.craigslist.org/c/rck">
                    rocky mountains
                  </option>

                  <option value="https://post.craigslist.org/c/rbg">
                    roseburg
                  </option>

                  <option value="https://post.craigslist.org/c/row">
                    roswell / carlsbad
                  </option>

                  <option value="https://post.craigslist.org/c/sac">
                    sacramento
                  </option>

                  <option value="https://post.craigslist.org/c/mbs">
                    saginaw-midland-baycity
                  </option>

                  <option value="https://post.craigslist.org/c/sle">
                    salem, OR
                  </option>

                  <option value="https://post.craigslist.org/c/slc">
                    salt lake city
                  </option>

                  <option value="https://post.craigslist.org/c/sat">
                    san antonio
                  </option>

                  <option value="https://post.craigslist.org/c/sdo">
                    san diego
                  </option>

                  <option value="https://post.craigslist.org/c/slo">
                    san luis obispo
                  </option>

                  <option value="https://post.craigslist.org/c/tsu">
                    san marcos
                  </option>

                  <option value="https://post.craigslist.org/c/sky">
                    sandusky
                  </option>

                  <option value="https://post.craigslist.org/c/sba">
                    santa barbara
                  </option>

                  <option value="https://post.craigslist.org/c/saf">
                    santa fe / taos
                  </option>

                  <option value="https://post.craigslist.org/c/srq">
                    sarasota-bradenton
                  </option>

                  <option value="https://post.craigslist.org/c/sav">
                    savannah
                  </option>

                  <option value="https://post.craigslist.org/c/avp">
                    scranton / wilkes-barre
                  </option>

                  <option value="https://post.craigslist.org/c/sea">
                    seattle-tacoma
                  </option>

                  <option value="https://post.craigslist.org/c/sbm">
                    sheboygan, WI
                  </option>

                  <option value="https://post.craigslist.org/c/shv">
                    shreveport
                  </option>

                  <option value="https://post.craigslist.org/c/fhu">
                    sierra vista
                  </option>

                  <option value="https://post.craigslist.org/c/sux">
                    sioux city, IA
                  </option>

                  <option value="https://post.craigslist.org/c/mvw">
                    skagit / island / SJI
                  </option>

                  <option value="https://post.craigslist.org/c/sbn">
                    south bend / michiana
                  </option>

                  <option value="https://post.craigslist.org/c/sma">
                    south coast
                  </option>

                  <option value="https://post.craigslist.org/c/sdk">
                    south dakota
                  </option>

                  <option value="https://post.craigslist.org/c/mia">
                    south florida
                  </option>

                  <option value="https://post.craigslist.org/c/snj">
                    south jersey
                  </option>

                  <option value="https://post.craigslist.org/c/smo">
                    southeast missouri
                  </option>

                  <option value="https://post.craigslist.org/c/smd">
                    southern maryland
                  </option>

                  <option value="https://post.craigslist.org/c/swm">
                    southwest michigan
                  </option>

                  <option value="https://post.craigslist.org/c/mlb">
                    space coast
                  </option>

                  <option value="https://post.craigslist.org/c/spk">
                    spokane / coeur d'alene
                  </option>

                  <option value="https://post.craigslist.org/c/spi">
                    springfield, IL
                  </option>

                  <option value="https://post.craigslist.org/c/sgf">
                    springfield, MO
                  </option>

                  <option value="https://post.craigslist.org/c/ust">
                    st augustine
                  </option>

                  <option value="https://post.craigslist.org/c/stc">
                    st cloud
                  </option>

                  <option value="https://post.craigslist.org/c/stg">
                    st george
                  </option>

                  <option value="https://post.craigslist.org/c/stl">
                    st louis, MO
                  </option>

                  <option value="https://post.craigslist.org/c/psu">
                    state college
                  </option>

                  <option value="https://post.craigslist.org/c/osu">
                    stillwater
                  </option>

                  <option value="https://post.craigslist.org/c/stk">
                    stockton
                  </option>

                  <option value="https://post.craigslist.org/c/syr">
                    syracuse
                  </option>

                  <option value="https://post.craigslist.org/c/tal">
                    tallahassee
                  </option>

                  <option value="https://post.craigslist.org/c/tpa">
                    tampa bay area
                  </option>

                  <option value="https://post.craigslist.org/c/tha">
                    terre haute
                  </option>

                  <option value="https://post.craigslist.org/c/txk">
                    texarkana
                  </option>

                  <option value="https://post.craigslist.org/c/tol">
                    toledo
                  </option>

                  <option value="https://post.craigslist.org/c/tpk">
                    topeka
                  </option>

                  <option value="https://post.craigslist.org/c/psl">
                    treasure coast
                  </option>

                  <option value="https://post.craigslist.org/c/tri">
                    tri-cities, TN
                  </option>

                  <option value="https://post.craigslist.org/c/tus">
                    tucson
                  </option>

                  <option value="https://post.craigslist.org/c/tul">
                    tulsa
                  </option>

                  <option value="https://post.craigslist.org/c/tsc">
                    tuscaloosa
                  </option>

                  <option value="https://post.craigslist.org/c/twf">
                    twin falls
                  </option>

                  <option value="https://post.craigslist.org/c/etx">
                    tyler / east TX
                  </option>

                  <option value="https://post.craigslist.org/c/yup">
                    upper peninsula
                  </option>

                  <option value="https://post.craigslist.org/c/uti">
                    utica
                  </option>

                  <option value="https://post.craigslist.org/c/vld">
                    valdosta
                  </option>

                  <option value="https://post.craigslist.org/c/oxr">
                    ventura county
                  </option>

                  <option value="https://post.craigslist.org/c/brl">
                    vermont
                  </option>

                  <option value="https://post.craigslist.org/c/vtx">
                    victoria, TX
                  </option>

                  <option value="https://post.craigslist.org/c/vis">
                    visalia-tulare
                  </option>

                  <option value="https://post.craigslist.org/c/wco">
                    waco
                  </option>

                  <option value="https://post.craigslist.org/c/wdc">
                    washington, DC
                  </option>

                  <option value="https://post.craigslist.org/c/wlo">
                    waterloo / cedar falls
                  </option>

                  <option value="https://post.craigslist.org/c/wtn">
                    watertown
                  </option>

                  <option value="https://post.craigslist.org/c/wau">
                    wausau
                  </option>

                  <option value="https://post.craigslist.org/c/wen">
                    wenatchee
                  </option>

                  <option value="https://post.craigslist.org/c/wva">
                    west virginia (old)
                  </option>

                  <option value="https://post.craigslist.org/c/wky">
                    western KY
                  </option>

                  <option value="https://post.craigslist.org/c/wmd">
                    western maryland
                  </option>

                  <option value="https://post.craigslist.org/c/wma">
                    western massachusetts
                  </option>

                  <option value="https://post.craigslist.org/c/gjt">
                    western slope
                  </option>

                  <option value="https://post.craigslist.org/c/whl">
                    wheeling, WV
                  </option>

                  <option value="https://post.craigslist.org/c/wic">
                    wichita
                  </option>

                  <option value="https://post.craigslist.org/c/wtf">
                    wichita falls
                  </option>

                  <option value="https://post.craigslist.org/c/wpt">
                    williamsport
                  </option>

                  <option value="https://post.craigslist.org/c/wnc">
                    wilmington, NC
                  </option>

                  <option value="https://post.craigslist.org/c/wsl">
                    winston-salem
                  </option>

                  <option value="https://post.craigslist.org/c/wor">
                    worcester / central MA
                  </option>

                  <option value="https://post.craigslist.org/c/wyo">
                    wyoming
                  </option>

                  <option value="https://post.craigslist.org/c/yak">
                    yakima
                  </option>

                  <option value="https://post.craigslist.org/c/yrk">
                    york, PA
                  </option>

                  <option value="https://post.craigslist.org/c/yng">
                    youngstown
                  </option>

                  <option value="https://post.craigslist.org/c/ybs">
                    yuba-sutter
                  </option>

                  <option value="https://post.craigslist.org/c/yum">
                    yuma
                  </option>
                </optgroup>

                <optgroup label="Canadian Cities">
                  <option value="https://post.craigslist.org/c/brr">
                    barrie
                  </option>

                  <option value="https://post.craigslist.org/c/bel">
                    belleville, ON
                  </option>

                  <option value="https://post.craigslist.org/c/clg">
                    calgary
                  </option>

                  <option value="https://post.craigslist.org/c/chk">
                    chatham-kent
                  </option>

                  <option value="https://post.craigslist.org/c/cmx">
                    comox valley
                  </option>

                  <option value="https://post.craigslist.org/c/ycc">
                    cornwall, ON
                  </option>

                  <option value="https://post.craigslist.org/c/koo">
                    cranbrook, BC
                  </option>

                  <option value="https://post.craigslist.org/c/edm">
                    edmonton
                  </option>

                  <option value="https://post.craigslist.org/c/abb">
                    fraser valley
                  </option>

                  <option value="https://post.craigslist.org/c/fmc">
                    ft mcmurray
                  </option>

                  <option value="https://post.craigslist.org/c/gph">
                    guelph
                  </option>

                  <option value="https://post.craigslist.org/c/hfx">
                    halifax
                  </option>

                  <option value="https://post.craigslist.org/c/hml">
                    hamilton-burlington
                  </option>

                  <option value="https://post.craigslist.org/c/kml">
                    kamloops
                  </option>

                  <option value="https://post.craigslist.org/c/kel">
                    kelowna
                  </option>

                  <option value="https://post.craigslist.org/c/kng">
                    kingston, ON
                  </option>

                  <option value="https://post.craigslist.org/c/kch">
                    kitchener-waterloo-cambridge
                  </option>

                  <option value="https://post.craigslist.org/c/lth">
                    lethbridge
                  </option>

                  <option value="https://post.craigslist.org/c/lon">
                    london, ON
                  </option>

                  <option value="https://post.craigslist.org/c/mon">
                    montreal
                  </option>

                  <option value="https://post.craigslist.org/c/nmo">
                    nanaimo
                  </option>

                  <option value="https://post.craigslist.org/c/nbw">
                    new brunswick
                  </option>

                  <option value="https://post.craigslist.org/c/nfl">
                    newfoundland / labrador
                  </option>

                  <option value="https://post.craigslist.org/c/nsc">
                    niagara region
                  </option>

                  <option value="https://post.craigslist.org/c/ott">
                    ottawa-hull-gatineau
                  </option>

                  <option value="https://post.craigslist.org/c/ows">
                    owen sound
                  </option>

                  <option value="https://post.craigslist.org/c/ypq">
                    peterborough
                  </option>

                  <option value="https://post.craigslist.org/c/pei">
                    prince edward island
                  </option>

                  <option value="https://post.craigslist.org/c/yxs">
                    prince george
                  </option>

                  <option value="https://post.craigslist.org/c/qbc">
                    quebec city
                  </option>

                  <option value="https://post.craigslist.org/c/red">
                    red deer
                  </option>

                  <option value="https://post.craigslist.org/c/reg">
                    regina
                  </option>

                  <option value="https://post.craigslist.org/c/sgy">
                    saguenay
                  </option>

                  <option value="https://post.craigslist.org/c/srn">
                    sarnia
                  </option>

                  <option value="https://post.craigslist.org/c/skt">
                    saskatchewan
                  </option>

                  <option value="https://post.craigslist.org/c/soo">
                    sault ste marie, ON
                  </option>

                  <option value="https://post.craigslist.org/c/shb">
                    sherbrooke
                  </option>

                  <option value="https://post.craigslist.org/c/sud">
                    sudbury
                  </option>

                  <option value="https://post.craigslist.org/c/toc">
                    territories
                  </option>

                  <option value="https://post.craigslist.org/c/tby">
                    thunder bay
                  </option>

                  <option value="https://post.craigslist.org/c/tor">
                    toronto
                  </option>

                  <option value="https://post.craigslist.org/c/trs">
                    trois-rivieres
                  </option>

                  <option value="https://post.craigslist.org/c/van">
                    vancouver, BC
                  </option>

                  <option value="https://post.craigslist.org/c/vic">
                    victoria
                  </option>

                  <option value="https://post.craigslist.org/c/whi">
                    whistler, BC
                  </option>

                  <option value="https://post.craigslist.org/c/wsr">
                    windsor
                  </option>

                  <option value="https://post.craigslist.org/c/win">
                    winnipeg
                  </option>
                </optgroup>

                <optgroup label="International Cities">
                  <option value="https://post.craigslist.org/c/abz">
                    aberdeen
                  </option>

                  <option value="https://post.craigslist.org/c/aca">
                    acapulco
                  </option>

                  <option value="https://post.craigslist.org/c/adl">
                    adelaide
                  </option>

                  <option value="https://post.craigslist.org/c/amd">
                    ahmedabad
                  </option>

                  <option value="https://post.craigslist.org/c/alc">
                    alicante
                  </option>

                  <option value="https://post.craigslist.org/c/ams">
                    amsterdam / randstad
                  </option>

                  <option value="https://post.craigslist.org/c/akl">
                    auckland, NZ
                  </option>

                  <option value="https://post.craigslist.org/c/bcs">
                    baja california sur
                  </option>

                  <option value="https://post.craigslist.org/c/ibz">
                    baleares
                  </option>

                  <option value="https://post.craigslist.org/c/bng">
                    bangalore
                  </option>

                  <option value="https://post.craigslist.org/c/bgl">
                    bangladesh
                  </option>

                  <option value="https://post.craigslist.org/c/bar">
                    barcelona
                  </option>

                  <option value="https://post.craigslist.org/c/bsl">
                    basel
                  </option>

                  <option value="https://post.craigslist.org/c/bth">
                    bath
                  </option>

                  <option value="https://post.craigslist.org/c/pek">
                    beijing
                  </option>

                  <option value="https://post.craigslist.org/c/bey">
                    beirut, lebanon
                  </option>

                  <option value="https://post.craigslist.org/c/blf">
                    belfast
                  </option>

                  <option value="https://post.craigslist.org/c/bru">
                    belgium
                  </option>

                  <option value="https://post.craigslist.org/c/cnf">
                    belo horizonte
                  </option>

                  <option value="https://post.craigslist.org/c/ber">
                    berlin
                  </option>

                  <option value="https://post.craigslist.org/c/brn">
                    bern
                  </option>

                  <option value="https://post.craigslist.org/c/bio">
                    bilbao
                  </option>

                  <option value="https://post.craigslist.org/c/blq">
                    bologna
                  </option>

                  <option value="https://post.craigslist.org/c/bod">
                    bordeaux
                  </option>

                  <option value="https://post.craigslist.org/c/bsb">
                    brasilia
                  </option>

                  <option value="https://post.craigslist.org/c/brm">
                    bremen
                  </option>

                  <option value="https://post.craigslist.org/c/bri">
                    brighton
                  </option>

                  <option value="https://post.craigslist.org/c/bne">
                    brisbane
                  </option>

                  <option value="https://post.craigslist.org/c/brs">
                    bristol
                  </option>

                  <option value="https://post.craigslist.org/c/rns">
                    brittany
                  </option>

                  <option value="https://post.craigslist.org/c/bud">
                    budapest
                  </option>

                  <option value="https://post.craigslist.org/c/bue">
                    buenos aires
                  </option>

                  <option value="https://post.craigslist.org/c/cdz">
                    cadiz
                  </option>

                  <option value="https://post.craigslist.org/c/cam">
                    cambridge, UK
                  </option>

                  <option value="https://post.craigslist.org/c/tfn">
                    canarias
                  </option>

                  <option value="https://post.craigslist.org/c/cbr">
                    canberra
                  </option>

                  <option value="https://post.craigslist.org/c/cpt">
                    cape town
                  </option>

                  <option value="https://post.craigslist.org/c/cym">
                    cardiff / wales
                  </option>

                  <option value="https://post.craigslist.org/c/crb">
                    caribbean islands
                  </option>

                  <option value="https://post.craigslist.org/c/ceb">
                    cebu
                  </option>

                  <option value="https://post.craigslist.org/c/che">
                    chennai (madras)
                  </option>

                  <option value="https://post.craigslist.org/c/chh">
                    chihuahua
                  </option>

                  <option value="https://post.craigslist.org/c/scl">
                    chile
                  </option>

                  <option value="https://post.craigslist.org/c/chr">
                    christchurch
                  </option>

                  <option value="https://post.craigslist.org/c/cjs">
                    ciudad juarez
                  </option>

                  <option value="https://post.craigslist.org/c/cgn">
                    cologne
                  </option>

                  <option value="https://post.craigslist.org/c/bog">
                    colombia
                  </option>

                  <option value="https://post.craigslist.org/c/cop">
                    copenhagen
                  </option>

                  <option value="https://post.craigslist.org/c/cri">
                    costa rica
                  </option>

                  <option value="https://post.craigslist.org/c/cov">
                    coventry
                  </option>

                  <option value="https://post.craigslist.org/c/zag">
                    croatia
                  </option>

                  <option value="https://post.craigslist.org/c/cwb">
                    curitiba
                  </option>

                  <option value="https://post.craigslist.org/c/drw">
                    darwin
                  </option>

                  <option value="https://post.craigslist.org/c/dvo">
                    davao city
                  </option>

                  <option value="https://post.craigslist.org/c/del">
                    delhi
                  </option>

                  <option value="https://post.craigslist.org/c/dby">
                    derby
                  </option>

                  <option value="https://post.craigslist.org/c/dvc">
                    devon &amp; cornwall
                  </option>

                  <option value="https://post.craigslist.org/c/drs">
                    dresden
                  </option>

                  <option value="https://post.craigslist.org/c/uae">
                    dubai, UAE
                  </option>

                  <option value="https://post.craigslist.org/c/dub">
                    dublin
                  </option>

                  <option value="https://post.craigslist.org/c/dnd">
                    dundee
                  </option>

                  <option value="https://post.craigslist.org/c/dur">
                    durban
                  </option>

                  <option value="https://post.craigslist.org/c/dus">
                    dusseldorf
                  </option>

                  <option value="https://post.craigslist.org/c/nwh">
                    east anglia
                  </option>

                  <option value="https://post.craigslist.org/c/eml">
                    east midlands
                  </option>

                  <option value="https://post.craigslist.org/c/qui">
                    ecuador
                  </option>

                  <option value="https://post.craigslist.org/c/edi">
                    edinburgh
                  </option>

                  <option value="https://post.craigslist.org/c/cai">
                    egypt
                  </option>

                  <option value="https://post.craigslist.org/c/ess">
                    essen / ruhr
                  </option>

                  <option value="https://post.craigslist.org/c/esx">
                    essex
                  </option>

                  <option value="https://post.craigslist.org/c/fro">
                    faro / algarve
                  </option>

                  <option value="https://post.craigslist.org/c/hel">
                    finland
                  </option>

                  <option value="https://post.craigslist.org/c/flr">
                    florence / tuscany
                  </option>

                  <option value="https://post.craigslist.org/c/ftl">
                    fortaleza
                  </option>

                  <option value="https://post.craigslist.org/c/fra">
                    frankfurt
                  </option>

                  <option value="https://post.craigslist.org/c/fuk">
                    fukuoka
                  </option>

                  <option value="https://post.craigslist.org/c/gva">
                    geneva
                  </option>

                  <option value="https://post.craigslist.org/c/gen">
                    genoa
                  </option>

                  <option value="https://post.craigslist.org/c/gla">
                    glasgow
                  </option>

                  <option value="https://post.craigslist.org/c/goa">goa</option>

                  <option value="https://post.craigslist.org/c/grx">
                    granada
                  </option>

                  <option value="https://post.craigslist.org/c/ath">
                    greece
                  </option>

                  <option value="https://post.craigslist.org/c/gnb">
                    grenoble
                  </option>

                  <option value="https://post.craigslist.org/c/gua">
                    guadalajara
                  </option>

                  <option value="https://post.craigslist.org/c/gum">
                    guam-micronesia
                  </option>

                  <option value="https://post.craigslist.org/c/bjx">
                    guanajuato
                  </option>

                  <option value="https://post.craigslist.org/c/can">
                    guangzhou
                  </option>

                  <option value="https://post.craigslist.org/c/hfa">
                    haifa
                  </option>

                  <option value="https://post.craigslist.org/c/ham">
                    hamburg
                  </option>

                  <option value="https://post.craigslist.org/c/sou">
                    hampshire
                  </option>

                  <option value="https://post.craigslist.org/c/hgh">
                    hangzhou
                  </option>

                  <option value="https://post.craigslist.org/c/haj">
                    hannover
                  </option>

                  <option value="https://post.craigslist.org/c/hdb">
                    heidelberg
                  </option>

                  <option value="https://post.craigslist.org/c/hrm">
                    hermosillo
                  </option>

                  <option value="https://post.craigslist.org/c/hij">
                    hiroshima
                  </option>

                  <option value="https://post.craigslist.org/c/hba">
                    hobart
                  </option>

                  <option value="https://post.craigslist.org/c/hkg">
                    hong kong
                  </option>

                  <option value="https://post.craigslist.org/c/hyd">
                    hyderabad
                  </option>

                  <option value="https://post.craigslist.org/c/jkt">
                    indonesia
                  </option>

                  <option value="https://post.craigslist.org/c/idr">
                    indore
                  </option>

                  <option value="https://post.craigslist.org/c/jai">
                    jaipur
                  </option>

                  <option value="https://post.craigslist.org/c/jvl">
                    janesville
                  </option>

                  <option value="https://post.craigslist.org/c/jrs">
                    jerusalem
                  </option>

                  <option value="https://post.craigslist.org/c/jnb">
                    johannesburg
                  </option>

                  <option value="https://post.craigslist.org/c/ken">
                    kent
                  </option>

                  <option value="https://post.craigslist.org/c/cok">
                    kerala
                  </option>

                  <option value="https://post.craigslist.org/c/kol">
                    kolkata (calcutta)
                  </option>

                  <option value="https://post.craigslist.org/c/lds">
                    leeds
                  </option>

                  <option value="https://post.craigslist.org/c/lej">
                    leipzig
                  </option>

                  <option value="https://post.craigslist.org/c/lil">
                    lille
                  </option>

                  <option value="https://post.craigslist.org/c/lis">
                    lisbon
                  </option>

                  <option value="https://post.craigslist.org/c/liv">
                    liverpool
                  </option>

                  <option value="https://post.craigslist.org/c/nte">
                    loire valley
                  </option>

                  <option value="https://post.craigslist.org/c/ldn">
                    london
                  </option>

                  <option value="https://post.craigslist.org/c/lux">
                    luxembourg
                  </option>

                  <option value="https://post.craigslist.org/c/lys">
                    lyon
                  </option>

                  <option value="https://post.craigslist.org/c/mdd">
                    madrid
                  </option>

                  <option value="https://post.craigslist.org/c/agp">
                    malaga
                  </option>

                  <option value="https://post.craigslist.org/c/mly">
                    malaysia
                  </option>

                  <option value="https://post.craigslist.org/c/man">
                    manchester
                  </option>

                  <option value="https://post.craigslist.org/c/mnl">
                    manila
                  </option>

                  <option value="https://post.craigslist.org/c/mrs">
                    marseille
                  </option>

                  <option value="https://post.craigslist.org/c/mzt">
                    mazatlan
                  </option>

                  <option value="https://post.craigslist.org/c/mel">
                    melbourne
                  </option>

                  <option value="https://post.craigslist.org/c/mex">
                    mexico city
                  </option>

                  <option value="https://post.craigslist.org/c/mxp">
                    milan
                  </option>

                  <option value="https://post.craigslist.org/c/mty">
                    monterrey
                  </option>

                  <option value="https://post.craigslist.org/c/mvd">
                    montevideo
                  </option>

                  <option value="https://post.craigslist.org/c/mpl">
                    montpellier
                  </option>

                  <option value="https://post.craigslist.org/c/mos">
                    moscow
                  </option>

                  <option value="https://post.craigslist.org/c/mum">
                    mumbai
                  </option>

                  <option value="https://post.craigslist.org/c/muc">
                    munich
                  </option>

                  <option value="https://post.craigslist.org/c/ngo">
                    nagoya
                  </option>

                  <option value="https://post.craigslist.org/c/nap">
                    napoli / campania
                  </option>

                  <option value="https://post.craigslist.org/c/ncl">
                    newcastle
                  </option>

                  <option value="https://post.craigslist.org/c/nce">
                    nice / cote d'azur
                  </option>

                  <option value="https://post.craigslist.org/c/rou">
                    normandy
                  </option>

                  <option value="https://post.craigslist.org/c/osl">
                    norway
                  </option>

                  <option value="https://post.craigslist.org/c/not">
                    nottingham
                  </option>

                  <option value="https://post.craigslist.org/c/oax">
                    oaxaca
                  </option>

                  <option value="https://post.craigslist.org/c/oka">
                    okinawa
                  </option>

                  <option value="https://post.craigslist.org/c/osa">
                    osaka-kobe-kyoto
                  </option>

                  <option value="https://post.craigslist.org/c/oxf">
                    oxford
                  </option>

                  <option value="https://post.craigslist.org/c/pak">
                    pakistan
                  </option>

                  <option value="https://post.craigslist.org/c/pan">
                    panama
                  </option>

                  <option value="https://post.craigslist.org/c/par">
                    paris
                  </option>

                  <option value="https://post.craigslist.org/c/per">
                    perth
                  </option>

                  <option value="https://post.craigslist.org/c/lim">
                    peru
                  </option>

                  <option value="https://post.craigslist.org/c/peg">
                    perugia
                  </option>

                  <option value="https://post.craigslist.org/c/waw">
                    poland
                  </option>

                  <option value="https://post.craigslist.org/c/pto">
                    porto
                  </option>

                  <option value="https://post.craigslist.org/c/pgp">
                    porto alegre
                  </option>

                  <option value="https://post.craigslist.org/c/prg">
                    prague
                  </option>

                  <option value="https://post.craigslist.org/c/pbl">
                    puebla
                  </option>

                  <option value="https://post.craigslist.org/c/pri">
                    puerto rico
                  </option>

                  <option value="https://post.craigslist.org/c/pvr">
                    puerto vallarta
                  </option>

                  <option value="https://post.craigslist.org/c/pnq">
                    pune
                  </option>

                  <option value="https://post.craigslist.org/c/rec">
                    recife
                  </option>

                  <option value="https://post.craigslist.org/c/rno">
                    reno / tahoe
                  </option>

                  <option value="https://post.craigslist.org/c/rio">
                    rio de janeiro
                  </option>

                  <option value="https://post.craigslist.org/c/rom">
                    rome
                  </option>

                  <option value="https://post.craigslist.org/c/ssa">
                    salvador, bahia
                  </option>

                  <option value="https://post.craigslist.org/c/spo">
                    sao paulo
                  </option>

                  <option value="https://post.craigslist.org/c/spp">
                    sapporo
                  </option>

                  <option value="https://post.craigslist.org/c/srd">
                    sardinia
                  </option>

                  <option value="https://post.craigslist.org/c/sel">
                    seoul
                  </option>

                  <option value="https://post.craigslist.org/c/sev">
                    sevilla
                  </option>

                  <option value="https://post.craigslist.org/c/sha">
                    shanghai
                  </option>

                  <option value="https://post.craigslist.org/c/shf">
                    sheffield
                  </option>

                  <option value="https://post.craigslist.org/c/szx">
                    shenzhen
                  </option>

                  <option value="https://post.craigslist.org/c/sic">
                    sicilia
                  </option>

                  <option value="https://post.craigslist.org/c/sng">
                    singapore
                  </option>

                  <option value="https://post.craigslist.org/c/stp">
                    st petersburg, RU
                  </option>

                  <option value="https://post.craigslist.org/c/sxb">
                    strasbourg
                  </option>

                  <option value="https://post.craigslist.org/c/str">
                    stuttgart
                  </option>

                  <option value="https://post.craigslist.org/c/sth">
                    sweden
                  </option>

                  <option value="https://post.craigslist.org/c/syd">
                    sydney
                  </option>

                  <option value="https://post.craigslist.org/c/twd">
                    taiwan
                  </option>

                  <option value="https://post.craigslist.org/c/tlv">
                    tel aviv
                  </option>

                  <option value="https://post.craigslist.org/c/bkk">
                    thailand
                  </option>

                  <option value="https://post.craigslist.org/c/tij">
                    tijuana
                  </option>

                  <option value="https://post.craigslist.org/c/tok">
                    tokyo
                  </option>

                  <option value="https://post.craigslist.org/c/trn">
                    torino
                  </option>

                  <option value="https://post.craigslist.org/c/tls">
                    toulouse
                  </option>

                  <option value="https://post.craigslist.org/c/ist">
                    turkey
                  </option>

                  <option value="https://post.craigslist.org/c/val">
                    valencia
                  </option>

                  <option value="https://post.craigslist.org/c/ccs">
                    venezuela
                  </option>

                  <option value="https://post.craigslist.org/c/vce">
                    venice / veneto
                  </option>

                  <option value="https://post.craigslist.org/c/vcz">
                    veracruz
                  </option>

                  <option value="https://post.craigslist.org/c/vie">
                    vienna
                  </option>

                  <option value="https://post.craigslist.org/c/vtn">
                    vietnam
                  </option>

                  <option value="https://post.craigslist.org/c/wll">
                    wellington
                  </option>

                  <option value="https://post.craigslist.org/c/pal">
                    west bank
                  </option>

                  <option value="https://post.craigslist.org/c/yuc">
                    yucatan
                  </option>

                  <option value="https://post.craigslist.org/c/zur">
                    zurich
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="login_guest">
              <div class="row">
                <div class="col-lg-4 col-md-4">
                  <div class="login_guest_single">
                    <div class="agent_copy">
                      <h5>
                        <span>3.</span>LOGIN OR GUEST
                      </h5>
                      <i class="fas fa-sign-in-alt"></i>
                      <p>
                        Fill-in the Craigslist fields such as title, price, etc.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4">
                  <div class="login_guest_single">
                    <div class="agent_copy">
                      <h5>
                        <span>4.</span>SELECT REAL ESTATE FOR SALE
                      </h5>
                      <i class="fas fa-home"></i>
                      <p>
                        SClick your mouse in the Posting Description field and
                        PASTE the HTML code. The HTML will appear in the Posting
                        Description field.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4">
                  <div class="login_guest_single">
                    <div class="agent_copy">
                      <h5>
                        <span>5.</span>RETURN TO VTC
                      </h5>
                      <i class="fas fa-undo-alt"></i>
                      <p>
                        nce all the fields are populated continue with your
                        Craigslist post to add your pictures and complete your
                        posting.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="next_btn border-0 mr-1"
                    data-dismiss=""
                  >
                    Save
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
        aria-labelledby="customized-dialog-title"
        open={openServiceModal}
      >
        <DialogTitle id="customized-dialog-title">
          Service Links
          <CancelIcon
            onClick={() => setOpenServiceModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="agent_pop_main">
            <div class="agent_pop_main_head">
              <h5>Branded Links</h5>
              <div class="row" style={{ paddingLeft: "20px" }}>
                <div class="agent_info_sec_cont" style={{ width: "100%" }}>
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
            <div class="agent_pop_main_head" style={{ paddingTop: "15px" }}>
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
            <div class="agent_pop_main_head" style={{ paddingTop: "15px" }}>
              <h5>Email Links</h5>
              <p style={{ paddingTop: "10px" }}>
                You could enter multiple email addresses separated by comma.
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
              <button type="button" onClick={SendServiceMail} class="next_btn">
                Send
              </button>
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
                        >
                          Real Estate,Virtual Tour,VirtualTourCafe,Homes for
                          sale,test,AD,test
                        </textarea>
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
        fullScreen
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title">
          Create Image Set
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
                saveImageset(imagesetData);
              }}
            >
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="browse_img_conts_main">
                    <div class="browse_img_conts">
                      <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#tab_one"
                            role="tab"
                          >
                            <i class="far fa-images"></i>Picture
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#tab_two"
                            role="tab"
                          >
                            <i class="fas fa-photo-video"></i>Videos
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#tab_three"
                            role="tab"
                          >
                            <i class="fas fa-camera-retro"></i>Panoramas
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content" id="">
                      <div class="tab-pane active" id="tab_one" role="tabpanel">
                        <h6 class="optimal_pic">
                          Optimal picture size is 1075x768. Images should not be
                          larger than 5mb file size and no smaller than 1075x768
                          or larger.
                        </h6>
                        <Dropzone
                          parallelUploads="3"
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
                          {({ getRootProps, getInputProps, isDragActive }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              {isDragActive ? (
                                <p>Drop the files here ...</p>
                              ) : (
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
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
                      </div>
                      <div class="tab-pane" id="tab_two" role="tabpanel">
                        <h6 class="optimal_pic">
                          Videos should be .mp4 file format and no larger than
                          50mb file size. Please be aware of MLS rules when
                          adding videos with agent or broker branding and using
                          MLS links as the videos will be included.
                          <span class="close">X</span>
                        </h6>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            acceptedFiles.map((res) => {
                              if (res.type == "video/mp4") {
                                setUploadedVideos((oldArray) => [
                                  ...oldArray,
                                  res,
                                ]);
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
                                  Drag 'n' drop some files here, or click to
                                  select files
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
                              {uploadedVideos.map((res, index) => (
                                <React.Fragment>
                                  <h6
                                    style={{
                                      marginLeft: "20px",
                                      color: "green",
                                    }}
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
                      </div>
                      <div class="tab-pane" id="tab_three" role="tabpanel">
                        <h6 class="optimal_pic">
                          Panoramas should be full 360 degree panoramas and be
                          no larger than 4096 pixels wide.
                          <span class="close">X</span>
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
                                setUploadedPanorama((oldArray) => [
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
                          {({ getRootProps, getInputProps, isDragActive }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              {isDragActive ? (
                                <p>Drop the files here ...</p>
                              ) : (
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
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
                                    style={{ height: "100px", width: "100%" }}
                                    src={getImageFromUpload(res)}
                                    alt="img"
                                  />
                                  <CancelIcon
                                    onClick={() => handlePanoramaRemove(res)}
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
                  <hr class="spacer10px"></hr>
                </div>
              </div>

              <h4>Property Information</h4>
              <hr></hr>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Country</label>
                    <div class="align_center">
                      <select
                        name="countryid"
                        value={imagesetData.countryid}
                        onChange={handleInputChangeImageSet}
                      >
                        <option value="0">Select Country</option>
                        {allCountries.map((res) => (
                          <option value={res.id}>{res.name}</option>
                        ))}
                      </select>
                      <span class="agent_icn">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>State</label>
                    <div class="align_center">
                      <select
                        name="stateid"
                        value={imagesetData.stateid}
                        onChange={handleInputChangeImageSet}
                      >
                        <option value="0">Select State</option>
                        {allStates &&
                          allStates.map((res) => (
                            <option value={res.id}>{res.name}</option>
                          ))}
                      </select>
                      <span class="agent_icn">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>City</label>
                    <div class="align_center">
                      <input
                        type="text"
                        name="city"
                        onChange={handleInputChangeImageSet}
                        value={imagesetData.city}
                        placeholder="City"
                      />
                      <span class="agent_icn">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Status</label>
                    <div class="align_center">
                      <select
                        name="categoryid"
                        value={imagesetData.categoryid}
                        onChange={handleInputChangeImageSet}
                      >
                        <option value="">---Select Status---</option>
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
                        <option value="13">For-Sale-By-Owner</option>
                      </select>
                      <span class="agent_icn">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Property Type</label>
                    <div class="align_center">
                      <select
                        name="typeid"
                        value={imagesetData.typeid}
                        onChange={handleInputChangeImageSet}
                      >
                        <option value="">Select Property Type</option>
                        <option value="1">Single Family Home</option>
                        <option value="2">Condo</option>
                        <option value="3">Townhouse</option>
                        <option value="4">Coop</option>
                        <option value="5">Apartment</option>
                        <option value="6">Loft</option>
                        <option value="7">Mobile/Manufactured</option>
                        <option value="8">Farm/Ranch</option>
                        <option value="9">Multi-Family</option>
                        <option value="10">Income/Investment</option>
                        <option value="11">Houseboat</option>
                        <option value="12">Commercial Lot/Land</option>
                        <option value="13">Not Applicable</option>
                        <option value="14">Commercial</option>
                        <option value="15">Duet</option>
                        <option value="16">Duplex</option>
                        <option value="17">Triplex</option>
                        <option value="18">Commercial Rental</option>
                        <option value="19">Residential Lot/Land</option>
                      </select>
                      <span class="agent_icn">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Caption/Title *</label>
                    <div class="align_center">
                      <input
                        type="text"
                        name="caption"
                        value={imagesetData.caption}
                        onChange={handleInputChangeImageSet}
                        placeholder="Caption"
                      />
                      <span class="agent_icn">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Currency</label>
                    <div class="align_center">
                      <select
                        name="pricetype"
                        value={imagesetData.pricetype}
                        onChange={handleInputChangeImageSet}
                      >
                        <option value="USD">USD</option>
                        <option value="CAD">CAD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <span class="agent_icn">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>Price</label>
                    <div class="align_center">
                      <input
                        type="text"
                        name="price"
                        value={imagesetData.price}
                        onChange={handleInputChangeImageSet}
                        placeholder="Price"
                      />
                      <span class="agent_icn">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="agent_sign_up_single">
                    <label>MLS</label>
                    <div class="align_center">
                      <input
                        type="text"
                        name="mls"
                        value={imagesetData.mls}
                        onChange={handleInputChangeImageSet}
                        placeholder="MLS"
                      />
                      <span class="agent_icn">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Services</h4>
              <hr></hr>
              <div class="row">
                <div class="col-lg-4 col-md-4">
                  <div class="agent_sign_up_single">
                    <label style={{ marginRight: "30px" }}>Tour</label>
                    <Switch
                      defaultChecked
                      onChange={handleTourChange}
                      checked={imagesetData.virtualtourservice}
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
                <div class="col-lg-4 col-md-4">
                  <div class="agent_sign_up_single">
                    <label style={{ marginRight: "30px" }}>Flyer</label>
                    <Switch
                      onChange={handleFlyerChange}
                      checked={imagesetData.flyerservice}
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
                <div class="col-lg-4 col-md-4">
                  <div class="agent_sign_up_single">
                    <label style={{ marginRight: "30px" }}>Video</label>
                    <Switch
                      onChange={handleVideoChange}
                      checked={imagesetData.videoservice}
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
              <hr></hr>
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
                    <input
                      type="text"
                      class="form-control"
                      value={trafficData.reportrecipients}
                      onChange={handleMailChange}
                    />
                    <div class="d-flex">
                      <button
                        onClick={handleReport}
                        type="button"
                        class="next_btn"
                      >
                        View Report
                      </button>
                      <button
                        onClick={sendEmail}
                        type="button"
                        class="next_btn grey email_btn"
                      >
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
                    <Switch
                      onChange={(event) => handleMailStatusChange(event)}
                      checked={trafficData.weekly_status}
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
                    {/* <div class="switchToggle custom-control custom-switch">

                                            <input onChange={handleMailStatusChange} type="checkbox" class="custom-control-input" id="customSwitch333" />
                                            <label class="custom-control-label" for="customSwitch333">&nbsp;</label>
                                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={saveTrafficData}
            startIcon={<SaveIcon />}
          >
            save
          </Button>
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
                  Single Property Domain<i class="fas fa-home"></i>
                </h4>
              </div>
              <div class="modal-body">
                <div class="agent_pop_main">
                  <div class="agent_imgset-popsection">
                    <div class="agent_pop_main_head">
                      <h5>Search for a domain</h5>
                    </div>
                    <div class="other_links_sec">
                      <div class="row">
                        <div class="col-lg-12">
                          <label>
                            Domain Name
                            <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="post_list">
                            <input
                              type="text"
                              name="domainName"
                              onChange={handleDomainName}
                              placeholder=""
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="post_list">
                            <select
                              class="form-control"
                              onChange={SelectExtensioName}
                            >
                              <option>Select Extension</option>
                              {extensionName.map((res) => (
                                <option value={res.productname}>
                                  {res.productname}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button
                            type="button"
                            onClick={SearchDomain}
                            class="next_btn border-0"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="agent_imgset-popsection">
                    <div class="agent_pop_main_head">
                      <h5>Select Tour & Link</h5>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <label style={{ paddingTop: "10px" }}>
                          Active Tours
                          <span style={{ color: "#ffa12d" }}>*</span>
                        </label>
                        <div class="post_list" style={{ padding: "0" }}>
                          <select
                            class="form-control"
                            name="tour_id"
                            value={domainOrderData.tour_id}
                            onChange={handleDomainOrderChange}
                          >
                            <option value="0">Select Tours</option>
                            {activeTour.map((res) => (
                              <option value={res.id}>
                                {res.id} - {res.caption}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <span class="radio radio-primary">
                          <input
                            type="radio"
                            name="radio1"
                            id="radio1"
                            value="option1"
                          />
                          <label for="radio1">Virtual Tour </label>
                        </span>
                        <span class="radio radio-primary">
                          <input
                            type="radio"
                            name="radio1"
                            id="radio2"
                            value="option2"
                            checked={true}
                          />
                          <label for="radio2">Flyer</label>
                        </span>
                        <span class="radio radio-primary">
                          <input
                            type="radio"
                            name="radio1"
                            id="radio3"
                            value="option3"
                          />
                          <label for="radio3">Specify Site </label>
                        </span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="agent_pop_main_head"
                    style={{ paddingTop: "15px" }}
                  >
                    <h5>Checkout Details</h5>
                  </div>
                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-lg-6">
                      <label>
                        Credit Card Number
                        <span style={{ color: "#ffa12d" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="ccno"
                        value={domainOrderData.ccno}
                        onChange={handlePaymentCardNoChange}
                        placeholder=""
                        class="form-control"
                      />
                    </div>
                    <div class="col-lg-6">
                      <label>
                        CVV<span style={{ color: "#ffa12d" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={domainOrderData.cvv}
                        onChange={handlePaymentPhoneChange}
                        placeholder=""
                        class="form-control"
                        maxLength="3"
                      />
                    </div>
                  </div>
                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-lg-4">
                      <label>
                        Expiration Date
                        <span style={{ color: "#ffa12d" }}>*</span>
                      </label>
                      <select
                        class="form-control"
                        name="exp_month"
                        value={domainOrderData.exp_month}
                        onChange={handleDomainOrderChange}
                      >
                        <option value="0">Select Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div class="col-lg-4">
                      <label>
                        Select Year<span style={{ color: "#ffa12d" }}>*</span>
                      </label>
                      <select
                        class="form-control"
                        name="exp_year"
                        value={domainOrderData.exp_year}
                        onChange={handleDomainOrderChange}
                      >
                        <option value="0">Select Year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                      </select>{" "}
                    </div>
                    <div class="col-lg-4">
                      <label>
                        Amount<span style={{ color: "#ffa12d" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="$ 25.00"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  {/* <div class="row" style={{ paddingTop: "10px" }}>
                                        <div class="col-lg-6">
                                            <label>Expiration Date<span style={{ color: "#ffa12d" }}>*</span></label>
                                            <input type="text" name="" placeholder="" class="form-control" />
                                        </div>
                                        <div class="col-lg-6">
                                            <label>Amount<span style={{ color: "#ffa12d" }}>*</span></label>
                                            <input type="text" name="" placeholder="" class="form-control" />
                                        </div>
                                    </div> */}
                  <div class="row" style={{ paddingTop: "10px" }}>
                    <div class="col-lg-12">
                      <label>
                        Set this profile as default{" "}
                        <span style={{ color: "#ffa12d" }}>
                          - Error getting your card details*
                        </span>
                      </label>
                      <div class="switchToggle custom-control custom-switch">
                        <input
                          type="checkbox"
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
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <button
                        onClick={() => OrderDomain()}
                        type="button"
                        class="next_btn border-0"
                      >
                        Order Domain
                      </button>
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
      <div class="agent_pop">
        <div id="Domain_Manager" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">
                  Domain Manager List<i class="fas fa-video"></i>
                </h4>
              </div>
              <div class="modal-body">
                <table
                  style={{ width: "100%", fontSize: "12px" }}
                  class="table table-bordered"
                >
                  <thead>
                    <tr>
                      <td style={{ fontSize: "12px" }}>Sl.no</td>
                      <td style={{ fontSize: "12px" }}>CreatedAt</td>
                      <td style={{ fontSize: "12px" }}>Domain</td>
                      <td style={{ fontSize: "12px" }}>DomainId</td>
                      <td style={{ fontSize: "12px" }}>expires</td>
                      <td style={{ fontSize: "12px" }}>Renew Deadline</td>
                      <td style={{ fontSize: "12px" }}>Status</td>
                      {/* <td style={{fontSize:"12px"}}>Actions</td> */}
                    </tr>
                  </thead>
                  <tbody>
                    {domainData.length > 0
                      ? domainData.map((res, index) => (
                          <tr>
                            <td style={{ fontSize: "12px" }}>{index + 1}</td>
                            <td style={{ fontSize: "12px" }}>
                              {new Date(res.createdAt).toLocaleDateString(
                                "en-US"
                              )}
                            </td>
                            <td style={{ fontSize: "12px" }}>{res.domain}</td>
                            <td style={{ fontSize: "12px" }}>{res.domainId}</td>
                            <td style={{ fontSize: "12px" }}>
                              {new Date(res.expires).toLocaleDateString(
                                "en-US"
                              )}
                            </td>
                            <td style={{ fontSize: "12px" }}>
                              {res.renewDeadline}
                            </td>
                            <td style={{ fontSize: "12px" }}>{res.status}</td>
                            {/* <td style={{fontSize:"12px",width:"100",textAlign:"center"}}>
                                                        <span style={{}}><i class="far fa-trash-alt"></i></span></td> */}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
