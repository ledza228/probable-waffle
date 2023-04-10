const jwt = require('jsonwebtoken')


const secret_token = 'a20ccc68-b752-11ed-800f-a87eea81e863'


function resolveJWT(req, res, next){
    let token = req.cookies['token']

    if (!token){
        res.status(401).json({status: 'Not authenticated'})
    }

    jwt.verify(token, secret_token, (err, decoded)=>{
        if (err) {
            console.log(err)
            res.status(401).send('Token error!')
        }
        res.locals.user = decoded['data']
        next()
    })

}

/**
 * '' if no user, username otherwise
 */
function getUserByJWT(req){
    let token = req.cookies['token']
    if(!token)
        return ''

    jwt.verify(token, secret_token, (err, decoded)=>{
        if (err) {
            return ''
        }
        return decoded['data']
    })
}

function generateJWT(user){
    let token = jwt.sign({
        data: user
    }, secret_token, { expiresIn: '10m' })
    return token
}

module.exports = {
    resolveJWT: resolveJWT,
    generateJWT: generateJWT,
    getUserByJWT
}