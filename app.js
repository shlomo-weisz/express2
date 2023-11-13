const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const userRouter = require('./routes/user');
const logger = require('./middleware/logger');
const { log } = require('console');


app.use(logger);
app.use(express.json());




let books = {
	1: {
		id: 'A',
		title: 'Harry Potter and the Chamber of Secrets',
	},
	2: {
		id: 'B',
		title: 'Jurassic Park',
	},
	3: {
		id: 'C',
		title: 'The Lord of the Rings',
	},
	4: {
		id: 'D',
		title: 'The Hobbit',
	},
	5: {
		id: 'E',
		title: 'The Hunger Games',
	},
	6: {
		id: 'F',
		title: 'The Da Vinci Code',
	},
}


function addBook(book) {
	console.log(book);
	let lengh = Object.keys(books).length;
	books[lengh + 1] = book;
}

function searchBook(id) {
	for (let i = 1; i <= Object.keys(books).length; i++) {
		if (books[i].id == id) {
			return i;
		}
	}
	return -1;
}

function showBooks() {
	let result = 'num   id   title <br>';
	let len = Object.keys(books).length;
	for (let i = 1; i <= len; i++) {
		result += i + '     ' + books[i].id + '     ' + books[i].title + '<br>';
	}
	return result;
}



app.get('/books', (req, res) => {
	res.send(showBooks());
});

app.get('/books/:BookID', (req, res) => {
	const id = req.params.BookID;
	res.send(books[searchBook(id)]);
});

app.post('/books', (req, res) => {
	const book = req.body;
	console.log(req.body);
	addBook(book);
	res.send(showBooks());
});

app.put('/books/', (req, res) => {
	const book = req.body;
	const location = searchBook(book.id);
	if (location == -1) {
		addBook(book);
	} else {
	books[location] = book;
	}
	res.send(showBooks());
});


app.patch('/books/:BookID', (req, res) => {
	const id = req.params.BookID;
	const location = searchBook(id);
	if (location == -1) {
		res.send('Book not found');
	} else {
		let fildtochange = Object.keys(req.body)[0];
		books[location][fildtochange] = req.body[fildtochange];
		res.send(showBooks());
	}
});



app.delete('/books/:BookID', (req, res) => {
	const id = req.params.BookID;
	const location = searchBook(id);
	if (location == -1) {
		res.send('Book not found');
	} else {
		delete books[location];
		res.send(showBooks());
	}
});






app.get('/', (req, res) => {
	res.send('Hello to the library!');
});





app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
  })