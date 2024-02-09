import React, { useState, useEffect, useContext, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DownloadImage from "../../../images/download-btn.gif";
import DownloadPrint from "../../../images/print-btn.gif";
import Skeleton from "@material-ui/lab/Skeleton";
import { APIURL, APIPath } from "../../../CommonMethods/Fetch";
import { postRecord } from "../../../CommonMethods/Save";
import html2PDF from "jspdf-html2canvas";
import { Chart } from "react-google-charts";
import { AuthContext } from "../../../CommonMethods/Authentication";
const APIGetTrafficReport = APIURL() + "trafficreportcontent-Broker";

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
export default function TrafficReport(props) {
  //const tour_id = props.match.params.tourid;
  const context = useContext(AuthContext);
  const [trafficData, setTrafficData] = useState({});
  const [brokerTrafficdata, setBrokertrafficdata] = useState({});
  const [totalTour, setTotalTour] = useState(0);
  const [totalFlyer, setTotalFlyer] = useState(0);
  const [totalVideo, setTotalVideo] = useState(0);
  const [topTenMonthly, setTopTenMonthly] = useState([]);
  const [referDomain, setReferDomain] = useState([]);
  const [xaxisData, setXaxisData] = useState([]);
  const [yaxisData, setYaxisData] = useState([]);
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
      pointFormat: "{series.name}</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y} ",
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
            y: { totalTour },
            sliced: true,
            selected: true,
          },
          {
            name: "Video Service",
            y: { totalVideo },
          },
          {
            name: "Flyer Service",
            y: { totalFlyer },
          },
        ],
      },
    ],
  };
  useEffect(() => {
    if (context.state.user) {
      const objuser = {
        authenticate_key: "abcd123XYZ",
        BrokerId: JSON.parse(context.state.user).user_id,
      };
      postRecord(APIGetTrafficReport, objuser).then((res) => {
        if (res.data[0].response.status === "success") {
          setBrokertrafficdata(res.data[0].response.data.BrokerDetails[0]);
          setTrafficData(res.data[0].response.data);
          setTotalFlyer(parseInt(res.data[0].response.data.TotalViewsFlyer));
          setTotalVideo(parseInt(res.data[0].response.data.TotalViewsVideo));
          setTotalTour(parseInt(res.data[0].response.data.TotalViewsTours));
          setTopTenMonthly(res.data[0].response.data.T10Monthly);
          setReferDomain(res.data[0].response.data.referDomain);
        }
      });
    }
  }, [context.state.user]);
  const options_ref = {
    title: {
      text: "",
    },
    chart: {
      type: "column",
    },
    xAxis: {
      title: {
        text: "Domain",
      },
      categories: xaxisData,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Views",
      },
    },
    series: [{ data: yaxisData }],
  };
  useEffect(() => {
    if (referDomain) {
      var x_data = [];
      var y_data = [];
      referDomain.forEach((res) => {
        x_data.push(res.domain);
        y_data.push(parseInt(res.totalviews));
      });
      setXaxisData(x_data);
      setYaxisData(y_data);
    }
  }, [referDomain]);
  const generatePDF = () => {
    const pages = document.getElementById("container");
    html2PDF(pages, {
      jsPDF: {
        format: "a4",
      },
      html2canvas: {
        scrollX: 0,
        scrollY: -window.scrollY,
      },
      watermark: {
        handler({ pdf, imgNode, pageNumber2, totalPageNumber }) {
          const props = pdf.getImageProperties(imgNode);
          // do something...
          pdf.addImage(imgNode, "PNG", 0, 0, 40, 40);
        },
      },
      imageType: "image/png/gif",
      output: "./AgentFlyer.pdf",
    });
  };

  const initialValue = 0;
  if (topTenMonthly) {
    var sumWithInitial = topTenMonthly.reduce(
      (previousValue, currentValue) => previousValue + currentValue.views,
      initialValue
    );
    var topTenData = [];
    topTenMonthly.map((res) => {
      if (res.percentage == "") {
        res.percentage = (res.views / sumWithInitial) * 100;
      }
      topTenData.push(res);
    });
  }

  // var arrayOfData=[];
  // referDomain.map(res=>{
  //         arrayOfData.push(res.domain,res.totalviews);
  // })
  // var DataOfArray=[];
  // DataOfArray.push(arrayOfData);
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
                                    <img src={trafficData.companyLogo} alt="" />
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
                                  <a href="#">
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
                                <td width="100%">
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
                                      {Object.keys(brokerTrafficdata).length >
                                      0 ? (
                                        brokerTrafficdata.brokername
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
                                    {Object.keys(brokerTrafficdata).length >
                                    0 ? (
                                      brokerTrafficdata.company_name
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <strong>License #:</strong>{" "}
                                    {Object.keys(brokerTrafficdata).length >
                                    0 ? (
                                      brokerTrafficdata.licenseno
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    <strong>Mobile:</strong>{" "}
                                    {Object.keys(brokerTrafficdata).length >
                                    0 ? (
                                      brokerTrafficdata.mobile
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    {Object.keys(brokerTrafficdata).length >
                                    0 ? (
                                      brokerTrafficdata.email
                                    ) : (
                                      <Skeleton
                                        variant="text"
                                        width={150}
                                        height={20}
                                        style={{ background: "#bbbbbb" }}
                                      />
                                    )}
                                    <br />
                                    {/* <strong>Price :</strong> $ 22,000<br /> */}
                                    <br />
                                    <strong>Property Location</strong>
                                    <br />
                                    {Object.keys(brokerTrafficdata).length >
                                    0 ? (
                                      brokerTrafficdata.statename
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
                                  <img
                                    src="images/user.png"
                                    width="150"
                                    alt=""
                                  />
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
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalViewsTours}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalViewsTours}
                                </td>
                                <td bgcolor="#f5f5f5"></td>
                              </tr>
                              <tr>
                                <td bgcolor="#FFFFFF">Video service</td>
                                <td bgcolor="#FFFFFF">
                                  {trafficData.TotalViewsVideo}
                                </td>
                                <td bgcolor="#FFFFFF">
                                  {trafficData.TotalViewsVideo}
                                </td>
                                <td bgcolor="#FFFFFF"></td>
                              </tr>
                              <tr>
                                <td bgcolor="#f5f5f5">Flyer service</td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalViewsFlyer}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalViewsFlyer}
                                </td>
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
                            fontSize: "18px",
                          }}
                        >
                          Graph Goes Here
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
                                  {Object.keys(trafficData).length > 0 ? (
                                    <HighchartsReact
                                      highcharts={Highcharts}
                                      options={options}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  {/* <Chart
                                                                        width={'500px'}
                                                                        height={'300px'}
                                                                        chartType="PieChart"
                                                                        loader={<div>Loading Pie Chart</div>}
                                                                        data={[
                                                                            ['tourServices', 'Services'],
                                                                            ['Tour', Tour],
                                                                            ['Flyer', flyer],
                                                                            ['Video', video],
                                                                        ]}
                                                                        options={{
                                                                            title: 'Media Distribution',
                                                                            is3D: true,
                                                                        }}
                                                                    />  */}
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
                              {/* <tr>
                                                                <th align="left" bgcolor="#FFFFFF">Firstname</th>
                                                                <th align="left" bgcolor="#FFFFFF">Lastname</th>
                                                                <th align="left" bgcolor="#FFFFFF">Email</th>
                                                            </tr> */}
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
                                Visits
                              </th>
                            </thead>
                            <tbody>
                              <tr>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTlinks}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTviews}
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
                          Referring Websites
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
                                Referring Websites link
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
                                Visits%
                              </th>
                            </thead>
                            <tbody>
                              {referDomain.map((res) => (
                                <tr>
                                  <td bgcolor="#f5f5f5">{res.domain}</td>
                                  <td bgcolor="#f5f5f5">{res.totalviews}</td>
                                  <td bgcolor="#f5f5f5"></td>
                                  <td bgcolor="#f5f5f5"></td>
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
                        <td
                          valign="top"
                          class="bg-active"
                          style={{
                            padding: "12px",
                            fontWeight: "600",
                            fontSize: "18px;",
                          }}
                        >
                          Referring Websites
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" bgcolor="#e6e6e6">
                          <div class="col-lg-12 col-md-12">
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={options_ref}
                            />

                            {/* <div class="top_ten_tour_img">
                                <img src={tours} alt="" title="" />
                            </div> */}
                          </div>
                          {/* <table class="table" width="100%" cellpadding="10" cellspacing="1">

                                                        <tbody>

                                                            <tr>
                                                                <td bgcolor="#FFFFFF" align="center">
                                                                    <Chart
                                                                        width="100%"
                                                                        height="400px"
                                                                        chartType="PieChart"
                                                                        loader={<div>Loading Pie Chart</div>}
                                                                        data={[
                                                                            ['tourServices', 'Services'],
                                                                            ['Tour', Tour],
                                                                            ['Flyer', flyer],
                                                                            ['Video', video],
                                                                        ]}
                                                                        options={{
                                                                            title: 'Reffering Website',
                                                                            is3D: true,
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table> */}
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
                            <thead>
                              {/* <tr>
                                                                <th align="left" bgcolor="#FFFFFF">Firstname</th>
                                                                <th align="left" bgcolor="#FFFFFF">Lastname</th>
                                                                <th align="left" bgcolor="#FFFFFF">Email</th>
                                                            </tr> */}
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
                              <tr>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTlinks}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTviews}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTviews}
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
                          Referring Websites
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
                                  {/* <Chart
                                                                        width="100%"
                                                                        height="400px"
                                                                        chartType="BarChart"
                                                                        loader={<div>Loading Pie Chart</div>}
                                                                        data={[
                                                                            ['tourServices', 'Services'],
                                                                            ['Tour', Tour],
                                                                            ['Flyer', flyer],
                                                                            ['Video', video],
                                                                        ]}
                                                                        options={{
                                                                            title: 'Media Distribution',
                                                                            is3D: true,
                                                                        }}
                                                                    /> */}
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
                          Top Ten Agent
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
                              <th bgcolor="#FFFFFF" align="left">
                                Name
                              </th>
                              <th bgcolor="#FFFFFF" align="left">
                                Visits
                              </th>
                              <th bgcolor="#FFFFFF" align="left">
                                Visit%
                              </th>
                            </thead>
                            <tbody>
                              <tr>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTlinks}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTviews}
                                </td>
                                <td bgcolor="#f5f5f5">
                                  {trafficData.TotalYTviews}
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
                            <tbody>
                              <tr>
                                <td bgcolor="#FFFFFF" align="center">
                                  {/* <Chart
                                                                        width="100%"
                                                                        height="400px"
                                                                        chartType="BarChart"
                                                                        loader={<div>Loading Pie Chart</div>}
                                                                        data={[
                                                                            ['tourServices', 'Services'],
                                                                            ['Tour', Tour],
                                                                            ['Flyer', flyer],
                                                                            ['Video', video],
                                                                        ]}
                                                                        options={{
                                                                            title: 'Media Distribution',
                                                                            is3D: true,
                                                                        }}
                                                                    /> */}
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
                          Top Ten Tours Monthly Report
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
                              <th bgcolor="#FFFFFF" align="left">
                                Name
                              </th>
                              <th bgcolor="#FFFFFF" align="left">
                                Views
                              </th>
                              <th bgcolor="#FFFFFF" align="left">
                                Views%
                              </th>
                            </thead>
                            <tbody>
                              {topTenData && topTenData.length > 0
                                ? topTenData.map((res) => (
                                    <tr>
                                      <td bgcolor="#f5f5f5">{res.tourname}</td>
                                      <td bgcolor="#f5f5f5">{res.views}</td>
                                      <td bgcolor="#f5f5f5">
                                        {res.percentage}
                                      </td>
                                    </tr>
                                  ))
                                : ""}
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
                            <tbody>
                              <tr>
                                <td bgcolor="#FFFFFF" align="center">
                                  {/* <Chart
                                                                        width="100%"
                                                                        height="400px"
                                                                        chartType="BarChart"
                                                                        loader={<div>Loading Pie Chart</div>}
                                                                        data={[
                                                                            ['tourServices', 'Services'],
                                                                            ['Tour', Tour],
                                                                            ['Flyer', flyer],
                                                                            ['Video', video],
                                                                        ]}
                                                                        options={{
                                                                            title: 'Media Distribution',
                                                                            is3D: true,
                                                                        }}
                                                                    /> */}
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
                        <td valign="top">&nbsp;</td>
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
              <a href="#" style={{ marginRight: "15px" }}>
                <img src={DownloadPrint} width="178" height="50" alt="" />
              </a>
              <a href="#">
                <img src={DownloadImage} width="221" height="50" alt="" />
              </a>
            </td>
          </tr>
        </table>
      </div>
      {/* <div class="container" id="container">
                <div class="row">
                    <div class="col-lg-9 col-md-9 mx-auto">
                        <div class="mainbox">
                            <div class="row">
                                <div class="col-sm-5 topsec_left">
                                    {Object.keys(trafficData).length > 0 ? (
                                        <img src={trafficData.companyLogo} alt="" />
                                    ) : (
                                        <Skeleton variant="text" width={250} height={250} style={{ background: "#bbbbbb" }} />
                                    )}
                                    <p>
                                        <strong>Location: </strong>
                                        {Object.keys(brokerTrafficdata).length > 0 ? (
                                            brokerTrafficdata.statename
                                        ) : (
                                            <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                        )}
                                    </p>

                                </div>
                                <div class="col-sm-7">
                                    <div class="agentadd">
                                        <div class="titlebar">Information</div>
                                        <div class="topsec_right">
                                            <h6>Contact Information</h6>
                                            <span>{Object.keys(brokerTrafficdata).length > 0 ? (
                                                brokerTrafficdata.brokername
                                            ) : (
                                                <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                            )}</span>
                                            <h6>License #:{Object.keys(brokerTrafficdata).length > 0 ? (
                                                brokerTrafficdata.licenseno
                                            ) : (
                                                <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                            )}</h6>
                                            <h6>Mobile:{Object.keys(brokerTrafficdata).length > 0 ? (
                                                brokerTrafficdata.mobile
                                            ) : (
                                                <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                            )}</h6>

                                            <a onClick={generatePDF} class="btn-style-one">Download as PDF</a><br></br>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Media Distribution</div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width={'500px'}
                                                height={'500px'}
                                                chartType="PieChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Media Distribution</th>
                                                                    <th style={{ color: "#ffffff" }}>All-Time Views</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Tour service </td>
                                                                    <td align="center" valign="middle"> {trafficData.TotalViewsTours}</td>
                                                                    <td align="center" valign="middle"> {trafficData.TotalViewsTours}</td>
                                                                    <td align="center" valign="middle">91.60%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Video service </td>
                                                                    <td align="center" valign="middle">{trafficData.TotalViewsVideo}</td>
                                                                    <td align="center" valign="middle">{trafficData.TotalViewsVideo}</td>
                                                                    <td align="center" valign="middle">0.99%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Flyer service </td>
                                                                    <td align="center" valign="middle">{trafficData.TotalViewsFlyer}</td>
                                                                    <td align="center" valign="middle">{trafficData.TotalViewsFlyer}</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table style={{ margin: "0" }} width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Total YouTube link</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{trafficData.TotalYTlinks}</td>
                                                                    <td align="center" valign="middle"> {trafficData.TotalYTviews}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">QR Codes </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center">No Records Found </td>
                                                                </tr>
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Referring Websites</div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width="100%"
                                                height="400px"
                                                chartType="BarChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Referring Websites</th>
                                                                    <th style={{ color: "#ffffff" }}>All-Time Views</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Direct</td>
                                                                    <td align="center" valign="middle"> 556</td>
                                                                    <td align="center" valign="middle"> 556</td>
                                                                    <td align="center" valign="middle">91.60%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>www.facebook.com  </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">6</td>
                                                                    <td align="center" valign="middle">0.99%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>virtualtourcafe.com</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle"> 45</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Weekly Report </div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width="100%"
                                                height="400px"
                                                chartType="PieChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Days</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Saturday - Mar 17  </td>
                                                                    <td align="center" valign="middle"> 556</td>
                                                                    <td align="center" valign="middle">91.60%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Sunday - Mar 18</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">0.99%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Tuesday - Mar 20</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Wednesday - Mar 21 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Thursday - Mar 22     </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Traffic History</div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width="100%"
                                                height="400px"
                                                chartType="PieChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Week</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>W12 Mar 18—Mar 24  </td>
                                                                    <td align="center" valign="middle"> 556</td>
                                                                    <td align="center" valign="middle">91.60%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>W11 Mar 11—Mar 17</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">0.99%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W10 Mar 4—Mar 10</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W9 Wednesday - Mar 21 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W8 Thursday - Mar 22     </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W7 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W6 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W5 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W4 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W3 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W2 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W2 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Top 10 Agents</div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width="100%"
                                                height="400px"
                                                chartType="PieChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Name</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>W12 Mar 18—Mar 24  </td>
                                                                    <td align="center" valign="middle"> 556</td>
                                                                    <td align="center" valign="middle">91.60%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>W11 Mar 11—Mar 17</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">0.99%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W10 Mar 4—Mar 10</td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W9 Wednesday - Mar 21 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W8 Thursday - Mar 22     </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W7 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W6 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W5 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W4 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W3 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W2 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>W2 Friday - Mar 23 </td>
                                                                    <td align="center" valign="middle">Doe</td>
                                                                    <td align="center" valign="middle">7.41%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px">
                            </hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="titlebar">Top 10 Tours (Monthly Report)</div>
                                    <div class="bodywork">
                                        <div class="graphchart">
                                            <Chart
                                                width="100%"
                                                height="400px"
                                                chartType="PieChart"
                                                loader={<div>Loading Pie Chart</div>}
                                                data={[
                                                    ['tourServices', 'Services'],
                                                    ['Tour', Tour],
                                                    ['Flyer', flyer],
                                                    ['Video', video],
                                                ]}
                                                options={{
                                                    title: 'Media Distribution',
                                                    is3D: true,
                                                }}
                                            />
                                        </div>
                                        <div class="bodywork_table">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#d6d6d6">
                                                        <table class="table " width="100%" border="0" cellspacing="1" cellpadding="0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ color: "#ffffff" }} align="left">Tour</th>
                                                                    <th style={{ color: "#ffffff" }}>Visits</th>
                                                                    <th style={{ color: "#ffffff" }}> Visits(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {topTenData.map(res => (
                                                                    <tr>
                                                                        <td>{res.tourname}  </td>
                                                                        <td align="center" valign="middle">{res.views}</td>
                                                                        <td align="center" valign="middle">{(res.percentage).toFixed(2)}</td>
                                                                    </tr>

                                                                ))}
                                                            </tbody>
                                                        </table></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footerbox">Powered by VirtualTourCafe</div>
                    </div>
                </div>
            </div > */}
    </body>
  );
}
