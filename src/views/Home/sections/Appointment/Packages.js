import React, { useState, useEffect } from "react";
import okimg from "../../../../images/ok.png";
import img2 from "../../../../images/photo-5.jpg";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  package_sec_cont_single_img: {
    position: "relative",
    borderRadius: "5px",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      background: "#000",
      opacity: " 0.50",
      zIndex: 1,
    },
    "& img": {
      width: "225px",
      height: "200px",
      borderRadius: "5px",
      position: "relative",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Packages(props) {
  const {
    setAppointment,
    setPackageTab,
    setSecondPackageTab,
    allPackages,
    setMiscPackageTab,
  } = props;
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [virtualStag, setVirtualStag] = useState(false);
  const [twlightPhoto, setTwlightPhoto] = useState(false);
  const [headshot, setHeadshot] = useState(false);
  const [iguide, setIguide] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [photoshoot, setPhotoshoot] = useState(false);
  const [Walkthrough, setWalkthrough] = useState(false);
  const [aerialDrone, setAerialDrone] = useState(false);
  const [signature, setSignature] = useState(false);
  const [cartePackageData, setCartePackageData] = useState(
    JSON.parse(localStorage.getItem("Carte_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Carte_Package")).filter(
          (item, i, ar) => ar.indexOf(item) === i
        )
  );
  const [signaturePackageData, setSignaturePackageData] = useState(
    JSON.parse(localStorage.getItem("Combo_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Combo_Package")).filter(
          (item, i, ar) => ar.indexOf(item) === i
        )
  );
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded === true ? panel : 9999);
  };

  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
  };
  const [subPackages, setSubPackages] = useState(
    JSON.parse(localStorage.getItem("Sub_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Sub_Package"))
  );


  console.log("subPackages", subPackages);
  console.log("cartepackage", cartePackageData);


  const addSubPackages = (id, main_id) => {
    setSubPackages((prevArray) => [...prevArray, id]);
    setCartePackageData((prevArray) => [...prevArray, main_id]);
  };


  const removeSubPackages = (id, main_id) => {
    const index = arrayRemove(subPackages, id);
    setSubPackages(index);
    let packages = [...cartePackageData];
    console.log("packages", packages);
    let index3 = packages.findIndex((x) => x === main_id);
    console.log("index3", index3);
    packages.splice(index3, 1);
    console.log("new_arr", packages);
    setCartePackageData(packages);
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  const checkId = (id) => {
    var filter_data = subPackages.filter((res) => {
      return res === id;
    });
    if (filter_data.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const [comboSubPackages, setComboSubPackages] = useState(
    JSON.parse(localStorage.getItem("Combo_Sub_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Combo_Sub_Package"))
  );

  const addComboSubPackages = (id) => {
   
    if (!comboSubPackages.includes(id)) {
      const updated = [...comboSubPackages, id];
      setComboSubPackages(updated);
      localStorage.setItem("Combo_Sub_Package", JSON.stringify(updated));
  
      if (allPackages?.combopackage?.length) {
        setSignaturePackageData([allPackages.combopackage[0]]);
      }
      console.log(updated);
    } else {
      console.log("ID already exists. Not adding again:", id);
    }
  };
  
  

  const isComboSubPackageSelected = (id) => {
    return comboSubPackages.includes(id);
  };
  

  const removeComboSubPackages = (id) => {
    const updated = comboSubPackages.filter((item) => item !== id);
    setComboSubPackages(updated);
    localStorage.setItem("Combo_Sub_Package", JSON.stringify(updated));
  };
  
  
  

  const savePackage = () => {
    if (subPackages.length === 0) {
      setMessage("Please select any package");
      setOpenError(true);
    } else {
      localStorage.setItem("Sub_Package", JSON.stringify(subPackages));
      localStorage.setItem("Combo_Sub_Package", JSON.stringify(comboSubPackages));
  

      localStorage.setItem(
        "Combo_Package",
        JSON.stringify(signaturePackageData)
      );
      localStorage.setItem("Carte_Package", JSON.stringify(cartePackageData));
      setPackageTab(false);
      setMiscPackageTab(true);
    }
  };
  const setCartePackage = (data) => {
    var element = document.getElementById("myDIV" + data.id);
    if (data.id === 21) {
      if (headshot === false) {
        setHeadshot(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setHeadshot(false);
        element.classList.remove("op");
        const index = arrayRemove(cartePackageData, "21");
        setCartePackageData(index);
      }
    }
    if (data.id === 17) {
      if (iguide === false) {
        setIguide(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setIguide(false);
        element.classList.remove("op");
        const index = arrayRemove(cartePackageData, "17");
        setCartePackageData(index);
      }
    }
    if (data.id === 16) {
      if (virtual === false) {
        setVirtual(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setVirtual(false);
        element.classList.remove("op");
        const index = arrayRemove(cartePackageData, "16");
        setCartePackageData(index);
      }
    }
    if (data.id === 15) {
      if (photoshoot === false) {
        setPhotoshoot(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setPhotoshoot(false);
        element.classList.remove("op");
        setCartePackageData(cartePackageData.filter((item) => item.id !== 15));
        const index = arrayRemove(cartePackageData, "15");
        setCartePackageData(index);
      }
    }
    if (data.id === 12) {
      if (Walkthrough === false) {
        setWalkthrough(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setWalkthrough(false);
        element.classList.remove("op");
        const index = arrayRemove(cartePackageData, "12");
        setCartePackageData(index);
      }
    }
    if (data.id === 11) {
      if (aerialDrone === false) {
        setAerialDrone(true);
        element.classList.add("op");
        setCartePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setAerialDrone(false);
        element.classList.remove("op");
        const index = arrayRemove(cartePackageData, "11");
        setCartePackageData(index);
      }
    }
  };
  const setSignaturePackage = (data) => {
    var element = document.getElementById("sigDIV" + data.id);
    if (data.id === 9) {
      if (signature === false) {
        setSignature(true);
        element.classList.add("op");
        setSignaturePackageData((prevArray) => [...prevArray, data.id]);
      } else {
        setSignature(false);
        element.classList.remove("op");
        setSignaturePackageData(
          signaturePackageData.filter((item) => item.id === data.id)
        );
      }
    }
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  const saveDataToLocalStorage = () => {
    if (cartePackageData.length === 0 && signaturePackageData.length === 0) {
      setMessage("Please select any package");
      setOpenError(true);
    } else {
      // let obj = { Carte_Package: JSON.stringify(cartePackageData), Combo_Package: JSON.stringify(signaturePackageData) };
      localStorage.setItem("Carte_Package", JSON.stringify(cartePackageData));
      localStorage.setItem(
        "Combo_Package",
        JSON.stringify(signaturePackageData)
      );
      setPackageTab(false);
      setSecondPackageTab(true);
    }
  };
  return (
    <div class="appointment_page_right">
      <div class="row">
        <div class="col-md-12">
          <h3>Photo Packages</h3>
          <div class="step_progress">
            <span>Step 2/4</span>
            <div class="progress" style={{ height: "20px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
                aria-valuenow="33"
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
                <h4>A-La-Carte Package</h4>
              </div>
              <div class="package_sec_cont">
                {Object.keys(allPackages).length > 0 ? (
                  <div>
                    {allPackages.package.map((res, index) => (
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
                                          Starting at $200
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
                                            {res.package_details.map(
                                              (subpackage) => (
                                                <tr>
                                                  <td
                                                    className="package-name"
                                                    width="25%"
                                                    align="left"
                                                  >
                                                    {subpackage.title}
                                                  </td>
                                                  <td
                                                    className="package-info"
                                                    width="40%"
                                                    align="left"
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          subpackage.description,
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
                                                    ${subpackage.price}
                                                  </td>
                                                  <td
                                                    className="price"
                                                    width="20%"
                                                    align="right"
                                                    style={{
                                                      textAlign: "right",
                                                    }}
                                                  >
                                                    {checkId(subpackage.id) ===
                                                    true ? (
                                                      <a
                                                        className="addtocart-btn"
                                                        onClick={() => {
                                                          removeSubPackages(
                                                            subpackage.id,
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
                                                          addSubPackages(
                                                            subpackage.id,
                                                            res.id
                                                          );
                                                        }}
                                                      >
                                                        Add to Cart
                                                        <i className="far fa-shopping-cart" />
                                                      </a>
                                                    )}
                                                  </td>
                                                </tr>
                                              )
                                            )}
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
                    ))}
                  </div>
                ) : (
                  <div class="row">
                    <Skeleton
                      variant="text"
                      width={200}
                      height={300}
                      style={{ background: "#bbbbbb", marginRight: "50px" }}
                    />
                    <Skeleton
                      variant="text"
                      width={200}
                      height={300}
                      style={{ background: "#bbbbbb", marginRight: "50px" }}
                    />
                    <Skeleton
                      variant="text"
                      width={200}
                      height={300}
                      style={{ background: "#bbbbbb", marginRight: "50px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr class="spacer40px" />
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="package_sec">
              <div class="package_sec_head">
                <h4>Combo Package</h4>
              </div>
              <div class="package_sec_cont">
                {Object.keys(allPackages).length > 0 ? (
                  allPackages.combopackage.map((res,index) => (
                    <div>
                      <div
                        className="package-box-appointment package-productlist"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div id="main">
                              <div className="" id="faq">
                                <Accordion
                                  onChange={handleChange(res.id)}
                                  expanded={res.id == expanded ? true : false}
                                  sx={{
                                    mb: 2,
                                  }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="test_accorodion"
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
                                        <img
                                          src={
                                            res.image
                                          }
                                          alt
                                        />
                                        <div className="pricing-box-price-amount">
                                          Starting at $200
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
                                            {res.package_details.map(
                                              (subpackage) => (
                                                <tr>
                                                  <td
                                                    className="package-name"
                                                    width="25%"
                                                    align="left"
                                                  >
                                                    {subpackage.title}
                                                  </td>
                                                  <td
                                                    className="package-info"
                                                    width="40%"
                                                    align="left"
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          subpackage.description,
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
                                                    ${subpackage.price}
                                                  </td>
                                                  <td
                                                    className="price"
                                                    width="20%"
                                                    align="right"
                                                    style={{
                                                      textAlign: "right",
                                                    }}
                                                  >
                                                    {isComboSubPackageSelected(subpackage.id) ? (
                                                      <a
                                                        className="addtocart-btn"
                                                        onClick={() => {
                                                          removeComboSubPackages(
                                                            subpackage.id
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
                                                          addComboSubPackages(
                                                            subpackage.id
                                                          );
                                                        }}
                                                      >
                                                        Add to Cart
                                                        <i className="far fa-shopping-cart" />
                                                      </a>
                                                    )}
                                                  </td>
                                                </tr>
                                              )
                                            )}
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
                    </div>
                  ))
                ) : (
                  <div class="row">
                    <Skeleton
                      variant="text"
                      width={200}
                      height={300}
                      style={{ background: "#bbbbbb", marginRight: "50px" }}
                    />
                  </div>
                )}
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
                setPackageTab(false);
                setAppointment(true);
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
              style={{ cursor: "pointer" }}
              class="let_start_new"
              onClick={() => {
                savePackage();
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
