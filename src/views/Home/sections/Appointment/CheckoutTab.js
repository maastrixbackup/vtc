import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import projimg from "../../../../images/proj.jpg";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Form, Field } from "react-final-form";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../../../components/Payment/cardUtils";
import Card from "../../../../components/Payment/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Styles from "../../../../components/Payment/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { APIURL, APIPath } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import { AuthContext } from "../../../../CommonMethods/Authentication";
const APIGetOrderPackages = APIURL() + "get-order-package";
const APIGetMiscPackages = APIURL() + "get-miscellaneous";
const APISaveAppointment = APIURL() + "appointment-save";
const APISaveLater = APIURL() + "save-for-later";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function CheckoutTab(props) {
  let history = useHistory();
  const classes = useStyles();
  const { setAppointment, setCheckoutTab, setPackageTab, setMiscPackageTab } =
    props;

  const context = useContext(AuthContext);
  const [allData, setAllData] = useState({});
  const [miscData, setMiscData] = useState({});
  const [propertyInfo, setPropertyInfo] = useState(
    JSON.parse(localStorage.getItem("Property_Info"))
  );
  const [basicInfo, setBasicInfo] = useState(
    JSON.parse(localStorage.getItem("Basic_Info"))
  );
  const [price, setPrice] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [packages, setPackages] = useState([]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handlechange = (event) => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value.replace(/[^a-z ]/gi, "") });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value.replace(/\D/g, "") });
  };
  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  useEffect(() => {
    let unique_carte = JSON.parse(localStorage.getItem("Carte_Package")).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    const obj = {
      authenticate_key: "abcd123XYZ",
      combopackages: JSON.parse(localStorage.getItem("Combo_Package")),
      category_list: unique_carte,
    };
    postRecord(APIGetOrderPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllData(res.data[0].response.data);
        // res.data[0].response.data.package.forEach(res => {
        //     setPackages([...packages, res.package_details])
        // })
      }
    });
  }, []);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetMiscPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setMiscData(res.data[0].response.data.miscellaneous);
      }
    });
  }, []);
  // console.log(allData);
  // console.log(packages);
  // useEffect(() => {
  //   let price = 0;
  //   if (Object.keys(allData).length > 0) {
  //     allData.package.forEach((element) => {
  //       element.package_details.forEach((res) => {
  //         JSON.parse(localStorage.getItem("Sub_Package")).forEach((sd) => {
  //           if (res.id === sd) {
  //             price += res.price;
  //           }
  //         });
  //       });
  //     });
  //   }
  //   if (Object.keys(miscData).length > 0) {
  //     miscData.miscellaneous_details.forEach((element) => {
  //       JSON.parse(localStorage.getItem("Misc_Package")).forEach((res) => {
  //         if (element.id === res) {
  //           price += element.price;
  //         }
  //       });
  //     });
  //   }
  //   setPrice(price);
  // }, [allData, miscData]);
  useEffect(() => {
    let total = 0;

    const subPackages = JSON.parse(localStorage.getItem("Sub_Package")) || [];
    const comboSubPackages =
      JSON.parse(localStorage.getItem("Combo_Sub_Package")) || [];
    const miscSelected = JSON.parse(localStorage.getItem("Misc_Package")) || [];

    // A-La-Carte packages (carte)
    if (allData?.package?.length > 0) {
      allData.package.forEach((pkg) => {
        pkg.package_details.forEach((detail) => {
          if (subPackages.includes(detail.id)) {
            total += parseFloat(detail.price);
          }
        });
      });
    }

    // ✅ Combo packages from backend response
    if (allData?.combopackage?.length > 0) {
      allData.combopackage.forEach((pkg) => {
        pkg.package_details.forEach((detail) => {
          if (comboSubPackages.includes(detail.id)) {
            total += parseFloat(detail.price);
          }
        });
      });
    }

    // Misc packages
    if (miscData?.miscellaneous_details?.length > 0) {
      miscData.miscellaneous_details.forEach((detail) => {
        if (miscSelected.includes(detail.id)) {
          total += parseFloat(detail.price);
        }
      });
    }

    setPrice(total);
  }, [allData, miscData]);

  function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }
  function GetCardType(number) {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro:
        /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    };
    for (var key in re) {
      if (re[key].test(number)) {
        return key;
      }
    }
  }

  const onSubmit1 = async (values) => {
    if (values.number === undefined) {
      setMessage("Please enter card number");
      setOpenError(true);
    } else if (values.name === undefined) {
      setMessage("Please enter Full name");
      setOpenError(true);
    } else if (values.cvc === undefined) {
      setMessage("Please enter CVV");
      setOpenError(true);
    } else if (values.expiry === undefined) {
      setMessage("Please enter Expiry date");
      setOpenError(true);
    } else {
      setOpenModal(false);
      setOpen(true);

      var date = values.expiry;
      var parts = date.split("/");
      values.authenticate_key = "abcd123XYZ";
      values.agent_id = JSON.parse(context.state.user).agentId;
      values.address = basicInfo.address;
      values.city = basicInfo.city;
      values.zipcode = basicInfo.zip;
      values.notes = basicInfo.notes;
      values.combocategories =
        JSON.parse(localStorage.getItem("Combo_Package")) || [];
      values.categories = JSON.parse(localStorage.getItem("Carte_Package"));
      values.packageid = JSON.parse(localStorage.getItem("Sub_Package"));
      values.combopackageid = JSON.parse(
        localStorage.getItem("Combo_Sub_Package")
      );
      values.miscellaneousids = JSON.parse(
        localStorage.getItem("Misc_Package")
      );
      values.parent_category = JSON.parse(
        localStorage.getItem("Carte_Package")
      );
      values.cc_month = parts[0];
      values.cc_year = insert(parts[1], 0, "20");
      // values.card_type = GetCardType(parseInt(values.number.split(" ").join('')));
      values.card_no = values.number.split(" ").join("");
      values.card_holder = values.name;
      values.cvv_no = values.cvc;
      values.amount = price;
      values.bed_room = propertyInfo.bed_room;
      values.bath_room = propertyInfo.bath_room;
      values.square_footage = propertyInfo.square_footage;
      values.mls = propertyInfo.mls;
      values.caption = propertyInfo.caption;
      values.description = propertyInfo.description;
      values.year_built = propertyInfo.year_built;
      values.state = basicInfo.state;
      values.interior_area = basicInfo.interior_area;
      values.first_choice = propertyInfo.first_choice;
      values.second_choice = propertyInfo.second_choice;
      values.third_choice = propertyInfo.third_choice;
      values.first_time = propertyInfo.first_time;
      values.second_time = propertyInfo.second_time;
      values.third_time = propertyInfo.third_time;
      values.brokerid = basicInfo.broker_id;
      values.notes = basicInfo.notes;
      values.pay_later = 1;
      postRecord(APISaveAppointment, values)
        .then((res) => {
          setOpen(false);
          if (res.data[0].response.status === "success") {
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
            localStorage.removeItem("Combo_Package");
            localStorage.removeItem("Carte_Package");
            localStorage.removeItem("Sub_Package");
            localStorage.removeItem("Combo_Sub_Package");
            localStorage.removeItem("Misc_Package");
            localStorage.removeItem("Property_Info");
            localStorage.removeItem("Basic_Info");
            window.location.href = APIPath() + "agent-order-list";
            // history.push(APIPath() + "agent-order-list");
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
          }
        })
        .catch((err) => {
          setOpen(false);
          setMessage("Error Occured");
          setOpenError(true);
        });
    }
  };
  const onSubmit = async (values) => {
    if (values.number === undefined) {
      setMessage("Please enter card number");
      setOpenError(true);
    } else if (values.name === undefined) {
      setMessage("Please enter Full name");
      setOpenError(true);
    } else if (values.cvc === undefined) {
      setMessage("Please enter CVV");
      setOpenError(true);
    } else if (values.expiry === undefined) {
      setMessage("Please enter Expiry date");
      setOpenError(true);
    } else {
      setOpenModal(false);
      setOpen(true);

      var date = values.expiry;
      var parts = date.split("/");
      values.authenticate_key = "abcd123XYZ";
      values.agent_id = JSON.parse(context.state.user).agentId;
      values.address = basicInfo.address;
      values.city = basicInfo.city;
      values.zipcode = basicInfo.zip;
      values.notes = basicInfo.notes;
      values.combocategories = JSON.parse(
        localStorage.getItem("Combo_Package")
      );
      values.categories = JSON.parse(localStorage.getItem("Carte_Package"));
      values.packageid = JSON.parse(localStorage.getItem("Sub_Package"));
      values.combopackageid = JSON.parse(
        localStorage.getItem("Combo_Sub_Package")
      );
      values.miscellaneousids = JSON.parse(
        localStorage.getItem("Misc_Package")
      );
      values.parent_category = JSON.parse(
        localStorage.getItem("Carte_Package")
      );
      values.cc_month = parts[0];
      values.cc_year = insert(parts[1], 0, "20");
      // values.card_type = GetCardType(parseInt(values.number.split(" ").join('')));
      values.card_no = values.number.split(" ").join("");
      values.card_holder = values.name;
      values.cvv_no = values.cvc;
      values.amount = price;
      values.bed_room = propertyInfo.bed_room;
      values.bath_room = propertyInfo.bath_room;
      values.square_footage = propertyInfo.square_footage;
      values.mls = propertyInfo.mls;
      values.caption = propertyInfo.caption;
      values.description = propertyInfo.description;
      values.year_built = propertyInfo.year_built;
      values.state = basicInfo.state;
      values.interior_area = basicInfo.interior_area;
      values.first_choice = propertyInfo.first_choice;
      values.second_choice = propertyInfo.second_choice;
      values.third_choice = propertyInfo.third_choice;
      values.first_time = propertyInfo.first_time;
      values.second_time = propertyInfo.second_time;
      values.third_time = propertyInfo.third_time;
      values.brokerid = basicInfo.broker_id;
      values.notes = basicInfo.notes;
      values.pay_later = 0;
      postRecord(APISaveAppointment, values)
        .then((res) => {
          setOpen(false);
          if (res.data[0].response.status === "success") {
            setMessage(res.data[0].response.message);
            setOpenSuccess(true);
            localStorage.removeItem("Combo_Package");
            localStorage.removeItem("Carte_Package");
            localStorage.removeItem("Sub_Package");
            localStorage.removeItem("Combo_Sub_Package");
            localStorage.removeItem("Misc_Package");
            localStorage.removeItem("Property_Info");
            localStorage.removeItem("Basic_Info");
            window.location.href = APIPath() + "agent-order-list";
            // history.push(APIPath() + "agent-order-list");
          } else {
            setMessage(res.data[0].response.message);
            setOpenError(true);
          }
        })
        .catch((err) => {
          setOpen(false);
          setMessage("Error Occured");
          setOpenError(true);
        });
    }
  };
  const saveForLater = () => {
    const values = {};
    values.authenticate_key = "abcd123XYZ";
    values.agent_id = JSON.parse(context.state.user).agentId;
    values.street_address = basicInfo.address;
    values.address = basicInfo.address;
    values.city = basicInfo.city;
    values.zipcode = basicInfo.zip;
    values.notes = basicInfo.notes;
    values.combocategories = JSON.parse(
      localStorage.getItem("Combo_Package")
    ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.categories = JSON.parse(
      localStorage.getItem("Carte_Package")
    ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.packageid = JSON.parse(localStorage.getItem("Sub_Package")).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    if (localStorage.getItem("Combo_Sub_Package") != null)
      values.combopackageid = JSON.parse(
        localStorage.getItem("Combo_Sub_Package")
      ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.miscellaneousids = JSON.parse(
      localStorage.getItem("Misc_Package")
    ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.parent_category = JSON.parse(
      localStorage.getItem("Carte_Package")
    ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.comboparent_category = JSON.parse(
      localStorage.getItem("Combo_Package")
    ).filter((item, i, ar) => ar.indexOf(item) === i);
    values.amount = price;
    values.bed_room = propertyInfo.bed_room;
    values.bath_room = propertyInfo.bath_room;
    values.square_footage = propertyInfo.square_footage;
    values.caption = propertyInfo.caption;
    values.description = propertyInfo.description;
    values.year_built = propertyInfo.year_built;
    values.mls = propertyInfo.mls;
    values.state = basicInfo.state;
    values.first_choice = propertyInfo.first_choice;
    values.second_choice = propertyInfo.second_choice;
    values.third_choice = propertyInfo.third_choice;
    values.first_time = propertyInfo.first_time;
    values.second_time = propertyInfo.second_time;
    values.third_time = propertyInfo.third_time;
    values.brokerid = basicInfo.broker_id;
    postRecord(APISaveLater, values).then((res) => {
      if (res.data[0].response.status === "success") {
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        localStorage.removeItem("Combo_Package");
        localStorage.removeItem("Carte_Package");
        localStorage.removeItem("Sub_Package");
        localStorage.removeItem("Combo_Sub_Package");
        localStorage.removeItem("Misc_Package");
        localStorage.removeItem("Property_Info");
        history.push(APIPath() + "agent-pending-order-list");
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
      }
    });
  };
  const cancelOrder = () => {
    localStorage.removeItem("Combo_Package");
    localStorage.removeItem("Carte_Package");
    localStorage.removeItem("Sub_Package");
    localStorage.removeItem("Combo_Sub_Package");
    localStorage.removeItem("Misc_Package");
    localStorage.removeItem("Property_Info");
    localStorage.removeItem("Basic_Info");
    setAppointment(true);
    setCheckoutTab(false);
  };
  return (
    <div class="appointment_page_right">
      <div class="row">
        <div class="col-md-12">
          <h3>Ckeckout</h3>
          <div class="step_progress">
            <span>Step 4/4</span>
            <div class="progress" style={{ height: "20px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
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
          <table width="100%" border="0" cellspacing="5" cellpadding="5">
            <tbody>
              <tr>
                <td width="60%">Order Total</td>
                <td width="40%" align="right">
                  <strong>$ {price + ".00"}</strong>
                </td>
              </tr>
              <tr>
                <td>Estimated Tax</td>
                <td align="right">
                  <strong>$0.00</strong>
                </td>
              </tr>
              <tr>
                <td colspan="2" height="5px"></td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  bgcolor="#dedede"
                  height="3px"
                  style={{ padding: "0" }}
                ></td>
              </tr>
              <tr>
                <td colspan="2" height="5px"></td>
              </tr>
              <tr>
                <td>Order total</td>
                <td align="right">
                  <strong>$ {price + ".00"}</strong>
                </td>
              </tr>
              <tr>
                <td colspan="2" height="15px"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row" style={{ display: "grid" }}>
          <Styles>
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Card
                      number={values.number || ""}
                      name={values.name || ""}
                      expiry={values.expiry || ""}
                      cvv={values.cvc || ""}
                      focused={active}
                    />
                    <div>
                      <Field
                        name="number"
                        component="input"
                        type="text"
                        pattern="[\d| ]{16,22}"
                        placeholder="Card Number"
                        format={formatCreditCardNumber}
                      />
                    </div>
                    <div>
                      <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <Field
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="Expiration Date"
                        format={formatExpirationDate}
                      />
                      <Field
                        style={{ width: "50px" }}
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="CVV"
                        format={formatCVC}
                      />
                    </div>
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                );
              }}
            />
          </Styles>
        </div>
        <div class="row" style={{ display: "grid" }}>
          <Styles>
            <Form
              onSubmit={onSubmit1}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Field
                        style={{ display: "none" }}
                        name="number"
                        component="input"
                        type="text"
                        pattern="[\d| ]{16,22}"
                        placeholder="Card Number"
                        format={formatCreditCardNumber}
                        defaultValue="5424000000000015"
                      />
                    </div>
                    <div>
                      <Field
                        style={{ display: "none" }}
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Name"
                        defaultValue="uma_test"
                      />
                    </div>
                    <div>
                      <Field
                        style={{ display: "none" }}
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="Expiration Date"
                        format={formatExpirationDate}
                        defaultValue="12/25"
                      />
                      <Field
                        style={{ display: "none" }}
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="CVV"
                        format={formatCVC}
                        defaultValue={"999"}
                      />
                    </div>
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Pay Later
                      </button>
                    </div>
                  </form>
                );
              }}
            />
          </Styles>
        </div>
        <div class="row">
          <div class="col-lg-12 mx-auto text-center">
            <a
              onClick={() => cancelOrder()}
              class="let_start"
              style={{ margin: "0px 20px 0px 0px" }}
            >
              <i
                style={{ marginRight: "10px", marginLeft: "0px" }}
                class="far fa-times"
              ></i>
              Cancel{" "}
            </a>
            <a
              onClick={() => {
                saveForLater();
                // setPackageTab(true);
              }}
              style={{ cursor: "pointer" }}
              class="let_start_new"
            >
              Save For Later{" "}
              <i
                style={{ marginRight: "10px", marginLeft: "0px" }}
                class="far fa-save"
              ></i>
            </a>
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
    </div>
  );
}
