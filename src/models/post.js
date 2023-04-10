const {composeMongoose, composeWithMongoose} = require('graphql-compose-mongoose')
const {schemaComposer} = require('graphql-compose')

const mongoose = require('mongoose')
const {createPostMiddleware, deletePostMiddleware} = require("../middleware/graphMiddleware");
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

const FishPostTC = composeWithMongoose(FishPost)

const postQuery = {
    fishPostMany: FishPostTC.getResolver('findMany'),
};

const postMutation = {
    fishPostCreateOne: FishPostTC.getResolver('createOne', [createPostMiddleware]),
    fishPostRemoveById: FishPostTC.getResolver('removeById', [deletePostMiddleware])
}


module.exports = {
    postQuery, postMutation,
    post: FishPost
}