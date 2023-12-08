const db = require('../config/db.js');

class Article{

	constructor(userID, articlename, content){
		this.userID = userID;
		this.articlename = articlename;
		this.content = content;
	}

	async createArticle(){
		let sql = `INSERT INTO articles (userID, articlename, content) VALUES (${this.userID}, '${this.articlename}', '${this.content}')`;
		const [newarticle, _] = await db.execute(sql);
		return newarticle;
	}
	static async findAll(){
		let sql = `SELECT * FROM articles`;
		return await db.execute(sql);
	}
	static async findOne(id){
		let sql = `SELECT * FROM articles WHERE id =?`;
		return await db.execute(sql, [id]);
	}
	static async updateOne(id, articlename, content){
		let sql = `UPDATE articles SET articlename = ?, content = ? WHERE id = ?`;
		return await db.execute(sql, [articlename, content, id]);
	}
	static async deleteOne(id){
		let sql = `DELETE FROM articles WHERE id = ?`;
		return await db.execute(sql, [id]);
	}
}

module.exports = Article;