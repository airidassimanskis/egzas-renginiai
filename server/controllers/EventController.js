const Event = require("../models/EventModel")
const asyncHandler = require("express-async-handler")
const { db } = require("../config/connectDB")

const getAllEvents = asyncHandler(async (req, res) => {
    const event = await Event.find()
    res.status(200).json(event)
})

const createEvent = asyncHandler(async (req, res) => {
    const {
        user_id_body,
        title_body,
        description_body,
        address_body,
        postal_code_body,
        price_body,
        images_body
    } = req.body

    if (!user_id_body || !title_body || !description_body || !address_body
        || !postal_code_body || !price_body || !images_body) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const event = await Event.create({
        user_id: user_id_body,
        title: title_body,
        description: description_body,
        address: address_body,
        postal_code: postal_code_body,
        price: price_body,
        status: "pending",
        images: images_body
    })
    res.status(201).json(event)
})

const approveEvent = asyncHandler(async (req, res) => {
    const { eventid } = req.body
    const updatedEvent = await Event.findByIdAndUpdate(eventid, {status: "approved"})
    res.status(201).json(updatedEvent)
})

const deleteEvent = asyncHandler(async (req, res) => {
    const { eventid } = req.body
    const removedEvent = await Event.findByIdAndRemove(eventid)
    res.status(201).json(removedEvent)
})

// const updateAd = asyncHandler(async (req, res) => {
//     const ad = await Ad.findById(req.params.id)

//     if (!ad) {
//         res.status(400)
//         throw new Error("Ad not found")
//     }

//     // check for user
//     if (!req.user) {
//         res.status(401)
//         throw new Error("User not found")
//     }

//     // make sure the logged in user matches the goal user
//     if (ad.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error("User not authorized")
//     }

//     const updateAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     })
//     res.status(200).json(updateAd)
// })

// const deleteAd = asyncHandler(async (req, res) => {
//     const ad = await Ad.findById(req.params.id)

//     if (!ad) {
//         res.status(400)
//         throw new Error("Ad not found")
//     }

//     // check for user
//     if (!req.user) {
//         res.status(401)
//         throw new Error("User not found")
//     }

//     // make sure the logged in user matches the goal user
//     if (ad.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error("User not authorized")
//     }

//     await ad.remove()

//     res.status(200).json({ id: req.params.id })
// })

module.exports = {
    getAllEvents,
    createEvent,
    approveEvent,
    deleteEvent,
}