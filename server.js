const express = require('express')
const Users = require('./users/user-router')
const sessions = require('express-session')
const knexSession = require('connect-session-knex')(sessions)
const dbConfig = require('./data/db-config')
const server = express()


const sessionConfig = {
    name: 'Madison-M',
    secret: 'my ssn is 111*11*1111',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: false
    },
    resave: false,
    saveUnilitialized: true,
    store: new knexSession({
        knex: dbConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}



server.use(sessions(sessionConfig))
server.use(express.json())
server.use('/api', Users)




server.get('/', (req, res) => {
    res.status(200).json(console.log('WORKING'))
});



module.exports = server