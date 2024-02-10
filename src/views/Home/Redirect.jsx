import React, { useEffect } from "react";

function Redirect(props) {
  let tourid = props.match.params.tourid;
  useEffect(() => {
    window.location.href = `/tour/${tourid}`;
  }, []);
  return <></>;
}

export default Redirect;
