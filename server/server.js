require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./config/connectDB")
connectDB()
const app = express()

app.use(cors())
app.options("*", cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", require("./routes/AllRoutes"))

app.listen(process.env.PORT, () => {
    console.log("Server listening on port", process.env.PORT)
})