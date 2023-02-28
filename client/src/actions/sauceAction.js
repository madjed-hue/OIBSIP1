import axios from "../Axios";

//Get all Sauces
export const getAllSauce = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_SAUCE_REQUEST",
    });

    const { data } = await axios.get("/api/v1/sauces");
    dispatch({
      type: "GET_ALL_SAUCE_SUCCESS",
      payload: data.sauces,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_SAUCE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Update sauce
export const updateSauce = (id, saucerData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_SAUCE_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/sauce/${id}`,
      saucerData,
      config
    );
    dispatch({ type: "UPDATE_SAUCE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_SAUCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Sauce
export const deleteSauce = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_SAUCE_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/sauce/${id}`);

    dispatch({ type: "DELETE_SAUCE_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DELETE_SAUCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create Sauce
export const createSauce = (sauceData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_SAUCE_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/sauce/new`,
      sauceData,
      config
    );

    console.log(data);

    dispatch({
      type: "NEW_SAUCE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_SAUCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Sauce details
export const getSauce = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SAUCE_DETAIL_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(`/api/v1/admin/sauce/${id}`, config);

    dispatch({
      type: "SAUCE_DETAIL_SUCCESS",
      payload: data.sauce,
    });
  } catch (error) {
    dispatch({
      type: "SAUCE_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};
