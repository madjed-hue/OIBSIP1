import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import { getSauce, updateSauce } from "../../../actions/sauceAction";

const UpdateSauce = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.singleSauce
  );
  const { sauce } = useSelector((state) => state.suceDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [oldImage, setOldImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (sauce && sauce._id !== id) {
      dispatch(getSauce(id));
    } else {
      setName(sauce.name);
      setPrice(sauce.price);
      setStock(sauce.stock);
      setOldImage(sauce.image);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      alert.success("Sauce Updated Successfully");
      navigate("/admin/dashboard/sauces");
      dispatch({ type: "UPDATE_SAUCE_RESET" });
    }
  }, [alert, dispatch, error, id, isUpdated, navigate, sauce]);

  const createSauceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.append("image", image);
    dispatch(updateSauce(id, myForm));
  };

  const updateSauceImagesChange = (e) => {
    setImage("");
    setImagePreview("");
    setOldImage("");
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div className="dashboard">
        <div className="newPizzaContainer">
          <form
            className="createPizzaForm"
            encType="multipart/form-data"
            onSubmit={createSauceSubmitHandler}
          >
            <h1>Update Sauce</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Sauce Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createPizzaFormFile">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={updateSauceImagesChange}
                multiple
              />
            </div>

            {oldImage && (
              <div id="createPizzaFormImage">
                <img src={oldImage.url} alt="Sauce Preview" />
              </div>
            )}

            {imagePreview && (
              <div id="createPizzaFormImage">
                <img src={imagePreview} alt="Sauce Preview" />
              </div>
            )}

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

export default UpdateSauce;
