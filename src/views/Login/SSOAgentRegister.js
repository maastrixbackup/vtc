// File: SSOAgentRegister.jsx
import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import { useParams, useHistory } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import { Link } from "react-router-dom";
import banner from "../../images/broker-banner.jpg";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import Footer from "../../components/Footer/Footer";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";
import { AuthContext } from "../../CommonMethods/Authentication";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const APIRegister = APIURL() + "genericAgentCreate";
const APICheckAgent = (id) => `${APIURL()}checkGenericAgent/${id}`;
const countryOptions = [
  {
    name: "United States",
    code: 40,
    dialCode: "+1",
    flagUrl: "https://flagcdn.com/us.svg",
  },
  {
    name: "Canada",
    code: 39,
    dialCode: "+1",
    flagUrl: "https://flagcdn.com/ca.svg",
  },
];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SSOAgentRegister() {
  const { listingagentid } = useParams();
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [open, setOpen] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9999,
      color: "#fff",
    },
  }));
  const classes = useStyles();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const [user, setUser] = useState({
    authenticate_key: "abcd123XYZ",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: 40,
    listingagentid,
  });

  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  useEffect(() => {
    const checkAgentAndLogin = async () => {
      try {
        setOpen(true);
        const checkRes = await postRecord(APICheckAgent(listingagentid), {
          authenticate_key: "abcd123XYZ",
        });

        const checkResponse = checkRes?.data?.response;

        if (checkResponse?.status === "success") {
          const { username, password } = checkResponse.data;

          const loginPayload = {
            authenticate_key: "abcd123XYZ",
            user_type: "agent",
            username,
            password,
          };

          const loginRes = await postRecord(
            APIURL() + "agent-login",
            loginPayload
          );
          const loginResponse = loginRes?.data?.[0]?.response;

          if (loginResponse?.status === "success") {
            dispatch({
              type: "LOGIN",
              payload: {
                user: JSON.stringify(loginResponse.data),
                token: JSON.stringify(loginResponse.data),
              },
            });
            history.push(APIPath() + "agent-dashboard");
          } else {
            setSnackbarMsg(checkResponse?.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        } else {
          setSnackbarMsg(checkResponse?.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (error) {
        const backendMessage =
          error?.response?.data?.response?.message || error?.message;

        setSnackbarMsg(backendMessage);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setOpen(false);
      }
    };

    checkAgentAndLogin();
  }, [listingagentid, history, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        pageId: 17,
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const selected = countryOptions.find(
      (c) => c.code.toString() === e.target.value
    );
    if (selected) {
      setSelectedCountry(selected);
      setUser({ ...user, country: selected.code });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);

    const payload = {
      authenticate_key: user.authenticate_key,
      first_name: user.firstname,
      last_name: user.lastname,
      email: user.email,
      phone: user.phone,
      country: user.country,
      listingagentid: user.listingagentid,
    };

    postRecord(APIRegister, payload)
      .then((res) => {
        const response = res?.data?.response;

        if (response?.status === "success") {
          setSnackbarMsg(response?.message);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          history.push(APIPath() + "agent-dashboard");
        } else {
          setSnackbarMsg(response?.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.message ||
          err?.response?.data?.response?.message ||
          err?.message;

        setSnackbarMsg(errorMsg);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
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
      <Title title="Agent Registration" />
      <section className="home_page">
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
        <div className="home_page_banner inner_banner">
          <img src={banner} alt="" title="" />
          <div className="inner_banner_cont">
            <div className="inner_banner_cont_sec">
              <h2>Space Coast - Agent Register</h2>
              <h5>Complete Your Details Below</h5>
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
                        <a href="#">Login</a>
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
      <section className="login_sec_page">
        <div className="container">
          <div className="row">
            <div className="col-lg-1- col-md-12 mx-auto">
              <div className="login-box">
                <div className="row">
                  <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                      <div className="login-box-right">
                        <h3 className="text-center">
                          Space Coast - Agent Register
                        </h3>
                        <ul>
                          <li>
                            <div className="input-block">
                              <input
                                type="text"
                                name="firstname"
                                required
                                placeholder="First Name"
                                onChange={handleChange}
                                value={user.firstname}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="input-block">
                              <input
                                type="text"
                                name="lastname"
                                required
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={user.lastname}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="input-block">
                              <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                onChange={handleChange}
                                value={user.email}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="input-block">
                              <div
                                className="phone-input-container"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Country dropdown with flag */}
                                <div
                                  className="country-selector"
                                  style={{
                                    position: "relative",
                                    borderRight: "1px solid #ddd",
                                  }}
                                >
                                  <div
                                    className="selected-country"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "8px 12px",
                                      background: "#f8f9fa",
                                      cursor: "pointer",
                                      minWidth: "120px",
                                    }}
                                  >
                                    <img
                                      src={selectedCountry.flagUrl}
                                      alt={selectedCountry.name}
                                      style={{
                                        width: "20px",
                                        height: "15px",
                                        marginRight: "8px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#333",
                                      }}
                                    >
                                      {selectedCountry.dialCode}
                                    </span>
                                  </div>
                                  <select
                                    name="country"
                                    onChange={handleCountryChange}
                                    value={user.country}
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      opacity: 0,
                                      cursor: "pointer",
                                      fontSize: "14px",
                                    }}
                                    required
                                  >
                                    {countryOptions.map((country) => (
                                      <option
                                        key={country.code}
                                        value={country.code}
                                      >
                                        {country.name} ({country.dialCode})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {/* Phone input */}
                                <input
                                  type="text"
                                  name="phone"
                                  required
                                  placeholder="Phone Number"
                                  onChange={handleChange}
                                  value={user.phone}
                                  style={{
                                    flex: 1,
                                    border: "none",
                                    padding: "8px 12px",
                                    outline: "none",
                                    fontSize: "14px",
                                  }}
                                />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row align-items-center">
                              <div className="col-md-12">
                                <button
                                  type="submit"
                                  className="have_pics login_btn_new"
                                >
                                  Register{" "}
                                  <i className="fas fa-arrow-right"></i>
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <div className="login-box-left">
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
      <div className="ftr_get">
        <Footer1 />
        <Footer />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
