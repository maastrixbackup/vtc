import React, { useEffect, useState, useContext } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import try_img from "../../images/try-img.jpg";
import graphic_img from "../../images/graphic3.svg";
import Snackbar from "@material-ui/core/Snackbar";
import Footer from "../../components/Footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthBar from "react-password-strength-bar";
import PasswordChecklist from "react-password-checklist";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath, fetchAllRecords } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import Footer1 from "../../components/Footer/Footer1";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIRegister = APIURL() + "registration";
const APILogin = APIURL() + "agent-login";
const APIForgotPwd = APIURL() + "forgotpassword";
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
  btn_pwd: {
    float: "right",
    top: "-50px",
  },
}));
export default function Register(props) {
  const initialUserState = {
    authenticate_key: "abcd123XYZ",
    fname: "",
    lname: "",
    email: "",
    officephone: "",
    password: "",
    password_register: "",
    confirm_pwd: "",
    user_type: "1",
  };
  const initialuserlogin = {
    authenticate_key: "abcd123XYZ",    
    username: "",
    password: "",
    user_type: "1",
  };
  const initialForgotmailState = {
    authenticate_key: "abcd123XYZ",
    email: "",
  };
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(initialUserState);
  const [userlogin, setUserlogin] = useState(initialuserlogin);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);
  const [validPwd, setValidPwd] = useState("");
  const [pwd, setPwd] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pwdtooltip, setPwdtooltip] = useState(false);
  const [open, setOpen] = useState(false);
  const [ddlOccupation, setDdlOccupation] = useState([]);
  const [captcha, setCaptcha] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [forgottenmail, setForgottenmail] = useState(initialForgotmailState);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [data, setData] = useState({});
  const [loginTab, setLoginTab] = useState(false);
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
    setTimeout(() => {
      setUser(initialUserState);
    }, 5000);
  }, []);
  //  useEffect(() => {
  //     if (props.location.search === "?login") {
  //         setLoginTab(true);
  //     }
  // }, [props.location.search]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
    setOpenModal(false);
  };
  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    setForgottenmail({ ...forgottenmail, [name]: value });
  };
  function onChange(value) {
    setCaptcha(true);
  }
  // useEffect(() => {
  //     const obj = { authenticate_key: "abcd123XYZ" };
  //     postRecord(APIGetOccupation, obj)
  //         .then(res => {
  //             if (res.data[0].response.status === "success") {
  //                 console.log(res.data[0].response.data);
  //                 setDdlOccupation(res.data[0].response.data);
  //             }
  //             else {
  //                 setDdlOccupation([]);
  //             }
  //         })
  // }, [])
  const handlechangeLogin = (event) => {
    const { name, value } = event.target;
    setUserlogin({ ...userlogin, [name]: value });
  };
  const handlechange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handleEmailchange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value.replace(/\D/g, "") });
  };
  const handleMobchange = (value) => {
    setUser({ ...user, ["officephone"]: value });
  };

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleInputChangeforPassword = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    var passwordChk =
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9](?!.*\s).{7,20})$/;
    if (value.length >= 8 && passwordChk.test(value)) {
      setPwd(true);
      setPwdtooltip(false);
    } else {
      setPwdtooltip(true);
      setPwd(false);
    }
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };
  const handleClickShowPasswordOne = () => {
    setUser({ ...user, showPasswordOne: !user.showPasswordOne });
  };
  const handleClickShowPasswordTwo = () => {
    setUser({ ...user, showPasswordTwo: !user.showPasswordTwo });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onlyNumbers = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
  };
  const saveUser = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(user.email)) {
      setMessage("Please enter valid email address. eg. xyz@example.com");
      setOpenError(true);
      return null;
    }
    if (validPwd === false) {
      setMessage("Password Policy doesnot march.");
      setOpenWarning(true);
    } else {
      setOpen(true);
      postRecord(APIRegister, user)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            setMessage("Registered Successfully ....");
            setOpenSuccess(true);
            setUser(initialUserState);
            return {
              user: JSON.stringify(res.data[0].response.data),
              token: JSON.stringify(res.data[0].response.data),
            };
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
            setOpen(false);
            throw res;
          }
        })
        .then((resJson) => {
          if (resJson.user && resJson.token) {
            dispatch({
              type: "LOGIN",
              payload: resJson,
            });
            setOpen(false);
            props.location.search !== ""
              ? history.push(
                  APIPath() +
                    props.location.search.replace("?ReturnURL=", "") +
                    "/?auth"
                )
              : history.push(APIPath() + "agent-dashboard");
          } else {
            setMessage("Login Failed! Try again");
            setOpenError(true);
            setOpen(false);
          }
        });
    }
  };
  const handleLogin = () => {
    if (captcha === false) {
      setMessage("Please verify Captcha");
      setOpenError(true);
    } else {
      setOpen(true);
      postRecord(APILogin, userlogin)
        .then((res) => {
          if (res.data[0].response.status === "success") {
            return {
              user: JSON.stringify(res.data[0].response.data),
              token: JSON.stringify(res.data[0].response.data),
            };
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
            setOpen(false);
            throw res;
          }
        })
        .then((resJson) => {
          if (resJson.user && resJson.token) {
            dispatch({
              type: "LOGIN",
              payload: resJson,
            });
            setOpen(false);
            props.location.search !== ""
              ? history.push(
                  APIPath() +
                    props.location.search.replace("?ReturnURL=", "") +
                    "/?auth"
                )
              : history.push(APIPath() + "agent-dashboard");
          } else {
            setMessage("Login Failed! Try again");
            setOpenError(true);
            setOpen(false);
          }
        });
    }
  };
  const sendForgotMail = (data) => {
    setOpenModal(false);
    if (data.email === "") {
      setMessage("Please enter email id");
      setOpenWarning(true);
    } else {
      setOpen(true);
      postRecord(APIForgotPwd, data)
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
        .catch((err) => {});
    }
  };
  function alphaOnly(event) {
    var key = event.keyCode;
    return (key >= 65 && key <= 90) || key == 8;
  }
  console.log(userlogin);

  return (
    <div>
      <section class="home_page">
        {/* <div class="mobile_on mobile_slide">
                    <div class="mob_head">
                        <div class="hm_logo">
                            <Link to={APIPath()}>
                                <img src={Logo} alt="Logo" title="Logo" />
                            </Link>
                        </div>
                        <div class="">
                            <div class="gee_mobile">
                                <button class="gee_hamburger">&#9776;</button>
                                <button class="gee_cross">&#735;</button>
                            </div>
                        </div>
                    </div>
                    <div class="gee_menu">
                        <ul>
                            <li>
                                <Link to={APIPath() + "login"}>Login</Link>
                            </li>
                            <li>
                                <Link to={APIPath() + "register"}>Register</Link>
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
                                <Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
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
                                <Link to={APIPath() + "faq"}>Faq</Link>
                            </li>
                        </ul>
                    </div>
                </div> */}
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
              <h2>Login/Register</h2>
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
                        <a href="#">Login/Register</a>
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
                          <a href="#">
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
      <section class="login_reg_page">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="login_reg_page_main">
                <div class="row">
                  <div class="col-lg-6 col-md-6 padd_rgt">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleLogin();
                      }}
                    >
                      <div class="login_reg_page_left">
                        <div class="login_reg_page_left_head">
                          <h2>Login</h2>
                        </div>
                        <div class="login_reg_page_left_cont">
                          <div class="input-block ">
                            <i class="icon far fa-envelope"></i>
                            <input
                              type="text"
                              onChange={handlechangeLogin}
                              name="username"
                              value={userlogin.username}
                              id="input-text2"
                              spellcheck="false"
                              required
                            />
                            <span class="placeholder">Username or email</span>
                          </div>
                          <hr class="spacer20px" />
                          <div class="input-block">
                            <input
                              type={user.showPassword ? "text" : "password"}
                              id="input-text"
                              onChange={handlechangeLogin}
                              name="password"
                              value={userlogin.password}
                              spellcheck="false"
                            />
                            <span class="placeholder">Password</span>
                            <IconButton
                              className={classes.btn_pwd}
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {user.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </div>
                          <hr class="spacer10px" />
                        </div>
                        {/* 6LfOR3kgAAAAAN7f4zcHQQTUrXNpbDMc6vUA0Ka_ */}

                        {/* 6LfUR3kgAAAAAIqP4h16I5W6EbweU_7zIDvBNyUq */}
                        <ReCAPTCHA
                          sitekey="6LfHSiwgAAAAAAHtot668mAzqqmXqcre4wXdHbf-"
                          onChange={onChange}
                        />
                        <div class="login_reg_page_left_forget">
                          {/* <div class="remember_check">
                                                                <label class="remember">Remember Me
                                                                    <input type="checkbox" />
                                                                    <span class="checkmark"></span>
                                                                </label>
                                                            </div> */}
                          <div class="lost_passowrd">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              Lost your password?
                            </a>
                          </div>
                        </div>
                        <div class="login_btn">
                          <input type="submit" name="" value="Login" />
                        </div>
                      </div>
                    </form>
                    <div class="try_it_us_main mt-3">
                      <div class="try_it_us_left mb-3">
                        <div class="try_it_us_left_img">
                          <img src={try_img} alt="" title="" />
                        </div>
                        <div class="try_it_us_left_cont">
                          <h4>Try It Free</h4>
                          <h5>
                            WOW Your Clients, Win Listings and Gain New Buyers
                            with Responsive Design Virtual Tours, Flyers and
                            Video!
                          </h5>
                        </div>
                      </div>
                      <div class="try_it_us_right">
                        <Link to={APIPath() + "agent-register"}>
                          Start My Free Trial Now!
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 padd_rgt">
                    <div class="login_reg_page_left">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveUser();
                        }}
                        autoComplete="off"
                      >
                        <div class="login_reg_page_left_head">
                          <h2>Register</h2>
                        </div>
                        <div class="login_reg_page_left_cont">
                          <div class="input-block ">
                            <i class="icon fa fa-user"></i>
                            <input
                              type="text"
                              name="fname"
                              value={user.fname}
                              onChange={handlechange}
                              id="input-text41"
                              required
                              spellcheck="false"
                            />
                            <span class="placeholder">First Name</span>
                          </div>
                          <hr class="spacer20px" />
                          <div class="input-block ">
                            <i class="icon fa fa-user"></i>
                            <input
                              type="text"
                              name="lname"
                              value={user.lname}
                              onChange={handlechange}
                              id="input-text41"
                              required
                              spellcheck="false"
                            />
                            <span class="placeholder">Last Name</span>
                          </div>
                          <hr class="spacer20px" />
                          <div class="input-block ">
                            <i class="icon fa fa-user"></i>
                            <input
                              type="text"
                              name="email"
                              value={user.email}
                              onChange={handleEmailchange}
                              id="input-text41"
                              required
                              spellcheck="false"
                            />
                            <span class="placeholder">Email</span>
                          </div>
                          {/* <div class="input-block "><i class="icon far fa-envelope"></i>
                                                                <input type="text" onChange={handleEmailchange} name="email" value={user.email} id="input-text2" spellcheck="false" />
                                                                <span class="placeholder">email</span>
                                                            </div> */}

                          <hr class="spacer20px" />

                          <div class="input-block ">
                            <i class="icon fa fa-phone"></i>
                            <ReactPhoneInput
                              country="us"
                              onlyCountries={["us"]}
                              value={user.officephone}
                              onChange={handleMobchange}
                            />
                            {/* <input type="text" name="officephone" value={user.officephone} onChange={handlePhoneChange} id="phone" required spellcheck="false" onInput={e => onlyNumbers(e)} /> */}
                            {/* <span class="placeholder">Phone</span> */}
                          </div>
                          <hr class="spacer20px" />
                          <div class="input-block ">
                            <input
                              type={user.showPasswordTwo ? "text" : "password"}
                              name="password_register"
                              value={user.password_register}
                              onChange={handleInputChangeforPassword}
                              id="input-text6"
                              required
                              spellcheck="false"
                            />
                            <span class="placeholder">Password</span>
                            <IconButton
                              className={classes.btn_pwd}
                              onClick={handleClickShowPasswordTwo}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {user.showPasswordTwo ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </div>
                          <PasswordStrengthBar
                            password={user.password_register}
                          />
                          <hr class="spacer20px" />
                          <div class="input-block ">
                            <input
                              type={user.showPasswordOne ? "text" : "password"}
                              name="confirm_pwd"
                              value={user.confirm_pwd}
                              onChange={handleInputChangeforPassword}
                              id="input-text7"
                              required
                              spellcheck="false"
                            />
                            <span class="placeholder">Confirm Password</span>
                            <IconButton
                              className={classes.btn_pwd}
                              onClick={handleClickShowPasswordOne}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {user.showPasswordOne ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </div>
                          <PasswordStrengthBar password={user.confirm_pwd} />
                          <PasswordChecklist
                            rules={[
                              "minLength",
                              "specialChar",
                              "number",
                              "capital",
                              "match",
                            ]}
                            minLength={5}
                            value={user.password_register}
                            valueAgain={user.confirm_pwd}
                            onChange={(isValid) => {
                              if (isValid) {
                                setValidPwd(true);
                              } else {
                                setValidPwd(false);
                              }
                            }}
                          />
                          <hr class="spacer20px" />
                        </div>
                        <div class="login_btn">
                          <input type="submit" name="" value="Register" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="try_it_us">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12"></div>
          </div>
        </div>
      </section>
      <div class="ftr_get">
        {/* <section class="get_in_touch">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="get_in_touch_main">
                                    <div class="get_in_touch_left">
                                        <div class="get_in_touch_left_head">
                                            <h2>Lets Get In Touch</h2>
                                        </div>
                                        <div class="get_in_touch_left_conts">
                                            <ul>
                                                <li><i class="fas fa-map-marked-alt"></i>6200 Stoneridge Mall Rd, Suite 300 Pleasanton CA 94588</li>
                                                <li><i class="fas fa-envelope"></i>support@VirtualTourCafe.com</li>
                                                <li><i class="fas fa-phone-square-alt"></i>(877) 744-8285 / (925) 609-2408, 925-609-2408</li>
                                            </ul>
                                        </div>
                                        <div class="get_start_now">
                                            <h4>Get Started Now</h4>
                                            <ul class="btns_pics">
                                                <li>
                                                    <Link to={APIPath() + "appointment"} class="need_pic">I Need Photos<i class="fas fa-arrow-right"></i></Link>
                                                </li>
                                                <li>
                                                    <Link to={APIPath() + "agent"} class="need_pic">I Have Photos<i class="fas fa-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="get_in_touch_right">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.013383949486!2d-121.92670638484266!3d37.69588472446775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fec0ad5427675%3A0xd52511e0d357c742!2s6200%20Stoneridge%20Mall%20Rd%2C%20Pleasanton%2C%20CA%2094588%2C%20USA!5e0!3m2!1sen!2sin!4v1628112704757!5m2!1sen!2sin" width="100%" height="400" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
        <Footer1></Footer1>
        <Footer />
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Forgot Password
        </DialogTitle>
        <DialogContent dividers>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              //if (user.password !== user.conf_password) return;
              sendForgotMail(forgottenmail);
            }}
          >
            <div class="input-block">
              <i class="icon far fa-envelope"></i>
              <input
                type="text"
                id="input-text2"
                required
                spellcheck="false"
                onChange={handleEmailChange}
                name="email"
                value={forgottenmail.email}
              />
              <span class="placeholder">Enter Your Email</span>
            </div>
            <hr class="spacer30px"></hr>
            <Button
              style={{ float: "right" }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Send Link
            </Button>
          </form>
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
    </div>
  );
}
