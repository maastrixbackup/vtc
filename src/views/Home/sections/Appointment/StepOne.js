import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { postRecord } from "../../../../CommonMethods/Save";
import { APIURL } from "../../../../CommonMethods/Fetch";
const APICheckZip = APIURL() + "check-zipcode";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function StepOne(props) {
  const { setAppointment, setPackageTab, setSecondPackageTab } = props;
  const initialBasicInfoState = {
    broker_id: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    interior_area: "",
    broker_zipcode: "",
    notes: "",
  };

  const [basicInfo, setBasicInfo] = useState(
    JSON.parse(localStorage.getItem("Basic_Info")) === null
      ? initialBasicInfoState
      : JSON.parse(localStorage.getItem("Basic_Info"))
  );
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
  };
  React.useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setBasicInfo({ ...basicInfo, [name]: value.replace(/\D/g, "") });
  };
  const saveThisToLocal = () => {
    console.log(basicInfo);
    if (basicInfo.zip === "") {
      setMessage("Please enter zipcode");
      setOpenError(true);
    } else if (basicInfo.address === "" || basicInfo.address === undefined) {
      setMessage("Please enter address");
      setOpenError(true);
    } else if (basicInfo.city === "" || basicInfo.address === undefined) {
      setMessage("Please enter city");
      setOpenError(true);
    } else if (basicInfo.state === "" || basicInfo.state === undefined) {
      setMessage("Please select state");
      setOpenError(true);
    } else if (basicInfo.notes === "" || basicInfo.state === undefined) {
      setMessage("Please Fill up all the input boxes");
      setOpenError(true);
    } else {
      const obj = { authenticate_key: "abcd123XYZ", zipcode: basicInfo.zip };
      postRecord(APICheckZip, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          localStorage.setItem("Basic_Info", JSON.stringify(basicInfo));
          if (localStorage.getItem("package_id")) {
            setAppointment(false);
            setSecondPackageTab(true);
            localStorage.removeItem('package_id')
          } else {
            setPackageTab(true);
            setAppointment(false);
          }
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      });
    }
  };
  const checkZip = () => {
    const obj = { authenticate_key: "abcd123XYZ", zipcode: basicInfo.zip };
    postRecord(APICheckZip, obj).then((res) => {
      console.log(res.data[0]);
      if (res.data[0].response.status === "success") {
        setMessage(res.data[0].response.message);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
      }
    });
  };
  const cancelOrder = () => {
    setBasicInfo(initialBasicInfoState);
    // localStorage.removeItem("Combo_Package");
    // localStorage.removeItem("Carte_Package");
    // localStorage.removeItem("Sub_Package");
    // localStorage.removeItem("Combo_Sub_Package");
    // localStorage.removeItem("Misc_Package");
    // localStorage.removeItem("Property_Info");
    localStorage.removeItem("Basic_Info");
    // window.location.reload();
  };  
  return (
    <div class="appointment_page_right">
      <div class="row">
        <div class="col-md-12">
          <h3>Appointment Information</h3>
          <div class="step_progress">
            <span>Step 1/4</span>
            <div class="progress" style={{ height: "20px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="33"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveThisToLocal();
        }}
      >
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">Broker Office ZIP Code </label>
              <input
                type="text"
                onChange={handlePhoneChange}
                name="broker_zipcode"
                value={basicInfo.broker_zipcode}
                class="form-control"
                maxLength={6}
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">Listing ZIP Code *</label>
              <input
                type="text"
                onChange={handlePhoneChange}
                name="zip"
                value={basicInfo.zip}
                class="form-control"
                required
                maxLength={6}
                onBlur={checkZip}
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">Interior Sq Ft</label>
              <select
                onChange={handleInputchange}
                name="interior_area"
                value={basicInfo.interior_area}
                id="area"
                class="selectbox_fancy2"
              >
                <option value="">Select Sqft</option>
                <option value="Under 2000 Sq Ft">Under 2000 Sq Ft</option>
                <option value="2001-3000 Sq Ft">2001-3000 Sq Ft</option>
                <option value="3001-4000 Sq Ft">3001-4000 Sq Ft</option>
                <option value="4001-5000 Sq Ft">4001-5000 Sq Ft</option>
                <option value="5001-6000 Sq Ft">5001-6000 Sq Ft</option>
                <option value="6001-7000 Sq Ft">6001-7000 Sq Ft</option>
                <option value="7001-8000 Sq Ft">7001-8000 Sq Ft</option>
                <option value="Over 8000 Sq Ft">Over 8000 Sq Ft</option>
                <option value="Vacant Lot">Vacant Lot</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col-md-6">
            <h3>Address</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">Listing Street Address*</label>
              <input
                type="text"
                onChange={handleInputchange}
                name="address"
                value={basicInfo.address}
                class="form-control"
                required
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">Listing City*</label>
              <input
                type="text"
                onChange={handleInputchange}
                name="city"
                value={basicInfo.city}
                class="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">State *</label>
              <select
                onChange={handleInputchange}
                name="state"
                value={basicInfo.state}
                id="state"
                class="selectbox_fancy2"
                required
              >
                <option value="">Select State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">DC</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VI">VI</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="text1">ZIP Code*</label>
              <input
                type="text"
                onChange={handlePhoneChange}
                name="zip"
                value={basicInfo.zip}
                class="form-control"
                required
                maxLength={6}
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>
                How will our photographer gain access to the property?*
              </label>
              <input
                type="text"
                name="notes"
                value={basicInfo.notes}
                onChange={handleInputchange}
                class="form-control"
                required
              />
            </div>
          </div>
          {/* <div class="col-md-6">
                        <div class="form-group">
                            <label for="text1">Interior Sq Ft</label>
                            <select onChange={handleInputchange} name="squre_feet" value={basicInfo.squre_feet} id="area" class="selectbox_fancy2">
                                <option value="">Select Sqft</option>
                                <option value="Under 2000 Sq Ft">Under 2000 Sq Ft</option>
                                <option value="2001-3000 Sq Ft">2001-3000 Sq Ft</option>
                                <option value="3001-4000 Sq Ft">3001-4000 Sq Ft</option>
                                <option value="4001-5000 Sq Ft">4001-5000 Sq Ft</option>
                                <option value="5001-6000 Sq Ft">5001-6000 Sq Ft</option>
                                <option value="6001-7000 Sq Ft">6001-7000 Sq Ft</option>
                                <option value="7001-8000 Sq Ft">7001-8000 Sq Ft</option>
                                <option value="Over 8000 Sq Ft">Over 8000 Sq Ft</option>
                                <option value="Vacant Lot">Vacant Lot</option>
                            </select>
                        </div>
                    </div> */}
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-6 mx-auto">
            <a
              onClick={() => {
                cancelOrder();
              }}
              class="let_start"
              style={{ margin: "0 20px 0 0" }}
            >
              <i
                style={{ marginRight: "20px", marginLeft: "0" }}
                class="fas fa-undo"
              ></i>
              Reset{" "}
            </a>
            <a
              type="submit"
              style={{ cursor: "pointer" }}
              class="let_start_new"
              onClick={() => {
                saveThisToLocal();
              }}
            >
              Next <i class="fas fa-arrow-right"></i>
            </a>
          </div>
          {/* <div class="col-md-12">
                        <button style={{ borderRadius: "5px" }} type="submit" class="btn-style-one"
                        >Next</button>
                    </div> */}
        </div>
      </form>
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
