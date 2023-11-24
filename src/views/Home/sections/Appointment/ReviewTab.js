import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import login_icon from "../../../../images/login-icon2.png";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { APIURL, APIPath } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import { AuthContext } from "../../../../CommonMethods/Authentication";
const APIGetMiscPackages = APIURL() + "get-miscellaneous";
const APIGetUserData = APIURL() + "user-details";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ReviewTab(props) {
  const { setMiscPackageTab, setReviewTab, setPropertyTab } = props;
  const context = useContext(AuthContext);
  const [miscPackages, setMiscPackages] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  let history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      postRecord(APIGetUserData, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setCurrentUser(res.data[0].response.data.agent_profile);
        }
      });
    }
  }, [context.state.user]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
  };
  const saveMiscPackage = () => {
    if (miscPackages.length === 0) {
      setMessage("Please select any package");
      setOpenError(true);
    } else {
      localStorage.setItem("Misc_Package", JSON.stringify(miscPackages));
      // setMiscPackageTab(false);
    }
  };
  const handleCompanyIamge = () => {
    window.location.href = APIPath() + "register/?login";
  };
  return (
    <div class="appointment_page_right">
      {context.state.user ? (
        <React.Fragment>
          <div class="row">
            <div class="col-md-12">
              <h3>Review</h3>
              <div class="step_progress">
                <span>Step 3/4</span>
                <div class="progress" style={{ height: "20px" }}>
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="33"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 appointment-steps">
              <h4>Agent Information</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 review-table">
              <table
                class="table table-striped"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div class="row">
            <div class="col-md-12 package-box-description-loginimg text-center">
              <img src={login_icon} alt="" />
              <h3>Log in / Sign up</h3>
              <p>
                If you have a VirtualTourCafe Account, please login.
                <br /> If not, please register to create an account to continue
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 mx-auto text-center">
              <a href="#" class="btn btnThemeAlt " data-hover="Select">
                <button
                  onClick={() => {
                    history.push(
                      APIPath() + "register/?ReturnURL=" + "appointment"
                    );
                  }}
                  class="have_pics"
                >
                  Register / Login<i class="fas fa-arrow-right"></i>
                </button>
              </a>
            </div>
          </div>
        </React.Fragment>
      )}
      {/* <div class="row ag_info">
                    <div class="col-lg-12 col-md-12">
                        <div class="agent_info_sec">
                        <img src={login_icon} alt=""/>
							<h3>Log in / Sign up</h3>
                            <p>If you have a VirtualTourCafe Account, please login.<br /> If not, please register to create an account to continue</p>
                        </div>
                        <div class="agent_info_sec_cont">
                            <Button
                                style={{ marginTop: "20px", left: "36%" }}
                                variant="contained"
                                color="primary"
                                startIcon={<PersonAddIcon />}
                                onClick={() => {
                                    history.push(
                                        APIPath() + "register/?ReturnURL=" + "appointment"
                                    )
                                }}
                            >
                                Register / Login
                            </Button>
                        </div>
                    </div>
                </div> */}
      <hr class="spacer50px" />
      <div class="row">
        <div class="col-lg-6 col-md-6 mx-auto">
          <a
            href="#"
            onClick={() => {
              setMiscPackageTab(true);
              setReviewTab(false);
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
          {context.state.user && (
            <a
              style={{ cursor: "pointer" }}
              class="let_start_new"
              onClick={() => {
                //saveMiscPackage();
                setReviewTab(false);
                setPropertyTab(true);
              }}
            >
              Next <i class="fas fa-arrow-right"></i>
            </a>
          )}
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
