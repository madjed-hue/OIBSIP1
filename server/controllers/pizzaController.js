import ErrorHundeler from "../utils/errorHundeler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Pizza from "../models/pizzaModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

// Create Pizza -- Admin
export const createPizza = catchAsyncError(async (req, res, next) => {
  let prices = [];

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "pizza/pizzas",
  });

  const photo = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  if (typeof req.body.prices === "string") {
    req.body.prices.split(",").map((pr) => {
      return prices.push(parseInt(pr));
    });
  } else {
    prices = req.body.prices;
  }

  req.body.prices = prices;
  req.body.image = photo;
  req.body.user = req.user.id;

  const pizza = await Pizza.create(req.body);
  res.status(201).json({
    success: true,
    pizza,
  });
});

//Get All Pizza
export const getAllPizza = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const pizzaCount = await Pizza.countDocuments();
  const apiFeature = new ApiFeatures(Pizza.find(), req.query)
    .searchByName()
    .filter();
  apiFeature.pagination(resultPerPage);
  let pizzas = await apiFeature.query;
  let filteredPizzaCount = pizzas.length;
  res.status(200).json({
    success: true,
    pizzas,
    pizzaCount,
    resultPerPage,
    filteredPizzaCount,
  });
});

// Get All Pizza (Admin)
export const getAdminPizza = catchAsyncError(async (req, res, next) => {
  const pizzas = await Pizza.find();
  res.status(200).json({
    success: true,
    pizzas,
  });
});

//Get Pizza Details
export const getPizzaDetails = catchAsyncError(async (req, res, next) => {
  let pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new ErrorHundeler("Pizza Not Found", 404));
  }
  res.status(200).json({
    success: true,
    pizza,
  });
});

// Update Pizza -- Admin
export const updatePizza = catchAsyncError(async (req, res, next) => {
  try {
    let pizza = await Pizza.findById(req.params.id);
    (pizza.name = req.body.name),
      (pizza.description = req.body.description),
      (pizza.stock = req.body.stock),
      (pizza.category = req.body.category);

    if (pizza.image !== "") {
      const imageId = pizza.image.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "pizza/pizzas",
      });
      pizza.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    let prices = [];
    if (typeof req.body.prices === "string") {
      req.body.prices.split(",").map((pr) => {
        return prices.push(parseInt(pr));
      });
    } else {
      prices = req.body.prices;
    }

    pizza.prices = prices;

    await pizza.save();

    res.status(200).json({
      success: true,
      message: "pizza Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete Pizza -- Admin
export const deletePizza = catchAsyncError(async (req, res, next) => {
  let pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new ErrorHundeler("Pizza Not Found", 404));
  }

  // Deleting Images From Cloudinary
  const imageId = pizza.image.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await pizza.remove();
  res.status(200).json({
    success: true,
    message: "Pizza base Deleted Successfully",
  });
});

// Create/Update review of a pizza
export const createPizzaReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, pizzaId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const pizza = await Pizza.findById(pizzaId);
  const isReviewd = await pizza.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewd) {
    pizza.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    pizza.reviews.push(review);
    pizza.numberOfReviews = pizza.reviews.length;
  }

  let avg = 0;

  pizza.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  pizza.ratings = avg / pizza.reviews.length;

  await pizza.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Reviews Of single pizza
export const getPizzaReviews = catchAsyncError(async (req, res, next) => {
  const pizza = await Pizza.findById(req.query.id);
  if (!pizza) {
    return next(new ErrorHundeler("Pizza Not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: pizza.reviews,
  });
});

//Delete Review Of single Pizza
export const deletePizzaReviews = catchAsyncError(async (req, res, next) => {
  const pizza = await Pizza.findById(req.query.pizzaId);
  if (!pizza) {
    return next(new ErrorHundeler("Pizza Not Found", 404));
  }
  const reviews = pizza.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numberOfReviews = reviews.length;

  await Pizza.findByIdAndUpdate(
    req.query.pizzaId,
    { reviews, ratings, numberOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review deleted successfully",
  });
});

//Update stock of Pizza base
export const updatePizzaStock = catchAsyncError(async (req, res, next) => {
  const pizza = await Pizza.findById(req.query.pizzaId);
  if (!pizza) {
    return next(new ErrorHundeler("Pizza Not Found", 404));
  }

  const stock = req.body.stock;

  await Pizza.findByIdAndUpdate(
    req.query.pizzaId,
    { stock },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Stock Updated successfully",
  });
});
