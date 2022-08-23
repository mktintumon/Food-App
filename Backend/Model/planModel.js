const mongoose = require('mongoose');

let planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass the name"],
        unique: [true, "plan name should be unique"],
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: Number,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            // error
            message: "Discount must be less than actual price",
        },
    }
});

const FooduserModel = mongoose.model('FoodPlanModel', planSchema);
module.exports = FoodPlanModel;