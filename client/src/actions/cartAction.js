import axios from "axios";

// Add to Cart
export const addItemsToCart =
  (pizzaId, quantity, price, sauceId, cheeseId) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/pizza/${pizzaId}`);
    const { data: sauceData } = await axios.get(`/api/v1/sauce/${sauceId}`);
    const { data: cheeseData } = await axios.get(`/api/v1/cheese/${cheeseId}`);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        pizza: data.pizza._id,
        name: data.pizza.name,
        price: price,
        image: data.pizza.image.url,
        stock: data.pizza.stock,
        quantity,
        sauce: sauceData.sauce._id,
        sauceName: sauceData.sauce.name,
        saucePrice: sauceData.sauce.price,
        sauceStock: sauceData.sauce.stock,

        cheese: cheeseData.cheese._id,
        cheeseName: cheeseData.cheese.name,
        cheesePrice: cheeseData.cheese.price,
        cheeseStock: cheeseData.cheese.stock,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveDeliveryInfo = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });

  localStorage.setItem("deliveryInfo", JSON.stringify(data));
};
