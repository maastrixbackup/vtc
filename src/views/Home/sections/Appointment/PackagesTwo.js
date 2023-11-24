import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { APIURL } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import defaultimage from "../../../../images/package-default-image.png";
const APIGetOrderPackages = APIURL() + "get-order-package";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function PackagesTwo(props) {
  const { setPackageTab, setSecondPackageTab, setMiscPackageTab } = props;
  const [allData, setAllData] = useState({});
  const [subPackages, setSubPackages] = useState(
    JSON.parse(localStorage.getItem("Sub_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Sub_Package"))
  );
  const [comboSubPackages, setComboSubPackages] = useState(
    JSON.parse(localStorage.getItem("Combo_Sub_Package")) === null
      ? []
      : JSON.parse(localStorage.getItem("Combo_Sub_Package"))
  );
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  useEffect(() => {
    let unique_carte = JSON.parse(localStorage.getItem("Carte_Package")).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    let unique_combo = JSON.parse(localStorage.getItem("Combo_Package")).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    const obj = {
      authenticate_key: "abcd123XYZ",
      agent_id: "7010",
      combopackages: unique_combo,
      category_list: unique_carte,
    };
    postRecord(APIGetOrderPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllData(res.data[0].response.data);
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
  const addSubPackages = (id) => {
    setSubPackages((prevArray) => [...prevArray, id]);
  };
  const removeSubPackages = (id) => {
    const index = arrayRemove(subPackages, id);
    setSubPackages(index);
  };
  const addComboSubPackages = (id) => {
    setComboSubPackages((prevArray) => [...prevArray, id]);
  };
  const removeComboSubPackages = (id) => {
    const index = arrayRemove(comboSubPackages, id);
    setComboSubPackages(index);
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
  const checkComboId = (id) => {
    var filter_data = comboSubPackages.filter((res) => {
      return res === id;
    });
    if (filter_data.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const savePackage = () => {
    if (subPackages.length === 0) {
      setMessage("Please select any package");
      setOpenError(true);
    } else {
      localStorage.setItem("Sub_Package", JSON.stringify(subPackages));
      localStorage.setItem(
        "Combo_Sub_Package",
        JSON.stringify(comboSubPackages)
      );
      setSecondPackageTab(false);
      setMiscPackageTab(true);
    }
  };
  console.log(allData);
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
              {Object.keys(allData).length > 0 ? (
                allData.package.map((res) => (
                  <React.Fragment>
                    <div class="col-md-12 appointment-steps">
                      <h4>{res.title}</h4>
                    </div>
                    <div class="package-box-appointment">
                      <div class="row">
                        {res.package_details.map((sd) => (
                          <div class="col-md-6">
                            <div class="package-box-description">
                              <div class="package-box-appointment1">
                                <span class="pricetag"> $ {sd.price}</span>
                                <img
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                  src={sd.image}
                                  alt=""
                                />
                                <h4>{sd.title}</h4>
                              </div>
                              <div class="package-box-appointment1-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: sd.description,
                                  }}
                                ></div>
                              </div>
                              {checkId(sd.id) === true ? (
                                <Button
                                  style={{ marginTop: "20px" }}
                                  variant="contained"
                                  color="secondary"
                                  endIcon={<HighlightOffIcon />}
                                  onClick={() => {
                                    removeSubPackages(sd.id);
                                  }}
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  style={{ marginTop: "20px" }}
                                  variant="contained"
                                  color="primary"
                                  endIcon={<AddIcon />}
                                  onClick={() => {
                                    addSubPackages(sd.id);
                                  }}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
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
              {Object.keys(allData).length > 0 ? (
                allData.combo_package.map((res) => (
                  <React.Fragment>
                    <div class="col-md-12 appointment-steps">
                      <h4>{res.title}</h4>
                    </div>
                    <div class="package-box-appointment">
                      <div class="row">
                        {res.package_details.map((sd) => (
                          <div class="col-md-6">
                            <div class="package-box-description">
                              <div class="package-box-appointment1">
                                <span class="pricetag"> $ {sd.price}</span>
                                <img
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                  src={sd.image != "" ? sd.image : defaultimage}
                                  alt=""
                                />
                                <h4>{sd.title}</h4>
                              </div>
                              <div class="package-box-appointment1-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: sd.description,
                                  }}
                                ></div>
                              </div>
                              {checkId(sd.id) === true ? (
                                <Button
                                  style={{ marginTop: "20px" }}
                                  variant="contained"
                                  color="secondary"
                                  endIcon={<HighlightOffIcon />}
                                  onClick={() => {
                                    removeSubPackages(sd.id);
                                  }}
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  style={{ marginTop: "20px" }}
                                  variant="contained"
                                  color="primary"
                                  endIcon={<AddIcon />}
                                  onClick={() => {
                                    addSubPackages(sd.id);
                                  }}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
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
        <hr class="spacer50px" />
        <div class="row">
          <div class="col-lg-6 col-md-6 mx-auto">
            <a
              href="#"
              onClick={() => {
                setSecondPackageTab(false);
                setPackageTab(true);
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
              href="javascript:void(0)"
              class="let_start_new"
              onClick={() => {
                savePackage();
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
