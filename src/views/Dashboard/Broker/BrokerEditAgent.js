import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import photo1 from "../../../images/photo-1.jpg";
import broker_banner from "../../../images/broker-banner1.jpg";
import photo2 from "../../../images/photo-2.jpg";
import photo3 from "../../../images/photo-3.jpg";
import tours from "../../../images/tours.jpg";
import BrokerFooter from "../../../components/Footer/BrokerFooter";
import BrokerHeader from "../Header/BrokerHeader";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { AuthContext } from "../../../CommonMethods/Authentication";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import { Button } from "@material-ui/core";
import theme8 from "../../../ThemeImages/theme8.jpg";
import { set } from "date-fns";

const APIGetDashboardData = APIURL() + "agent-dashboard";
const APIBrokerDashBoard = APIURL() + "get-mycafe";
const APISaveAgentCreate = APIURL() + "agent-create";
const APIGetAgenetData = APIURL() + "agent-List";
const APIGetAgentInfo = APIURL() + "agent-profile-details";
const APISaveAgentPersonalInfromation = APIURL() + "agent-personal-information";
// const APIGetOfferedBanners = APIURL() + "get-flyerheader-brokerdetails";
const APIGetOfferedBanners = APIURL() + "get-flyerheader-agent-details";
const APIGetCountryList = APIURL() + "get-CountryList";
const APIGetStateList = APIURL() + "get-StateList";
const APIUpdateAgentCompanyInformation =
  APIURL() + "agent-company-information-update";
