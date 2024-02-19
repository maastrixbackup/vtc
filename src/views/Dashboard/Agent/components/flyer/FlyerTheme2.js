import React, { useEffect, useState } from "react";
import company_img from "../../../../../images/company.png";

export default function FlyerTheme2(props) {
  const { tourData, allData, link } = props;
  const [bgColor, setBgColor] = useState("#00aae8");
  const [bgColor2, setBgColor2] = useState("#3a3135");
  useEffect(() => {
    if (allData.themeId == 5) {
      setBgColor("#022a79");
      setBgColor2("#222222");
    } else if (allData.themeId == 6) {
      setBgColor("#b2030c");
      setBgColor2("#acacac");
    } else if (allData.themeId == 7) {
      setBgColor("#e5193a");
      setBgColor2("#1b2f7e");
    } else if (allData.themeId == 4) {
      setBgColor("#e29900");
      setBgColor2("#181411");
    } else if (allData.themeId == 257) {
      setBgColor("#000000");
      setBgColor2("#1d1916");
    } else if (allData.themeId == 258) {
      setBgColor("#000000");
      setBgColor2("#989898");
    } else if (allData.themeId == 130) {
      setBgColor("#3a527e");
      setBgColor2("#383838");
    } else if (allData.themeId == 141) {
      setBgColor("#031937");
      setBgColor2("#e22334");
    } else if (allData.themeId == 237) {
      setBgColor("#923c72");
      setBgColor2("#8f8f8f");
    } else if (allData.themeId == 84) {
      setBgColor("#428a37");
      setBgColor2("#3e3e3e");
    } else if (allData.themeId == 75) {
      setBgColor("#b8894e");
      setBgColor2("#7a7a7a");
    } else if (allData.themeId == 3) {
      setBgColor("#045864");
      setBgColor2("#9b0034");
    } else if (allData.themeId == 145) {
      setBgColor("#e20f30");
      setBgColor2("#282828");
    }
  }, [allData]);
  return (
    <React.Fragment>
      <table
        width="100%"
        border="0"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style={{
          color: "#fff",
          fontSize: "14px",
        }}
        className="customFont"
      >
        <tr>
          <td
            width="62%"
            align="center"
            valign="middle"
            bgcolor={bgColor}
            style={{ padding: "0px 10px" }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "32px",
                margin: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              {Object.keys(tourData).length > 0 && tourData.caption}
            </h1>
            <h6
              style={{
                color: "#fff",
                fontSize: "16px",
                margin: "0px",
                padding: "0px",
                textTransform: "uppercase",
              }}
            >
              {Object.keys(tourData).length > 0 &&
                tourData.address +
                  " , " +
                  tourData.city +
                  " , " +
                  tourData.state +
                  " , " +
                  tourData.zipcode}
            </h6>
          </td>
          <td width="1%" height="100%" align="center" valign="middle">
            &nbsp;
          </td>
          <td
            width="37%"
            align="center"
            valign="middle"
            bgcolor={bgColor2}
            style={{ paddingTop: "5px", paddingBottom: "5px" }}
          >
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr style={{ background: bgColor2 }}>
                <td align="center">
                  {Object.keys(allData).length > 0 &&
                    allData.getProperty?.is_flyer_agent_photo == 1 && (
                      <img
                        src={allData.agentphoto}
                        alt=""
                        width="90"
                        height="90"
                        style={{ border: "2px solid #fff", margin: "2px" }}
                      />
                    )}
                  {Object.keys(allData).length > 0 &&
                  allData.companylogo &&
                  allData.getProperty?.is_flyer_agent_company_photo == 1 ? (
                    <img
                      src={allData.companylogo}
                      alt=""
                      width="90"
                      height="90"
                      style={{ border: "2px solid #fff", margin: "2px" }}
                    />
                  ) : (
                    <img src={company_img} alt="" width="90" height="90" />
                  )}
                </td>
              </tr>
              <tr style={{ background: bgColor2 }}>
                <td height="100%"></td>
              </tr>
              <tr style={{ background: bgColor2 }}>
                <td align="center" valign="top">
                  <strong>
                    {Object.keys(allData).length > 0 && allData.agentname}
                  </strong>
                  <br />
                  <strong>
                    {Object.keys(allData).length > 0 && allData.companyname}
                  </strong>
                  <br />
                  <span id="agentInfo" style={{ fontSize: "14px" }}>
                    Lic# {Object.keys(allData).length > 0 && allData.licenceno}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="100%" colspan="3" align="left" valign="top"></td>
        </tr>

        <tr>
          <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <img
                    src={allData.image_url[0]}
                    alt=""
                    srcset=""
                    height="350"
                    width="550"
                  />
                </td>
              </tr>
              <tr>
                <td height="10" colspan="3" align="left" valign="top"></td>
              </tr>
              <tr>
                <td colspan="3" align="left" valign="top">
                  <div
                    style={{
                      float: "left",
                      width: "100%",                     
                    }}
                  >
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td align="left" valign="top">
                          {Object.keys(allData).length > 0 && (
                            <img
                              src={allData.image_url[1]}
                              alt=""
                              width="100%"
                              height="150"
                            />
                          )}
                        </td>
                        <td width="2%" align="left" valign="top"></td>
                        <td align="right" valign="top">
                          {Object.keys(allData).length > 0 && (
                            <img
                              src={allData.image_url[2]}
                              alt=""
                              width="100%"
                              height="150"
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          height="10"
                          colspan="3"
                          align="left"
                          valign="top"
                        ></td>
                      </tr>
                      <tr>
                        <td align="left" valign="top">
                          {Object.keys(allData).length > 0 && (
                            <img
                              src={allData.image_url[3]}
                              alt=""
                              width="100%"
                              height="150"
                            />
                          )}
                        </td>
                        <td align="left" valign="top">
                          &nbsp;
                        </td>
                        <td align="right" valign="top">
                          {Object.keys(allData).length > 0 && (
                            <img
                              src={allData.image_url[4]}
                              alt=""
                              width="100%"
                              height="150"
                            />
                          )}
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td height="10" colspan="3" align="left" valign="top"></td>
              </tr>
            </table>
          </td>
          <td height="100%" align="left" valign="top">
            &nbsp;
          </td>
          <td align="left" valign="top" bgcolor={bgColor}>
            <table
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td valign="top" style={{ padding: "10px" }} bgcolor={bgColor}>
                  <p
                    style={{
                      margin: "0px",
                      color: "white",
                      fontSize: "13px",
                      lineHeight: "17px",
                    }}
                    dangerouslySetInnerHTML={{ __html:Object.keys(tourData).length > 0 &&
                          tourData.description }}
                  >
                    
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="100%" colspan="3" align="left" valign="top"></td>
        </tr>
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor={bgColor}
            style={{ padding: "10px" }}
          >
            <table
              width="96%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr style={{ background: bgColor }}>
                <td colspan="2">
                  <h4
                    style={{
                      margin: "0 0 20px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Offered at :
                    {Object.keys(tourData).length > 0 && tourData.price}
                  </h4>

                  <h6
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      margin: "0 0 10px 0",
                      padding: "0",
                      textTransform: "uppercase",
                    }}
                  >
                    Features
                  </h6>
                </td>
              </tr>

              <tr style={{ background: bgColor }}>
                <td width="50%" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="3"
                  >
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Bedrooms</b> :
                        {Object.keys(tourData).length > 0 &&
                          tourData.totalbedrooms}
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Bathrooms</b> :{" "}
                        {Object.keys(tourData).length > 0 &&
                          tourData.totalbathrooms}
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Garage</b> :{" "}
                        {Object.keys(tourData).length > 0 &&
                          tourData.garagesize}
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="50%">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="3"
                  >
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Year Built</b> :
                        {Object.keys(tourData).length > 0 && tourData.yearbuilt}
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Lot size</b> :
                        {Object.keys(tourData).length > 0 && tourData.lotsize}
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Interior Sq. Ft</b> :
                        {Object.keys(tourData).length > 0 && tourData.sqfootage}{" "}
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td align="left" valign="top">
                        <b>Subdivision</b> :{" "}
                        {Object.keys(tourData).length > 0 &&
                          tourData.subdivision}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
          <td height="100%" align="left" valign="top">
            &nbsp;
          </td>
          <td
            align="center"
            valign="middle"
            bgcolor={bgColor2}
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <table width="80%" border="0" cellspacing="0" cellpadding="0">
              <tr style={{ background: bgColor2 }}>
                <td align="center" valign="top">
                  {tourData.web_address ? (
                    <a
                      href={`${tourData.web_address}`}
                      style={{
                        margin: "5px 0px 5px 0px",
                        fontSize: "14px",
                        wordBreak: "break-all",
                        color: "white",
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`${tourData.web_address}`}
                    </a>
                  ) : (
                    <a
                      href={`https://www.virtualtourcafe.com/tour/${link}`}
                      style={{
                        margin: "5px 0px 5px 0px",
                        fontSize: "14px",
                        wordBreak: "break-all",
                        color: "white",
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`https://www.virtualtourcafe.com/tour/${link}`}
                    </a>
                  )}

                  <p
                    style={{ margin: "0px", fontSize: "12px", color: "white" }}
                  >
                    All information deemed reliable, but not guaranteed.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
}
