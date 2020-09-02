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

const heroesImg = {
	'D.Va': 'https://vignette.wikia.nocookie.net/overwatch/images/d/dc/Dva_portrait.png/revision/latest?cb=20180319191247&path-prefix=ru',
	'Zarya': "https://vignette.wikia.nocookie.net/overwatch/images/d/d1/Zarya_portrait.png/revision/latest?cb=20180319191802&path-prefix=ru",
	'Orisa': 'https://vignette.wikia.nocookie.net/overwatch/images/f/f9/Orisa_portrait.png/revision/latest?cb=20180319191914&path-prefix=ru',
	'Reinhardt': "https://overwatch.guide/wp-content/uploads/2016/05/reinhardt.png",
	'Wrecking Ball': 'https://vignette.wikia.nocookie.net/overwatch/images/8/83/WreckingBall_portrait.png/revision/latest?cb=20190114232714',
	'Roadhog': 'https://vignette.wikia.nocookie.net/overwatch/images/c/c9/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D1%81%D0%B2%D0%B8%D0%BD.png/revision/latest?cb=20200508131749&path-prefix=ru',
	'Winston': 'https://vignette.wikia.nocookie.net/overwatch/images/4/42/Winston_portrait.png/revision/latest?cb=20180319191944&path-prefix=ru',
	'Sigma': 'https://vignette.wikia.nocookie.net/overwatch/images/a/a0/%D0%A1%D0%B8%D0%B3%D0%BC%D0%B0.png/revision/latest?cb=20200517152157&path-prefix=ru'
}

nodecg.listenFor('roster', async function(data) {
	App.players = data;
	let color = await fetch('/ver2OctoleagueBundle/colors-json');
	color = await color.json();
	color = color[data[0].Team];
	let primary = color.primary, secondary = color.secondary;
	document.querySelector('.bottom')
		.style.backgroundColor = primary;
	document.querySelector('span.teamName')
		.style.color = secondary;//blackWhiteText(color, '#fff', '#000');

	document.querySelector('img.teamIcon')
		.src = `/ver2OctoleagueBundle/teamImg/${data[0].Team}`

	document.querySelectorAll('div.info')
		.forEach(elem => {
			elem.style.borderLeftColor = primary;
		});

	document.querySelectorAll('img.character').forEach((elem, index) => {
		elem.style.objectFit = 'null';
		elem.style.objectPosition = 'bottom';
		if (data[index].ShowImage) {
			elem.src = data[index].ShowImage;
			elem.style.objectFit = 'cover';
		}
		else {
/*			if (data[index].Hero) {
				elem.style.objectFit = 'cover';
				elem.src = heroesImg[data[index].Hero];
			} else {*/
				elem.src = `/ver2OctoleagueBundle/teamImg/${data[index].Team}`;
				elem.style.objectFit = 'contain';
				elem.style.objectPosition = 'center';
			 //}
		}
	});
});

nodecg.listenFor('roster-fadeIn', async function(data){
	$('#container').fadeIn(600, () => console.log('faded'));
/*	$('#container').animate({
		opacity: 1, // animate slideUp
		marginLeft: '-200px'
	}, 'slow', 'linear');*/
})

nodecg.listenFor('roster-fadeOut', async function(data){
	$('#container').fadeOut(600, () => console.log('faded'));
})
