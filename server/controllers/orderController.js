import Order from "../models/orderModel.js";
import Pizza from "../models/pizzaModel.js";
import Sauce from "../models/sauseModel.js";
import Cheese from "../models/cheeseModel.js";
import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

//create new order
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    deliveryInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    couponPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    deliveryInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    couponPrice,
    deliveryPrice,
    totalPrice,
    paisAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//Get Single Order
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHundeler("Order Not Found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user Orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all Orders --Admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update Order Status --Admin
export const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHundeler("Order Not Found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHundeler("you have already delivered this Order", 400)
    );
  }
  if (req.body.status === "On the way") {
    order.orderItems.forEach(async (ord) => {
      await updatePizzaStock(ord.pizza, ord.quantity);
      await updateSauceStock(ord.sauce, ord.quantity);
      await updateCheeseStock(ord.cheese, ord.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updatePizzaStock(id, quantity) {
  const pizza = await Pizza.findById(id);
  pizza.stock -= quantity;
  await pizza.save({ validateBeforeSave: false });
}

async function updateSauceStock(id, quantity) {
  const sauce = await Sauce.findById(id);
  sauce.stock -= quantity;
  await sauce.save();
}

async function updateCheeseStock(id, quantity) {
  const cheese = await Cheese.findById(id);
  cheese.stock -= quantity;
  await cheese.save();
}

//Delete Order --Admin
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHundeler("Order Not Found", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
