const express = require("express")
const sessions = require("express-session")
const cookieParser = require("cookie-parser")

const path = require("path")
const { dirname } = require("path")

const app = express()
const PORT = 4000


// setting the views folder
app.set("views", path.join(__dirname, "views"))

// serving public file
app.use(express.static(__dirname))

// parsing incoming data 
app.use(express.json())
app.use(express.urlencoded({"extended":true}))

// 24hrs from milliseconds
const oneDay = 1000 * 60 * 60 * 24

//session middleware
app.use(sessions({
    secret:"thisisasecret",
    saveUninitialized:"true",
    cookie: {maxAge:oneDay},
    resave:"false"
}))


// cookie parser middleware
app.use(cookieParser())

// username and password
const myusername = "fau"
const mypassword = "password"


// variable to save a session 
var session;

// serve the form, or logout link if the user is already logged in 
app.get("/", (req, res) => {
    session = req.session
    if(session.userId){
        res.send("Welcome User <a href='/logout'>click to logout</a>")
    } else {
        res.sendFile('views/index.html',{root:__dirname})
    }
})

// verify the credentials of the user. If valid, creates a session. If not, no session will be initialized, no cookie will be saved.
app.post("/user", (req, res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session = req.session
        session.userId = req.body.username
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>     <div><a href="/">go back</a></div>
        `);
    } else {
        res.send("Invalid username or password")
    }
})

// destroys the session once the user decides to log out :)
app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));