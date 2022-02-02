const db = require('../../data/dbConfig')
const {  } = require('./middleware')

const getAll = () => {
    return db('classes')
}

const getByfilter = (filter) => {
    return db('classes')
        .where(filter)
    
}

const getUserClasses = (user_id) => {
    return db('users_classes')
        .where({ user_id })
}

const updateClassEnrolled = (class_id) => {
    return db('classes')
        .where({class_id})
            .then(classes => {
                const current = classes[0].users_registered
                return db('classes')
                    .where({class_id})
                    .update({users_registered : current + 1})
             })

}
const enroll = (class_id, user_id) => {
    return db('users_classes')
        .insert({class_id, user_id})
            .then(() => {
                return updateClassEnrolled(class_id)
            })
        
}

const create = (data) => {
    return db('classes')
        .insert(data)
            .then(id => {
                return getByfilter({class_id : id[0]})
            })
}

const remove = (class_id) => {
    return db('classes')
        .where({ class_id })
        .delete()
}

const update = (class_id, changes) => {
    return db('classes')
        .where({class_id})
        .update(changes)
}

module.exports = {
    getAll,
    getByfilter,
    enroll,
    getUserClasses,
    create,
    remove,
    update
}