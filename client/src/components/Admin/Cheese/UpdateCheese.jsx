import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import { getCheese, updateCheese } from "../../../actions/cheeseAction";

const UpdateCheese = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.singleCheese
  );
  const { cheese } = useSelector((state) => state.cheeseDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (cheese && cheese._id !== id) {
      dispatch(getCheese(id));
    } else {
      setName(cheese.name);
      setPrice(cheese.price);
      setStock(cheese.stock);
      setOldImage(cheese.image.url);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      alert.success("Cheese Updated Successfully");
      navigate("/admin/dashboard/cheeses");
      dispatch({ type: "UPDATE_CHEESE_RESET" });
    }
  }, [alert, cheese, dispatch, error, id, isUpdated, navigate]);

  const createcheeseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.append("image", image);
    dispatch(updateCheese(id, myForm));
  };

  const updatecheeseImagesChange = (e) => {
    setOldImage("");
    setImage("");
    setImagePreview("");
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
            onSubmit={createcheeseSubmitHandler}
          >
            <h1>Update Cheese</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="cheese Name"
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
                onChange={updatecheeseImagesChange}
                multiple
              />
            </div>
            {oldImage && (
              <div id="createPizzaFormImage">
                <img src={oldImage} alt="cheese Preview" />
              </div>
            )}

            {imagePreview && (
              <div id="createPizzaFormImage">
                <img src={imagePreview} alt="cheese Preview" />
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

export default UpdateCheese;
