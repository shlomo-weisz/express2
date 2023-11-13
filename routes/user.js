const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /user
router.get('/', (req, res) => {
	res.send('Hello World! user');
});

router.post('/', (req, res) => {
	res.send('Got a POST request');
});

module.exports = router;