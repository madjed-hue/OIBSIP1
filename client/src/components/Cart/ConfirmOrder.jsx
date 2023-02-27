import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Layout from "../layout/Layout";
import { useAlert } from "react-alert";
import { getAllCoupons } from "../../actions/couponsAction";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [couppon, setCouppon] = useState("");
  const [isEmptyCoupons, setIsEmptyCoupons] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const { deliveryInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * (item.price + item.saucePrice + item.cheesePrice),
    0
  );

  const { coupons, error } = useSelector((state) => state.coupons);

  // console.log(coupons);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    dispatch(getAllCoupons());
  }, [alert, dispatch, error]);

  const handleClick = () => {
    if (couppon === "") {
      setIsEmptyCoupons("Please, enter a valid Coupons!");
    }

    const validCoupons = coupons.find((coupon) => coupon.coupon === couppon);
    if (validCoupons) {
      setCouponValue(validCoupons.price);
    } else {
      setIsEmptyCoupons("Coupons is not valid!");
      setCouponValue("");
    }
  };

  // console.log(cartItems);
  const deliveryCharges = 0;

  const tax = subtotal * 0;

  const totalPrice = couponValue
    ? subtotal + tax + deliveryCharges - couponValue
    : subtotal + tax + deliveryCharges;

  const couponPrice = couponValue;

  const address = `${deliveryInfo.address}`;

  const handleCoupponChange = (e) => {
    setCouppon(e.target.value);
  };

  const proceedToPayment = () => {
    const data = {
      subtotal,
      deliveryCharges,
      tax,
      totalPrice,
      couponPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Layout>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Delivery Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{deliveryInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.pizza}>
                    <img src={item.image} alt="Pizza Type" />
                    <Link to={`/pizza/${item.pizza}`}>
                      {item.name}
                      {/* {` * (${item.quantity})`} */}
                    </Link>
                    <div className="sauce">
                      <span> {item.sauceName} </span>
                    </div>
                    <div className="sauce">
                      <span> {item.cheeseName} </span>
                    </div>
                    <span>
                      {item.quantity} X $
                      {item.price + item.saucePrice + item.cheesePrice} ={" "}
                      <b>
                        $
                        {(item.price + item.saucePrice + item.cheesePrice) *
                          item.quantity}
                      </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Delivery Charges:</p>
                <span>${deliveryCharges}</span>
              </div>
              {!couponValue && (
                <div className="coupon-code">
                  <p>Couppon:</p>
                  <input value={couppon} onChange={handleCoupponChange} />
                  <Button sx={{ color: "#fff" }} onClick={handleClick}>
                    apply
                  </Button>
                </div>
              )}
              {couponValue ? (
                <div className="coupon-value">
                  discount of : {couponValue}$
                  <p
                    className="remove-coupons"
                    onClick={() => setCouponValue("")}
                  >
                    remove
                  </p>
                </div>
              ) : (
                <div className="coupon-error"> {isEmptyCoupons} </div>
              )}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;
