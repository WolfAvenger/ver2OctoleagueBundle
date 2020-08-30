'use strict';
const path = require('path');
const fs = require('fs');
const api = require('./table.js');

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
	var roleicons = nodecg.Replicant('assets:role-icons');

	router.get('/teamImg/:imgTeam', (req, res) => {
		//res.sendFile(`./graphics/images/logos/${req.params.imgTeam}.png`, {root: __dirname});
		let img = getReplByName(logos, req.params.imgTeam);
		if (!img) res.sendFile("");
		res.sendFile(`.${img.url}`, {root: path.join(__dirname, '../..')});
	});

	router.get('/bg', (req, res) => {
		res.sendFile(`./graphics/bg.mp4`, {root: __dirname});
		console.log('bg requested');
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

	router.get('/players/:team', (req, res) => {
		api.getPlayersByTeam(req.params.team)
			.then(r => {
				res.json({data: r});
			});
	});

	router.get('/teamlist', (req,res) => {
		api.getTeams()
			.then(r => res.json({data: Array.from(r)}));
	})

	router.post('/roster', async (req, res) => {
		let arr = req.body.data;
		let json = await api.getPlayerByBTag(arr);
		json = json.map(elem => elem = {
			BTag: elem.BTag,
			Nick: elem.BTag.split('#')[0],
			Roles: elem.Roles.split(', '),
			Mains: elem.Mains.split(', '),
			Name: elem.Name === '' ? "Unknown name" : elem.Name,
			isCap: elem.isCaptain === "Да",
			Team: elem.Team
		});
		api.setUpRoster(json)
			.then(r => res.json({data:r}));

	});

	router.get('/role/:role', (req, res) => {
		let img = getReplByName(roleicons, req.params.role, '.png');
		console.log(img)
		res.sendFile(`.${img.url}`, {root: path.join(__dirname, '../..')});
	})

	nodecg.mount('/ver2OctoleagueBundle', router); // The route '/my-bundle/customroute` is now available
};
