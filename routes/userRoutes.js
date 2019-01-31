const 
  express = require('express'),
  router = express.Router(),
  userController = require('../controllers/users.js')

module.exports = router
// User CRUD Routes
  .get('/', userController.index)
  .get('/:_id', userController.findUser)
  .post('/signup', userController.signup)
  .post('/login', userController.login)
  .patch('/update', userController.update)
  .delete('/:email', userController.delete)

// HousingUnits CRUD Routes
  .get('/housingunits/index', userController.indexHousingUnit)
  .get('/housingunits/:_id', userController.findHousingUnit)
  .post('/housingunits/create', userController.createHousingUnit)
  .patch('/housingunits/update', userController.updateHousingUnit)
  .delete('/housingunits/:_id', userController.deleteHousingUnit)

// CleaningEvent CRUD Routes
  .get('/housingunits/cleaningevents/index', userController.indexCleaningEvent)
  .get('/housingunits/cleaningevents/:_id', userController.findCleaningEvent)
  .post('/housingunits/cleaningevents/create', userController.createCleaningEvent)
  .patch('/housingunits/cleaningevents/update', userController.updateCleaningEvent)
  .delete('/housingunits/cleaningevents/:_id', userController.deleteCleaningEvent)

// Review CRUD Routes
  .get('/housingunits/cleaningevents/review/index', userController.indexReview)
  .get('/housingunits/cleaningevents/review/:_id', userController.findReview)
  .post('/housingunits/cleaningevents/review/create', userController.createReview)
  .patch('/housingunits/cleaningevents/review/update', userController.updateReview)
  .delete('/housingunits/cleaningevents/review/:_id', userController.deleteReview)