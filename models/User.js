const db = require('../config/db.js');

class User{

	constructor(username, email, password){
		this.username = username;
		this.email = email;
		this.password = password;
	}

	async createUser(){
		let sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
		const [newarticle, _] = await db.execute(sql, [this.username, this.email, this.password]);
		return newarticle;
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
}

module.exports = User;