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

  // console.log(flashcardData);
  var order_download_data = JSON.parse(
    localStorage.getItem("order_download_data")
  );
  console.log(order_download_data);
  var data = "";
  flashcardData.forEach((element) => {
    if (element.id == order_download_data.designid) data = element;
  });

  console.log('data:'+data);

  // console.log(order_download_data);
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
  // const handlechange = (event) => {
  //   const { name, value } = event.target;
  //   setCardDetails({ ...cardDetails, [name]: value.replace(/[^a-z ]/gi, "") });
  // };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCardDetails({ ...cardDetails, [name]: value });
  // };
  // const handlePhoneChange = (event) => {
  //   const { name, value } = event.target;
  //   setCardDetails({ ...cardDetails, [name]: value.replace(/\D/g, "") });
  // };
  // useEffect(() => {
  //   window.scrollTo(0, 400);
  // }, []);
  // useEffect(() => {
  //   let unique_carte = JSON.parse(localStorage.getItem("Carte_Package")).filter(
  //     (item, i, ar) => ar.indexOf(item) === i
  //   );
  //   const obj = {
  //     authenticate_key: "abcd123XYZ",
  //     combopackages: JSON.parse(localStorage.getItem("Combo_Package")),
  //     category_list: unique_carte,
  //   };
  //   postRecord(APIGetOrderPackages, obj).then((res) => {
  //     if (res.data[0].response.status === "success") {
  //       setAllData(res.data[0].response.data);
  //       // res.data[0].response.data.package.forEach(res => {
  //       //     setPackages([...packages, res.package_details])
  //       // })
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   const obj = { authenticate_key: "abcd123XYZ" };
  //   postRecord(APIGetMiscPackages, obj).then((res) => {
  //     if (res.data[0].response.status === "success") {
  //       setMiscData(res.data[0].response.data.miscellaneous);
  //     }
  //   });
  // }, []);
  // console.log(allData);
  // console.log(packages);
  // useEffect(() => {
  //   var price = 0;
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
  // function insert(str, index, value) {
  //   return str.substr(0, index) + value + str.substr(index);
  // }
  // function GetCardType(number) {
  //   var re = {
  //     electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
  //     maestro:
  //       /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
  //     dankort: /^(5019)\d+$/,
  //     interpayment: /^(636)\d+$/,
  //     unionpay: /^(62|88)\d+$/,
  //     visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  //     mastercard: /^5[1-5][0-9]{14}$/,
  //     amex: /^3[47][0-9]{13}$/,
  //     diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  //     discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  //     jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  //   };
  //   for (var key in re) {
  //     if (re[key].test(number)) {
  //       return key;
  //     }
  //   }
  // }
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
              // if (res.data[0].response.status === "success") {
              //   console.log(res.data[0].response);
              //   localStorage.setItem(
              //     "file_link",
              //     res.data[0].response.data.file
              //   );
              // }
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
                  {/*<div class="cash_on_sec_new_new">
                    <a href="#">
                      <i class="fas fa-times-circle"></i>
                    </a>
                    <label class="contain_sec_new">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                      <div class="cash_on_sec_cont_new_new">
                        <h6>Visa XXXX1639</h6>
                        <p>Expiry Date : 08/2022</p>
                      </div>
                    </label>
                  </div>

                  <div class="cash_on_sec_new_new">
                    <a href="#">
                      <i class="fas fa-times-circle"></i>
                    </a>
                    <label class="contain_sec_new">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                      <div class="cash_on_sec_cont_new_new">
                        <h6>Visa XXXX1639</h6>
                        <p>Expiry Date : 08/2022</p>
                      </div>
                    </label>
                  </div>

                  <div class="cash_on_sec_new_new">
                    <label class="contain_sec_new">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                      <div class="cash_on_sec_cont_new_new">
                        <h6>Add New</h6>
                      </div>
                    </label>
  </div>*/}

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
                                  style={{ marginRight:'10px' }}
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
      {/* <div class="row">
      //   <div class="col-md-12">
      //     <h3>Checkout</h3>
      //     <div class="step_progress">
      //       <div class="progress" style={{ height: "20px" }}>
      //         <div
      //           class="progress-bar"
      //           role="progressbar"
      //           style={{ width: "100%" }}
      //           aria-valuenow="33"
      //           aria-valuemin="0"
      //           aria-valuemax="100"
      //         ></div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // <div class="Order_cont">
      //   <div>
      //     <table class="table">
      //       <thead>
      //         <tr>
      //           <th width="14%">PRODUCT</th>
      //           <th width="60%">PRODUCT INFO</th>
      //           <th width="14%">PRICE</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         <tr>
      //           <td align="left" valign="middle">
      //             <span class="cartpage_products_content1">
      //               <img
      //                 src={data.design_photo}
      //                 alt="Standard"
      //                 data-uw-rm-ima-original="standard"
      //               />
      //             </span>
      //           </td>
      //           <td>
      //             <h5>{data.design_name}</h5>
      //           </td>
      //           <td align="right" valign="middle">
      //             <p data-uw-rm-sr="">${order_download_data.design_amount}</p>
      //           </td>
      //         </tr>
      //       </tbody>
      //     </table>
                      //   </div>*/}

      {/* <div class="row">
                    <div class="col-md-6">
                        <div class="panel-body paymentmethod_form">
                            <div class="form-group">
                                <label for="cardNumber">CARD NUMBER</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="cc_num" value={cardDetails.cc_num} onChange={handlePhoneChange} name="cc_num" placeholder="Valid Card Number" minLength={16} maxLength={18} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cardNumber">CARD HOLDER NAME</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="cc_name" value={cardDetails.cc_name} onChange={handlechange} name="cc_name" placeholder="Card Holder Name" required="" />
                                </div>
                            </div>
                            <div class="row">
                                <div class=" col-lg-12">
                                    <div class="form-group">
                                        <label for="expityMonth"> EXPIRY DATE</label>
                                        <div class="row">
                                            <div class="col-xs-6 col-lg-6 pl-ziro">
                                                <input type="text" class="form-control" id="cc_month" value={cardDetails.cc_month} onChange={handlePhoneChange} name="cc_month" placeholder="MM" maxLength={2} />
                                            </div>
                                            <div class="col-xs-6 col-lg-6 pl-ziro">
                                                <input type="text" class="form-control" id="cc_year" value={cardDetails.cc_year} onChange={handlePhoneChange} name="cc_year" placeholder="YYYY" maxLength={4} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cardNumber">CVV</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="cvv" value={cardDetails.cvv} onChange={handlePhoneChange} name="cvv" placeholder="cvv" maxLength={3} />
                                </div>
                            </div>
                            <hr class="spacer10px"></hr>
                            <hr class="spacer30px"></hr>
                            <hr class="spacer30px"></hr>

                            <div class="row">
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="checkout_pricebox">
                            <table width="100%" cellspacing="5" cellpadding="5" border="0">
                                <tbody>
                                    <tr>
                                        <td width="60%">Order Total</td>
                                        <td width="40%" align="right"><strong>$ {price + ".00"}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Estimated Tax</td>
                                        <td align="right"><strong>$0.00</strong></td>
                                    </tr>

                                    <tr>
                                        <td colspan="2" height="5px"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style={{ padding: "0" }} height="3px" bgcolor="#dedede"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" height="5px"></td>
                                    </tr>
                                    <tr>
                                        <td>Order total (1 item)</td>
                                        <td align="right"><strong>$ {price + ".00"}</strong></td>
                                    </tr>

                                    <tr>
                                        <td colspan="2" height="15px"></td>
                                    </tr>

                                    <tr>
                                        <td colspan="2" align="center">
                                            <div class="placeoder">
                                                <a onClick={onSubmit}>Place Your Order</a>
                                                <a onClick={() => {
                                                    setCheckoutTab(false);
                                                    setPackageTab(true);
                                                }}>Add/Update Package</a>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div class="disclaimer_order4"><h6>Disclaimer:</h6>
                            <p>Your order will be reviewed
                                confirmed by our amazing
                                staff! If any changes are
                                necessary, or we are not able to
                                your requirements, your order
                                promptly refunded.</p>
                        </div>

                    </div>
                </div> 
        // <div class="row" style={{ display: "grid" }}>
        //   <Styles>
        //     <Form
        //       onSubmit={onSubmit}
        //       render={({
        //         handleSubmit,
        //         form,
        //         submitting,
        //         pristine,
        //         values,
        //         active,
        //       }) => {
        //         return (
        //           <form onSubmit={handleSubmit}>
        //             <Card
        //               number={values.number || ""}
        //               name={values.name || ""}
        //               expiry={values.expiry || ""}
        //               cvv={values.cvc || ""}
        //               focused={active}
        //             />
        //             <div>
        //               <Field
        //                 name="number"
        //                 component="input"
        //                 type="text"
        //                 pattern="[\d| ]{16,22}"
        //                 placeholder="Card Number"
        //                 format={formatCreditCardNumber}
        //               />
        //             </div>
        //             <div>
        //               <Field
        //                 name="name"
        //                 component="input"
        //                 type="text"
        //                 placeholder="Name"
        //               />
        //             </div>
        //             <div>
        //               <Field
        //                 name="expiry"
        //                 component="input"
        //                 type="text"
        //                 pattern="\d\d/\d\d"
        //                 placeholder="Expiration Date"
        //                 format={formatExpirationDate}
        //               />
        //               <Field
        //                 style={{ width: "50px" }}
        //                 name="cvc"
        //                 component="input"
        //                 type="text"
        //                 pattern="\d{3,4}"
        //                 placeholder="CVV"
        //                 format={formatCVC}
        //               />
        //             </div>
        //             <div className="buttons">
        //               <button type="submit" disabled={submitting}>
        //                 Submit
        //               </button>
        //               <button
        //                 type="button"
        //                 onClick={form.reset}
        //                 disabled={submitting || pristine}
        //               >
        //                 Reset
        //               </button>
        //             </div>
        //           </form>
        //         );
        //       }}
        //     />
        //   </Styles>
        // </div>
        */}

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
