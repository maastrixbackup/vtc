import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import banner from "../../../images/vtcmarketingbanner.png";
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

// Reuses the same imageset list endpoint used on the Tours page, so the
// dropdown shows the agent's actual tours (by `caption`, per the API response).
const APIGetImagesetList = APIURL() + "get-imagesetlist";

// TODO: confirm this matches your backend route exactly.
const APIOrderMarketingKit = APIURL() + "agent-marketingkit-order";

const MARKETING_KIT_PRICE = 50;
const MARKETING_KIT_DISCOUNT_PRICE = 35;
const MARKETING_KIT_DISCOUNT_CODES = ["space", "Bayeast"];

const YOUTUBE_VIDEO_ID = "O2AeCD5con8";

const STEPS = ["Marketing Kit", "Property Domain", "Review & Submit"];

const initialOrderState = {
  tourId: "",
  discountCode: "",
  price: MARKETING_KIT_PRICE,
  domainOne: "",
  domainTwo: "",
  domainThree: "",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentMarketing() {
  const context = useContext(AuthContext);
  const [tourList, setTourList] = useState([]);

  const [maxWidth] = useState("sm");

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState(initialOrderState);
  const [orderLoading, setOrderLoading] = useState(false);

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

  // Tour / imageset list for the Marketing Kit property dropdown
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

  const handleOpenOrderModal = () => {
    setOrderData(initialOrderState);
    setActiveStep(0);
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
    setActiveStep(0);
    setOrderData(initialOrderState);
  };

  const handleOrderInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleDiscountCodeChange = (event) => {
    const code = event.target.value;
    const isValidCode = MARKETING_KIT_DISCOUNT_CODES.includes(
      code.trim().toLowerCase(),
    );
    setOrderData({
      ...orderData,
      discountCode: code,
      price: isValidCode ? MARKETING_KIT_DISCOUNT_PRICE : MARKETING_KIT_PRICE,
    });
  };

  const handleNext = () => {
    if (activeStep === 0 && !orderData.tourId) {
      setMessage("Please select a property / virtual tour");
      setOpenError(true);
      return;
    }
    if (activeStep === 1 && !orderData.domainOne) {
      setMessage("Please enter your 1st choice domain name");
      setOpenError(true);
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const SubmitMarketingKitOrder = () => {
    if (!orderData.tourId) {
      setMessage("Please select a property / virtual tour");
      setOpenError(true);
      setActiveStep(0);
      return;
    }
    if (!orderData.domainOne) {
      setMessage("Please enter your 1st choice domain name");
      setOpenError(true);
      setActiveStep(1);
      return;
    }
    setOrderLoading(true);
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      tour_id: orderData.tourId,
      price: orderData.price,
      discount_code: orderData.discountCode,
      domain_one: orderData.domainOne,
      domain_two: orderData.domainTwo,
      domain_three: orderData.domainThree,
    };
    postRecord(APIOrderMarketingKit, obj)
      .then((res) => {
        // NOTE: this endpoint returns { response: { status, message } }
        // directly (not wrapped in an array like the other endpoints on
        // this page), so it's read off res.data.response, not res.data[0].response.
        const response = res.data.response;
        if (response.status === "success") {
          setMessage(
            response.message || "Marketing Kit order submitted successfully !!",
          );
          setOpenSuccess(true);
          handleCloseOrderModal();
        } else {
          setMessage(response.message);
          setOpenError(true);
        }
      })
      .catch(() => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  const selectedTour = tourList.find(
    (tour) => String(tour.id) === String(orderData.tourId),
  );

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
          <h2>Marketing Kit</h2>
        </div>
      </section>

      <section class="contact-page-section">
        <div class="container">
          <div class="row mb-4">
            <div class="col-lg-12">
              <div class="text-center agent_support">
                <h3>Everything You Need To Market Your Listing</h3>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-lg-8 offset-lg-2">
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

          <div class="row mb-4">
            <div class="col-lg-8 offset-lg-2">
              <div class="contct-box-marketing text-center">
                <h3>Marketing Kit & Property Domain</h3>
                <p>${MARKETING_KIT_PRICE}.00</p>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenOrderModal}
                  class="subscribe_btn"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>

          {/* <div class="row mb-4">
            <div class="col-lg-8 offset-lg-2">
              <div class="contct-box text-center">
                <h3>Property Domain</h3>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenOrderModal}
                  class="subscribe_btn"
                >
                  Order Property Domain
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Combined Marketing Kit + Property Domain order modal (stepper) */}
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleCloseOrderModal}
        aria-labelledby="customized-dialog-title"
        open={openOrderModal}
        className="marketing-stepper-dialog"
      >
        <DialogTitle
          style={{ background: "#FFA12D", color: "white" }}
          id="customized-dialog-title"
        >
          {STEPS[activeStep]}
          <CancelIcon
            onClick={handleCloseOrderModal}
            style={{ float: "right", color: "#fff", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className="marketing-stepper"
          >
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div class="container step-content">
            {activeStep === 0 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    Select Property / Virtual Tour{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <select
                    class="form-control formbox1select"
                    name="tourId"
                    value={orderData.tourId}
                    onChange={handleOrderInputChange}
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
                    name="discountCode"
                    value={orderData.discountCode}
                    onChange={handleDiscountCodeChange}
                    placeholder="Enter discount code"
                  />
                </div>
                <div class="col-md-6 formbox1">
                  <label>Price</label>
                  <input
                    type="text"
                    class="form-control"
                    value={"$" + orderData.price + ".00"}
                    readOnly
                  />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div class="row">
                <div class="col-md-12 formbox1">
                  <label>
                    1st Choice Domain Name{" "}
                    <span style={{ color: "#ffa12d" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="domainOne"
                    value={orderData.domainOne}
                    onChange={handleOrderInputChange}
                    placeholder="e.g. 123mainstreet.com"
                  />
                </div>
                <div class="col-md-12 formbox1">
                  <label>2nd Choice Domain Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="domainTwo"
                    value={orderData.domainTwo}
                    onChange={handleOrderInputChange}
                  />
                </div>
                <div class="col-md-12 formbox1">
                  <label>3rd Choice Domain Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="domainThree"
                    value={orderData.domainThree}
                    onChange={handleOrderInputChange}
                  />
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div class="row">
                <div class="col-md-12">
                  <table class="table table-bordered marketing-summary-table">
                    <tbody>
                      <tr>
                        <td>Property / Tour</td>
                        <td>{selectedTour ? selectedTour.caption : ""}</td>
                      </tr>
                      <tr>
                        <td>Discount Code</td>
                        <td>{orderData.discountCode || "-"}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>${orderData.price}.00</td>
                      </tr>
                      <tr>
                        <td>1st Choice Domain</td>
                        <td>{orderData.domainOne}</td>
                      </tr>
                      <tr>
                        <td>2nd Choice Domain</td>
                        <td>{orderData.domainTwo || "-"}</td>
                      </tr>
                      <tr>
                        <td>3rd Choice Domain</td>
                        <td>{orderData.domainThree || "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div class="row stepper-actions">
              <div class="col-md-12 text-right">
                {activeStep > 0 && (
                  <button
                    type="button"
                    class="marketing-order-btn back"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                {activeStep < STEPS.length - 1 && (
                  <button
                    type="button"
                    class="marketing-order-btn"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
                {activeStep === STEPS.length - 1 && (
                  <button
                    type="button"
                    class="marketing-order-btn"
                    disabled={orderLoading}
                    onClick={SubmitMarketingKitOrder}
                  >
                    {orderLoading ? (
                      <>
                        <i class="loaderrr fas fa-spinner fa-spin"></i> Loading
                      </>
                    ) : (
                      "Submit Order"
                    )}
                  </button>
                )}
              </div>
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
