import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord } from "../../CommonMethods/Save";
import DownloadImage from "../../images/download.png";
import DownloadPrint from "../../images/print.png";
// import html2PDF from "jspdf-html2canvas";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Chart } from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const APIGetTrafficReport = APIURL() + "trafficreportcontent";

export default function TrafficReport(props) {
  const tour_id = props.match.params.tourid;
  const [trafficData, setTrafficData] = useState({});
  const [tourServices, setTourServices] = useState(0);
  const [flyerServices, setFlyerServices] = useState(0);
  const [videoServices, setVideoServices] = useState(0);
  const [contactInformation, setContactInformation] = useState({});
  const [referData, setReferData] = useState([]);
  const [WeeklyData, setWeeklyData] = useState([]);
  const [WeeklyGraphData, setWeeklyGraphData] = useState([]);
  const [twelveWeekData, setTwelveWeekData] = useState([]);
  const [twelveWeekGraphData, setTwelveWeekGraphData] = useState([]);
  const [xaxisData, setXaxisData] = useState([]);
  const [yaxisData, setYaxisData] = useState([]);
  const [openAlertModal, setopenAlertModal] = useState(false);
  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    // accessibility: {
    //     point: {
    //         valueSuffix: '%'
    //     }
    // },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
      },
    },
    series: [
      {
        name: "Services",
        colorByPoint: true,
        data: [
          {
            name: "Tour Service",
            y: tourServices,
            sliced: true,
            selected: false,
          },
          {
            name: "Video Service",
            y: videoServices,
          },
          {
            name: "Flyer Service",
            y: flyerServices,
          },
        ],
      },
    ],
  };
  const options1 = {
    title: {
      text: "",
    },
    chart: {
      type: "column",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: "Referring Websites",
      },
      categories: xaxisData,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Views",
      },
    },
    series: [{ data: yaxisData }],
  };
  const options2 = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Weekly Data",
        colorByPoint: true,
        data: WeeklyGraphData,
      },
    ],
  };
  const options3 = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Weekly Data",
        colorByPoint: true,
        data: twelveWeekGraphData,
      },
    ],
  };
  useEffect(() => {
    if (referData) {
      var x_data = [];
      var y_data = [];
      referData.forEach((res) => {
        x_data.push(res.referrer);
        y_data.push(parseInt(res.views));
      });
      setXaxisData(x_data);
      setYaxisData(y_data);
    }
  }, [referData]);
  useEffect(() => {
    if (WeeklyData) {
      var data = [];
      WeeklyData.forEach((res) => {
        var obj = { name: res.days, y: res.visit };
        data.push(obj);
      });
      setWeeklyGraphData(data);
    }
  }, [WeeklyData]);
  useEffect(() => {
    if (twelveWeekData) {
      var data = [];
      twelveWeekData.forEach((res) => {
        var obj = { name: res.week, y: res.visit };
        data.push(obj);
      });
      setTwelveWeekGraphData(data);
    }
  }, [twelveWeekData]);
  useEffect(() => {
    if (tour_id) {
      const objusr = { authenticate_key: "abcd123XYZ", tourId: tour_id };
      postRecord(APIGetTrafficReport, objusr).then((res) => {
        if (
          res.data[0].response.status === "success" &&
          Object.keys(res.data[0].response.data).length > 0
        ) {
          setTrafficData(res.data[0].response.data);
          setContactInformation(res.data[0].response.data.contact_information);
          setTourServices(
            parseInt(res.data[0].response.data.services.Tour_service)
          );
          setFlyerServices(
            parseInt(res.data[0].response.data.services.Flyer_service)
          );
          setVideoServices(
            parseInt(res.data[0].response.data.services.Video_service)
          );
          setReferData(res.data[0].response.data.referer_data);
          setWeeklyData(res.data[0].response.data.weekly_data);
          setTwelveWeekData(res.data[0].response.data.last_12week_data);
        } else {
          setopenAlertModal(true);
        }
      });
    }
  }, [tour_id]);
  // console.log(yaxisData);
  // console.log(xaxisData);
  // console.log(videoServices);
  // const generatePDF = () => {
  //   const pages = document.getElementById("container");
  //   html2PDF(pages, {
  //     jsPDF: {
  //       format: "a4",
  //     },
  //     html2canvas: {
  //       scrollX: 0,
  //       scrollY: -window.scrollY,
  //     },
  //     watermark: {
  //       handler({ pdf, imgNode, pageNumber2, totalPageNumber }) {
  //         const props = pdf.getImageProperties(imgNode);
      
  //         pdf.addImage(imgNode, "PNG", 0, 0, 40, 40);
  //       },
  //     },
  //     imageType: "image/png",
  //     output: "./AgentTrafficReport.pdf",
  //   });
  // };
  const generatePDF = () => {
    const element = document.getElementById("container");
  
    if (!element) {
      console.error("Container not found!");
      return;
    }
  
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("AgentTrafficReport.pdf");
    });
  };
  

  var weekDatas = WeeklyData.map((res) => Object.values(res));
  //console.log( parseInt(weekDatas));

  const heading = {
    overflowX: "hidden",
    color: "#7c7c7b",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0px",
    padding: "0px",
    outline: "none",
    textDecoration: "none",
    listStyle: "none",
    boxSizing: "border-box",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f5f7ff",
  };
  const PrintPdf = () => {
    window.print();
  };
  console.log('====================================');
  console.log(trafficData);
  console.log('====================================');
  return (
    <body style={heading} id="container">
      <div style={{ margin: "0 auto", maxWidth: "1000px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px",
            margin: "10px 0px 30px 0px",
          }}
        >
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "10px 0 10px 0",
                    borderBottom: "1px solid #ebebeb",
                  }}
                  align="center"
                  valign="middle"
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tbody>
                      <tr>
                        <td width="55%" align="left" valign="top">
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingBottom: "10px" }}>
                                  {Object.keys(trafficData).length > 0 ? (
                                    <img
                                      src={trafficData.company_logo}
                                      alt=""
                                    />
                                  ) : (
                                    <Skeleton
                                      variant="text"
                                      width={250}
                                      height={250}
                                      style={{ background: "#bbbbbb" }}
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingBottom: "10px" }}>
                                  <a onClick={PrintPdf}>
                                    <img
                                      src={DownloadPrint}
                                      width="178"
                                      height="50"
                                      alt=""
                                      style={{ marginRight: "10px" }}
                                    />
                                  </a>
                                  <a onClick={generatePDF}>
                                    <img
                                      src={DownloadImage}
                                      width="221"
                                      height="50"
                                      alt=""
                                    />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          width="45%"
                          bgcolor="#f7f7f7"
                          style={{ padding: "15px" }}
                          align="left"
                          valign="top"
                        >
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td width="60%">
                                  <h2
                                    style={{
                                      marginBottom: "10px",
                                      marginTop: "0px",
                                      color: "#000",
                                    }}
                                  >
                                    Information
                                    <br />
                                  </h2>
                                  <p style={{ marginBottom: "0px;" }}>
                                    <strong style={{ color: "#ff9900" }}>
                                      Contact information
                                    </strong>
                                    <br />
                                    <strong>
                                      {Object.keys(contactInformation).length >
                                      0 ? (
                                        contactInformation.agentname
                                      ) : (
                                        <Skeleton
                                          variant="text"
                                          width={150}
                                          height={20}
                                          style={{ background: "#bbbbbb" }}
                                        />
                                      )}
                                    </strong>
                                    <br />
                                    {Object.keys(contactInformation).length >
                                    0 ? (
                                      contactInformation.agentcompany
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <strong>License #:</strong>
                                    {Object.keys(contactInformation).length >
                                    0 ? (
                                      contactInformation.licenceno
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <strong>Mobile:</strong>
                                    {Object.keys(contactInformation).length >
                                    0 ? (
                                      contactInformation.mobile
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    {Object.keys(contactInformation).length >
                                    0 ? (
                                      contactInformation.email
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <strong>Price :</strong> ${" "}
                                    {Object.keys(contactInformation).length >
                                    0 ? (
                                      contactInformation.price
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <br />
                                    <strong>Property Location</strong>
                                    <br />
                                    {Object.keys(trafficData).length > 0 ? (
                                      trafficData.price
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                  </p>
                                </td>
                                <td width="40%" align="center" valign="top">
                                  {/* <img src="images/user.png" width="150" alt="" /> */}
                                  {Object.keys(trafficData).length > 0 ? (
                                    <img src={trafficData.agent_logo} alt="" />
                                  ) : (
                                    <Skeleton
                                      variant="text"
                                      width={250}
                                      height={250}
                                      style={{ background: "#bbbbbb" }}
                                    />
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    style={{ color: "#353535" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px",
                          }}
                        >
                          Media Distribution
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <tbody>
                              <tr>
                                <td bgcolor="#FFFFFF" align="center">
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <thead>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Media Distribution
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                All-Time Views
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Visits
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                {" "}
                                Visits(%)
                              </th>
                            </thead>
                            <tbody>
                              <tr>
                                <td bgcolor="#f5f5f5">Tour service</td>
                                <td bgcolor="#f5f5f5">{tourServices}</td>
                                <td bgcolor="#f5f5f5">{tourServices}</td>
                                <td bgcolor="#f5f5f5"></td>
                              </tr>
                              <tr>
                                <td bgcolor="#FFFFFF">Video service</td>
                                <td bgcolor="#FFFFFF">{videoServices}</td>
                                <td bgcolor="#FFFFFF">{videoServices}</td>
                                <td bgcolor="#FFFFFF"></td>
                              </tr>
                              <tr>
                                <td bgcolor="#f5f5f5">Flyer service</td>
                                <td bgcolor="#f5f5f5">{flyerServices}</td>
                                <td bgcolor="#f5f5f5">{flyerServices}</td>
                                <td bgcolor="#f5f5f5"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Media Distribution
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <thead>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Total YouTube link
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Views
                              </th>
                            </thead>
                            <tbody>
                              {trafficData?.youtube_link?.map((yt) => (
                                <tr>
                                  <td bgcolor="#f5f5f5">{yt.youtubeurl}</td>
                                  <td bgcolor="#f5f5f5">{yt.views}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>                    
                     
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>                     
                      
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Weekly Report
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <thead>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Days
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Visits
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Visit%
                              </th>
                            </thead>
                            <tbody>
                              {WeeklyData.length > 0 ? (
                                WeeklyData.map((res) => (
                                  <tr>
                                    <td bgcolor="#f5f5f5">{res.days}</td>
                                    <td bgcolor="#f5f5f5">{res.visit}</td>
                                    <td bgcolor="#f5f5f5">{res.visit_perc}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    style={{ background: "#54e5dd" }}
                                    colSpan="3"
                                  >
                                    No Data found ...
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Weekly Report
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <tbody>
                              <tr>
                                <td bgcolor="#FFFFFF" align="center">
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options2}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Last 12 Weeks of Data
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <thead>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Week
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Visits
                              </th>
                              <th
                                bgcolor="#FFFFFF"
                                style={{ textAlign: "center" }}
                              >
                                Visit%
                              </th>
                            </thead>
                            <tbody>
                              {twelveWeekData.length > 0 ? (
                                twelveWeekData.map((res) => (
                                  <tr>
                                    <td bgcolor="#f5f5f5">{res.week}</td>
                                    <td bgcolor="#f5f5f5">{res.visit}</td>
                                    <td bgcolor="#f5f5f5">{res.visit_perc}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    style={{ background: "#54e5dd" }}
                                    colSpan="3"
                                  >
                                    No Data found ...
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Last 12 Weeks of Data
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <table
                            class="table"
                            width="100%"
                            cellpadding="10"
                            cellspacing="1"
                          >
                            <tbody>
                              <tr>
                                <td bgcolor="#FFFFFF" align="center">
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options3}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td
                          valign="top"
                          style={{
                            padding: "10px",
                            backgroundColor: "#f5f5f5",
                            textAlign: "center",
                            borderTop: "1px solid #ebebeb",
                            color: "#5b5b5b",
                          }}
                        >
                          Powered by VirtualTourCafe
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td
              style={{
                padding: "6px 0 6px 0",
                color: "#333",
                fontSize: "12px",
                paddingTop: "0px;",
              }}
              align="center"
              valign="middle"
            >
              <a onClick={PrintPdf} style={{ marginRight: "15px" }}>
                <img src={DownloadPrint} width="178" height="50" alt="" />
              </a>
              <a onClick={generatePDF}>
                <img src={DownloadImage} width="221" height="50" alt="" />
              </a>
            </td>
          </tr>
        </table>
      </div>
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        aria-labelledby="customized-dialog-title"
        open={openAlertModal}
      >
        <DialogTitle
          align="center"
          style={{ backgroundColor: "red", color: "white" }}
          id="customized-dialog-title"
        >
          Alert !!!
        </DialogTitle>
        <DialogContent dividers>
          <ErrorOutlineIcon
            style={{
              display: "block",
              margin: "0 auto",
              fontSize: "80px",
              color: "#ff5722",
            }}
          />
          <div style={{ padding: "5px 40px 28px 40px" }}>
            <h3
              style={{ fontSize: "26px", margin: "10px", textAlign: "center" }}
            >
              No Data Found ...
            </h3>
          </div>
        </DialogContent>
      </Dialog>
    </body>
    // <body class="traffic">
    //     <div class="container" id="container">
    //         <div class="row">
    //             <div class="col-lg-9 col-md-9 mx-auto">
    //                 <div class="mainbox">
    //                     <div class="row">
    //                         <div class="col-sm-5 topsec_left">
    //                             {Object.keys(trafficData).length > 0 ? (
    //                                 <img src={trafficData.company_logo} alt="" />
    //                             ) : (
    //                                 <Skeleton variant="text" width={250} height={250} style={{ background: "#bbbbbb" }} />
    //                             )}
    //                             <p>
    //                                 <strong>Location: </strong>
    //                                 {Object.keys(trafficData).length > 0 ? (
    //                                     trafficData.property_address
    //                                 ) : (
    //                                     <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                 )}
    //                             </p>

    //                         </div>
    //                         <div class="col-sm-7">
    //                             <div class="agentadd">
    //                                 {Object.keys(trafficData).length > 0 ? (
    //                                     <img src={trafficData.agent_logo} style={{ position: "absolute", left: "70%", top: "20%" }} alt="" />
    //                                 ) : (
    //                                     <Skeleton variant="text" width={100} height={100} style={{ background: "#bbbbbb" }} />
    //                                 )}

    //                                 <div class="titlebar">Information</div>
    //                                 <div class="topsec_right">
    //                                     <h6 style={{ color: "#ff9900" }}>Contact information</h6>
    //                                     <span>{Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.contact_information.agentname
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>
    //                                     <span>{Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.contact_information.agentcompany
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>

    //                                     <span> License #: {Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.contact_information.licenceno
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>
    //                                     <span> Mobile: {Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.contact_information.mobile
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>
    //                                     <span>{Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.contact_information.email
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>
    //                                     <span> <a onClick={generatePDF} class="btn-style-one">Download as PDF</a></span><br></br>
    //                                     <span> <strong>property location</strong></span><br></br>
    //                                     <span>{Object.keys(trafficData).length > 0 ? (
    //                                         trafficData.property_address
    //                                     ) : (
    //                                         <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
    //                                     )}</span><br></br>

    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>
    //                     <hr class="spacer30px" />
    //                     <div class="row">
    //                         <div class="col-sm-12">
    //                             <div class="bodywork">
    //                                 <div class="graphchart">
    //                                     <Chart
    //                                         width={'500px'}
    //                                         height={'500px'}
    //                                         chartType="PieChart"
    //                                         loader={<div>Loading Pie Chart</div>}
    //                                         data={[
    //                                             ['Servies', 'Tour services'],
    //                                             ['Tour', tourServices1],
    //                                             ['Flyer', tourServices2],
    //                                             ['Video', tourServices3],
    //                                         ]}
    //                                         options={{
    //                                             title: 'Media Distribution',
    //                                             is3D: true,
    //                                         }}
    //                                     />
    //                                 </div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">Media Distribution</th>
    //                                                             <th style={{ color: "#ffffff" }}>All-Time Views</th>
    //                                                             <th style={{ color: "#ffffff" }}>Visits</th>
    //                                                             <th style={{ color: "#ffffff" }}> Visits(%)</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td>Tour service </td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle">91.60%</td>
    //                                                         </tr>
    //                                                         <tr>
    //                                                             <td>Video service </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">6</td>
    //                                                             <td align="center" valign="middle">0.99%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>Flyer service </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle"> 45</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>
    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">YouTube link</th>
    //                                                             <th style={{ color: "#ffffff" }}> Visits(%)</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td>http://www.youtube.com/watch?v=74MJlkr_7ck&feature=youtube_gdata_player  </td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                         </tr>
    //                                                         <tr>
    //                                                             <td>http://www.youtube.com/watch?v=74MJlkr_7ck&feature=youtube_gdata_player </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                         </tr>
    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">QR Codes </th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td align="center">No Records Found </td>
    //                                                         </tr>
    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <hr class="spacer30px" />
    //                     <div class="row">
    //                         <div class="col-sm-12">
    //                             <div class="titlebar">Referring Websites</div>
    //                             <div class="bodywork">
    //                                 <div class="graphchart"><img src={graph2} alt="" /></div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">Referring Websites</th>
    //                                                             <th style={{ color: "#ffffff" }}>All-Time Views</th>
    //                                                             <th style={{ color: "#ffffff" }}>Visits</th>
    //                                                             <th style={{ color: "#ffffff" }}> Visits(%)</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td>Direct</td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle">91.60%</td>
    //                                                         </tr>
    //                                                         <tr>
    //                                                             <td>www.facebook.com  </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">6</td>
    //                                                             <td align="center" valign="middle">0.99%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>virtualtourcafe.com</td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle"> 45</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <hr class="spacer30px" />
    //                     <div class="row">
    //                         <div class="col-sm-12">
    //                             <div class="titlebar">Weekly Report </div>
    //                             <div class="bodywork">
    //                                 <div class="graphchart"><img src={grapf} alt="" /></div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">Days</th>
    //                                                             <th style={{ color: "#ffffff" }}>Visits</th>
    //                                                             <th style={{ color: "#ffffff" }}> Visits(%)</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td>Saturday - Mar 17  </td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle">91.60%</td>
    //                                                         </tr>
    //                                                         <tr>
    //                                                             <td>Sunday - Mar 18</td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">0.99%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>Tuesday - Mar 20</td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>Wednesday - Mar 21 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>Thursday - Mar 22     </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <hr class="spacer30px" />
    //                     <div class="row">
    //                         <div class="col-sm-12">
    //                             <div class="titlebar">Last 12 Weeks of Data</div>
    //                             <div class="bodywork">
    //                                 <div class="graphchart"><img src="images/graph.jpg" alt="" /></div>
    //                                 <div class="bodywork_table">
    //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                         <tr>
    //                                             <td bgcolor="#d6d6d6">
    //                                                 <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ color: "#ffffff" }} align="left">Week</th>
    //                                                             <th style={{ color: "#ffffff" }}>Visits</th>
    //                                                             <th style={{ color: "#ffffff" }}> Visits(%)</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         <tr>
    //                                                             <td>W12 Mar 18—Mar 24  </td>
    //                                                             <td align="center" valign="middle"> 556</td>
    //                                                             <td align="center" valign="middle">91.60%</td>
    //                                                         </tr>
    //                                                         <tr>
    //                                                             <td>W11 Mar 11—Mar 17</td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">0.99%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W10 Mar 4—Mar 10</td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W9 Wednesday - Mar 21 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W8 Thursday - Mar 22     </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W7 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W6 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W5 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W4 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W3 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W2 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>

    //                                                         <tr>
    //                                                             <td>W2 Friday - Mar 23 </td>
    //                                                             <td align="center" valign="middle">Doe</td>
    //                                                             <td align="center" valign="middle">7.41%</td>
    //                                                         </tr>
    //                                                     </tbody>
    //                                                 </table></td>
    //                                         </tr>
    //                                     </table>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <hr class="spacer30px" />
    //                 </div>
    //                 <div class="footerbox">Powered by VirtualTourCafe</div>
    //             </div>
    //         </div>
    //     </div >
    // </body>
  );
}


