import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const SauceItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <div>
        <Link to={`/pizza/${item.pizza}`}>{item.sauceName}</Link>
        <span>{`Price: $${item.saucePrice}`}</span>
      </div>
    </div>
  );
};

export default SauceItemCard;
