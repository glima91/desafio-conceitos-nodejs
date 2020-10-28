const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories);
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0

  };

  repositories.push(repository);

  return response.status(201).json(repository);

  
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json( { "error": "Repository not found!" });
  }


    repository = repositories[repositoryIndex];
    
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    repositories[repositoryIndex] = repository;


  return response.status(201).json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json( { "error": "Repository not found!" });
  }
 // remove element from list
  repositories.splice(repositoryIndex,1);

  return response.status(204).json({ "msg": "repositorio deletado!" });

  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json( { "error": "Repository not found!" });
  }

  repository = repositories[repositoryIndex]

  repository.likes++;
  
  return response.status(201).json(repository);


});

module.exports = app;
