const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {getUser} = require('../controllers/userController');

// GET /user
router.get('/', getUser);

router.post('/', (req, res) => {
	res.send('Got a POST request');
});

module.exports = router;