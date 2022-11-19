const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/usersModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
// |                                                                                                    

// >> Register a User

exports.registerUser = catchAsyncError( async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "sample id",
            url: "sample url",
        }
    });
    sendToken(user, 200, res)
})

// >> Login User

exports.loginUser = catchAsyncError( async (req, res, next) => {
    const {email, password} = req.body;

    // ? To check if the user has given both password and email

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400)) 
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    console.log(isPasswordMatched);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user, 201, res)
    // ? TestingCode
})

// >> Logout User
exports.logout = catchAsyncError( async (req, res, next) => {
    res.cookie("token", null,{
        exprires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
// >> Forgot Password
exports.forgotPassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found", 404))
    }

    // ? Get Reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIF you have not requested this email then please ignore it.`;

    try{
        // ? Original Code
        // await sendEmail({
        //     email: user.email, 
        //     subject: "Ecommerce Reset password",
        //     message,
        // })
        // ? Testing Code
        res.status(200).json({
            success: true,
            message: message
        })
    }
    catch(err){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(err.message, 500))
    }
})

// >> Reset Password
exports.resetPassword = catchAsyncError( async (req, res, next) => {
    // ? Creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or expired", 400))
    }
    
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)
})