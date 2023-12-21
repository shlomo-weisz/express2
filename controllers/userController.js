const User = require('../models/User');
const bcrypt = require('bcrypt');
module.exports = {
	getusers: async (req, res) => {
		try {
			let [users, _] = await User.findAll();
			res.json({ "count": users.length, users });
		} catch (error) {
			console.error(error);
		}

	},
	postUser: async (req, res) => {
		try {
			let validuser = await User.validateUser(req.body);
			if (validuser.error) {
				return res.status(400).json(validuser.error.details[0].message);
			}
			req.body.password = await bcrypt.hash(req.body.password, 10);

			let {username, email, password} = req.body;
			let newuser = new User(username, email, password);
			let result = await newuser.createUser();
			if (result == 1) {
				return res.status(400).json("failed to create user");
			}
			else
			{
				res.json('User posted, with id: ' + result.insertId + '');
			}
			

		} catch (error) {
			console.error(error);
		}

	},
	findbyID: async (req, res) => {
		try {
			let id = req.params.id;
			let [user, _] = await User.findOne(id);
			res.json(user);
		} catch (error) {
			console.error(error);
		}

	},
	updatebyID: async (req, res) => {
		try {
			let id = req.params.id;
			let { username, email, password } = req.body;
			let [user, _] = await User.updateOne(id, username, email, password);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	},
	deletebyID: async (req, res) => {
		try {
			let id = req.params.id;
			let [user, _] = await User.deleteOne(id);
			res.json(user);
		} catch (error) {
			console.error(error);
		}
	},
	login: async (req, res) => {
		try {
			let validuser = await User.validateLogin(req.body);
			if (validuser.error) {
				return res.status(400).json(validuser.error.details[0].message);
			}
			let { email, password } = req.body;
			let [user, _] = await User.findUserByEmail(email);
			console.log(user);
			if (user.length == 0) {
				return res.status(400).json("email is wrong");
			}
			let match = await bcrypt.compare(password, user[0].password);
			if (match) {
				res.json("login success");
			} else {
				res.status(400).json("email or password is wrong");
			}
		} catch (error) {
			console.error(error);
		}
	}


}