const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const ResourcesRouter = require('../resources/resources-router.js');
const ProjectsRouter = require('../projects/projects-router.js');
const TasksRouter = require('../tasks/tasks-router.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());

server.use('/api/resources', ResourcesRouter);
server.use('/api/projects', ProjectsRouter);
server.use('/api/tasks', TasksRouter);

const port =  process.env.PORT || 9000;

server.get('/', (req, res) => res.send(`API up and running on port ${port}`))

module.exports = server;