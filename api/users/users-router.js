const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.json({message: 'reaching users router'})
})


module.exports = router