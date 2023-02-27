import axios from "axios";

//Get all Pizza for users
export const getAllCheese = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_CHEESE_REQUEST",
    });

    const { data } = await axios.get("/api/v1/cheeses");
    dispatch({
      type: "GET_ALL_CHEESE_SUCCESS",
      payload: data.cheeses,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_CHEESE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Update Cheese
export const updateCheese = (id, saucerData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CHEESE_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/cheese/${id}`,
      saucerData,
      config
    );
    dispatch({ type: "UPDATE_CHEESE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_CHEESE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Cheese
export const deleteCheese = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_CHEESE_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/cheese/${id}`);

    dispatch({ type: "DELETE_CHEESE_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DELETE_CHEESE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create Cheese
export const createCheese = (cheeseData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_CHEESE_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/cheese/new`,
      cheeseData,
      config
    );

    dispatch({
      type: "NEW_CHEESE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_CHEESE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Sauce details
export const getCheese = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CHEESE_DETAIL_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(`/api/v1/admin/cheese/${id}`, config);

    dispatch({
      type: "CHEESE_DETAIL_SUCCESS",
      payload: data.cheese,
    });
  } catch (error) {
    dispatch({
      type: "CHEESE_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};
