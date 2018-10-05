const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser')
const config = require("./config.json")
const http = require("http")

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname + "/view"))
app.set("view engine", "jade")

//route
const home = require("./route/home")
const productRoute = require("./route/product")
app.use("/", home)
productRoute(app)

const http_port = config.port || 8085
http.createServer(app).listen(http_port, () => {
    console.log(" running on port " + http_port)
})