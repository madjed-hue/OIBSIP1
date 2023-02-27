export const cartReducer = (
  state = { cartItems: [], deliveryInfo: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.pizza === item.pizza);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.pizza === isItemExist.pizza ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.pizza !== action.payload),
      };

    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        deliveryInfo: action.payload,
      };

    default:
      return state;
  }
};
