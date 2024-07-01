const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto')


exports.registerUser= catchAsyncError(async (req,res,next)=>{
   const{name,email, password} =req.body;

   let avatar;
   if(req.file){
    avatar= `${req.protocol}://${req.host}:4898/uploads/user/${req.file.originalname}`
   }
   const user= await User.create({
        name,
        email,
        password,
        avatar
    });

    // const token = user.getJwtToken()
    // console.log(token)
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token
    // })
    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}= req.body

    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400));
    }
    // find the user data
   const user=await User.findOne({email:email}).select('+password');

   if(!user){
    return next(new ErrorHandler('Invalid email or password',401))
   }

   if(!await user.isValidPassword(password)){
    return  next(new ErrorHandler('Invalid email or Password', 401))
   }
   sendToken(user, 201, res);
})

exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    .status(200)
    .json({
        success:true,
        message:"Loggedout"
    })
};

exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
   const user= await User.findOne({email:req.body.email});

   if(!user){
    return next(new ErrorHandler('User not found with this email',404));
   }
   const resetToken = user.getResetToken();
  await user.save({validateBeforeSave:false});
   
   // create reset url
   const resetUrl= `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

   const message = `Your password reset url is follow \n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`;

   try{
    sendEmail({
        
        email:user.email,
        subject:"Ajaycart Password Recovery",
        message
    })

    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email}`
    })
   }
   catch(error){
    user.resetPasswordToken= undefined;
    user.resetPasswordTokenExpire= undefined;
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500))

   }
})

exports.resetPassword = catchAsyncError(async(req,res,next)=>{
  const resetPasswordToken=  crypto.createHash('sha256').update( req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()
        }
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }

    user.password=req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordTokenExpire=undefined;
    await user.save({validateBeforeSave:false});

    sendToken(user,200,res);
})


//Get User Profile
exports.getUserProfile = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
});

//Change Password
exports.changePassword=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    if(!user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect',401));
    }
    

   // assigning new password

   user.password=req.body.password;
   await user.save();

   res.status(200).json({
    success:true,

   })
});

//update Profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
  let newUserData = {
    name:req.body.name,
    email:req.body.email
  }  
  let avatar;
  if(req.file){
   avatar= `${req.protocol}://${req.host}:4898/uploads/user/${req.file.originalname}`
   newUserData={...newUserData,avatar}
  }

  const user =await User.findByIdAndUpdate(req.user.id,newUserData,{new:true,runValidators:true});

  res.status(200).json({
    success:true,
    user
  })
});

// Admin : Get all Users
exports.getAllUsers=catchAsyncError(async (req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
});

//Admin: Get Specific User
exports.getSpecificUser=catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`),404)
    }
    res.status(200).json({
        success:true,
        user
    })
})

//Admin: update User
exports.updateUser=catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
      }  
    
      const user =await User.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true});
    
      res.status(200).json({
        success:true,
        user
      })
})

//Admin: Delete User
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`),404)
    }
    await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success:true
  })

})