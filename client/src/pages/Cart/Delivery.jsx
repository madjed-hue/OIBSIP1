import React, { useState } from "react";
import "./Delivery.css";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { saveDeliveryInfo } from "../../actions/cartAction";
import CheckoutSteps from "../../components/Cart/CheckoutSteps";

const Delivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { deliveryInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(deliveryInfo.address);
  const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);

  const deliverySubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveDeliveryInfo({ address, phoneNo }));
    navigate("/order/confirm");
  };
  return (
    <Layout>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Delivery Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={deliverySubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <input type="submit" value="Continue" className="shippingBtn" />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Delivery;
