export const cheeseReducer = (state = { cheeses: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_CHEESE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_CHEESE_SUCCESS":
      return {
        ...state,
        loading: false,
        cheeses: action.payload,
      };

    case "GET_ALL_CHEESE_FAILURE":
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

export const singleCheeseReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CHEESE_REQUEST":
    case "DELETE_CHEESE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_CHEESE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "DELETE_CHEESE_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "UPDATE_CHEESE_FAIL":
    case "DELETE_CHEESE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_CHEESE_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_CHEESE_RESET":
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

export const newCheeseReducer = (state = { cheese: {} }, action) => {
  switch (action.type) {
    case "NEW_CHEESE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_CHEESE_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        cheese: action.payload.cheese,
      };
    case "NEW_CHEESE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_CHEESE_RESET":
      return {
        ...state,
        success: false,
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

export const cheeseDetailsReducer = (state = { cheese: {} }, action) => {
  switch (action.type) {
    case "CHEESE_DETAIL_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "CHEESE_DETAIL_SUCCESS":
      return {
        loading: false,
        cheese: action.payload,
      };
    case "CHEESE_DETAIL_FAIL":
      return {
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
