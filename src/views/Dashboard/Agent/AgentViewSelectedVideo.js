import React, { useState, useEffect, useContext } from "react";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { Link, useHistory } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import Footer from "../../../images/vtc-logo2.png";
import svg1 from "../../../images/43.svg";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AgentViewFlyer from "./AgentViewFlyer";
const APIGetUserData = APIURL() + "user-details";
const APIGetTourDetails = APIURL() + "tour-details";
const APIGetTourInfo = APIURL() + "get-Tourinfo";
const APIGetMortgageCalculator = APIURL() + "get-Mortgage-Calculator";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
const APIGetActiveImagesetList = APIURL() + "get-activeimagesetlist";
const APISaveToDeskTop = APIURL() + "savetodesktop";
const APIGetScheduleAppointment = APIURL() + "get-scheduleMail";
const APISendFlyerMail = APIURL() + "send-flyer-mail";
const APIOtherLink = APIURL() + "tourotherlink";
const APIServiceMail = APIURL() + "tour-send-mail";
const APIOtherMail = APIURL() + "other-link-send-email";
const APITourService = APIURL() + "tourservicelink";
const APITourView = APIURL() + "add-views";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const options2 = {
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 3500,
  autoplayHoverPause: false,
  autoHeight: true,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 2500,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
    },

    1024: {
      items: 3,
    },

    1366: {
      items: 1,
    },
  },
};
export default function AgentViewSelectedVideo(props) {
  const initialMorgageData = {
    length: "",
    rate: "",
    price: "",
    downpayment: "",
  };
  // console.log(props);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 500,
      color: "#fff",
    },
  }));

  const classes = useStyles();
  const TourId = props.match.params.videoid;
  // const AgentId = props.match.params.agentid;
  //console.log(props);
  let history = useHistory();
  const [color, setcolor] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [banner, setBanner] = useState("");
  const [companyInformation, setCompanyInformation] = useState({});
  const [activeImageListData, setActiveImageListData] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [TwitterLink, setTwitterLink] = useState("");
  const [AgentId, setAgentId] = useState();
  const [isActive, setIsActive] = useState(0);
  const [youTubeLink, setYoutubeLink] = useState("");
  const [tourDetailsData, setTourDetailsData] = useState({});
  const [imageData, setImageData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openPropertyInformation, setOpenProertyInfromation] = useState(false);
  const [largeWidth, setLargeWidth] = React.useState("lg");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [amenityData, setAmenityData] = useState({});
  const [openAmenties, setOpenAmenties] = useState(false);
  const [openAgentinfo, setopenAgentInfo] = useState(false);
  const [openAppointment, setopenAppointment] = useState(false);
  const [mortgageData, setMortgageData] = useState({ initialMorgageData });
  const [openMortagage, setOpenMortgage] = useState(false);
  const [openWalkScore, setOpenWalkScore] = useState(false);
  const [sendMail, setSendMail] = useState({});
  const [currentEmail, setCurrentEmail] = useState({});
  const [csvFile, setCsvFile] = useState({});
  const [open, setOpen] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [otherLink, setOtherLink] = useState({});
  const [serviceLinks, setServiceLinks] = useState({});
  const [mlsLink, setMlsLink] = useState({});
  const [agentProfile, setAgentProfile] = useState("");
  const [allVideos, setAllVideos] = useState({});
  const [allImages, setAllImages] = useState({});
  const [amenities, setAmenities] = useState({});
  const [agentData, setAgentData] = useState({});
  const [tourData, setTourData] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [category, setCategory] = useState("");
  console.log(isActive, "isActive", AgentId, tourDetailsData);

  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      tourid: TourId,
      type: 3,
    };
    postRecord(APITourView, objusr).then((res) => {});
  }, [TourId]);

  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ", agent_id: AgentId };
    if (AgentId && AgentId != "") {
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
          setCompanyInformation(
            res.data[0].response.data.agent_profile.company_details
          );
          setAgentProfile(res.data[0].response.data.agent_profile.profile_img);
        }
      });
    }
  }, [AgentId]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ", agent_id: AgentId };
    if (AgentId && AgentId != "") {
      postRecord(APIGetActiveImagesetList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setBanner(res.data[0].response.bannerurl);
          setActiveImageListData(res.data[0].response.data);
        }
      });
    }
  }, [AgentId]);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSocialIconLink, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setFacebookLink(res.data[0].response.data[2].link);
        setTwitterLink(res.data[0].response.data[0].link);
        setYoutubeLink(res.data[0].response.data[1].link);
      }
    });
  }, []);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgentId,
      tourid: TourId,
    };
    if (AgentId && AgentId != "") {
      postRecord(APIGetTourInfo, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setTourDetailsData(res.data[0].response.dataDetails.tourdetails);
        }
      });
    }
  }, [AgentId, TourId]);

  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      tourid: TourId,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setTourData(res.data[0].response.tourdetails);
        setcolor(res.data[0].response.Style);
        setAllImages(res.data[0].response.dataProvider);
        setAmenities(res.data[0].response.amenities);
        setAgentData(res.data[0].response.agentDetails);
        setCategory(res.data[0].response.category);
        setAgentId(res.data[0].response.tourdetails.userid);
        setIsActive(res.data[0].response.tourdetails.isactive);
        if (res.data[0].response.dataProvider2.length > 0) {
          setAllVideos(res.data[0].response.dataProvider2[0]);
        }
      }
    });
  }, [AgentId, TourId]);
  console.log(galleryImages);
  useEffect(() => {
    if (allImages.length > 0) {
      var data = [];
      allImages.forEach((res) => {
        data.push(res.imageurl);
      });
      setGalleryImages(data);
    }
  }, [allImages]);
  useEffect(() => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: AgentId,
      tourId: TourId,
    };
    if (AgentId && AgentId != "") {
      postRecord(APIOtherLink, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setOtherLink(res.data[0].response.data);
          setMlsLink(res.data[0].response.data.mis_link);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      });
    }
  }, [AgentId, TourId]);
  useEffect(() => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: AgentId,
      tourId: TourId,
    };
    if (AgentId && AgentId != "") {
      postRecord(APITourService, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setServiceLinks(res.data[0].response.data);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      });
    }
  }, [AgentId, TourId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  const viewFlyer = () => {
    // history.push(APIPath() + "agent-view-flyer-active/" + TourId + "/" + AgentId);
    window.open(APIPath() + "site/flyer/" + TourId + "/" + AgentId, "_blank");
  };
  const amenityHandleChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const ListingPage = () => {
    window.open(
      APIPath() + "agent-my-listing/" + AgentId + "/" + TourId,
      "_blank"
    );
  };
  const SaveToDesktop = () => {
    const objusr = { authenticate_key: "abcd123XYZ", tourId: TourId };
    postRecord(APISaveToDeskTop, objusr)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          var url = res.data[0].response.data.zip_link;
          window.open(url, "_blank");
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setMortgageData({ ...mortgageData, [name]: value });
  };
  const CalculateMortgage = () => {
    mortgageData.authenticate_key = "abcd123XYZ";
    mortgageData.tourId = TourId;
    postRecord(APIGetMortgageCalculator, mortgageData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMortgageData(res.data[0].response);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const MortgageCalclulator = () => {
    CalculateMortgage();
  };
  const AreaSchool = () => {
    // window.location.href = "https://nces.ed.gov/globallocator/index.asp?search=1&State=BC&zipcode=&School=1&PrivSchool=1&miles=10&CS=240931FB";
    window.open(
      "https://nces.ed.gov/globallocator/index.asp?search=1&State=BC&zipcode=&School=1&PrivSchool=1&miles=10&CS=240931FB",
      "_blank"
    );
  };
  const handleSvgLink = () => {
    // window.location.href = "https://www.walkscore.com/score/dfds?utm_source=walkscore.com&utm_medium=score-badge&utm_campaign=ws_score_widget";
    window.open(
      "https://www.walkscore.com/score/dfds?utm_source=walkscore.com&utm_medium=score-badge&utm_campaign=ws_score_widget",
      "_blank"
    );
  };
  const amenityHandleDateChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const amenityHandleTImeChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const scheduleAppointment = () => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.tourId = TourId;
    setOpen(true);
    postRecord(APIGetScheduleAppointment, amenityData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
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
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setCurrentEmail({ ...currentEmail, [name]: value });
  };

  const saveSendFlyerData = () => {
    setOpen(true);
    if (currentEmail.emails == undefined) {
      currentEmail.emails = "";
    }
    csvFile.authenticate_key = "abcd123XYZ";
    csvFile.agent_id = AgentId;
    csvFile.tourId = TourId;
    csvFile.emails = currentEmail.emails;
    const formData = new FormData();
    for (let i in csvFile) {
      if (i === "email_file") {
        for (let file of csvFile[i]) {
          formData.append("email_file", file);
          console.log(file);
        }
      } else {
        formData.append(i, csvFile[i]);
      }
    }
    postRecord(APISendFlyerMail, formData, {})
      .then((res) => {
        console.log(res);
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
  const handleServiceInputChange = (event) => {
    const { name, value } = event.target;
    setServiceLinks({ ...serviceLinks, [name]: value });
  };
  const SendServiceMail = () => {
    setOpen(true);
    serviceLinks.authenticate_key = "abcd123XYZ";
    serviceLinks.agent_id = AgentId;
    serviceLinks.tourlink = serviceLinks.branded_link.tour_link;
    serviceLinks.videolink = serviceLinks.branded_link.video_link;
    serviceLinks.flyerlink = serviceLinks.branded_link.flyer_link;
    serviceLinks.standard = serviceLinks.mls_link.standard_link;
    serviceLinks.strict = serviceLinks.mls_link.strict_link;
    postRecord(APIServiceMail, serviceLinks)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setOpen(false);
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
  return (
    <>
      {isActive == "1" ? (
        <div class="container">
          <div class="row">
            <div class="col-lg-12 p-0">
              {Object.keys(agentData).length > 0 ? (
                <img
                  src={agentData.company_details.companybanner}
                  alt=""
                  style={{
                    width: "100%",
                    backgroundSize: "cover",
                    height: "200px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "20px",
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="wrapper theme4 theme5" id="home">
            {/* <!--=========================== Menu ===========================--> */}
            <div>
              <header class="blacknew" style={color}>
                <div class="header_inner clearfix">
                  <div class="header_bottom clearfix">
                    <div class="container">
                      <div class="header-boxfull">
                        <div class="topmenu">
                          <nav id="cssmenu" class="head_btm_menu">
                            <ul>
                              <li>
                                <a href="#">
                                  <i class="far fa-home"></i>
                                  <br />
                                  VIRTUAL TOUR
                                </a>
                                <ul>
                                  <li>
                                    <a href="#">
                                      Click here to see VIRTUAL tour
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-images"></i>
                                  <br />
                                  GALLERY
                                </a>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => setOpenGallery(true)}
                                    >
                                      Click Here to see Theater
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-copy"></i>
                                  <br />
                                  DETAILS
                                </a>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() =>
                                        setOpenProertyInfromation(true)
                                      }
                                    >
                                      Property Information
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => {
                                        setOpenAmenties(true);
                                      }}
                                    >
                                      Amenities
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={viewFlyer}
                                    >
                                      Printable Flyer
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-id-badge"></i>
                                  <br />
                                  CONTACT
                                </a>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => setopenAgentInfo(true)}
                                    >
                                      Agent Info
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => setopenAppointment(true)}
                                    >
                                      Schedule Appointment
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={ListingPage}
                                    >
                                      My Listings
                                    </a>
                                  </li>
                                  <li>
                                    <a href={facebookLink} target="_blank">
                                      Facebook Link
                                    </a>
                                  </li>
                                  <li>
                                    <a href={TwitterLink} target="_blank">
                                      Twitter Link
                                    </a>
                                  </li>
                                  <li>
                                    <a href={youTubeLink} target="_blank">
                                      Youtube Link
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-tools"></i>
                                  <br />
                                  TOOLS
                                </a>
                                <ul>
                                  <li>
                                    <a href="#">Map View</a>
                                  </li>
                                  <li>
                                    <a href="#">Arial View</a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => setOpenMortgage(true)}
                                    >
                                      Mortgage Calculator
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => setOpenWalkScore(true)}
                                    >
                                      Walk Score
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={AreaSchool}
                                    >
                                      Area Schools
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-share-alt"></i>
                                  <br />
                                  SHARE
                                </a>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => {
                                        setOpenEmailModal(true);
                                      }}
                                    >
                                      Send To Friend
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={SaveToDesktop}
                                    >
                                      Save Tour To Desktop
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() => {
                                        setOpenLink(true);
                                      }}
                                    >
                                      Service Links
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </div>
                        {/* <div class="Music-player-holder">
                                                <div class="player">
                                                    <img id="button" onClick={togglePlay} src={playbtn} />
                                                    <audio>
                                                        <source src="images/Better_World_full_mix.mp3" />
                                                    </audio>
                                                </div>
                                                <div class="bar-c">
                                                    <div id="bar-1" class="bar noAnim"></div>
                                                    <div id="bar-2" class="bar noAnim"></div>
                                                    <div id="bar-3" class="bar noAnim"></div>
                                                    <div id="bar-4" class="bar noAnim"></div>
                                                    <div id="bar-5" class="bar noAnim"></div>
                                                    <div id="bar-6" class="bar noAnim"></div>
                                                </div>
                                            </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            </div>
            {Object.keys(allVideos).length > 0 ? (
              <iframe
                width="100%"
                height="440"
                autoplay={true}
                src={allVideos.videourl}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            ) : allImages.length > 0 ? (
              <OwlCarousel margin={10} {...options2}>
                {allImages.map((res) => (
                  <div class="carousel-item active">
                    <img src={res.imageurl} />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
            <div class="bodycontent pt-0">
              <div class="containerextra">
                <div class="body-mid-work">
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="profile-blue-main">
                        <div class="profile-blue" style={color}>
                          <div class="profile-blue-left">
                            {Object.keys(agentData).length > 0 ? (
                              <img
                                src={agentData.agent_profile.profile_img}
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="profile-blue-right">
                            {Object.keys(agentData).length > 0 ? (
                              <h3>{agentData.agent_profile.name}</h3>
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={20}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                            {/* <p>Test New Company
                                                        <br />
                                                        maastest3@gmail.com</p> */}
                            {Object.keys(agentData).length > 0 ? (
                              <p>{agentData.company_details.company}</p>
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={20}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                            {Object.keys(agentData).length > 0 ? (
                              <p style={{ fontSize: "13px" }}>
                                {agentData.email}
                              </p>
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={20}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </div>
                        </div>
                        <div class="profile-greybg">
                          <ul>
                            <li>
                              <label>Mobile</label>
                              {Object.keys(agentData).length > 0 ? (
                                <p>{agentData.mobile}</p>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}{" "}
                            </li>
                            <li>
                              <label>Office</label>
                              {Object.keys(agentData).length > 0 ? (
                                <p>{agentData.company_details.officephone}</p>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}
                            </li>
                            <li>
                              <label>Agent Lic#</label>{" "}
                              {Object.keys(agentData).length > 0 ? (
                                <p>{agentData.licenceno}</p>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}{" "}
                            </li>
                          </ul>
                        </div>
                        <div class="profile-propertyinfo">Property Info</div>
                        <div class="profile-greybg">
                          <h6>
                            Price : ${" "}
                            {Object.keys(tourData).length > 0
                              ? tourData.price
                              : ""}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8">
                      <div class="social-media" style={color}>
                        <a href={TwitterLink}>
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a href={facebookLink}>
                          <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                      </div>
                      {/* <div style={{ height: '100vh', width: '100%' }}>
                                            <GoogleMapReact
                                                yesIWantToUseGoogleMapApiInternals
                                                bootstrapURLKeys={{ key: "AIzaSyASaIio-R74aUvP2e2DWt-sNRllHPsdoX0" }}
                                                defaultCenter={defaultProps.center}
                                                defaultZoom={defaultProps.zoom}
                                            >
                                                <AnyReactComponent
                                                    lat={59.955413}
                                                    lng={30.337844}
                                                    text="My Marker"
                                                />
                                            </GoogleMapReact>
                                        </div> */}
                      <div class="theme5  googlemap">
                        <iframe
                          src="https://maps.google.com/maps?q=California&t=&z=13&ie=UTF8&iwloc=&output=embed"
                          width="100%"
                          height="450"
                          style={{ border: "0" }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="spacer30px" />
                <div class="footer-grey">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <img src={Footer} alt="" />
                    </div>
                    <div class="col-md-6 text-right">
                      {" "}
                      Copyrights Reserved 2021
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AgentViewFlyer pageName={"video"} />
      )}

      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPropertyInformation}
      >
        <DialogTitle id="customized-dialog-title">
          Property Information
          <CancelIcon
            onClick={() => setOpenProertyInfromation(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Features</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Bedroom:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Beds === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.Beds}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Square footage:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.InteriorSqFt === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.InteriorSqFt}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>MLS #:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.MLS === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.MLS}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Sub Division:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.subdivision === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.subdivision}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Bathrooms:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Baths === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.Baths}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Year Built:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.YearBuilt === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.YearBuilt}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Property Type:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Garage === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.Garage}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                School District:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.SchoolDistrict === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.SchoolDistrict}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Lots Size:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.LotSize === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.LotSize}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Parking Space:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.parkingspaces === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.parkingspaces}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>garage Size:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Garage === "" ? (
                                <span>N/A</span>
                              ) : (
                                <span>{tourDetailsData.Garage}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Status:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 ? (
                                <span>N/A</span>
                              ) : (
                                <span>{category}</span>
                              )}
                            </div>
                          </div>
                          {/* {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.Status === "") ? (
                                                        "n/a"
                                                    ) : (
                                                        <span>{tourDetailsData.Status}</span>
                                                    )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Description</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {/* {Object.keys(propertyData).length > 0 ? (
                                                <span>{propertyData.description}</span>

                                            ) : (
                                                ""
                                            )} */}
                      {Object.keys(tourDetailsData).length > 0 &&
                      tourDetailsData.Garage === "" ? (
                        <span>N/A</span>
                      ) : (
                        <span>{tourDetailsData.Garage}</span>
                      )}
                    </div>
                  </div>
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
        open={openAmenties}
      >
        <DialogTitle id="customized-dialog-title">
          Amenities
          <CancelIcon
            onClick={() => setOpenAmenties(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div class="agent_pop_main">
                {Object.keys(tourDetailsData).length > 0 &&
                tourDetailsData.aminities === "" ? (
                  <div class="alert alert-success">
                    <strong>No!</strong>
                    <a href="#" class="alert-link">
                      {" "}
                      Amenities Found
                    </a>
                    .
                  </div>
                ) : (
                  <span>{tourDetailsData.aminities}</span>
                )}
                <div class="">
                  <div class="browse_img_head">
                    <h5>Appliances</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.appliances.length > 0 ? (
                        amenities.appliances.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="app_preview">
                            <p style={{ marginLeft: "10px" }}>
                              No amenities found
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Community</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.community.length > 0 ? (
                        amenities.community.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="app_preview">
                            <p style={{ marginLeft: "10px" }}>
                              No amenities found
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Exterior</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.exterior.length > 0 ? (
                        amenities.exterior.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="app_preview">
                            <p style={{ marginLeft: "10px" }}>
                              No amenities found
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Interior</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.interior.length > 0 ? (
                        amenities.interior.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="app_preview">
                            <p style={{ marginLeft: "10px" }}>
                              No amenities found
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {openGallery && (
        <Lightbox
          mainSrc={galleryImages[photoIndex]}
          nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length]}
          prevSrc={
            galleryImages[
              (photoIndex + galleryImages.length - 1) % galleryImages.length
            ]
          }
          onCloseRequest={() => setOpenGallery(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + galleryImages.length - 1) % galleryImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % galleryImages.length)
          }
        />
      )}
      {/* <Dialog maxWidth={'lg'} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openGallery}>
                <DialogTitle id="customized-dialog-title" >
                    Gallery
                    <CancelIcon onClick={() => setOpenGallery(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <Lightbox
                            mainSrc={galleryImages[photoIndex]}
                            nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length]}
                            prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length]}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + galleryImages.length - 1) % galleryImages.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % galleryImages.length,
                                })
                            }
                        />
                    </div>
                </DialogContent>
            </Dialog> */}
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAgentinfo}
      >
        <DialogTitle id="customized-dialog-title">
          Agent Info
          <CancelIcon
            onClick={() => setopenAgentInfo(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Personal Information</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          {/* <img src={photo} /> */}
                          {Object.keys(currentUser).length > 0 ? (
                            <img src={agentProfile} alt="" title="" />
                          ) : (
                            <Skeleton variant="text" width={250} height={70} />
                          )}
                          {/* {Object.keys(currentUser).length > 0 ? (
                                                    <img src={currentUser.profile-img}/>
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )} */}
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <p style={{ marginLeft: "10px" }}>
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.name
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.company_details.company
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Mobile-:{" "}
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.mobile
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Email:
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.email
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Office:{" "}
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.company_details.officephone
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Website:{" "}
                          {Object.keys(currentUser).length > 0 ? (
                            currentUser.company_details.website
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Profile</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-12 col-md-12">
                        <p style={{ textAlign: "justify" }}>
                          In the Tours/Advanced/Co-Listing Agent section that
                          co-listing agents photo is being distorted. Please
                          take a look and correct his so that the co-listing
                          agent photo is properly proportional the same as the
                          listing agent photo. In the Tours/Advanced/Co-Listing
                          Agent section that co-listing agents photo is being
                          distorted. Please take a look and correct his so that
                          the co-listing agent photo is properly proportional
                          the same as the listing agent photo. In the
                          Tours/Advanced/Co-Listing Agent section that
                          co-listing agents photo is being distorted. Please
                          take a look and correct his so that the co-listing
                          agent photo is properly proportional the same as the
                          listing agent photo.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Credentials</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-12 col-md-12">
                        <p>N/A</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={largeWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAppointment}
      >
        <DialogTitle id="customized-dialog-title">
          Schedule an Appointment
          <CancelIcon
            onClick={() => setopenAppointment(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                scheduleAppointment();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">First Name *</div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              name="firstname"
                              value={amenityData.firstname}
                              onChange={amenityHandleChange}
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Email *</div>
                          <div class="col-md-8">
                            <input
                              type="email"
                              name="contactemail"
                              value={amenityData.contactemail}
                              class="form-control"
                              onChange={amenityHandleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Last Name *</div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              name="lastname"
                              value={amenityData.lastname}
                              class="form-control"
                              required
                              onChange={amenityHandleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Phone</div>
                          <div class="col-md-8">
                            <input
                              type="tel"
                              name="txtPhone"
                              value={amenityData.txtPhone}
                              class="form-control"
                              onChange={amenityHandleChange}
                              minlength="10"
                              maxlength="12"
                            />
                          </div>
                          {/* pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" */}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <p>Desired Date and Time for Appointment *</p>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Date</div>
                          <div class="col-md-8">
                            <input
                              type="date"
                              name="date"
                              value={amenityData.date}
                              class="form-control"
                              onChange={amenityHandleDateChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Time</div>
                          <div class="col-md-8">
                            <input
                              type="time"
                              name="time"
                              value={amenityData.time}
                              class="form-control"
                              onChange={amenityHandleTImeChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <input
                          type="checkbox"
                          id="chkNotify"
                          name="chkNotify"
                          value={amenityData.chkNotify}
                          style={{ marginBottom: "20px" }}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Notify me when there is an open house for this house.
                        </span>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Best time to reach you</div>
                          <div class="col-md-8">
                            <select
                              class="form-control"
                              name="selMettingTime"
                              onChange={amenityHandleChange}
                              id="selMettingTime"
                            >
                              <option value="0">Select</option>
                              <option value="Morning">Morning </option>
                              <option value="AfterNoon">AfterNoon</option>
                              <option value="Evening">Evening</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Contact me by</div>
                          <div class="col-md-8">
                            <select
                              class="form-control"
                              name="selContactType"
                              onChange={amenityHandleChange}
                              id="selContactType"
                            >
                              <option value="0">Select</option>
                              <option value="Phone">Phone </option>
                              <option value="Email">Email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-2">
                        <p>Comments</p>
                      </div>
                      <div class="col-md-10">
                        <textarea
                          type="text"
                          name="txaComment"
                          value={amenityData.txaComment}
                          class="form-control"
                          onChange={amenityHandleChange}
                          style={{ minHeight: "100px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div class="browse_img_head">
                    <button type="submit" class="agentbtn">
                      Save
                    </button>
                  </div>
                  <p>* Required Fields</p>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={largeWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openMortagage}
      >
        <DialogTitle id="customized-dialog-title">
          Mortgage Calculator
          <CancelIcon
            onClick={() => setOpenMortgage(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                MortgageCalclulator();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="browse_img_head">
                        <h5>Mortgage Information</h5>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Mortgage Length(years)</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="length"
                            value={mortgageData.length}
                            class="form-control"
                            onChange={inputHandleChange}
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Interest Rate(%) *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="rate"
                            onChange={inputHandleChange}
                            value={mortgageData.rate}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">House Price *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="price"
                            onChange={inputHandleChange}
                            value={mortgageData.price}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Down Payment *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="downpayment"
                            onChange={inputHandleChange}
                            value={mortgageData.downpayment}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="browse_img_head">
                        <h5>Results</h5>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Mortgage Principal:</div>
                        <div class="col-md-07">{mortgageData.principal}</div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Total Payment:</div>
                        <div class="col-md-07">{mortgageData.totalpayment}</div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Monthly Payments:</div>
                        <div class="col-md-07">
                          {mortgageData.monthlypayment}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <button
                      style={{ margin: "10px", width: "auto", height: "40px" }}
                      type="submit"
                      class="agentbtn"
                    >
                      Calculate
                    </button>
                  </div>
                  <div>
                    <button
                      style={{ margin: "10px", width: "auto", height: "40px" }}
                      onClick={() => setMortgageData(initialMorgageData)}
                      class="agentbtn"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <p>* Required Fields</p>
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
        open={openWalkScore}
      >
        <DialogTitle id="customized-dialog-title">
          Walk Score
          <CancelIcon
            onClick={() => setOpenWalkScore(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div>dfds</div>
                  <div class="row">
                    <div
                      class="col-md-6"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <a onClick={() => handleSvgLink()}>
                        <img src={svg1} />
                      </a>
                      <p>Car-Dependent</p>
                    </div>
                    {/* <div class="col-md-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <a onClick={() => handleSvgLink()}> <img src={svg2} /></a>
                                            <p>Somewhat Bikeable</p>
                                        </div> */}
                  </div>
                  <div>
                    <p>
                      The Walk Score here is 43 out of 100 based on these
                      categories. View a map of what's nearby.
                    </p>
                  </div>
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
        open={openEmailModal}
      >
        <DialogTitle id="customized-dialog-title">
          Send Flyer
          <CancelIcon
            onClick={() => setOpenEmailModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveSendFlyerData();
              }}
            >
              <div class="modal-content">
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
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="agentbtn" data-dismiss="">
                    Send
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
        open={openLink}
      >
        <DialogTitle id="customized-dialog-title">
          Service Links
          <CancelIcon
            onClick={() => setOpenLink(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="agent_pop_main">
            <div class="agent_pop_main_head">
              <h5>Branded Links</h5>
              <hr></hr>
              <div class="row">
                <div class="agent_info_sec_cont">
                  <div class="row">
                    <div class="col-md-5">
                      <span class="mls_link">Tour :</span>
                    </div>
                    <div class="col-md-7">
                      <a
                        href={
                          Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.tour_link
                        }
                        target="_blank"
                        style={{ color: "#ffa12d", fontSize: "16px" }}
                      >
                        {Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.tour_link}
                      </a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-5">
                      <span class="mls_link">Flyer :</span>
                    </div>
                    <div class="col-md-7">
                      <a
                        href={
                          Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.flyer_link
                        }
                        target="_blank"
                        style={{ color: "#ffa12d", fontSize: "16px" }}
                      >
                        {Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.flyer_link}
                      </a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-5">
                      <span class="mls_link">Video :</span>
                    </div>
                    <div class="col-md-7">
                      <a
                        href={
                          Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.video_link
                        }
                        target="_blank"
                        style={{ color: "#ffa12d", fontSize: "16px" }}
                      >
                        {Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.branded_link.video_link}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="agent_pop_main_head" style={{ paddingTop: "15px" }}>
              <h5>MLS Links</h5>
              <hr></hr>
              <div class="row">
                <div class="agent_info_sec_cont">
                  <div class="row">
                    <div class="col-md-5">
                      <span class="mls_link">Standard :</span>
                    </div>
                    <div class="col-md-7">
                      <a
                        href={
                          Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.mls_link.standard_link
                        }
                        style={{ color: "#ffa12d", fontSize: "16px" }}
                      >
                        {Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.mls_link.standard_link}
                      </a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-5">
                      <span class="mls_link">Strict :</span>
                    </div>
                    <div class="col-md-7">
                      <a
                        href={
                          Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.mls_link.strict_link
                        }
                        style={{ color: "#ffa12d", fontSize: "16px" }}
                      >
                        {Object.keys(serviceLinks).length > 0 &&
                          serviceLinks.mls_link.strict_link}
                      </a>
                    </div>
                  </div>
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
              <button type="button" onClick={SendServiceMail} class="agentbtn">
                Send
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
