export const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_MESSAGES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_MESSAGES_SUCCESS":
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };

    case "GET_ALL_MESSAGES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const singleMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_MESSAGE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_MESSAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case "DELETE_MESSAGE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_MESSAGE_RESET":
      return {
        ...state,
        isDeleted: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case "NEW_MESSAGE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "NEW_MESSAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case "NEW_MESSAGE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "NEW_MESSAGE_RESET":
      return {
        ...state,
        success: false,
        message: null,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const messageDetailsReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case "MESSAGE_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "MESSAGE_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case "MESSAGE_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
