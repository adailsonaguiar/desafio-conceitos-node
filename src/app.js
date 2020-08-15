const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  // TODO
  return response.json({ repositories });
});

app.post('/repositories', (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid(),
  };
  repositories.push(repository);
  return response.status(201).json({ repository });
});

app.put('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  const repositoryEdited = { title, url, techs };
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    ...repositoryEdited,
  };
  return response
    .status(201)
    .json({ repository: repositories[repositoryIndex] });
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    likes: repositories[repositoryIndex].likes + 1,
  };
  return response
    .status(201)
    .json({ repository: repositories[repositoryIndex] });
});

module.exports = app;
