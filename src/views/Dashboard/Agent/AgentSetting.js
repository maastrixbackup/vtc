import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import $ from "jquery";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import TwitterLogin from "react-twitter-oauth";
import dateFormat from "dateformat";
import OAuth2Login from "react-simple-oauth2-login";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { ReactComponent as PinterestLogo } from "../../../images/pinterest.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Captcha from "react-numeric-captcha";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../images/vtc-logo2.png";
import user from "../../../images/user.jpg";
import Slider from "react-rangeslider";
import Switch from "react-switch";
import ImageUploader from "react-images-upload";
import profile1 from "../../../images/profile1.jpg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import theme1 from "../../../ThemeImages/theme1.jpg";
import theme2 from "../../../ThemeImages/theme2.jpg";
import theme3 from "../../../ThemeImages/theme3.jpg";
import theme4 from "../../../ThemeImages/theme4.jpg";
import theme5 from "../../../ThemeImages/theme5.jpg";
import theme6 from "../../../ThemeImages/theme6.jpg";
import theme7 from "../../../ThemeImages/theme7.jpg";
import theme8 from "../../../ThemeImages/theme8.jpg";
import banner from "../../../images/vtc-banner.jpg";
import house_img from "../../../images/house-img.jpg";
import thumbpics1 from "../../../images/thumbpics1.jpg";
import thumbpics2 from "../../../images/thumbpics2.jpg";
import thumbpics3 from "../../../images/thumbpics3.jpg";
import thumbpics4 from "../../../images/thumbpics4.jpg";
import OwlCarousel from "react-owl-carousel";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Skeleton from "@material-ui/lab/Skeleton";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
import ReCAPTCHA from "react-google-recaptcha";
const APIGetUserData = APIURL() + "user-details";
const APIAgentProfile = APIURL() + "agent-personal-information";
const APIAgentMycafe = APIURL() + "update-agent-mycafe";
const APIAgentCompanyInfo = APIURL() + "agent-company-information-update";
const APIAgentDefaultEmail = APIURL() + "agent-default-email-update";
const APIAgentDefaultPhone = APIURL() + "agent-default-phone-update";
const APIAgentVideoOption = APIURL() + "agent-update-video-option";
const APIAgentTourOption = APIURL() + "agent-update-tour-option";
const APIAgentFlyerOption = APIURL() + "agent-update-flyer-option";
const APIAgentTrafficOption = APIURL() + "agent-update-traffic";
const APIAgentSlideImage = APIURL() + "agent-update-slide-show-image-settings";
const APIAgentSlideShow = APIURL() + "agent-update-slide-show-slide-settings";
const APIAgentSlideCaption =
  APIURL() + "agent-update-slide-show-caption-settings";
const APIAgentPanorama = APIURL() + "agent-update-default-panorama-settings";
const APIAgentCaption = APIURL() + "agent-update-default-caption-settings";
const APIAgentFlyerTheme = APIURL() + "agent-update-theme-default-flyer-theme";
const APIAgentFlyerTourTheme =
  APIURL() + "agent-update-theme-default-tour-theme";
const APIAgentFlyerPremiumTourTheme =
  APIURL() + "agent-update-theme-default-premium-tour-theme";
