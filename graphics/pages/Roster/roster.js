nodecg.listenFor('roster', async function(data) {
	App.players = data.sort((a,b) => {
		let priority = ['Tank', 'Offense', 'Support', 'Flex', 'Secret']
		return priority.indexOf(a.Roles[0]) > priority.indexOf(b.Roles[0])
	});
	let color = await fetch('/ver2OctoleagueBundle/colors-json');
	color = await color.json();
	color = color[data[0].Team];
	document.querySelector('.bottom')
		.style.backgroundColor = color;

	document.querySelectorAll('div.info')
		.forEach(elem => {
			elem.style.borderLeftColor = color;
		})
});

nodecg.listenFor('roster-fadeIn', async function(data){
	$('#container').fadeIn(600, () => console.log('faded'));
})

nodecg.listenFor('roster-fadeOut', async function(data){
	$('#container').fadeOut(600, () => console.log('faded'));
})
