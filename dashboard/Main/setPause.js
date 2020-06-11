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
	"Fire of Mercy": "#ad481b",
	"Team Fury": "#a69700"
};

function obtainData(){
	let data = {
		team_a: {
			name: "",
			logo: null,
			color: null,
			score: 0
		},
		team_b: {
			name: "",
			logo: null,
			color: null,
			score: 0
		},
		maps: [],
		casters: "",
		subtext: "",
	};

	for (let i=0; i<5; i++){
		let s1 = document.getElementsByClassName('score')[i*2].value;
		let s2 = document.getElementsByClassName('score')[i*2+1].value;
		let map = document.getElementsByClassName('maps')[i];
		map = map.options[map.selectedIndex].text;
		console.log(map);
		data.maps.push({
			name: map, score1:s1, score2:s2
		});
		s1 > s2 ? data.team_a.score++ : (s1 < s2 ? data.team_b.score++ : true);
	}

	for (let i=0; i<2; i++){
		let code = document.getElementsByClassName('colorpicker')[i].value.toUpperCase();
		console.log(code);
		let r = parseInt(code.slice(1,3),16),
			g = parseInt(code.slice(3,5), 16),
			b = parseInt(code.slice(5,7),16);
		let num = `rgba(${r}, ${g}, ${b}, 0.5)`;
		i === 0 ? data.team_a.color = num : data.team_b.color = num;
	}

	let team_a = document.getElementsByClassName("team-a")[0];
	team_a = team_a.options[team_a.selectedIndex].text;
	let team_b = document.getElementsByClassName("team-b")[0];
	team_b = team_b.options[team_b.selectedIndex].text;

	data.team_a.name = team_a;
	data.team_a.logo = `/ver2/teamImg/${team_a}`;
	data.team_b.name = team_b;
	data.team_b.logo = `/ver2/teamImg/${team_b}`;

	data.casters = document.getElementsByClassName('castername')[0].value;
	data.subtext = document.getElementsByClassName('stage')[0].value;

	//nodecg.sendMessage("pauseData", data);

	nodecg.sendMessage('pauseData', data);

	return data;
}

function setIMG(elem){
	var className = elem.className;
	console.log(className);
	var teamName = document.getElementsByClassName(className)[0];
	teamName = teamName.options[teamName.selectedIndex].text;
	var imgDOM = document.getElementsByClassName(className+'-img')[0];
	imgDOM.src =  `/ver2/teamImg/${teamName}`;

	let rgba = colors[teamName];
	document.getElementById(`colorpicker-${className}`).value = rgba;
}

function switchSides(data, onreverse){
	let res = {
		teams: [NaN, NaN],
		score: [NaN, NaN]
	};
	console.log(data.info.teams);
	console.log(data.info.score);
	console.log(onreverse);
	if (!onreverse){
		res.teams = data.info.teams;
		res.score = data.info.score;
	}
	else {
		res.teams = data.info.teams.reverse();
		res.score = data.info.score.reverse();
	}
	res.stage = data.info.stage;

	nodecg.sendMessage('ingame', res);
}

