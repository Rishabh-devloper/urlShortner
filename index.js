const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path =  require('path')
const app = express();

const urlRoute = require("./route/url");
const staticRoute = require("./route/staticRoute")
const userRoute = require('./route/user')
const {restrictToLoggedInUserOnly} = require('./middleware/auth')

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
// Routes
app.use("/url", restrictToLoggedInUserOnly , urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);





app.listen(3000, () => console.log("server is running"));