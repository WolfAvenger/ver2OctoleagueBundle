'use strict';
const colors = require('./colors.json');

module.exports = function (nodecg) {
	/*nodecg.log.info('Hello, from your bundle\'s extension!');
	nodecg.log.info('I\'m where you put all your server-side code.');
	nodecg.log.info(`To edit me, open "${__filename}" in your favorite text editor or IDE.`);
	nodecg.log.info('You can use any libraries, frameworks, and tools you want. There are no limits.');
	nodecg.log.info('Visit https://nodecg.com for full documentation.');
	nodecg.log.info('Good luck!');*/

	const router = nodecg.Router();

	router.get('/teamImg/:imgTeam', (req, res) => {
		res.sendFile(`./graphics/images/logos/${req.params.imgTeam}.png`, {root: __dirname});
	});

	router.get('/bg', (req, res) => {
		res.sendFile(`./graphics/bg.mp4`, {root: __dirname});
	});

	router.get('/planks/:textname', (req, res) => {
		res.sendFile(`./graphics/ingame/${req.params.textname}.png`, {root: __dirname});
	});

	router.get('/octologo', (req, res) => {
		res.sendFile('./graphics/images/other/octoleague-logo.png', {root: __dirname});
	});

	router.get('/font/:font', (req, res) => {
		res.sendFile(`./graphics/fonts/${req.params.font}.ttf`,{root: __dirname})
	});

	router.get('/map/:map', (req, res) => {
		res.sendFile(`./graphics/images/maps/${req.params.map}.jpg`, {root: __dirname});
	});

	nodecg.mount('/ver2', router); // The route '/my-bundle/customroute` is now available
};
