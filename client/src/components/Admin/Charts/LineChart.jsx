import React, { Fragment, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../actions/orderAction";
import { Box } from "@mui/material";
import DashboardLoader from "../Loader/DashboardLoader";

const LineChart = ({ isDashboard }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const data = [];

  if (orders && orders.length) {
    // this gives an object with dates as keys
    const groups = orders.reduce((groups, order) => {
      const date = order.paisAt.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order.totalPrice);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        ordersPrice: groups[date].reduce((partialSum, a) => partialSum + a, 0),
      };
    });

    groupArrays?.length &&
      groupArrays?.forEach((order) => {
        const orderInfo = {
          x: order.date,
          y: order.ordersPrice,
        };
        data.push(orderInfo);
      });
  }

  const lineData = [
    {
      id: "ALG",
      data: data,
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    dispatch(getAllOrders());
  }, [alert, error, dispatch]);

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
        <Box width="100%" height="100%" sx={isDashboard ? style : {}}>
          <ResponsiveLine
            data={lineData}
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
                  background: "#141414",
                  color: "#fff",
                },
              },
            }}
            colors={() => "tomato"}
            yFormat=" >-.2f"
            yScale={{
              type: "linear",
              min: "0",
              stacked: true,
              reverse: false,
            }}
            xScale={{ type: "point" }}
            enableGridY={false}
            margin={{ top: 15, right: 70, bottom: 50, left: 50 }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Orders",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickValues: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Prices",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default LineChart;
