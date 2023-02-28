import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import { RiCoupon2Line } from "react-icons/ri";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupons, updateCoupons } from "../../../actions/couponsAction";

const UpdateCoupons = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.singleCoupons
  );
  const { coupons } = useSelector((state) => state.couponsDetails);

  const [coupon, setCoupon] = useState("");
  const [price, setPrice] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (coupons && coupons._id !== id) {
      dispatch(getCoupons(id));
    } else {
      setCoupon(coupons.coupon);
      setPrice(coupons.price);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      alert.success("Coupons Updated Successfully");
      navigate("/admin/dashboard/coupons");
      dispatch({ type: "UPDATE_COUPONS_RESET" });
    }
  }, [alert, coupons, dispatch, error, id, isUpdated, navigate]);

  const updateCouponsSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("coupon", coupon);
    myForm.set("price", price);

    dispatch(updateCoupons(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <div className="newPizzaContainer">
          <form
            className="createPizzaForm"
            encType="multipart/form-data"
            onSubmit={updateCouponsSubmitHandler}
          >
            <h1>Update Coupons</h1>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="price-input"
              />
            </div>

            <Button
              id="createPizzaBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCoupons;
