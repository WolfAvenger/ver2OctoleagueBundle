function setData(data){
	console.log(data)
	let teams = [data.team_a, data.team_b];
	for(let i=0; i<2; i++){
		let team = document.getElementsByClassName('teamname')[i];
		team.innerHTML = teams[i].name;

		let score = document.getElementsByClassName('score')[i];
		score.innerHTML = teams[i].score;
	}
	let imgL = document.getElementById('logo-a');
	imgL.src = data.team_a.logo;

	let imgR = document.getElementById('logo-b');
	imgR.src = data.team_b.logo;

	document.getElementsByClassName('stage')[0].innerHTML = data.subtext;
}
nodecg.listenFor('ingame', function(data){
	console.log("ingame")
	setData(data);
});
