import React, { Fragment, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminPizza } from "../../../actions/pizzaAction";
import { getAllCheese } from "../../../actions/cheeseAction";
import { getAllSauce } from "../../../actions/sauceAction";
import DashboardLoader from "../Loader/DashboardLoader";

export const SaucePieChart = ({ isDashboard = false }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error: sauceError,
    sauces,
  } = useSelector((state) => state.sauces);

  const saucePieData = [];

  const generateData = (oldArr, newArr) => {
    oldArr.forEach((el) => {
      const singleEl = {
        id: el.name,
        label: el.name,
        value: el.stock,
        color: `hsl(${el.stock * 2}, ${el.stock * 4}%, ${el.stock * 7}%)`,
      };
      return newArr.push(singleEl);
    });
  };

  generateData(sauces, saucePieData);

  useEffect(() => {
    if (sauceError) {
      alert.error(sauceError);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    dispatch(getAllSauce());
  }, [alert, dispatch, sauceError]);

  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "200px",
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", p: "0 20px" }}>
            <ResponsivePie
              data={saucePieData}
              theme={{
                tooltip: {
                  container: {
                    background: "#f2f0f0",
                    color: "#141414",
                  },
                },
                legends: {
                  text: {
                    fill: "#e0e0e0",
                  },
                },
              }}
              margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={1}
              arcLinkLabelsTextColor="#000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={2}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export const PizzaPieChart = ({ isDashboard }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error: pizzaError,
    pizzas,
  } = useSelector((state) => state.pizzas);

  const pizzaPieData = [];

  // useEffect(() => {
  const generateData = (oldArr, newArr) => {
    oldArr &&
      oldArr.forEach((el) => {
        const singleEl = {
          id: el.name,
          label: el.name,
          value: el.stock,
          color: `hsl(${el.stock * 2}, ${el.stock * 4}%, ${el.stock * 7}%)`,
        };
        return newArr.push(singleEl);
      });
  };

  generateData(pizzas, pizzaPieData);
  // }, []);

  useEffect(() => {
    if (pizzaError) {
      alert.error(pizzaError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAdminPizza());
  }, [alert, dispatch, pizzaError]);

  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "200px",
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", p: "0 20px" }}>
            <ResponsivePie
              data={pizzaPieData}
              theme={{
                tooltip: {
                  container: {
                    background: "#f2f0f0",
                    color: "#141414",
                  },
                },
              }}
              margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={1}
              arcLinkLabelsTextColor="#000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={2}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export const CheesePieChart = ({ isDashboard }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error: cheeseError,
    cheeses,
  } = useSelector((state) => state.cheeses);

  const cheesePieData = [];

  const generateData = (oldArr, newArr) => {
    oldArr.forEach((el) => {
      const singleEl = {
        id: el.name,
        label: el.name,
        value: el.stock,
        color: `hsl(${el.stock * 2}, ${el.stock * 4}%, ${el.stock * 7}%)`,
      };
      return newArr.push(singleEl);
    });
  };

  generateData(cheeses, cheesePieData);

  useEffect(() => {
    if (cheeseError) {
      alert.error(cheeseError);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    dispatch(getAllCheese());
  }, [alert, dispatch, cheeseError]);

  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "200px",
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", p: "0 20px" }}>
            <ResponsivePie
              data={cheesePieData}
              theme={{
                tooltip: {
                  container: {
                    background: "#f2f0f0",
                    color: "#141414",
                  },
                },
              }}
              margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={1}
              arcLinkLabelsTextColor="#000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={2}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
          </Box>
        </Box>
      )}
    </Fragment>
  );
};
