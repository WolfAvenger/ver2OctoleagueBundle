nodecg.listenFor('pauseData', async function(data) {
	for (let i=0; i<2; i++){
		let elem = document.getElementsByClassName('logo')[i];
		console.log(data);
		let div = document.getElementsByClassName('team')[i];
		if (i === 0) {
			elem.setAttribute('src', `${data.team_a.logo}`);
			div.style.backgroundColor = data.team_a.color;
		}
		else {
			elem.setAttribute('src', `${data.team_b.logo}`);
			div.style.backgroundColor = data.team_b.color;
		}

	}

	if (data.team_a.score + data.team_b.score !== 0)
		document.getElementsByClassName('pvs')[0].innerHTML = `${data.team_a.score} - ${data.team_b.score}`;
	else document.getElementsByClassName('pvs')[0].innerHTML = `VS`;
});
