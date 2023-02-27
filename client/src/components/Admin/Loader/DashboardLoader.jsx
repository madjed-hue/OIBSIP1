import React from "react";
import { Triangle } from "react-loader-spinner";

const DashboardLoader = ({ isDashboard }) => {
  return (
    <div className="loader">
      <Triangle
        height={isDashboard ? "50px" : "100%"}
        width={isDashboard ? "50px" : "100%"}
        color="#70d8bd"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default DashboardLoader;
