const db = require('../config/db.js');
const joi = require('joi');

class User{

	constructor(username, email, password){
		this.username = username;
		this.email = email;
		this.password = password;
	}

	async createUser(){
		try {
			let sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
			const [newuser, _] = await db.execute(sql, [this.username, this.email, this.password]);
			return newuser;
		} catch (error) {
			console.error(error);
			return (1);
		}
		// let sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
		// const [newarticle, _] = await db.execute(sql, [this.username, this.email, this.password]);
		// return newarticle;
	}
	static async findAll(){
		let sql = `SELECT * FROM users`;
		return await db.execute(sql);
	}
	static async findOne(id){
		let sql = `SELECT * FROM users WHERE id =?`;
		return await db.execute(sql, [id]);
	}
	static async updateOne(id, username, email, password){
		let sql = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
		return await db.execute(sql, [username, email, password, id]);
	}
	static async deleteOne(id){
		let sql = `DELETE FROM users WHERE id = ?`;
		return await db.execute(sql, [id]);
	}
	static validateUser(user){
		const schema = joi.object({
			username: joi.string().min(3).max(30).required(),
			email: joi.string().email().required(),
			password: joi.string().min(3).max(100).required()
		});
		return schema.validate(user);
	}

	static async findUserByEmail(email){
		let sql = `SELECT * FROM users WHERE email =?`;
		return await db.execute(sql, [email]);
	}

	static validateLogin(user){
		const schema = joi.object({
			email: joi.string().email().required(),
			password: joi.string().min(3).max(100).required()
		});
		return schema.validate(user);
	}
}

module.exports = User;