const FoodUserModel = require("../Model/userModel");

async function profileController(req, res){
    try {
        const userId = req.userId;
        const user = await FoodUserModel.findById(userId);
        res.json({
            data: user,
            message: "Data of user sent"
        })

    } catch (error) {
        res.end(error.message);
    }
}

async function getAllUsersController(req, res){
    try {
        let users = await FoodUserModel.find();
        res.json(users);

    } catch (error) {
        res.end(error.message);
    }
}


module.exports = {
    profileController: profileController,
    getAllUsersController: getAllUsersController
}
