import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";
import ShareLink from "react-facebook-share-link";
import TwitterLink from "react-twitter-share-link";
import "react-confirm-alert/src/react-confirm-alert.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import banner from "../../../images/vtc-banner.jpg";
import profile from "../../../images/profile.jpg";
import Switch from "react-switch";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { ImageList } from "@material-ui/core";
import opencraigslisactive_icon from "../../../images/opencraigslisactive_icon.png";
import fontawesomelogo from "../../../images/fontawesomelogo.png";
import craigslisflyeractive_icon from "../../../images/craigslisflyeractive_icon.png";
import ReactPaginate from "react-paginate";
import Title from "../../../CommonMethods/Title";
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
const APIGetImagesetList = APIURL() + "get-imagesetlist";
const APIDeleteImageset = APIURL() + "delete-imageset";
const APIChangeStatus = APIURL() + "change-status";
const APIActivate = APIURL() + "change-image-status";
const APISchedule = APIURL() + "change-schedule-status";
const APIChangeService = APIURL() + "change-tour-service";
const APIGetTourDetails = APIURL() + "tour-details";
const APILoadCraigList = APIURL() + "load-craiglist-modal";
const APIGetCategory = APIURL() + "get-categories";
const APIGetStates = APIURL() + "get-states";
const APIGetPropertyType = APIURL() + "get-Propertytype";
const APIGetViewFlyerData = APIURL() + "view-flyer";
const APIDownloadFlyerData = APIURL() + "download-flyer";
const DownloadPdf = APIURL() + "generatePdf";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function AgentFlyerList(props) {
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagesetList, setImagesetList] = useState([]);
  const [sync, setSync] = useState(true);
  const [id, setId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [element, setElement] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [active, setActive] = useState("");
  const [openPostCraigeList, setOpenPostCraigeList] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [craigeListOpen, setCraigeListOpen] = useState("");
  const [inputvalue, setInputValue] = useState("");
  const [categoryInfo, setCategoryInfo] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [allStates, setAllStates] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [propertyDataType, setPropertyTypeData] = useState({});
  const [orderByData, setOrderByData] = useState({});
  const [offset, setOffset] = useState(0);
  const [postPerPage] = useState(6);
  const [totalData, setTotalData] = useState([]);
  const [same, setSame] = useState(false);
  const [allData, setAllData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
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
      setLoading(true);

      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        pageNumber: pageNumber,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.countryid,
        zipcode: propertyData.zipcode,
        category: categoryInfo.catagory,
        property: propertyDataType.property,
        tourid: propertyData.flyerid,
        mls: propertyData.mls,
      };
      postRecord(APIGetImagesetList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setImagesetList(res.data[0].response.data);

          setOrderByData(res.data[0].response.orderby);
          setRefresh(false);
          setPageCount(res.data[0].response.datacount);
          setLoading(false);
        }
      });
    }
  }, [context.state.user, sync, pageNumber]);
  // useEffect(() => {
  //     if (context.state.user) {
  //         const objusr = { authenticate_key: "abcd123XYZ", agentId: JSON.parse(context.state.user).agentId ,tourid};
  //         postRecord(APIGetTourDetails, objusr)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     // setImagesetList(res.data[0].response.data);
  //                 }
  //             });
  //     }
  // }, [context.state.user, sync]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCategory, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setCategoryData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ", country_id: 40 };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        return;
      }
      setAllStates([]);
      setPropertyData({ ...propertyData, stateid: "" });
    });
  }, [propertyData?.countryid]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetPropertyType, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        //setCategoryData(res.data[0].response.data);
        setPropertyType(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (imagesetList.length > 0) {
      filterData();
    } else {
      setAllData([]);
    }
  }, [offset, imagesetList]);
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
  const filterData = async () => {
    const endOffset = offset + postPerPage;
    setTotalData(imagesetList.slice(offset, endOffset));
    setAllData(imagesetList.slice(offset, endOffset));
    // setPageCount(Math.ceil(imagesetList.length / postPerPage));
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
      setElement(div);
      setId(data.id);
    }
  };
  const handleEditImageset = (data) => {
    history.push(APIPath() + "agent-edit-flyer/" + data.id);
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
            postRecord(APIDeleteImageset, obj).then((res) => {
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
  const handleStatusChange = (event, id) => {
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
    setOpen(true);
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
  const handleScheduleChange = (event, tid) => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tid,
      is_schedule: event === true ? 1 : 0,
    };
    postRecord(APISchedule, obj)
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
  const handleTourServiceChange = (event, tid) => {
    setOpen(true);
    //var check = data.virtualtourservice === 1 ? 0 : 1;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      status: "tour",
      virtualtourservice: event,
      tourid: tid,
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
  const handleFlyerServiceChange = (event, tid) => {
    setOpen(true);
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
        setOpen(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleVideoServiceChange = (event, tid) => {
    setOpen(true);
    //var check = data.videoservice === 1 ? 0 : 1;
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tourid: tid,
      status: "video",
      videoservice: event,
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
  const goToImageSet = () => {
    if (id === "") {
      setMessage("Please select one from flyerlist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "agent-edit-tour/" + id);
    }
  };
  const handleViewModal = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      var FlyerId = document.getElementById("flyerIdValue");
      FlyerId.value = id;

      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: id,
      };
      postRecord(APIGetTourDetails, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            if (res.data[0].response.tourdetails.isactive === 0) {
              // history.push(APIPath() + "site/flyer/" + id,'_blank');
              window.open(APIPath() + "site/flyer/" + id, "_blank");
            } else {
              // window.location.href = APIPath() + "site/flyer-active/" + id;
              window.open(APIPath() + "site/flyer/" + id, "_blank");
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
  //     const handleViewFlyerId=(tid)=>{
  //         const objusr={authenticate_key:"abcd123XYZ",agentId:JSON.parse(context.state.user).agentId, tourid: tid}
  //         postRecord(APIGetTourDetails, objusr)
  //         .then(res => {
  //             if(res.data[0].response.status === "success"){
  //                 if(res.data[0].response.tourdetails.isactive===0){
  //                     window.location.href = APIPath() + "site/flyer/" + tid;
  //                 }else{
  //                     window.location.href = APIPath() + "site/flyer-active/" + tid;
  //                 }
  //                 //setActive(res.data[0].response.tourdetails.isactive);
  //             }

  //         });
  // }

  const editFlyer = () => {
    if (id === "") {
      setMessage("Please select one from flyerlist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "agent-edit-flyer/" + id);
    }
  };
  const printFlyerModal = () => {
    if (id === "") {
      setMessage("Please select one from flyerlist");
      setOpenError(true);
    } else {
      // window.location.href = APIPath() + "agent-flyer-print/" + id;
      var FlyerId = document.getElementById("flyerIdValue");
      FlyerId.value = id;
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: id,
      };
      postRecord(APIGetTourDetails, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            if (res.data[0].response.tourdetails.isactive === 0) {
              //window.location.href = APIPath() + "agent-flyer-print/" + id;
              history.push(APIPath() + "site/flyer/" + id);
            } else {
              window.location.href =
                APIPath() + "agent-flyer-active-print/" + id;
              //history.push(APIPath() + "agent-flyer-active-print/" + id);
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
  const PostCraigeList = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      //setCraigeListOpen("agent_pop_tab");
      var craigListId = document.getElementById("postCraiglistId");
      setCraigeListOpen("agent_pop_tab");
      craigListId.value = id;

      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        tourId: id,
      };
      postRecord(APILoadCraigList, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setInputValue(res.data[0].response.data);
          }
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
  const propertyHandleChange = (event) => {
    const { name, value } = event.target;
    setPropertyTypeData({ ...propertyDataType, [name]: value });
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
      category: categoryInfo.catagory,
      property: propertyDataType.property,
      tourid: propertyData.flyerid,
      mls: propertyData.mls,
    };
    postRecord(APIGetImagesetList, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setImagesetList(res.data[0].response.data);
          setMessage(res.data[0].response.status);
          setOpenSuccess(true);
          setPageCount(res.data[0].response.datacount);

          setRefresh(false);
          setLoading(false);
        } else {
          setMessage(res.data[0].response.status);
          setOpenError(true);
        }
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
  const downloadFlyerModal = () => {
    if (id === "") {
      setMessage("Please select one from flyerlist");
      setOpenError(true);
    } else {
      setOpen(true);
      // window.location.href = APIPath() + "agent-flyer-print/" + id;
      var FlyerId = document.getElementById("flyerIdValue");
      FlyerId.value = id;
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: id,
      };
      postRecord(APIGetTourDetails, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            if (res.data[0].response.tourdetails.isactive === 0) {
              //window.location.href = APIPath() + "agent-flyer-print/" + id;
              history.push(APIPath() + "site/flyer/" + id);
            } else {
              history.push(APIPath() + "agent-download-flyer/" + id);
              //  window.location.href = APIPath() + "agent-download-flyer/" + id;
              //history.push(APIPath() + "agent-flyer-active-print/" + id);
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
      category: categoryInfo.catagory,
      property: propertyDataType.property,
      tourid: propertyData.flyerid,
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

  function changeHover(e) {
    setHover(true);
  }
  const downloadPdf = async () => {
    if (id === "") {
      setMessage("Please select one from flyerlist");
      setOpenError(true);
      return;
    }
    setOpen(true);
    const objusr = {
      authenticate_key: "abcd123XYZ",
      tourId: id,
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
      {loading && (
        <div class="load-bar">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      )}
      <Title title="Agent Flyer List" />
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
          <h2>Manage Your Flyers</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          {allData.length > 0 && (
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
                          <i class="fas fa-tasks"></i> Manage Flyers
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
                                onClick={() => goToImageSet()}
                              >
                                <i class="far fa-image"></i> Go To Selected Tour
                              </a>
                            </li>

                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => editFlyer()}
                              >
                                <i class="far fa-edit"></i> Edit Flyer
                              </a>
                            </li>

                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => handleViewModal()}
                              >
                                <i class="far fa-image"></i> View Flyer
                              </a>
                            </li>

                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => printFlyerModal()}
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
                                onClick={() => downloadPdf()}
                              >
                                <i class="fas fa-file-pdf"></i> Download Flyer
                                PDF
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                {/* Navigation Menu */}
                <div class="action_sec_main">
                  <div class="action_sec_left action_sec_tab">
                    {/* 
                    <ul class="nav nav-tabs list_sec" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-toggle="tab"
                          href="#Manage"
                          role="tab"
                        >
                          <i class="fas fa-tasks"></i>Flyer Manage
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Filter"
                          role="tab"
                        >
                          <i class="fas fa-filter"></i>  Flyer Filter
                        </a>
                      </li>
                    </ul>
                     */}
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
                          <option value="categoryname DESC">
                            Status (desc)
                          </option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {allData.length > 0 && (
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="tab-content">
                  <div
                    class="tab-pane "
                    id="Manage"
                    role="tabpanel"
                    style={{ width: "100%", overflow: "auto" }}
                  >
                    <div class="property_info_cont agent_img_sets" id="demo">
                      <section class="snap-scrolling-example">
                        <div class="horizontal-images tabscroll-windows">
                          <ul class="list_sec" role="">
                            <li class="">
                              <a class="" onClick={() => goToImageSet()}>
                                <span>
                                  <i class="far fa-image"></i>
                                </span>
                                Go To Selected Tour
                              </a>
                            </li>
                            <li class="">
                              <a onClick={() => editFlyer()}>
                                <span>
                                  <i class="far fa-edit"></i>
                                </span>
                                Edit Flyer
                              </a>
                            </li>
                            <li class="">
                              <a class="" onClick={() => handleViewModal()}>
                                <span>
                                  <i class="far fa-image"></i>
                                </span>
                                View Flyer
                              </a>
                              <input type="hidden" id="flyerIdValue" value="" />
                            </li>

                            <li class="">
                              <a onClick={() => printFlyerModal()}>
                                <span>
                                  <i class="fas fa-print"></i>
                                </span>
                                Print Flyer
                              </a>
                            </li>
                            <li class="">
                              {/* <a onClick={() => setOpenPostCraigeList(true)}><span><i class="fas fa-sticky-note"></i></span>Post To Craigslist</a> */}
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
                              <input
                                type="hidden"
                                id="postCraiglistId"
                                value=""
                              />
                            </li>
                            <li class="">
                              <a onClick={() => downloadPdf()}>
                                <span>
                                  <i class="fas fa-file-pdf"></i>
                                </span>
                                Download Flyer PDF
                              </a>
                            </li>
                          </ul>
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
                                name="catagory"
                                value={categoryInfo.catagory}
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
                                name="propertyType"
                                value={propertyDataType.propertyType}
                              >
                                <option value="0">Select Property</option>
                                {/* <option>Select Property</option>
                                                    <option>Select Property</option>
                                                    <option>Select Property</option>
                                                    <option>Select Property</option> */}
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
                                value={propertyData.flyerid}
                                onChange={inputHandleChange}
                                class="form-control"
                                placeholder="Flyer ID"
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
                          setId(res.id);
                          handleImageSetId(res);
                          // handleViewFlyerId(res.id)
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
                            {res.image_type === "image" ? (
                              <img
                                src={res.filename}
                                style={{ height: "178px", width: "355px" }}
                              />
                            ) : (
                              <video
                                src={res.filename}
                                width="95px"
                                height="95px"
                                style={{
                                  border: "4px solid #fff",
                                  boxShadow:
                                    "0px 0px 13px 0px rgb(0 0 0 / 20%)",
                                  borderRadius: "50%",
                                  marginBottom: "1rem",
                                  marginRight: "1rem",
                                  height: "157px",
                                  width: "355px",
                                }}
                              />
                            )}
                            <div class="profile-screen-name">{res.caption}</div>
                            <div class="profile-screen-name address">{`${res.address?res.address:""} ${res.city?res.city:""} ${res.zipcode?res.zipcode:""}`}</div>
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
                                        "https://www.virtualtourcafe.com/tour/" +
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
                                        "https://www.virtualtourcafe.com/tour/" +
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
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Date of Creation</label>
                                    <p>{res.creationdate}</p>
                                  </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Date Last Edited </label>
                                    <p>{res.lastmodifieddate}</p>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <div class="socila_status_single">
                                    <label>Activate/Visible </label>
                                    <div
                                      class="switchToggle custom-control custom-switch"
                                      style={{ marginTop: "5px" }}
                                    >
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
                                    <label style={{ fontSize: "12px" }}>
                                      TOUR SERVICE
                                    </label>
                                    <div
                                      class="switchToggle custom-control custom-switch c1"
                                      style={{ marginTop: "5px" }}
                                    >
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
                                    <label style={{ fontSize: "12px" }}>
                                      FLYER SERVICE
                                    </label>
                                    <div
                                      class="switchToggle custom-control custom-switch c1"
                                      style={{ marginTop: "5px" }}
                                    >
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
                                    <label style={{ fontSize: "12px" }}>
                                      VIDEO SERVICE{" "}
                                    </label>
                                    <div
                                      class="switchToggle custom-control custom-switch c1"
                                      style={{ marginTop: "5px" }}
                                    >
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
                      <h4 style={{ margin: "0 auto" }}>No Flyers Found.</h4>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr class="spacer10px"></hr>
          {allData.length > 0 ? (
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
          ) : (
            ""
          )}
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
      {/* <Dialog maxWidth={maxWidth} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openPostCraigeList}>
                <DialogTitle id="customized-dialog-title" >
                    <i class="fa fa-envelope" aria-hidden="true"></i> Post to Craigslist
                    <CancelIcon onClick={() => setOpenPostCraigeList(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                               // saveAgentData();
                            }}>
                            <div class="agent_pop_main">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12">
                                        <label style={{ marginBottom: "10px", marginTop: "10px" }}>First Name </label>
                                        
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <label style={{ marginBottom: "10px", marginTop: "10px" }}> Last Name </label>
                                       
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <label style={{ marginBottom: "10px", marginTop: "10px" }}>Email </label>
                                       
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                        <label style={{ marginBottom: "10px", marginTop: "10px" }}>Confirm Email </label>
                                        
                                    </div>
                                    <div class="col-lg-12 col-md-12">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-md-12 text-center">
                                    <button style={{ border: "#ffa124" }} type="submit" class="need_pic save_btn">Save<i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog> */}
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
                              <span>
                                <img src={opencraigslisactive_icon} />
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
                              <span>
                                <img src={fontawesomelogo} />
                              </span>
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
                                <img src={craigslisflyeractive_icon} />
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
