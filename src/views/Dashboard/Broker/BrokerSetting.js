import React, { useState, useEffect, useContext, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Backdrop from "@material-ui/core/Backdrop";
import Captcha from "react-numeric-captcha";
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
import AlainPinelRealtors from "../../../ThemeImages/Alain Pinel Realtors.jpg";
import BetterHomesRealty from "../../../ThemeImages/BetterHomeRealty.jpg";
import CornishCareyCommercial from "../../../ThemeImages/BetterHomeRealty.jpg";
import RemaxCollections from "../../../ThemeImages/Remax_Collections.jpg";
import Weichert from "../../../ThemeImages/Wechart.jpg";
import EXIT from "../../../ThemeImages/EXIT.jpg";
import EarlGrey from "../../../ThemeImages/Earl Grey.jpg";
import RockcliffRealtors from "../../../ThemeImages/J. Rockcliff Realtors.jpg";
import InteroRealEstateServices from "../../../ThemeImages/Intero Real Estate Services.jpg";
import LifesaBeach from "../../../ThemeImages/Life's a Beach.jpg";
import Sotheby from "../../../ThemeImages/Sotheby.jpg";
import F1rstTeam from "../../../ThemeImages/F1rstTeam.jpg";
import LongFoster from "../../../ThemeImages/Long&Foster.jpg";
import BlueLagoon from "../../../ThemeImages/Blue Lagoon.jpg";
import RealtyWorld from "../../../ThemeImages/RealtyWorld.jpg";
import RealtyExecutives from "../../../ThemeImages/RealtyExecutives.jpg";
import LegacyRealEstate from "../../../ThemeImages/LegacyRealEstate.jpg";
import HomeLife from "../../../ThemeImages/HomeLife.jpg";
import HelpUSell from "../../../ThemeImages/HelpUSell.jpg";
import ColdwellPreview from "../../../ThemeImages/ColdwellPreview.jpg";
import DistinctiveCollection from "../../../ThemeImages/Dist.jpg";
import BerkshireHathaway from "../../../ThemeImages/BerkshireHathaway.jpg";
import ERA from "../../../ThemeImages/ERA.jpg";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import BrokerHeader from "../Header/BrokerHeader";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { Button } from "@material-ui/core";
import Title from "../../../CommonMethods/Title";
const APIGetUserData = APIURL() + "user-details";
const APISaveCompanyInfo = APIURL() + "save-Company-Info";
const APIGetCountryList = APIURL() + "get-CountryList";
const APIGetStateList = APIURL() + "get-StateList";
const APISaveAccountInfo = APIURL() + "save-Account-Info";
const APISaveContactInfo = APIURL() + "save-Contact-Info";
const APIGetBrokerProfileInfo = APIURL() + "get-BrokerProfileDetails";
const APIGetOfferedBanners = APIURL() + "get-flyerheader-brokerdetails";
// const APIDeleteTourImage = APIURL() + "delete-tour-imageBroker";
const APIDeleteTourImage = APIURL() + "broker-deleteImage";
const APISaveCompanyBanner = APIURL() + "save-company-banner-broker";
const APISaveBrokerSettingLink = APIURL() + "broker-setting-link";
const APIGetBrokerSettingLink = APIURL() + "get-broker-setting-link";
const APIGetBrokerYoutubeSetting = APIURL() + "youtube-Setting";
const APIGetTourWidget = APIURL() + "get-Tour-Widget";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APIChangebanner = APIURL() + "change-banner";
const APIUpdateBrokerTheme = APIURL() + "Update-broker-Themes";
const APIGetBrokerTheme = APIURL() + "get-broker-Themes";
const APIPaymentProfile = APIURL() + "payment-Profile-Broker";
const APIGetPaymentProfile = APIURL() + "broker-GetPayment-ProfileDtls";
const APIBrokerBannerChange = APIURL() + "broker-changeBanner";
const APIGetUpdateCompanyLogo = APIURL() + "update-companylogo";
const APIGetCompanyLogos = APIURL() + "get-companylogotitle";
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
export default function BrokerSetting(props) {
  const [inputErrors, setinputErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    company: "",
    country: "",
    state: "",
    fname_error: "",
    lname_error: "",
    username_error: "",
    password_error: "",
  });
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const tour_id = props.match.params.tourid;
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

  const context = useContext(AuthContext);
  const classes = useStyles();
  const mediainputRef = useRef();
  const { dispatch } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [companyInfoData, setCompanyInfoData] = useState({});
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [sync, setSync] = useState(true);
  const [open, setOpen] = useState(false);
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allThemes, setAllThemes] = useState({});
  const [flyerThemeData, setFlyerThemeData] = useState(initialFlyerThemeState);
  const [flyerTourThemeData, setFlyerTourThemeData] = useState(
    initialFlyerTourThemeState
  );
  const [flyerPremiumThemeData, setFlyerPremiumThemeData] = useState(
    initialFlyerPremiumThemeState
  );
  const [openCompanyBanner, setOpenCompanyBanner] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [allBanners, setAllBanners] = useState([]);
  const [defaultBanner, setDefaultBanner] = useState("");
  const [headerImageId, setHeaderImageId] = useState("");
  const [customBannerImg, setCustomBannerImg] = useState("");

  const [offeredBannerImg, setOfferedBannerImg] = useState("");
  const [linkedData, setLinkedData] = useState({});
  const [link, setLink] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [logoimageid, setLogoImageId] = useState("");
  const [allLogo, setAllLogo] = useState([]);
  const [defaultLogo, setDefaultlogo] = useState("");
  const [customLogo, setCustomLogo] = useState("");
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [hover, setHover] = useState(false);
  const [user, setUser] = useState({
    username: "",
  });
  const [captcha, setCaptcha] = useState("");
  const [paymentProfile, setPaymentProfile] = useState({});
  const characters = "abc123";
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
    generateString(6);
  }, []);
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCaptcha(result);
    //return result;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCountryList, objusr).then((res) => {
      //console.log(res)
      if (res.data[0].response.status === "success") {
        setAllCountry(res.data[0].response.dataDetails.dataProvider);
        //console.log(res.data[0].response.dataDetails.dataProvider[0])
      }
    });
  }, [context.state.user]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetStateList, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllState(res.data[0].response.dataDetails.dataProvider);
      }
    });
  }, [context.state.user]);

  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        broker_id: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerProfileInfo, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCompanyInfoData(res.data[0].response.data.broker_details);
        }
      });
    }
  }, [sync, context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
        tourid: tour_id,
      };
      postRecord(APIGetCompanyLogos, obj).then((res) => {
        console.log(res.data[0].response);
        if (res.data[0].response.status === "success") {
          setAllLogo(res.data[0].response.data);
          setDefaultlogo(res.data[0].response.companylogo);
          setLogoImageId(res.data[0].response.logoimageid);
          setCustomLogo("");
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  console.log('====================================');
  console.log(offeredBannerImg);
  console.log('====================================');
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerId: JSON.parse(context.state.user).user_id,
        tourid: tour_id,
      };
      postRecord(APIGetOfferedBanners, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllBanners(res.data[0].response.flyerdetails);
          setDefaultBanner(res.data[0].response.bannerimg);
          setHeaderImageId(res.data[0].response.headerimageid);
          // setCustomBannerImg(res.data[0].response.bannerimg);
          // setOfferedBannerImg("");
          setOfferedBannerImg(res.data[0].response.bannerimg);
          setCustomBannerImg(res.data[0].response.logoimg);
        }
      });
    }
  }, [context.state.user, sync, tour_id]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerId: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerSettingLink, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setLinkedData(res.data[0].response);
          setLink(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetTourWidget, obj).then((res) => {
        if (res.data[0].response.status === "success") {
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (headerImageId !== "0") {
      var filter_data = allBanners.filter((res) => {
        return res.id == headerImageId;
      });
      if (filter_data.length > 0) {
        setOfferedBannerImg(filter_data[0].url);
      } else {
        setOfferedBannerImg("");
      }
    }
  }, [headerImageId, allBanners]);
  useEffect(() => {
    if (Object.keys(companyInfoData).length > 0) {
      companyInfoData.cnfpassword = companyInfoData.password;
    }
  }, [companyInfoData]);

  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerId: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerTheme, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setFlyerTourThemeData(res.data[0].response.tour_theme);
        }
      });
    }
  }, [context.state.user, sync]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetPaymentProfile, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setPaymentProfile(res.data[0].response.data);
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
      country_id: paymentProfile.country,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
      }
    });
  }, [paymentProfile.country]);
  const saveCompanyInfo = () => {
    if (
      inputErrors.country !== "" ||
      inputErrors.state !== "" ||
      inputErrors.company !== ""
    )
      return;
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      country: companyInfoData.country,
      state: companyInfoData.state,
      company_name: companyInfoData.company_name,
      city: companyInfoData.city,
      zipcode: companyInfoData.zipcode,
      office_phone: companyInfoData.office_phone,
      address: companyInfoData.address,
      fax: companyInfoData.fax,
      website: companyInfoData.website,
    };

    postRecord(APISaveCompanyInfo, objusr)
      .then((res) => {
        setOpen(false);
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
  const saveContactPerson = () => {
    if (
      inputErrors.fname !== "" ||
      inputErrors.lname !== "" ||
      inputErrors.email !== ""
    )
      return;
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      fname: companyInfoData.fname,
      lname: companyInfoData.lname,
      email: companyInfoData.email,
      mobile: companyInfoData.mobile,
    };
    // console.log(companyInfoData)
    postRecord(APISaveContactInfo, objusr)
      .then((res) => {
        setOpen(false);
        // console.log(res);
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
  const saveAccountInfo = () => {
    if (inputErrors.username !== "" || inputErrors.password !== "") return;
    companyInfoData.authenticate_key = "abcd123XYZ";
    companyInfoData.brokerid = JSON.parse(context.state.user).user_id;
    postRecord(APISaveAccountInfo, companyInfoData)
      .then((res) => {
        setOpen(false);
        // console.log(res);
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
  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyInfoData({ ...companyInfoData, [name]: value });
  };
  const handleInputChnage = (event) => {
    const { name, value } = event.target;
    setLinkedData({ ...linkedData, [name]: value });
  };
  const saveOfficeGalleryLink = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerId: JSON.parse(context.state.user).user_id,
      linkData: linkedData.data,
    };
    postRecord(APISaveBrokerSettingLink, objusr)
      .then((res) => {
        setOpen(false);
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
        setOpen(false);
      });
  };
  const handleLogoChange = (event) => {
    const data = event.target.value;
    setLogoImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, logoImageName: "" });
    handleLogoGetData(data);
  };
  const handleLogoGetData = (data) => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.imageid = data;
    bannerData.brokerid = JSON.parse(context.state.user).user_id;
    postRecord(APIGetUpdateCompanyLogo, bannerData)
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
  const handleImageChange = (event) => {
    setBannerData({ ...bannerData, logoImageName: event.target.files });
    setCustomBannerImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerImageChange = (event) => {
    setBannerData({ ...bannerData, bannerimage: event.target.files });
    setHeaderImageId("0");
    setOfferedBannerImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleTourThemeChange = (event) => {
    const { name, value } = event.target;
    setFlyerTourThemeData({ ...flyerTourThemeData, [name]: parseInt(value) });
  };
  const UpdateBrokerTheme = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      themeId: flyerTourThemeData.tourtheme,
    };
    postRecord(APIUpdateBrokerTheme, objusr)
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
  const handleBannerChange = (event) => {
    const data = event.target.value;
    if (data == 0) setOfferedBannerImg("");
    setHeaderImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, bannerimage: "" });
    changeBannerGetData(data);
  };
  const changeBannerGetData = (data) => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.brokerid = JSON.parse(context.state.user).user_id;
    bannerData.imageId = data;
    setOpen(true);
    postRecord(APIBrokerBannerChange, bannerData)
      .then((res) => {
        setOpen(false);

        if (res.data[0].response.status === "success") {
          // console.log(res.data[0].response);
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
  const saveCompanyBanner = () => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.brokerId = JSON.parse(context.state.user).user_id;
    bannerData.headerImageId = headerImageId;
    //bannerData.tourId = tour_id;
    // if (bannerData.image !== "") {
    //     bannerData.header = 0;
    // }
    // console.log(bannerData);
    const formData = new FormData();
    for (let i in bannerData) {
      if (i === "logoImageName") {
        for (let file of bannerData[i]) {
          formData.append("logoImageName", file);
        }
      } else if (i === "bannerimage") {
        for (let file of bannerData[i]) {
          formData.append("bannerimage", file);
        }
      } else {
        formData.append(i, bannerData[i]);
      }
    }
    axios
      .post(APISaveCompanyBanner, formData, {})
      //.post("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/save-company-banner-broker", formData, {})
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
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  // const removeBanner = () => {
  //     const obj = { authenticate_key: "abcd123XYZ", brokerId: JSON.parse(context.state.user).user_id, tourId: tour_id, folder: "companybanner", defalutImage: "default-banner.jpg" };
  //     //  console.log(obj);
  //     postRecord(APIDeleteTourImage, obj)
  //         .then(res => {
  //             // console.log(res);
  //             if (res.data[0].response.status === "success") {
  //                 setMessage(res.data[0].response.message);
  //                 setOpenSuccess(true);
  //                 setSync(true);
  //             }
  //             else {
  //                 setMessage(res.data[0].response.message);
  //                 setOpenError(true);
  //                 setSync(true);
  //             }
  //             setSync(false);
  //         });
  // }
  const removeBanner = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      tourId: tour_id,
      folder: "companybanner",
    };
    //  console.log(obj);
    // defalutImage: "default-banner.jpg"
    postRecord(APIDeleteTourImage, obj)
      .then((res) => {
        // console.log(res);
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
        setOpen(false);
      });
  };
  const removeLogo = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      tourId: tour_id,
      folder: "companylogo",
    };
    postRecord(APIDeleteTourImage, obj)
      .then((res) => {
        // console.log(res);
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
        setOpen(false);
      });
  };
  // const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setPropertyData({ ...propertyData, [name]: value });
  // };
  //console.log(propertyData);
  const generatenewcode = () => {
    generateString(6);
  };
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentProfile({ ...paymentProfile, [name]: value });
  };
  const handlePaymentPhoneChange = (event) => {
    const { name, value } = event.target;
    setPaymentProfile({ ...paymentProfile, [name]: value.replace(/\D/g, "") });
  };
  const handlePaymentCardNoChange = (event) => {
    const { name, value } = event.target;
    setPaymentProfile({
      ...paymentProfile,
      [name]: value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    });
  };
  //console.log(paymentProfile);
  // console.log(user);
  const brokerPaymentPorfile = () => {
    if (captchaSuccess === false) {
      setMessage("Please enter a valid captcha code");
      setOpenError(true);
    } else {
      setOpen(true);
      paymentProfile.authenticate_key = "abcd123XYZ";
      paymentProfile.brokerid = JSON.parse(context.state.user).user_id;
      paymentProfile.type = "broker";
      postRecord(APIPaymentProfile, paymentProfile)
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
  const handleClickShowPassword = () => {
    setCompanyInfoData({
      ...companyInfoData,
      showPassword: !companyInfoData.showPassword,
    });
  };
  const handleClickShowPasswordOne = () => {
    setCompanyInfoData({
      ...companyInfoData,
      showPasswordOne: !companyInfoData.showPasswordOne,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function changeHover(e) {
    setHover(true);
  }
  const handleItemClick = (event) => {
    const tabs = document.querySelectorAll(".mainMenu .dropdown-item");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    const tabPanes = document.querySelectorAll(".innerMenu > .tab-pane");
    tabPanes.forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    event.target.classList.add("active");

    const targetTab = event.target.getAttribute("href").substring(1);
    const targetTabElement = document.getElementById(targetTab);

    const tabEvent = new CustomEvent("shown.bs.tab", {
      relatedTarget: targetTabElement,
    });
    targetTabElement.classList.add("active");
    targetTabElement.dispatchEvent(tabEvent);
    targetTabElement.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Title title="Broker Setting" />
      <BrokerHeader />
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
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link class="active" to={APIPath() + "broker-setting"}>
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
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
                    <li>
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link class="active" to={APIPath() + "broker-setting"}>
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
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
                <div class="vtc_btm_menu_sec"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-title">
          <h2>Broker Setting</h2>
        </div>
      </section>
      <section class="property_info toggle_sec" style={{ display: "block" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="our_partners_head">
                <h2>Settings Menu</h2>
              </div>
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
                        <i class="fas fa-image"></i> Settings Menu
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
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Images"
                            >
                              <i class="fas fa-user" aria-hidden="true"></i>{" "}
                              Company Information
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Email"
                            >
                              <i class="fas fa-mail-bulk"></i> Branding{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Preferences"
                            >
                              <i class="far fa-credit-card"></i> Payment
                              Profiles{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Video"
                            >
                              <i class="fas fa-video" aria-hidden="true"></i>{" "}
                              All Tours Widget
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Tour"
                            >
                              <i class="far fa-images" aria-hidden="true"></i>{" "}
                              My Office Gallery{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-toggle="tab"
                              onClick={handleItemClick}
                              href="#Youtube"
                            >
                              <i class="fab fa-youtube" aria-hidden="true"></i>{" "}
                              Youtube Setting
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div class="property_info_cont" id="demo">
                <section id="examples" class="snap-scrolling-example">
                  {/* <div
                    id="content-1"
                    class="content horizontal-images tab_main"
                  >
                    <ul class="nav nav-tabs list_sec" role="tablist1">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-toggle="tab"
                          href="#Images"
                          role="tab"
                        >
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                          Company Information
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Email"
                          role="tab"
                        >
                          <span>
                            <i class="fas fa-mail-bulk"></i>
                          </span>
                          Branding{" "}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Preferences"
                          role="tab1"
                        >
                          <span>
                            <i class="far fa-credit-card"></i>
                          </span>
                          Payment Profiles{" "}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Video"
                          role="tab"
                        >
                          <span>
                            <i class="fas fa-video"></i>
                          </span>
                          All Tours Widget
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Tour"
                          role="tab"
                        >
                          <span>
                            <i class="far fa-images"></i>
                          </span>
                          My Office Gallery{" "}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#Youtube"
                          role="tab"
                        >
                          <span>
                            <i class="fab fa-youtube"></i>
                          </span>{" "}
                          Youtube Setting
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div class="tab-content innerMenu">
                    <div
                      class="browse_img tab-pane active"
                      id="Images"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Company Information</h5>
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
                                <i class="fas fa-user"></i>Company Information
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#profile2"
                                role="tab"
                              >
                                <i class="far fa-address-card"></i>Contact
                                Person
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#Account"
                                role="tab"
                              >
                                <i class="far fa-address-card"></i>Account
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
                                saveCompanyInfo();
                              }}
                            >
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    COMPANY{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="company_name"
                                    value={companyInfoData.company_name}
                                    onKeyUp={(e) =>
                                      e.target.value.length > 0
                                        ? (e.target.classList.add("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            company: "",
                                            company_error: "",
                                          })))
                                        : (e.target.classList.remove("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            company: "error",
                                            company_error:
                                              "Company name cannot be blank",
                                          })))
                                    }
                                  />
                                  <p style={{ color: "red" }}>
                                    {inputErrors.company_error}
                                  </p>
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Country{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    class="form-control formbox1select"
                                    onChange={handleCompanyInputChange}
                                    name="country"
                                    value={companyInfoData.country}
                                    onBlur={(e) =>
                                      e.target.value > 0
                                        ? (e.target.classList.add("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            country: "",
                                            country_error: "",
                                          })))
                                        : (e.target.classList.remove("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            country: "error",
                                            country_error: "Select a country",
                                          })))
                                    }
                                  >
                                    <option value="0">
                                      --Select Country--
                                    </option>
                                    {allCountry.map((res) => (
                                      <option value={res.id}>
                                        {res.countryname}
                                      </option>
                                    ))}
                                  </select>
                                  <p style={{ color: "red" }}>
                                    {inputErrors.country_error}
                                  </p>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    State{" "}
                                    <span style={{ color: "#ffa12d" }}>*</span>
                                  </label>
                                  <select
                                    className="form-control formbox1select"
                                    onChange={handleCompanyInputChange}
                                    name="state"
                                    value={companyInfoData.state}
                                    onBlur={(e) =>
                                      e.target.value > 0
                                        ? (e.target.classList.add("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            state: "",
                                            state_error: "",
                                          })))
                                        : (e.target.classList.remove("success"),
                                          setinputErrors((prevState) => ({
                                            ...prevState,
                                            state: "error",
                                            state_error: "Select a State",
                                          })))
                                    }
                                  >
                                    <option value="0">--Select State--</option>
                                    {allState.map((res) => (
                                      <option value={res.id}>
                                        {res.statename}
                                      </option>
                                    ))}
                                  </select>
                                  <p style={{ color: "red" }}>
                                    {inputErrors.state_error}
                                  </p>
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    City{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="city"
                                    value={companyInfoData.city}
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Zip{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="zipcode"
                                    value={companyInfoData.zipcode}
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Office Phone{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="tel"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="office_phone"
                                    value={companyInfoData.office_phone}
                                    minlength="10"
                                    maxlength="12"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Fax{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="fax"
                                    value={companyInfoData.fax}
                                  />
                                </div>
                                <div class="col-md-6 formbox1">
                                  <label>
                                    Website{" "}
                                    <span style={{ color: "#ffa12d" }}></span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    onChange={handleCompanyInputChange}
                                    name="website"
                                    value={companyInfoData.website}
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
                                    value={companyInfoData.address}
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

                            <hr class="spacer10px" />
                          </div>
                          <div class="tab-pane" id="profile2" role="tabpanel">
                            <div class="personalinfo">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  saveContactPerson();
                                }}
                              >
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      First Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="fname"
                                      value={companyInfoData.fname}
                                      onKeyUp={(e) =>
                                        e.target.value.length > 0
                                          ? (e.target.classList.add("success"),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              fname: "",
                                              fname_error: "",
                                            })))
                                          : (e.target.classList.remove(
                                              "success"
                                            ),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              fname: "error",
                                              fname_error:
                                                "fname name cannot be blank",
                                            })))
                                      }
                                    />
                                    <p style={{ color: "red" }}>
                                      {inputErrors.fname_error}
                                    </p>
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Last Name{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="lname"
                                      value={companyInfoData.lname}
                                      onKeyUp={(e) =>
                                        e.target.value.length > 0
                                          ? (e.target.classList.add("success"),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              lname: "",
                                              lname_error: "",
                                            })))
                                          : (e.target.classList.remove(
                                              "success"
                                            ),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              lname: "error",
                                              lname_error:
                                                "Last Name name cannot be blank",
                                            })))
                                      }
                                    />
                                    <p style={{ color: "red" }}>
                                      {inputErrors.lname_error}
                                    </p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Email
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="email"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="email"
                                      value={companyInfoData.email}
                                      onKeyUp={(e) =>
                                        regex.test(e.target.value)
                                          ? (e.target.classList.add("success"),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              email: "",
                                              email_error: "",
                                            })))
                                          : (e.target.classList.remove(
                                              "success"
                                            ),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              email_error:
                                                "Please Enter A Valid Email",
                                            })))
                                      }
                                    />
                                    <p style={{ color: "red" }}>
                                      {inputErrors.email_error}
                                    </p>
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Mobile
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="mobile"
                                      value={companyInfoData.mobile}
                                    />
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
                          <div class="tab-pane" id="Account" role="tabpanel">
                            <div class="personalinfo">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  saveAccountInfo();
                                }}
                              >
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      User Name
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="username"
                                      value={companyInfoData.username}
                                      readOnly
                                    />
                                  </div>
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Password{" "}
                                      <span style={{ color: "#ffa12d" }}>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type={
                                        companyInfoData.showPasswordOne
                                          ? "text"
                                          : "password"
                                      }
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="password"
                                      value={companyInfoData.password}
                                      onKeyUp={(e) =>
                                        e.target.value.length > 0
                                          ? (e.target.classList.add("success"),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              password: "",
                                              password_error: "",
                                            })))
                                          : (e.target.classList.remove(
                                              "success"
                                            ),
                                            setinputErrors((prevState) => ({
                                              ...prevState,
                                              password: "error",
                                              password_error:
                                                "Password cannot be blank",
                                            })))
                                      }
                                    />

                                    <IconButton
                                      className={classes.btn_pwd}
                                      onClick={handleClickShowPasswordOne}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {companyInfoData.showPasswordOne ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                    <p style={{ color: "red" }}>
                                      {inputErrors.password_error}
                                    </p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6 formbox1">
                                    <label>
                                      Confirm Password
                                      <span style={{ color: "#ffa12d" }}></span>
                                    </label>
                                    <input
                                      type={
                                        companyInfoData.showPassword
                                          ? "text"
                                          : "password"
                                      }
                                      class="form-control"
                                      onChange={handleCompanyInputChange}
                                      name="cnfpassword"
                                      onMouseDown={(e) =>
                                        console.log(e.target.type)
                                      }
                                      value={companyInfoData.cnfpassword}
                                    />
                                    <IconButton
                                      className={classes.btn_pwd}
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {companyInfoData.showPasswordOne ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
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
                        <h5>Branding</h5>
                      </div>
                      <div class="property_info_cont" id="demo">
                        <section id="examples" class="snap-scrolling-example">
                          <div
                            id="content-1"
                            class="content horizontal-images tab_main"
                          >
                            <ul class="nav nav-tabs list_sec" role="tablist1">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-toggle="tab"
                                  href="#Images"
                                  role="tab"
                                >
                                  <span>
                                    <i class="fas fa-user"></i>
                                  </span>
                                  UPLOAD COMPANY LOGO
                                </a>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                      <div class="tab-content" id="">
                        <div class="tab-pane active" id="home2" role="tabpanel">
                          <div class="col-lg-12 col-md-12">
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                saveCompanyBanner();
                              }}
                            >
                              <div>
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
                                      {customBannerImg === "" ? (
                                        <img
                                          src={defaultBanner}
                                          alt=""
                                          style={{
                                            marginBottom: "10px",
                                            width: "150px",
                                            height: "100px",
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src={customBannerImg}
                                          alt=""
                                          style={{
                                            marginBottom: "10px",
                                            width: "150px",
                                            height: "100px",
                                          }}
                                        />
                                      )}
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                    ></input>
                                    {/* <button onClick={() => removeLogo()} style={{ border: "#ffa124", padding: "10px", float: "right", background: "#bbbbbb", color: "#000", marginBottom: "10px" }} type="button" class="">Remove</button> */}
                                    {/* <select value={logoimageid} onChange={handleLogoChange} class="form-control formbox1select">
                                                                            <option value="0">Custom</option>
                                                                            {allLogo.map(res => (
                                                                                <option value={res.id}>{res.cl_title}</option>
                                                                            ))}
                                                                        </select> */}
                                  </div>
                                  <div class="col-lg-6 col-md-6 formbox1">
                                    <h6>Offered Banners</h6>
                                    {!offeredBannerImg || offeredBannerImg === "" ? (
                                      <img
                                        src={defaultBanner}
                                        alt="qqqq"
                                        style={{ marginBottom: "10px" }}
                                        className="bannerImg"
                                      />
                                    ) : (
                                      <img
                                        src={offeredBannerImg}
                                        alt="wwww"
                                        style={{
                                          marginBottom: "40px",
                                          width: "100%",
                                          height: "80px",
                                        }}
                                        className="bannerImg"
                                      />
                                    )}

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
                                      className="form-control formbox1select"
                                    >
                                      <option value="0">None</option>
                                      {allBanners.map((res) => (
                                        <option value={res.id}>
                                          {res.imagename}
                                        </option>
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
                        </div>
                      </div>
                    </div>

                    <div
                      class="browse_img tab-pane"
                      id="Preferences"
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
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              brokerPaymentPorfile();
                            }}
                          >
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
                                        value={paymentProfile.fname}
                                        placeholder="First Name"
                                        onChange={HandleInputChange}
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
                                        value={paymentProfile.lname}
                                        placeholder="Last Name"
                                        onChange={HandleInputChange}
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
                                        type="email"
                                        name="email"
                                        value={paymentProfile.email}
                                        placeholder="Email"
                                        onChange={HandleInputChange}
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
                                        name="office_phone"
                                        value={paymentProfile.office_phone}
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
                                        name="country"
                                        value={paymentProfile.country}
                                        onChange={HandleInputChange}
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
                                        name="state"
                                        value={paymentProfile.state}
                                        onChange={HandleInputChange}
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
                                        onChange={HandleInputChange}
                                        name="city"
                                        value={paymentProfile.city}
                                        class="form-control"
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
                                        value={paymentProfile.zipcode}
                                        placeholder="Zip"
                                        onChange={handlePaymentPhoneChange}
                                        maxLength="6"
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
                                      class="form-control"
                                      rows="3"
                                      name="address"
                                      value={paymentProfile.address}
                                      onChange={HandleInputChange}
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
                                        className="form-control formbox1select"
                                        value={user.countryid}
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
                                        value={paymentProfile.cc_no}
                                        placeholder="Card Number"
                                        maxLength="22"
                                        onChange={handlePaymentCardNoChange}
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
                                        value={paymentProfile.cvv}
                                        onChange={handlePaymentPhoneChange}
                                        maxLength="3"
                                        placeholder="Card Verification Number"
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
                                        style={{ margin: "5px" }}
                                        name="cc_month"
                                        class="form-control formbox1select"
                                        value={paymentProfile.cc_month}
                                        onChange={HandleInputChange}
                                      >
                                        <option value="0">Select Month</option>
                                        <option value="01">January </option>
                                        <option value="02">February </option>
                                        <option value="03">March </option>
                                        <option value="04">April </option>
                                        <option value="05">May </option>
                                        <option value="06">June </option>
                                        <option value="07">July </option>
                                        <option value="08">August </option>
                                        <option value="09">September </option>
                                        <option value="10">October </option>
                                        <option value="11">November </option>
                                        <option value="12">December </option>
                                      </select>
                                      <select
                                        name="cc_year"
                                        class="form-control formbox1select"
                                        value={paymentProfile.cc_year}
                                        onChange={HandleInputChange}
                                      >
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-6 col-md-6">
                                  <div class="agent_sign_up_single payment-setting">
                                    <Captcha
                                      onChange={(status) =>
                                        setCaptchaSuccess(status)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div class="row">
                                                                <div class="col-lg-6 col-md-6">
                                                                    <div class="agent_sign_up_single">
                                                                        <label> Verification Code *<span style={{ color: "#ffa12d" }}></span></label>
                                                                        <div class="align_center">
                                                                            <input type="text" id="inputType" className="form-control" placeholder="Enter Verification Captcha"
                                                                                name="username" onChange={handleChange} autocomplete="off"
                                                                            />
                                                                            <span class="agent_icn"><i class="fa fa-user"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6 col-md-6">
                                                                    <div class="agent_sign_up_single">
                                                                        <div class="mar_top row">
                                                                            <div class="col-md-12">
                                                                                <h4 id="captcha" style={{ margin: "10px" }}>{captcha}</h4>
                                                                                <button id="succesBTN" onClick={generatenewcode} class="btn btn-primary ml-1" style={{ backgroundColor: "#ffa12d", borderStyle: "none" }}>regenerate</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                              <button type="submit" class="next_btn border-0">
                                UPDATE
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Video" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>All Tour Widget</h5>
                      </div>
                      <div class="property_info_cont" id="demo">
                        <section id="examples" class="snap-scrolling-example">
                          <div
                            id="content-1"
                            class="content horizontal-images tab_main"
                          >
                            <ul class="nav nav-tabs list_sec" role="tablist1">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-toggle="tab"
                                  href="#Images"
                                  role="tab"
                                >
                                  <span>
                                    <i
                                      class="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  Misc Link
                                </a>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                      <div class="tab-content" id="">
                        <div class="tab-pane active" id="home2" role="tabpanel">
                          <div class="col-lg-12 col-md-12">
                            <div class="row">
                              <div class="col-lg-3 col-md-3">
                                <div
                                  class="service_links_left"
                                  style={{ marginTop: "12px" }}
                                >
                                  <h5 style={{ fontWeight: "600" }}>
                                    All Tours Widget :
                                  </h5>
                                </div>
                              </div>
                              <div class="col-lg-9 col-md-9">
                                <div class="service_links_right">
                                  <input
                                    type="text"
                                    name=""
                                    class="form-control"
                                    readOnly="readonly"
                                    value={
                                      "<script language=`javascript` src='https://virtualtourcafe.com/tourslideshow?id=" +
                                      companyInfoData.id +
                                      "'&width=220"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="browse_img tab-pane" id="Tour" role="tabpanel">
                      <div class="browse_img_head">
                        <h5>My Office Gallery</h5>
                      </div>
                      <div class="property_info_cont" id="demo">
                        <section id="examples" class="snap-scrolling-example">
                          <div
                            id="content-1"
                            class="content horizontal-images tab_main"
                          >
                            <ul class="nav nav-tabs list_sec" role="tablist1">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-toggle="tab"
                                  href="#MiscLink"
                                  role="tab"
                                >
                                  <span>
                                    <i
                                      class="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  Misc Link
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-toggle="tab"
                                  href="#tour_theme"
                                  role="tab"
                                >
                                  <span>
                                    <i class="fas fa-gopuram"></i>
                                  </span>
                                  Theme
                                </a>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                      <div class="tab-content" id="">
                        <div
                          class="tab-pane active"
                          id="MiscLink"
                          role="tabpanel"
                        >
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              saveOfficeGalleryLink();
                            }}
                          >
                            <div class="col-lg-12 col-md-12">
                              <div class="row">
                                <div class="col-lg-3 col-md-3">
                                  <div class="service_links_left">
                                    <h5>Branded Link</h5>
                                  </div>
                                </div>
                                <div class="col-lg-9 col-md-9">
                                  <div class="service_links_right">
                                    <h5>
                                      https://virtualtourcafe.com/my-office-gallery/
                                      {link}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-3 col-md-3">
                                  <div class="service_links_left">
                                    <h5>UnBranded Link</h5>
                                  </div>
                                </div>
                                <div class="col-lg-9 col-md-9">
                                  <div class="service_links_right">
                                    <h5>
                                      https://virtualtourcafe.com/my-non-brand-gallery/
                                      {link}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-3 col-md-3">
                                  <div class="service_links_left">
                                    <h5>All Tours Widget</h5>
                                  </div>
                                </div>
                                <div class="col-lg-9 col-md-9">
                                  <div class="service_links_right">
                                    <input
                                      type="text"
                                      onChange={handleInputChnage}
                                      name="data"
                                      value={linkedData.data}
                                      class="form-control"
                                      required="required"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <button type="submit" class="next_btn border-0">
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="tab-pane" id="tour_theme" role="tabpanel">
                          <hr></hr>
                          <p style={{ width: "100%", textAlign: "center" }}>
                            {" "}
                            Select any theme and use with your brokerage banner
                            or branding – themes are color designs only and can
                            be used by any agent or broker
                          </p>
                          <Button
                            class="next_btn border-0"
                            onClick={UpdateBrokerTheme}
                          >
                            Save
                          </Button>
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              UpdateBrokerTheme();
                            }}
                          >
                            <div class="pre_tour">
                              <div class="row">
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={theme1} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="1"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 1
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Default Theme
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme2} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="2"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 2
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Coldwell Banker
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new font">
                                      <img src={theme3} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="3"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 3
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Keller Williams Realty
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme4} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="4"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 4
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      ReMax
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme5} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="5"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 5
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Prudential
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme6} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="6"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 6
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Century 21
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme7} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="7"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 7
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Real Living
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={theme8} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="8"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 8
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Windermere
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new font"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={BetterHomesRealty} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="9"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 9
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Better Homes Realty
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={ERA} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="10"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 10
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        ERA
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={Weichert} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="11"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 11
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Weichert
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={EXIT} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="12"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 12
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        EXIT
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={EarlGrey} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="13"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 13
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Earl Grey
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new font"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={RockcliffRealtors} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="14"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 14
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      J. Rockcliff Realtors
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new font"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={AlainPinelRealtors} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="15"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 15
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Alain Pinel Realtors
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new font"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={InteroRealEstateServices} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="16"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 16
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Intero Real Estate Services
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label
                                      class="container_new font"
                                      style={{ fontSize: "20px !important " }}
                                    >
                                      <img src={CornishCareyCommercial} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="17"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 17
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      Cornish & Carey Commercial
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={LifesaBeach} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="18"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 18
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Life's a Beach
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={Sotheby} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="19"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 19
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Sotheby
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={RemaxCollections} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="20"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 20
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Remax Collections
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={F1rstTeam} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="21"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 21
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        F1rst Team
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={LongFoster} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="22"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 22
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Long&Foster
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={BlueLagoon} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="23"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 23
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Blue Lagoon
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={RealtyWorld} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="24"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 24
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        RealtyWorld
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={RealtyExecutives} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="25"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 25
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        RealtyExecutives
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={LegacyRealEstate} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="26"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 26
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        LegacyRealEstate
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={HomeLife} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="27"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 27
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        HomeLife
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={HelpUSell} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="28"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 28
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        HelpUSell
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={ColdwellPreview} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="29"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 29
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Coldwell Preview
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={DistinctiveCollection} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="30"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 30
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Distinctive Collection
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                  <div class="pre_tour_single">
                                    <label class="container_new">
                                      <img src={BerkshireHathaway} />
                                      <input
                                        type="radio"
                                        onChange={handleTourThemeChange}
                                        value="31"
                                        name="tourtheme"
                                        checked={
                                          flyerTourThemeData.tourtheme === 31
                                            ? true
                                            : false
                                        }
                                      />
                                      <span class="checkmark"></span>
                                      <span style={{ display: "block" }}>
                                        Berkshire Hathaway
                                      </span>
                                    </label>
                                  </div>
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
                    <div
                      class="browse_img tab-pane"
                      id="Youtube"
                      role="tabpanel"
                    >
                      <div class="browse_img_head">
                        <h5>Youtube Channel Information</h5>
                      </div>
                      <div class="property_info_cont" id="demo">
                        <section id="examples" class="snap-scrolling-example">
                          <div
                            id="content-1"
                            class="content horizontal-images tab_main"
                          >
                            <ul class="nav nav-tabs list_sec" role="tablist1">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-toggle="tab"
                                  href="#Images"
                                  role="tab"
                                >
                                  <span>
                                    <i
                                      class="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  Youtube Channel
                                </a>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                      <div class="tab-content" id="">
                        <div class="tab-pane active" id="home2" role="tabpanel">
                          <div class="col-lg-12 col-md-12"></div>
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

      <BrokerFooter />
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
