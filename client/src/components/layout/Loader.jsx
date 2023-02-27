import React from "react";
import LoaderGif from "../../assets/Untitled design.gif";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-container">
        <img src={LoaderGif} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
