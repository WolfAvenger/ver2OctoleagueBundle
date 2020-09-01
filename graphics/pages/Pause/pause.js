nodecg.listenFor('pauseData', async function (data) {
	/* Do stuff*/

	document.getElementsByClassName('score__logo-handler')[0]
		.style.backgroundColor = data.team_a.color;
	document.getElementsByClassName('score__logo-handler')[1]
		.style.backgroundColor = data.team_b.color;

	for (let i = 0; i< data.maps.length; i++){
		document.getElementsByClassName('maps__map')[i]
			.style.backgroundImage = `url("/ver2OctoleagueBundle/map/${data.maps[i].name}")`;

		let dom1 = document.getElementsByClassName('maps__winner')[i];
		dom1.style.backgroundColor = 'transparent';
		let dom2 = document.getElementsByClassName('maps__map-score')[i];
		dom2.style.visibility = 'hidden';

		if (data.maps[i].score1 !== "" && data.maps[i].score2 !== ""){

			if (data.maps[i].score1 > data.maps[i].score2){
				dom1.style.backgroundColor = data.team_a.color;
			}
			else if (data.maps[i].score1 < data.maps[i].score2){
				dom1.style.backgroundColor = data.team_b.color;
			}

			dom2.style.visibility = 'visible';
		}
	}

	setTimeout(zip(data,'team_a'), 1000);
	setTimeout(zip(data, 'team_b'), 1000);

	vue.maps = data.maps;
	vue.casters = data.casters;
	vue.subtext = data.subtext;
});

function zip(data, field){
	let info = data[field];

	for (let key of Object.keys(info)){
		vue[field][key] = info[key]
	}
}
