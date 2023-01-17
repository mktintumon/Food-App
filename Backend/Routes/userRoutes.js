const express = require('express');
const userRouter = express.Router();
const {protectRoute} = require('../Controller/authControllers')

const { getAllUsersController, profileController }
    = require('../Controller/userControllers')

// Get All user information from database
userRouter.get('/', protectRoute, getAllUsersController)

// Get single user information from database -- profile details
userRouter.get('/profile', protectRoute, profileController)

module.exports = userRouter