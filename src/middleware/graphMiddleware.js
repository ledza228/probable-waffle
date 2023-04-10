const {resolveJWT, getUserByJWT} = require("./jwtMiddleware");
const FishPost = require("../models/db/post");


async function createPostMiddleware(resolve, source, args, context, info) {
    const user = getUserNameOrThrow(context.req)

    if (!args.record.title)
        throw new Error("No title")

    if (!args.record.text)
        throw new Error("No text")

    args.record.author = user

    return resolve(source, args, context, info);
}

async function deletePostMiddleware(resolve, source, args, context, info) {
    const user = getUserNameOrThrow(context.req)
    const postId = args._id
    const post = await FishPost.findOne().where({_id: postId})
    if (!post)
        throw new Error("Wrong id!")

    const postUser = post.author

    if(postUser !== user)
        throw new Error("You can't delete this post")


    return resolve(source, args, context, info);
}

function getUserNameOrThrow(req){

    const user = getUserByJWT(req).login

    if(!user)
        throw new Error("Not authenticated")
    return user
}


module.exports = {createPostMiddleware, deletePostMiddleware}