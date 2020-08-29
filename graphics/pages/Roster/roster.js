nodecg.listenFor('roster', async function(data) {
	App.players = data;
})
