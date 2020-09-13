function fadein() {
	const substrate = document.getElementById('substrate');
	const main = document.getElementById('main');
	const info = document.querySelector('.info');
	substrate.classList.remove('fadeout')
	substrate.classList.add('fadein');
	setTimeout(() => {
		main.classList.add('fadein');
		main.classList.remove('fadeout');
		info.style.opacity = 1;
	}, 150);
}

function fadeout(){
	const substrate = document.getElementById('substrate');
	const main = document.getElementById('main');
	const info = document.querySelector('.info');
	main.classList.add('fadeout');
	main.classList.remove('fadein');
	setTimeout(() => {
		substrate.classList.add('fadeout');
		substrate.classList.remove('fadein')
		info.style.opacity = 0;
	}, 450)

}

nodecg.listenFor('subbing', async function(data) {
	document.querySelector('.logo').src = `/ver2OctoleagueBundle/teamImg/${data.team}`;
	let arr = [data.In.Nick, data.Out.Nick];
	document.querySelectorAll('.player').forEach((elem, index) => {
		elem.innerHTML = arr[index];
	});
	setTimeout(fadein, 50);
	setTimeout(fadeout, 6000);
	let info = document.querySelector('#main');
	info.style.backgroundColor = data.color.primary;
	info.style.color = data.color.secondary;
});
