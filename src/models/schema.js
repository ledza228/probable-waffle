import {SchemaComposer} from 'graphql-compose';
import {userMutation, userQuery} from "./user";
import {postMutation, postQuery} from "./post";


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