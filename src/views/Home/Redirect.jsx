import React, { useEffect } from "react";

function Redirect(props) {
  let tourid = props.match.params.tourid;
  useEffect(() => {
    window.location.href = `https://virtualtourcafe.com/tour/${tourid}`;
  }, []);
  return <></>;
}

export default Redirect;
