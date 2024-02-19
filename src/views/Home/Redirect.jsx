import React, { useEffect } from "react";

function Redirect(props) {
  let tourid = props.match.params.tourid;
  useEffect(() => {
    window.location.href = `https://www.virtualtourcafe.com/tour/${tourid}`;
  }, []);
  return <></>;
}

export default Redirect;
