const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const articleController = require('../controllers/articleController');

router.post('/add', articleController.postArticle);
router.get('/', articleController.getArticles);
router.get('/:id', articleController.findbyID);
router.put('/:id', articleController.updatebyID);
router.delete('/:id', articleController.deletebyID);

module.exports = router;
