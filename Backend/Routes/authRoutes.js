const express = require('express');
const authRouter = express.Router();
const { signupController, loginController, resetPasswordController, forgetPasswordController }
    = require('../Controller/authControllers')

// SIGNUP
authRouter.post('/signup', signupController)

// LOGIN
authRouter.post('/login', loginController)

//FORGET PASSWORD
authRouter.patch('/forgetPassword', forgetPasswordController)

// RESET PASSWORD
authRouter.patch('/resetPassword', resetPasswordController)


module.exports = authRouter;