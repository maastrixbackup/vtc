import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
import Styles from "../../../../components/Payment/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { APIURL, APIPath } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import { AuthContext } from "../../../../CommonMethods/Authentication";
import AgentHeader from "../../../Dashboard/Header/AgentHeader";
import banner from "../../../../images/vtc-banner.jpg";
import $ from "jquery";
const APIGetEzFlashCard = APIURL() + "get-flashvideo";
const APIGetOrderPackages = APIURL() + "get-order-package";
const APIGetMiscPackages = APIURL() + "get-miscellaneous";

const APICreateSubscribeFlashVideo = APIURL() + "create-subscribe-flashvideo";
const APIFlashPayment = APIURL() + "flash-payment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function CheckoutTab(props) {
  const [flashcardData, setFlashCardData] = useState([]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agentId: JSON.parse(context.state.user).agentId,
        tourid: order_download_data.tourid,
      };
      postRecord(APIGetEzFlashCard, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          setFlashCardData(res.data[0].response.data);
        }
      });
    }
  }, []);

  var order_download_data = JSON.parse(
    localStorage.getItem("order_download_data")
  );
  console.log(order_download_data);
  var data = "";
  flashcardData.forEach((element) => {
    if (element.id == order_download_data.designid) data = element;
  });

  console.log("data:" + data);

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
      const payment_data = {
        authenticate_key: "abcd123XYZ",
        agent_id: order_download_data.agentId,
        tour_id: order_download_data.tourid,
        amount: order_download_data.design_amount,
        designid: order_download_data.designid,
      };
      postRecord(APIFlashPayment, payment_data).then((res) => {
        if (res.data[0].response.status === "success") {
          postRecord(APICreateSubscribeFlashVideo, order_download_data).then(
            (res) => {
              console.log(res.data.file);
              localStorage.setItem("file_link", res.data.file);
              const link = document.createElement("a");
              link.href = res.data.file;
              document.body.appendChild(link);
              link.setAttribute("target", "_blank");
              link.click();
            }
          );
        }
      });
    }
  };
  const cancelOrder = () => {
    localStorage.removeItem("order_download_data");
  };
  return (
    <>
      <AgentHeader />
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li>
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li class="active">
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
                    <li class="">
                      <Link to={APIPath() + "agent-support"}>Support</Link>
                    </li>
                  </ul>
                  <div class="gee_mobile">
                    <button onClick={() => ShowMenu()} class="gee_hamburger">
                      &#9776;
                    </button>
                    <button onClick={() => HideMenu()} class="gee_cross">
                      &#735;
                    </button>
                  </div>
                </div>
                <div class="gee_menu">
                  <ul>
                    <li class="">
                      <Link to={APIPath() + "agent-dashboard"}>My Cafe</Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "agent-tour-list"}>Tours</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "agent-flyer"}>Flyers</Link>
                    </li>
                    <li class="active">
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
                    <li>
                      <Link to={APIPath() + "agent-support"}>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="action_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8">
              <div class="cartpage-box-wh">
                <div class="product-cart-table">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Product Info</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src={data.design_photo} alt="" />
                        </td>
                        <td>{data.design_name}</td>
                        <td>$ {data.design_amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="cartpage-box-wh p-0">
                <h4>
                  Payment Details
                  <span>(Visa, MC, Amex Accepted)</span>
                </h4>

                <div class="cart-right-body">
                  <div class="form-group add-new">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Promocode"
                      style={{
                        width: "60%",
                        display: "inline-block",
                        marginRight: "2%",
                      }}
                    />

                    <button type="button" class="btn-apply" >
                      Apply Now
                    </button>
                  </div>
                  <div class="panel-body paymentmethod_form">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="Cardtype">CARD TYPE</label>
                          <select
                            name="area"
                            id="area1"
                            class="selectbox_fancy2"
                          >
                            <option value="">Select Card Type</option>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">Master Card</option>
                            <option value="Discover">Discover</option>
                            <option value="Amex">American Express</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                          <>
                            <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                <Field
                                  name="number"
                                  component="input"
                                  type="text"
                                  pattern="[\d| ]{16,22}"
                                  placeholder="Card Number"
                                  className="form-control"
                                  format={formatCreditCardNumber}
                                />
                              </div>
                              <div className="form-group">
                                <Field
                                  name="name"
                                  component="input"
                                  type="text"
                                  placeholder="Name"
                                  className="form-control"
                                />
                              </div>
                              <div
                                className="form-group"
                                style={{ display: "flex" }}
                              >
                                <Field
                                  style={{ width: "100%", marginRight: "10px" }}
                                  className="form-control"
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
                                  className="form-control"
                                  component="input"
                                  type="text"
                                  pattern="\d{3,4}"
                                  placeholder="CVV"
                                  format={formatCVC}
                                />
                              </div>

                              <div class="row">
                                <div class=" col-lg-12">
                                  <button
                                    type="submit"
                                    disabled={submitting}
                                    class="next_btn"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Submit
                                  </button>
                                  <button
                                    type="button"
                                    className="next_btn"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>
                            </form>
                          </>
                        );
                      }}
                    />
                    <div className="buttons">
                      <button
                        type="button"
                        class="next_btn grey"
                        onClick={() => cancelOrder()}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
