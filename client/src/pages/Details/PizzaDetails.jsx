import React, { Fragment, useEffect, useState } from "react";
import "./PizzaDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getPizzaDetails, newReview } from "../../actions/pizzaAction";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/layout/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import MetaData from "../../components/layout/MetaData";
import ReviewCard from "./ReviewCard";
import { PizzaSize } from "../../assets";
import { useAlert } from "react-alert";
import Cheese from "../../components/Cheese/Cheese";
import Sauce from "../../components/Sauce/Sauce";
import { addItemsToCart } from "../../actions/cartAction";

const PizzaDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, pizza } = useSelector((state) => state.pizza);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState(0);
  const [sauceId, setSauceId] = useState("");
  const [cheeseId, setCheeseId] = useState("");

  const increaseQuantity = () => {
    if (pizza.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(
      addItemsToCart(id, quantity, pizza.prices[price], sauceId, cheeseId)
    );
    alert.success("Pizza added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("pizzaId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: "NEW_REVIEW_RESET" });
    }
    dispatch(getPizzaDetails(id));
  }, [alert, dispatch, error, id, reviewError, success]);

  const options = {
    name: "simple-controlled",
    size: "large",
    value: pizza.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    <MetaData title={`${pizza.name} -- Pizzario`} />;
  }, [pizza.name]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Fragment>
            <div className="pizzaDetails">
              <div>
                <img
                  className="CarouselImage"
                  src={pizza?.image?.url}
                  alt={`${pizza?.name}`}
                />
              </div>
              <div className="rightSide">
                <div className="detailsBlock-1">
                  <h2>{pizza.name}</h2>
                  <p>pizza # {pizza._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    ({pizza.numberOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{pizza.prices && pizza.prices[price]}$</h1>
                  <h4>Choose Size</h4>
                  <div className="sizes">
                    <div>
                      <img
                        className="small"
                        src={PizzaSize}
                        alt="pizza-size"
                        onClick={() => setPrice(0)}
                      />
                      <span>small</span>
                    </div>
                    <div>
                      <img
                        className="medium"
                        src={PizzaSize}
                        alt="pizza-size"
                        onClick={() => setPrice(1)}
                      />
                      <span>meduim</span>
                    </div>
                    <div>
                      <img
                        className="large"
                        src={PizzaSize}
                        alt="pizza-size"
                        onClick={() => setPrice(2)}
                      />
                      <span>large</span>
                    </div>
                  </div>
                  <div className="cheese">
                    <h4>Select Cheese</h4>
                    <Cheese setCheeseId={setCheeseId} />
                  </div>
                  <div className="cheese">
                    <h4>Select Sauce</h4>
                    <Sauce setSauceId={setSauceId} />
                  </div>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={pizza.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b className={pizza.stock < 1 ? "redColor" : "greenColor"}>
                      {pizza.Stock < 1 ? "Not Available" : "Available"}
                    </b>
                  </p>
                </div>
                <div className="detailsBlock-4">
                  Description : <p>{pizza.description}</p>
                </div>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  name="simple-controlled"
                  onChange={(e) => setRating(Number(e.target.value))}
                  value={rating}
                  size="large"
                  sx={{ mb: "1vmax" }}
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="50"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={submitReviewToggle}
                  color="secondary"
                  className="cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={reviewSubmitHandler}
                  color="primary"
                  className="submit"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            {pizza?.reviews && pizza.reviews[0] ? (
              <div className="reviews">
                {pizza?.reviews &&
                  pizza?.reviews.map((review) => (
                    <ReviewCard key={review?._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Fragment>
        </Layout>
      )}
    </Fragment>
  );
};

export default PizzaDetails;
