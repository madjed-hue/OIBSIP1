import axios from "../Axios";

//Get all Pizza for users
export const getAllPizza =
  (keyword = "", currentPage = 1, category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GET_ALL_PIZZA_REQUEST",
      });
      let link = `/api/v1/pizza/all?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/pizza/all?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
      }
      // if (!keyword && !category && !currentPage && !ratings) {
      //   link = `/api/v1/pizza/all`;
      // }
      const { data } = await axios.get(link);
      console.log(data);
      dispatch({
        type: "GET_ALL_PIZZA_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_ALL_PIZZA_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

// Get All Pizzas For Admin
export const getAdminPizza = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_PIZZA_ADMIN_REQUEST" });

    const { data } = await axios.get("/api/v1/admin/pizzas");

    dispatch({
      type: "GET_ALL_PIZZA_ADMIN_SUCCESS",
      payload: data.pizzas,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_PIZZA_ADMIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};

//Get Pizza Details
export const getPizzaDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_PIZZA_DETAILS_REQUEST",
    });
    const { data } = await axios.get(`/api/v1/pizza/${id}`);
    dispatch({
      type: "GET_PIZZA_DETAILS_SUCCESS",
      payload: data.pizza,
    });
  } catch (error) {
    dispatch({
      type: "GET_PIZZA_DETAILS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: "NEW_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "NEW_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Update Pizza
export const updatePizza = (id, pizzaData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PIZZA_REQUEST" });

    const { data } = await axios({
      method: "PUT",
      url: `/api/v1/admin/pizza/${id}`,
      data: pizzaData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: "UPDATE_PIZZA_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PIZZA_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Pizza
export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PIZZA_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/pizza/${id}`);
    dispatch({
      type: "DELETE_PIZZA_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PIZZA_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create Pizza
export const createPizza = (pizzaData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PIZZA_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/pizza/new`,
      pizzaData,
      config
    );

    dispatch({
      type: "NEW_PIZZA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_PIZZA_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Pizza
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    dispatch({
      type: "ALL_REVIEW_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Pizza
export const deleteReviews = (reviewId, pizzaId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEW_REQUEST" });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&pizzaId=${pizzaId}`
    );

    dispatch({
      type: "DELETE_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};
