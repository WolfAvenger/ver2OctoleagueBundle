const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json')
let sheet;

async function init(){
	const doc = new GoogleSpreadsheet('1NqH1uZsKIJ5cCsBAfaV4F5cIbrAEmgVbcvzECZFypJs');
	await doc.useServiceAccountAuth(creds);
	await doc.loadInfo();
	sheet = doc.sheetsByIndex[1];
}

async function getPlayersByTeam(team){
	let result;
	await init();
	result = await sheet.getRows();
	result = result.filter(elem => elem.Team === team);
	result = result.map(elem => elem = {
		BTag: elem.BTag,
		Roles: elem.Roles.split(', '),
		Mains: elem.Mains.split(', '),
		Name: elem.Name === '' ? "Unknown name" : elem.Name,
		isCap: elem.isCaptain === "Да",
		Team: elem.Team
	});
	return result;
}

async function getPlayerByBTag(btag){
	let result;
	await init();
	result = await sheet.getRows();
	result = result.filter(elem => btag.includes(elem.BTag));
	return result;
}

async function getTeams(){
	let result;
	await init()
	result = await sheet.getRows();
	result = new Set(result.map(elem => elem = elem.Team))
	return result;

}

async function setUpRoster(players){
	players.forEach(elem => {
		if (elem.Mains[0] === '') elem.Mains = [undefined]
	})
	let chars = players.map(elem => elem.Mains);
	let ret = [];
	for (let i = 0; i < players.length; i++){
		let t = 0;
		let flag = true;
		while (flag){
			if (chars[i].length === t) {
				chars[i] = [undefined]
			}
			if (!ret.includes(chars[i][t]) || chars[i][t] === undefined){
				ret.push(chars[i][t]);
				flag = false;
			} else {
				t++;
			}
		}
	}
	players.forEach((elem, index) => {
		elem.Hero = ret[index];
	})
	return players;
}

module.exports.getPlayersByTeam = getPlayersByTeam;
module.exports.getTeams = getTeams;
module.exports.getPlayerByBTag = getPlayerByBTag;
module.exports.setUpRoster = setUpRoster;