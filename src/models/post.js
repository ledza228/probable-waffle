const {composeMongoose, composeWithMongoose} = require('graphql-compose-mongoose')
const {schemaComposer} = require('graphql-compose')

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

const FishPostTC = composeWithMongoose(FishPost)

const postQuery = {
    fishPostById: FishPostTC.getResolver('findById'),
    fishPostByIds: FishPostTC.getResolver('findByIds'),
    fishPostOne: FishPostTC.getResolver('findOne'),
    fishPostMany: FishPostTC.getResolver('findMany', [authMiddleware]),
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

async function authMiddleware(resolve, source, args, context, info) {
    console.log("keks123")
    console.log(context.req.cookies)

    // console.log(FishPostTC.getResolvers())
    return resolve(source, args, context, info);
}

module.exports = {postQuery, postMutation}