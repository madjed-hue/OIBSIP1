import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { CardBg } from "../../assets";

const PizzaCard = ({ pizza }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: pizza.ratings,
    isHalf: true,
  };
  return (
    <div className="pizzaCard">
      <div className="card_bg">
        <img src={CardBg} alt="" />
      </div>
      <div className="pizzaCard__wrapper">
        <img src={pizza.image.url} alt={pizza.name} />
        <p>{pizza.name} </p>
        <div>
          <ReactStars {...options} />{" "}
        </div>
        <span>
          {pizza.prices[0]}$ - {pizza.prices[2]}$
        </span>
        <div className="pizzaCard__actions-btn">
          <Link to={`/pizza/${pizza._id}`}>read more</Link>
          <Link to={pizza._id}>add to cart</Link>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
