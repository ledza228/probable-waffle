const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fishPostSchema = new Schema({
    title: String,
    author: {
        type: String,
        default: "Anon"
    },
    text: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const FishPost = mongoose.model("FishPost", fishPostSchema)

module.exports = FishPost