import React from "react";

function GetWindowWidth() {
  const [width, setWidth] = React.useState();

  function handleRezise() {
    setWidth({ width: window.innerWidth });
  }

  return <div className="GetWindowWidth"></div>;
}

export default GetWindowWidth;
