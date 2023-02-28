/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../Header/Header.jsx";
import LineChart from "../Charts/LineChart.jsx";
import BarChart from "../Charts/BarChart.jsx";
import StatBox from "../Charts/StatBox.jsx";
import {
  CheesePieChart,
  PizzaPieChart,
  SaucePieChart,
} from "../Charts/PieChart";
import Transactions from "../Transactions/Transactions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../../actions/userAction.js";
import { getAllCheese } from "../../../actions/cheeseAction.js";
import { getAllCoupons } from "../../../actions/couponsAction.js";
import { getAllOrders } from "../../../actions/orderAction.js";
import { getAdminPizza } from "../../../actions/pizzaAction.js";
import { getAllSauce } from "../../../actions/sauceAction.js";
import { TbCheese } from "react-icons/tb";
import { GiSaucepan } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";
import { FaPizzaSlice } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";
import { notificationContext } from "../../../pages/admin/Dashboard.jsx";

const MainDashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const smScreen = useMediaQuery("(min-width:600px)");
  const [allNotificationData, setAllNotificationData] = useState([]);

  const { setData } = useContext(notificationContext);

  const { cheeses, error: cheeseError } = useSelector((state) => state.cheeses);
  const { coupons, error: couponsError } = useSelector(
    (state) => state.coupons
  );
  const { orders, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { pizzas, error: pizzasError } = useSelector((state) => state.pizzas);
  const { sauces, error: sauceError } = useSelector((state) => state.sauces);
  const { users, error: usersError } = useSelector((state) => state.allUsers);

  useEffect(() => {
    const checkStock = (arr) => {
      arr?.forEach((el) => {
        if (el.stock < 8) {
          const notificationInfo = {
            id: el._id,
            name: el.name,
            stock: el.stock,
          };
          setAllNotificationData((prev) => [...prev, notificationInfo]);
        }
      });
    };
    checkStock(pizzas);
    checkStock(sauces);
    checkStock(cheeses);
    setData(allNotificationData);
  }, [pizzas, sauces, cheeses, setData]);

  useEffect(() => {
    if (cheeseError) {
      alert.error(cheeseError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (couponsError) {
      alert.error(couponsError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (ordersError) {
      alert.error(ordersError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (pizzasError) {
      alert.error(pizzasError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (sauceError) {
      alert.error(sauceError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (usersError) {
      alert.error(usersError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllUsers());
    dispatch(getAllCheese());
    dispatch(getAllCoupons());
    dispatch(getAllOrders());
    dispatch(getAdminPizza());
    dispatch(getAllSauce());
  }, [
    alert,
    dispatch,
    cheeseError,
    couponsError,
    ordersError,
    pizzasError,
    sauceError,
    usersError,
  ]);

  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              color: "#fff",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={users && users.length}
              subtitle="Users"
              icon={<BiGroup style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={pizzas && pizzas.length}
              subtitle="Pizzas"
              icon={<FaPizzaSlice style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={sauces && sauces.length}
              subtitle="Sauces"
              icon={<GiSaucepan style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={cheeses && cheeses.length}
              subtitle="Cheeses"
              icon={<TbCheese style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={coupons && coupons.length}
              subtitle="Coupons"
              icon={<RiCoupon2Line style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={2} xl={2}>
          <Box
            width="100%"
            backgroundColor="#f2f0f0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={orders && orders.length}
              subtitle="Orders"
              icon={<MdDeliveryDining style={{ color: "#70d8bd" }} size={24} />}
            />
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor="#f2f0f0">
              <Box
                mt="25px"
                p="15px 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h5" fontWeight="600" color="#141414">
                    Orders
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: "#4cceac" }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="350px">
                <LineChart isDashboard={false} />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor="#f2f0f0" p="20px">
              <Typography variant="h5" fontWeight="600" color="#000">
                Pizza Base Stock
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <PizzaPieChart />
                <Typography variant="h5" color="#4cceac" sx={{ mt: "15px" }}>
                  Pizza base Quantities Available
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor="#f2f0f0" p="20px">
              <Typography variant="h5" fontWeight="600" color="#000">
                Cheese Stock
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <CheesePieChart />
                <Typography variant="h5" color="#4cceac" sx={{ mt: "15px" }}>
                  Cheese Quantities Available
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Transactions />
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor="#f2f0f0" p="20px">
              <Typography variant="h5" fontWeight="600" color="#000">
                Sauce Stocks
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <SaucePieChart />
                <Typography variant="h5" color="#4cceac" sx={{ mt: "15px" }}>
                  Sauces Quantities Available
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor="#f2f0f0" sx={{ padding: "20px 0" }}>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "0 30px 10px 15px", color: "#141414" }}
              >
                Pizza Ratings
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={false} />
              </Box>
            </Box>
          </Grid>
          {/* <Grid xs={12}>
            <Box backgroundColor="#f2f0f0" padding="30px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
