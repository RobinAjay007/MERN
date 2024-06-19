const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");



exports.getProducts = async (req, res, next) => {
  const resPerPage = 3;

  try {
    // Initialize APIFeatures with the query and request query string
    let apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    // Execute query for filtered products count
    const filteredProductsCount = await apiFeatures.query.clone().countDocuments();
    console.log('Filtered Products Count:', filteredProductsCount);

    // Execute query for total products count
    const totalProductsCount = await Product.countDocuments();
    console.log('Total Products Count:', totalProductsCount);

    // Execute pagination
    apiFeatures = apiFeatures.paginate(resPerPage);

    // Get products after pagination
    const products = await apiFeatures.query;
    console.log('Products:', products);

    // Determine the product count to be sent in the response
    const productsCount = filteredProductsCount !== totalProductsCount ? filteredProductsCount : totalProductsCount;

    res.status(200).json({
      success: true,
      count: productsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// create product---/api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  console.log(req.user._id);
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get single product -- /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user','name email');

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
});
// updateproduct -- /api/v1/product/update/:id

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
      // return res.status(404).json({
      //   success: false,
      //   message: "Product not found",
      // });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// deleteproduct -- /api/v1/product/delete/:id

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    product = await Product.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product Deleted!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//Create Review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  const product = await Product.findById(productId);

  //finding user already reviewed
  const isReviewed = product.reviews.find((review) => {
    return review.user == req.user.id;
  });
  if (isReviewed) {
    // updating review
    product.reviews.forEach((review) => {
      if (review.user == req.user.id) {
        //creating review
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //find the average  of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get Reviews
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

//delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  console.log(req.query.productId);
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(
      new ErrorHandler(`Product not found with id: ${req.query.productId}`, 404)
    );
  }

  //filtering the reviews which does not match the deleting review id
  const reviews = product.reviews.filter((review) => {
    console.log(review._id);
    return review._id.toString() !== req.query.id.toString();
  });

  // number of reviews
  const numOfReviews = reviews.length;

  // finding the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  product.ratings = isNaN(ratings) ? 0 : ratings;

  //save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });

  res.status(200).json({
    success: true,
  });
});
