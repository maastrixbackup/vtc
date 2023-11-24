import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import ShareLink from "react-facebook-share-link";
import TwitterLink from "react-twitter-share-link";
import { confirmAlert } from "react-confirm-alert";
import banner from "../../../images/vtc-banner.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import Switch from "react-switch";
import { Link, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import ReactPaginate from "react-paginate";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetUserData = APIURL() + "user-details";
const APIGetImagesetList = APIURL() + "get-imagesetlist";
const APIChangeService = APIURL() + "change-tour-service";
const APIChangeStatus = APIURL() + "change-status";
const APIDeleteImageset = APIURL() + "delete-imageset";
const APIActivate = APIURL() + "change-image-status";
const APIGetTourDetails = APIURL() + "tour-details";
const APIGetStates = APIURL() + "get-states";
const APIGetCategory = APIURL() + "get-categories";
const APIGetPropertyType = APIURL() + "get-Propertytype";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AgentFlashVideo() {
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [imagesetList, setImagesetList] = useState([]);
  const [sync, setSync] = useState(true);
  const [id, setId] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [element, setElement] = useState("");
  const [offset, setOffset] = useState(0);
  const [postPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [allStates, setAllStates] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [orderByData, setOrderByData] = useState({});
  const [propertyType, setPropertyType] = useState([]);
  const [propertyDataType, setPropertyTypeData] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [hover, setHover] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

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
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCategory, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        //   console.log(res.data[0].response.data);
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
  const handleTourServiceChange = (event, tid) => {
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
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
      });
  };
  const handleEditImageset = (data) => {
    history.push(APIPath() + "agent-edit-video/" + data.id);
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
    let Tour = document.getElementById("statusId");
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
  };
  const goToImageSet = () => {
    if (id === "") {
      setMessage("Please select one from tourlist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "agent-edit-tour/" + id);
    }
  };
  const editTour = () => {
    if (id === "") {
      setMessage("Please select one from tourlist");
      setOpenError(true);
    } else {
      window.location.href = APIPath() + "agent-edit-tour/" + id;
    }
  };
  const editVideo = () => {
    if (id === "") {
      setMessage("Please select one from videolist");
      setOpenError(true);
    } else {
      history.push(APIPath() + "agent-edit-video/" + id);
    }
  };
  // const viewSelectvideo = () => {
  //     if (id === "") {
  //         setMessage("Please select one from videolist");
  //         setOpenError(true);
  //     }
  //     else {
  //         window.location.href = APIPath() + "agent-video-selected/" + id;
  //     }
  // }
  const ezFlashCard = () => {
    if (id === "") {
      setMessage("Please select one from videolist");
      setOpenError(true);
    } else {
      window.location.href = APIPath() + "agent-ezflash-card/" + id;
    }
  };
  const viewSelectvideo = () => {
    if (id === "") {
      setMessage("Please select one imageset");
      setOpenError(true);
    } else {
      var VideoId = document.getElementById("videoIdValue");
      VideoId.value = id;

      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: id,
      };
      postRecord(APIGetTourDetails, objusr)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            if (res.data[0].response.tourdetails.isactive === 0) {
              window.open(APIPath() + "agent-video-non-active/" + id, "_blank");
            } else {
              window.open(APIPath() + "video/" + id, "_blank");
            }
          }
        })
        .catch((err) => {
          setMessage("Something Went Wrong. Please try again later...");
          setOpenError(true);
        });
    }
  };
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);

    const newOffset = (event.selected * postPerPage) % imagesetList.length;
    setOffset(newOffset);
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
      });
  };
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
    // setOpenError(true);
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
        setOpenError(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };

  function changeHover(e) {
    setHover(true);
  }

  return (
    <div>
      {loading && (
        <div class="load-bar">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      )}
      <Title title="Agent Video List" />
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
        <div class="vtc_btm_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_btm_menu_sec">
                  <ul>
                    <li>Yearly - Unlimited Active Tours</li>
                    <li>Ala-Carte - Available Credits 1 </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
                          <i class="fas fa-tasks"></i> Manage Videos
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
                                onClick={() => editVideo()}
                              >
                                <i class="far fa-edit"></i> Edit Selected Video
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => viewSelectvideo()}
                              >
                                <i class="far fa-eye"></i> View Selected Video
                              </a>
                              <input type="hidden" id="videoIdValue" value="" />
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => ezFlashCard()}
                              >
                                <i class="far fa-eye"></i> EZ FlashCards
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
                          <i class="fas fa-tasks"></i>Video Manage
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Filter"
                          role="tab"
                        >
                          <i class="fas fa-filter"></i>Video Filter
                        </a>
                      </li>
                    </ul>
                    */}
                  </div>
                  <div class="action_sec_right">
                    <ul>
                      <li>
                        <span>order By</span>
                        {/* <select>
                                            <option>Creation Date (desc)</option>
                                            <option>Creation Date (desc)</option>
                                            <option>Creation Date (desc)</option>
                                            <option>Creation Date (desc)</option>
                                            <option>Creation Date (desc)</option>
                                        </select> */}
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
                  {/* 
                  <div
                    class="tab-pane active"
                    id="Manage"
                    role="tabpanel"
                    style={{ width: "100%", overflow: "auto" }}
                  >
                    <div class="property_info_cont agent_img_sets" id="demo">
                      <section class="snap-scrolling-example">
                        <div class="horizontal-images tabscroll-windows">
                          <ul class="list_sec" role="">
                            <li class="">
                              <a onClick={() => goToImageSet()}>
                                <span>
                                  <i class="far fa-image"></i>
                                </span>
                                Go To Selected Tour
                              </a>
                            </li>
                            <li class="">
                              <a onClick={() => editVideo()}>
                                <span>
                                  <i class="far fa-edit"></i>
                                </span>
                                Edit Selected Video
                              </a>
                            </li>
                            <li class="">
                              <a onClick={() => viewSelectvideo()}>
                                <span>
                                  <i class="far fa-eye"></i>
                                </span>
                                View Selected Video
                              </a>
                              <input type="hidden" id="videoIdValue" value="" />
                            </li>
                            <li class="">
                              <a onClick={() => ezFlashCard()}>
                                <span>
                                  <i class="far fa-eye"></i>
                                </span>
                                EZ FlashCards
                              </a>
                            </li>
                          </ul>
                        </div>
                      </section>
                    </div>
          </div> */}
                  <div class="tab-pane active" id="Filter" role="tabpanel">
                    {/* <div class="filter_sec">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <input type="text" name="" class="form-control" placeholder="Street Address" />
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <input type="text" name="" class="form-control" placeholder="City" />
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <select class="form-control formbox1select">
                                                    <option>Select State</option>
                                                    <option>Select State</option>
                                                    <option>Select State</option>
                                                    <option>Select State</option>
                                                    <option>Select State</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <input type="text" name="" class="form-control" placeholder="Zip Code" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row padd_top">
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <select class="form-control formbox1select">
                                                    <option>Select Category</option>
                                                    <option>Select Category</option>
                                                    <option>Select Category</option>
                                                    <option>Select Category</option>
                                                    <option>Select Category</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <select class="form-control formbox1select">
                                                    <option>Select Property</option>
                                                    <option>Select Property</option>
                                                    <option>Select Property</option>
                                                    <option>Select Property</option>
                                                    <option>Select Property</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="filter_sec_single">
                                                <input type="text" name="" class="form-control" placeholder="Tour ID" />
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="filter_sec_single">
                                                        <input type="text" name="" class="form-control" placeholder="#MLS" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <button type="button" class="next_btn">FILTER</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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
                                  width: "100%",
                                }}
                              />
                            )}
                            <div class="profile-screen-name">{res.caption}</div>
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
                                        "https://www.virtualtourcafe.com/tour/theme-template/" +
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
                                        "https://www.virtualtourcafe.com/tour/theme-template/" +
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
                      <h4 style={{ margin: "0 auto" }}>No Videos Found.</h4>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr class="spacer10px"></hr>
          {/* <div class="row">
                        <div class="col-lg-12">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item active" ><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div> */}
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
    </div>
  );
}
