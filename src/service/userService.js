const userDB = require('../models/user')
const bcrypt = require('bcrypt')


module.exports = {

    addUser: async (user) => {
        user.login = user.login.trim()
        if (!user.login || user.login === ''){
            throw new Error('There is no login')
        }
        if (!user.password || user.password === ''){
            throw new Error('There is no password')
        }

        let res = await userDB.find({}).where({'login': user.login})
        console.log(res)
        if (res.length !== 0){
            throw new Error('Login is reserved!')
        }

        let newUser = {
            'login': user.login,
            'password': await bcrypt.hash(user.password, 3),
            'bio': '',
            'image': ''
        }
        await userDB.create(newUser)

        let publicUser = {
            'login': user.login,
        }

        return publicUser
    },


    getAllUsers: async function () {
        return userDB.find();
    },


    login: async function(user) {
        user.login = user.login.trim()

        let res = await userDB.find({}).where({'login': user.login})
        if (res.length === 0){
            throw new Error('Login/Password incorrect')
        }

        let match = await bcrypt.compare(user.password, res[0].password,)
        if (!match){
            throw new Error('Login/Password incorrect')
        }

        let publicUser = {
            'login': res[0].login
        }

        return publicUser
    },

    findByLogin: async (login) => {
        let res = await userDB.find({}).where({'login': login})
        if (res.length === 0){
            throw new Error("There is no such user!")
        }
        let publicUser = {
            'login': res[0].login,
            'bio': res[0].bio,
            'image': res[0].image
        }
        return publicUser
    },

    deleteByLogin: async (login, currentUser) => {
        if (currentUser.login !== login){
            throw new Error("You can't delete not yourself!")
        }
        await userDB.deleteOne({login: login})
    }
}