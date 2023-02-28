import axios from "../Axios";

//Get all Messages
export const getAllMessages = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_MESSAGES_REQUEST",
    });

    const { data } = await axios.get("/api/v1/admin/messages");
    dispatch({
      type: "GET_ALL_MESSAGES_SUCCESS",
      payload: data.messages,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_MESSAGES_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Delete Sauce
export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_MESSAGE_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/message/${id}`);

    dispatch({ type: "DELETE_MESSAGE_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DELETE_MESSAGE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create Sauce
export const createMessage = (messageData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_MESSAGE_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/message/new`,
      messageData,
      config
    );

    dispatch({
      type: "NEW_MESSAGE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "NEW_MESSAGE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Sauce details
export const getMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: "MESSAGE_DETAIL_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(`/api/v1/admin/message?id=${id}`, config);

    dispatch({
      type: "MESSAGE_DETAIL_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "MESSAGE_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};
