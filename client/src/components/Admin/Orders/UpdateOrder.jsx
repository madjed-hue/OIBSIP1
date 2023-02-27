import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";
import "./UpdateOrder.css";
import { getOrderDetails, updateOrder } from "../../../actions/orderAction";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: "UPDATE_ORDER_RESET" });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, isUpdated, updateError, id]);
  return (
    <Fragment>
      <div className="dashboard">
        <div className="newPizzatContainer">
          <div
            className="confirmOrderPage"
            style={{
              display: order?.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <Typography>Delivery Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order?.user?.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order?.deliveryInfo?.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{`${order?.deliveryInfo?.address}`}</span>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Status : </p>
                    <p
                      className={
                        order?.paymentInfo?.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.paymentInfo?.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order?.totalPrice}$</span>
                  </div>
                  <div>
                    <p>Coupons :</p>
                    <span>{order?.couponPrice}$</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order &&
                    order?.orderItems?.map((item) => (
                      <div key={item.pizza}>
                        <div>
                          <img src={item.image} alt="Pizza" />
                          <Link to={`/pizza/${item.pizza}`}>
                            {item.name}
                          </Link>{" "}
                        </div>
                        <span>{item.sauceName}</span>
                        <span>{item.cheeseName}</span>
                        <span>
                          {item.quantity} X $
                          {item.price + item.saucePrice + item.cheesePrice} ={" "}
                          <b>
                            {(item.price + item.saucePrice + item.cheesePrice) *
                              item.quantity}
                            $
                          </b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display: order?.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order && order?.orderStatus === "Processing" && (
                      <option value="On the way">On the way</option>
                    )}

                    {order && order?.orderStatus === "On the way" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="updateOrderBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrder;
