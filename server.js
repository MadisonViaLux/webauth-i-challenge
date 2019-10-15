const express = require('express')
const Users = require('./users/user-router')
const server = express()

server.use(express.json())
server.use('/api', Users)


module.exports = server