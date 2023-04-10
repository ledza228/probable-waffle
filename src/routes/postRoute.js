const router = require('express').Router()
const jwt = require('../middleware/jwtMiddleware')

const multer = require('multer')

const trueType = ['image/jpeg', 'image/x-png', 'image/png', 'image/gif']

const upload = multer({
    dest: './uploads/',
    fileSize: 1024 * 1024 * 10,
    fileFilter: (req,file,cb)=>{
        if (!trueType.includes(file.mimetype)){
            cb(new Error('Incorrect file type'))
        }

        cb(null, true)
    }}).single('file')



router.post('/file', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400)
            res.send(err.message)
            return;
        }
        res.json({'file': req?.file?.filename})
    })
})

module.exports = router;
