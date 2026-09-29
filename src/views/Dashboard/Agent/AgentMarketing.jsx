import React, { useState, useEffect, useContext, useRef } from "react";
import $ from "jquery";
import banner from "../../../images/vtcmarketingbanner.png";
// import domainimg from "../../../images/domain-left-img.png";
import domainimg from "../../../images/domain-left-img-1.png";
// TODO: replace with the real "Everything You Need" feature image once you
// send it over, e.g.
// import marketingFeatureImage from "../../../images/marketing-tools-feature.jpg";
import marketingFeatureImage from "../../../images/vtcmarketingbanner-1.png";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";

// Reuses the same imageset list endpoint used on the Tours page, so both
// dropdowns show the agent's actual tours (by `caption`, per the API response).
const APIGetImagesetList = APIURL() + "get-imagesetlist";

const APIOrderMarketingKit = APIURL() + "agent-marketingkit-order";
const APIOrderPropertyDomain = APIURL() + "agent-property-domain-order";

const MARKETING_KIT_PRICE = 50;
const MARKETING_KIT_DISCOUNT_PRICE = 35;
const MARKETING_KIT_DISCOUNT_CODES = ["space", "bayeast"];

const PROPERTY_DOMAIN_PRICE = 25;

const YOUTUBE_VIDEO_ID = "O2AeCD5con8";

