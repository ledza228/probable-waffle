const { composeMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')

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

const FishPostTC = composeMongoose(FishPost)

const postQuery = {
    fishPostById: FishPostTC.getResolver('findById'),
    fishPostByIds: FishPostTC.getResolver('findByIds'),
    fishPostOne: FishPostTC.getResolver('findOne'),
    fishPostMany: FishPostTC.getResolver('findMany'),
    fishPostCount: FishPostTC.getResolver('count'),
};

const postMutation = {
    fishPostCreateOne: FishPostTC.getResolver('createOne'),
    fishPostCreateMany: FishPostTC.getResolver('createMany'),
    fishPostUpdateById: FishPostTC.getResolver('updateById'),
    fishPostUpdateOne: FishPostTC.getResolver('updateOne'),
    fishPostUpdateMany: FishPostTC.getResolver('updateMany'),
    fishPostRemoveById: FishPostTC.getResolver('removeById'),
    fishPostRemoveOne: FishPostTC.getResolver('removeOne'),
    fishPostRemoveMany: FishPostTC.getResolver('removeMany'),
};

// const graphqlSchema = schemaComposer.buildSchema()
//
// module.exports = graphqlSchema

export {postQuery, postMutation}