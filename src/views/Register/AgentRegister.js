import React, { useEffect, useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import try_img from "../../images/try-img.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import Footer from "../../components/Footer/Footer";
import "react-phone-input-2/lib/material.css";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import Captcha from "react-numeric-captcha";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PinDropIcon from "@material-ui/icons/PinDrop";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import { APIURL, APIPath, fetchAllRecords } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import Footer1 from "../../components/Footer/Footer1";
const APIRegister = APIURL() + "register-agent";
const APIGetCountries = APIURL() + "get-countries";
const APIGetStates = APIURL() + "get-states";
const APICheckMail = APIURL() + "check-email";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
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
  bullet: {
    display: "inline-block",
    margin: "2px",
    transform: "scale(2)",
    color: "red !important",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));
export default function Register() {
  const initialSubState = {
    authenticate_key: "abcd123XYZ",
    fname: "",
    lname: "",
    email: "",
    address: "",
    stateid: "",
    countryid: 40,
    city: "",
    zipcode: "",
    officephone: "",
    subscription_amount: "",
    inf_id: "",
    subscription_promocode: "",
    expdata: "",
    mycafegallery: "",
    is_inf_card_update: "",
  };
  // const [user, setUser] = useState(initialUserState);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const classes = useStyles();
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [subscribeAmount, setSubscribeAmount] = useState("");
  const [subscribeData, setSubscribeData] = useState(initialSubState);
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

  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ", email: subscribeData.email };
    postRecord(APICheckMail, obj).then((res) => {
      console.log(res);
      if (res.data[0].response.status === "success") {
        setIsEmailExist(false);
      } else {
        setEmailErrorText(res.data[0].response.message);
        setIsEmailExist(true);
      }
    });
  }, [subscribeData.email]);
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
      }
    });
  }, [subscribeData.countryid]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
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
  const handleFocusZip = () => {
    if (subscribeData.zipcode === "") {
      setZipErrorText("Zipcode is required *");
    } else {
      setZipErrorText("");
    }
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
  const handleMobchange = (value) => {
    setSubscribeData({ ...subscribeData, ["officephone"]: value });
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
      }
      else if(isEmailExist){
        setEmailErrorText(
            "Email Already Exists"
          );

      } else {
        setShowPersonal(false);
        setShowAddress(true);
        setStep(2);
        setFnameErrorText("");
        setLnameErrorText("");
        setEmailErrorText("");
        setPhoneErrorText("");
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
      subscribeData.stateid !== "" &&
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
      if (subscribeData.stateid === "") {
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
    if (captchaSuccess === false) {
      setMessage("Please enter a valid captcha code");
      setOpenError(true);
    } else {
      setMessage("Please Wait ....");
      setOpenWarning(true);
      subscribeData.authenticate_key = "abcd123XYZ";
      postRecord(APIRegister, subscribeData).then((res) => {
        if (res.data[0].response.status === "success") {
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
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setOpenWarning(false);
      });
    }
  };

  // const saveUser = () => {
  //     setOpen(true);
  //     postRecord(APIRegister, user)
  //         .then(res => {
  //             if (res.data[0].response.status === "success") {
  //                 setMessage(res.data[0].response.message);
  //                 setOpenSuccess(true);
  //             }
  //             else {
  //                 setMessage(res.data[0].response.message);
  //                 setOpenError(true);
  //             }
  //             setOpen(false);
  //         })
  //         .catch(err => {
  //             setOpen(false);
  //         });
  // }

  return (
    <div>
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
                  <button class="trigger">
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
          <img src={banner} alt="" title="" />
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>Agent SignUp</h2>
              <h5>Our Story… One Day at a Time!</h5>
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
                        <a href="#">Agent SignUp</a>
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
                          <a href="#">
                            <i class="far fa-envelope"></i>
                            Support@VirtualTourCafe.com
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fas fa-phone-alt"></i>(877) 744-8285 /
                            (925) 609-2408
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="head_cont_right">
                      <ul>
                        <li>
                          <Link
                            to={APIPath() + "appointment"}
                            class="login_btn"
                          >
                            <i class="fal fa-book"></i>Schedule Your Appointment
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
                  <div class="head_sec_menu">
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
                            <li>
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
      <section class="agent_sign_up">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 mx-auto">
              <section class="property_info toggle_sec agent-registerpage">
                <form id="msform">
                  <ul id="progressbar">
                    <li class="active" id="account">
                      <i class="far fa-images"></i> Personal Details
                    </li>
                    <li class={step > 1 ? "active" : ""} id="personal">
                      <i class="fas fa-pen"></i> Address Details
                    </li>
                    <li class={step > 2 ? "active" : ""} id="payment">
                      <i class="fas fa-globe"></i> Miscellaneous
                    </li>
                    <li class={step > 3 ? "active" : ""} id="confirm">
                      <i class="fas fa-clipboard"></i> Success
                    </li>
                  </ul>
                  <fieldset
                    id="firsttab"
                    className={
                      showPersonal ? classes.active_panel : classes.hide_panel
                    }
                  >
                    <div class="form-card">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="questiontab-formbox">
                            <div class="row">
                              <div class="col-xl-12">
                                <div class="agentregister-boxshadow">
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
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <EmailIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                        </div>
                                        <div class="col-md-6 formset-input abc">
                                          <ReactPhoneInput
                                            country="us"
                                            onlyCountries={["us"]}
                                            value={subscribeData.officephone}
                                            onChange={handleMobchange}
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
                      showAddress ? classes.active_panel : classes.hide_panel
                    }
                  >
                    <div class="form-card">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="questiontab-formbox">
                            <div class="row">
                              <div class="col-xl-12">
                                <div class="agentregister-boxshadow">
                                  <div class="browse_img">
                                    <div class="browse_img_conts_main text-left">
                                      <div class="row">
                                        <div class="col-md-6 formset-input">
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
                                            >
                                              {allCountries.map((res) => (
                                                <MenuItem value={res.id}>
                                                  {res.name}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </div>
                                        <div class="col-md-6 formset-input">
                                          <FormControl
                                            className={classes.formControl}
                                          >
                                            <InputLabel id="demo-simple-select-label">
                                              State
                                            </InputLabel>
                                            <Select
                                              helperText={stateErrorText}
                                              error={stateErrorText}
                                              fullWidth
                                              labelId="demo-simple-select-label"
                                              name="stateid"
                                              id="demo-simple-select"
                                              value={subscribeData.stateid}
                                              onChange={handleInputChange}
                                            >
                                              <MenuItem value="">
                                                Select State
                                              </MenuItem>
                                              {allStates.map((res) => (
                                                <MenuItem value={res.id}>
                                                  {res.name}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
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
                      showPayment ? classes.active_panel : classes.hide_panel
                    }
                  >
                    <div class="form-card">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="questiontab-formbox">
                            <div class="row">
                              <div class="col-xl-12">
                                <div class="agentregister-boxshadow">
                                  <div class="browse_img">
                                    <div class="browse_img_conts_main text-left">
                                      <div class="row">
                                        <div class="col-md-6 formset-input">
                                          <TextField
                                            fullWidth
                                            label="Promotional Code"
                                            name="subscription_promocode"
                                            onChange={handlePhoneChange}
                                            value={
                                              subscribeData.subscription_promocode
                                            }
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
                                            label="Referral Code"
                                            name="cvv"
                                            onChange={handlePhoneChange}
                                            value={subscribeData.cvv}
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
                                        <div class="col-md-12 col-lg-12 formbox1">
                                          <Captcha
                                            onChange={(status) =>
                                              setCaptchaSuccess(status)
                                            }
                                          />
                                        </div>
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
                      showSuccess ? classes.active_panel : classes.hide_panel
                    }
                  >
                    <div class="form-card">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="questiontab-formbox">
                            <div class="row">
                              <div class="col-xl-12">
                                <div class="agentregister-boxshadow">
                                  <div class="browse_img">
                                    <div class="browse_img_conts_main text-left">
                                      <div class="row">
                                        <div class="col-md-12 success-msg-popup">
                                          <i class="fad fa-check-circle"></i>
                                          <hr class="spacer20px" />
                                          <h2>Congratulations</h2>
                                          <p>
                                            You Free trial has done Successfully
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
                    </div>
                  </fieldset>
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="agent_sign_up">
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        saveUser();
                    }}
                >
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="agent_sign_up_main">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>First Name</label>
                                                <div class="align_center">
                                                    <input type="text" name="fname" value={user.fname}
                                                        onChange={handleInputChange} placeholder="First Name" helper />
                                                    <span class="agent_icn"><i class="fa fa-user"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>Last Name</label>
                                                <div class="align_center">
                                                    <input type="text" name="lname" value={user.lname} onChange={handleInputChange} placeholder="Last Name" />
                                                    <span class="agent_icn"><i class="fa fa-user"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>Email</label>
                                                <div class="align_center">
                                                    <input type="text" name="email" value={user.email} onChange={handleEmailchange} placeholder="Email" />
                                                    <span class="agent_icn"><i class="fa fa-envelope"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>Phone</label>
                                                <div class="align_center">
                                                    <input type="text" name="officephone" value={user.officephone} onChange={handlePhoneChange} placeholder="Phone" maxLength="10" />
                                                    <span class="agent_icn"><i class="fa fa-phone"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>Country</label>
                                                <div class="align_center">
                                                    <select name="countryid" value={user.countryid} onChange={handleInputChange}>
                                                        <option value="0">Select Country</option>
                                                        {allCountries.map(res => (
                                                            <option value={res.id}>{res.name}</option>
                                                        ))}
                                                    </select>
                                                    <span class="agent_icn"><i class="fa fa-globe"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>Zip</label>
                                                <div class="align_center">
                                                    <input type="text" name="zipcode" value={user.zipcode} onChange={handlePhoneChange} placeholder="Zip" maxLength="6" />
                                                    <span class="agent_icn"><i class="fa fa-map-marker"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>State</label>
                                                <div class="align_center">
                                                    <select name="stateid" value={user.stateid} onChange={handleInputChange}>
                                                        <option value="0">Select State</option>
                                                        {allStates && allStates.map(res => (
                                                            <option value={res.id}>{res.name}</option>
                                                        ))}
                                                    </select>
                                                    <span class="agent_icn"><i class="fa fa-flag"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="agent_sign_up_single">
                                                <label>City</label>
                                                <div class="align_center">
                                                    <input type="text" name="city" value={user.city} onChange={handleInputChange} placeholder="City" />
                                                    <span class="agent_icn"><i class="fa fa-map-marker"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-md-12">
                                            <div class="agent_sign_up_single">
                                                <label>Address</label>
                                                <div class="align_center">
                                                    <textarea rows="3" name="address" value={user.address} onChange={handleEmailchange} placeholder="Address"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="misc_main">
                                    <div class="misc_head">
                                        <h3>Misc</h3>
                                    </div>
                                    <div class="agent_sign_up_main">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6">
                                                <div class="agent_sign_up_single">
                                                    <label>Promotional Code</label>
                                                    <div class="align_center">
                                                        <input type="text" name="" placeholder="Promotional Code" />
                                                        <span class="agent_icn"><i class="fas fa-tag"></i></span>
                                                    </div>
                                                </div>
                                                <div class="agent_sign_up_single">
                                                    <label>Verificcation Code</label>
                                                    <div class="align_center">
                                                        <input type="text" name="" placeholder="Verificcation Code" />
                                                        <span class="agent_icn"><i class="fas fa-tag"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="agent_sign_up_single">
                                                    <label>Referral Code</label>
                                                    <div class="align_center">
                                                        <input type="text" name="" placeholder="Referral Code" />
                                                        <span class="agent_icn"><i class="fas fa-tag"></i></span>
                                                    </div>
                                                </div>
                                                <div class="agent_sign_up_single">
                                                    <label>Get Code</label>
                                                    <div class="align_center">
                                                        <input type="text" name="" placeholder="Get Code" />
                                                        <span class="agent_icn"><i class="fas fa-tag"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 text-center">
                                <button style={{ border: "#ffa124" }} type="submit" class="need_pic save_btn">Submit<i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </form>

            </section> */}
      <div class="ftr_get">
        <Footer1 />
        <Footer />
      </div>
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
