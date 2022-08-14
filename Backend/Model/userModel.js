// USER MODEL

/*
**************** Tech knowledge ******************** 

(schema) -> set of features and rules a certain entity should follow

--> how to create a db ->  link share
-->connect to my app -> mongoose 

*/

const mongoose = require('mongoose');
let secret = require('../secrets')

mongoose
    .connect(secret.DB_LINK)
    .then(() => {
        console.log('DB connection established');
    })
    .catch((error) => {
        console.log('Error', error.message);
    })



// Creating SCHEMA---> only entries written will be added to your db AND nothing else will be added 
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    confirmPassword: {
        type: String,
        required: [true, "ConfirmPassword is required"],

        // custom validator
        validate: {
            validator: function () {
                // this referes to the current entry 
                return this.password == this.confirmPassword;
            },
            //error message
            message: "password miss-match"
        },
    },
    phoneNumber: {
        type: String,
        minLength: [10, "Less than 10"],
        maxLength: [10, "More than 10"],
    },
    pic: {
        type: String,
        default: 'mohit1.jpg',
    },
    otp : {
        type: String,
    },
    otpExpiry : {
        type : String,
    },
    address: {
        type: String,
    },
    days: {
        type: String,
        enum: ["Mon", "Tue", "Wed"]
    },
})


// model is similar to your collection 
// name of the collection, the set of rules this collection should follow
const FooduserModel = mongoose.model('FooduserModel', userSchema);
module.exports = FooduserModel;