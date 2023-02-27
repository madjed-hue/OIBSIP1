import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";

import {
  cheeseDetailsReducer,
  cheeseReducer,
  newCheeseReducer,
  singleCheeseReducer,
} from "./reducers/cheeseReducer";
import {
  couponsDetailsReducer,
  couponsReducer,
  newCouponsReducer,
  singleCouponsReducer,
} from "./reducers/couponsReducer";
import {
  messageDetailsReducer,
  messageReducer,
  newMessageReducer,
  singleMessageReducer,
} from "./reducers/messageReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
import {
  newPizzaReducer,
  newReviewReducer,
  pizzaDetailsReducer,
  pizzaReducer,
  pizzaReviewsReducer,
  reviewReducer,
  singlePizzaReducer,
} from "./reducers/pizzaReducer";
import {
  newSauceReducer,
  sauceDetailsReducer,
  sauceReducer,
  singleSauceReducer,
} from "./reducers/sauceReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  loginRegisterReducer,
  profileReducer,
  resendVerificationReducer,
  userDetailsReducer,
  validateUserReducer,
} from "./reducers/userReducer";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    deliveryInfo: localStorage.getItem("deliveryInfo")
      ? JSON.parse(localStorage.getItem("deliveryInfo"))
      : {},
  },
};

const reducer = combineReducers({
  pizzas: pizzaReducer,
  singlePizza: singlePizzaReducer,
  pizza: pizzaDetailsReducer,
  newPizza: newPizzaReducer,
  user: loginRegisterReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  verify: resendVerificationReducer,
  validateUserEmail: validateUserReducer,
  cheeses: cheeseReducer,
  singleCheese: singleCheeseReducer,
  newCheese: newCheeseReducer,
  cheeseDetails: cheeseDetailsReducer,

  messages: messageReducer,
  singleMessage: singleMessageReducer,
  newMessage: newMessageReducer,
  messageDetails: messageDetailsReducer,

  coupons: couponsReducer,
  singleCoupons: singleCouponsReducer,
  newCoupons: newCouponsReducer,
  couponsDetails: couponsDetailsReducer,

  sauces: sauceReducer,
  singleSauce: singleSauceReducer,
  suceDetails: sauceDetailsReducer,
  newSauce: newSauceReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  pizzaReviews: pizzaReviewsReducer,
  review: reviewReducer,
});

const middlewear = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewear))
);
export default store;
