const express = require('express')
const router = express.Router()
const { errHandler, validateSearch, checkNotEnrolled, checkClassNotFull, checkClassExists, validateBody, checkHasAuthority } = require('./middleware')
const Class = require('./model')

router.get('/', (req, res, next) => {
    Class.getAll()
        .then(classes => {
            res.json(classes)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkClassExists, (req, res, next) => {
    res.json(req.class[0])
})

router.get('/search', validateSearch, (req, res, next) => {
    const { normalizedKeys } = req
    Class.getByfilter(normalizedKeys)
        .then(classes => {
            res.json(classes)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/:id/enroll', checkNotEnrolled, checkClassNotFull, (req, res, next) => {
    const {user_id} = req.body
    Class.enroll(req.params.id, user_id)
        .then(userRegistered => {
            res.status(201).json(userRegistered)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', checkHasAuthority, validateBody, (req, res, next) => {
    Class.create(req.body.payload)
        .then(classes => {
            res.status(201).json(classes[0])
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', checkHasAuthority, checkClassExists, (req, res, next) => {
    const { id } = req.params
    Class.remove(id)
        .then(classDeleted => {
            res.json({message: `class with id: ${ id } succesfully deleted`})
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', checkHasAuthority, validateBody, checkClassExists, (req, res, next) => {
    const { id } = req.params
    Class.update(id, req.body.payload)
        .then(classId => {
            res.json({message: `Class with id: ${classId} succesfully updated`})
        })
})

router.use(errHandler)


module.exports = router