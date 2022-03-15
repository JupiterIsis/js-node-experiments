const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const path = require("path")
const { dirname } = require("path")

const app = express()
const PORT = 4000

// setting the views folder
app.set("views", path.join(__dirname, "views"))

// serving public file
app.use(express.static("public"))

// parsing incoming data 
app.use(express.json())
app.use(express.urlencoded({"extended":true}))

// 24hrs from milliseconds
const oneDay = 1000 * 60 * 60 * 24

//session middleware
app.use(session({
    secret:"thisisasecret",
    saveUninitialized:"true",
    cookie: {maxAge:oneDay},
    resave:"false"
}))


// cookie parser middleware
app.use(cookieParser())


