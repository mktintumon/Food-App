const express = require('express');
const app = express();

// npm install cookie-parser
const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const planRouter = require('./Routes/planRoutes')

app.use(express.json());
app.use(cookieParser())

// async behaviour

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);

app.listen(3000, function () {
    console.log("server started at port 3000");
})
