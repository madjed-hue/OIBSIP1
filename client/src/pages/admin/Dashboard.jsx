import React, { createContext, Fragment, useState } from "react";
import { useTheme } from "../../components/Admin/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../components/Admin/TopBar/Topbar";
import "./dashboard.css";
import { MyProSidebarProvider } from "../../components/Admin/Sidebar/SidebarContext";
import { Route, Routes } from "react-router-dom";
import {
  MainDashboard,
  Users,
  UpdateUser,
  PizzaList,
  CheeseList,
  SauceList,
  NewPizza,
  NewCheese,
  NewSauce,
  UpdatePizza,
  UpdateSauce,
  UpdateCheese,
  CouponsList,
  NewCoupons,
  UpdateCoupons,
  BarChart,
  LineChart,
  ComonPieChart,
  OrdersList,
  UpdateOrder,
  ReviewsList,
  MessageList,
} from "../../components/Admin";

export const notificationContext = createContext();

const Dashboard = () => {
  const [theme] = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const value = { id, open, anchorEl, data, setData };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
            <main style={{ background: "#fff" }}>
              <notificationContext.Provider value={value}>
                <Topbar handleClick={handleClick} data={data} />

                <Routes>
                  <Route path="/" exact element={<MainDashboard />} />
                  <Route path="/users" exact element={<Users />} />
                  <Route path="/users/:id" exact element={<UpdateUser />} />
                  <Route path="/pizzas" exact element={<PizzaList />} />
                  <Route path="/pizza/new" exact element={<NewPizza />} />
                  <Route path="/pizzas/:id" exact element={<UpdatePizza />} />
                  <Route path="/cheeses" exact element={<CheeseList />} />
                  <Route path="/cheese/new" exact element={<NewCheese />} />
                  <Route path="/cheese/:id" exact element={<UpdateCheese />} />
                  <Route path="/coupons" exact element={<CouponsList />} />
                  <Route path="/coupons/new" exact element={<NewCoupons />} />
                  <Route
                    path="/coupons/:id"
                    exact
                    element={<UpdateCoupons />}
                  />
                  <Route path="/sauces" exact element={<SauceList />} />
                  <Route path="/sauce/new" exact element={<NewSauce />} />
                  <Route path="/sauces/:id" exact element={<UpdateSauce />} />
                  <Route path="/orders" exact element={<OrdersList />} />
                  <Route path="/orders/:id" exact element={<UpdateOrder />} />
                  <Route path="/reviews" exact element={<ReviewsList />} />
                  <Route path="/messages" exact element={<MessageList />} />
                  <Route
                    path="/bar"
                    exact
                    element={<BarChart isDashboard={true} />}
                  />
                  <Route
                    path="/line"
                    exact
                    element={<LineChart isDashboard={true} />}
                  />
                  <Route
                    path="/pie"
                    exact
                    element={<ComonPieChart isDashboard={true} />}
                  />
                </Routes>
              </notificationContext.Provider>
            </main>
          </div>
        </MyProSidebarProvider>
      </Fragment>
    </ThemeProvider>
  );
};

export default Dashboard;
