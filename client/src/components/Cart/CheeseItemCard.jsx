import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CheeseItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <div>
        <Link to={`/pizza/${item.pizza}`}>{item.cheeseName}</Link>
        <span>{`Price: $${item.cheesePrice}`}</span>
      </div>
    </div>
  );
};

export default CheeseItemCard;
