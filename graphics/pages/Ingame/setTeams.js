function setData(data){
	for(let i=0; i<2; i++){
		let team = document.getElementsByClassName('teamname')[i];
		team.innerHTML = data.teams[i];

		let score = document.getElementsByClassName('score')[i];
		score.innerHTML = data.score[i];
	}
	let imgL = document.getElementById('logo-a');
	imgL.setAttribute('src', `./images/logos/${data.teams[0]}.png`);
	let imgR = document.getElementById('logo-b');
	imgR.setAttribute('src', `./images/logos/${data.teams[1]}.png`);

	document.getElementsByClassName('stage')[0].innerHTML = data.stage;
}
nodecg.listenFor('ingame', async function(data){
	setData(data);
});
