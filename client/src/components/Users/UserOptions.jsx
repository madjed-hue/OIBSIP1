import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "./UserOptions.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../../actions/userAction";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const options = [
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.verified) {
    options.push(
      {
        icon: (
          <ShoppingCartIcon
            style={{ color: cartItems.length > 0 ? "#ffbf00" : "#fff" }}
          />
        ),
        name: `Cart(${cartItems.length})`,
        func: cart,
      },
      { icon: <ListAltIcon />, name: "Orders", func: orders },
      { icon: <PersonIcon />, name: "Profile", func: account }
    );
  }

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="up"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user ? user?.avatar?.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 768 ? true : false}
            color="#fff"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
