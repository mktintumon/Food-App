const express = require('express');
const app = express();

// npm install cookie-parser
const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const planRouter = require('./Routes/planRoutes');
const reviewModel = require('./Model/reviewModel')

app.use(express.json());
app.use(cookieParser())

// async behaviour

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);
app.post("/api/v1/review", async function(req, res){
    try {
        let reviewData = req.body;
        let review = await reviewModel.create(reviewData);

        res.status(201).json({
            review: review,
            result: "Review created successfully"
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message : error.message,
        })
    }
})

app.get("/api/v1/review", async function(req, res){
    try{
       let reviews = await reviewModel.find()
                     .populate({
                        path : "user",
                        select : "name pic"
                     })
                     .populate({
                        path : "plan",
                        select : "name price"
                     });

       res.status(200).json({
        reviews : reviews,
        result: "All reviews displayed successfully"
    })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message : error.message,
        })
    }
})


app.listen(3000, function () {
    console.log("server started at port 3000");
})
