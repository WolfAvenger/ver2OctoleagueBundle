function makeHead(data){
	document.getElementsByClassName('caster-name')[0].innerHTML = data.info.caster;
	document.getElementsByClassName('stage-name')[0].innerHTML = data.info.stage;
}

function makeMiddle(data){
	document.getElementsByClassName('teamname-left')[0].innerHTML = data.info.teams[0];
	//document.getElementsByClassName('teamname-left')[0].style.color =
	//	data.info.colors[0].split(',').slice(0,3).join(',').replace('a','')+')';
	document.getElementsByClassName('teamname-right')[0].innerHTML = data.info.teams[1];
	//document.getElementsByClassName('teamname-right')[0].style.color =
	//	data.info.colors[1].split(',').slice(0,3).join(',').replace('a','')+')';

	document.getElementsByClassName('score-left')[0].innerHTML = data.info.score[0];
	document.getElementsByClassName('score-right')[0].innerHTML = data.info.score[1];

	document.getElementsByClassName('logo-left')[0].setAttribute('src', `./images/logos/${data.info.teams[0]}.png`);
	document.getElementsByClassName('logo-right')[0].setAttribute('src', `./images/logos/${data.info.teams[1]}.png`);
}

function makeBottom(data){
	for (let i=0; i<5; i++){

		(document).getElementsByClassName('map-name')[i].innerText = data.maps[i].map.split('_').join(' ').toUpperCase();
		(document).getElementsByClassName('map-score')[i].innerText = "";
		(document).getElementsByClassName('map')[i].style.backgroundImage = `url("./images/maps/${data.maps[i].map}.jpg")`;
		console.log(`url(./images/maps/${data.maps[i].map.split('_').join(' ')}.jpg)`);
		if (data.maps[i].score1 > data.maps[i].score2){
			(document).getElementsByClassName('map-score')[i].style.opacity = '100%';
			(document).getElementsByClassName('map-img')[i].style.backgroundColor = data.info.colors[0];
			//(document).getElementsByClassName('map-score')[i].innerText = mapdata[i].score.team1+' : '+mapdata[i].score.team2;
			//(document).getElementsByClassName('map-img')[i].style.backgroundImage = 'url('+data.team1.logo+')';
		} else if (data.maps[i].score1 < data.maps[i].score2) {
			(document).getElementsByClassName('map-img')[i].style.backgroundColor = data.info.colors[1];
			//(document).getElementsByClassName('map-score')[i].innerText = mapdata[i].score.team1+' : '+mapdata[i].score.team2;
		} else {
			(document).getElementsByClassName('map-img')[i].style.backgroundColor = 'transparent';
		}
		if (data.maps[i].score1 !== "" || data.maps[i].score2 !== ""){
			(document).getElementsByClassName('map-score')[i].innerText = data.maps[i].score1+' : '+data.maps[i].score2;
		}

	}
}

nodecg.listenFor('pauseData', async function(data) {
	//console.log(data);
	makeHead(data);
	makeMiddle(data);
	makeBottom(data);
});

nodecg.listenFor('ingame', async function(data){
	makeHead(data);
	makeMiddle(data);
	makeBottom(data);
});
