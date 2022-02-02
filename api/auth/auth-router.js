const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { errHandler, checkUserFree, CheckPayload, checkIfAdmin, normalize } = require('./middleware')
const createToken = require('./create-token');
const { BCRYPT_ROUNDS } = require('../../config');
const User = require('./users-model')

router.post('/register', checkIfAdmin, CheckPayload, checkUserFree, (req, res, next) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  user.password = hash
  if(req.admin) {
    const normalized = normalize(user)
    User.insertAdmin(normalized)
      .then(adminCreated => {
        res.status(201).json(adminCreated[0])
      })
      .catch(err => {
        const errCauseArr = err.message.split(' ')
        const errCause = errCauseArr[errCauseArr.length - 1]
        if(errCause === 'users.email') {
          err = {status: 400, message: "email already in use"}
          next(err)
        }
        else {
          next(err)
        }
      })
  }
  else {
    const normalized = normalize(user)
    User.insertUser(normalized)
      .then(userCreated => {
        res.status(201).json(userCreated[0])
      })
      .catch(err => {
        const errCauseArr = err.message.split(' ')
        const errCause = errCauseArr[errCauseArr.length - 1]
        if(errCause === 'users.email') {
          err = {status: 400, message: "email already in use"}
          next(err)
        }
        else {
          next(err)
        }
      })
  }  
});

router.post('/login', CheckPayload, (req, res, next) => {
  const {username, password} = req.body

    User.getUserByUsername(username)
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user)
          res.status(200).json({ message: `Welcome back ${user.username}...`, token })
        } else {
          next({ status: 401, message: 'Invalid Credentials' })
        }
      })
      .catch(next)
});

router.use(errHandler)
module.exports = router;
