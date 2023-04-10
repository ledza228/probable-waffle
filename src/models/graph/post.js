const {composeMongoose, composeWithMongoose} = require('graphql-compose-mongoose')
const {schemaComposer} = require('graphql-compose')
const FishPost = require("../db/post");
const {createPostMiddleware, deletePostMiddleware} = require("../../middleware/graphMiddleware");


const FishPostTC = composeWithMongoose(FishPost)

const postQuery = {
    fishPostMany: FishPostTC.getResolver('findMany'),
    fishPostCount: FishPostTC.getResolver('count'),
};

const postMutation = {
    fishPostCreateOne: FishPostTC.getResolver('createOne', [createPostMiddleware]),
    fishPostRemoveById: FishPostTC.getResolver('removeById', [deletePostMiddleware])
}


module.exports = {
    postQuery, postMutation,
    post: FishPost
}