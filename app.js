const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const userRouter = require('./routes/user');
const logger = require('./middleware/logger');

app.use(express.json());





app.get('/', (req, res) => {
	res.send('Hello to the library!');
});





app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
  })