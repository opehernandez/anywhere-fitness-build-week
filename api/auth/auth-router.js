const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { errHandler, checkUserFree, CheckPayload } = require('./middleware')
const createToken = require('./create-token');
const { BCRYPT_ROUNDS } = require('../../config');
const User = require('./users-model')

router.post('/register', CheckPayload, checkUserFree, (req, res, next) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  user.password = hash

  User.insert(user)
    .then(created => {
      res.status(201).json(created[0])
    })
    .catch(err => {
      next(err)
    })
});

router.post('/login', CheckPayload, (req, res, next) => {
  const {username, password} = req.body

    User.getByUsername(username)
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
