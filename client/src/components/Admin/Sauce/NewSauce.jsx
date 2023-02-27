import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { createSauce } from "../../../actions/sauceAction";

const NewSauce = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newSauce);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Sauce Created Successfully");
      navigate("/admin/dashboard/sauces");
      dispatch({ type: "NEW_SAUCE_RESET" });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createSauceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("stock", stock);

    myForm.append("image", image);
    dispatch(createSauce(myForm));
  };

  const createSauceImagesChange = (e) => {
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
            <h1>Create Sauce</h1>
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
                onChange={(e) => setPrice(e.target.value)}
                className="price-input"
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Sauce Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createPizzaFormFile">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={createSauceImagesChange}
                multiple
              />
            </div>
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewSauce;
