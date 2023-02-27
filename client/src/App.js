import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import { ConfirmOrder, ProtectedRoute, UserOptions } from "./components";
import {
  Payment,
  Cart,
  Delivery,
  PizzaDetails,
  Home,
  Pizzas,
  ForgotPassword,
  LoginSignup,
  Profile,
  ResetPassword,
  UpdatedPassword,
  UpdateProfile,
  OrderSuccess,
  MyOrders,
  OrderDetails,
  Dashboard,
  Contact,
  VerifyUser,
  VerifiedUser,
} from "./pages";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Chatbot from "./components/ChatBot/Chatbot";

export const userContext = createContext();

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const value = user;

  async function getStripeApikey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  console.log(user);

  useEffect(() => {
    dispatch(loadUser());
    getStripeApikey();
  }, [dispatch]);
  return (
    <div className="app">
      <userContext.Provider value={value}>
        {isAuthenticated && <UserOptions user={user} />}
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<PizzaDetails />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/pizzas/:keyword" element={<Pizzas />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/password/forgot" exact element={<ForgotPassword />} />

          <Route
            path="/password/reset/:token"
            exact
            element={<ResetPassword />}
          />
          <Route path="/cart" exact element={<Cart />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/verify" exact element={<VerifyUser />} />
            <Route path="/verify/:token" exact element={<VerifiedUser />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route
              path="/password/update"
              exact
              element={<UpdatedPassword />}
            />
            <Route path="/login/delivery" exact element={<Delivery />} />
            <Route path="/order/confirm" exact element={<ConfirmOrder />} />
            {stripeApiKey && (
              <Route
                path="/process/payment"
                exact
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />

            <Route
              isAdmin={true}
              path="/admin/dashboard/*"
              element={<Dashboard />}
            />
          </Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
