import { Box } from "@mui/material";
import React from "react";
import { CheesePieChart, PizzaPieChart, SaucePieChart } from "./PieChart";

const ComonPieChart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      <PizzaPieChart />
      <CheesePieChart />
      <SaucePieChart />
    </Box>
  );
};

export default ComonPieChart;
