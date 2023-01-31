const express = require('express')
const app = express()

const router = require('./src/utils/router')
const database = require('./src/utils/database')
const server = require('./src/utils/server')

server.initialize(app)
router.initialize(app)
database.connect()
server.start(app)