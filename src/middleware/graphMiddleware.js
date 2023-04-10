const {resolveJWT, getUserByJWT} = require("./jwtMiddleware");


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



    return resolve(source, args, context, info);
}

function getUserOrThrow(req){

    const user = getUserByJWT(req)

    if(!user)
        throw new Error("Not authenticated")
    return user
}


module.exports = {createPostMiddleware, deletePostMiddleware}