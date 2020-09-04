const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json')
let sheet;

function saveSheet(s){
	s.getRows().then(r => sheet = r);
}

init().then(async (s) => {
	setInterval(saveSheet,  10000, s);
})

async function init(){
	const doc = new GoogleSpreadsheet('1NqH1uZsKIJ5cCsBAfaV4F5cIbrAEmgVbcvzECZFypJs');
	await doc.useServiceAccountAuth(creds);
	await doc.loadInfo();
	sheet = doc.sheetsByIndex[1];
	return sheet;
}

function playerify(elem){
	elem = {
		BTag: elem.BTag,
		Nick: elem.BTag.split('#')[0],
		Roles: elem.Roles.split(',').map(elem => elem.trim()),
		Mains: elem.Mains.split(',').map(elem => elem.trim()),
		Name: elem.Name === '' ? "Unknown name" : elem.Name,
		isCap: elem.isCaptain === "Да",
		Team: elem.Team,
		ShowImage: elem.ShowImage
	};
	return elem;
}

async function getPlayersByTeam(team){
	let result;
	result = sheet.filter(elem => elem.Team === team);
	result = result.map(elem => playerify(elem));
	return result;
}

async function getPlayerByBTag(btag){
	let result;
	result = sheet.filter(elem => btag.includes(elem.BTag));
	result = result.map(elem => playerify(elem));
	return result;
}

async function getTeams(){
	let result;
	result = new Set(sheet.map(elem => elem.Team));
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
		if (elem.ShowImage && elem.ShowImage.includes('drive.google.com'))
			elem.ShowImage = elem.ShowImage.replace('open?', 'uc?export=view&');
	});

	players.sort((a,b) => {
		let priority = ['Flex', 'Tank', 'Offense', 'Support', 'Secret'];
		let sw1 = priority.indexOf(a.Roles[0]) > priority.indexOf(b.Roles[0]);
		let sw2 = priority.indexOf(a.Roles[0]) < priority.indexOf(b.Roles[0]);
		return sw1 ? 1 : (sw2 ? -1 : 0);
	});
	return players;
}

module.exports.getPlayersByTeam = getPlayersByTeam;
module.exports.getTeams = getTeams;
module.exports.getPlayerByBTag = getPlayerByBTag;
module.exports.setUpRoster = setUpRoster;
