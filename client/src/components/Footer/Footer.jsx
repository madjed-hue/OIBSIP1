import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FooterLogo } from "../../assets";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="logo__footer">
          <img src={FooterLogo} alt="logo" />
        </div>
        <div className="quick-links">
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/menu">menu</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>

            <li>
              <Link to="/login">Login </Link> /
              <Link to="/login"> register</Link>
            </li>
          </ul>
        </div>
        <div className="special">
          <p>
            The Pizzario crew first and foremost values an authentic, freshly
            baked slice of pizza perfection
          </p>
        </div>
        <div className="footer__social-links">
          <BsTwitter />
          <BsFacebook />
          <BsInstagram />
          <BsLinkedin />
        </div>
        <div className="created-by">
          <span>
            Made with <BiHeart />
          </span>
          <span> by beddiaf fateh</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
