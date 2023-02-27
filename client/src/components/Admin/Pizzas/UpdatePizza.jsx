import React, { Fragment, useEffect, useRef, useState } from "react";
import "../newPizza.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import { getPizzaDetails, updatePizza } from "../../../actions/pizzaAction";

const UpdatePizza = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const priceOne = useRef();
  const priceTwo = useRef();
  const priceThree = useRef();
  const concatPrices = [];

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.singlePizza);
  const { error, pizza } = useSelector((state) => state.pizza);

  const { id } = useParams();

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

  const updatePizzaSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);

    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.append("image", image);
    // dispatch(updatePizza(id, myForm))
    if (prices.length === 0) {
      concatPrices.push(
        priceOne.current.value,
        priceTwo.current.value,
        priceThree.current.value
      );

      myForm.set("prices", concatPrices);
    } else {
      myForm.set("prices", catedNumPrices);
    }
    dispatch(updatePizza(id, myForm));
  };

  const updatePizzaImagesChange = (e) => {
    if (e.target.name === "image") {
      setImage("");
      setImagePreview("");
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
    if (pizza && pizza._id !== id) {
      dispatch(getPizzaDetails(id));
    } else {
      setName(pizza.name);
      setDescription(pizza.description);
      priceOne.current.value = Number(pizza.prices[0]);
      priceTwo.current.value = Number(pizza.prices[1]);
      priceThree.current.value = Number(pizza.prices[2]);
      setCategory(pizza.category);
      setStock(pizza.stock);
      setImagePreview(pizza.image.url);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      alert.success("Pizza base Updated Successfully");
      navigate("/admin/dashboard/pizzas");
      dispatch({ type: "UPDATE_PIZZA_RESET" });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    updateError,
    navigate,
    id,
    pizza._id,
    pizza,
  ]);

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
      <div className="dashboard">
        <div className="newPizzaContainer">
          <form
            className="createPizzaForm"
            encType="multipart/form-data"
            onSubmit={updatePizzaSubmitHandler}
          >
            <h1>Update Pizza</h1>
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
                ref={priceOne}
              />
              <input
                type="number"
                placeholder="Medium"
                required
                onChange={(e) => changePrice(e, 1)}
                className="price-input"
                ref={priceTwo}
              />
              <input
                type="number"
                placeholder="Large"
                required
                onChange={(e) => changePrice(e, 2)}
                className="price-input"
                ref={priceThree}
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
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
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
                value={stock}
              />
            </div>
            <div id="createPizzaFormFile">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={updatePizzaImagesChange}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePizza;
