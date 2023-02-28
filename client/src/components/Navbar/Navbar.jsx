import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import Button from "@mui/material/Button";
import { FcMenu } from "react-icons/fc";
import { AiFillCaretLeft } from "react-icons/ai";
import { GrDeliver } from "react-icons/gr";
import {
  AiOutlineClose,
  AiFillCaretRight,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineMail,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "./Navbar.css";
import { NavLogo, NavLogo2 } from "../../assets";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapseSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { cartItems } = useSelector((state) => state.cart);

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`navbar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="navbar__wrapper">
        <div className="hide-show__icon" onClick={handleCollapseSideBar}>
          {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretLeft />}
        </div>
        <div className="navbar__logo">
          <img src={NavLogo} alt="logo pizza" />
        </div>

        <div className="navbar__navigations">
          <ul className="nav-list">
            <li>
              <Link to="/"> {isCollapsed ? <AiOutlineHome /> : "Home"} </Link>
            </li>
            <li>
              <Link to="/pizzas">
                {isCollapsed ? <AiOutlineMenu /> : "Menu"}
              </Link>
            </li>

            <li>
              <Link to="/contact">
                {isCollapsed ? <AiOutlineMail /> : "Contact"}
              </Link>
            </li>
            <li>
              <Link to="/login">
                {isCollapsed ? <AiOutlineLogin /> : "Login"}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="navCart">
                {isCollapsed ? <AiOutlineShoppingCart /> : "Cart"}
                {cartItems && (
                  <span
                    className={`${
                      isCollapsed ? "collapsedNumber" : "expandedNumber"
                    }`}
                  >
                    {isCollapsed
                      ? cartItems.length
                      : `${"(" + cartItems.length + ")"}`}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar__social">
          <div className="social__icons">
            <BsTwitter />
            <BsFacebook />
            <BsInstagram />
            <BsLinkedin />
          </div>
          <div className="order__button">
            {isCollapsed ? <GrDeliver /> : <Button>order online</Button>}
          </div>
        </div>
      </div>

      <div className="mobile__nav">
        <div className="navbar__logo_mobile">
          <img src={NavLogo2} alt="logo pizza" />
        </div>

        <div className="toggle-btn">
          <FcMenu
            onClick={() => {
              handleNavOpen();
            }}
          />
        </div>

        <div className={`navbar__navigations-mobile ${isOpen ? "open" : ""}`}>
          <AiOutlineClose
            onClick={() => {
              handleNavOpen();
            }}
          />
          <ul className="nav-list-mobile">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pizzas">Menu</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
