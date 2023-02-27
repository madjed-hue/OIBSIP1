import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/pizza/${item.pizza}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.pizza)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
