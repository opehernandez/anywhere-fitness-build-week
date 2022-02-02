
const User = require('./users-model')

const checkUserFree = (req, res, next) => {
    const { username } = req.body
    User.getByUsername(username)
        .then(user => {
            if(user.length === 0) {
                next()
            }
            else{
                const err = {status: 400, message: 'username taken'}
                next(err)
            }
        })
}

const CheckPayload = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        const err = {status: 400, message: 'username and password required'}
        next(err)
    }
    else if(username.trim().length < 3) {
        const err = {status: 400, message: 'username must be at least 3 characters'}
        next(err)
    }
    else{
        next()
    }
}

const errHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
}


module.exports = {
    errHandler,
    checkUserFree,
    CheckPayload
}