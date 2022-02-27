const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" })
  }

  request.user = user;

  return next();

}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some((user) => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists!" })
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  const user = users.find((user) => user.username === username);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;

  const { user } = request;

  const todosOperation = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todosOperation);

  return response.status(201).json(todosOperation)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const { id } = request.params;


  const replace = user.todos.find((todo => todo.id === id));

  if (!replace) {
    return response.status(404).json({ error: "todo not exists!" })
  }

  replace.title = title;
  replace.deadline = new Date(deadline);

  return response.json(replace)


});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const replace = user.todos.find((todo => todo.id === id));

  if (!replace) {
    return response.status(404).json({ error: "todo not exists!" })
  }

  replace.done = true;

  return response.json(replace);

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const replaceIndex = user.todos.findIndex((todo => todo.id === id));

  const replace = user.todos.find((todo => todo.id === id));

  if (!replace) {
    return response.status(404).json({ error: "todo not exists!" })
  }

  user.todos.splice(replaceIndex, 1);

  return response.status(204).send()

});

module.exports = app;

