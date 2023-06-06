import express from 'express';
import projectsRouter from './src/routes/projects.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { app } from './src/lib/firebase.js';

const jsonParser = bodyParser.json();

const server = express();

server.use(jsonParser);

server.use(cors());

server.use('/projects', projectsRouter);

const port = process.env.PORT || 3004;

server.listen(port, () => {
  console.log('Servidor rodando na porta 3004');

});