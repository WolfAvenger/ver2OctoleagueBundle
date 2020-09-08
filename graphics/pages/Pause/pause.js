function sleepFor( sleepDuration ){
	let now = new Date().getTime();
	while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

nodecg.listenFor('pauseData', async function (data) {
	/* Do stuff*/

	for (let key of Object.keys(data)){
		vue[key] = data[key];
	}

	document.getElementsByClassName('score__logo-handler')[0]
		.style.backgroundColor = data.team_a.color;
	document.getElementsByClassName('score__logo-handler')[1]
		.style.backgroundColor = data.team_b.color;

	console.log(document.getElementsByClassName('maps__map'))
	for (let i = 0; i < data.maps.length; i++){
		console.log(i)
		document.getElementsByClassName('maps__map')[i]
			.style.width = `${90 / data.maps.length}%`

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
