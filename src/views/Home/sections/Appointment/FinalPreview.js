import React, { useEffect, useState, useContext } from "react";
import projimg from "../../../../images/proj.jpg";
import dateFormat from "dateformat";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { APIURL, APIPath } from "../../../../CommonMethods/Fetch";
import { postRecord } from "../../../../CommonMethods/Save";
import { AuthContext } from "../../../../CommonMethods/Authentication";
const APIGetOrderPackages = APIURL() + "get-order-package";
const APIGetMiscPackages = APIURL() + "get-miscellaneous";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function FinalPreview(props) {
  const { setFinalPreviewtab, setCheckoutTab, setPropertyTab } = props;
  const [allData, setAllData] = useState([]);
  const [miscData, setMiscData] = useState({});
  const [propertyInfo] = useState(
    JSON.parse(localStorage.getItem("Property_Info"))
  );
  const [basicInfo] = useState(JSON.parse(localStorage.getItem("Basic_Info")));
  const [sync, setSync] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 400);
  }, []);
  useEffect(() => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      combopackages:
        JSON.parse(localStorage.getItem("Combo_Package")) !== null
          ? JSON.parse(localStorage.getItem("Combo_Package")).filter(
              (item, i, ar) => ar.indexOf(item) === i
            )
          : [],
      category_list:
        JSON.parse(localStorage.getItem("Carte_Package")) !== null
          ? JSON.parse(localStorage.getItem("Carte_Package")).filter(
              (item, i, ar) => ar.indexOf(item) === i
            )
          : [],
    };
    postRecord(APIGetOrderPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllData(res.data[0].response.data);
      }
    });
  }, [sync]);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetMiscPackages, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        setMiscData(res.data[0].response.data.miscellaneous);
      }
    });
  }, []);
  const removeSubPackages = (id) => {
    const index = arrayRemove(
      JSON.parse(localStorage.getItem("Sub_Package")),
      id
    );
    console.log(index);
    var arr = [];
    if (index.length > 0) {
      localStorage.setItem("Sub_Package", index);
    } else {
      localStorage.setItem("Sub_Package", JSON.stringify(arr));
    }
    setSync(true);
    setSync(false);
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
  console.log(allData);
  return (
    <div class="appointment_page_right">
      <div class="row">
        <div class="col-md-12">
          <h3>Review Orders</h3>
          <div class="step_progress">
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
              <div class="package-box-appointment">
                <div class="">
                  {Object.keys(allData).length > 0 ? (
                    allData.package.map((res) => (
                      <div>
                        <div class="col-md-12 appointment-steps">
                          <h4>{res.title}</h4>
                        </div>
                        <div class="package-box-appointment">
                          <div class="row">
                            {res.package_details &&
                              res.package_details.map(
                                (sd) =>
                                  JSON.parse(
                                    localStorage.getItem("Sub_Package")
                                  ).length > 0 &&
                                  JSON.parse(
                                    localStorage.getItem("Sub_Package")
                                  ).map((pkg) =>
                                    sd.id === pkg ? (
                                      <div class="col-md-6">
                                        <div class="package-box-description">
                                          <div class="package-box-appointment1">
                                            <span class="pricetag">
                                              {" "}
                                              $ {sd.price}
                                            </span>
                                            {/* <span class="delete-package"><a onClick={()=>removeSubPackages(sd.id)}><i class="fas fa-trash-alt"></i></a></span> */}
                                            <img
                                              style={{
                                                height: "200px",
                                                width: "100%",
                                                objectFit: "cover",
                                              }}
                                              src={sd.image}
                                            />
                                            <h4>{sd.title}</h4>
                                          </div>
                                          <div class="package-box-appointment1-content">
                                            <div
                                              // eslint-disable-next-line react/no-danger
                                              dangerouslySetInnerHTML={{
                                                __html: sd.description,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )
                                  )
                              )}
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
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="package_sec">
              <div class="package-box-appointment">
                <div class="">
                  {Object.keys(allData).length > 0 ? (
                    allData.combo_package.map((res) => (
                      <div>
                        <div class="col-md-12 appointment-steps">
                          <h4>{res.title}</h4>
                        </div>
                        <div class="package-box-appointment">
                          <div class="row">
                            {res.package_details &&
                              res.package_details.map(
                                (sd) =>
                                  JSON.parse(
                                    localStorage.getItem("Sub_Package")
                                  ).length > 0 &&
                                  JSON.parse(
                                    localStorage.getItem("Sub_Package")
                                  ).map((pkg) =>
                                    sd.id === pkg ? (
                                      <div class="col-md-6">
                                        <div class="package-box-description">
                                          <div class="package-box-appointment1">
                                            <span class="pricetag">
                                              {" "}
                                              $ {sd.price}
                                            </span>
                                            {/* <span class="delete-package"><a onClick={()=>removeSubPackages(sd.id)}><i class="fas fa-trash-alt"></i></a></span> */}
                                            <img
                                              style={{
                                                height: "200px",
                                                width: "100%",
                                                objectFit: "cover",
                                              }}
                                              src={sd.image}
                                            />
                                            <h4>{sd.title}</h4>
                                          </div>
                                          <div class="package-box-appointment1-content">
                                            <div
                                              // eslint-disable-next-line react/no-danger
                                              dangerouslySetInnerHTML={{
                                                __html: sd.description,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )
                                  )
                              )}
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
        {JSON.parse(localStorage.getItem("Misc_Package")).length > 0 && (
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-12 appointment-steps">
                <h4>Miscellaneous Packages</h4>
              </div>
            </div>
          </div>
        )}
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="package_sec">
              <div class="package-box-appointment">
                <div class="row">
                  {Object.keys(miscData).length > 0 ? (
                    miscData.miscellaneous_details.map((sd) =>
                      JSON.parse(localStorage.getItem("Misc_Package")).map(
                        (msc) =>
                          sd.id === msc ? (
                            <div class="col-md-6">
                              <div class="package-box-description">
                                <div class="package-box-appointment1">
                                  <span class="pricetag"> $ {sd.price}</span>
                                  {/* <span class="delete-package"><a href="#"><i class="fas fa-trash-alt"></i></a></span> */}
                                  <img
                                    style={{
                                      height: "200px",
                                      width: "100%",
                                      objectFit: "cover",
                                    }}
                                    src={sd.image}
                                  />
                                  <h4>{sd.title}</h4>
                                </div>
                                <div class="package-box-appointment1-content">
                                  <div
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{
                                      __html: sd.description,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // <div class="listing_sec" style={{ border: "1px solid #9393936e", padding: "10px" }}>
                            //     <div class="listing_sec_main">
                            //         <div class="listing_sec_main_img">
                            //             <img style={{ height: "200px", objectFit: "cover" }} src={sd.image} />
                            //             <span>$ {sd.price}</span>
                            //         </div>
                            //         <h3>{sd.title}</h3>
                            //         <div
                            //             // eslint-disable-next-line react/no-danger
                            //             dangerouslySetInnerHTML={{
                            //                 __html:
                            //                     sd.description
                            //             }}
                            //         >
                            //         </div>
                            //     </div>
                            // </div>
                            ""
                          )
                      )
                    )
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
          <div class="col-md-12">
            <div class="col-md-12 appointment-steps">
              <h4>Property Information</h4>
              <span class="edit-order-package">
                <a
                  onClick={() => {
                    setFinalPreviewtab(false);
                    setPropertyTab(true);
                  }}
                >
                  <i class="fas fa-edit"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="20%">
                  <b>Caption :</b>
                </td>
                <td width="30%">{propertyInfo.caption}</td>
                <td width="20%">
                  <b>Description :</b>
                </td>
                <td width="30%">{propertyInfo.description}</td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>Bed Room :</b>
                </td>
                <td width="30%">{propertyInfo.bed_room}</td>
                <td width="20%">
                  <b>Bath Room :</b>
                </td>
                <td width="30%">{propertyInfo.bath_room}</td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>Year Built :</b>
                </td>
                <td width="30%">{propertyInfo.year_built}</td>
                <td width="20%">
                  <b>Square Footage :</b>
                </td>
                <td width="30%">{propertyInfo.square_footage}</td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>MLS :</b>
                </td>
                <td width="30%">{propertyInfo.mls}</td>
                <td width="20%">
                  <b>Price :</b>
                </td>
                <td width="30%">{propertyInfo.price}</td>
              </tr>
              <tr>
                <td width="30%">
                  <b>Property Access Information :</b>
                </td>
                <td colspan="3">{basicInfo.notes}</td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-12 appointment-steps">
              <h4>Appointment Information</h4>
              <span class="edit-order-package">
                <a
                  onClick={() => {
                    setFinalPreviewtab(false);
                    setPropertyTab(true);
                  }}
                >
                  <i class="fas fa-edit"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="20%">
                  <b>Street Address:</b>
                </td>
                <td width="30%">{basicInfo.address}</td>
                <td width="20%">
                  <b>First Choice :</b>
                </td>
                <td width="30%">
                  {dateFormat(propertyInfo.first_choice, "dd-mm-yyyy") +
                    "  " +
                    propertyInfo.first_time}
                </td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>City:</b>
                </td>
                <td width="30%">{basicInfo.city}</td>
                <td width="20%">
                  <b>Second Choice :</b>
                </td>
                <td width="30%">
                  {dateFormat(propertyInfo.second_choice, "dd-mm-yyyy") +
                    "  " +
                    propertyInfo.second_time}
                </td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>Zipcode:</b>
                </td>
                <td width="30%">{basicInfo.zip}</td>
                <td width="20%">
                  <b>Third Choice :</b>
                </td>
                <td width="30%">
                  {dateFormat(propertyInfo.third_choice, "dd-mm-yyyy") +
                    "  " +
                    propertyInfo.third_time}
                </td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td width="20%">
                  <b>State:</b>
                </td>
                <td width="30%">{basicInfo.state}</td>
                <td width="20%">
                  <b>Interior Sq Ft:</b>
                </td>
                <td width="30%">{basicInfo.interior_area}</td>
              </tr>

              <tr>
                <td colspan="4">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 mx-auto text-center">
            <a
              onClick={() => {
                setFinalPreviewtab(false);
                setPropertyTab(true);
              }}
              class="let_start"
              style={{ margin: "0px 20px 0px 0px" }}
            >
              <i
                style={{ marginRight: "10px", marginLeft: "0px" }}
                class="fas fa-arrow-left"
              ></i>
              Back{" "}
            </a>
            <a
              class="let_start_new"
              onClick={() => {
                //savePackage();
                setFinalPreviewtab(false);
                setCheckoutTab(true);
              }}
            >
              Proceed to Checkout <i class="fas fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
