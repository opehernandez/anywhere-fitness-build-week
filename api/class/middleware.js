const Class = require('./model')


const validateSearch = (req, res, next) => {
    const { filter } = req.body
    let normalizedKeys = {}
    const filterKeys = ['class_id', 'name', 'type', 'start_time', 'duration', 'int_level', 'inst_id']
    const keys = Object.keys(filter)
    
    filterKeys.forEach(filterKey => {
        keys.forEach(key => {
            if(filterKey === key) {
                normalizedKeys = {...normalizedKeys, [filterKey] : filter[key]}
            }
        })
    })
    req.normalizedKeys = normalizedKeys
    next()
}

const checkClassNotFull = (req, res, next) => {
    const classId = { class_id : req.params.id }
    Class.getByfilter(classId)
        .then(classes => {
            const { users_registered, max_class_size} = classes[0]
            if(users_registered === max_class_size) {
                const err = {status: 400, message: 'Class is full'}
                next(err)
            }
            else{
                next()
            }
        })
}

const checkNotEnrolled = (req, res, next) => {
    const { user_id } = req.body
    Class.getUserClasses(user_id)
        .then(classes => {
            if(classes.length !== 0) {
                classes.forEach(userClass => {
                    if(userClass.class_id == req.params.id) {
                        const err = {status: 400, message: 'User already registered in that class'}
                        next(err)
                    }
                })
                next()
            }
            else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

const checkClassExists = (req, res, next) => {
    const classId = { class_id : req.params.id }
    Class.getByfilter(classId)
        .then(classes => {
            if(classes.length === 0) {
                const err = {status: 404, message: 'class not found'}
                next(err)
            }
            req.class = classes
            next()
        })
}

const checkHasAuthority = (req, res, next) => {
    const {code, admin} = req.body
    if(!admin) {
        const err = {status: 402, message: 'you do no have permission to take that action'}
        next(err)
    }
    else {
        if(code !== 909090) {
            const err = {status: 402, message: 'invalid instructor code'}
            next(err)
        }
        else {
            next()
        }
    }
}

const errHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
}

const validateBody = (req, res, next) => {
    const { name, type, start_time, duration, int_level, location, max_class_size, inst_id } = req.body.payload
    if(!name || !type || !start_time || !duration || !int_level || ! location || !max_class_size || !inst_id) {
        const err = {status: 404, message: 'missing required info'}
        next(err)
    }
    else {
        next()
    }
}

module.exports = {
    validateSearch,
    errHandler,
    checkNotEnrolled,
    checkClassNotFull,
    checkClassExists,
    validateBody,
    checkHasAuthority
}