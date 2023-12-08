const User = require('../models/User');
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
			let {username, email, password} = req.body;
			let newuser = new User(username, email, password);
			let result = await newuser.createUser();
			res.json('user posted');
			console.log(result);

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
	}

}