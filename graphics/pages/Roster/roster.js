function blackWhiteText(bgColor, darkColor, lightColor) {
	var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
	var r = parseInt(color.substring(0, 2), 16); // hexToR
	var g = parseInt(color.substring(2, 4), 16); // hexToG
	var b = parseInt(color.substring(4, 6), 16); // hexToB
	var uicolors = [r / 255, g / 255, b / 255];
	var c = uicolors.map((col) => {
		if (col <= 0.03928) {
			return col / 12.92;
		}
		return Math.pow((col + 0.055) / 1.055, 2.4);
	});
	var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
	return (L > 0.179) ? darkColor : lightColor;
}

nodecg.listenFor('roster', async function(data) {
	App.players = data;
	let color = await fetch('/ver2OctoleagueBundle/colors-json');
	color = await color.json();
	color = color[data[0].Team];
	document.querySelector('.bottom')
		.style.backgroundColor = color;
	document.querySelector('span.teamName')
		.style.color = blackWhiteText(color, '#fff', '#000');

	document.querySelector('img.teamIcon')
		.src = `/ver2OctoleagueBundle/teamImg/${data[0].Team}`

	document.querySelectorAll('div.info')
		.forEach(elem => {
			elem.style.borderLeftColor = color;
		});

	document.querySelectorAll('img.character').forEach((elem, index) => {
		elem.style.objectFit = 'null';
		elem.style.objectPosition = 'bottom';
		if (data[index].ShowImage) {
			elem.src = data[index].ShowImage;
			elem.style.objectFit = 'cover';
		}
		else {
			elem.src = `/ver2OctoleagueBundle/teamImg/${data[index].Team}`;
			elem.style.objectFit = 'contain';
			elem.style.objectPosition = 'center';
		}
	});
});

nodecg.listenFor('roster-fadeIn', async function(data){
	$('#container').fadeIn(600, () => console.log('faded'));
})

nodecg.listenFor('roster-fadeOut', async function(data){
	$('#container').fadeOut(600, () => console.log('faded'));
})
