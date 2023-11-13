const logger = (req, res, next) => {
	console.log(`enter`, Date.now());
	next();
}

module.exports = logger;