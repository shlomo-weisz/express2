const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const userController = require('../controllers/userController');

// GET /user
router.post('/add', userController.postUser);
router.get('/', userController.getusers);
router.get('/:id', userController.findbyID);
router.put('/:id', userController.updatebyID);
router.delete('/:id', userController.deletebyID);
router.post('/login', userController.login);

module.exports = router;