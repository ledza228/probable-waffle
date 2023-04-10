const mongoose = require('mongoose');
const {composeMongoose} = require('graphql-compose-mongoose');
const {schemaComposer} = require('graphql-compose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    password: String,
    bio: String,
    image: String,
});

const User = mongoose.model('User', userSchema);

const customizationOptions = {}; // no customization options provided

const UserTC = composeMongoose(User, customizationOptions);

const userQuery = {
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
};

const userMutation = {
    userCreateOne: UserTC.getResolver('createOne'),
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany'),
};

// module.exports = graphqlSchema;

export {userQuery, userMutation}
