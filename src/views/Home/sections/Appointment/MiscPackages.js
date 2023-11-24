import React, { useEffect, useState, useContext } from "react";
import projimg from "../../../../images/proj.jpg";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { APIURL, APIPath } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import { AuthContext } from "../../../../CommonMethods/Authentication";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const APIGetMiscPackages = APIURL() + "get-miscellaneous";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function MiscPackages(props) {
  const { setMiscPackageTab, setSecondPackageTab, setReviewTab } = props;
  const context = useContext(AuthContext);
  const [allData, setAllData] = useState({});
  const [miscPackages, setMiscPackages] = useState(
    JSON.parse(localStorage.getItem("Misc_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Misc_Package"))
  );
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetMiscPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllData(res.data[0].response.data.miscellaneous);
      }
    });
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
  };

  useEffect(() => {}, []);

  const addMiscPackages = (id) => {
    setMiscPackages((prevArray) => [...prevArray, id]);
  };
  const removeMiscPackages = (id) => {
    const index = arrayRemove(miscPackages, id);
    setMiscPackages(index);
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  const checkId = (id) => {
    var filter_data = miscPackages.filter((res) => {
      return res === id;
    });
    if (filter_data.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  // const saveMiscPackage = () => {
  //     if (miscPackages.length === 0) {
  //         setMessage("Please select any package");
  //         setOpenError(true);
  //     }
  //     else {
  //         localStorage.setItem("Misc_Package", JSON.stringify(miscPackages));
  //         setMiscPackageTab(false);
  //         setReviewTab(true)
  //     }
  // }
  const saveMiscPackage = () => {
    localStorage.setItem("Misc_Package", JSON.stringify(miscPackages));
    setMiscPackageTab(false);
    setReviewTab(true);
  };
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded === true ? panel : 9999);
  };
  return (
    <div class="appointment_page_right">
      <div class="row">
        <div class="col-md-12">
          <h3>Packages</h3>
          <div class="step_progress">
            <span>Step 2/4</span>
            <div class="progress" style={{ height: "20px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="Order_cont">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="package_sec">
              <div class="col-md-12 appointment-steps">
                <h4>Miscellaneous/Add-On Options</h4>
              </div>
              <div class="package-box-appointment">
                <div class="row">
                  {Object.keys(allData).length > 0 ? (
                    allData.miscellaneous_details.map((res, index) => (
                      <div className="package-box-appointment package-productlist">
                        <div className="row">
                          <div className="col-md-12">
                            <div id="main">
                              <div className="" id="faq">
                                <Accordion
                                  onChange={handleChange(index)}
                                  expanded={index == expanded ? true : false}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={
                                      index == expanded
                                        ? "test2"
                                        : "test_accorodion"
                                    }
                                  >
                                    <div>
                                      <a
                                        href="#"
                                        className="btn btn-header-link"
                                        data-toggle="collapse"
                                        data-target="#faq1"
                                        aria-expanded="true"
                                        aria-controls="faq1"
                                      >
                                        {res.title}
                                      </a>
                                    </div>
                                  </AccordionSummary>
                                  <AccordionDetails style={{ padding: "0px" }}>
                                    <div className="card-body">
                                      <div className="pricing-box-photo">
                                        <img src={res.image} alt />
                                        <div className="pricing-box-price-amount">
                                          Starting at ${res.price}
                                        </div>
                                      </div>
                                      <div className="pricing-box-price">
                                        <table
                                          className="table"
                                          style={{ width: "100%" }}
                                          cellSpacing={0}
                                          cellPadding={0}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                className="package-name"
                                                width="25%"
                                                align="left"
                                              >
                                                {res.title}
                                              </td>
                                              <td
                                                className="package-info"
                                                width="40%"
                                                align="left"
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: res.description,
                                                  }}
                                                />
                                              </td>
                                              <td
                                                className="price"
                                                width="15%"
                                                align="right"
                                                style={{
                                                  textAlign: "center",
                                                }}
                                              >
                                                ${res.price}
                                              </td>
                                              <td
                                                className="price"
                                                width="20%"
                                                align="right"
                                                style={{
                                                  textAlign: "right",
                                                }}
                                              >
                                                {checkId(res.id) === true ? (
                                                  <a
                                                    className="addtocart-btn"
                                                    onClick={() => {
                                                      removeMiscPackages(
                                                        res.id
                                                      );
                                                    }}
                                                  >
                                                    Remove From Cart
                                                    <i className="far fa-shopping-cart" />
                                                  </a>
                                                ) : (
                                                  <a
                                                    className="addtocart-btn"
                                                    onClick={() => {
                                                      addMiscPackages(res.id);
                                                    }}
                                                  >
                                                    Add to Cart
                                                    <i className="far fa-shopping-cart" />
                                                  </a>
                                                )}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div class="">
                      <Skeleton
                        variant="text"
                        width={200}
                        height={250}
                        style={{ background: "#bbbbbb", width: "100%" }}
                      />
                      <Skeleton
                        variant="text"
                        width={400}
                        height={50}
                        style={{ background: "#bbbbbb", marginTop: "-34px" }}
                      />
                      <Skeleton
                        variant="text"
                        width={600}
                        height={25}
                        style={{ background: "#bbbbbb" }}
                      />
                      <Skeleton
                        variant="text"
                        width={160}
                        height={80}
                        style={{ background: "#bbbbbb" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="spacer50px" />
        <div class="row">
          <div class="col-lg-6 col-md-6 mx-auto">
            <a
              href="#"
              onClick={() => {
                setSecondPackageTab(true);
                setMiscPackageTab(false);
              }}
              class="let_start"
              style={{ margin: "0 20px 0 0" }}
            >
              <i
                style={{ marginRight: "20px", marginLeft: "0" }}
                class="fas fa-arrow-left"
              ></i>
              Back{" "}
            </a>
            <a
              class="let_start_new"
              style={{ cursor: "pointer" }}
              onClick={() => {
                saveMiscPackage();
                //setSecondPackageTab(false);
                //setSecondPackageTab(true);
              }}
            >
              Next <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
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
    </div>
  );
}
