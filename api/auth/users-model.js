const db = require('../../data/dbConfig')

const getById = (id) => {
    return db('users')
        .where({ id })
}

const getByUsername = (username) => {
    return db('users')
        .where({ username })
}

const insert = (user) => {
    return db('users')
        .insert(user)
            .then(ids => {
                return getById(ids[0])
            })
}

module.exports = {
    getById,
    insert,
    getByUsername
}