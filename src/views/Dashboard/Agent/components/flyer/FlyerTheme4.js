import React, { useEffect, useState } from "react";
import company_img from "../../../../../images/company.png";

export default function FlyerTheme4(props) {
  const { tourData, allData, link } = props;
  const [bgColor, setBgColor] = useState("#2e6fa6");
  const [bgColor2, setBgColor2] = useState("#f3f3f3");
  useEffect(() => {
    if (allData.themeId == 5) {
      setBgColor("#082b75");
      setBgColor2("#222224");
    } else if (allData.themeId == 6) {
      setBgColor("#acacac");
      setBgColor2("#b80311");
    } else if (allData.themeId == 7) {
      setBgColor("#17317d");
      setBgColor2("#e92044");
    } else if (allData.themeId == 4) {
      setBgColor("#1d1916");
      setBgColor2("#f59100");
    } else if (allData.themeId == 257) {
      setBgColor("#000000");
      setBgColor2("#030303");
    } else if (allData.themeId == 258) {
      setBgColor("#989898");
      setBgColor2("#000103");
    } else if (allData.themeId == 130) {
      setBgColor("#000000");
      setBgColor2("#354973");
    } else if (allData.themeId == 141) {
      setBgColor("#e12334");
      setBgColor2("#35476e");
    } else if (allData.themeId == 237) {
      setBgColor("#8e8e8e");
      setBgColor2("#8a4679");
    } else if (allData.themeId == 84) {
      setBgColor("#3e3e3e");
      setBgColor2("#428836");
    } else if (allData.themeId == 75) {
      setBgColor("#7a7a7a");
      setBgColor2("#b9864d");
    } else if (allData.themeId == 3) {
      setBgColor("#990134");
      setBgColor2("#005b60");
    } else if (allData.themeId == 145) {
      setBgColor("#1d1916");
      setBgColor2("#e61238");
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
          color: "#606060",
          fontSize: "14px",
        }}
        className="customFont"
      >
        <tr>
          <td>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="250" align="left" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td align="left" valign="top" height="132">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[1]}
                            alt=""
                            width="250"
                            height="132"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="5"></td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="132">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[2]}
                            alt=""
                            width="250"
                            height="132"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="5"></td>
                    </tr>{" "}
                    <tr>
                      <td align="left" valign="top" height="132">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[3]}
                            alt=""
                            width="250"
                            height="132"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="5"></td>
                    </tr>{" "}
                    <tr>
                      <td align="left" valign="top" height="132">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[4]}
                            alt=""
                            width="250"
                            height="132"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="5"></td>
                    </tr>{" "}
                    <tr>
                      <td align="left" valign="top" height="132">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[5]}
                            alt=""
                            width="250"
                            height="132"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" height="5"></td>
                    </tr>
                  </table>
                </td>
                <td width="10" align="left" valign="top">
                  &nbsp;
                </td>
                <td width="556" align="left" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td align="right" valign="top">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[0]}
                            alt=""
                            width="100%"
                            height="300"
                            className="customImagePrint"                     
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="center"
                        valign="top"
                        bgcolor={bgColor}
                        style={{ padding: "10px", color: "#FFFFFF" }}
                      >
                        <p style={{ color: "#FFFFFF", margin: "0px" }}>
                        {Object.keys(tourData).length > 0 &&
                    tourData.address + " , " + tourData.city + " , " + tourData.state + " , " + tourData.zipcode}
                        </p>
                        <p style={{ color: "#FFFFFF", margin: "0px" }}>
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
                        </p>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td
                        height="117"
                        align="center"
                        valign="middle"
                        style={{ padding: "10px" }}
                      >
                        <h6
                          style={{
                            color: bgColor,
                            fontSize: "18px",
                            margin: "0px 0px 10px 0px",
                            padding: "0px",
                            textTransform: "uppercase",
                          }}
                        >
                          <b>Offered at</b>:
                          {Object.keys(tourData).length > 0 && tourData.price}
                        </h6>

                        <h1
                          style={{
                            color: bgColor,
                            fontSize: "26px",
                            margin: "0px 0px 0px 0px",
                            padding: "0px",
                          }}
                        >
                          {Object.keys(tourData).length > 0 && tourData.caption}
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top">
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr style={{ background: bgColor }}>
                            <td
                              width="59%"
                              align="left"
                              valign="top"
                              bgcolor={bgColor}
                              style={{ padding: "10px" }}
                            >
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tr style={{ background: bgColor }}>
                                  <td width="50%" align="left" valign="top">
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="3"
                                      border="0"
                                      style={{
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                      }}
                                    >
                                      <tbody>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Bedrooms</b> :{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.totalbedrooms}
                                          </td>
                                        </tr>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Bathrooms</b> :{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.totalbathrooms}
                                          </td>
                                        </tr>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Garage</b> :{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.garagesize}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td width="50%" align="left" valign="top">
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="3"
                                      border="0"
                                      style={{
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                      }}
                                    >
                                      <tbody>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Year built</b> :{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.yearbuilt}
                                          </td>
                                        </tr>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Lot size</b>:{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.lotsize}{" "}
                                          </td>
                                        </tr>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Interior Sq. Ft</b>:{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.sqfootage}
                                          </td>
                                        </tr>
                                        <tr style={{ background: bgColor }}>
                                          <td valign="top" align="left">
                                            <b>Subdivision</b> :{" "}
                                            {Object.keys(tourData).length > 0 &&
                                              tourData.subdivision}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              width="1%"
                              height="210"
                              align="left"
                              valign="top"
                              bgcolor="#FFFFFF"
                            >
                              &nbsp;
                            </td>
                            <td
                              width="40%"
                              align="left"
                              valign="top"
                              bgcolor={bgColor}
                              style={{ padding: "10px" }}
                            >
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tr style={{ background: bgColor }}>
                                  <td align="center">
                                    {Object.keys(allData).length > 0 &&
                                      allData.getProperty
                                        ?.is_flyer_agent_photo == 1 && (
                                        <img
                                          src={allData.agentphoto}
                                          alt=""
                                          width="90"
                                          height="90"
                                          style={{ border: "2px solid #fff" }}
                                        />
                                      )}
                                    &nbsp;
                                    {Object.keys(allData).length > 0 &&
                                    allData.companylogo &&
                                    allData.getProperty
                                      ?.is_flyer_agent_company_photo == 1 ? (
                                      <img
                                        src={allData.companylogo}
                                        alt=""
                                        width="90"
                                        height="90"
                                        style={{ border: "2px solid #fff" }}
                                      />
                                    ) : (
                                      <img
                                        src={company_img}
                                        alt=""
                                        width="90"
                                        height="90"
                                        style={{ border: "2px solid #fff" }}
                                      />
                                    )}
                                  </td>
                                </tr>
                                <tr style={{ background: bgColor }}>
                                  <td height="10"></td>
                                </tr>
                                <tr style={{ background: bgColor }}>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{ color: "#FFFFFF" }}
                                  >
                                    <strong>
                                      {Object.keys(allData).length > 0 &&
                                        allData.agentname}
                                    </strong>
                                    <br />
                                    {Object.keys(allData).length > 0 &&
                                      allData.agentemail}
                                    <br />
                                    <strong>
                                      {Object.keys(allData).length > 0 &&
                                        allData.companyname}
                                    </strong>
                                    <br />
                                    Lic#{" "}
                                    {Object.keys(allData).length > 0 &&
                                      allData.licenceno}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td
            height="270"
            align="left"
            valign="top"
            bgcolor={bgColor2}
            style={{ padding: "10px" }}
          >
            <h6
              style={{
                color: allData.themeId == 1 ?"black":"white",
                fontSize: "16px",
                margin: "0px 0px 10px 0px",
                padding: "0px",
                textTransform: "uppercase",
              }}
            >
              DESCRIPTION
            </h6>

            <p style={{ margin: "0px", color: allData.themeId == 1 ?"black":"white", fontSize: "14px" }} dangerouslySetInnerHTML={{ __html:Object.keys(tourData).length > 0 &&
                          tourData.description }}>
             
            </p>
          </td>
        </tr>
        <tr>
          <td height="10"></td>
        </tr>
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor={bgColor2}
            style={{ padding: "10px", color: "#ffffff" }}
          >
            <p style={{ margin: "0px", color: allData.themeId == 1 ?"black":"white" }}>
              All information deemed reliable, but not guaranteed.
            </p>
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
}
