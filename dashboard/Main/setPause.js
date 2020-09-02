async function receiveColors(){
	const req = await fetch('/ver2OctoleagueBundle/colors-json', {method: "GET"});
	return await req.json();
}

let colors;
receiveColors()
	.then(res => colors = res);

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
	data.team_a.logo = `/ver2OctoleagueBundle/teamImg/${team_a}`;
	data.team_b.name = team_b;
	data.team_b.logo = `/ver2OctoleagueBundle/teamImg/${team_b}`;

	data.casters = document.getElementsByClassName('castername')[0].value;
	data.subtext = document.getElementsByClassName('stage')[0].value;

	nodecg.sendMessage('pauseData', data);

	return data;
}

async function setIMG(elem){
	var className = elem.className;
	var teamName = document.getElementsByClassName(className)[0];
	teamName = teamName.options[teamName.selectedIndex].text;
	var imgDOM = document.getElementsByClassName(className+'-img')[0];
	imgDOM.src =  `/ver2OctoleagueBundle/teamImg/${teamName}`;

	let rgba = colors[teamName].primary;
	document.getElementById(`colorpicker-${className}`).value = rgba;
	App.getTeams().then(res => App.teams = res);
	console.log(teamName, colors[teamName])
}

function switchSides(data, onreverse){
	let res = data;
	if (onreverse){
		[res.team_a, res.team_b] = [res.team_b, res.team_a]
		for (let i = 0; i < res.maps.length; i++){
			[res.maps.score1, res.maps.score2] = [res.maps.score2, res.maps.score1]
		}
	}

	nodecg.sendMessage('ingame', res).then(r => {
		console.log('ingame sent!')});
}

