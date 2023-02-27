import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import StorageIcon from "@mui/icons-material/Storage";
import { RiCoupon2Line } from "react-icons/ri";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { createCoupons } from "../../../actions/couponsAction";

const NewCoupons = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCoupons);

  const [coupon, setCoupon] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Coupons Created Successfully");
      navigate("/admin/dashboard/coupons");
      dispatch({ type: "NEW_COUPONS_RESET" });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createCouponsSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("coupon", coupon);
    myForm.set("price", price);

    dispatch(createCoupons(myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <div className="newPizzaContainer">
          <form
            className="createPizzaForm"
            encType="multipart/form-data"
            onSubmit={createCouponsSubmitHandler}
          >
            <h1>Create Coupons</h1>
            <div>
              <RiCoupon2Line />
              <input
                type="text"
                placeholder="Coupons"
                required
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                className="price-input"
              />
            </div>

            <Button
              id="createPizzaBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCoupons;
