const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')

module.exports = (req, res, next) => {
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
    console.log('main running')
    const tkn = req.headers.authorization
    if (!tkn) {
      console.log('running')
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

