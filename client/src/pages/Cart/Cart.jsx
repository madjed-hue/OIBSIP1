import React, { Fragment } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import Layout from "../../components/layout/Layout";
import CartItemCard from "../../components/Cart/CartItemCard";
import SauceItemCard from "../../components/Cart/SauceCard";
import CheeseItemCard from "../../components/Cart/CheeseItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock, price, sauceId, cheeseId) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, price, sauceId, cheeseId));
  };
  const decreaseQuantity = (id, quantity, price, sauceId, cheeseId) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, price, sauceId, cheeseId));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=delivery");
  };
  return (
    <Layout>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Pizza in Your Cart</Typography>
          <Link to="/pizzas">View Pizzas</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Pizza</p>
              <p>Sauce</p>
              <p>Cheese</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.pizza}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <SauceItemCard item={item} />
                  <CheeseItemCard item={item} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.pizza,
                          item.quantity,
                          item.price,
                          item.sauce,
                          item.cheese
                        )
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.pizza,
                          item.quantity,
                          item.stock,
                          item.price,
                          item.sauce,
                          item.cheese
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`$ ${
                    item.price * item.quantity +
                    item.saucePrice * item.quantity +
                    item.cheesePrice * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                  {`$${cartItems.reduce(
                    (accumilator, item) =>
                      accumilator +
                      (item.price * item.quantity +
                        item.saucePrice * item.quantity +
                        item.cheesePrice * item.quantity),
                    0
                  )}`}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default Cart;
