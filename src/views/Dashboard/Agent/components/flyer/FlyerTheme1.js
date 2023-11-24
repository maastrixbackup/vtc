import React, { useEffect, useState } from "react";

export default function FlyerTheme1(props) {
  const { tourData, allData, link } = props;
  const [bgColor, setBgColor] = useState("#bd1e1e");
  const [bgColor2, setBgColor2] = useState("#bd1e1e");
  useEffect(() => {
    if (allData.themeId == 5) {
      setBgColor("#032a75");
      setBgColor2("#00307f");
    } else if (allData.themeId == 6) {
      setBgColor("#bc0009");
      setBgColor2("#ababab");
    } else if (allData.themeId == 7) {
      setBgColor("#da2641");
      setBgColor2("#14317f");
    } else if (allData.themeId == 4) {
      setBgColor("#eb9200");
      setBgColor2("#231918");
    } else if (allData.themeId == 257) {
      setBgColor("#040404");
      setBgColor2("#000004");
    } else if (allData.themeId == 258) {
      setBgColor("#010101");
      setBgColor2("#9a9c9b");
    } else if (allData.themeId == 130) {
      setBgColor("#334c74");
      setBgColor2("#333736");
    } else if (allData.themeId == 141) {
      setBgColor("#051a35");
      setBgColor2("#df262c");
    } else if (allData.themeId == 237) {
      setBgColor("#8e3d78");
      setBgColor2("#909090");
    } else if (allData.themeId == 84) {
      setBgColor("#3f8a37");
      setBgColor2("#3c3c3c");
    } else if (allData.themeId == 75) {
      setBgColor("#ba864c");
      setBgColor2("#767877");
    } else if (allData.themeId == 3) {
      setBgColor("#015965");
      setBgColor2("#950131");
    } else if (allData.themeId == 145) {
      setBgColor("#e0112f");
      setBgColor2("#272727");
    }
  }, [allData]);
  return (
    <table
      className="flyer01-6 customFont"
      width="100%"
      border="0"
      align="center"
      cellpadding="0"
      cellspacing="0"
      style={{
        color: "#666666",
        fontSize: "14px",
        fontFamily: "Helvetica",
      }}
    >
      <tr>
        <td
          height="60"
          align="center"
          valign="middle"
          bgcolor={bgColor}
          style={{ padding: "5px" }}
        >
          <h1
            style={{
              color: "#fff",
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
        <td height="5" bgcolor="#fff"></td>
      </tr>
      <tr>
        <td height="30" align="center" valign="middle" bgcolor={bgColor2}>
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
                tourData.zipcode}
          </h6>
        </td>
      </tr>
      <tr>
        <td align="center" style={{ position: "relative" }}>
          {Object.keys(allData).length > 0 && (
            <img src={allData.image_url[0]} alt="" width="100%" height="250" />
          )}
        </td>
      </tr>
      <tr>
        <td height="100%" bgcolor="#fff"></td>
      </tr>
      <tr>
        <td style={{ padding: "8px 0px", background: "#eeeeee" }}>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr style={{ background: "#eeeeee" }}>
                    <td width="33%" align="center" valign="top">
                      {Object.keys(allData).length > 0 && (
                        <img
                          src={allData.image_url[1]}
                          alt=""
                          width="250"
                          height="210"
                        />
                      )}
                    </td>
                    <td width="33%" align="center" valign="top">
                      {Object.keys(allData).length > 0 && (
                        <img
                          src={allData.image_url[2]}
                          alt=""
                          width="250"
                          height="210"
                        />
                      )}
                    </td>
                    <td width="33%" align="center" valign="top">
                      {Object.keys(allData).length > 0 && (
                        <img
                          src={allData.image_url[3]}
                          alt=""
                          width="250"
                          height="210"
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
        <td bgcolor="#eeeeee" style={{ padding: "15px" }}>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td
                width="30%"
                align="left"
                valign="top"
                style={{ padding: "10px" }}
              >
                <table width="98%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" valign="top">
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top">
                      <table
                        width="100%"
                        border="0"
                        cellspacing="2"
                        cellpadding="2"
                        style={{ fontSize: "16px" }}
                      >
                        <tr style={{ fontSize: "20px" }}>
                          <td align="left" valign="middle">
                            <b> Offered At</b> :
                          </td>
                          <td width="33%" align="left" valign="middle">
                            $
                            {Object.keys(tourData).length > 0 && tourData.price}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style={{ fontSize: "20px" }}>
                            <b>Property</b>
                          </td>
                        </tr>
                        <tr>
                          <td width="67%" align="left" valign="middle">
                            <b>Bedrooms</b> :
                          </td>
                          <td width="33%" align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.totalbedrooms}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Bathroooms</b> :
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.totalbathrooms}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Garage size</b> :
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.garagesize}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Year Built</b> :
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.yearbuilt}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Lot size</b> :
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.lotsize}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Interior Sq. Ft</b> :
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.sqfootage}
                          </td>
                        </tr>
                        <tr>
                          <td align="left" valign="middle">
                            <b>Subdivision</b>:
                          </td>
                          <td align="left" valign="middle">
                            {Object.keys(tourData).length > 0 &&
                              tourData.subdivision}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
              <td
                width="70%"
                height="100%"
                align="left"
                valign="top"
                bgcolor="#fff"
                style={{ border: "1px solid #dddddd", padding: "10px" }}
              >
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="10"
                  cellspacing="0"
                >
                  <tr>
                    <td>
                      <p>
                        {Object.keys(tourData).length > 0 &&
                          tourData.description}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style={{ background: bgColor, padding: "10px" }}>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr style={{ background: bgColor }}>
              <td width="20%" height="100%" align="left" valign="middle">
                {Object.keys(allData).length > 0 &&
                  allData.getProperty?.is_flyer_agent_photo == 1 && (
                    <img
                      src={allData.agentphoto}
                      alt=""
                      width="90"
                      height="90"
                      style={{ objectFit: "cover" }}
                    />
                  )}
              </td>
              <td width="32%" align="left" valign="middle">
                <h6
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                    display: "block",
                    margin: "0 0",
                  }}
                >
                  <span
                    id="agentInfo"
                    className="font-weight-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {Object.keys(allData).length > 0 && allData.agentname}
                  </span>
                </h6>
                <span style={{ color: "#fff" }}>
                  {Object.keys(allData).length > 0 && allData.agentemail}
                </span>
                <h6
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                    display: "block",
                    margin: "0 0",
                  }}
                >
                  <span id="agentInfo" style={{ fontSize: "14px" }}>
                    Lic# {Object.keys(allData).length > 0 && allData.licenceno}
                  </span>
                </h6>
              </td>
              <td width="12%" align="left" valign="middle">
                {Object.keys(allData).length > 0 &&
                  allData.getProperty?.is_flyer_agent_company_photo == 1 && (
                    <img
                      src={allData.companylogo}
                      alt=""
                      width="90"
                      height="90"
                      style={{ objectFit: "cover" }}
                    />
                  )}
              </td>
              <td width="44%" align="right" valign="bottom">
                <h6
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                    display: "block",
                    margin: "0 0",
                  }}
                >
                  <span
                    id="agentInfo"
                    className="companyNameFlyer font-weight-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {Object.keys(allData).length > 0 && allData.companyname}
                  </span>
                </h6>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr style={{ background: bgColor }}>
                    <td align="right" valign="bottom">
                      {tourData.web_address ? (
                        <a
                          href={tourData.web_address}
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
                      <br />
                      <span style={{ color: "#fff" }}>
                        All information deemed reliable, but not guaranteed.
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}
