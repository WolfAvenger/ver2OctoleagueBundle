function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function random(mn, mx) {
	return Math.random() * (mx - mn) + mn;
}

function drawRand(t, g, rt, rg,  bool){
	App.t_rand = t;
	App.g_rand = g;

	if (bool) {
		if (g === "A") {
			App.group_a.unshift(t)
			App.group_a.pop()
		} else if (g === "B") {
			App.group_b.unshift(t)
			App.group_b.pop()
		}
		abs.splice(rg,1)
		allTeams.splice(rt, 1)
	}
}

let abs = ['A','A','A','A','B','B','B','B'].sort(() => Math.random() - 0.5)
let allTeams

nodecg.listenFor('doToss', async (data) => {
	let count = 25;
	console.log(allTeams)
	let rand_T = Math.floor(random(0, allTeams.length - 1))
	let rand_G = Math.floor(random(0, abs.length - 1))
	let current_T = allTeams[rand_T]
	let current_G = abs[rand_G]

	for (let i = 0; i < count; i++){
		rand_T = Math.round(random(0, allTeams.length - 1))
		rand_G = Math.round(random(0, abs.length - 1))
		current_T = allTeams[rand_T]
		current_G = abs[rand_G]
		await sleep(100)
		drawRand(current_T, current_G, rand_T, rand_G, false);

	}
	console.log(current_T, current_G)
	await sleep(4000)
	drawRand(current_T, current_G, rand_T, rand_G, true);
})

nodecg.listenFor('tossLoad', async(data) => {
	allTeams = data.allTeams.sort(() => Math.random() - 0.5)
	for (let i =0 ; i<Math.ceil(allTeams.length / 2); i++){
		App.group_a.push('')
		App.group_b.push('')
	}
})


