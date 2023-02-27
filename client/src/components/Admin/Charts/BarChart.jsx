import React, { Fragment, useEffect } from "react";
import { Box } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminPizza } from "../../../actions/pizzaAction";
import DashboardLoader from "../Loader/DashboardLoader";

const BarChart = ({ isDashboard }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const barData = [];
  const keys = [];
  const { loading, error, pizzas } = useSelector((state) => state.pizzas);

  pizzas &&
    pizzas.forEach((pizza) => {
      const singlePizza = {
        name: pizza.name,
        ratings: pizza.ratings,
        pizzaColor: "hsl(285, 70%, 50%)",
      };
      keys.push(pizza.name);
      barData.push(singlePizza);
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAdminPizza());
  }, [error, alert, dispatch]);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60vmax",
    height: "40vmax",
    margin: "4vmax auto",
  };

  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box
          m="20px"
          height={`${isDashboard ? "100vh" : "100%"}`}
          width={`${isDashboard ? "100vw" : "100%"}`}
          sx={isDashboard ? style : {}}
        >
          <ResponsiveBar
            data={barData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "#141414",
                  },
                },
                legend: {
                  text: {
                    fill: "#141414",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#141414",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "#141414",
                  },
                },
              },
              legends: {
                text: {
                  fill: "#141414",
                },
              },
              tooltip: {
                container: {
                  background: "#f2f0f0",
                  color: "#141414",
                },
              },
            }}
            keys={["ratings"]}
            indexBy="name"
            margin={{
              top: isDashboard ? 0 : 15,
              right: 30,
              bottom: isDashboard ? 70 : 50,
              left: 50,
            }}
            padding={0.4}
            valueScale={{ type: "linear" }}
            colors="#3182CE"
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "ratings",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            axisBottom={{
              tickRotation: -35,
              legend: "ratings",
              legendPosition: "middle",
              legendOffset: isDashboard ? 60 : -50,
            }}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default BarChart;
