import React, { useEffect, useState } from "react";
import company_img from "../../../../../images/company.png";

export default function FlyerTheme7(props) {
  const { tourData, allData, link } = props;
  const [bgColor, setBgColor] = useState("#198b72");
  const [bgColor2, setBgColor2] = useState("#4e4644");
  useEffect(() => {
    if (allData.themeId == 5) {
      setBgColor("#022a72");
      setBgColor2("#474947");
    } else if (allData.themeId == 6) {
      setBgColor("#b40111");
      setBgColor2("#abacb0");
    } else if (allData.themeId == 7) {
      setBgColor("#e71e3a");
      setBgColor2("#14327f");
    } else if (allData.themeId == 4) {
      setBgColor("#eb9200");
      setBgColor2("#1f190f");
    } else if (allData.themeId == 257) {
      setBgColor("#000000");
      setBgColor2("#aeaeae");
    } else if (allData.themeId == 258) {
      setBgColor("#000000");
      setBgColor2("#989898");
    } else if (allData.themeId == 130) {
      setBgColor("#344a72");
      setBgColor2("#343734");
    } else if (allData.themeId == 141) {
      setBgColor("#031833");
      setBgColor2("#e22430");
    } else if (allData.themeId == 237) {
      setBgColor("#883d75");
      setBgColor2("#939393");
    } else if (allData.themeId == 84) {
      setBgColor("#3f8d36");
      setBgColor2("#3c403b");
    } else if (allData.themeId == 75) {
      setBgColor("#b6824a");
      setBgColor2("#797a7c");
    } else if (allData.themeId == 3) {
      setBgColor("#025962");
      setBgColor2("#9c0034");
    } else if (allData.themeId == 145) {
      setBgColor("#da142e");
      setBgColor2("#242b24");
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
          maxWidth: "816px",
          color: "#606060",
          fontSize: "14px",
        }}
        className="customFont"
      >
        <tr>
          <td height="100%" align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="left" valign="top">
                  {Object.keys(allData).length > 0 && (
                    <img
                      src={allData.image_url[0]}
                      alt=""
                      width="100%"
                      height="380"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td
                  height="40"
                  align="center"
                  valign="middle"
                  bgcolor={bgColor}
                >
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
                      href={`/tour/${link}`}
                      style={{
                        margin: "5px 0px 5px 0px",
                        fontSize: "14px",
                        wordBreak: "break-all",
                        color: "white",
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`https://virtualtourcafe.com/tour/${link}`}
                    </a>
                  )}
                </td>
              </tr>
              <tr>
                <td height="10" align="left" valign="top"></td>
              </tr>
              <tr>
                <td align="left" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td width="55%" align="left" valign="top">
                        {Object.keys(allData).length > 0 && (
                          <img
                            src={allData.image_url[1]}
                            alt=""
                            width="440"
                            height="365"
                          />
                        )}
                      </td>
                      <td
                        width="45%"
                        align="left"
                        valign="top"
                        bgcolor={bgColor}
                      >
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr style={{ background: bgColor }}>
                            <td
                              height="250"
                              align="center"
                              valign="middle"
                              bgcolor={bgColor2}
                              style={{ padding: "15px" }}
                            >
                              <h1
                                style={{
                                  color: "#fff",
                                  fontSize: "32px",
                                  margin: "0px 0px 20px 0px",
                                  padding: "0px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {Object.keys(tourData).length > 0 &&
                                  tourData.caption}
                              </h1>
                            </td>
                          </tr>
                          <tr style={{ background: bgColor }}>
                            <td
                              height="50"
                              align="center"
                              valign="bottom"
                              style={{ padding: "5px" }}
                            >
                              <h6
                                style={{
                                  color: "#fff",
                                  fontSize: "16px",
                                  margin: "0px",
                                  padding: "0px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {" "}
                                {Object.keys(tourData).length > 0 &&
                                  tourData.address +
                                    " , " +
                                    tourData.city +
                                    " , " +
                                    tourData.state +
                                    " , " +
                                    tourData.zipcode}
                              </h6>{" "}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="10" align="left" valign="top"></td>
              </tr>
              <tr>
                <td
                  height="130"
                  align="left"
                  valign="top"
                  bgcolor={bgColor}
                  style={{ padding: "15px" }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style={{ color: "#FFFFFF" }}
                  >
                    <tr style={{ background: bgColor }}>
                      <td
                        colspan="2"
                        align="left"
                        valign="top"
                        style={{ paddingBottom: "10px" }}
                      >
                        <h6
                          style={{
                            fontSize: "20px",
                            margin: "0px",
                            padding: "0px",
                            textTransform: "uppercase",
                            color: "white",
                          }}
                        >
                          FEATURES
                        </h6>
                      </td>
                    </tr>
                    <tr style={{ background: bgColor }}>
                      <td width="50%" align="left" valign="top">
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="3"
                          border="0"
                        >
                          <tbody>
                            <tr style={{ background: bgColor }}>
                              <td valign="top" align="left">
                                <b>Bedrooms</b>:{" "}
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
                        >
                          <tbody>
                            <tr style={{ background: bgColor }}>
                              <td valign="top" align="left">
                                <b>Year built</b>:{" "}
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
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="10" align="left" valign="top"></td>
              </tr>
              <tr>
                <td
                  height="27"
                  align="left"
                  valign="middle"
                  bgcolor={bgColor2}
                  style={{ padding: "15px" }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr style={{ background: bgColor2 }}>
                      <td
                        width="50%"
                        align="left"
                        valign="middle"
                        style={{ color: "#FFFFFF" }}
                      >
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
                            href={`/tour/${link}`}
                            style={{
                              margin: "5px 0px 5px 0px",
                              fontSize: "14px",
                              wordBreak: "break-all",
                              color: "white",
                            }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {`https://virtualtourcafe.com/tour/${link}`}
                          </a>
                        )}
                      </td>
                      <td
                        width="50%"
                        align="right"
                        valign="middle"
                        style={{ color: "#FFFFFF" }}
                      >
                        All information deemed reliable, but not guaranteed.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="100%" align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="left" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td
                        width="49%"
                        align="left"
                        valign="middle"
                        bgcolor={bgColor}
                        style={{ borderBottom: "1px solid #fff" }}
                      >
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr style={{ background: bgColor }}>
                            <td
                              height="257"
                              valign="middle"
                              style={{ padding: "15px" }}
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
                                    <strong>
                                      {Object.keys(allData).length > 0 &&
                                        `Lic# ${allData.licenceno}`}
                                    </strong>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td
                        width="1%"
                        align="left"
                        valign="middle"
                        bgcolor="#FFFFFF"
                      >
                        &nbsp;
                      </td>
                      <td
                        width="50%"
                        align="left"
                        valign="middle"
                        bgcolor={bgColor}
                        style={{ borderBottom: "1px solid #fff" }}
                      >
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr style={{ background: bgColor }}>
                            <td style={{ padding: "15px" }}>
                              <table
                                width="80%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tr style={{ background: bgColor }}>
                                  <td align="center" valign="top">
                                    <h6
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      <b>Offered at</b> :
                                      {Object.keys(tourData).length > 0 &&
                                        tourData.price}
                                    </h6>
                                  </td>
                                </tr>
                                <tr style={{ background: bgColor }}>
                                  <td align="center" valign="top">
                                    <p
                                      style={{
                                        margin: "10px 0px 0px 0px",
                                        fontSize: "12px",
                                        color: "#FFFFFF",
                                      }}
                                    >
                                      Visit the virtual tour
                                    </p>
                                    <p
                                      style={{
                                        margin: "5px 0px 5px 0px",
                                        fontSize: "14px",
                                        wordBreak: "break-all",
                                        color: "#FFFFFF",
                                      }}
                                    >
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
                                          href={`/tour/${link}`}
                                          style={{
                                            margin: "5px 0px 5px 0px",
                                            fontSize: "14px",
                                            wordBreak: "break-all",
                                            color: "white",
                                          }}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {`https://virtualtourcafe.com/tour/${link}`}
                                        </a>
                                      )}
                                    </p>
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
                <td align="left" valign="top">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td
                        colspan="3"
                        align="left"
                        valign="top"
                        bgcolor="#FFFFFF"
                        height="10"
                      ></td>
                    </tr>
                    <tr>
                      <td
                        width="39%"
                        align="left"
                        valign="top"
                        bgcolor={bgColor}
                      >
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr style={{ background: bgColor }}>
                            <td
                              height="400"
                              align="left"
                              valign="top"
                              style={{ padding: "15px" }}
                            >
                              <p
                                style={{ fontSize: "14px", color: "white" }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    Object.keys(tourData).length > 0 &&
                                    tourData.description,
                                }}
                              ></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td
                        width="1%"
                        align="left"
                        valign="top"
                        bgcolor="#FFFFFF"
                      >
                        &nbsp;
                      </td>
                      <td width="60%" align="left" valign="top">
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
                                  src={allData.image_url[2]}
                                  alt=""
                                  width="490"
                                  height="280"
                                />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td height="10" align="left" valign="top"></td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              {Object.keys(allData).length > 0 && (
                                <img
                                  src={allData.image_url[3]}
                                  alt=""
                                  width="490"
                                  height="280"
                                />
                              )}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="10"></td>
              </tr>
              <tr>
                <td height="27" align="left" valign="middle" bgcolor="">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr style={{ background: bgColor2 }}>
                      <td
                        align="right"
                        valign="top"
                        style={{ color: "#FFFFFF", padding: "15px" }}
                      >
                        All information deemed reliable, but not guaranteed.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
}
