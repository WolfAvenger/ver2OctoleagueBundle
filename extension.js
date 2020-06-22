'use strict';
const path = require('path');
const fs = require('fs');

function getReplByName(replicant, name, ext='.png'){
	for (let elem of replicant.__value){
		if (elem.name === name && elem.ext === ext){
			return elem;
		}
	}
	return undefined;
}

module.exports = function (nodecg) {
	const router = nodecg.Router();

	var logos = nodecg.Replicant('assets:logos');
	var maps = nodecg.Replicant('assets:maps');
	var colors = nodecg.Replicant('assets:teams-colors');

	router.get('/teamImg/:imgTeam', (req, res) => {
		//res.sendFile(`./graphics/images/logos/${req.params.imgTeam}.png`, {root: __dirname});
		let img = getReplByName(logos, req.params.imgTeam);
		res.sendFile(`.${img.url}`, {root: path.join(__dirname, '../..')});
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
		//res.sendFile(`./graphics/images/maps/${req.params.map}.jpg`, {root: __dirname});
		let img = getReplByName(maps, req.params.map, '.jpg');
		res.sendFile(`.${img.url}`, {root: path.join(__dirname, '../..')});
	});

	router.get('/colors-json', (req, res) =>{
		res.sendFile(`.${colors.__value[0].url}`, {root: path.join(__dirname, '../..')})
	});

	nodecg.mount('/ver2OctoleagueBundle', router); // The route '/my-bundle/customroute` is now available
};
