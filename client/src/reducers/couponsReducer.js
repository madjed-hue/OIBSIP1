export const couponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_COUPONS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_COUPONS_SUCCESS":
      return {
        ...state,
        loading: false,
        coupons: action.payload,
      };

    case "GET_ALL_COUPONS_FAILURE":
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

export const singleCouponsReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_COUPONS_REQUEST":
    case "UPDATE_COUPONS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_COUPONS_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "DELETE_COUPONS_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "UPDATE_COUPONS_FAIL":
    case "DELETE_COUPONS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_COUPONS_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_COUPONS_RESET":
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

export const newCouponsReducer = (state = { coupons: {} }, action) => {
  switch (action.type) {
    case "NEW_COUPONS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_COUPONS_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        coupons: action.payload.coupons,
      };
    case "NEW_COUPONS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_COUPONS_RESET":
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

export const couponsDetailsReducer = (state = { coupons: {} }, action) => {
  switch (action.type) {
    case "COUPONS_DETAIL_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "COUPONS_DETAIL_SUCCESS":
      return {
        loading: false,
        coupons: action.payload,
      };
    case "COUPONS_DETAIL_FAIL":
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
