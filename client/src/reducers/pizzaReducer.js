export const pizzaReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_PIZZA_REQUEST":
    case "GET_ALL_PIZZA_ADMIN_REQUEST":
      return {
        loading: true,
        pizzas: [],
      };
    case "GET_ALL_PIZZA_SUCCESS":
      return {
        loading: false,
        pizzas: action.payload.pizzas,
        pizzaCount: action.payload.pizzaCount,
        resultParPage: action.payload.resultParPage,
        filteredPizzaCount: action.payload.filteredPizzaCount,
      };
    case "GET_ALL_PIZZA_ADMIN_SUCCESS":
      return {
        loading: false,
        pizzas: action.payload,
      };
    case "GET_ALL_PIZZA_FAILURE":
    case "GET_ALL_PIZZA_ADMIN_FAILURE":
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

export const singlePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PIZZA_REQUEST":
    case "UPDATE_PIZZAT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_PIZZA_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "UPDATE_PIZZA_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case "DELETE_PIZZA_FAIL":
    case "UPDATE_PIZZA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_PIZZA_RESET":
      return {
        ...state,
        isDeleted: false,
      };
    case "UPDATE_PIZZA_RESET":
      return {
        ...state,
        isUpdated: false,
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

export const pizzaDetailsReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case "GET_PIZZA_DETAILS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PIZZA_DETAILS_SUCCESS":
      return {
        loading: false,
        pizza: action.payload,
      };
    case "GET_PIZZA_DETAILS_FAILURE":
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_REVIEW_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };
    case "NEW_REVIEW_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_REVIEW_RESET":
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

export const newPizzaReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case "NEW_PIZZA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_PIZZA_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        pizza: action.payload.pizza,
      };
    case "NEW_PIZZA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_PIZZA_RESET":
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

export const pizzaReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "ALL_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_REVIEW_SUCCESS":
      return {
        loading: false,
        reviews: action.payload,
      };
    case "ALL_REVIEW_FAIL":
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_REVIEW_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case "DELETE_REVIEW_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_REVIEW_RESET":
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
