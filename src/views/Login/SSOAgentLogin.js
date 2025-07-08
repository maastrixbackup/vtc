// File: SSOAgentLogin.jsx
import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { useParams, Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import Footer from "../../components/Footer/Footer";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
import { AuthContext } from "../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";

const APILogin = APIURL() + "agent-login";

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

export default function SSOAgentLogin(props) {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const metaCtx = MetaInfo();

  const [user, setUser] = useState({
    authenticate_key: "abcd123XYZ",
    username: "",
    password: "",
    user_type: "agent",
    showPassword: false,
  });
  const [captcha, setCaptcha] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 18,
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

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function onCaptchaChange(value) {
    setCaptcha(true);
  }

  const handleLogin = () => {
    if (!captcha) {
      setMessage("Please verify Captcha");
      setOpenError(true);
      return;
    }
    setOpen(true);
    postRecord(APILogin, user)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          dispatch({
            type: "LOGIN",
            payload: {
              user: JSON.stringify(res.data[0].response.data),
              token: JSON.stringify(res.data[0].response.data),
            },
          });
          history.push(APIPath() + "agent-dashboard");
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
        setOpen(false);
      })
      .catch(() => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
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
  return (
    <div>
      <Title title="SSO Agent Login" />
      <section class="home_page">
        <div class="mobile_on mobile_slide">
          <div class="mob_head">
            <div class="hm_logo">
              <Link to={APIPath()}>
                <img src={Logo} alt="Logo" title="Logo" />
              </Link>
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
          <img src={banner} alt="" title="" />
          <div class="inner_banner_cont">
            <div class="inner_banner_cont_sec">
              <h2>SSO-Agent Login</h2>
              <h5>Our Story… One Day at a Time!</h5>
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
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleLogin();
                      }}
                    >
                      <div class="login-box-right">
                        <h3 class="text-center">Login as SSO-Agent</h3>
                        <ul>
                          <li>
                            <div class="input-block">
                              <input
                                type="text"
                                name="username"
                                placeholder="Enter Your Username"
                                required
                                onChange={handleInputchange}
                                value={user.username}
                              />
                            </div>
                          </li>
                          <li>
                            <div class="input-block">
                              <input
                                type={user.showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Your Password"
                                required
                                onChange={handleInputchange}
                                value={user.password}
                              />
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
                          </li>
                          <li>
                            <ReCAPTCHA
                              sitekey="6LfHSiwgAAAAAAHtot668mAzqqmXqcre4wXdHbf-"
                              onChange={onCaptchaChange}
                            />
                          </li>
                          <li>
                            <div class="row align-items-center">
                              <div class="col-md-12">
                                <button
                                  type="submit"
                                  class="have_pics login_btn_new"
                                >
                                  Login <i class="fas fa-arrow-right"></i>
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-6">
                    <div class="login-box-left">
                      <span>
                        <img src={Logo} alt="logo" />
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
      >
        <Alert onClose={() => setOpenError(false)} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
