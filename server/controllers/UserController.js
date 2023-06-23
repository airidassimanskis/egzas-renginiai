require("dotenv").config()
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

let _id

const registerUser = asyncHandler(async (req, res) => {
    const {
        firstNameRegister,
        lastNameRegister,
        emailRegister,
        passwordRegister,
    } = req.body

    if (!firstNameRegister || !lastNameRegister || !emailRegister || !passwordRegister) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const userExists = await User.findOne({ emailRegister })
    if (userExists) {
        res.status(400)
        throw new Error("E-Mail already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPasswords = await bcrypt.hash(passwordRegister, salt)

    const user = await User.create({
        first_name: firstNameRegister,
        last_name: lastNameRegister,
        email: emailRegister,
        password: hashedPasswords,
        role: "user",
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("Invalid Email")
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
        })
        console.log("logged in")
    } else {
        res.status(400)
        throw new Error("Invalid Password")
    }
})

const verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.body
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        _id = decoded.id
    } catch (err) {
        console.log(err)
    }
})

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById({ _id })

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json("not found")
        }
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json("Internal server error")
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { userid } = req.body
    try {
        const deletedUser = await User.findByIdAndDelete(userid)
        if (deletedUser) {
            res.status(200).json(deleteUser)
        }
    }
    catch (error) {
        console.error("Error:", error)
        res.status(500).json("Internal server error")
    }
})

const logOutUser = asyncHandler(async (req, res) => {
    try {
        const logout = await db.logout()
        if (logout) {
            res.status(200).json(logout)
        }
    }
    catch (error) {
        console.error("Error:", error)
        res.status(500).json("Internal server error")
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "60d",
    })
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    getUser,
    deleteUser,
    logOutUser,
}
