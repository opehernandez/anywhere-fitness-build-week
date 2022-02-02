const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')

module.exports = (req, res, next) => {
 
    const tkn = req.headers.authorization
    if (!tkn) {
      const err = { status: 401, message: 'token required' }
      next(err)
    } else {
      jwt.verify(tkn, JWT_SECRET, (err, decoded) => {
        if (err) {
          const err = { status: 401, message: 'token invalid' }
          next(err)
        } else {
          req.decodedJwt = decoded
          next()
        }
      })
    }
}