const APIGetAgentCompanyInfoDetails = APIURL() + "agent-company-info-details";
const APIDeleteImageAgent = APIURL() + "delete-imageAgent";
const APISaveAgentImage = APIURL() + "save-image";
const APIGetCompanyLogos = APIURL() + "get-companylogotitle";
const APIGetUpdateCompanyLogo = APIURL() + "update-companylogo";
const APISaveCompanyinfo = APIURL() + "save-CompanyInfoAgent";
const APIDeleteImageLogo = APIURL() + "delete-imageAgent";
const APIUpdateAgentMyCafe = APIURL() + "update-agent-mycafe";
const APIChangebanner = APIURL() + "change-banner";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));
export default function BrokerAgensts(props) {
  const agentId = props.match.params.agentid;
  const initialCompanyInfoState = {
    authenticate_key: "abcd123XYZ",
    countryid: 40,
    stateid: "",
    company: "",
    address: "",
    city: "",
    zipcode: "",
    officephone: "",
    fax: "",
    website: "",
  };
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openCreateAgents, setOpenCreateAgents] = useState(false);
  const [message, setMessage] = useState("");
  const [sync, setSync] = useState(true);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [agentGetData, setAgentGetdata] = useState([]);
  const [id, setId] = useState("");
  const [openCompanyBanner, setOpenCompanyBanner] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [allBanners, setAllBanners] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [defaultBanner, setDefaultBanner] = useState(
    "../static/media/default-banner.87685114.jpg"
  );
  const [defaultLogo, setDefaultlogo] = useState("");
  const [headerImageId, setHeaderImageId] = useState("");
  //const [customBannerImg, setCustomBannerImg] = useState("");
  const [customLogo, setCustomLogo] = useState("");
  const [offeredBannerImg, setOfferedBannerImg] = useState("");
  const [agentInfoData, setAgentInfoData] = useState({});
  const [agentPhoto, setAgentPhoto] = useState("");
  const [link, setLink] = useState("");
  const [companyInfo, setCompanyInfo] = useState({});
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [agentImageData, setAgentImageData] = useState({});
  const [allLogo, setAllLogo] = useState([]);
  const [logoData, setLogoData] = useState({});
  const [logoimageid, setLogoImageId] = useState("");
  const [logoImageName, setLogoImageName] = useState("");
  const [inputErrors, setinputErrors] = useState({
    fname: "blank",
    lname: "blank",
    email: "blank",
    username: "blank",
    company: "blank",
    country: "blank",
    state: "blank",
    city: "blank",
    zip: "blank",
    office_ph: "blank",
    fname_error: "",
    lname_error: "",
    username_error: "",
    cnfemail_error: "",
    company_error: "",
    country_error: "",
    state_error: "",
    city_error: "",
    zip_error: "",
    office_ph_error: "",
  });
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  function validateinp() {
    agentData.fname == "" || !agentData.fname
      ? setinputErrors((prevState) => ({
          ...prevState,
          fname: "error",
          fname_error: "First name cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          fname: "",
          fname_error: "",
        }));
    agentData.lname == "" || !agentData.lname
      ? setinputErrors((prevState) => ({
          ...prevState,
          lname: "error",
          lname_error: "Last name cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          lname: "",
          lname_error: "",
        }));
    agentData.email == "" || !agentData.email
      ? setinputErrors((prevState) => ({
          ...prevState,
          email: "error",
          email_error: "E-Mail Id cannot be blank",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          email: "",
          email_error: "",
        }));
    agentData.username == "" || !agentData.username
      ? setinputErrors((prevState) => ({
          ...prevState,
          username: "error",
          username_error: "E-Mail Confirmation does not match",
        }))
      : setinputErrors((prevState) => ({
          ...prevState,
          username: "",
          username_error: "",
        }));
  }
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
        brokerid: JSON.parse(context.state.user).user_id,
      };
      //console.log(objusr)
      // postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/agent-List", objusr)
      postRecord(APIGetAgenetData, objusr).then((res) => {
        //console.log(res)
        if (res.data[0].response.status === "success") {
          setAgentData(res.data[0].response);
          setAgentGetdata(res.data[0].response.data);
          //console.log(res.data[0].response.data)
        }
      });
    }
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = { authenticate_key: "abcd123XYZ", agent_id: agentId };
      postRecord(APIGetAgentInfo, objusr).then((res) => {
        //console.log(res)
        if (res.data[0].response.status === "success") {
          setAgentInfoData(res.data[0].response.data.agent_details);
          setAgentPhoto(res.data[0].response.data.agentphotouploadfile);
          setLink(res.data[0].response.data.agent_details.mycafegallery);
          //console.log(res.data[0].response.data.agent_details);
          // setAgentInfoData({ ...agentInfoData, ["cnfpassword"]: res.data[0].response.data.agent_details.password });
        }
      });
    }
  }, [context.state.user, agentId, sync]);
  useEffect(() => {
    if (Object.keys(agentInfoData).length > 0) {
      agentInfoData.cnfpassword = agentInfoData.password;
    }
  }, [agentInfoData]);
  useEffect(() => {
    if (context.state.user) {
      const objusr = { authenticate_key: "abcd123XYZ", agent_id: agentId };
      postRecord(APIGetAgentCompanyInfoDetails, objusr).then((res) => {
        if (res.data[0].response.status === "success") {
          // console.log(res.data[0].response.data);
          setCompanyInfo(res.data[0].response.data);
          // setCustomLogo(res.data[0].response.data.companylogo);
          // setOfferedBannerImg("");
          setOfferedBannerImg(res.data[0].response.data.companybanner);
        }
      });
    }
  }, [context.state.user, agentId]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetCountryList, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllCountry(res.data[0].response.dataDetails.dataProvider);
      }
    });
  }, [context.state.user]);
  useEffect(() => {
    const objusr = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetStateList, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAllState(res.data[0].response.dataDetails.dataProvider);
      }
    });
  }, [context.state.user]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerId: JSON.parse(context.state.user).user_id,
        tourid: agentId,
        agentId: agentId,
      };
      postRecord(APIGetOfferedBanners, obj).then((res) => {
        // console.log(res.data[0].response);
        if (res.data[0].response.status === "success") {
          // console.log('data',res.data[0].response);
          setAllBanners(res.data[0].response.flyerdetails);
          // setDefaultBanner(res.data[0].response.bannerimg);
          setHeaderImageId(res.data[0].response.headerimageid);
          setOfferedBannerImg(res.data[0].response.bannerimg);
        }
      });
    }
  }, [context.state.user, sync, agentId]);
  useEffect(() => {
    if (context.state.user) {
      const obj = {
        authenticate_key: "abcd123XYZ",
        brokerid: JSON.parse(context.state.user).user_id,
        agentId: agentId,
      };
      postRecord(APIGetCompanyLogos, obj).then((res) => {
        if (res.data[0].response.status === "success") {
          setAllLogo(res.data[0].response.data);
          setDefaultlogo(res.data[0].response.companylogo);
          setLogoImageId(res.data[0].response.logoimageid);
          setCustomLogo("");
        }
      });
    }
  }, [context.state.user, sync, agentId]);
  useEffect(() => {
    if (headerImageId !== "0") {
      var filter_data = allBanners.filter((res) => {
        return res.id == headerImageId;
      });
      if (filter_data.length > 0) {
        console.log("hoohah");
        setOfferedBannerImg(filter_data[0].url);
      } else {
        console.log("booyah");
        // setOfferedBannerImg("");
      }
    }
  }, [headerImageId, allBanners]);
  useEffect(() => {
    if (logoimageid !== "0") {
      var filter_data = allLogo.filter((res) => {
        return res.id == logoimageid;
      });
      if (filter_data.length > 0) {
        setCustomLogo(filter_data[0].cl_logo_name);
      } else {
        setCustomLogo("");
      }
    }
  }, [logoimageid, allLogo]);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgentData({ ...agentData, [name]: value });
  };
  const saveAgentData = () => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      fname: agentData.fname,
      lname: agentData.lname,
      email: agentData.email,
    };
    postRecord(APISaveAgentCreate, objusr)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };

  const handleImageChange = (event) => {
    setBannerData({ ...bannerData, logoImageName: event.target.files });
    setLogoImageId("0");
    setCustomLogo(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerImageChange = (event) => {
    setBannerData({ ...bannerData, bannerImageName: event.target.files });
    setHeaderImageId("0");
    setOfferedBannerImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerChange = (event) => {
    const data = event.target.value;
    if (data == 0) setOfferedBannerImg("");
    setHeaderImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, bannerImageName: "" });
    changeBannerGetData(data);
  };
  const changeBannerGetData = (data) => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.agent_id = agentId;
    bannerData.tourId = agentId;
    bannerData.imageId = data;
    setOpen(true);
    postRecord(APIChangebanner, bannerData)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  const handleLogoChange = (event) => {
    const data = event.target.value;
    setLogoImageId(event.target.value);
    bannerData.header = event.target.value;
    setBannerData({ ...bannerData, logoImageName: "" });
    handleLogoGetData(data);
  };
  const handleLogoGetData = (data) => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.imageid = data;
    bannerData.agent_id = agentId;
    postRecord(APIGetUpdateCompanyLogo, bannerData)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };

  const handleInputChangeAgent = (event) => {
    const { name, value } = event.target;
    setAgentInfoData({ ...agentInfoData, [name]: value });
  };
  const handleAgentImageChange = (event) => {
    setAgentImageData({ ...agentImageData, imageName: event.target.files });
    setAgentPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const deleteAgentImage = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      folder: "agentphoto",
      agent_id: agentId,
    };
    postRecord(APIDeleteImageAgent, obj)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(true);
        }
        setSync(false);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveAgentInfromation = () => {
    if (
      agentInfoData.fname === "" ||
      agentInfoData.lname === "" ||
      agentInfoData.email === "" ||
      agentInfoData.username === ""
    ) {
      setMessage("Please fill all the mandatory fields");
      setOpenError(true);
      return;
    }
    agentInfoData.authenticate_key = "abcd123XYZ";
    agentInfoData.agent_id = agentId;
    setOpen(true);
    postRecord(APISaveAgentPersonalInfromation, agentInfoData)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.data.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveAccountLink = () => {
    agentInfoData.authenticate_key = "abcd123XYZ";
    agentInfoData.agent_id = agentId;
    setOpen(true);
    postRecord(APIUpdateAgentMyCafe, agentInfoData)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const handleAgentCafeGellery = () => {
    window.open(APIPath() + "my-cafe-gellary/" + link, "_blank");
  };
  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };
  console.log("inputErrors", inputErrors);
  console.log("companyInfo", companyInfo);
  const saveCompanyInfo = () => {
    if (
      companyInfo.company === "" ||
      companyInfo.state === "" ||
      companyInfo.zip === "" ||
      companyInfo.office_ph === "" ||
      companyInfo.city === "" ||
      companyInfo.country === ""
    ) {
      setMessage("Please fill all the details");
      setOpenError(true);
      return;
    }
    setOpen(true);
    companyInfo.authenticate_key = "abcd123XYZ";
    companyInfo.agent_id = agentId;
    postRecord(APIUpdateAgentCompanyInformation, companyInfo)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.data.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveAgentPhoto = () => {
    // companyInfo.authenticate_key = "abcd123XYZ";
    // companyInfo.agent_id = agentId;
    // const obj={authenticate_key:"abcd123XYZ",brokerid:JSON.parse(context.state.user).user_id}
    agentImageData.authenticate_key = "abcd123XYZ";
    agentImageData.brokerid = JSON.parse(context.state.user).user_id;
    agentImageData.agent_id = agentId;
    const formData = new FormData();
    for (let i in agentImageData) {
      if (i === "imageName") {
        for (let file of agentImageData[i]) {
          formData.append("imageName", file);
        }
      } else {
        formData.append(i, agentImageData[i]);
      }
    }
    // postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/save-image", formData, {})
    postRecord(APISaveAgentImage, formData, {})
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage("Profile Image Saved Successfully");
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const saveCompanyBanner = () => {
    bannerData.authenticate_key = "abcd123XYZ";
    bannerData.agent_id = agentId;
    bannerData.brokerid = JSON.parse(context.state.user).user_id;
    bannerData.bannerImageId = headerImageId;
    bannerData.logoImageId = logoimageid;
    //bannerData.logoImageId=bannerData.header;
    const formData = new FormData();
    for (let i in bannerData) {
      if (i === "logoImageName") {
        for (let file of bannerData[i]) {
          formData.append("logoImageName", file);
        }
      } else if (i === "bannerImageName") {
        for (let file of bannerData[i]) {
          formData.append("bannerImageName", file);
        }
      } else {
        formData.append(i, bannerData[i]);
      }
    }
    //postRecord("https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/save-CompanyInfoAgent", formData, {})
    setOpen(true);
    postRecord(APISaveCompanyinfo, formData, {})
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const removeLogo = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      agent_id: agentId,
      folder: "companylogo",
    };
    setOpen(true);
    postRecord(APIDeleteImageLogo, obj)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
        setOpen(false);
      });
  };
  const removeBanner = () => {
    const obj = {
      authenticate_key: "abcd123XYZ",
      brokerid: JSON.parse(context.state.user).user_id,
      agent_id: agentId,
      folder: "companybanner ",
    };
    setOpen(true);
    postRecord(APIDeleteImageLogo, obj)
      .then((res) => {
        setOpen(false);
        if (res.data[0].response.status === "success") {
          setMessage("Deleted Succesfully");
          setOpenSuccess(true);
          setSync(false);
        } else {
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
      })
      .catch((err) => {
        setMessage("Something Went Wrong. Please try again later...");
        setOpenError(true);
      });
  };
  console.log(offeredBannerImg);

  //   console.log(allBanners);
  return (
    <div>
      {/* <AgentHeader /> */}
      <BrokerHeader setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <section
        class="vtc_agent_banner"
        style={{ backgroundImage: "url(" + broker_banner + ")" }}
      >
        <div class="vtc_top_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_agent_menu_top">
                  <ul>
                    <li>
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li >
                      <Link class="active" to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>
                        Broker Reports
                      </Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
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
                      <Link to={APIPath() + "broker-dashboard"}>
                        My Cafe Office
                      </Link>
                    </li>
                    <li class="active">
                      <Link to={APIPath() + "broker-agent"}>Agents</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-setting"}>Settings</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-reports"}>Reports</Link>
                    </li>
                    <li>
                      <Link to={APIPath() + "broker-preferred-vendor"}>
                        Preferred Vendors
                      </Link>
                    </li>

                    <li>
                      <Link to={APIPath() + "broker-support"}>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vtc_btm_menu">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="vtc_btm_menu_sec">
                  <ul>
                    <li>{currentUser.paymentOption} - {currentUser.activeTours} Active Tours</li>
                    <li>Ala-Carte - Available Credits {currentUser.credits} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-title">
          <h2>Manage Your Agents</h2>
        </div>
      </section>
      <section class="action_sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="action_sec_main">
                <div class="action_sec_left action_sec_tab">
                  <ul class="nav nav-tabs list_sec" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#Manage"
                        role="tab"
                      >
                        <i class="fas fa-tasks"></i>Agents Profile
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#Comapny"
                        role="tab"
                      >
                        <i class="fas fa-filter"></i>Company Information
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="browse_img tab-pane active" id="Manage" role="tabpanel">
              <div class="browse_img_head">
                <h5>Agent Profile</h5>
              </div>
              <div class="browse_img_conts_main">
                <div class="browse_img_conts">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#home2"
                        role="tab"
                      >
                        <i class="fas fa-user"></i>Upload Agent Photos
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#profile2"
                        role="tab"
                      >
                        <i class="far fa-address-card"></i>Personal Infromation
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#Account"
                        role="tab"
                      >
                        <i class="far fa-address-card"></i>MyCafeGellery
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content" id="">
                  <div class="tab-pane active" id="home2" role="tabpanel">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveAgentPhoto();
                      }}
                    >
                      <div class="row">
                        <div
                          class="col-lg-6 col-md-6 mx-auto"
                          style={{ marginTop: "20px" }}
                        >
                          <div class="agent_pop_tab_sec_single">
                            <div class="agent_pop_tab_sec_single_img">
                              <img src={agentPhoto} alt="" title="" />
                            </div>
                            <div class="agent_pop_tab_sec_single_cont uploadimage p-0">
                              <div class="custom-file" style={{ width: "40%" }}>
                                <input
                                  onChange={handleAgentImageChange}
                                  type="file"
                                  class="custom-file-input"
                                  id="customFileInput"
                                  aria-describedby="customFileInput"
                                />
                                <label
                                  class="custom-file-label"
                                  for="customFileInput"
                                >
                                  Select file
                                </label>
                              </div>
                              <button
                                onClick={() => deleteAgentImage()}
                                type="button"
                                class="btn-style-two border-0"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="col-md-06 formbox1">
                              <button
                                type="submit"
                                class="need_pic save_btn"
                                style={{ border: "rgb(255, 161, 36)" }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <hr class="spacer10px" />
                  </div>
                  <div class="tab-pane" id="profile2" role="tabpanel">
                    <div class="personalinfo">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveAgentInfromation();
                        }}
                      >
                        <div class="row">
                          <div class="col-md-6 formbox1">
                            <label>
                            License No{" "}
                              <span style={{ color: "#ffa12d" }}></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="licenceno"
                              value={agentInfoData.licenceno}
                              placeholder="Enter your license no"
                              onChange={handleInputChangeAgent}
                            />
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              First Name{" "}
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                inputErrors.fname == "error"
                                  ? "form-control inperror"
                                  : "form-control"
                              }
                              name="fname"
                              value={agentInfoData.fname}
                              placeholder="Enter your first name"
                              onChange={handleInputChangeAgent}
                              onKeyUp={(e) =>
                                e.target.value.length > 0
                                  ? (e.target.classList.add("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      fname: "",
                                      fname_error: "",
                                    })))
                                  : (e.target.classList.remove("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      fname: "error",
                                      fname_error: "First name cannot be blank",
                                    })))
                              }
                            />
                            <p style={{ color: "red" }}>
                              {inputErrors.fname_error}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 formbox1">
                            <label>
                              Last Name{" "}
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                inputErrors.lname == "error"
                                  ? "form-control inperror"
                                  : "form-control"
                              }
                              name="lname"
                              placeholder="Enter your last Name  "
                              value={agentInfoData.lname}
                              onChange={handleInputChangeAgent}
                              onKeyUp={(e) =>
                                e.target.value.length > 0
                                  ? (e.target.classList.add("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      lname: "",
                                      lname_error: "",
                                    })))
                                  : (e.target.classList.remove("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      lname: "error",
                                      lname_error: "Last name cannot be blank",
                                    })))
                              }
                            />
                            <p style={{ color: "red" }}>
                              {inputErrors.lname_error}
                            </p>
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              User Name
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                inputErrors.username == "error"
                                  ? "form-control inperror"
                                  : "form-control"
                              }
                              name="username"
                              placeholder="Enter your user Name   "
                              value={agentInfoData.username}
                              onChange={handleInputChangeAgent}
                              onKeyUp={(e) =>
                                e.target.value.length > 0
                                  ? (e.target.classList.add("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      username: "",
                                      username_error: "",
                                    })))
                                  : (e.target.classList.remove("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      username: "error",
                                      username_error:
                                        "User name cannot be blank",
                                    })))
                              }
                            />
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              Email <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className={
                                inputErrors.email == "error"
                                  ? "form-control inperror"
                                  : "form-control"
                              }
                              name="email"
                              placeholder="Enter your email"
                              value={agentInfoData.email}
                              onChange={handleInputChangeAgent}
                              onKeyUp={(e) =>
                                regex.test(e.target.value)
                                  ? (e.target.classList.add("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      email: "",
                                      email_error: "",
                                    })))
                                  : (e.target.classList.remove("success"),
                                    setinputErrors((prevState) => ({
                                      ...prevState,
                                      email_error: "Please Enter A Valid Email",
                                    })))
                              }
                            />
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              Mobile <span style={{ color: "#ffa12d" }}></span>
                            </label>
                            <input
                              type="tel"
                              class="form-control"
                              name="mobile"
                              placeholder="Enter your mobile number"
                              value={agentInfoData.mobile}
                              onChange={handleInputChangeAgent}
                            />
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              Agent Profile{" "}
                              <span style={{ color: "#ffa12d" }}></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="agentprofile"
                              placeholder="Enter your agent profile"
                              value={agentInfoData.agentprofile}
                              onChange={handleInputChangeAgent}
                            />
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              Credentials
                              <span style={{ color: "#ffa12d" }}></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="credentials"
                              placeholder="Enter your credentials"
                              value={agentInfoData.redentials}
                              onChange={handleInputChangeAgent}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <button type="submit" class="next_btn border-0">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="tab-pane" id="Account" role="tabpanel">
                    <div class="personalinfo">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveAccountLink();
                        }}
                      >
                        <div class="row">
                          <div class="col-md-6 formbox1">
                            <label>
                              Active Link
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            {/* <p>https://virtualtourcafe.com/mycafegallery/{link}</p> */}
                            {/* <p id="activeLink"> <a target="_blank" href="https://virtualtourcafe.com/mycafegallery/{link}">https://virtualtourcafe.com/mycafegallery/{link}</a></p> */}
                            {link == "" || !link ? (
                              <p style={{ color: "red" }}>
                                Please Enter a Link Name and Save
                              </p>
                            ) : (
                              <p class="img_set_para">
                                <a
                                  onClick={handleAgentCafeGellery}
                                  style={{ color: "black" }}
                                >
                                  <span
                                    style={{
                                      color: "black",
                                      textDecoration: "underline",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    https://virtualtourcafe.com/my-cafe-gellary/
                                    {link}
                                  </span>
                                </a>
                              </p>
                            )}
                          </div>
                          <div class="col-md-6 formbox1">
                            <label>
                              Link Name{" "}
                              <span style={{ color: "#ffa12d" }}>*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="mycafegallery"
                              placeholder="Enter your link name"
                              value={link}
                              onChange={(event) => {
                                setLink(event.target.value);
                                handleInputChangeAgent(event);
                              }}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <button type="submit" class="next_btn border-0">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="browse_img tab-pane" id="Comapny" role="tabpanel">
              <div class="browse_img_head">
                <h5>Branding</h5>
              </div>
              <div class="property_info_cont" id="demo">
                <section id="examples" class="snap-scrolling-example">
                  <div
                    id="content-1"
                    class="content horizontal-images tab_main"
                  >
                    <ul class="nav nav-tabs list_sec" role="tablist1">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-toggle="tab"
                          href="#Images"
                          role="tab"
                        >
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                          UPLOAD COMPANY LOGO
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="tab"
                          href="#CompanyInfo"
                          role="tab"
                        >
                          <span>
                            <i class="far fa-address-card"></i>
                          </span>
                          Company Information
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div class="tab-content" id="">
                <div class="tab-pane active" id="Images" role="tabpanel">
                  <div class="col-lg-12 col-md-12">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveCompanyBanner();
                      }}
                    >
                      <div>
                        <div class="row">
                          <div class="col-lg-6 col-md-6">
                            <h6>Upload Company Logo</h6>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {customLogo === "" ? (
                                <img
                                  src={defaultLogo}
                                  alt=""
                                  style={{
                                    marginBottom: "10px",
                                    width: "150px",
                                    height: "100px",
                                  }}
                                />
                              ) : (
                                <img
                                  src={customLogo}
                                  alt=""
                                  style={{
                                    marginBottom: "10px",
                                    width: "150px",
                                    height: "100px",
                                  }}
                                />
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <button
                              onClick={() => removeLogo()}
                              style={{
                                border: "#ffa124",
                                padding: "10px",
                                float: "right",
                                background: "#bbbbbb",
                                color: "#000",
                                marginBottom: "20px",
                              }}
                              type="button"
                              class=""
                            >
                              Remove
                            </button>
                            <select
                              value={logoimageid}
                              onChange={handleLogoChange}
                              class="form-control formbox1select"
                            >
                              <option value="0">Custom</option>
                              {allLogo.map((res) => (
                                <option value={res.id}>{res.cl_title}</option>
                              ))}
                            </select>
                          </div>
                          <div class="col-lg-6 col-md-6 formbox1">
                            <h6>Offered Banners</h6>
                            {offeredBannerImg === "" || !offeredBannerImg ? (
                              <img
                                src={defaultBanner}
                                alt=""
                                className="one"
                                style={{ marginBottom: "10px" }}
                              />
                            ) : (
                              <img
                                src={offeredBannerImg}
                                alt=""
                                className="two"
                                style={{
                                  marginBottom: "40px",
                                  width: "100%",
                                  height: "80px",
                                }}
                              />
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleBannerImageChange}
                            />

                            {offeredBannerImg ? (
                              <button
                                onClick={() => removeBanner()}
                                style={{
                                  border: "#ffa124",
                                  padding: "10px",
                                  float: "right",
                                  background: "#bbbbbb",
                                  color: "#000",
                                  marginBottom: "10px",
                                }}
                                type="button"
                                class=""
                              >
                                Remove
                              </button>
                            ) : (
                              <p>Upload Banner</p>
                            )}
                            <select
                              value={headerImageId}
                              onChange={handleBannerChange}
                              className="form-control formbox1select"
                            >
                              <option value="0">None</option>
                              {allBanners.map((res) => (
                                <option value={res.id}>{res.imagename}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 col-md-12 text-center">
                          <button
                            style={{ border: "#ffa124" }}
                            type="submit"
                            class="need_pic save_btn"
                          >
                            Submit<i class="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="tab-pane" id="CompanyInfo" role="tabpanel">
                  <div class="personalinfo">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveCompanyInfo();
                      }}
                    >
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            COMPANY <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className={
                              inputErrors.company == "error"
                                ? "form-control inperror"
                                : "form-control"
                            }
                            onChange={handleCompanyInputChange}
                            name="company"
                            value={companyInfo.company}
                            placeholder="Enter your Virtual Tourcafe LLC"
                            onKeyUp={(e) =>
                              e.target.value.length > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    company: "",
                                    company_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    company: "error",
                                    company_error:
                                      "Company name cannot be blank",
                                  })))
                            }
                            required
                          />
                          <p style={{ color: "red" }}>
                            {inputErrors.company_error}
                          </p>
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            Country <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <select
                            className={
                              inputErrors.country == "error"
                                ? "form-control formbox1select inperror"
                                : "form-control formbox1select"
                            }
                            onChange={handleCompanyInputChange}
                            name="countryid"
                            value={companyInfo.countryid}
                            onBlur={(e) =>
                              e.target.value > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    country: "",
                                    country_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    country: "error",
                                    country_error: "Select a country",
                                  })))
                            }
                          >
                            <option value="0">--Select Country--</option>
                            {allCountry.map((res) => (
                              <option value={res.id}>{res.countryname}</option>
                            ))}
                          </select>
                          <p style={{ color: "red" }}>
                            {inputErrors.country_error}
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            State <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <select
                            className={
                              inputErrors.state == "error"
                                ? "form-control formbox1select inperror"
                                : "form-control formbox1select"
                            }
                            onChange={handleCompanyInputChange}
                            name="stateid"
                            value={companyInfo.stateid}
                            required
                            onBlur={(e) =>
                              e.target.value > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    state: "",
                                    state_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    state: "error",
                                    state_error: "Select a State",
                                  })))
                            }
                          >
                            <option value="0">--Select State--</option>
                            {allState.map((res) => (
                              <option value={res.id}>{res.statename}</option>
                            ))}
                          </select>
                          <p style={{ color: "red" }}>
                            {inputErrors.state_error}
                          </p>
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            City <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className={
                              inputErrors.city == "error"
                                ? "form-control inperror"
                                : "form-control"
                            }
                            onChange={handleCompanyInputChange}
                            name="city"
                            value={companyInfo.city}
                            onKeyUp={(e) =>
                              e.target.value.length > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    city: "",
                                    city_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    city: "error",
                                    city_error: "City Name cannot be blank",
                                  })))
                            }
                            required
                          />
                          <p style={{ color: "red" }}>
                            {inputErrors.city_error}
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            Zip <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={handleCompanyInputChange}
                            name="zipcode"
                            value={companyInfo.zipcode}
                            placeholder="Enter your Zip Code"
                            onKeyUp={(e) =>
                              e.target.value.length > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    zip: "",
                                    zip_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    zip: "error",
                                    zip_error: "Zip Code cannot be blank",
                                  })))
                            }
                            required
                          />
                          <p style={{ color: "red" }}>
                            {inputErrors.zip_error}
                          </p>
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            Office Phone{" "}
                            <span style={{ color: "#ffa12d" }}>*</span>
                          </label>
                          <input
                            type="tel"
                            class="form-control"
                            onChange={handleCompanyInputChange}
                            name="officephone"
                            value={companyInfo.officephone}
                            placeholder="Enter your Office Phone"
                            onKeyUp={(e) =>
                              e.target.value.length > 0
                                ? (e.target.classList.add("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    office_ph: "",
                                    office_ph_error: "",
                                  })))
                                : (e.target.classList.remove("success"),
                                  setinputErrors((prevState) => ({
                                    ...prevState,
                                    office_ph: "error",
                                    office_ph_error:
                                      "Office phone number cannot be blank",
                                  })))
                            }
                            required
                          />
                          <p style={{ color: "red" }}>
                            {inputErrors.office_ph_error}
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 formbox1">
                          <label>
                            Fax <span style={{ color: "#ffa12d" }}></span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={handleCompanyInputChange}
                            name="fax"
                            value={companyInfo.fax}
                            placeholder="Enter your fax"
                          />
                        </div>
                        <div class="col-md-6 formbox1">
                          <label>
                            Website <span style={{ color: "#ffa12d" }}></span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={handleCompanyInputChange}
                            name="website"
                            value={companyInfo.website}
                            placeholder="Enter your Website"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 formbox1">
                          <label>
                            Address <span style={{ color: "#ffa12d" }}></span>
                          </label>
                          <textarea
                            class="form-control"
                            rows="6"
                            onChange={handleCompanyInputChange}
                            name="address"
                            value={companyInfo.address}
                            placeholder="Enter your address"
                          ></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button type="submit" class="next_btn border-0">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="spacer10px"></hr>
        </div>
      </section>
      <BrokerFooter />
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openCreateAgents}
      >
        <DialogTitle id="customized-dialog-title">
          Create Agent
          <CancelIcon
            onClick={() => setOpenCreateAgents(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveAgentData();
              }}
            >
              <div class="agent_pop_main">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      First Name{" "}
                    </label>
                    <input
                      type="text"
                      name="fname"
                      value={agentData.fname}
                      onChange={handleInputChange}
                      class="form-control"
                    />
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      {" "}
                      Last Name{" "}
                    </label>
                    <input
                      type="text"
                      name="lname"
                      value={agentData.lname}
                      onChange={handleInputChange}
                      class="form-control"
                    />
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={agentData.email}
                      onChange={handleInputChange}
                      class="form-control"
                    />
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <label style={{ marginBottom: "10px", marginTop: "10px" }}>
                      Confirm Email{" "}
                    </label>
                    <input
                      type="email"
                      name="cnfemail"
                      value={agentData.cnfemail}
                      onChange={handleInputChange}
                      class="form-control"
                    />
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <input
                      type="checkbox"
                      name="check"
                      onChange={handleInputChange}
                      value={agentData.check}
                      style={{ marginTop: "10px" }}
                    />{" "}
                    Do Not Send Welcome Email
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12 text-center">
                  <button
                    style={{ border: "#ffa124" }}
                    type="submit"
                    class="need_pic save_btn"
                  >
                    Save<i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// git