const formatCardNumber = (value) =>
  value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentMarketing() {
  const context = useContext(AuthContext);
  const [tourList, setTourList] = useState([]);

  const [activeTab, setActiveTab] = useState("kit"); // "kit" | "domain"
  const domainSectionRef = useRef(null);

  // Manual "sticky" pin: the tab pill renders in its normal position until
  // the page scrolls past it, then it switches to position:fixed so it
  // stays visible. Done in JS (rather than CSS position:sticky) because
  // sticky silently breaks under an ancestor with overflow:hidden/auto.
  const [isTabsPinned, setIsTabsPinned] = useState(false);
  const tabsWrapRef = useRef(null);
  const tabsOriginalTopRef = useRef(0);

  useEffect(() => {
    if (tabsWrapRef.current) {
      tabsOriginalTopRef.current =
        tabsWrapRef.current.getBoundingClientRect().top + window.scrollY;
    }
    const handleScroll = () => {
      setIsTabsPinned(window.scrollY > tabsOriginalTopRef.current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Marketing Kit modal state
  const [openKitModal, setOpenKitModal] = useState(false);
  const [kitActiveStep, setKitActiveStep] = useState(0); // 0 = Details, 1 = Payment
  const [kitTourId, setKitTourId] = useState("");
  const [kitDiscountCode, setKitDiscountCode] = useState("");
  const [kitPrice, setKitPrice] = useState(MARKETING_KIT_PRICE);
  const [kitCardNo, setKitCardNo] = useState("");
  const [kitCcMonth, setKitCcMonth] = useState("");
  const [kitCcYear, setKitCcYear] = useState("");

  // Property Domain modal state
  const [openDomainModal, setOpenDomainModal] = useState(false);
  const [domainActiveStep, setDomainActiveStep] = useState(0); // 0 = Details, 1 = Payment
  const [domainTourId, setDomainTourId] = useState("");
  const [domainOne, setDomainOne] = useState("");
  const [domainTwo, setDomainTwo] = useState("");
  const [domainThree, setDomainThree] = useState("");
  const [domainCardNo, setDomainCardNo] = useState("");
  const [domainCcMonth, setDomainCcMonth] = useState("");
  const [domainCcYear, setDomainCcYear] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

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

  // Tour / imageset list - shared by both the Marketing Kit and Property
  // Domain property dropdowns.
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
        pageNumber: 1,
      };
      postRecord(APIGetImagesetList, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setTourList(res.data[0].response.data);
        }
      });
    }
  }, [context.state.user]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  const scrollToKit = () => {
    setActiveTab("kit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDomain = () => {
    setActiveTab("domain");
    if (domainSectionRef.current) {
      domainSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ---- Marketing Kit ----
  const handleOpenKitModal = () => {
    setKitActiveStep(0);
    setKitTourId("");
    setKitDiscountCode("");
    setKitPrice(MARKETING_KIT_PRICE);
    setKitCardNo("");
    setKitCcMonth("");
    setKitCcYear("");
    setOpenKitModal(true);
  };

  const handleCloseKitModal = () => {
    setOpenKitModal(false);
  };

  const handleKitDiscountChange = (event) => {
    const code = event.target.value;
    const isValidCode = MARKETING_KIT_DISCOUNT_CODES.includes(
      code.trim().toLowerCase(),
    );
    setKitDiscountCode(code);
    setKitPrice(
      isValidCode ? MARKETING_KIT_DISCOUNT_PRICE : MARKETING_KIT_PRICE,
    );
  };

  const handleKitNext = () => {
    if (!kitTourId) {
      setMessage("Please select a property / virtual tour");
      setOpenError(true);
      return;
    }
    setKitActiveStep(1);
  };

  const handleKitBack = () => {
    setKitActiveStep(0);
  };

  const SubmitMarketingKit = () => {
    if (!kitCardNo || !kitCcMonth || !kitCcYear) {
      setMessage("Please enter your card details");
      setOpenError(true);
      return;
    }
    const obj = {
      authenticate_key: "abcd123XYZ",
      tour_id: kitTourId,
      agent_id: JSON.parse(context.state.user).agentId,
      card_no: kitCardNo.replace(/\s/g, ""),
      cc_month: kitCcMonth,
      cc_year: kitCcYear,
      price: kitPrice,
    };
    postRecord(APIOrderMarketingKit, obj)
      .then((res) => {
        // NOTE: this endpoint returns { response: { status, message } }
        // directly (not wrapped in an array like most other endpoints on
        // this page) - confirmed from an earlier live test, so it's read
        // off res.data.response, not res.data[0].response.
        const response = res.data.response;
        if (response.status === "success") {
          setMessage(response.message || "Order submitted successfully!");
          setOpenSuccess(true);
          handleCloseKitModal();
        } else {
          setMessage(response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        const apiMessage = err?.response?.data?.response?.message;
        setMessage(
          apiMessage || "Something Went Wrong. Please try again later...",
        );
        setOpenError(true);
      });
  };

  // ---- Property Domain ----
  const handleOpenDomainModal = () => {
    setDomainActiveStep(0);
    setDomainTourId("");
    setDomainOne("");
    setDomainTwo("");
    setDomainThree("");
    setDomainCardNo("");
    setDomainCcMonth("");
    setDomainCcYear("");
    setOpenDomainModal(true);
  };

  const handleCloseDomainModal = () => {
    setOpenDomainModal(false);
  };

  const handleDomainNext = () => {
    if (!domainTourId) {
      setMessage("Please select a property / virtual tour");
      setOpenError(true);
      return;
    }
    if (!domainOne) {
      setMessage("Please enter your 1st choice domain name");
      setOpenError(true);
      return;
    }
    setDomainActiveStep(1);
  };

  const handleDomainBack = () => {
    setDomainActiveStep(0);
  };

  const SubmitPropertyDomain = () => {
    if (!domainCardNo || !domainCcMonth || !domainCcYear) {
      setMessage("Please enter your card details");
      setOpenError(true);
      return;
    }
    const obj = {
      authenticate_key: "abcd123XYZ",
      tour_id: domainTourId,
      agent_id: JSON.parse(context.state.user).agentId,
      domain_one: domainOne,
      domain_two: domainTwo,
      domain_three: domainThree,
      card_no: domainCardNo.replace(/\s/g, ""),
      cc_month: domainCcMonth,
      cc_year: domainCcYear,
      price: PROPERTY_DOMAIN_PRICE,
    };
    // NOTE: unlike agent-marketingkit-order, this endpoint's response shape
    // hasn't been confirmed live yet - using the standard res.data[0].response
    // pattern used everywhere else on this page. If it turns out to also
    // return an unwrapped { response: {...} } shape, switch this to
    // res.data.response like SubmitMarketingKit above.
    postRecord(APIOrderPropertyDomain, obj)
      .then((res) => {
        const response = res.data[0].response;
        if (response.status === "success") {
          setMessage(response.message || "Order submitted successfully!");
          setOpenSuccess(true);
          handleCloseDomainModal();
        } else {
          setMessage(response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        const apiMessage = err?.response?.data?.response?.message;
        setMessage(
          apiMessage || "Something Went Wrong. Please try again later...",
        );
        setOpenError(true);
      });
  };

  return (
    <div>
      <Title title="Marketing" />
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
                    <li class="active">
                      <Link to={APIPath() + "agent-marketing"}>Marketing</Link>
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
        <div class="banner-title">
          <h2>Marketing Tools</h2>
        </div>
      </section>

      <section class="contact-page-section">
        <div class="container">
          {/* Marketing Kit / Property Domain tab pills - scroll to the
              matching section below rather than swapping content. */}
          <div class="row mb-4">
            <div
              ref={tabsWrapRef}
              class={
                isTabsPinned
                  ? "col-lg-12 marketing-tabs-wrap is-pinned"
                  : "col-lg-12 marketing-tabs-wrap"
              }
            >
              <div class="marketing-tabs">
                <button
                  type="button"
                  class={
                    activeTab === "kit"
                      ? "marketing-tab-btn active"
                      : "marketing-tab-btn"
                  }
                  onClick={scrollToKit}
                >
                  <i class="fas fa-photo-video"></i> Marketing Kit
                </button>
                <button
                  type="button"
                  class={
                    activeTab === "domain"
                      ? "marketing-tab-btn active"
                      : "marketing-tab-btn"
                  }
                  onClick={scrollToDomain}
                >
                  <i class="fas fa-globe"></i> Domain
                </button>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-lg-12">
              <div class="text-center agent_support">
                {/* <h3>Everything You Need To Market Your Listing</h3> */}
                <h3>New Marketing Kit</h3>
              </div>
            </div>
          </div>

          {/* Two-column: feature image on the left, bullet points on the right */}
          <div class="row mb-4 marketing-features-row">
            <div class="col-lg-6 col-md-6">
              <img
                src={marketingFeatureImage}
                alt="Marketing Tools"
                class="marketing-features-image"
              />
            </div>
            <div class="col-lg-6 col-md-6">
              <h4 style={{ textAlign: "center" }}>
                Everything You Need To Market Your Listing
              </h4>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "18px" }}>
                <li style={{ marginBottom: "10px" }}>
                  <i
                    class="fas fa-check-circle"
                    style={{ color: "#ffa12d", marginRight: "10px" }}
                  ></i>
                  Premium Property Websites
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <i
                    class="fas fa-check-circle"
                    style={{ color: "#ffa12d", marginRight: "10px" }}
                  ></i>
                  Customizable Videos On-demand!
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <i
                    class="fas fa-check-circle"
                    style={{ color: "#ffa12d", marginRight: "10px" }}
                  ></i>
                  Social Media REELS!
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <i
                    class="fas fa-check-circle"
                    style={{ color: "#ffa12d", marginRight: "10px" }}
                  ></i>
                  Printable Flyers And More - All Instantly Available!
                </li>
              </ul>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-lg-12">
              <div class="text-center agent_support">
                <h4>Watch a short video to learn more</h4>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-lg-8 offset-lg-2">
              <div class="video_box">
                <iframe
                  width="100%"
                  height="450"
                  style={{ aspectRatio: "16 / 9", border: 0 }}
                  src={"https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID}
                  title="VirtualTourCafe Marketing Kit"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Marketing Kit box */}
          <div class="row mb-4">
            <div class="col-lg-8 offset-lg-2">
              <div class="contct-box-marketing text-center">
                <h3>Marketing Kit</h3>
                <p class="marketing-box-price">${MARKETING_KIT_PRICE}.00</p>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenKitModal}
                  class="subscribe_btn"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>

          {/* Property Domain box */}
          <div ref={domainSectionRef} className="row mb-4">
            <div className="col-lg-8 offset-lg-2">
              <div className="contct-box-marketing domain-marketing-box">
                {/* Left Image */}
                <div className="domain-left-image">
                  <img src={domainimg} alt="Property For Sale" />
                </div>

                {/* Right Content */}
                <div className="domain-content">
                  <h3>Property Domain</h3>

                  <p className="marketing-box-description">
                    Add a property domain such as 123MainStreet.com for your
                    listing here. We will connect the virtual tour you choose to
                    the domain name for easy marketing of your property.
                  </p>

                  <p className="marketing-box-price">
                    ${PROPERTY_DOMAIN_PRICE}.00
                  </p>

                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenDomainModal}
                    className="subscribe_btn"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Kit order modal */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleCloseKitModal}
        aria-labelledby="customized-dialog-title"
        open={openKitModal}
        className="marketing-order-dialog"
      >
        <DialogTitle
          style={{ background: "#FFA12D", color: "white" }}
          id="customized-dialog-title"
        >
          Marketing Kit
          <CancelIcon
            onClick={handleCloseKitModal}
            style={{ float: "right", color: "#fff", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Stepper
            activeStep={kitActiveStep}
            alternativeLabel
            className="marketing-stepper"
          >
            <Step>
              <StepLabel>Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>

          <div class="container step-content">
            {kitActiveStep === 0 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    Select Property / Virtual Tour{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={kitTourId}
                    onChange={(event) => setKitTourId(event.target.value)}
                  >
                    <option value="">---Select Property---</option>
                    {tourList.map((tour) => (
                      <option value={tour.id} key={tour.id}>
                        {tour.caption}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-md-6 formbox1">
                  <label>Discount Code</label>
                  <input
                    type="text"
                    class="form-control"
                    value={kitDiscountCode}
                    onChange={handleKitDiscountChange}
                    placeholder="Enter discount code"
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>Price</label>
                  <input
                    type="text"
                    class="form-control"
                    value={"$" + kitPrice + ".00"}
                    readOnly
                  />
                </div>
              </div>
            )}

            {kitActiveStep === 1 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    Card Number <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    maxLength="19"
                    value={kitCardNo}
                    onChange={(event) =>
                      setKitCardNo(formatCardNumber(event.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Expiration Month <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={kitCcMonth}
                    onChange={(event) => setKitCcMonth(event.target.value)}
                  >
                    <option value="">Select Month</option>
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
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Expiration Year <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={kitCcYear}
                    onChange={(event) => setKitCcYear(event.target.value)}
                  >
                    <option value="">Select Year</option>
                 
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                  </select>
                </div>
              </div>
            )}

            <div
              class={
                kitActiveStep === 1
                  ? "row stepper-actions-row"
                  : "row form-actions"
              }
            >
              {kitActiveStep === 0 && (
                <div class="col-md-12 text-right">
                  <button
                    type="button"
                    class="marketing-order-btn"
                    onClick={handleKitNext}
                  >
                    Next
                  </button>
                </div>
              )}
              {kitActiveStep === 1 && (
                <>
                  <div class="col-md-6 text-left">
                    <button
                      type="button"
                      class="marketing-order-btn back"
                      onClick={handleKitBack}
                    >
                      Back
                    </button>
                  </div>
                  <div class="col-md-6 text-right">
                    <button
                      type="button"
                      class="marketing-order-btn"
                      onClick={SubmitMarketingKit}
                    >
                      Submit Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Property Domain order modal */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleCloseDomainModal}
        aria-labelledby="customized-dialog-title"
        open={openDomainModal}
        className="marketing-order-dialog"
      >
        <DialogTitle
          style={{ background: "#FFA12D", color: "white" }}
          id="customized-dialog-title"
        >
          Property Domain
          <CancelIcon
            onClick={handleCloseDomainModal}
            style={{ float: "right", color: "#fff", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Stepper
            activeStep={domainActiveStep}
            alternativeLabel
            className="marketing-stepper"
          >
            <Step>
              <StepLabel>Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>

          <div class="container step-content">
            {domainActiveStep === 0 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    Select Property / Virtual Tour{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={domainTourId}
                    onChange={(event) => setDomainTourId(event.target.value)}
                  >
                    <option value="">---Select Property---</option>
                    {tourList.map((tour) => (
                      <option value={tour.id} key={tour.id}>
                        {tour.caption}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-md-12 formbox1">
                  <label>
                    1st Choice Domain Name{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    value={domainOne}
                    onChange={(event) => setDomainOne(event.target.value)}
                    placeholder="e.g. 123mainstreet.com"
                  />
                </div>
                <div class="col-md-12 formbox1">
                  <label>2nd Choice Domain Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={domainTwo}
                    onChange={(event) => setDomainTwo(event.target.value)}
                  />
                </div>
                <div class="col-md-12 formbox1">
                  <label>3rd Choice Domain Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={domainThree}
                    onChange={(event) => setDomainThree(event.target.value)}
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>Price</label>
                  <input
                    type="text"
                    class="form-control"
                    value={"$" + PROPERTY_DOMAIN_PRICE + ".00"}
                    readOnly
                  />
                </div>
              </div>
            )}

            {domainActiveStep === 1 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    Card Number <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    maxLength="19"
                    value={domainCardNo}
                    onChange={(event) =>
                      setDomainCardNo(formatCardNumber(event.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Expiration Month <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={domainCcMonth}
                    onChange={(event) => setDomainCcMonth(event.target.value)}
                  >
                    <option value="">Select Month</option>
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
                </div>
                <div class="col-md-6 formbox1">
                  <label>
                    Expiration Year <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    value={domainCcYear}
                    onChange={(event) => setDomainCcYear(event.target.value)}
                  >
                    <option value="">Select Year</option>
                
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    
                  </select>
                </div>
              </div>
            )}

            <div
              class={
                domainActiveStep === 1
                  ? "row stepper-actions-row"
                  : "row form-actions"
              }
            >
              {domainActiveStep === 0 && (
                <div class="col-md-12 text-right">
                  <button
                    type="button"
                    class="marketing-order-btn"
                    onClick={handleDomainNext}
                  >
                    Next
                  </button>
                </div>
              )}
              {domainActiveStep === 1 && (
                <>
                  <div class="col-md-6 text-left">
                    <button
                      type="button"
                      class="marketing-order-btn back"
                      onClick={handleDomainBack}
                    >
                      Back
                    </button>
                  </div>
                  <div class="col-md-6 text-right">
                    <button
                      type="button"
                      class="marketing-order-btn"
                      onClick={SubmitPropertyDomain}
                    >
                      Submit Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

      <Footer />
    </div>
  );
}
