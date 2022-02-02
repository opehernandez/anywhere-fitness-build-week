const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errHandler } = require('./auth/middleware')
const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const userRouter = require('./users/users-router');
const classRouter = require('./class/class-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter)
server.use('/api/classes',  classRouter); // only logged-in users should have access!
server.use(errHandler)
module.exports = server;
