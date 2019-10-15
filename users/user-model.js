const db = require('../data/db-config');

module.exports = {
    find,
    add,
    findBy,
    findById,
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(newer => {
            const [id] = newer;
            return findById(id);
        });
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}
