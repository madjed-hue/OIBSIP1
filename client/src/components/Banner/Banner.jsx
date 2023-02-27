import React from "react";
import "./Banner.css";
import { GiCheckMark } from "react-icons/gi";
import Natural from "../../assets/natural.png";
import PizzaScene from "../../Scene/PizzaScene";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__wrapper">
        <div className="natural">
          <img src={Natural} alt="natural logo" />
        </div>
        <div className="left-banner">
          <h1>
            Delivery to the <br /> doorstep
          </h1>
          <div className="checked-offers">
            <div className="single-check">
              <GiCheckMark />
              <p>Choose your ingredients</p>
            </div>
            <div className="single-check">
              <GiCheckMark />
              <p>Get free delivery 24/7</p>
            </div>
            <div className="single-check">
              <GiCheckMark />
              <p>Special gift coupons</p>
            </div>
          </div>
          <div className="banner__search-form">
            <form>
              <input type="text" name="search" placeholder="Search pizza..." />
              <input type="submit" value="search" />
            </form>
          </div>
        </div>
        <div className="right-banner">
          <PizzaScene />
        </div>
        <div className="scroll-btn">scroll</div>
      </div>
    </div>
  );
};

export default Banner;
