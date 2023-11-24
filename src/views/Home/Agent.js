import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import $ from "jquery";
import credit_card_logo from "../../images/mastercards.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import user from "../../images/user.jpg";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import agentvideothumb from "../../images/poster1.jpg";
import jQuery from "jquery";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import Captcha from "react-numeric-captcha";
import playIcon from "../../images/play-icn.png";
import login_img from "../../images/login-v2.png";
import icon_1 from "../../images/icon-symbol1.jpg";
import icon_2 from "../../images/icon-symbol2.jpg";
import icon_3 from "../../images/icon-symbol3.jpg";
import icon_4 from "../../images/icon-symbol4.jpg";
import money_back from "../../images/money-back.jpg";
import or_symbol from "../../images/or-symbol.png";
import own_img from "../../images/own-pic-1.jpg";
import Footer from "../../components/Footer/Footer";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import { AuthContext } from "../../CommonMethods/Authentication";
import Footer1 from "../../components/Footer/Footer1";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PinDropIcon from "@material-ui/icons/PinDrop";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import Switch from "react-switch";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetAgentData = APIURL() + "agentcontent";
const APIGetUserData = APIURL() + "user-details";
const APIGetCompanyLogoList = APIURL() + "company-logoList";
const APIGetBrokerDetails = APIURL() + "get-BrokerDetails";
const APIHomeData = APIURL() + "homecontent";
const APISubscription = APIURL() + "agent-signup";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APICheckMail = APIURL() + "check-email";
const APIRegister = APIURL() + "register-agent";
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
  dots: false,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
};
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function Agent() {
  const initialSubState = {
    fname: "",
    lname: "",
    email: "",
    officephone: "",
    zipcode: "",
    countryid: 40,
    stateid: "0",
    city: "",
    address: "",
    cc_no: "",
    cvv: "",
    cc_month: "0",
    cc_year: "0",
  };
  const initialregisterState = {
    authenticate_key: "abcd123XYZ",
    fname: "",
    lname: "",
    email: "",
    officephone: "",
  };
  const classes = useStyles();
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const [registerData, setRegisterData] = useState(initialregisterState);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [agentData, setAgentData] = useState({});
  const [logoData, setLogoData] = useState({});
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [currentBroker, setCurrentBroker] = useState({});
  const [homeData, setHomeData] = useState({});
  const [subscription1, setSubscription1] = useState({});
  const [subScriptionDesc1, setSubscriptionDesc1] = useState("");
  const [subScriptionDesc2, setSubscriptionDesc2] = useState("");
  const [subScriptionDesc3, setSubscriptionDesc3] = useState("");
  const [subscription2, setSubscription2] = useState({});
  const [subscription3, setSubscription3] = useState({});
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openSubscribModal, setopenSubscribModal] = useState(false);
  const [subscribeData, setSubscribeData] = useState(initialSubState);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [subscribeAmount, setSubscribeAmount] = useState("");
  const [subscribePlan, setSubscribePlan] = useState("");
  const [fnameErrorText, setFnameErrorText] = useState("");
  const [lnameErrorText, setLnameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [countryErrorText, setCountryErrorText] = useState("");
  const [stateErrorText, setStateErrorText] = useState("");
  const [cityErrorText, setCityErrorText] = useState("");
  const [zipErrorText, setZipErrorText] = useState("");
  const [ccnoErrorText, setCcnoErrorText] = useState("");
  const [cvvErrorText, setCvvErrorText] = useState("");
  const [monthErrorText, setMonthErrorText] = useState("");
  const [yearErrorText, setYearErrorText] = useState("");
  const [step, setStep] = useState(1);
  const [showPersonal, setShowPersonal] = useState(true);
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
    setOpenWarning(false);
  };
  const handleFocusRegFname = () => {
    if (registerData.fname === "") {
      setFnameErrorText("First name is required *");
    } else {
      setFnameErrorText("");
    }
  };
  const handleFocusRegLname = () => {
    if (registerData.lname === "") {
      setLnameErrorText("Last name is required *");
    } else {
      setLnameErrorText("");
    }
  };
  const handleFocusRegEmail = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (registerData.email === "") {
      setEmailErrorText("email is required *");
    } else {
      setEmailErrorText("");
    }
  };
  const handleFocusRegPhone = () => {
    if (registerData.officephone === "") {
      setPhoneErrorText("Phone is required *");
    } else {
      setPhoneErrorText("");
    }
  };
  const handleFocusFname = () => {
    if (subscribeData.fname === "") {
      setFnameErrorText("First name is required *");
    } else {
      setFnameErrorText("");
    }
  };
  const handleFocusLname = () => {
    if (subscribeData.lname === "") {
      setLnameErrorText("Last name is required *");
    } else {
      setLnameErrorText("");
    }
  };
  const handleFocusEmail = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (subscribeData.email === "") {
      setEmailErrorText("email is required *");
    } else {
      setEmailErrorText("");
    }
  };
  const handleFocusPhone = () => {
    if (subscribeData.officephone === "") {
      setPhoneErrorText("Phone is required *");
    } else {
      setPhoneErrorText("");
    }
  };
  const handleFocusCity = () => {
    if (subscribeData.city === "") {
      setCityErrorText("City is required *");
    } else {
      setCityErrorText("");
    }
  };
  const handleFocusCountry = () => {
    if (subscribeData.countryid === "0") {
      setCountryErrorText("Country is required *");
    } else {
      setCountryErrorText("");
    }
  };
  const handleFocusState = () => {
    if (subscribeData.stateid === "0") {
      setStateErrorText("State is required *");
    } else {
      setStateErrorText("");
    }
  };
  const handleFocusZip = () => {
    if (subscribeData.zipcode === "") {
      setZipErrorText("Zipcode is required *");
    } else {
      setZipErrorText("");
    }
  };
  const handleFocusCcno = () => {
    if (subscribeData.cc_no === "") {
      setCcnoErrorText("Card number is required *");
    } else {
      setCcnoErrorText("");
    }
  };
  const handleFocusCvv = () => {
    if (subscribeData.cvv === "") {
      setCvvErrorText("Cvv is required *");
    } else {
      setCvvErrorText("");
    }
  };
  const handleregisterchange = (event) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value.replace(/[^a-z ]/gi, ""),
    });
  };
  const handleregisterInputchange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleregisterPhonechange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value.replace(/\D/g, "") });
  };
  const handlechange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({
      ...subscribeData,
      [name]: value.replace(/[^a-z ]/gi, ""),
    });
    setFnameErrorText("");
    setLnameErrorText("");
    setCityErrorText("");
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({ ...subscribeData, [name]: value });
    setEmailErrorText("");
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({ ...subscribeData, [name]: value.replace(/\D/g, "") });
    setPhoneErrorText("");
    setZipErrorText("");
    setCcnoErrorText("");
    setCvvErrorText("");
  };
  const handlePaymentCardNoChange = (event) => {
    const { name, value } = event.target;
    setSubscribeData({
      ...subscribeData,
      [name]: value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    });
    setPhoneErrorText("");
    setZipErrorText("");
    setCcnoErrorText("");
    setCvvErrorText("");
  };
  const handleMobchange = (value) => {
    setSubscribeData({ ...subscribeData, ["officephone"]: value });
    setPhoneErrorText("");
    setZipErrorText("");
    setCcnoErrorText("");
    setCvvErrorText("");
  };
  const handleRegMobchange = (value) => {
    setRegisterData({ ...registerData, ["officephone"]: value });
  };
  const goToAddress = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (
      subscribeData.fname !== "" &&
      subscribeData.lname !== "" &&
      subscribeData.email !== "" &&
      subscribeData.officephone !== ""
    ) {
      if (!pattern.test(subscribeData.email)) {
        setEmailErrorText(
          "Please enter valid email address. eg. xyz@example.com"
        );
      } else {
        const obj = {
          authenticate_key: "abcd123XYZ",
          email: subscribeData.email,
        };
        postRecord(APICheckMail, obj).then((res) => {
          console.log(res);
          if (res.data[0].response.status === "success") {
            setShowPersonal(false);
            setShowAddress(true);
            setStep(2);
            setFnameErrorText("");
            setLnameErrorText("");
            setEmailErrorText("");
            setPhoneErrorText("");
          } else {
            setEmailErrorText(res.data[0].response.message);
            setIsEmailExist(true);
          }
        });
      }
    } else {
      if (subscribeData.fname === "") {
        setFnameErrorText("First name is required *");
      } else {
        setFnameErrorText("");
      }
      if (subscribeData.lname === "") {
        setLnameErrorText("Last name is required *");
      } else {
        setLnameErrorText("");
      }
      if (subscribeData.email === "") {
        setEmailErrorText("email is required *");
      }
      if (isEmailExist === true) {
        setEmailErrorText("email already exist try another");
      } else {
        setEmailErrorText("");
      }
      if (subscribeData.officephone === "") {
        setPhoneErrorText("Phone is required *");
      } else {
        setPhoneErrorText("");
      }
    }
  };
  const goBackToPersonal = () => {
    setStep(1);
    setShowPersonal(true);
    setShowAddress(false);
  };
  const goToPayment = () => {
    if (
      subscribeData.countryid !== "" &&
      subscribeData.stateid !== "0" &&
      subscribeData.city !== "" &&
      subscribeData.zipcode !== ""
    ) {
      setStep(3);
      setShowPayment(true);
      setShowAddress(false);
      setCountryErrorText("");
      setStateErrorText("");
      setCityErrorText("");
      setZipErrorText("");
    } else {
      if (subscribeData.countryid === "") {
        setCountryErrorText("Country is required *");
      } else {
        setCountryErrorText("");
      }
      if (subscribeData.stateid === "0") {
        setStateErrorText("State is required *");
      } else {
        setStateErrorText("");
      }
      if (subscribeData.city === "") {
        setCityErrorText("City is required *");
      } else {
        setCityErrorText("");
      }
      if (subscribeData.zipcode === "") {
        setZipErrorText("Zipcode is required *");
      } else {
        setZipErrorText("");
      }
    }
  };
  const goBackToAddress = () => {
    setStep(2);
    setShowAddress(true);
    setShowPayment(false);
  };
  const goToSuccess = () => {
    if (
      subscribeData.cc_no !== "" &&
      subscribeData.cvv !== "" &&
      subscribeData.cc_month !== "0" &&
      subscribeData.cc_year !== "0"
    ) {
      setOpen(true);
      subscribeData.authenticate_key = "abcd123XYZ";
      subscribeData.amount = subscribeAmount;
      if (subscribeAmount === "39.99") {
        subscribeData.sub_id = 3;
      }
      if (subscribeAmount === "399.00") {
        subscribeData.sub_id = 6;
      }
      if (subscribeAmount === "49.00") {
        subscribeData.sub_id = 7;
      }
      postRecord(APISubscription, subscribeData)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setOpen(false);
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
            setSubscribeData(initialSubState);
            setStep(4);
            setShowPayment(false);
            setShowSuccess(true);
            setCcnoErrorText("");
            setCvvErrorText("");
            setMonthErrorText("");
            setYearErrorText("");
            setopenSubscribModal(false);
          } else {
            setOpen(false);
            setMessage(res.data[0].response.message);
          }
        })
        .catch((err) => {
          setOpen(false);
          setMessage("Error Occured !!");
          setOpenError(true);
        });
    } else {
      if (subscribeData.cc_no === "") {
        setCcnoErrorText("Card number is required *");
      } else {
        setCcnoErrorText("");
      }
      if (subscribeData.cvv === "") {
        setCvvErrorText("Cvv is required *");
      } else {
        setCvvErrorText("");
      }
      if (subscribeData.cc_month === "0") {
        setMonthErrorText("Month is required *");
      } else {
        setMonthErrorText("");
      }
      if (subscribeData.cc_year === "0") {
        setYearErrorText("year is required *");
      } else {
        setYearErrorText("");
      }
    }
  };
  const handleCloseModal = () => {
    setSubscribeData(initialSubState);
    setStep(1);
    setShowPersonal(true);
    setShowPayment(false);
    setShowAddress(false);
    setShowSuccess(false);
    setopenSubscribModal(false);
    setMessage("");
  };
  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSiteSetting, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetAgentData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAgentData(res.data[0].response.data);
        setSiteTitle(res.data[0].response.data.clientlogo.title);
        setSiteDescription(res.data[0].response.data.clientlogo.sub_title);
        setSubscription1(res.data[0].response.data.Subscription1);
        setSubscription2(res.data[0].response.data.Subscription2);
        setSubscription3(res.data[0].response.data.Subscription3);
        setSubscriptionDesc1(
          res.data[0].response.data.Subscription1.description
        );
        setSubscriptionDesc2(
          res.data[0].response.data.Subscription2.description
        );
        setSubscriptionDesc3(
          res.data[0].response.data.Subscription3.description
        );
      }
    });
  }, []);
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
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIHomeData, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setHomeData(res.data[0].response.data);
      }
    });
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCompanyLogoList, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setLogoData(res.data[0].response.dataDetails);
      }
    });
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        broker_id: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetBrokerDetails, objusr).then((res) => {
        setCurrentBroker(res.data[0].response.data.broker_profile);
      });
    }
  }, [context.state.user]);
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
      country_id: subscribeData.countryid,
    };
    postRecord(APIGetStates, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllStates(res.data[0].response.data);
        setSubscribeData({ ...subscribeData, ["stateid"]: "0" });
      } else {
        setAllStates([]);
        setSubscribeData({ ...subscribeData, ["stateid"]: "0" });
      }
    });
  }, [subscribeData.countryid]);
  jQuery(".onclick-video-play").click(function () {
    if (jQuery("#video").get(0).paused) {
      jQuery("#video").trigger("play");
      jQuery(".play").fadeOut(500);
    } else {
      jQuery("#video").trigger("pause");
      jQuery(".play").fadeIn(500);
    }
  });
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  // var SubscriptionDescvalue1 = subScriptionDesc1.split(",");
  // var SubscriptionDescvalue2 = subScriptionDesc2.split(",");
  // var SubscriptionDescvalue3 = subScriptionDesc3.split(",");
  // const listItems1 = SubscriptionDescvalue1.map((number) => <li>{number}</li>);
  // const listItems2 = SubscriptionDescvalue2.map((number) => <li>{number}</li>);
  // const listItems3 = SubscriptionDescvalue3.map((number) => <li>{number}</li>);

  // const SaveSubscription = () => {
  //     if (captchaSuccess === false) {
  //         setMessage("Please enter a valid captcha code");
  //         setOpenError(true);
  //     }
  //     else {
  //         setMessage("Please Wait ....");
  //         setOpenWarning(true);
  //         subscribeData.authenticate_key = "abcd123XYZ";
  //         subscribeData.agent_id = JSON.parse(context.state.user).agentId;
  //         subscribeData.amount = subscribeAmount;

  //         if (subscribeAmount === "39.99") {
  //             subscribeData.sub_id = 3;
  //         }
  //         if (subscribeAmount === "399.00") {
  //             subscribeData.sub_id = 6;
  //         }
  //         if (subscribeAmount === "49.00") {
  //             subscribeData.sub_id = 7;
  //         }
  //         postRecord(APISubscription, subscribeData)
  //             .then(res => {
  //                 if (res.data[0].response.status === "success") {
  //                     setMessage(res.data[0].response.message);
  //                     setOpenSuccess(true);
  //                 }
  //                 else {
  //                     setMessage(res.data[0].response.message);
  //                     setOpenError(true);
  //                 }
  //                 setOpenWarning(false);
  //             });
  //     }

  // }
  const checkEmailExist = async () => {
    const obj = { authenticate_key: "abcd123XYZ", email: subscribeData.email };
    postRecord(APICheckMail, obj).then((res) => {
      console.log(res);
      if (res.data[0].response.status === "success") {
        setIsEmailExist(false);
        return true;
      } else {
        setEmailErrorText(res.data[0].response.message);
        setIsEmailExist(true);
        return false;
      }
    });
  };
  const checkEmailExistReg = async () => {
    const obj = { authenticate_key: "abcd123XYZ", email: registerData.email };
    postRecord(APICheckMail, obj).then((res) => {
      console.log(res);
      if (res.data[0].response.status === "success") {
        setIsEmailExist(false);
        return true;
      } else {
        setEmailErrorText(res.data[0].response.message);
        setIsEmailExist(true);
        return false;
      }
    });
  };
  const saveRegistration = () => {
    // var pattern = new RegExp(
    //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    // );
    if (
      registerData.fname !== "" &&
      registerData.lname !== "" &&
      registerData.email !== "" &&
      registerData.officephone !== ""
    ) {
      setFnameErrorText("");
      setLnameErrorText("");
      setEmailErrorText("");
      setPhoneErrorText("");
      const obj = { authenticate_key: "abcd123XYZ", email: registerData.email };
      postRecord(APICheckMail, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          postRecord(APIRegister, registerData).then((res) => {
            console.log(res.data[0].response.status);
            if (res.data[0].response.status === "success") {
              setMessage(res.data[0].response.message);
              setOpenSuccess(true);
              setRegisterData(initialregisterState);
            } else {
              setMessage(res.data[0].response.message);
              setOpenError(true);
            }
          });
        } else {
          setEmailErrorText(res.data[0].response.message);
          setIsEmailExist(true);
        }
      });
    } else {
      if (registerData.fname === "") {
        setFnameErrorText("First name is required *");
      } else {
        setFnameErrorText("");
      }
      if (registerData.lname === "") {
        setLnameErrorText("Last name is required *");
      } else {
        setLnameErrorText("");
      }
      if (registerData.email === "") {
        setEmailErrorText("email is required *");
      } else {
        setEmailErrorText("");
      }
      if (registerData.officephone === "") {
        setPhoneErrorText("Phone is required *");
      } else {
        setPhoneErrorText("");
      }
    }
  };
  const goToAgent = () => {
    history.push(APIPath() + "agent-register");
  };
  const goToLogin = () => {
    history.push(APIPath() + "agent-login");
  };
  const openBox = () => {
    if (!$("#mob_btn").hasClass("active")) {
      $("#mob_btn").addClass("active");
      $("#mobilemenu").addClass("active");
      return $("body").css("overflow", "hidden");
    } else {
      $("#mob_btn").removeClass("active");
      $("#mobilemenu").removeClass("active");
      return $("body").css("overflow", "auto");
    }
  };
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 3,
      };
      const res = await postRecord(APIURL() + "get-metadata", objusr);

      setMetaData(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    metaCtx.setPageTitle(metaData.page);
    metaCtx.setMetaDesc(metaData.metaDesc);
    metaCtx.setMetaKw(metaData.metaKeyWords);
    metaCtx.setMetaTitle(metaData.metaTitle);
    metaCtx.setOgtitle(metaData.ogTitle);
    metaCtx.setOgDesc(metaData.ogDesc);
    metaCtx.setOgSiteName(metaData.ogSiteName);
    metaCtx.setTwitterCard(metaData.twitterCard);
    metaCtx.setTwitterSite(metaData.twitterSite);
    metaCtx.setTwitterTitle(metaData.twitterTitle);
    metaCtx.setTwitterDesc(metaData.twitterDesc);
  }, [metaData]);
  return (
    <div>
      <Title title="Agent" />
      <section class="home_page">
        <div class="mobile_on mobile_slide">
          <div class="mob_head">
            <div class="hm_logo">
              <a href="#">
                <img src={Logo} alt="Logo" title="Logo" />
              </a>
            </div>
            <div id="mobilemenu">
              <div class="mobilemenu-wrapper">
                <div class="mobilemenu-trigger">
                  <button id="mob_btn" class="trigger" onClick={openBox}>
                    <span class="box">
                      <span class="bar top"></span>
                      <span class="bar middle"></span>
                      <span class="bar bottom"></span>
                    </span>
                  </button>
                </div>
                <div class="mobilemenu-view">
                  <div class="menu">
                    <ul>
                      <li>
                        <Link to={APIPath() + "login"}>Login</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "agent"}>Register</Link>
                      </li>
                      <li class="">
                        <Link to={APIPath()}>Home</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "features"}>Features</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "agent"}>Agents</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "broker"}>Brokers</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "association"}>Associations</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "preferred-vendors"}>
                          Preferred Vendors
                        </Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "about-us"}>About</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "example"}>Example</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "pricing"}>Pricing</Link>
                      </li>
                      <li>
                        <Link to={APIPath() + "faq"}>FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="spacer1px"></hr>
        <div class="home_page_banner inner_banner">
          {Object.keys(agentData).length > 0 ? (
            <img src={agentData.banner_section.image} alt="" title="" />
          ) : (
            <img src={banner} alt="" title="" />
          )}
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>
                {Object.keys(agentData).length > 0 ? (
                  agentData.banner_section.title
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h2>
              <h5>
                {Object.keys(agentData).length > 0 ? (
                  agentData.banner_section.sub_title
                ) : (
                  <Skeleton
                    variant="text"
                    width={450}
                    height={80}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </h5>
            </div>
          </div>
          <div class="inner_page_breadcumb">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="inner_page_breadcumb_main">
                    <ul>
                      <li>
                        <Link to={APIPath()}>
                          <i class="fas fa-home"></i>Home
                        </Link>
                      </li>
                      <li>
                        <a href="#">Agents</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="head_sec">
          <header class="desktop_sticky">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="head_main">
                    <div class="head_cont_left">
                      <ul>
                        <li>
                          <a href="mailto:support@VirtualTourCafe.com">
                            <i class="far fa-envelope"></i>
                            {Object.keys(data).length > 0 ? (
                              data.site_email
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                        <li>
                          <a href="tel:(877) 744-8285 or (925) 609-2408">
                            <i class="fas fa-phone-alt"></i>
                            {Object.keys(data).length > 0 ? (
                              data.phone_number
                            ) : (
                              <Skeleton
                                variant="text"
                                width={150}
                                height={30}
                                style={{ background: "#bbbbbb" }}
                              />
                            )}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="head_cont_right">
                      {context.state.isAuthenticated &&
                      JSON.parse(context.state.user).role == "broker" ? (
                        <ul>
                          {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                          <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                            <a
                              href="#"
                              class="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                              id="profileDropdown"
                              aria-expanded="false"
                            >
                              <div class="user_img">
                                <img src={user} alt="profile" />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img src={user} alt="profile" />
                                </div>
                                <div class="content-text">
                                  <h6>{currentBroker.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "broker-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              <a
                                href={APIPath() + "broker-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>
                              <Link
                                to={APIPath() + "broker-reports"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>
                              <Link
                                onClick={handleLogout}
                                to={APIPath()}
                                class="dropdown-item"
                              >
                                <i class="fas fa-sign-out-alt profile-icon"></i>
                                Sign Out
                              </Link>
                            </div>
                          </li>
                        </ul>
                      ) : context.state.isAuthenticated &&
                        JSON.parse(context.state.user).role == "agent" ? (
                        <ul>
                          {/* <li><Link to={APIPath() + "register"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li> */}
                          <li class="dashboard nav-item nav-profile dropdown dropdown-animate">
                            <a
                              href="#"
                              class="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                              id="profileDropdown"
                              aria-expanded="false"
                            >
                              <div class="user_img">
                                <img
                                  src={currentUser && currentUser.profile_img}
                                  alt="profile"
                                />
                              </div>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right navbar-dropdown profile-top"
                              aria-labelledby="profileDropdown"
                              style={{ zIndex: "99" }}
                            >
                              <div class="profile-header d-flex align-items-center">
                                <div class="thumb-area">
                                  <img
                                    src={currentUser && currentUser.profile_img}
                                    alt="profile"
                                  />
                                </div>
                                <div class="content-text">
                                  <h6>{currentUser.name}</h6>
                                </div>
                              </div>
                              <Link
                                to={APIPath() + "agent-dashboard"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-user profile-icon"></i>
                                Dashboard
                              </Link>
                              <a
                                href={APIPath() + "agent-setting"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-cog profile-icon"></i>Settings
                              </a>
                              <Link
                                to={APIPath() + "agent-support"}
                                class="dropdown-item"
                              >
                                <i class="fas fa-info-circle profile-icon"></i>
                                Support
                              </Link>
                              <Link
                                onClick={handleLogout}
                                to={APIPath()}
                                class="dropdown-item"
                              >
                                <i class="fas fa-sign-out-alt profile-icon"></i>
                                Sign Out
                              </Link>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            <Link
                              to={APIPath() + "appointment"}
                              class="login_btn"
                            >
                              <i class="fal fa-book"></i>Schedule Your
                              Appointment
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "login"} class="login_btn">
                              <i class="far fa-lock-alt"></i>Login
                            </Link>
                          </li>
                          <li>
                            <Link to={APIPath() + "agent"} class="register_btn">
                              <i class="fas fa-edit"></i>Register
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div class="head_menu_sec_new">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="head_sec_menu" style={{ zIndex: "99" }}>
                    <div class="row">
                      <div class="col-lg-3 col-md-3">
                        <div class="vtc_logo">
                          <Link to={APIPath()}>
                            <img src={Logo} alt="Logo" title="Logo" />
                          </Link>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9">
                        <div class="head_sec_menu_main">
                          <ul>
                            <li>
                              <Link to={APIPath()}>Home</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "features"}>Features</Link>
                            </li>
                            <li class="active">
                              <Link to={APIPath() + "agent"}>Agents</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "broker"}>Brokers</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "association"}>
                                Associations
                              </Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "preferred-vendors"}>
                                Preferred Vendors
                              </Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "about-us"}>About</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "example"}>Example</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "pricing"}>Pricing</Link>
                            </li>
                            <li>
                              <Link to={APIPath() + "faq"}>FAQ</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="own_pics_sec photoagent-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h4>
                {Object.keys(agentData).length > 0 ? (
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: agentData.our_clients_say_left.title,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </h4>

              {/* <h4>
                                {Object.keys(agentData).length > 0 ? (
                                    agentData.our_clients_say_left.title
                                ) : (
                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                )}
                            </h4> */}
              <p>
                {Object.keys(agentData).length > 0 ? (
                  agentData.our_clients_say_left.sub_title
                ) : (
                  <Skeleton
                    variant="text"
                    width={250}
                    height={100}
                    style={{ background: "#bbbbbb", margin: "0 auto" }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="subscription_pricequote mt-0 pb-0 photo_agent_sub">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-xl-4 d-flex">
              <article class="w-100 mx-auto mb-6 position-relative bg-white shadow rounded text-center priceColumn">
                <h3>
                  {Object.keys(subscription1).length > 0
                    ? subscription1.title
                    : ""}
                  <br />
                </h3>
                <h4>
                  <span class="d-block fwMedium">
                    {Object.keys(subscription1).length > 0
                      ? subscription1.sub_title
                      : ""}
                  </span>
                </h4>
                <hr class="my-6" />
                {/* <ul class="list-unstyled pcFeaturesList text-left mb-0"> */}
                <ul
                  class="list-unstyled pcFeaturesList text-left mb-0"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: subscription1.description,
                  }}
                ></ul>
                {/* {listItems1} */}
                {/* </ul> */}
                <a
                  href="javascript:void(0)"
                  class="btn btnThemeAlt position-absolute border-0 p-0 mx-auto"
                  data-hover="Select"
                >
                  <button
                    onClick={() => {
                      setopenSubscribModal(true);
                      setSubscribeAmount("39.99");
                      setSubscribePlan(subscription1.title);
                    }}
                    data-toggle="modal"
                    data-target="#Monthly_Sub"
                    class="have_pics"
                  >
                    Click To Subscribe<i class="fas fa-arrow-right"></i>
                  </button>
                </a>
              </article>
            </div>

            <div class="col-12 col-md-4 col-xl-4 d-flex">
              <article class="w-100 mx-auto mb-6 position-relative bg-white shadow rounded text-center priceColumn">
                <h3>
                  {Object.keys(subscription2).length > 0
                    ? subscription2.title
                    : ""}
                  <br />
                </h3>
                <h4>
                  <span class="d-block fwMedium">
                    {Object.keys(subscription1).length > 0
                      ? subscription2.sub_title
                      : ""}
                  </span>
                </h4>
                <hr class="my-6" />
                <ul
                  class="list-unstyled pcFeaturesList text-left mb-0"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: subscription2.description,
                  }}
                ></ul>
                <h6>Annual Subscription saves you $79.98</h6>
                <a
                  href="javascript:void(0)"
                  class="btn btnThemeAlt position-absolute border-0 p-0 mx-auto"
                  data-hover="Select"
                >
                  <button
                    onClick={() => {
                      setopenSubscribModal(true);
                      setSubscribeAmount("399.00");
                      setSubscribePlan(subscription2.title);
                    }}
                    class="have_pics"
                  >
                    Click To Subscribe<i class="fas fa-arrow-right"></i>
                  </button>
                </a>
              </article>
            </div>

            <div class="col-12 col-md-4 col-xl-4 d-flex">
              <article class="w-100 mx-auto mb-6 position-relative bg-white shadow rounded text-center priceColumn">
                <h3>
                  {Object.keys(subscription3).length > 0
                    ? subscription3.title
                    : ""}
                  <br />
                </h3>
                <h4>
                  <span class="d-block fwMedium">
                    {Object.keys(subscription3).length > 0
                      ? subscription3.sub_title
                      : ""}
                  </span>
                </h4>
                <hr class="my-6" />
                <ul
                  class="list-unstyled pcFeaturesList text-left mb-0"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: subscription3.description,
                  }}
                ></ul>
                <a
                  href="javascript:void(0)"
                  class="btn btnThemeAlt position-absolute border-0 p-0 mx-auto"
                  data-hover="Select"
                >
                  <button
                    onClick={() => {
                      setopenSubscribModal(true);
                      setSubscribeAmount("49.00");
                      setSubscribePlan(subscription3.title);
                    }}
                    class="have_pics"
                  >
                    Click To Subscribe<i class="fas fa-arrow-right"></i>
                  </button>
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section class="create-vtc-website">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <h4>
                Create a Virtual Tour/Property Website, Flyer and Video… <br />
                <span>Easy as 1-2-3!</span>
              </h4>
              <hr class="spacer10px" />
              <div class="row">
                <div class="col-lg-8 col-md-8 mx-auto text-center onclick-video-play">
                  {Object.keys(agentData).length > 0 ? (
                    <iframe
                      width="100%"
                      height="440"
                      autoplay
                      src={agentData.our_clients_say_right.image}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  ) : (
                    ""
                  )}
                  {/* {Object.keys(agentData).length > 0 ? (
                                        <React.Fragment>
                                            <video id="video" poster={agentvideothumb} controls>
                                                <source src={agentData.our_clients_say_right.image} type="video/mp4" />
                                            </video>
                                        </React.Fragment>
                                    ) : ("")} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="own_pics_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="own_pics_sec_main">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="own_pics_sec_left">
                      <div class="row">
                        <div class="col-lg-12 col-md-12">
                          <div class="own_pics_sec_left_top text-center">
                            <h5>Have Your Own Photos?</h5>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="own_pics_sec_left_bottom">
                            <div class="own_pics_sec_left_bottom_img">
                              <img src={own_img} />
                            </div>
                            <div class="own_pics_sec_left_bottom_cont">
                              <h6>All Photo Packages Include:</h6>
                              <div class="features_sec_left">
                                <ul>
                                  <li>Premium Property Websites</li>
                                  <li>Social Media Video</li>
                                  <li>Print Friendly Flyer PDF</li>
                                  <li>Branded and Unbranded (MLS) Links</li>
                                  <li>EZ-FlashCard Videos (unlimited plans)</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="own_pics_sec_left_bottom">
                            <div class="own_pics_sec_left_bottom_img">
                              <img src={own_img} />
                            </div>
                            <div class="own_pics_sec_left_bottom_cont">
                              <h6>Need Photo Enhancement?</h6>
                              <p>
                                For just $2/photo we will enhance your photos to
                                look like a professional took them! Our
                                proprietary 15-step process will correct the
                                color, whitebalance, brightness, straighten the
                                photo and even change cloudy skies to blue! All
                                in 24hrs!
                              </p>
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
      </section>
      <section class="money_back_guarantee">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 ml-auto">
              <div class="subscription_sec_cont2">
                <h4>Need Photo Enhancement?</h4>
                <p>
                  Select VIP Concierge Service and we will do it all for you,
                  including photo enhancement. Our proprietary 15-step process
                  will correct the color, whitebalance, brightness, straighten
                  the photo and even change cloudy skies to blue! All in 24hrs!
                </p>

                <div class="moneyback-right-design">
                  <div class="moneyback-right-design1">
                    <img src={money_back} alt="" />
                  </div>
                  <div class="moneyback-right-design2">
                    <img src={or_symbol} alt="" />
                  </div>
                  <div class="moneyback-right-design3">
                    <a
                      href="javascript:void(0)"
                      class="need_pic"
                      onClick={goToAgent}
                    >
                      TRY IT FREE<i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div class="subscription_sec_cont">
                  <hr class="spacer1px" />
                  <small>
                    7 Days Unlimited <strong>FREE TRIAL</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr class="spacer1px" />
      <section class="ineedphotos-sec">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-5">
              <div class="ineedphotos-sec-left">
                <h2>I Need Photos</h2>
                <p>
                  Currently serving the greater San Francisco Bay Area, South
                  Bay, Peninsula,North Bay to Santa Rosa, East Bay to Tracy,
                  Stockton, San Joaquin Valley and Sacramento areas.
                </p>
              </div>
            </div>
            <div class="col-lg-7 col-md-7">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="ineedphotos-sec-rightbox">
                    <img src={icon_1} alt="" />
                    <h4>Photography & Videos</h4>
                    <p>
                      Our photographers use only the highest quality
                      professional cameras and lenses to create stunning images
                      for your listing to help you sell fast!
                    </p>
                    <Link to={APIPath() + "example"} class="learnmore">
                      Learn More <i class="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                  <div class="ineedphotos-sec-rightbox">
                    <img src={icon_2} alt="" />
                    <h4>Aerial Drone Photos & Video</h4>
                    <p>
                      Aerial drone photos provide an elevated view of the home
                      and property not available from the ground. Take it to an
                      even higher level with aerial video to truly showcase the
                      property and views from all angles!
                    </p>
                    <Link to={APIPath() + "example"} class="learnmore">
                      Learn More <i class="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="ineedphotos-sec-rightbox">
                    <img src={icon_3} alt="" />
                    <h4>Matterport 3D WalkThrough Tours Sell Houses Faster!</h4>
                    <p>
                      Stand out from other agents and become the Marketing
                      Expert in your area by showcasing your listings with a 3D
                      WalkThrough Home Tour!
                    </p>
                    <Link to={APIPath() + "example"} class="learnmore">
                      Learn More <i class="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                  <div class="ineedphotos-sec-rightbox">
                    <img src={icon_4} alt="" />
                    <h4>Virtual Staging</h4>
                    <p>
                      Studies have shown that a staged house sells faster and
                      for a higher price! Virtual staging is a low-cost, fast
                      and easy way to turn an empty cold room into a warm
                      inviting home!
                    </p>
                    <Link to={APIPath() + "example"} class="learnmore">
                      Learn More <i class="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="login_sec_page">
        <div class="container">
          <div class="row">
            <div class="col-lg-1- col-md-12 mx-auto">
              <div class="login-box">
                <div class="row">
                  <div class="col-md-6">
                    <div class="login-box-right">
                      <h3 class="text-center">Schedule Photo Shoot</h3>
                      <ul>
                        <li>
                          <div class="formset-input">
                            <TextField
                              fullWidth
                              label="First Name"
                              name="fname"
                              helperText={fnameErrorText}
                              error={fnameErrorText}
                              onChange={handleregisterchange}
                              onFocus={handleFocusRegFname}
                              value={registerData.fname}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircleIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <div class="formset-input">
                            <TextField
                              fullWidth
                              label="Last Name"
                              name="lname"
                              helperText={lnameErrorText}
                              error={lnameErrorText}
                              onChange={handleregisterchange}
                              onFocus={handleFocusRegLname}
                              value={registerData.lname}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircleIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <div class="formset-input">
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              helperText={emailErrorText}
                              error={emailErrorText}
                              onChange={handleregisterInputchange}
                              onFocus={handleFocusRegEmail}
                              value={registerData.email}
                              onBlur={checkEmailExistReg}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <div class="formset-input">
                            <ReactPhoneInput
                              country="us"
                              onlyCountries={["us"]}
                              value={registerData.officephone}
                              onChange={handleRegMobchange}
                            />
                            <p class="MuiFormHelperText-root Mui-error">
                              {phoneErrorText}
                            </p>
                            {/* <TextField
                                                            fullWidth
                                                            label="Phone"
                                                            name="officephone"
                                                            helperText={phoneErrorText}
                                                            error={phoneErrorText}
                                                            onChange={handleregisterPhonechange}
                                                            onFocus={handleFocusRegPhone}
                                                            value={registerData.officephone}
                                                            inputProps={{
                                                                maxLength: 10,
                                                            }}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <PhoneIcon />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        /> */}
                          </div>
                        </li>
                        <li>
                          <div class="row align-items-center">
                            <div class="col-md-12">
                              <button
                                onClick={() => saveRegistration()}
                                type="submit"
                                class="have_pics login_btn_new"
                              >
                                Create An Account
                                <i class="fas fa-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="login-box-left nwdesign">
                      <span>
                        <img src={login_img} alt="" />
                        <br />
                        Already have an account?{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => goToLogin()}
                        >
                          Login Here
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="ftr_get">
        <Footer1 />
        <Footer />
      </div>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSubscribModal}
        style={{ marginTop: "5%" }}
      >
        <DialogTitle id="customized-dialog-title">
          Agent Sign Up
          <CancelIcon
            onClick={() => {
              handleCloseModal();
            }}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="modal-content monthly-subscribtion">
            <section class="property_info toggle_sec">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12 col-md-12 mx-auto">
                    <form id="msform" class="signupform">
                      <ul id="progressbar">
                        <li class="active" id="account">
                          <i class="far fa-images"></i> Personal
                          <span> Details</span>
                        </li>
                        <li class={step > 1 ? "active" : ""} id="personal">
                          <i class="fas fa-pen"></i> Address
                          <span> Details</span>
                        </li>
                        <li class={step > 2 ? "active" : ""} id="payment">
                          <i class="fas fa-globe"></i> Payment
                          <span> Details</span>
                        </li>
                        <li class={step > 3 ? "active" : ""} id="confirm">
                          <i class="fas fa-clipboard"></i> Success
                        </li>
                      </ul>
                      <fieldset
                        id="firsttab"
                        className={
                          showPersonal
                            ? classes.active_panel
                            : classes.hide_panel
                        }
                      >
                        <div class="form-card">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="questiontab-formbox">
                                <div class="row">
                                  <div class="col-xl-12">
                                    <div class="browse_img">
                                      <div class="browse_img_conts_main text-left">
                                        <div class="row">
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="First Name"
                                              name="fname"
                                              helperText={fnameErrorText}
                                              error={fnameErrorText}
                                              onChange={handlechange}
                                              onFocus={handleFocusFname}
                                              value={subscribeData.fname}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <AccountCircleIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Last Name"
                                              name="lname"
                                              helperText={lnameErrorText}
                                              error={lnameErrorText}
                                              onChange={handlechange}
                                              onFocus={handleFocusLname}
                                              value={subscribeData.lname}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <AccountCircleIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Email"
                                              name="email"
                                              helperText={emailErrorText}
                                              error={emailErrorText}
                                              onChange={handleInputChange}
                                              onFocus={handleFocusEmail}
                                              value={subscribeData.email}
                                              onBlur={checkEmailExist}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <EmailIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <div
                                            class="col-md-6 formset-input"
                                            style={{ marginTop: "14px" }}
                                          >
                                            <ReactPhoneInput
                                              country="us"
                                              onlyCountries={["us", "ca"]}
                                              // name="officephone"
                                              value={subscribeData.officephone}
                                              onChange={handleMobchange}
                                            />
                                            <p
                                              class="MuiFormHelperText-root Mui-error"
                                              style={{
                                                color: "red",
                                                marginleft: "10px",
                                              }}
                                            >
                                              {phoneErrorText}
                                            </p>
                                            {/* <TextField
                                                                                            fullWidth
                                                                                            label="Phone"
                                                                                            name="officephone"
                                                                                            helperText={phoneErrorText}
                                                                                            error={phoneErrorText}
                                                                                            onChange={handlePhoneChange}
                                                                                            onFocus={handleFocusPhone}
                                                                                            value={subscribeData.officephone}
                                                                                            inputProps={{
                                                                                                maxLength: 10,
                                                                                            }}
                                                                                            InputProps={{
                                                                                                startAdornment: (
                                                                                                    <InputAdornment position="start">
                                                                                                        <PhoneIcon />
                                                                                                    </InputAdornment>
                                                                                                ),
                                                                                            }}
                                                                                        /> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="btn-question">
                                      <a
                                        class="let_start"
                                        onClick={() => {
                                          goToAddress();
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
                          showAddress
                            ? classes.active_panel
                            : classes.hide_panel
                        }
                      >
                        <div class="form-card">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="questiontab-formbox">
                                <div class="row">
                                  <div class="col-xl-12">
                                    <div class="browse_img">
                                      <div class="browse_img_conts_main text-left">
                                        <div class="row">
                                          <div
                                            style={{ marginLeft: "-7px" }}
                                            class="col-md-6 formset-input"
                                          >
                                            <FormControl
                                              className={classes.formControl}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                Country
                                              </InputLabel>
                                              <Select
                                                helperText={countryErrorText}
                                                error={countryErrorText}
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                name="countryid"
                                                id="demo-simple-select"
                                                value={subscribeData.countryid}
                                                onChange={handleInputChange}
                                                onFocus={handleFocusCountry}
                                              >
                                                {allCountries.map((res) => (
                                                  <MenuItem value={res.id}>
                                                    {res.name}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                            <p
                                              class="MuiFormHelperText-root Mui-error"
                                              style={{
                                                color: "red",
                                                marginleft: "10px",
                                              }}
                                            >
                                              {countryErrorText}
                                            </p>
                                          </div>
                                          <div class="col-md-6 formset-input">
                                            <FormControl
                                              className={classes.formControl}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                State
                                              </InputLabel>
                                              <Select
                                                // helperText={stateErrorText}
                                                // error={stateErrorText}
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                name="stateid"
                                                id="demo-simple-select"
                                                value={subscribeData.stateid}
                                                onChange={handleInputChange}
                                                onFocus={handleFocusState}
                                              >
                                                <MenuItem value="0">
                                                  Select State
                                                </MenuItem>
                                                {allStates.map((res) => (
                                                  <MenuItem value={res.id}>
                                                    {res.name}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                            <p
                                              class="MuiFormHelperText-root Mui-error"
                                              style={{
                                                marginLeft: "10px",
                                                color: "#f44336",
                                              }}
                                            >
                                              {stateErrorText}
                                            </p>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="City"
                                              name="city"
                                              helperText={cityErrorText}
                                              error={cityErrorText}
                                              onChange={handlechange}
                                              onFocus={handleFocusCity}
                                              value={subscribeData.city}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <LocationCityIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Zip"
                                              name="zipcode"
                                              helperText={zipErrorText}
                                              error={zipErrorText}
                                              onChange={handlePhoneChange}
                                              value={subscribeData.zipcode}
                                              onFocus={handleFocusZip}
                                              inputProps={{
                                                maxLength: 6,
                                              }}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PinDropIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-md-12 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Address"
                                              name="address"
                                              onChange={handleInputChange}
                                              value={subscribeData.address}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <HomeIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="btn-question">
                                      <a
                                        class="let_start"
                                        onClick={() => {
                                          goBackToPersonal();
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
                                          goToPayment();
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
                          showPayment
                            ? classes.active_panel
                            : classes.hide_panel
                        }
                      >
                        <div class="form-card">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="questiontab-formbox">
                                <div class="row">
                                  <div class="col-xl-12">
                                    <div class="browse_img">
                                      <div class="browse_img_conts_main text-left">
                                        <div class="payment-mastercard">
                                          <img src={credit_card_logo} alt="" />
                                        </div>
                                        <div class="row">
                                          <h6
                                            style={{
                                              margin: "0 auto",
                                              marginBottom: "30px",
                                              color: "red",
                                            }}
                                          >
                                            {message}
                                          </h6>
                                        </div>
                                        <div class="row">
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Credit Card Number"
                                              name="cc_no"
                                              helperText={ccnoErrorText}
                                              error={ccnoErrorText}
                                              onChange={
                                                handlePaymentCardNoChange
                                              }
                                              onFocus={handleFocusCcno}
                                              value={subscribeData.cc_no}
                                              inputProps={{
                                                maxLength: 22,
                                              }}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <CreditCardIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <div class="col-md-6 formset-input">
                                            <TextField
                                              fullWidth
                                              label="Cvv"
                                              name="cvv"
                                              helperText={cvvErrorText}
                                              error={cvvErrorText}
                                              onChange={handlePhoneChange}
                                              onFocus={handleFocusCvv}
                                              value={subscribeData.cvv}
                                              inputProps={{
                                                maxLength: 3,
                                              }}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <CreditCardIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div
                                            class="col-md-3 formset-input"
                                            style={{ marginLeft: "-7px" }}
                                          >
                                            <FormControl
                                              className={classes.formControl}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                Month
                                              </InputLabel>
                                              <Select
                                                helperText={monthErrorText}
                                                error={monthErrorText}
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                name="cc_month"
                                                id="demo-simple-select"
                                                value={subscribeData.cc_month}
                                                onChange={handleInputChange}
                                              >
                                                <MenuItem value="0">
                                                  Select Month
                                                </MenuItem>
                                                <MenuItem value="01">
                                                  January
                                                </MenuItem>
                                                <MenuItem value="02">
                                                  February
                                                </MenuItem>
                                                <MenuItem value="03">
                                                  March
                                                </MenuItem>
                                                <MenuItem value="04">
                                                  April
                                                </MenuItem>
                                                <MenuItem value="05">
                                                  May
                                                </MenuItem>
                                                <MenuItem value="06">
                                                  June
                                                </MenuItem>
                                                <MenuItem value="07">
                                                  July
                                                </MenuItem>
                                                <MenuItem value="08">
                                                  August
                                                </MenuItem>
                                                <MenuItem value="09">
                                                  September
                                                </MenuItem>
                                                <MenuItem value="10">
                                                  October
                                                </MenuItem>
                                                <MenuItem value="11">
                                                  November
                                                </MenuItem>
                                                <MenuItem value="12">
                                                  December
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                            <p
                                              class="MuiFormHelperText-root Mui-error"
                                              style={{
                                                marginLeft: "10px",
                                                color: "#f44336",
                                              }}
                                            >
                                              {monthErrorText}
                                            </p>
                                          </div>
                                          <div
                                            class="col-md-3 formset-input"
                                            style={{ marginLeft: "-7px" }}
                                          >
                                            <FormControl
                                              className={classes.formControl}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                Year
                                              </InputLabel>
                                              <Select
                                                helperText={yearErrorText}
                                                error={yearErrorText}
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                name="cc_year"
                                                id="demo-simple-select"
                                                value={subscribeData.cc_year}
                                                onChange={handleInputChange}
                                              >
                                                <MenuItem value="0">
                                                  Select Year
                                                </MenuItem>
                                                <MenuItem value="2022">
                                                  2022
                                                </MenuItem>
                                                <MenuItem value="2023">
                                                  2023
                                                </MenuItem>
                                                <MenuItem value="2024">
                                                  2024
                                                </MenuItem>
                                                <MenuItem value="2025">
                                                  2025
                                                </MenuItem>
                                                <MenuItem value="2026">
                                                  2026
                                                </MenuItem>
                                                <MenuItem value="2027">
                                                  2027
                                                </MenuItem>
                                                <MenuItem value="2028">
                                                  2028
                                                </MenuItem>
                                                <MenuItem value="2029">
                                                  2029
                                                </MenuItem>
                                                <MenuItem value="2030">
                                                  2030
                                                </MenuItem>
                                                <MenuItem value="2031">
                                                  2031
                                                </MenuItem>
                                                <MenuItem value="2032">
                                                  2032
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                            <p
                                              class="MuiFormHelperText-root Mui-error"
                                              style={{
                                                marginLeft: "10px",
                                                color: "#f44336",
                                              }}
                                            >
                                              {yearErrorText}
                                            </p>
                                          </div>
                                          <div class="col-md-12 col-lg-12 formbox1">
                                            <h6>
                                              Your Current Subscription Plan :
                                              <b>
                                                ({subscribePlan} : $
                                                {subscribeAmount})
                                              </b>
                                            </h6>
                                            {/* <Captcha
                                                                                            onChange={status => setCaptchaSuccess(status)}
                                                                                        /> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="btn-question">
                                      <a
                                        class="let_start"
                                        onClick={() => {
                                          goBackToAddress();
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
                                          goToSuccess();
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
                          showSuccess
                            ? classes.active_panel
                            : classes.hide_panel
                        }
                      >
                        <div class="form-card">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="questiontab-formbox">
                                <div class="row">
                                  <div class="col-xl-12">
                                    <div class="browse_img">
                                      <div class="browse_img_conts_main text-left">
                                        <div class="row">
                                          <div class="col-md-12 success-msg-popup">
                                            <i class="fad fa-check-circle"></i>
                                            <hr class="spacer20px" />
                                            <h2>Congratulations</h2>
                                            <p>
                                              You Have Successfully Signed Up
                                            </p>
                                            <p>
                                              Please check your mail for Login
                                              Credentials
                                            </p>
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
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </section>
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
      <a
        onClick={handleScroll}
        id="return-to-top"
        class="bounce"
        style={{ display: "block", cursor: "pointer" }}
      >
        <i class="fas fa-angle-double-up"></i>
      </a>
    </div>
  );
}
