const db = require('../../data/dbConfig')

const getUserById = (user_id) => {
    return db('users')
        .where({ user_id })
}

// const getAdminById = (inst_id) => {
//     return db('instructors')
//         .where({ inst_id })
// }

// const getUserByUsername = (username) => {
//     return db('users')
//         .where({ username })
// }

const getAdminByUsername = (username) => {
    return db('instructors')
        .where({ username })
}

const insertUser = (user) => {
    return db('users')
        .insert(user)
            .then(ids => {
                return getUserById(ids[0])
            })
}

const insertAdmin = (inst) => {
    return db('instructors')
        .insert(inst)
            .then(ids => {
                return getAdminById(ids[0])
            })
}

module.exports = {
    getUserById,
    insertUser,
    getUserByUsername,
    insertAdmin,
    getAdminByUsername,
    getAdminById
}