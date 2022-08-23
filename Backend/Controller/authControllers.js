const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const FoodUserModel = require("../Model/userModel");
const mailSender = require('../mailSender')

async function signupController(req, res) {
    // name-->password-->confirmpassword-->phonenumber-->email-->address
    try {
        let data = req.body;

        // to create a document inside userModel
        let newUser = await FoodUserModel.create(data);
        console.log(newUser);
        res.status(201).json({
            result: "User signed up successfully"
        })
    } catch (err) {
        res.status(400).json({
            result: err.message
        })
    }
}

async function loginController(req, res) {
    try {
        let data = req.body;
        let { email, password } = data;

        if (email && password) {
            let user = await FoodUserModel.findOne({ email: email });

            if (user) {
                if (user.password == password) {
                    // argument -> payload and secrets and algoritm (date->optional)
                    const token = jwt.sign({
                        data: user["_id"],
                        // expiry of 1 day
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    }, secrets.JWTSECRETS);

                    res.cookie("JWT", token);

                    delete user.password;
                    delete user.confirmPassword;

                    res.status(200).json({
                        user
                    })
                }
                else {
                    res.status(400).json({
                        result: "Wrong password. Login failed!"
                    })
                }
            }
            else {
                res.status(404).json({
                    result: "User not found",
                })
            }
        }
        else {
            res.status(400).json({
                result: "User not found . Kindly signUp!"
            })
        }
    } catch (err) {
        res.status(500).json({
            result: err.message,
        })
    }
}

async function forgetPasswordController(req, res) {
    try {
        let { email } = req.body;
        //    mail
        // by default -> FindAndUpdate -> not updated send document, 
        // new =true -> you will get updated doc
        // email -> do we have a user -> no user 
        // update
        let user = await FooduserModel.findOne({ email });
        if (user) {
            let otp = otpGenerator();
            let afterFiveMin = Date.now() + 5 * 60 * 1000;

            await mailSender(email, otp);

            user.otp = otp;
            user.otpExpiry = afterFiveMin;
            await user.save();
            
            res.status(204).json({
                data: user,
                result: "Otp send to your mail"
            })
        } else {
            res.status(404).json({
                result: "user with this email not found"
            })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function resetPasswordController(req, res) {
    try {
        let { otp, password, confirmPassword, email } = req.body;

        //search user on basis of otp -> if expiryTime is not there
        // if expiryTime is present then search user on basis of email
        let user = await FoodUserModel.findOne({ email });
        let currTime = Date.now();

        if (currTime > user.otpExpiry) {
            // delete key -> get user doc -> remove unwanted keys -> save to db
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();

            res.json({
                message: "Otp Expired"
            })
        }
        else {
            if (user.otp != otp) {
                res.json({
                    message: "Otp doesn't match"
                })
            }
            else {
                user = await FoodUserModel.findOneAndUpdate(
                    { otp, email },
                    { password, confirmPassword },
                    { runValidators: true, new: true });

                // delete key -> get user doc -> remove unwanted keys -> save to db
                user.otp = undefined;
                user.otpExpiry = undefined;
                await user.save();

                res.json({
                    data: user,
                    message: "Password for the user resets"
                })
            }
        }

        console.log(user);

    } catch (error) {
        res.end(error.message);
    }
}

function protectRoute(req, res, next) {
    // console.log(req.cookies);
    const cookies = req.cookies;
    const JWT = cookies.JWT;

    try {
        if (cookies.JWT) {
            console.log("ProtectRoute Encountered");

            //verify token
            let token = jwt.verify(JWT, secrets.JWTSECRETS);
            console.log("Encrypted token", token);
            let userId = token.data;
            console.log("userId", userId);
            req.userId = userId

            next();
        }
        else {
            console.log("Kindly login");
        }

    } catch (err) {
        console.log(err);

        if (err.message == "invalid signature") {
            res.end("Token invalid kindly login");
        } else {
            res.end(err.message);
        }
    }
}

/****************HELPER FUNCTION***************/
function otpGenerator() {
    // 6 digit otp
    return Math.floor(100000 + Math.random() * 900000)
}


module.exports = {
    signupController,
    loginController,
    resetPasswordController,
    forgetPasswordController,
    protectRoute
}

