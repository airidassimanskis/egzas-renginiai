const express = require("express")
const router = express.Router()
const {
    registerUser,
    loginUser,
    verifyUser,
    getUser,
    deleteUser,
    logOutUser,
} = require("../controllers/UserController")
const {
    getAllEvents,
    createEvent,
    approveEvent,
    deleteEvent,
} = require("../controllers/EventController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logOutUser)
router.post("/verify", verifyUser)
router.get("/profile", getUser)
router.get("/deleteuser", deleteUser)

router.post("/create", createEvent)

router.get("/events", getAllEvents)
router.post("/approveevent", approveEvent)
router.post("/deleteevent", deleteEvent)

module.exports = router