import { React, useEffect } from "react";

function Title(props) {
  const { title } = props;
  useEffect(() => {
    if (title) document.title = `Virtual Tour Cafe : ${title}`;
    else document.title = `Virtual Tour Cafe`;
  }, [title]);
  return <></>;
}

export default Title;
