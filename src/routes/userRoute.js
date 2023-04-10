const router = require('express').Router()
const jwt = require('../middleware/jwtMiddleware')
const service = require('../service/userService')

const postService = require('../service/postService')

/*
    POST {
        login: String,
        password: String
    }
    curl -X POST http://127.0.0.1:4000/api/user/register --data '{"login":"test","password":"test2"}' -H "Content-Type: application/json"
 */

router.post('/register', async (req, res) => {
    let newUserData = req.body
    console.log(newUserData)
    service.addUser(newUserData)
        .then(async (r) => {
            let refresh_token = await jwt.generateRefreshToken(r.login)
            res.cookie('token', jwt.generateJWT(r), {
                httpOnly: true,
            })
            res.json({'status': 'OK', refresh_token: refresh_token})
        })
        .catch((err) => {
            res.status(400).json({'status': err.message})
        })

})

router.post('/login', async (req, res) => {
    try {
        let publicUser = await service.login(req.body)
        let token = jwt.generateJWT(publicUser)
        let refresh_token = await jwt.generateRefreshToken(publicUser.login)

        res.cookie('token', token, {httpOnly: true})
        res.json({'status': 'Ok', refresh_token: refresh_token})
    } catch (e) {
        res.status(400).json({'status': e.message})
    }
})

router.post('/logout', async (req, res) => {
    res.cookie('token', '', {httpOnly: true})
    res.json({'status': 'Ok'})
})


router.get('/:login/posts', async (req, res) => {
    let username = req.params.login
    postService.getAllPostsFromUser(username)
        .then((r) => {
            res.json(r)
        })
        .catch((e) => {
            res.status(500).json({status: e.message})
        })
})

router.get('/all', async (req, res) => {
    res.send(await service.getAllUsers())
})


router.post('/verify', jwt.resolveJWT, (req, res) => {
    res.json(res.locals.user)
})

router.post('/refresh', async (req, res) => {
    await jwt.regenerateJwtWithRefreshToken(req, res)
})


router.get('/login/:login', (req, res) => {
    service.findByLogin(req.params.login)
        .then((r) => {
            res.json(r)
        })
        .catch((e) => {
            res.status(404).json({'status': e.message})
        })
})


router.delete('/:login', jwt.resolveJWT, (req, res) => {
    service.deleteByLogin(req.params.login, res.locals.user)
        .then(() => {
            res.json({'status': 'OK'})
        })
        .catch(e => res.status(403).json({'status': e}))
})

router.put('/login/:login', jwt.resolveJWT, (req, res) => {

})


module.exports = router