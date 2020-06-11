nodecg.listenFor('pauseData', async function(data) {
	for (let i=0; i<2; i++){
		let elem = document.getElementsByClassName('logo')[i];
		console.log(elem);
		elem.setAttribute('src', `./images/logos/${data.info.teams[i]}.png`);
		let div = document.getElementsByClassName('team')[i];
		console.log(div);
		div.style.backgroundColor = data.info.colors[i];
	}

	if (data.info.score[0] + data.info.score[1] !== 0)
		document.getElementsByClassName('pvs')[0].innerHTML = `${data.info.score[0]} - ${data.info.score[1]}`;
	else document.getElementsByClassName('pvs')[0].innerHTML = `VS`;
});
