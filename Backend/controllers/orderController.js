const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");

// Create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user:req.user.id
  });

  res.status(200).json({
    success:true,
    order
  })
});


//Get Single Order
exports.getSingleOrder= catchAsyncError(async (req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user', 'name email');
    console.log(order,"dcbdhcbdhbch")
    if(!order){
        return next(new ErrorHandler(`Order not found with this id   : ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        order
    })
})

//Get Loggedin User Orders
exports.myOrders= catchAsyncError(async (req,res,next)=>{
    const orders=await Order.find({user:req.user.id});
    res.status(200).json({
        success:true,
        orders
    })
})

//Admin: Get all Orders
exports.orders= catchAsyncError(async (req,res,next)=>{
    const orders=await Order.find();
    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//Admin: update order / order status
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(order.orderStatus =='Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400));
    }
     order.orderItems.forEach(async orderItem=>{
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus=req.body.orderStatus;
    order.deliveredAt= Date.now();
    await order.save();

    res.status(200).json({
        success:true
    })
})

async function updateStock(productId,quantity){
   const product= await Product.findById(productId)
   product.stock=product.stock-quantity;
   product.save({validateBeforeSave:false});
}

//Admin : Delete Order
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order not found with this id   : ${req.params.id}`,404));
    }
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true
    })
})