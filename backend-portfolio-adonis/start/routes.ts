/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { aurélien: 'Hémidy' };
});

// PROJECTS

// Get all projects
Route.get('/projects/', 'ProjectController.getAllProjects');

// Get a project by ID
Route.get('/projects/:id/', 'ProjectController.getProjectByID');

// Update a project by ID
Route.put('/projects/edit/:id', 'ProjectController.updateProjectByID');

// Delete a project by ID
Route.delete('/projects/delete/:id', 'ProjectController.deleteProjectByID');

// Create a project
Route.post('/projects/create', 'ProjectController.createProject');

// LOGIN

// Create a user
Route.post('/user/create', 'UserController.createUser');

// Login a user
Route.post('/user/login', 'UserController.loginUser');

// Logout a user
Route.post('/user/logout', 'UserController.logoutUser');
