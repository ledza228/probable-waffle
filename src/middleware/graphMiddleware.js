const {resolveJWT, getUserByJWT} = require("./jwtMiddleware");
const FishPost = require("../models/db/post");


async function createPostMiddleware(resolve, source, args, context, info) {
    const user = getUserOrThrow(context.req)


    if (!args.title)
        throw new Error("No title")

    if (args.text)
        throw new Error("No text")

    args.author = user

    return resolve(source, args, context, info);
}

async function deletePostMiddleware(resolve, source, args, context, info) {
    const user = getUserOrThrow(context.req)
    const postId = args._id
    const post = await FishPost.findOne().where({_id: postId})
    if (!post)
        throw new Error("Wrong id!")

    const postUser = post.author

    if(postUser !== user)
        throw new Error("You can't delete this post")


    return resolve(source, args, context, info);
}

function getUserOrThrow(req){

    const user = getUserByJWT(req)

    if(!user)
        throw new Error("Not authenticated")
    return user
}


module.exports = {createPostMiddleware, deletePostMiddleware}