const APIAgentMusic = APIURL() + "agent-update-backgroud-music-defaults";
const APIAgentNewsLetter = APIURL() + "agent-update-newsletter";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
const APIDeleteAgentImage = APIURL() + "get-agentProfileRemoveImg";
const APIUpdateSlideShow = APIURL() + "update-slideShow";
const APIUpdateImagePreference = APIURL() + "update-SettingPreference";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIGetImagePreference = APIURL() + "get-image-preferene-setting";
const APIGetPaymentDetails = APIURL() + "agent-get-payment-profile-details";
const APISavePayment = APIURL() + "agent-update-payment-profile";
const APIGetCompanyLogos = APIURL() + "get-companylogotitle";
const APIGetUpdateCompanyLogo = APIURL() + "update-companylogo";
const APIDeleteImageLogo = APIURL() + "delete-imageAgent";
const APIChangebanner = APIURL() + "change-banner";
const APIGetOfferedBanners = APIURL() + "get-flyerheader-agent-details";
const APIGetThemes = APIURL() + "get-setting-Themes";
const APISaveYoutubeAuth = APIURL() + "agent-save-youtube-Setting";
const APIGetAuthDetails = APIURL() + "agent-get-youtube-Setting";
const APIRemoveYoutubeAuth = APIURL() + "agent-remove-youtube-auth";
const APISavefacebookAuth = APIURL() + "save-social-setting";
const APIGetFacebookAuth = APIURL() + "agent-get-social-Setting";
const APIRemoveSocialAuth = APIURL() + "delete-social-setting";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
  btn_pwd: {
    float: "right",
    top: "-50px",
  },
}));
export default function AgentSetting(props) {
  let history = useHistory();
  const context = useContext(AuthContext);
  const classes = useStyles();
  const initialState = {
    authenticate_key: "abcd123XYZ",
    fname: "",
    lname: "",
    licenceno: "",
    username: "",
    password: "",
    confirm_pass: "",
    email: "",
    mobile: "",
    profile: "",
    credentials: "",
    facebooklink: "",
    twitterlink: "",
    linkedinlink: "",
    yelplink: "",
  };
  const initialImageState = {
    authenticate_key: "abcd123XYZ",
    agentphotouploadfile: "",
  };
  const initialMycafeState = {
    authenticate_key: "abcd123XYZ",
    mycafegallery: "",
  };
  const initialCompanyInfoState = {
    authenticate_key: "abcd123XYZ",
    countryid: 40,
    stateid: "",
    company: "",
    address: "",
    city: "",
    zipcode: "",
    officephone: "",
    fax: "",
    website: "",
  };
  const initialEmailState = {
    touremail: "",
    flyermail: "",
    videoemail: "",
    mycafegalleryemail: "",
  };
  const initialPhoneState = {
    allowphone: "",
    allowoffice: "",
    allowfax: "",
    allowcell: "",
  };
  const initialVideoState = {
    videophonetouse: "",
    videoshowprice: "",
  };
  const initialTourState = {
    use_agent_photo: "",
    use_agent_company_photo: "",
    showleadcapture: "",
  };
  const initialFlyerState = {
    is_flyer_agent_photo: "",
    is_flyer_agent_company_photo: "",
  };
  const initialTrafficState = {
    reportrecipients: "",
    emailtrafficreport: "",
  };
  const initialSlideImageState = {
    kenburnsservice: "",
    randomcamera: "",
  };
  const initialSlideShowState = {
    transduration: 20,
    transspeed: 20,
    transition: "",
  };
  const initialSlideShowCaptionState = {
    tourfontstyle: "",
    tourfontsize: "",
    videofontsize: "",
  };
  const initialPanoramaImageState = {
    panospeed: "",
    hfov: "",
    vaov: "",
    maxzoom: "",
    panotype: "",
    isShowZoom: "1",
    isKeyboardZoom: "1",
    IsMouseZoom: "1",
  };
  const initialPanoramaCaptionState = {
    panofontstyle: "",
    panofontsize: "",
  };
  const initialFlyerThemeState = {
    flyertheme_pagename: "",
    flyertheme: "",
  };
  const initialFlyerTourThemeState = {
    tourtheme: "",
  };
  const initialFlyerPremiumThemeState = {
    is_premium_tour_theme: "",
    premium_tour_theme: "",
  };
  const initialMusicState = {
    musicid: "",
  };
  const initialNewsLetterState = {
    formcode: "",
  };
  const initialPaymentState = {
    fname: "",
    lname: "",
    email: "",
    officephone: "",
    address: "",
    zipcode: "",
    countryid: "",
    stateid: "",
    city: "",
    cc_no: "",
    cvv: "",
    cc_month: "",
    cc_year: "",
  };

  const mediainputRef = useRef();
  const { dispatch } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [checked, setChecked] = useState(false);
  const [image, setImage] = useState();
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const [croppingLogo, setCroppingLogo] = useState(false);
  const [profileData, setProfileData] = useState(initialState);
  const [imageData, setImageData] = useState(initialImageState);
  const [mycafeData, setMycafeData] = useState(initialMycafeState);
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfoState);
  const [companyPictures, setCompanyPictures] = useState({});
  const [emailData, setEmailData] = useState(initialEmailState);
  const [phoneData, setPhoneData] = useState(initialPhoneState);
  const [videoData, setVideoData] = useState(initialVideoState);
  const [tourData, setTourData] = useState(initialTourState);
  const [flyerData, setFlyerData] = useState(initialFlyerState);
  const [trafficData, setTrafficData] = useState(initialTrafficState);
  const [slideImageData, setSlideImageData] = useState(initialSlideImageState);
  const [slideShowData, setSlideShowData] = useState(initialSlideShowState);
  const [slideShowCaptionData, setSlideShowCaptionData] = useState(
    initialSlideShowCaptionState
  );
  const [panoramaImageData, setPanoramaImageData] = useState(
    initialPanoramaImageState
  );
  const [panoramaCaptionData, setPanoramaCaptionData] = useState(
    initialPanoramaCaptionState
  );
  const [flyerThemeData, setFlyerThemeData] = useState(initialFlyerThemeState);
  const [flyerTourThemeData, setFlyerTourThemeData] = useState(
    initialFlyerTourThemeState
  );
  const [flyerPremiumThemeData, setFlyerPremiumThemeData] = useState(
    initialFlyerPremiumThemeState
  );
  const [newsLetterData, setNewsLetterData] = useState(initialNewsLetterState);
  const [musicData, setMusicData] = useState(initialMusicState);
  const [paymentData, setPaymentData] = useState(initialPaymentState);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [music, setMusic] = useState("");
  const [open, setOpen] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [iconData, setIconData] = useState({});
  const [agentImage, setAgentImage] = useState("");
  const [blurValue, setBlurValue] = useState(0);
  const [brightValue, setBrightValue] = useState(10);
  const [grayValue, setGrayValue] = useState(0);
  const [contrastValue, setContrastValue] = useState(1);
  const [hueValue, setHueValue] = useState(0);
  const [invertValue, setInvertValue] = useState(0);
  const [opacityValue, setOpacityValue] = useState(100);
  const [saturateValue, setSaturateValue] = useState(10);
  const [sepiaValue, setSepiaValue] = useState(0);
  const [editImageData, setEditImageData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [companyTab, setCompanyTab] = useState(false);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [allLogo, setAllLogo] = useState([]);
  const [defaultLogo, setDefaultlogo] = useState("");
  const [logoimageid, setLogoImageId] = useState("");
  const [customLogo, setCustomLogo] = useState("");
  const [headerImageId, setHeaderImageId] = useState("");
  const [offeredBannerImg, setOfferedBannerImg] = useState("");
  const [sync, setSync] = useState(true);
  const [defaultBanner, setDefaultBanner] = useState(
    "https://virtualtourcafe.com/alpha/static/media/default-banner.87685114.jpg"
  );
  const [allBanners, setAllBanners] = useState([]);
  const [allThemes, setAllThemes] = useState({});
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [facebookAuth, setFacebookAuth] = useState(false);
  const [twitterAuth, setTwitterAuth] = useState(false);
  const [youtubeAuth, setYoutubeAuth] = useState(false);
  const [linkedinAuth, setLinkedInAuth] = useState(false);
  const [youtubeAccessToken, setYoutubeAccessToken] = useState({});
  const [facebookAccessToken, setFacebookAccessToken] = useState({});
  const [twitterAccessToken, setTwitterAccessToken] = useState({});
  const [pinterestAccessToken, setPinterestAccessToken] = useState({});
  const [linkedinAccessToken, setLinkedInAccessToken] = useState({});

  const [hover, setHover] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const REDIRECT_URI = window.location.href;
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    const state = popupWindowURL.searchParams.get("state");
    if (state && code) {
      localStorage.setItem("twitter", `${code}`);
      window.close();
    }
    if (state?.includes("_pinterest") && code) {
      localStorage.setItem("pinterest", code);
      window.close();
    }
    if (state?.includes("_linkedin") && code) {
      localStorage.setItem("linkedin", code);
      window.close();
    }
  }, []);

  useEffect(() => {
    if (props.location.search === "?company") {
      setCompanyTab(true);
    }
  }, [props.location.search]);
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
        agentid: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetAuthDetails, objusr).then((res) => {
        if (res.data[0].response.message === "Authorization Required") {
          setYoutubeAccessToken({});
        } else {
          res.data[0].response.data.access_token &&
            setYoutubeAccessToken(
              JSON.parse(res.data[0].response.data.access_token)
            );
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        setting_type: "facebook",
      };
      postRecord(APIGetFacebookAuth, obj).then((res) => {
        if (res.data[0].response.message === "Authorization Required") {
          setFacebookAccessToken({});
        } else {
          setFacebookAccessToken(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        setting_type: "twitter",
      };
      postRecord(APIGetFacebookAuth, obj).then((res) => {
        if (res.data[0].response.message === "Authorization Required") {
          setTwitterAccessToken({});
        } else {
          if (new Date() > new Date(res.data[0].response.data.expires_in)) {
            removeAuthorization("twitter");
          } else {
            setTwitterAccessToken(res.data[0].response.data);
          }
        }
      });
    }
  }, [context.state.user, sync]);

  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        setting_type: "pinterest",
      };
      postRecord(APIGetFacebookAuth, obj).then((res) => {
        if (res.data[0].response.message === "Authorization Required") {
          setPinterestAccessToken({});
        } else {
          if (new Date() > new Date(res.data[0].response.data.expires_in)) {
            removeAuthorization("pinterest");
          } else {
            setPinterestAccessToken(res.data[0].response.data);
          }
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        setting_type: "linkedin",
      };
      postRecord(APIGetFacebookAuth, obj).then((res) => {
        if (res.data[0].response.message === "Authorization Required") {
          setLinkedInAccessToken({});
        } else {
          if (new Date() > new Date(res.data[0].response.data.expires_in)) {
            removeAuthorization("linkedin");
          } else {
            setLinkedInAccessToken(res.data[0].response.data);
          }
        }
      });
    }
  }, [context.state.user, sync]);
  const removeAuthorization = (type) => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      setting_type: type,
    };
    postRecord(APIRemoveSocialAuth, obj).then((res) => {});
  };
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetCompanyLogos, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllLogo(res.data[0].response.data);
          setDefaultlogo(res.data[0].response.companylogo);
          setLogoImageId(res.data[0].response.logoimageid);
          setCustomLogo("");
          // setDefaultBanner(res.data[0].response.companybanner);
          setOfferedBannerImg(res.data[0].response.companybanner);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetOfferedBanners, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllBanners(res.data[0].response.flyerdetails);
          setHeaderImageId(res.data[0].response.headerimageid);
          //setOfferedBannerImg(res.data[0].response.bannerimg);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (logoimageid !== "0") {
      var filter_data = allLogo.filter((res) => {
        return res.id == logoimageid;
      });
      if (filter_data.length > 0) {
        setCustomLogo(filter_data[0].cl_logo_name);
      } else {
        setCustomLogo("");
      }
    }
  }, [logoimageid, allLogo]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetPaymentDetails, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setPaymentData(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-profile-details`, obj, {})
        .then((res) => {
          setCompanyInfo(res.data[0].response.data.agent_details);
          setMycafeData(res.data[0].response.data.agent_details);
          setProfileData(res.data[0].response.data.agent_details);
          setImageData(res.data[0].response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-company-info-details`, obj)
        .then((res) => {
          setCompanyInfo(res.data[0].response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-default-phone`, obj)
        .then((res) => {
          setEmailData(res.data[0].response.data.email);
          setPhoneData(res.data[0].response.data.phone);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetThemes, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllThemes(res.data[0].response.dataTotalArray[0]);
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
        .post(APIURL() + `agent-get-video-option`, obj)
        .then((res) => {
          setVideoData(res.data[0].response.data.video_option);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-tour-option`, obj)
        .then((res) => {
          setTourData(res.data[0].response.data.tour_option);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-flyer-option`, obj)
        .then((res) => {
          setFlyerData(res.data[0].response.data.flyer_option);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-traffic`, obj)
        .then((res) => {
          setTrafficData(res.data[0].response.data.traffic);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-slide-show-settings`, obj)
        .then((res) => {
          setSlideImageData(res.data[0].response.data.image_setting);
          setSlideShowData(res.data[0].response.data.slide_setting);
          setSlideShowCaptionData(res.data[0].response.data.caption_setting);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-default-panorama-settings`, obj)
        .then((res) => {
          setPanoramaImageData(res.data[0].response.data.panoramaFrm);
          setPanoramaCaptionData(res.data[0].response.data.caption);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-theme-default-settings`, obj)
        .then((res) => {
          flyerThemeData.flyertheme_pagename =
            res.data[0].response.data.flyer_theme.flyertheme_pagename.split(
              "-"
            )[0];
          flyerThemeData.flyertheme =
            res.data[0].response.data.flyer_theme.flyertheme_pagename.split(
              "-"
            )[1] +
            "-" +
            res.data[0].response.data.flyer_theme.flyertheme;
          // setFlyerThemeData(res.data[0].response.data.flyer_theme);
          setFlyerTourThemeData(res.data[0].response.data.tour_theme);
          setFlyerPremiumThemeData(
            res.data[0].response.data.premium_tour_theme
          );
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
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
      const obj = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      axios
        .post(APIURL() + `agent-get-newsletter-seetings`, obj)
        .then((res) => {
          setNewsLetterData(res.data[0].response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [context.state.user]);
  useEffect(() => {
    if (Object.keys(profileData).length > 0) {
      profileData.confirm_pass = profileData.password;
    }
  }, [profileData]);
  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSocialIconLink, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setIconData(res.data[0].response);
      }
    });
  }, []);
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
      country_id: paymentData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        return;
      }
      setAllStates([]);
      setCompanyInfo({ ...companyInfo, stateid: "" });
    });
  }, [paymentData.countryid]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      country_id: companyInfo.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        return;
      }
      setAllStates([]);
      setCompanyInfo({ ...companyInfo, stateid: "" });
    });
  }, [companyInfo.countryid]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetImagePreference, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setEditImageData(res.data[0].response.data);
          setBlurValue(
            res.data[0].response.data.blur === null
              ? 0
              : res.data[0].response.data.blur
          );
          setBrightValue(
            res.data[0].response.data.brightness === 100
              ? 10
              : res.data[0].response.data.brightness
          );
          setGrayValue(
            res.data[0].response.data.grayscale === null
              ? 0
              : res.data[0].response.data.grayscale
          );
          setContrastValue(
            res.data[0].response.data.contrast === 0
              ? 1
              : res.data[0].response.data.contrast
          );
          setHueValue(
            res.data[0].response.data.huerotate === null
              ? 0
              : res.data[0].response.data.huerotate
          );
          setInvertValue(
            res.data[0].response.data.invert === null
              ? 0
              : res.data[0].response.data.invert
          );
          //setOpacityValue(res.data[0].response.data.opacity === 0 ? 100 : res.data[0].response.data.opacity);
          setSaturateValue(
            res.data[0].response.data.saturation === 100
              ? 10
              : res.data[0].response.data.saturation
          );
          setSepiaValue(
            res.data[0].response.data.sepia === null
              ? 0
              : res.data[0].response.data.sepia
          );
        }
      });
    }
  }, [context.state.user]);
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
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const handleTourChange = (nextChecked) => {
    setEmailData({ ...emailData, ["touremail"]: nextChecked });
  };
  const handleFlyerChange = (nextChecked) => {
    setEmailData({ ...emailData, ["flyermail"]: nextChecked });
  };
  const handleVideoChange = (nextChecked) => {
    setEmailData({ ...emailData, ["videoemail"]: nextChecked });
  };
  const handleMycafeChange = (nextChecked) => {
    setEmailData({ ...emailData, ["mycafegalleryemail"]: nextChecked });
  };
  const handlePhoneChange = (nextChecked) => {
    setPhoneData({ ...phoneData, ["allowphone"]: nextChecked });
  };
  const handleOfficePhoneChange = (nextChecked) => {
    setPhoneData({ ...phoneData, ["allowoffice"]: nextChecked });
  };
  const handleFaxChange = (nextChecked) => {
    setPhoneData({ ...phoneData, ["allowfax"]: nextChecked });
  };
  const handleCellChange = (nextChecked) => {
    setPhoneData({ ...phoneData, ["allowcell"]: nextChecked });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };
  const handleVideoInputChange = (event) => {
    const { name, value } = event.target;
    setVideoData({ ...videoData, [name]: parseInt(value) });
  };
  const handleTourInputChange = (event) => {
    const { name, value } = event.target;
    setTourData({ ...tourData, [name]: parseInt(value) });
  };
  const handleFlyerInputChange = (event) => {
    const { name, value } = event.target;
    setFlyerData({ ...flyerData, [name]: parseInt(value) });
  };
  const handleTrafficInputChange = (event) => {
    const { name, value } = event.target;
    setTrafficData({ ...trafficData, [name]: value });
  };
  const handleTrafficChange = (nextChecked) => {
    setTrafficData({ ...trafficData, ["emailtrafficreport"]: nextChecked });
  };
  const handleKenBurnChange = (nextChecked) => {
    setSlideImageData({ ...slideImageData, ["kenburnsservice"]: nextChecked });
  };
  const handlerandomChange = (nextChecked) => {
    setSlideImageData({ ...slideImageData, ["randomcamera"]: nextChecked });
  };
  const handleSlideChange = (event) => {
    setSlideShowData({ ...slideShowData, transduration: event });
  };
  const handleSlideSpeedChange = (event) => {
    setSlideShowData({ ...slideShowData, transspeed: event });
  };
  const handleSlideTransChange = (event) => {
    setSlideShowData({ ...slideShowData, transition: event.target.value });
  };
  const handleSlideCaptionInputChange = (event) => {
    const { name, value } = event.target;
    setSlideShowCaptionData({ ...slideShowCaptionData, [name]: value });
  };
  const handleWaitChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, waittime: event });
  };
  const handleSpeedChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, panospeed: event });
  };
  const handleAccChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, acceleration: event });
  };
  const handleHorizChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, hfov: event });
  };
  const handleShowZoomChange = (nextChecked) => {
    setPanoramaImageData({ ...panoramaImageData, ["isShowZoom"]: nextChecked });
  };
  const handleKeyboardZoomChange = (nextChecked) => {
    setPanoramaImageData({
      ...panoramaImageData,
      ["isKeyboardZoom"]: nextChecked,
    });
  };
  const handleMouseZoomChange = (nextChecked) => {
    setPanoramaImageData({
      ...panoramaImageData,
      ["IsMouseZoom"]: nextChecked,
    });
  };
  const handleVertiChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, vaov: event });
  };
  const handleMinZoomChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, minzoom: event });
  };
  const handleMaxZoomChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, maxzoom: event });
  };
  const handleStartZoomChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, startzoom: event });
  };
  const handleEndZoomChange = (event) => {
    setPanoramaImageData({ ...panoramaImageData, endzoom: event });
  };
  const handlepanoTypeChange = (event) => {
    setPanoramaImageData({
      ...panoramaImageData,
      panotype: event.target.value,
    });
  };
  const handlepanoCaptionChange = (event) => {
    const { name, value } = event.target;
    setPanoramaCaptionData({ ...panoramaCaptionData, [name]: value });
  };
  const handleFlyerThemeChange = (event) => {
    const { name, value } = event.target;
    setFlyerThemeData({ ...flyerThemeData, [name]: value });
  };
  console.log("flyerThemeData", flyerThemeData);
  const handleTourThemeChange = (event) => {
    const { name, value } = event.target;
    setFlyerTourThemeData({ ...flyerTourThemeData, [name]: parseInt(value) });
  };
  const handlePremiumThemeInputChange = (checked) => {
    setFlyerPremiumThemeData({
      ...flyerPremiumThemeData,
      is_premium_tour_theme: checked,
    });
  };
  const handlePremiumThemeChange = (event) => {
    const { name, value } = event.target;
    setFlyerPremiumThemeData({
      ...flyerPremiumThemeData,
      [name]: parseInt(value),
    });
  };
  const handleNewsChange = (event) => {
    const { name, value } = event.target;
    setNewsLetterData({ ...newsLetterData, [name]: value });
  };
  const handleMusicChange = (data) => {
    setMusic(data.path);
    musicData.musicid = data.musicid;
  };
  const handleCheckboxChange = (event) => {
    if (event.target.checked === true) {
      setVideoData({ ...videoData, ["videoshowprice"]: 1 });
    } else {
      setVideoData({ ...videoData, ["videoshowprice"]: 0 });
    }
  };
  const updateUserProfile = (data) => {
    setOpen(true);
    data.authenticate_key = "abcd123XYZ";
    data.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentProfile, data)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.data.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.data.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleClick = () => {
    history.push(APIPath() + "my-cafe-gellary/" + mycafeData.mycafegallery);
  };

  function convertBase64ToBlob(base64Image) {
    // Split into two parts
    const parts = base64Image.split(";base64,");

    // Hold the content type
    const imageType = parts[0].split(":")[1];

    // Decode Base64 string
    const decodedData = atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  const saveImage = () => {
    setOpen(true);
    imageData.authenticate_key = "abcd123XYZ";
    imageData.agent_id = JSON.parse(context.state.user).agentId;
    const formData = new FormData();
    for (let i in imageData) {
      if (i === "agentphotouploadfile") {
        const file = convertBase64ToBlob(imageData[i]);
        formData.append("agentphotouploadfile", file);
        // fetch(imageData[i])
        //   .then((res) => res.blob())
        //   .then((file) => {formData.append("agentphotouploadfile", file);console.log(file)});
        // formData.append("agentphotouploadfile", file);
      } else {
        formData.append(i, imageData[i]);
      }
    }

    axios
      .post(APIURL() + `agent-profile-upload-image`, formData, {})
      //  .post("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/agent-profile-upload-image", formData, {})
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          // setImageData({
          //   ...imageData,
          //   ["agentphotouploadfile"]: res.data[0].response.data.profile_image,
          // });
        } else {
          setSync(!sync);
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
  const DeleteAgentProfileImage = () => {
    imageData.authenticate_key = "abcd123XYZ";
    imageData.agent_id = JSON.parse(context.state.user).agentId;
    imageData.img = "photo.jpg";
    postRecord(APIDeleteAgentImage, imageData)
      .then((res) => {
        console.log("here" + res.data[0].response.status);
        if (res.data[0].response.status === "success") {
          setImageData("");
          // setAgentImage(res.data[0].response.data.profile_image);
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
  const forImage = (e) => {
    setImageData({
      ...imageData,
      ["agentphotouploadfile"]: e.target.files,
    });
    e.preventDefault();
    let files;
    setCroppingLogo(false);

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files[0]) {
      try {
        const reader = new FileReader();

        reader.onload = function () {
          setImage(reader.result);
        };

        reader.readAsDataURL(files[0]);
        setOpenImageCrop(true);
      } catch (error) {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      }
    }
  };
  const handlecafeChange = (event) => {
    const { name, value } = event.target;
    setMycafeData({ ...mycafeData, [name]: value });
  };
  const updateMycafe = () => {
    setOpen(true);
    mycafeData.authenticate_key = "abcd123XYZ";
    mycafeData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentMycafe, mycafeData)
      .then((res) => {
        setOpen(false);
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
  const saveCompanyInfo = () => {
    setOpen(true);
    companyInfo.authenticate_key = "abcd123XYZ";
    companyInfo.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentCompanyInfo, companyInfo)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.data.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.data.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const isURL = (str) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    console.log("==============urlRegex======================");
    console.log(urlRegex.test(str));
    console.log("====================================");
    return urlRegex.test(str);
  };
  const saveCompanyPictures = () => {
    setOpen(true);
    try {
      companyPictures.authenticate_key = "abcd123XYZ";
      companyPictures.agent_id = JSON.parse(context.state.user).agentId;
      companyPictures.bannerImageId = headerImageId;
      companyPictures.logoImageId = logoimageid;
      const formData = new FormData();
      for (let i in companyPictures) {
        if (i === "logoImageName") {
          if (!isURL(customLogo)) {
            const file = convertBase64ToBlob(companyPictures[i]);
            formData.append("logoImageName", file);
          } else {
            for (let file of companyPictures[i]) {
              formData.append("logoImageName", file);
            }
          }
        } else if (i === "bannerImageName") {
          for (let file of companyPictures[i]) {
            formData.append("bannerImageName", file);
          }
        } else {
          formData.append(i, companyPictures[i]);
        }
      }
      axios
        .post(APIURL() + `agent-company-information-upload-imgupdate`, formData)
        .then((res) => {
          setOpen(false);
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
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      setMessage("Something Went Wrong. Please try again later...");
      setOpenError(true);
    } finally {
      setOpen(false);
    }
  };
  const saveEmailOptions = () => {
    setOpen(true);
    emailData.authenticate_key = "abcd123XYZ";
    emailData.type = "email";
    emailData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentDefaultEmail, emailData)
      .then((res) => {
        setOpen(false);
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
  const savePhoneOptions = () => {
    setOpen(true);
    phoneData.authenticate_key = "abcd123XYZ";
    phoneData.type = "phone";
    phoneData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentDefaultPhone, phoneData)
      .then((res) => {
        setOpen(false);
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
  const saveVideoOptions = () => {
    setOpen(true);
    videoData.authenticate_key = "abcd123XYZ";
    videoData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentVideoOption, videoData)
      .then((res) => {
        setOpen(false);
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
  const saveTourOptions = () => {
    setOpen(true);
    tourData.authenticate_key = "abcd123XYZ";
    tourData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentTourOption, tourData)
      .then((res) => {
        setOpen(false);
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
  const saveFlyerOptions = () => {
    setOpen(true);
    flyerData.authenticate_key = "abcd123XYZ";
    flyerData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentFlyerOption, flyerData)
      .then((res) => {
        setOpen(false);
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
  const saveTrafficOptions = () => {
    setOpen(true);
    trafficData.authenticate_key = "abcd123XYZ";
    trafficData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentTrafficOption, trafficData)
      .then((res) => {
        setOpen(false);
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
  const saveSliderImage = () => {
    setOpen(true);
    slideImageData.authenticate_key = "abcd123XYZ";
    slideImageData.type = "image_setting";
    slideImageData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentSlideImage, slideImageData)
      .then((res) => {
        setOpen(false);
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
  const saveSlideShowdata = () => {
    setOpen(true);
    slideShowData.authenticate_key = "abcd123XYZ";
    slideShowData.type = "slide_setting";
    slideShowData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentSlideShow, slideShowData)
      .then((res) => {
        setOpen(false);
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
  const saveSlideCaption = () => {
    setOpen(true);
    slideShowCaptionData.authenticate_key = "abcd123XYZ";
    slideShowCaptionData.type = "caption_setting";
    slideShowCaptionData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentSlideCaption, slideShowCaptionData)
      .then((res) => {
        setOpen(false);
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
  const savePanoramaImage = () => {
    setOpen(true);
    panoramaImageData.authenticate_key = "abcd123XYZ";
    panoramaImageData.type = "panoramaFrm";
    panoramaImageData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentPanorama, panoramaImageData)
      .then((res) => {
        setOpen(false);
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
  const savePanoramaCaption = () => {
    setOpen(true);
    panoramaCaptionData.authenticate_key = "abcd123XYZ";
    panoramaCaptionData.type = "caption";
    panoramaCaptionData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentCaption, panoramaCaptionData)
      .then((res) => {
        setOpen(false);
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
  const saveFlyerTheme = () => {
    setOpen(true);
    flyerThemeData.authenticate_key = "abcd123XYZ";
    flyerThemeData.type = "flyer-theme";
    flyerThemeData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentFlyerTheme, flyerThemeData)
      .then((res) => {
        setOpen(false);
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
  const saveFlyerTourTheme = () => {
    setOpen(true);
    flyerTourThemeData.authenticate_key = "abcd123XYZ";
    flyerTourThemeData.type = "tour-theme";
    flyerTourThemeData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentFlyerTourTheme, flyerTourThemeData)
      .then((res) => {
        setOpen(false);
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
  const saveFlyerPremiumTourTheme = () => {
    setOpen(true);
    flyerPremiumThemeData.authenticate_key = "abcd123XYZ";
    flyerPremiumThemeData.type = "premium-tour-theme";
    flyerPremiumThemeData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentFlyerPremiumTourTheme, flyerPremiumThemeData)
      .then((res) => {
        setOpen(false);
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
  const saveMusicData = () => {
    setOpen(true);
    musicData.authenticate_key = "abcd123XYZ";
    musicData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentMusic, musicData)
      .then((res) => {
        setOpen(false);
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
  const saveNewsLetterData = () => {
    setOpen(true);
    newsLetterData.authenticate_key = "abcd123XYZ";
    newsLetterData.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIAgentNewsLetter, newsLetterData)
      .then((res) => {
        setOpen(false);
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
  const updateEditImagePreference = () => {
    editImageData.authenticate_key = "abcd123XYZ";
    editImageData.agentId = JSON.parse(context.state.user).agentId;
    postRecord(APIUpdateImagePreference, editImageData)
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
        setOpen(false);
      });
  };
  function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }
  const getDate = (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    const date = new Date();
    const result = addHours(hours, date);
    return result;
  };
  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  }
  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handlePaymentEmailChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value });
  };
  const handlePaymentPhoneChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value.replace(/\D/g, "") });
  };

  const handlePaymentCardNoChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({
      ...paymentData,
      [name]: value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    });
  };
  const savePaymentDetails = () => {
    if (captchaSuccess === false) {
      setMessage("Please enter a valid captcha code");
      setOpenError(true);
    } else {
      setOpen(true);
      paymentData.authenticate_key = "abcd123XYZ";
      paymentData.agent_id = JSON.parse(context.state.user).agentId;
      postRecord(APISavePayment, paymentData)
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
  // const handleLogoChange = element => {
  //     setCompanyPictures({ ...companyPictures, ["logoImageName"]: element });
  // };
  // const handleBannerChange = element => {
  //     setCompanyPictures({ ...companyPictures, ["bannerImageName"]: element });
  // };
  const handleLogoChange = (event) => {
    const data = event.target.value;
    setLogoImageId(event.target.value);
    companyPictures.header = event.target.value;
    setCompanyPictures({ ...companyPictures, logoImageName: "" });
    handleLogoGetData(data);
  };
  const handleImageChange = (e) => {
    setCompanyPictures({
      ...companyPictures,
      logoImageName: e.target.files,
    });
    setLogoImageId("0");
    setCustomLogo(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files[0]) {
      setCroppingLogo(true);
      try {
        const reader = new FileReader();

        reader.onload = function () {
          setImage(reader.result);
        };

        reader.readAsDataURL(files[0]);
        setOpenImageCrop(true);
      } catch (error) {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      }
    }
  };
  const handleBannerImageChange = (event) => {
    setCompanyPictures({
      ...companyPictures,
      bannerImageName: event.target.files,
    });
    setHeaderImageId("0");
    setOfferedBannerImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerChange = (event) => {
    const data = event.target.value;
    if (data == 0) setOfferedBannerImg("");
    setHeaderImageId(event.target.value);
    companyPictures.header = event.target.value;
    setCompanyPictures({ ...companyPictures, bannerImageName: "" });
    changeBannerGetData(data);
  };
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
  const removeLogo = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      folder: "companylogo",
    };
    postRecord(APIDeleteImageLogo, obj)
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
  const removeBanner = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      folder: "companybanner ",
    };
    setOpen(true);
    postRecord(APIDeleteImageLogo, obj)
      .then((res) => {
        setOpen(false);
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

  const handleLogoGetData = (data) => {
    companyPictures.authenticate_key = "abcd123XYZ";
    companyPictures.imageid = data;
    companyPictures.agent_id = JSON.parse(context.state.user).agentId;
    postRecord(APIGetUpdateCompanyLogo, companyPictures)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          // setMessage(res.data[0].response.message);
          // setOpenSuccess(true);
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
  const changeBannerGetData = (data) => {
    companyPictures.authenticate_key = "abcd123XYZ";
    companyPictures.agent_id = JSON.parse(context.state.user).agentId;
    companyPictures.imageId = data;
    postRecord(APIChangebanner, companyPictures)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          // setMessage(res.data[0].response.message);
          // setOpenSuccess(true);
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
  const handleClickShowPassword = () => {
    setProfileData({ ...profileData, showPassword: !profileData.showPassword });
  };
  const handleClickShowPasswordOne = () => {
    setProfileData({
      ...profileData,
      showPasswordOne: !profileData.showPasswordOne,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const MyFacebookButton = ({ onClick }) => (
    <button style={{ padding: "20px", marginLeft: "40%" }} onClick={onClick}>
      facebook Authorize
    </button>
  );
  const onLoginStart = useCallback(() => {
    console.log("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);
  const authenticate = (response) => {
    // console.log(response);
    // Api call to server so we can validate the token
  };
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  const onSuccess = (response) => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentid: JSON.parse(context.state.user).agentId,
      token: response,
    };
    postRecord(APISaveYoutubeAuth, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  function onChange(value) {
    setCaptchaSuccess(true);
  }
  const onFailure = (response) => console.error(response);
  const removeYoutubeAuth = () => {
    setOpen(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentid: JSON.parse(context.state.user).agentId,
    };
    postRecord(APIRemoveYoutubeAuth, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setOpen(false);
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const getFbDate = (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    const date = new Date();
    const result = addHours(hours, date);
    return result.toLocaleString();
  };
  const saveFacebookAuth = (data) => {
    var arr = [];
    const obj0 = {
      setting_name: "expires_at",
      setting_value: getFbDate(data.data_access_expiration_time),
    };
    const obj1 = {
      setting_name: "expires_in",
      setting_value: getDate(data.expires_in),
    };
    const obj2 = {
      setting_name: "fb_id",
      setting_value: data.id,
    };
    const obj3 = {
      setting_name: "name",
      setting_value: data.name,
    };
    const obj4 = {
      setting_name: "email",
      setting_value: data.email,
    };
    const obj5 = {
      setting_name: "token",
      setting_value: data.accessToken,
    };
    arr.push(obj0);
    arr.push(obj1);
    arr.push(obj2);
    arr.push(obj3);
    arr.push(obj4);
    arr.push(obj5);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      setting_type: "facebook",
      setting: arr,
    };
    postRecord(APISavefacebookAuth, obj)
      .then((res) => {
        // console.log(res);
        if (res.data[0].response.status === "success") {
          setMessage("Authorized Successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveTwitterAuth = (data) => {
    var arr = [];
    const obj1 = {
      setting_name: "expires_in",
      setting_value: getDate(data.expires_in),
    };
    const obj2 = {
      setting_name: "id",
      setting_value: data.id,
    };
    const obj3 = {
      setting_name: "name",
      setting_value: data.name,
    };
    const obj4 = {
      setting_name: "user_name",
      setting_value: data.username,
    };
    const obj5 = {
      setting_name: "token",
      setting_value: data.access_token,
    };
    arr.push(obj1);
    arr.push(obj2);
    arr.push(obj3);
    arr.push(obj4);
    arr.push(obj5);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      setting_type: "twitter",
      setting: arr,
    };
    postRecord(APISavefacebookAuth, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Authorized Successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const savePinterestAuth = (data) => {
    var arr = [];
    const obj1 = {
      setting_name: "expires_in",
      setting_value: getDate(data.expires_in),
    };
    const obj4 = {
      setting_name: "user_name",
      setting_value: data.username,
    };
    const obj5 = {
      setting_name: "token",
      setting_value: data.access_token,
    };
    arr.push(obj1);
    arr.push(obj4);
    arr.push(obj5);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      setting_type: "pinterest",
      setting: arr,
    };
    postRecord(APISavefacebookAuth, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Authorized Successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveLinkedInAuth = (data) => {
    var arr = [];
    const obj1 = {
      setting_name: "expires_in",
      setting_value: getDate(data.expires_in),
    };
    const obj3 = {
      setting_name: "first_name",
      setting_value: data.localizedFirstName,
    };
    const obj4 = {
      setting_name: "last_name",
      setting_value: data.localizedLastName,
    };
    const obj5 = {
      setting_name: "token",
      setting_value: data.access_token,
    };
    arr.push(obj1);
    arr.push(obj3);
    arr.push(obj4);
    arr.push(obj5);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agentId: JSON.parse(context.state.user).agentId,
      setting_type: "linkedin",
      setting: arr,
    };
    postRecord(APISavefacebookAuth, obj)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage("Authorized Successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setSync(!sync);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
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
  function changeHover(e) {
    setHover(true);
  }
  const handleItemClick = (event) => {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll(".mainMenu .dropdown-item");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Remove 'active' class from all tab-pane elements
    const tabPanes = document.querySelectorAll(".innerMenu > .tab-pane");
    tabPanes.forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    // Add 'active' class to the clicked tab
    event.target.classList.add("active");

    // Manually activate the tab
    const targetTab = event.target.getAttribute("href").substring(1);
    const targetTabElement = document.getElementById(targetTab);

    const tabEvent = new CustomEvent("shown.bs.tab", {
      relatedTarget: targetTabElement,
    });
    targetTabElement.classList.add("active");
    targetTabElement.dispatchEvent(tabEvent);

    // Update the dropdown menu if needed
    // ...

    // Handle any additional logic
    // ...

    // Optionally, scroll to the tab content
    targetTabElement.scrollIntoView({ behavior: "smooth" });
  };
  const cropperRef = useRef(null);
  const onCrop = () => {
    // const cropper = cropperRef.current ? cropperRef.current.cropper : null;
    // if (cropper) {
    //   setImageData({
    //     ...imageData,
    //     agentphotouploadfile: cropper.getCroppedCanvas().toDataURL(),
    //   });
    // }
  };
  const saveCroppedImage = () => {
    const cropper = cropperRef.current ? cropperRef.current.cropper : null;
    if (cropper) {
      if (!croppingLogo)
        setImageData({
          ...imageData,
          agentphotouploadfile: cropper.getCroppedCanvas().toDataURL(),
        });
      else {
        setCustomLogo(cropper.getCroppedCanvas().toDataURL());
        setCompanyPictures({
          ...companyPictures,
          logoImageName: cropper.getCroppedCanvas().toDataURL(),
        });
      }
      setOpenImageCrop(false);
    }
  };

  return (
    <div>
      <Title title="Agent Setting" />
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
                    <li class="active">
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
      <section class="property_info toggle_sec" style={{ display: "block" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="our_partners_head">
                <h2>Settings Menu</h2>
              </div>
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
                  <ul class="navbar-nav mr-auto mainMenu">
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
                        <i class="fas fa-cog"></i> Settings Menu
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
                              id="profile"
                              data-toggle="tab"
                              href="#Images"
                              class="dropdown-item"
                              onClick={handleItemClick}
                            >
                              <i class="fas fa-user"></i> Agent Profile
                            </a>
                          </li>
                          <li>
                            <a
                              id="comp"
                              data-toggle="tab"
                              href="#Description"
                              class="dropdown-item"
                              onClick={handleItemClick}
                            >
                              <i class="fas fa-info-circle"></i> Company
                              Information{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              id="comp"
                              data-toggle="tab"
                              href="#Email"
                              class="dropdown-item"
                              onClick={handleItemClick}
                            >
                              <i class="fas fa-mail-bulk"></i> Default
                              Email/phone Options
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleItemClick}
                              data-toggle="tab"
                              href="#Preferences"
                            >
                              <i class="fab fa-angellist"></i> Preferences{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={handleItemClick}
                              data-toggle="tab"
                              href="#Video"
                            >
                              <i class="fas fa-video"></i> Video Options{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Tour"
                            >
                              <i class="fas fa-directions"></i> Tour Options{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Flyer"
                            >
                              <i class="fas fa-book-open"></i> Flyer Options{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Traffic"
                            >
                              <i class="fas fa-paste"></i> Traffic Reports{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Slide"
                            >
                              <i class="fab fa-slideshare"></i> Slide Show
                              Defaults{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Panorama"
                            >
                              <i class="fas fa-vr-cardboard"></i> Panorama
                              Defaults
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Theme"
                            >
                              <i class="fas fa-sliders-h"></i> Themes Defaults
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Bg_Music"
                            >
                              <i class="fas fa-music"></i> Background Music
                              Defaults
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Payments"
                            >
                              <i class="far fa-credit-card"></i> Payment
                              Profiles
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Social"
                            >
                              <i class="fa fa-angellist"></i> Setup Social
                              Networking
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Youtube"
                            >
                              <i class="fab fa-youtube"></i> Youtube Channel
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#News"
                            >
                              <i class="fas fa-envelope-open-text"></i> Add
                              Newsletter Form
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* Navigation Menu */}
              <div class="property_info_cont" id="demo">
                <section class="snap-scrolling-example">
                  {/*<div class="horizontal-images tab_main tabscroll-windows">
                    <OwlCarousel margin={10} {...options} id="home_slide1">
                      <div className="asdf">
                        <a
                          id="profile"
                          data-toggle="tab"
                          href="#Images"
                          role="tab1"
                          class={companyTab ? "nav-link" : "nav-link active"}
                        >
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                          Agent Profile
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          id="comp"
                          data-toggle="tab"
                          href="#Description"
                          role="tab1"
                          class={companyTab ? "nav-link active" : "nav-link"}
                        >
                          <span>
                            <i class="fas fa-info-circle"></i>
                          </span>
                          Company Information{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Email"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-mail-bulk"></i>
                          </span>
                          Default Email/phone Options
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Preferences"
                          role="tab1"
                        >
                          <span>
                            <i class="fab fa-angellist"></i>
                          </span>
                          Preferences{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Video"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-video"></i>
                          </span>
                          Video Options{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Tour"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-directions"></i>
                          </span>{" "}
                          Tour Options{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Flyer"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-book-open"></i>
                          </span>{" "}
                          Flyer Options{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Traffic"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-paste"></i>
                          </span>{" "}
                          Traffic Reports{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Slide"
                          role="tab1"
                        >
                          <span>
                            <i class="fab fa-slideshare"></i>
                          </span>{" "}
                          Slide Show Defaults{" "}
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Panorama"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-vr-cardboard"></i>
                          </span>{" "}
                          Panorama Defaults
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Theme"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-sliders-h"></i>
                          </span>{" "}
                          Themes Defaults
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Bg_Music"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-music"></i>
                          </span>
                          Background Music Defaults
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Payments"
                          role="tab1"
                        >
                          <span>
                            <i class="far fa-credit-card"></i>
                          </span>{" "}
                          Payment Profiles
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Social"
                          role="tab1"
                        >
                          <span>
                            <i class="fa fa-angellist"></i>
                          </span>
                          Setup Social Networking
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          href="#Youtube"
                          class="nav-link"
                          data-toggle="tab"
                          role="tab1"
                        >
                          <span>
                            <i class="fab fa-youtube"></i>
                          </span>{" "}
                          Youtube Channel
                        </a>
                      </div>
                      <div className="asdf">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#News"
                          role="tab1"
                        >
                          <span>
                            <i class="fas fa-envelope-open-text"></i>
                          </span>{" "}
                          Add Newsletter Form
                        </a>
                      </div>
                    </OwlCarousel>
                  </div>*/}
                  <div class="tab-content innerMenu">
                    <div
                      class={
                        companyTab
                          ? "browse_img tab-pane"
                          : "browse_img tab-pane active"
                      }
                      id="Images"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Agent Profile</h5>
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
                                <i class="fas fa-camera"></i>Upload Images
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#profiles"
                                role="tab"
                              >
                                <i class="far fa-address-card"></i>Personal
                                Information
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#messages"
                                role="tab"
                              >
                                <i class="far fa-images"></i>MyCafeGallery
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
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveImage();
                              }}
                            >
                              <div class="row uploadimage align-items-center">
                                <div class="col-md-2">
                                  {imageData.agentphotouploadfile === "" ? (
                                    // <img src={profile1} alt="" />
                                    <Skeleton
                                      width="180px"
                                      height="180px"
                                      borderRadius="50px"
                                    ></Skeleton>
                                  ) : (
                                    <img
                                      src={imageData.agentphotouploadfile}
                                      alt=""
                                    />
                                  )}
                                </div>
                                <div class="col-md-4">
                                  <div class="custom-file">
                                    <input
                                      type="file"
                                      class="custom-file-input"
                                      id="customFileInput"
                                      aria-describedby="customFileInput"
                                      onChange={forImage}
                                    />
                                    <label
                                      class="custom-file-label"
                                      for="customFileInput"
                                    >
                                      Select file
                                    </label>

                                    <hr class="spacer20px" />
                                    <button
                                      type="button"
                                      class="btn-style-two border-0"
                                      onClick={() => DeleteAgentProfileImage()}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="profiles" role="tabpanel">
                            <div class="personalinfo">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  updateUserProfile(profileData);
                                }}
                              >
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>License No.</label>
                                    <input
                                      type="text"
                                      name="licenceno"
                                      value={profileData.licenceno}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      First Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      name="fname"
                                      value={profileData.fname}
                                      onChange={handleInputChange}
                                      class="form-control"
                                      required="required"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Last Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      name="lname"
                                      value={profileData.lname}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      User Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      name="username"
                                      value={profileData.username}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Password{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type={
                                        profileData.showPassword
                                          ? "text"
                                          : "password"
                                      }
                                      name="password"
                                      value={profileData.password}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                    <IconButton
                                      className={classes.btn_pwd}
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {profileData.showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Confirm Password{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type={
                                        profileData.showPasswordOne
                                          ? "text"
                                          : "password"
                                      }
                                      name="confirm_pass"
                                      value={profileData.confirm_pass}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                    <IconButton
                                      className={classes.btn_pwd}
                                      onClick={handleClickShowPasswordOne}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {profileData.showPasswordOne ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Email{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={profileData.email}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>Mobile </label>
                                    <input
                                      type="text"
                                      name="mobile"
                                      value={profileData.mobile}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>Agent Profile </label>
                                    <textarea
                                      name="profile"
                                      value={profileData.profile}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    ></textarea>
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>Credentials </label>
                                    <textarea
                                      name="credentials"
                                      value={profileData.credentials}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    ></textarea>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>Facebook Link </label>
                                    <input
                                      type="text"
                                      name="facebooklink"
                                      value={profileData.facebooklink}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>Twitter Link </label>
                                    <input
                                      type="text"
                                      name="twitterlink"
                                      value={profileData.twitterlink}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>Linkedin Link </label>
                                    <input
                                      type="text"
                                      name="linkedinlink"
                                      value={profileData.linkedinlink}
                                      onChange={handleInputChange}
                                      class="form-control"
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>Others </label>
                                    <input
                                      type="text"
                                      name="yelplink"
                                      value={profileData.yelplink}
                                      onChange={handleInputChange}
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
                                      UPDATE
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div class="tab-pane" id="messages" role="tabpanel">
                            <div class="personalinfo">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  updateMycafe();
                                }}
                              >
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>Active Link</label>
                                    <br></br>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => handleClick()}
                                    >
                                      {"https://virtualtourcafe.com/my-cafe-gellary/" +
                                        mycafeData.mycafegallery}
                                    </a>
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>Inventory Button *</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      value={
                                        "<a href='https://virtualtourcafe.com/mycafegallery/" +
                                        mycafeData.mycafegallery +
                                        "' target='_blank'></a> "
                                      }
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="row align-items-center">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Link Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="mycafegallery"
                                      onChange={handlecafeChange}
                                      value={mycafeData.mycafegallery}
                                      required
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <button
                                      type="button"
                                      class=" btn-style-two dark mt-4"
                                    >
                                      {" "}
                                      view our VirtualTourCafe inventory
                                    </button>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <button
                                      type="submit"
                                      class="next_btn border-0"
                                    >
                                      UPDATE
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class={
                        companyTab
                          ? "browse_img tab-pane active"
                          : "browse_img tab-pane"
                      }
                      id="Description"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Company Information Setting</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#home2"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Upload Images
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#profile2"
                                role="tab"
                              >
                                <i class="fas fa-sliders-h"></i>Company
                                Information
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="home2"
                            role="tabpanel"
                          >
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveCompanyPictures();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <h6>Upload Company Logo</h6>
                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {customLogo === "" ? (
                                      <img
                                        src={defaultLogo}
                                        alt=""
                                        style={{
                                          marginBottom: "10px",
                                          height: "100px",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={customLogo}
                                        alt=""
                                        style={{
                                          marginBottom: "10px",
                                          height: "100px",
                                        }}
                                      />
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      handleImageChange(e);
                                    }}
                                  />
                                  <button
                                    onClick={() => removeLogo()}
                                    style={{
                                      border: "#ffa124",
                                      padding: "10px",
                                      float: "right",
                                      background: "#bbbbbb",
                                      color: "#000",
                                      marginBottom: "20px",
                                    }}
                                    type="button"
                                    class=""
                                  >
                                    Remove
                                  </button>
                                  <select
                                    value={logoimageid}
                                    onChange={handleLogoChange}
                                    class="form-control formbox1select"
                                  >
                                    <option value="0">Custom</option>
                                    {allLogo.map((res) => (
                                      <option value={res.id}>
                                        {res.cl_title}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div class="col-lg-6 col-md-6 formbox1">
                                  <h6>Offered Banners</h6>
                                  {offeredBannerImg === "" ? (
                                    <img
                                      src={defaultBanner}
                                      alt=""
                                      className="one"
                                      style={{
                                        marginBottom: "10px",
                                        width: "100%",
                                        height: "100px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={offeredBannerImg}
                                      alt=""
                                      style={{
                                        marginBottom: "40px",
                                        width: "100%",
                                        height: "80px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                  {/* {headerImageId==0?(offeredBannerImg==""):(<img src={defaultBanner} alt="" style={{ marginBottom: "10px" }} />):(<img src={defaultBanner} alt="" style={{ marginBottom: "10px" }} />):()} */}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerImageChange}
                                  />
                                  <button
                                    onClick={() => removeBanner()}
                                    style={{
                                      border: "#ffa124",
                                      padding: "10px",
                                      float: "right",
                                      background: "#bbbbbb",
                                      color: "#000",
                                      marginBottom: "10px",
                                    }}
                                    type="button"
                                    class=""
                                  >
                                    Remove
                                  </button>
                                  <select
                                    value={headerImageId}
                                    onChange={handleBannerChange}
                                    class="form-control formbox1select"
                                  >
                                    <option value="0">None</option>
                                    {allBanners.map((res) => (
                                      <option value={res.id}>
                                        {res.imagename}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {/* <div class="col-md-6">
                                                                    <ImageUploader
                                                                        withIcon={true}
                                                                        buttonText='Upload Company Banner '
                                                                        onChange={handleBannerChange}
                                                                        imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                                                                        maxFileSize={2097152}
                                                                        withPreview={true}
                                                                        ref={mediainputRef}
                                                                        label='Max file size: 2mb,accepted: jpg|png|gif'
                                                                    />
                                                                </div> */}
                              </div>
                              <hr class="spacer10px" />
                              <div class="row">
                                <div class="col-md-12">
                                  <button
                                    type="submit"
                                    class="next_btn border-0 mr-1"
                                  >
                                    Save
                                  </button>
                                  {/* <button type="button" class="next_btn grey border-0">Reset</button> */}
                                </div>
                              </div>
                            </form>

                            <hr class="spacer10px" />
                          </div>
                          <div class="tab-pane" id="profile2" role="tabpanel">
                            <div class="personalinfo">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  saveCompanyInfo();
                                }}
                              >
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      COMPANY{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="company"
                                      value={companyInfo.company}
                                    />
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
                                      value={companyInfo.countryid}
                                      onChange={handleCompanyInputChange}
                                      class="form-control formbox1select"
                                    >
                                      <option value="0">Select Country</option>
                                      {allCountries.map((res) => (
                                        <option value={res.id}>
                                          {res.name}
                                        </option>
                                      ))}
                                    </select>
                                    {/* <input type="text" class="form-control" onChange={handleCompanyInputChange} name="countryid" value={companyInfo.countryid} /> */}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      State{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <select
                                      name="stateid"
                                      value={companyInfo.stateid}
                                      onChange={handleCompanyInputChange}
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
                                    {/* <input type="text" class="form-control" onChange={handleCompanyInputChange} name="stateid" value={companyInfo.stateid} /> */}
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      City{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="city"
                                      value={companyInfo.city}
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Zip{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="zipcode"
                                      value={companyInfo.zipcode}
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Office Phone{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="officephone"
                                      value={companyInfo.officephone}
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Fax{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="fax"
                                      value={companyInfo.fax}
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Website{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="website"
                                      value={companyInfo.website}
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12 formbox1">
                                    <label>
                                      Address{" "}
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <textarea
                                      class="form-control"
                                      rows="6"
                                      onChange={handleCompanyInputChange}
                                      name="address"
                                      value={companyInfo.address}
                                    ></textarea>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <button
                                      type="submit"
                                      class="next_btn border-0"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Email" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Default Email/phone Options</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#email"
                                role="tab"
                              >
                                <i class="fas fa-camera"></i>Default Email
                                Options
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#phone"
                                role="tab"
                              >
                                <i class="far fa-address-card"></i>Default phone
                                Options
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="email"
                            role="tabpanel"
                          >
                            <h6 style={{ margin: "20px" }}>
                              Use below switches to show/hide your email address
                              on any of the services.
                            </h6>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveEmailOptions();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Tour Service
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleTourChange}
                                    checked={emailData.touremail}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Flyer Service
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleFlyerChange}
                                    checked={emailData.flyermail}
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
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Video Service
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleVideoChange}
                                    checked={emailData.videoemail}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    MyCafeGallery
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleMycafeChange}
                                    checked={emailData.mycafegalleryemail}
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
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="phone" role="tabpanel">
                            <h6 style={{ margin: "20px" }}>
                              Use below switches to show/hide your email address
                              on any of the services.
                            </h6>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePhoneOptions();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Phone
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handlePhoneChange}
                                    checked={phoneData.allowphone}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Office Phone
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleOfficePhoneChange}
                                    checked={phoneData.allowoffice}
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
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Fax Number
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleFaxChange}
                                    checked={phoneData.allowfax}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Cell Number
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handleCellChange}
                                    checked={phoneData.allowcell}
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
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Preferences"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Image Preferences</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#bright"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Preferences
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="bright"
                            role="tabpanel"
                          >
                            <div class="row">
                              <div
                                class="col-md-6"
                                style={{ marginTop: "20px" }}
                              >
                                <div class="row">
                                  <div class="col-lg-2 col-md-2">
                                    <label style={{ marginTop: "14px" }}>
                                      Blur
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Grayscale
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Brightness
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Contrast
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Huerotate
                                    </label>
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
                                <div class="row">
                                  <div class="col-lg-2 col-md-2">
                                    <label style={{ marginTop: "14px" }}>
                                      Invert
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Opacity
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Saturate
                                    </label>
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
                                    <label style={{ marginTop: "14px" }}>
                                      Sepia
                                    </label>
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
                              <div class="col-md-6">
                                <img
                                  id="imageone"
                                  src={house_img}
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
                                  }}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                updateEditImagePreference();
                              }}
                              class="next_btn border-0"
                            >
                              UPDATE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Video" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Video Options</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#vdo"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Video Options
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div class="tab-pane active" id="vdo" role="tabpanel">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveVideoOptions();
                              }}
                            >
                              <div class="row">
                                <h5 style={{ margin: "15px" }}>
                                  Use below options to show/hide your phone or
                                  price from the video that system compiles for
                                  your tours.
                                </h5>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use agent photo?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="videophonetouse"
                                  name="videophonetouse"
                                  value={videoData.videophonetouse}
                                  onChange={handleVideoInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Office"
                                  />
                                  <FormControlLabel
                                    value={2}
                                    control={<Radio color="primary" />}
                                    label="Mobile"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="None"
                                  />
                                </RadioGroup>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Show Price ?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <input
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    name="videoshowprice"
                                    checked={
                                      videoData.videoshowprice === 1
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Tour" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Tour Options</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#vdo"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Tour Options
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div class="tab-pane active" id="vdo" role="tabpanel">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveTourOptions();
                              }}
                            >
                              <div class="row">
                                <h5 style={{ margin: "20px" }}>
                                  Use below options to show/hide your Photo or
                                  company logo from the tours that system
                                  compiles for your tours.
                                </h5>
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Agent Photo to Use?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="use_agent_photo"
                                  name="use_agent_photo"
                                  value={tourData.use_agent_photo}
                                  onChange={handleTourInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Company Logo to Use?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="use_agent_photo"
                                  name="use_agent_company_photo"
                                  value={tourData.use_agent_company_photo}
                                  onChange={handleTourInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Show Lead Capture?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="use_agent_photo"
                                  name="showleadcapture"
                                  value={tourData.showleadcapture}
                                  onChange={handleTourInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Flyer" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Flyer Options</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#vdo"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Flyer Options
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div class="tab-pane active" id="vdo" role="tabpanel">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveFlyerOptions();
                              }}
                            >
                              <div class="row">
                                <h5 style={{ margin: "20px" }}>
                                  Use below options to show/hide your Photo or
                                  company logo from the flyers that system
                                  compiles for your tours.
                                </h5>
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use agent photo ?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="is_flyer_agent_photo"
                                  name="is_flyer_agent_photo"
                                  value={flyerData.is_flyer_agent_photo}
                                  onChange={handleFlyerInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Company Logo to Use?
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <RadioGroup
                                  row
                                  aria-label="is_flyer_agent_company_photo"
                                  name="is_flyer_agent_company_photo"
                                  value={flyerData.is_flyer_agent_company_photo}
                                  onChange={handleFlyerInputChange}
                                >
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary" />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Traffic"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Traffic Reports</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#vdo"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Traffic Reports
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div class="tab-pane active" id="vdo" role="tabpanel">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveTrafficOptions();
                              }}
                            >
                              <div class="row">
                                <h5 style={{ margin: "20px" }}>
                                  Email Recipients (comma seperated)
                                </h5>
                              </div>
                              <div class="row">
                                <h6 style={{ margin: "20px" }}>
                                  You could enter multiple email addresses
                                  separated by commas.
                                </h6>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    To:
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-6">
                                  <input
                                    type="text"
                                    onChange={handleTrafficInputChange}
                                    value={trafficData.reportrecipients}
                                    name="reportrecipients"
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <h5 style={{ margin: "20px" }}>Auto Forward</h5>
                              </div>
                              <div class="row">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Email report every week
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-6">
                                  <div class="switchToggle custom-control custom-switch">
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
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Slide" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Slide Show Settings</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#img"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Image Setting
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#slide"
                                role="tab"
                              >
                                <i class="fas fa-sliders-h"></i>Slide Setting
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#caption"
                                role="tab"
                              >
                                <i class="fas fa-palette"></i>Caption Setting
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div class="tab-pane active" id="img" role="tabpanel">
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveSliderImage();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-2">
                                  <div class="switchToggle custom-control custom-switch">
                                    <Switch
                                      onChange={handleKenBurnChange}
                                      checked={slideImageData.kenburnsservice}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Ken Burns Effects on Tour
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-2">
                                  <div class="switchToggle custom-control custom-switch">
                                    <Switch
                                      onChange={handlerandomChange}
                                      checked={slideImageData.randomcamera}
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
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    random Camera Setting
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="slide" role="tabpanel">
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveSlideShowdata();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    Duration
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <Slider
                                    min={0}
                                    max={10}
                                    value={slideShowData.transduration}
                                    onChange={handleSlideChange}
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    Speed
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <Slider
                                    min={0}
                                    max={10}
                                    value={slideShowData.transspeed}
                                    onChange={handleSlideSpeedChange}
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    TRANSITION
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <div class="filter_sec_single">
                                    <select
                                      name="transition"
                                      onChange={handleSlideTransChange}
                                      value={slideShowData.transition}
                                      class="form-control formbox1select"
                                    >
                                      <option value="">Select</option>
                                      <option value="1">Iris Circle</option>
                                      <option value="2">Iris Rectangle</option>
                                      <option value="4">
                                        Wipe Horizontal Left
                                      </option>
                                      <option value="5">
                                        Wipe Horizontal Right
                                      </option>
                                      <option value="6">
                                        Wipe Vertical Top
                                      </option>
                                      <option value="7">
                                        Wipe Vertical Bottom
                                      </option>
                                      <option value="8">
                                        Blinds Horizontal Left
                                      </option>
                                      <option value="9">
                                        Blinds Horizontal Right
                                      </option>
                                      <option value="10">
                                        Blinds Vertical Top
                                      </option>
                                      <option value="11">
                                        Blinds Vertical Bottom
                                      </option>
                                      <option value="12">
                                        Bars Horizontal Left
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="caption" role="tabpanel">
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveSlideCaption();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    FONT{" "}
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <div class="filter_sec_single">
                                    <select
                                      name="tourfontstyle"
                                      onChange={handleSlideCaptionInputChange}
                                      value={slideShowCaptionData.tourfontstyle}
                                      class="form-control formbox1select"
                                    >
                                      <option value="Arial">Arial</option>
                                      <option value="Times New Roman">
                                        Times New Roman
                                      </option>
                                      <option value="Verdana">Verdana</option>
                                      <option value="Tahoma">Tahoma</option>
                                      <option value="Georgia">Georgia</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <hr class="spacer10px"></hr>
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    FONT SIZE
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <div class="filter_sec_single">
                                    <select
                                      name="tourfontsize"
                                      onChange={handleSlideCaptionInputChange}
                                      value={slideShowCaptionData.tourfontsize}
                                      class="form-control formbox1select"
                                    >
                                      <option value="22">22</option>
                                      <option value="24">24</option>
                                      <option value="26">26</option>
                                      <option value="28">28</option>
                                      <option value="30">30</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <hr class="spacer10px"></hr>
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    VIDEO FONT SIZE
                                  </label>
                                </div>
                                <div class="col-lg-5 col-md-5">
                                  <div class="filter_sec_single">
                                    <select
                                      name="videofontsize"
                                      onChange={handleSlideCaptionInputChange}
                                      value={slideShowCaptionData.videofontsize}
                                      class="form-control formbox1select"
                                    >
                                      <option value="30">30</option>
                                      <option value="32">32</option>
                                      <option value="34">34</option>
                                      <option value="36">36</option>
                                      <option value="38">38</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Panorama"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Default Image Settings</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#pano"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Panorama
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#caption1"
                                role="tab"
                              >
                                <i class="fas fa-palette"></i>Caption
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="pano"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePanoramaImage();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    SPEED{" "}
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <Slider
                                    min={1}
                                    max={10}
                                    value={panoramaImageData.panospeed}
                                    onChange={handleSpeedChange}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <label style={{ marginTop: "14px" }}>
                                    Show Zoom Control{" "}
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <div class="switchToggle custom-control custom-switch">
                                    <Switch
                                      onChange={handleShowZoomChange}
                                      checked={panoramaImageData.isShowZoom}
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
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    HORIZONTAL LOOK{" "}
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <Slider
                                    min={0}
                                    max={100}
                                    value={panoramaImageData.hfov}
                                    onChange={handleHorizChange}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <label style={{ marginTop: "14px" }}>
                                    Keyboard Zoom{" "}
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <div class="switchToggle custom-control custom-switch">
                                    <Switch
                                      onChange={handleKeyboardZoomChange}
                                      checked={panoramaImageData.isKeyboardZoom}
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
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    VERTICAL LOOK{" "}
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <Slider
                                    min={0}
                                    max={100}
                                    value={panoramaImageData.vaov}
                                    onChange={handleVertiChange}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <label style={{ marginTop: "14px" }}>
                                    Mouse Zoom{" "}
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <div class="switchToggle custom-control custom-switch">
                                    <Switch
                                      onChange={handleMouseZoomChange}
                                      checked={panoramaImageData.IsMouseZoom}
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
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    ZOOM
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <Slider
                                    min={0}
                                    max={400}
                                    value={panoramaImageData.maxzoom}
                                    onChange={handleMaxZoomChange}
                                  />
                                </div>
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    Type
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <div class="filter_sec_single">
                                    <select
                                      onChange={handlepanoTypeChange}
                                      value={panoramaImageData.panotype}
                                      name="panotype"
                                      class="form-control formbox1select"
                                    >
                                      <option value="equirectangular">
                                        equirectangular
                                      </option>
                                      <option value="cubemap">cubemap</option>
                                      <option value="multires">multires</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="caption1" role="tabpanel">
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                savePanoramaCaption();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    Font
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <div class="filter_sec_single">
                                    <select
                                      value={panoramaCaptionData.panofontstyle}
                                      name="panofontstyle"
                                      onChange={handlepanoCaptionChange}
                                      class="form-control formbox1select"
                                    >
                                      <option value="Arial">Arial</option>
                                      <option value="Times New Roman">
                                        Times New Roman
                                      </option>
                                      <option value="Verdana">Verdana</option>
                                      <option value="Tahoma">Tahoma</option>
                                      <option value="Georgia">Georgia</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <hr class="spacer10px"></hr>
                              <div class="row">
                                <div class="col-lg-2 col-md-2">
                                  <label style={{ marginTop: "14px" }}>
                                    Font Size
                                  </label>
                                </div>
                                <div class="col-lg-4 col-md-4">
                                  <div class="filter_sec_single">
                                    <select
                                      value={panoramaCaptionData.panofontsize}
                                      name="panofontsize"
                                      onChange={handlepanoCaptionChange}
                                      class="form-control formbox1select"
                                    >
                                      <option value="22">22</option>
                                      <option value="24">24</option>
                                      <option value="26">26</option>
                                      <option value="28">28</option>
                                      <option value="30">30</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Theme" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>Themes Defaults</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#fly_theme"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Flyer Themes
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#tour_theme"
                                role="tab"
                              >
                                <i class="fas fa-sliders-h"></i>Tour Themes
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#pre_tour_theme"
                                role="tab"
                              >
                                <i class="fas fa-palette"></i>Premium Tour
                                Themes
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="fly_theme"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveFlyerTheme();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-6">
                                  <select
                                    onChange={handleFlyerThemeChange}
                                    value={flyerThemeData.flyertheme_pagename}
                                    id="selFlyer"
                                    name="flyertheme_pagename"
                                    class="form-control formbox1select"
                                    data-size="5"
                                  >
                                    <optgroup label="Oneside">
                                      <option
                                        selected="selected"
                                        value="flyer01"
                                      >
                                        flyer 01
                                      </option>
                                      <option value="flyer02">flyer 02</option>
                                      <option value="flyer03">flyer 03</option>
                                      <option value="flyer04">flyer 04</option>
                                    </optgroup>
                                    <optgroup label="Twoside">
                                      <option value="flyer05">flyer 05</option>
                                      <option value="flyer06">flyer 06</option>
                                      <option value="flyer07">flyer 07</option>
                                      <option value="flyer08">flyer 08</option>
                                    </optgroup>
                                  </select>
                                </div>
                                <div class="col-md-6">
                                  <select
                                    onChange={handleFlyerThemeChange}
                                    value={flyerThemeData.flyertheme}
                                    class="selectpicker form-control bs-select-hidden formbox1select"
                                    data-size="5"
                                    name="flyertheme"
                                    id="selTheme"
                                  >
                                    <option selected="" value="default-1">
                                      {" "}
                                      Default{" "}
                                    </option>
                                    <option value="coldwellbanker-5">
                                      {" "}
                                      Coldwell Banker{" "}
                                    </option>
                                    <option value="kellerwilliams-6">
                                      {" "}
                                      Keller Williams{" "}
                                    </option>
                                    <option value="remax-7"> REMAX </option>
                                    <option value="century21-4">
                                      {" "}
                                      Century 21{" "}
                                    </option>
                                    <option value="blackwhite-257">
                                      {" "}
                                      Black/White{" "}
                                    </option>
                                    <option value="blackgrey-258">
                                      {" "}
                                      Black/Gray{" "}
                                    </option>
                                    <option value="sotheby-130">
                                      {" "}
                                      Sotheby's{" "}
                                    </option>
                                    <option value="realtyworld-141">
                                      {" "}
                                      Realty World{" "}
                                    </option>
                                    <option value="berkshirehathaway-237">
                                      {" "}
                                      Berkshire Hathaway{" "}
                                    </option>
                                    <option value="betterhomesrealty-84">
                                      {" "}
                                      Better Homes and Gardens Real Estate{" "}
                                    </option>
                                    <option value="jrockcliffrealtors-75">
                                      {" "}
                                      J.Rockcliff Realtors and Realty ONE Group{" "}
                                    </option>
                                    <option value="exitrealty-3">
                                      {" "}
                                      EXIT Realty{" "}
                                    </option>
                                    <option value="helpusell-145">
                                      {" "}
                                      Help-U-Sell{" "}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div class="tab-pane" id="tour_theme" role="tabpanel">
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveFlyerTourTheme();
                              }}
                            >
                              <div class="pre_tour">
                                <div class="row">
                                  {Object.keys(allThemes).length > 0 &&
                                    allThemes.datathemeArray.map((res) => (
                                      <div
                                        style={{ marginBottom: "30px" }}
                                        class="col-lg-3 col-md-3"
                                      >
                                        <div class="pre_tour_single">
                                          <label class="container_new">
                                            <img src={res.url} />
                                            <input
                                              type="radio"
                                              onChange={handleTourThemeChange}
                                              value={res.themeId}
                                              name="tourtheme"
                                              checked={
                                                flyerTourThemeData.tourtheme ===
                                                res.themeId
                                                  ? true
                                                  : false
                                              }
                                            />
                                            <span class="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                          <div
                            class="tab-pane"
                            id="pre_tour_theme"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveFlyerPremiumTourTheme();
                              }}
                            >
                              <div class="pre_tour">
                                <div class="col-md-3 formbox1">
                                  <label style={{ marginRight: "35px" }}>
                                    Use Premium Theme
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                </div>
                                <div class="col-md-3 formbox1">
                                  <Switch
                                    onChange={handlePremiumThemeInputChange}
                                    checked={
                                      flyerPremiumThemeData.is_premium_tour_theme
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
                                <div class="row">
                                  {Object.keys(allThemes).length > 0 &&
                                    allThemes.premiumArry.map((res) => (
                                      <div class="col-lg-3 col-md-3">
                                        <div class="pre_tour_single">
                                          <label class="container_new">
                                            <img src={res.imageurl} />
                                            <input
                                              type="radio"
                                              onChange={
                                                handlePremiumThemeChange
                                              }
                                              name="premium_tour_theme"
                                              value={res.key}
                                              checked={
                                                flyerPremiumThemeData.premium_tour_theme ===
                                                res.key
                                                  ? true
                                                  : false
                                              }
                                            />
                                            <span class="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                    ))}
                                  {/* <div class="col-lg-3 col-md-3">
                                                                        <div class="pre_tour_single">
                                                                            <label class="container_new"><img src={thumbpics1} />
                                                                                <input type="radio" onChange={handlePremiumThemeChange} name="premium_tour_theme" value="1" checked={flyerPremiumThemeData.premium_tour_theme === 1 ? true : false} />
                                                                                <span class="checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3">
                                                                        <div class="pre_tour_single">
                                                                            <label class="container_new"><img src={thumbpics2} />
                                                                                <input type="radio" onChange={handlePremiumThemeChange} value="2" checked={flyerPremiumThemeData.premium_tour_theme === 2 ? true : false} name="premium_tour_theme" />
                                                                                <span class="checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3">
                                                                        <div class="pre_tour_single">
                                                                            <label class="container_new"><img src={thumbpics3} />
                                                                                <input type="radio" onChange={handlePremiumThemeChange} value="3" checked={flyerPremiumThemeData.premium_tour_theme === 3 ? true : false} name="premium_tour_theme" />
                                                                                <span class="checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3">
                                                                        <div class="pre_tour_single">
                                                                            <label class="container_new"><img src={thumbpics4} />
                                                                                <input type="radio" onChange={handlePremiumThemeChange} name="premium_tour_theme" value="4" checked={flyerPremiumThemeData.premium_tour_theme === 4 ? true : false} />
                                                                                <span class="checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div> */}
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Bg_Music"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Music</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="user"
                            role="tabpanel"
                          >
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveMusicData();
                              }}
                            >
                              <div class="row">
                                <div
                                  class="col-md-6"
                                  style={{
                                    height: "500px",
                                    overflowX: "scroll",
                                  }}
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
                                      <label
                                        style={{ marginLeft: "20px" }}
                                        for="m0"
                                      >
                                        {" "}
                                        None{" "}
                                      </label>{" "}
                                    </li>
                                    {musicData && musicData.all_music
                                      ? musicData.all_music.map((res) => (
                                          <li style={{ margin: "10px" }}>
                                            <input
                                              type="radio"
                                              onClick={() =>
                                                handleMusicChange(res)
                                              }
                                              name="mus"
                                              value="Above_and_Beyond_full_mix"
                                              checked={
                                                musicData.musicid ===
                                                res.musicid
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
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Payments"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Payment Profiles</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#user"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>User Details
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="user"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>First Name</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="fname"
                                      value={paymentData.fname}
                                      onChange={handlePaymentInputChange}
                                      placeholder="First Name"
                                    />
                                    <span class="agent_icn">
                                      <i class="fa fa-user"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Last Name</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="lname"
                                      value={paymentData.lname}
                                      placeholder="Last Name"
                                      onChange={handlePaymentInputChange}
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
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Email</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="email"
                                      value={paymentData.email}
                                      placeholder="Email"
                                      onChange={handlePaymentEmailChange}
                                    />
                                    <span class="agent_icn">
                                      <i class="fa fa-user"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Phone</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="officephone"
                                      value={paymentData.officephone}
                                      placeholder="Phone"
                                      onChange={handlePaymentPhoneChange}
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
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Country</label>
                                  <div class="align_center">
                                    <select
                                      name="countryid"
                                      value={paymentData.countryid}
                                      onChange={handlePaymentInputChange}
                                      class="form-control formbox1select"
                                    >
                                      <option value="0">Select Country</option>
                                      {allCountries.map((res) => (
                                        <option value={res.id}>
                                          {res.name}
                                        </option>
                                      ))}
                                    </select>
                                    <span class="agent_icn">
                                      <i class="fa fa-globe"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>State</label>
                                  <div class="align_center">
                                    <select
                                      name="stateid"
                                      value={paymentData.stateid}
                                      onChange={handlePaymentInputChange}
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
                                    <span class="agent_icn">
                                      <i class="fa fa-globe"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>City</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="city"
                                      value={paymentData.city}
                                      placeholder="City"
                                      onChange={handlePaymentInputChange}
                                    />
                                    <span class="agent_icn">
                                      <i class="fa fa-user"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Zip</label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="zipcode"
                                      value={paymentData.zipcode}
                                      placeholder="Zip"
                                      onChange={handlePaymentPhoneChange}
                                    />
                                    <span class="agent_icn">
                                      <i class="fa fa-user"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>address</label>
                                  <textarea
                                    onChange={handlePaymentInputChange}
                                    type="text"
                                    name="address"
                                    value={paymentData.address}
                                    class="form-control"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="browse_img_head">
                              <h5>Credit Card Information</h5>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>Credit Card Profiles</label>
                                  <div class="align_center">
                                    <select
                                      name="countryid"
                                      // value={paymentData.countryid}
                                      // onChange={handleInputChange}
                                    >
                                      <option value="0">default</option>
                                    </select>
                                    <span class="agent_icn">
                                      <i class="fa fa-globe"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>
                                    Card Number
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="cc_no"
                                      value={paymentData.cc_no}
                                      placeholder="Card Number"
                                      onChange={handlePaymentCardNoChange}
                                      maxLength="22"
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
                                <div class="agent_sign_up_single payment-setting">
                                  <label>
                                    CVV
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <div class="align_center">
                                    <input
                                      type="text"
                                      name="cvv"
                                      value={paymentData.cvv}
                                      placeholder="Card Verification Number"
                                      onChange={handlePaymentPhoneChange}
                                      maxLength="3"
                                    />
                                    <span class="agent_icn">
                                      <i class="fa fa-user"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single payment-setting">
                                  <label>
                                    Expiration Date
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <div class="align_center">
                                    <select
                                      name="cc_month"
                                      value={paymentData.cc_month}
                                      style={{ marginRight: "10px" }}
                                      onChange={handlePaymentEmailChange}
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

                                    {/* <select>
                                                                            <option>Select Year</option>
                                                                        </select> */}
                                    <select
                                      name="cc_year"
                                      value={paymentData.cc_year}
                                      id="Agents_cc_year"
                                      class="form-control"
                                      onChange={handlePaymentEmailChange}
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
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-6 col-md-6">
                                <div class="agent_sign_up_single">
                                  <ReCAPTCHA
                                    sitekey="6LfHSiwgAAAAAAHtot668mAzqqmXqcre4wXdHbf-"
                                    onChange={onChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => savePaymentDetails()}
                              type="button"
                              class="next_btn border-0"
                            >
                              UPDATE
                            </button>
                          </div>
                          <div class="tab-pane" id="caption1" role="tabpanel">
                            <hr></hr>
                            <div class="row">
                              <div class="col-lg-2 col-md-2">
                                <label style={{ marginTop: "14px" }}>
                                  Font{" "}
                                </label>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="filter_sec_single">
                                  <select class="form-control formbox1select">
                                    <option>Arial</option>
                                    <option>Times New Roman</option>
                                    <option>Verdana</option>
                                    <option>Tahoma</option>
                                    <option>Georgia</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <hr class="spacer10px"></hr>
                            <div class="row">
                              <div class="col-lg-2 col-md-2">
                                <label style={{ marginTop: "14px" }}>
                                  Font Size
                                </label>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="filter_sec_single">
                                  <select class="form-control formbox1select">
                                    <option>22</option>
                                    <option>24</option>
                                    <option>26</option>
                                    <option>28</option>
                                    <option>30</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <button type="button" class="next_btn border-0">
                              UPDATE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="browse_img tab-pane"
                      id="Social"
                      role="tabpanel"
                    >
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#social"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Setup Social
                                Networking
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="social"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <h5>Authorization</h5>
                            <div class="row">
                              <div
                                class="col-lg-12 col-md-12"
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {/* <FacebookAuth
                                                                    appId="<app-id>"
                                                                    callback={authenticate}
                                                                    component={MyFacebookButton}
                                                                /> */}
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => {
                                        setFacebookAuth(true);
                                        setYoutubeAuth(false);
                                        setTwitterAuth(false);
                                        setOpenAuthModal(true);
                                        setLinkedInAuth(false);
                                      }}
                                    >
                                      <i class="fab fa-facebook-f"></i>
                                    </a>
                                  </li>
                                  {/* <li>
                                                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                                                    </li> */}
                                  <li>
                                    <a
                                      onClick={() => {
                                        setYoutubeAuth(true);
                                        setTwitterAuth(false);
                                        setFacebookAuth(false);
                                        setOpenAuthModal(true);
                                        setLinkedInAuth(false);
                                      }}
                                    >
                                      <i class="fab fa-pinterest"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        setTwitterAuth(true);
                                        setFacebookAuth(false);
                                        setYoutubeAuth(false);
                                        setOpenAuthModal(true);
                                        setLinkedInAuth(false);
                                      }}
                                    >
                                      <i class="fab fa-twitter"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        setLinkedInAuth(true);
                                        setFacebookAuth(false);
                                        setYoutubeAuth(false);
                                        setOpenAuthModal(true);
                                        setTwitterAuth(false);
                                      }}
                                    >
                                      <i class="fab fa-linkedin"></i>
                                    </a>
                                  </li>
                                  {/* {Object.keys(iconData).length > 0 ? (
                                                                        iconData.data.map(res => (
                                                                            <li>
                                                                                <a href={res.link} >
                                                                                    <i class={res.class}></i>
                                                                                </a>
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <Skeleton width="80px" height="80px"></Skeleton>
                                                                    )} */}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="browse_img tab-pane" id="Youtube" role="tabpanel">
                                            <div class="browse_img_head">
                                                <h5>Youtube Channel Information</h5>
                                            </div>
                                            <div class="property_info_cont" id="demo">
                                                <section id="examples" class="snap-scrolling-example">
                                                    <div id="content-1" class="content horizontal-images tab_main">
                                                        <ul class="nav nav-tabs list_sec" role="tablist1">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" data-toggle="tab" href="#Images" role="tab">
                                                                    <span><i class="fa fa-link" aria-hidden="true"></i></span>
                                                                    Authorize youtube channel
                                                                </a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link " data-toggle="tab" href="#Images" role="tab">
                                                                    <span><i class="fa fa-link" aria-hidden="true"></i></span>
                                                                    Remove Authorization
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </section>
                                            </div>
                                            <div class="tab-content" id="">
                                                <div class="tab-pane active" id="home2" role="tabpanel">
                                                    <div class="col-lg-12 col-md-12">

                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                    <div
                      class="browse_img tab-pane"
                      id="Youtube"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Youtube Channel Information</h5>
                      </div>
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#youtubechannel"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Authorize Youtube
                                Channel
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#Removeyoutubechannel"
                                role="tab"
                              >
                                <i class="fas fa-sliders-h"></i>Remove Authorize
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="youtubechannel"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <div class="row">
                              {Object.keys(youtubeAccessToken).length > 0 ? (
                                <div
                                  class="alert alert-primary"
                                  role="alert"
                                  style={{
                                    textAlign: "center",
                                    margin: "0 auto",
                                  }}
                                >
                                  You have already Authorized
                                  {/* <h6>AuthToken Expiration : {youtubeAccessToken.expires_in}</h6> */}
                                </div>
                              ) : (
                                <div class="col-lg-12 col-md-12">
                                  <p
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                    }}
                                  >
                                    Authorization Required
                                    <br />
                                    If you have your own YouTube Channel, we
                                    need your authorization to proceed.
                                    <br />
                                    Click
                                    <span style={{ color: "#ffa12d" }}>
                                      {/* <a onClick={handleAuth} href="javascript:void()" style={{ color: "#ffa12d" }}> here </a> */}
                                    </span>{" "}
                                    here to begin authorization.
                                    <br />
                                    <OAuth2Login
                                      scope="https://www.googleapis.com/auth/youtube.readonly"
                                      authorizationUrl="https://accounts.google.com/o/oauth2/v2/auth"
                                      responseType="token"
                                      clientId="135052239263-v0kkieg2gevagsvggksaih17e95e5vgc.apps.googleusercontent.com"
                                      redirectUri="https://virtualtourcafe.com/agent-setting"
                                      onSuccess={onSuccess}
                                      onFailure={onFailure}
                                    />
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            class="tab-pane"
                            id="Removeyoutubechannel"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                {Object.keys(youtubeAccessToken).length > 0 ? (
                                  <div
                                    class="alert alert-primary"
                                    role="alert"
                                    style={{ textAlign: "center" }}
                                  >
                                    <button
                                      class="btn btn-primary"
                                      onClick={() => {
                                        removeYoutubeAuth();
                                      }}
                                    >
                                      Remove Authorization
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    class="alert alert-primary"
                                    role="alert"
                                    style={{ textAlign: "center" }}
                                  >
                                    No Autorization Found to remove
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="News" role="tabpanel">
                      <div class="browse_img_conts_main">
                        <div class="browse_img_conts">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#social"
                                role="tab"
                              >
                                <i class="fas fa-sun"></i>Newsletter Form
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content" id="">
                          <div
                            class="tab-pane active"
                            id="social"
                            role="tabpanel"
                          >
                            <hr></hr>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveNewsLetterData();
                              }}
                            >
                              <div class="row">
                                <div class="col-lg-12 col-md-12">
                                  <div class="agent_sign_up_single">
                                    <label>
                                      Form{" "}
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <textarea
                                      onChange={handleNewsChange}
                                      name="formcode"
                                      value={newsLetterData.formcode}
                                      class="form-control"
                                      rows="6"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAuthModal}
      >
        <DialogTitle id="customized-dialog-title">
          Authorization
          <CancelIcon
            onClick={() => setOpenAuthModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div class="row">
              {facebookAuth ? (
                <React.Fragment>
                  <h4>Facebook</h4>
                  <hr class="spacer20px" />
                  {Object.keys(facebookAccessToken).length > 0 ? (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>
                        Name:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {facebookAccessToken.name}
                        </span>{" "}
                      </h6>
                      <h6>
                        AuthToken Expiration:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {facebookAccessToken.expires_at}
                        </span>{" "}
                      </h6>
                      <p>If You Want Authorization again, then</p>
                      <LoginSocialFacebook
                        appId="1016898119220556"
                        fieldsProfile={
                          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                        }
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        redirect_uri="https://virtualtourcafe.com/agent-setting"
                        onResolve={({ provider, data }) => {
                          saveFacebookAuth(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <FacebookLoginButton />
                      </LoginSocialFacebook>
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>Name: NA</h6>
                      <h6>AuthToken Expiration: NA</h6>
                      <p>If You Want Authorization, then</p>
                      <LoginSocialFacebook
                        appId="1016898119220556"
                        fieldsProfile={
                          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                        }
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        redirect_uri="https://virtualtourcafe.com/agent-setting"
                        onResolve={({ provider, data }) => {
                          // console.log(provider);
                          // console.log(data);
                          saveFacebookAuth(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <FacebookLoginButton />
                      </LoginSocialFacebook>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
              {twitterAuth ? (
                <React.Fragment>
                  <h4>Twitter</h4>
                  <hr class="spacer20px" />
                  {Object.keys(twitterAccessToken).length > 0 ? (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>
                        Name:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {twitterAccessToken.name}
                        </span>{" "}
                      </h6>
                      <h6>
                        User Name:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {" "}
                          {twitterAccessToken.user_name}
                        </span>
                      </h6>
                      <h6>
                        AuthToken Expiration:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {dateFormat(
                            twitterAccessToken.expires_in,
                            "dd-mm-yyyy hh:mm:ss"
                          )}
                        </span>{" "}
                      </h6>
                      <p>If You Want Authorization again, then</p>
                      <LoginSocialTwitter
                        requestTokenUrl="https://api.twitter.com/oauth/request_token"
                        accessTokenUrl="https://api.twitter.com/oauth/access_token"
                        state="state"
                        scope="users.read%20tweet.read"
                        // consumerKey="AhFT04OvhE78hao2Mcz7LeABo"
                        // consumerSecret="bU9rudxgoIREyTto1jmecH6eZ9onN7oRmYhwu14kf1G1ewABZW"
                        // scope="tweet.read"
                        // responseType="code"
                        fieldsProfile={
                          "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"
                        }
                        client_id="ZjMyMGt6cEptbGk1aDllSXNlUVE6MTpjaQ"
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        onResolve={({ provider, data }) => {
                          console.log(provider);
                          console.log(data);
                          saveTwitterAuth(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <TwitterLoginButton />
                      </LoginSocialTwitter>
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>Screen Name: NA</h6>
                      <h6>AuthToken Expiration: NA</h6>
                      <p>If You Want Authorization, then</p>

                      <LoginSocialTwitter
                        requestTokenUrl="https://api.twitter.com/oauth/request_token"
                        accessTokenUrl="https://api.twitter.com/oauth/access_token"
                        consumerKey="AhFT04OvhE78hao2Mcz7LeABo"
                        consumerSecret="bU9rudxgoIREyTto1jmecH6eZ9onN7oRmYhwu14kf1G1ewABZW"
                        // scope="tweet.read"
                        // responseType="code"
                        fieldsProfile={
                          "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"
                        }
                        client_id="ZjMyMGt6cEptbGk1aDllSXNlUVE6MTpjaQ"
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        onResolve={({ provider, data }) => {
                          saveTwitterAuth(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <TwitterLoginButton />
                      </LoginSocialTwitter>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
              {youtubeAuth ? (
                <React.Fragment>
                  <h4>Pintrest</h4>
                  <hr class="spacer20px" />
                  {Object.keys(pinterestAccessToken).length > 0 ? (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>
                        Name:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {" "}
                          {pinterestAccessToken.user_name}
                        </span>
                      </h6>
                      <h6>
                        AuthToken Expiration:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {dateFormat(
                            pinterestAccessToken.expires_in,
                            "dd-mm-yyyy hh:mm:ss"
                          )}
                        </span>{" "}
                      </h6>
                      <p>If You Want Authorization again, then</p>
                      <LoginSocialPinterest
                        client_id="1480095"
                        client_secret="6b6d21353584f0c394de6f5cbfc385ef42cedc0d"
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                          savePinterestAuth(data);
                          // console.log(provider)
                          // console.log(data)
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                        className="pinterest-btn"
                      >
                        <div className="content">
                          <div style={{ float: "left", marginRight: "12px" }}>
                            <PinterestLogo />
                          </div>
                          <span className="txt">Login With Pinterest</span>
                        </div>
                      </LoginSocialPinterest>
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>Name: NA</h6>
                      <h6>AuthToken Expiration: NA</h6>
                      <p>If You Want Authorization, then</p>
                      <LoginSocialPinterest
                        client_id="1480095"
                        client_secret="6b6d21353584f0c394de6f5cbfc385ef42cedc0d"
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                          console.log(provider);
                          console.log(data);
                          savePinterestAuth(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                        className="pinterest-btn"
                      >
                        <div className="content">
                          <div style={{ float: "left", marginRight: "12px" }}>
                            <PinterestLogo />
                          </div>
                          <span className="txt">Login With Pinterest</span>
                        </div>
                      </LoginSocialPinterest>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
              {linkedinAuth ? (
                <React.Fragment>
                  <h4>Linkedin</h4>
                  <hr class="spacer20px" />
                  {Object.keys(linkedinAccessToken).length > 0 ? (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>
                        Name:{" "}
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {linkedinAccessToken.first_name +
                            " " +
                            linkedinAccessToken.last_name}
                        </span>
                      </h6>
                      <h6>
                        AuthToken Expiration:
                        <span style={{ color: "#0013c9", fontWeight: "700" }}>
                          {dateFormat(
                            linkedinAccessToken.expires_in,
                            "dd-mm-yyyy"
                          )}
                        </span>{" "}
                      </h6>
                      <p>If You Want Authorization again, then</p>
                      <LoginSocialLinkedin
                        scope="r_liteprofile"
                        client_id="86jz45e8r1kwqk"
                        client_secret="baD7OnjjwnpioFAU"
                        fieldsProfile={
                          "id,profilePicture(displayImage~digitalmediaAsset:playableStreams),localizedLastName, firstName,lastName,localizedFirstName"
                        }
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                          // console.log(data)
                          saveLinkedInAuth(data);
                          console.log(provider);
                          console.log(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                        className="pinterest-btn"
                      >
                        <LinkedInLoginButton />
                      </LoginSocialLinkedin>
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "dashed 2px #D9D9D9",
                        padding: "40px",
                        width: "100%",
                      }}
                    >
                      <h6>Name: NA</h6>
                      <h6>AuthToken Expiration: NA</h6>
                      <p>If You Want Authorization, then</p>
                      <LoginSocialLinkedin
                        scope="r_liteprofile"
                        client_id="86jz45e8r1kwqk"
                        client_secret="baD7OnjjwnpioFAU"
                        // responseType="code"
                        fieldsProfile={
                          "id,profilePicture(displayImage~digitalmediaAsset:playableStreams),localizedLastName, firstName,lastName,localizedFirstName"
                        }
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                          console.log(data);
                          saveLinkedInAuth(data);
                          console.log(provider);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                        className="pinterest-btn"
                      >
                        <LinkedInLoginButton />
                      </LoginSocialLinkedin>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openImageCrop}
      >
        <DialogTitle id="customized-dialog-title">
          Image Crop
          <CancelIcon
            onClick={() => setOpenImageCrop(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            zoomable={false}
          />
          <button className="next_btn" onClick={saveCroppedImage}>
            Save
          </button>
        </DialogContent>
      </Dialog>
      <Footer />
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
