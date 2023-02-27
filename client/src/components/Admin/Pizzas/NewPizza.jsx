import React, { Fragment, useEffect, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { createPizza } from "../../../actions/pizzaAction";
import Loader from "../../layout/Loader";

const NewPizza = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newPizza);

  const [name, setName] = useState("");
  const [prices, setPrices] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const catedNumPrices = prices.map((pr) => {
    return parseInt(pr);
  });

  const createPizzaSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("prices", catedNumPrices);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    myForm.append("image", image);
    dispatch(createPizza(myForm));
  };

  const createPizzaImagesChange = (e) => {
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Pizza base Created Successfully");
      navigate("/admin/dashboard/pizzas");
      dispatch({ type: "NEW_PIZZA_RESET" });
    }
  }, [dispatch, alert, error, navigate, success]);

  const categories = [
    "cheese",
    "Kids",
    "light",
    "meat",
    "Piquant",
    "Sea Food",
    "viggie",
  ];

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="newPizzaContainer">
            <form
              className="createPizzaForm"
              encType="multipart/form-data"
              onSubmit={createPizzaSubmitHandler}
            >
              <h1>Create Pizza</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Pizza Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Small"
                  required
                  onChange={(e) => changePrice(e, 0)}
                  className="price-input"
                />
                <input
                  type="number"
                  placeholder="Medium"
                  required
                  onChange={(e) => changePrice(e, 1)}
                  className="price-input"
                />
                <input
                  type="number"
                  placeholder="Large"
                  required
                  onChange={(e) => changePrice(e, 2)}
                  className="price-input"
                />
              </div>
              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Pizza Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
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
                  onChange={createPizzaImagesChange}
                  multiple
                />
              </div>
              <div id="createPizzaFormImage">
                {imagePreview && <img src={imagePreview} alt="Pizza Preview" />}
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
      )}
    </Fragment>
  );
};

export default NewPizza;
