// const mongoose = require('mongoose');
// const {v4}= require('uuid');
// const validator = require('validator');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto')

// const userSchema = new mongoose.Schema({
//     _id:{
//         type:String,
//         default:v4
//     },
//     name:{
//         type:String,
//         required:[true, 'Please enter name'],
//     }, 
//     email:{
//         type:String,
//         required:[true, 'Please enter email'],
//         unique: true,
//         validate:[validator.isEmail, 'Please enter valid email']  // we can use npm validator
//     },
//     password:{
//         type:String,
//         required:[true, 'Please enter password'],
//         maxlength:[6, 'Password cannot exceed 6 characters'],
//         select: false
//     },
//     avatar:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         default:'user'
//     },
//     resetPasswordToken:{
//         type:String  
//     },
//     resetPasswordTokenExpire: Date,
// },{
//     timestamps: true
// });

// userSchema.pre('save', async function (next){
//     this.password = await bcrypt.hash(this.password,10);
// })

// userSchema.methods.getJwtToken = function () {
//    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE_TIME})
// }

// userSchema.methods.isValidPassword=async function(enteredPassword){
//     const compare=await bcrypt.compare(enteredPassword,this.password)
//    return compare
// }

// userSchema.methods.getResetToken= function(){
//     //generate token
//     const token=crypto.randomBytes(20).toString('hex');

//    //generate hash and set to resetPasswordToken
//    this.resetPasswordToken= crypto.createHash('sha256').update(token).digest('hex');

//    //set token expire time
//    this.resetPasswordTokenExpire = Date(Date.now()+ 30* 60* 1000);

//    return token
// }

// const User=mongoose.model('User', userSchema);

// module.exports= User;

const mongoose = require('mongoose');
const { v4} = require('uuid');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email']  // we can use npm validator
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
