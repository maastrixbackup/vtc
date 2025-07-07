// File: SSOAgentRegister.jsx
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import Footer from "../../components/Footer/Footer";
import Footer1 from "../../components/Footer/Footer1";
import Title from "../../CommonMethods/Title";
import { MetaInfo } from "../../CommonMethods/MetaTagsContext";

const APIRegister = APIURL() + "genericAgentCreate";

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

export default function SSOAgentRegister() {
  const { listingagentid } = useParams();
  const history = useHistory();
  const metaCtx = MetaInfo();
  const [metaData, setMetaData] = useState({});

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
        if (res.data.response.status === "success") {
          alert(`Registration successful! `);
          history.push(APIPath() + "sso-agent-login/");
        } else {
          alert(res.data.response.message);
        }
      })
      .catch(() => alert("Something went wrong."));
  };

  return (
    <div>
      <Title title="Agent Registration" />
      <section className="home_page">
        <div className="home_page_banner inner_banner">
          <img src={banner} alt="" title="" />
          <div className="inner_banner_cont">
            <div className="inner_banner_cont_sec">
              <h2>SSO-Agent Register</h2>
              <h5>Complete Your Details Below</h5>
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
                        <h3 className="text-center">Register as SSO-Agent</h3>
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
    </div>
  );
}
