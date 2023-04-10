const router = require('express').Router()
const service = require('../service/postService')
const jwt = require('../middleware/jwtMiddleware')

const multer = require('multer')

const trueType = ['image/jpeg', 'image/x-png', 'image/png', 'image/gif']

const upload = multer({
    dest: '../uploads/',
    fileSize: 1024 * 1024 * 10,
    fileFilter: (req,file,cb)=>{
        if (!trueType.includes(file.mimetype)){
            cb(new Error('Incorrect file type'))
        }

        cb(null, true)
    }}).single('file')


router.post('/api/add', jwt.resolveJWT ,(req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400)
            res.json({"error": err.message})
            return;
        }
        req.body.name = res.locals.user.login

        service.createPost(req.body, req.file)
            .then(()=>{ res.send("OK") })
            .catch((err) => {
                res.status(400)
                res.json({"status": err.message})
            })
    })
})


router.delete('/api/post/:id', jwt.resolveJWT,(req, res) => {
    let currentUser = res.locals.user
    service.deletePost(req.params.id, currentUser, res)
        .then(r => {})
        .catch()
})

module.exports = router;
