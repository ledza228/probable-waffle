const post = require('../models/post')

const count_on_page = 5;

module.exports =  {

    getAllPosts: async (page) => {
        if (page === undefined || page < 1){
            page = 1
        }
        let res = {
            data: await post.find().sort({createdAt: -1}).limit(count_on_page).skip(count_on_page * (page-1)),
            page: page,
            count: await post.count(),
            countOnPage: count_on_page,
        }
        res['totalPages'] = Math.ceil(res['count'] / res['countOnPage'])
        return res
    },

    getAllPostsFromUser: async (login) => {
          let res = {
              data: await post.find().where({author: login}).sort({createdAt: -1})
          }
          return res
    },

    createPost: async (body, file) => {
        if (body.title === undefined || body.title.trim() === ""){
            throw new Error('Название не может быть пустым')
        }
        if (body.text === undefined || body.text.trim() === ""){
            throw new Error('Текст не может быть пустым')
        }

        let new_post = {
            title: body.title,
            author: body.name,
            text: body.text,
            image: file?.path
        }
        await post.create(new_post);
    },

    deletePost: async (id, currentUser, res) => {
        let postForDelete = (await post.find().where({_id: id}))
        if (postForDelete.length === 0){
            res.status(404).json({status: 'There is no such post!'})
            return
        }
        postForDelete = postForDelete[0]

        if (currentUser.login !== postForDelete.author){
            res.status(401).json({status: 'You cannot do that!'})
            return
        }
        postForDelete.deleteOne({_id: id})
        res.json({status: 'OK'})
    },


}