const SchemaComposer = require('graphql-compose').SchemaComposer
const {userMutation, userQuery} = require('./user')
const {postMutation, postQuery} = require('./graph/post')


const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...userQuery,
    ...postQuery,
});


schemaComposer.Mutation.addFields({
    ...userMutation,
    ...postMutation
});


module.exports =  schemaComposer.buildSchema()