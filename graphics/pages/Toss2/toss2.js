const colors = {
	"Carpe Diem": "#8347c1",
	"Press W": "#ff1c26",
	"F30" : "#620404",
	"KnivesOut": "#ff551b",
	"Modern Renegades": "#fffaff",
	"Phoenix" : "#ff9705",
	"Team Useless Tongue": "#ff4ba1",
	"Truly Cake": "#383838",
	"White Dragon": "#7f7f7f",
	"Tale Quale": "#1349a8",
	"Cura te ipsum": "#f2bf28",
	"Oniel": "#8191aa",
	"Strike Champagne": "#4d7a43",
	"Svintus.PRO": "#eb7007",
	"Memento Mori": "#75a6e0",
	"OCTAHOR": "#8d6e3f",
	"Fire of Mercy": "#d1dc1b",
	"A.W.A.": "#05f9fc",
	"Team Fury": "#aAaAaA",
	"Кавай Десу Сугой Чан": "#ffa1ec"
};

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function shuffle(array){
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

let teams = ["F30", "Tale Quale", "Modern Renegades", "Carpe Diem", "KnivesOut", "Press W", "Truly Cake",
	"White Dragon", "Кавай Десу Сугой Чан"
].sort();

teams = shuffle(teams);

let groups = [];
for (let i = 0; i < 10; i++){
	groups.push(i % 2 === 0 ? "A" : "B");
}

let index_s = 0;
let index = 0;

function createDOMS(){
	let ADOMs_p = [], BDOMs_p = [];
	let ADOMs_i = [], BDOMs_i = [];
	let colors_l = [], colors_r = [];
	for (let i = 0; i < 5; i++){
		ADOMs_p.push(document.getElementsByClassName('team-name')[i]);
		ADOMs_i.push(document.getElementsByClassName('logo')[i]);
		BDOMs_p.push(document.getElementsByClassName('team-name')[i + 5]);
		BDOMs_i.push(document.getElementsByClassName('logo')[i + 5]);
		colors_l.push(document.getElementsByClassName('color')[i]);
		colors_r.push(document.getElementsByClassName('color')[i + 5]);
	}
	return [ADOMs_p, ADOMs_i, BDOMs_p, BDOMs_i, colors_l, colors_r];
}

let removeElementByValue = function(arr, elem){
	let index = arr.indexOf(elem);
	if (index !== -1) arr.splice(index, 1);
};

function getRandomElement(array){
	let max = array.length - 1;
	let index = Math.floor(Math.random() * Math.floor(max));

	return array[index];
}

let index_l = 0;
let index_r = 6;

async function makeToss(teams, groups, ADOMs_p, ADOMs_i, BDOMs_p, BDOMs_i, cl, cr, document, colors){
	if (teams.length === 0 ) return;
	let rez = await shake(teams, groups);
	let team = rez[0].split(' : ')[1]; //etRandomElement(teams);
	removeElementByValue(teams, team);

	let group = rez[1].split(' : ')[1]; //getRandomElement(groups);
	removeElementByValue(groups, group);

	console.log(team, group);

	if (group === "A"){
		let DOM_p = ADOMs_p.shift();
		DOM_p.innerHTML = team;

		let imgDOM = ADOMs_i.shift();
		console.log(imgDOM);
		imgDOM.setAttribute('src', `/my-first-bundle/teamImg/${team}`);

		let colorDOM = cl.shift();
		colorDOM.style.backgroundColor = colors[team];
	}
	else {
		let DOM_p = BDOMs_p.shift();
		DOM_p.innerHTML = team;

		let imgDOM = BDOMs_i.shift();
		imgDOM.setAttribute('src', `/my-first-bundle/teamImg/${team}`);

		let colorDOM = cr.shift();
		console.log(cr);
		colorDOM.style.backgroundColor = colors[team];
	}
}

async function shake(teams, groups){
	let dom_t = document.getElementsByClassName('chosen')[0];
	let dom_g = document.getElementsByClassName('group')[0];

	for(let i = 0; i< 100; i++){
		dom_t.innerHTML = `Команда : ${shuffle(teams)[0]}`;
		dom_g.innerHTML = `Группа : ${shuffle(groups)[0]}`;
		await sleep(30);
	}

	return [dom_t.innerHTML, dom_g.innerHTML];
}

nodecg.listenFor('toss2', (data) => {
	console.log(d);
	makeToss(teams, groups, d[0],d[1],d[2],d[3],d[4], d[5], document, colors);
});




