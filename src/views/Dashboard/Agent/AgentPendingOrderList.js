import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import ReactPaginate from "react-paginate";
import { Link, useHistory } from "react-router-dom";
import banner from "../../../images/vtc-banner.jpg";
import Footer from "../../../components/Footer/AgentFooter";
import AgentHeader from "../Header/AgentHeader";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import Title from "../../../CommonMethods/Title";
import AgentDashBoardHeader from "./AgentDashBoardHeader";
const APIGetPendingOrderList = APIURL() + "pending-orders-list";
const APIGetOrderDetails = APIURL() + "pending-orders-details";
const ApiDeleteProduct = APIURL() + "delete-pending-order";
export default function AgentPendingOrderList(props) {
  let history = useHistory();
  const context = useContext(AuthContext);
  const [pendingorderList, setPendingOrderList] = useState([]);
  const [packages, setPackages] = useState([]);
  const [cartePackages, setCartePackages] = useState([]);
  const [miscPackages, setMiscPackages] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [postPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [allData, setAllData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9999,
      color: "#fff",
    },
  }));
  const classes = useStyles();
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

  useEffect(() => {
    if (context.state.user) {
      const objusr = {
        authenticate_key: "abcd123XYZ",
        agent_id: JSON.parse(context.state.user).agentId,
      };
      setOpen(true);
      postRecord(APIGetPendingOrderList, objusr).then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setPendingOrderList(res.data[0].response.data.pending_list);
          setPropertyInfo(res.data[0].response.data.orderdetails);
        }
      });
    }
  }, [context.state.user]);
  const handleDetails = (id) => {
    history.push(APIPath() + "pending-order-details/" + id);
  };
  console.log(pendingorderList);
  const deleteOrder = (id) => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      orderid: id,
    };
    setOpen(true);
    postRecord(ApiDeleteProduct, objusr).then((res) => {
      setOpen(false);
      if (res.data[0].response.status === "success") {
        setPendingOrderList(current =>
          current.filter(employee => {
            // 👇️ remove object that has id equal to 2
            return employee.id !== id;
          }),
        );
      }
    });
  };
  const completeOrder = (id) => {
    localStorage.setItem("checkout", "yes");
    localStorage.removeItem("Combo_Package");
    localStorage.removeItem("Carte_Package");
    localStorage.removeItem("Sub_Package");
    localStorage.removeItem("Combo_Sub_Package");
    localStorage.removeItem("Misc_Package");
    localStorage.removeItem("Property_Info");
    localStorage.removeItem("Basic_Info");

    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: JSON.parse(context.state.user).agentId,
      orderid: id,
    };
    postRecord(APIGetOrderDetails, objusr).then((res) => {
      console.log(res.data[0].response);
      if (res.data[0].response.status === "success") {
        if (
          res.data[0].response.data.miscellaneouspackage &&
          res.data[0].response.data.miscellaneouspackage.length > 0
        ) {
          res.data[0].response.data.miscellaneouspackage.map((res) => {
            setMiscPackages((prevArray) => [...prevArray, res.id]);
          });
        }
        if (
          res.data[0].response.data.packagedetails &&
          res.data[0].response.data.packagedetails.length > 0
        ) {
          res.data[0].response.data.packagedetails.map((res) => {
            setPackages((prevArray) => [...prevArray, res.id]);
            setCartePackages((prevArray) => [...prevArray, res.cat_id]);
          });
        }

        // setAllOrders(res.data[0].response.data);
        setPropertyInfo(res.data[0].response.data.orderdetails);
        const obj = {
          city: res.data[0].response.data.orderdetails.city,
          zip: res.data[0].response.data.orderdetails.zipcode,
          state: res.data[0].response.data.orderdetails.state,
          squre_feet: res.data[0].response.data.orderdetails.square_footage,
          notes: res.data[0].response.data.orderdetails.notes,
        };
        setBasicInfo(obj);
        history.push(APIPath() + "appointment/?order");
      }
    });
  };
  useEffect(() => {
    if (packages) {
      localStorage.setItem("Sub_Package", JSON.stringify(packages));
    }
    if (cartePackages) {
      localStorage.setItem("Carte_Package", JSON.stringify(cartePackages));
    }
    if (miscPackages) {
      localStorage.setItem("Misc_Package", JSON.stringify(miscPackages));
    }
    if (propertyInfo) {
      localStorage.setItem("Property_Info", JSON.stringify(propertyInfo));
    }
    if (basicInfo) {
      localStorage.setItem("Basic_Info", JSON.stringify(basicInfo));
    }
  }, [packages, miscPackages, propertyInfo, basicInfo]);
  useEffect(() => {
    if (pendingorderList.length > 0) {
      filterData();
    }
  }, [offset, pendingorderList]);
  const filterData = async () => {
    const endOffset = offset + postPerPage;
    setAllData(pendingorderList.slice(offset, endOffset));
    setPageCount(Math.ceil(pendingorderList.length / postPerPage));
    // const slice = imagesetList.slice(offset - 1, offset - 1 + 6);
    // setTotalData(slice);
    // setAllData(slice);
    // setPageCount(Math.ceil(imagesetList.length / postPerPage));
  };
  const handlePageClick = (event) => {
    // setOffset(selectedPage + 6);
    const newOffset = (event.selected * postPerPage) % pendingorderList.length;
    setOffset(newOffset);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
    <Title title="Agent Pending Order List"/>
      <AgentHeader path={props.location.pathname} />
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
          <h2>Pending Order List</h2>
        </div>
      </section>
      <section class="vtc_agent_profile">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 mx-auto">
              <div class="vtc_agent_profile_main">
                <table class="table table-bordered">
                  <thead class="thead-light">
                    <tr>
                      <th style={{ textAlign: "center" }}>Street Address</th>
                      <th style={{ textAlign: "center" }}>City</th>
                      <th style={{ textAlign: "center" }}>Zipcode</th>
                      <th style={{ textAlign: "center" }}>State</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.length > 0 ? (
                      allData.map((res) => (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            {res.street_address}
                          </td>
                          <td style={{ textAlign: "center" }}>{res.city}</td>
                          <td style={{ textAlign: "center" }}>{res.zipcode}</td>
                          <td style={{ textAlign: "center" }}>{res.state}</td>
                          <td style={{ textAlign: "center" }}>
                            <a
                              style={{ marginRight: "20px" }}
                              onClick={() => handleDetails(res.id)}
                              class="btn btn-warning"
                              title="View Details"
                            >
                              Order Details
                            </a>
                            <a
                              style={{ marginRight: "20px" }}
                              title="View Details"
                              class="btn btn-warning"
                              onClick={() => completeOrder(res.id)}
                            >
                              Complete Order
                            </a>
                            <a
                              title="Delete Product"
                              class="btn btn-danger"
                              onClick={() => deleteOrder(res.id)}
                            >
                              Delete Order
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Orders Found ..</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <ReactPaginate
                previousLabel={"«"}
                nextLabel={"»"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                ageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
