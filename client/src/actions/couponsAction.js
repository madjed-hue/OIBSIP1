import axios from "../Axios";

//Get all COUPONSs
export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_COUPONS_REQUEST",
    });

    const { data } = await axios.get("/api/v1/coupons");
    dispatch({
      type: "GET_ALL_COUPONS_SUCCESS",
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_COUPONS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Update COUPONS
export const updateCoupons = (id, couponsData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_COUPONS_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/coupons/${id}`,
      couponsData,
      config
    );
    dispatch({ type: "UPDATE_COUPONS_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_COUPONS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete COUPONS
export const deleteCoupons = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_COUPONS_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/coupons/${id}`);

    dispatch({ type: "DELETE_COUPONS_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DELETE_COUPONS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create COUPONS
export const createCoupons = (couponsData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_COUPONS_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/coupons/new`,
      couponsData,
      config
    );

    dispatch({
      type: "NEW_COUPONS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_COUPONS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// COUPONS details
export const getCoupons = (id) => async (dispatch) => {
  try {
    dispatch({ type: "COUPONS_DETAIL_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(`/api/v1/admin/coupons/${id}`, config);

    dispatch({
      type: "COUPONS_DETAIL_SUCCESS",
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: "COUPONS_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};
