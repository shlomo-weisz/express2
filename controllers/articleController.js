const Article = require('../models/article.js');
module.exports = {
	getArticles: async (req, res) => {
		try {
			let [articles, _] = await Article.findAll();
			res.json({ "count": articles.length, articles });
		} catch (error) {
			console.error(error);
		}

	},
	postArticle: async (req, res) => {
		try {
			let { userID, articlename, content } = req.body;
			let newArticle = new Article(userID, articlename, content);
			let result = await newArticle.createArticle();
			res.json('Article posted');
			console.log(result);

		} catch (error) {
			console.error(error);
		}

	},
	findbyID: async (req, res) => {
		try {
			let id = req.params.id;
			let [article, _] = await Article.findOne(id);
			res.json(article);
		} catch (error) {
			console.error(error);
		}

	},
	updatebyID: async (req, res) => {
		try {
			let id = req.params.id;
			let { articlename, content } = req.body;
			let [article, _] = await Article.updateOne(id, articlename, content);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	},
	deletebyID: async (req, res) => {
		try {
			let id = req.params.id;
			let [article, _] = await Article.deleteOne(id);
			res.json(article);
		} catch (error) {
			console.error(error);
		}
	}

}