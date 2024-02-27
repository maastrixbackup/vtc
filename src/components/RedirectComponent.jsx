import React from "react";
import { useEffect } from "react";
import { APIPath } from "../CommonMethods/Fetch";

function RedirectComponent(props) {
  const tourid = props.match.params.tourid;
  useEffect(() => {
    window.location.href = "/tour/" + tourid;
  }, [tourid])
  return <></>;
}

export default RedirectComponent;
