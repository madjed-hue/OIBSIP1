export const sauceReducer = (state = { sauces: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_SAUCE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_SAUCE_SUCCESS":
      return {
        ...state,
        loading: false,
        sauces: action.payload,
      };

    case "GET_ALL_SAUCE_FAILURE":
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

export const singleSauceReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SAUCE_REQUEST":
    case "DELETE_SAUCE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_SAUCE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "DELETE_SAUCE_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "UPDATE_SAUCE_FAIL":
    case "DELETE_SAUCE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_SAUCE_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_SAUCE_RESET":
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

export const newSauceReducer = (state = { sauce: {} }, action) => {
  switch (action.type) {
    case "NEW_SAUCE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_SAUCE_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        sauce: action.payload.sauce,
      };
    case "NEW_SAUCE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_SAUCE_RESET":
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

export const sauceDetailsReducer = (state = { sauce: {} }, action) => {
  switch (action.type) {
    case "SAUCE_DETAIL_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "SAUCE_DETAIL_SUCCESS":
      return {
        loading: false,
        sauce: action.payload,
      };
    case "SAUCE_DETAIL_FAIL":
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
