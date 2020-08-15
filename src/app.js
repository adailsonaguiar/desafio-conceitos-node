const express = require('express');
const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function handleId(request, response, next) {
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'invalid id' });
  }
  return next();
}

app.get('/repositories', (request, response) => {
  // TODO
  return response.send(repositories);
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
  return response.status(200).json(repository);
});

app.put('/repositories/:id', handleId, (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex > -1) {
    const repositoryEdited = { title, url, techs };
    repositories[repositoryIndex] = {
      ...repositories[repositoryIndex],
      ...repositoryEdited,
    };
    return response.status(200).json(repositories[repositoryIndex]);
  }
  return response.status(400).json({ error: 'repository not found' });
});

app.delete('/repositories/:id', handleId, (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex > -1) {
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }
  return response.status(400).send();
});

app.post('/repositories/:id/like', handleId, (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  console.log(repositoryIndex);
  if (repositoryIndex > -1) {
    repositories[repositoryIndex] = {
      ...repositories[repositoryIndex],
      likes: repositories[repositoryIndex].likes + 1,
    };
    return response.status(201).json(repositories[repositoryIndex]);
  }
  return response.status(400).json({ error: 'repository not found' });
});

module.exports = app;
