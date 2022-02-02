
const User = require('./users-model')

const checkUserFree = (req, res, next) => {
    const { username } = req.body
    if(req.admin) {
        User.getAdminByUsername(username)
            .then(admin => {
                if(admin.length === 0) {
                    next()
                }
                else {
                    const err = {status: 400, message: 'username taken'}
                    next(err)
                }
            })
    }
    else {
        User.getUserByUsername(username)
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
}

const checkIfAdmin = (req, res, next) => {
    const { admin, code } = req.body
    if(admin) {
        if(code === 909090) {
            req.admin = true
            next()
        }
        else {
            const err = {status: 402, message: `invalid instructor code`}
            next(err)
        }
    }
    else {
        req.admin = false
        next()
    }
    

}


const normalize = (data) => {
    return {email: data.email, username: data.username, password: data.password}
}


const CheckPayload = (req, res, next) => {
    const { email, username, password } = req.body
    if(!username || !password || !email) {
        const err = {status: 400, message: 'username, email and password are required'}
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
    CheckPayload,
    checkIfAdmin,
    normalize,
}