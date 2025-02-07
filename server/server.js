const express = require('express');
const app = express();
const dotenv =require('dotenv');
dotenv.config();
const mongoConnect = require('../server/db/connect');
mongoConnect();
const path = require('path');
const fs = require('fs')


//Routes
const userRouter = require('../server/Router/userRouter');
const authRouter = require('../server/Router/authRouter');
const adminRouter = require('../server/Router/adminRouter')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(userRouter);
app.use(authRouter);
app.use(adminRouter)

app.listen(process.env.PORT ,() =>{
    console.log(`Server Connection is Established at http://localhost:${process.env.PORT}`);
})