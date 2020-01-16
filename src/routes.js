const { Router } = require('express');
const DevController = require('./app/controllers/devController')
const SearchController = require('./app/controllers/searchController')
const routes = Router();

routes.get('/devs', DevController.getAll)
routes.get('/devs/:id', DevController.getOne)
routes.get('/devs/user/:name', DevController.getByName)
routes.post('/devs', DevController.store)
routes.put('/devs', DevController.edit)
routes.delete('/devs/:id', DevController.delete)

routes.get('/search', SearchController.getByQuery)

module.exports = app => app.use('/api/v1', routes);
