import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import { getOrderDetails } from "../../actions/orderAction";
import Loader from "../../components/layout/Loader";
import Layout from "../../components/layout/Layout";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Delivery Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.deliveryInfo && order.deliveryInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.deliveryInfo && `${order.deliveryInfo.address}  `}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    Status :{" "}
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}$</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderItemsDetailsHeading">
                <span>Item</span>
                <span>sauce</span>
                <span>cheese</span>
                <span>total</span>
              </div>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Layout>
      )}
    </Fragment>
  );
};

export default OrderDetails;
