const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add a text"],
        },
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        address: {
            type: String,
            required: [true, "Please add a primary address"],
        },
        postal_code: {
            type: String,
            required: [true, "Please add a postal code"],
        },
        price: {
            type: String,
            required: [true, "Please add a price"],
        },
        status: {
            type: String,
        },
        images: {
            type: String,
            required: [true, "Please add an image"],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Event", eventSchema)