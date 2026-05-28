Qualtrics.SurveyEngine.addOnload(function()
{
	this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    const metaData = JSON.parse(`\${lm://Field/1}`);
	var gameCounter = parseInt("${e://Field/gameCounter}") + 1;
 	Qualtrics.SurveyEngine.setEmbeddedData('gameCounter', gameCounter);
	const id = metaData.id;
    const causal = metaData.causal;
	const beta00 = metaData.beta00 != null ? metaData.beta00 : null;
	const beta01 = metaData.beta01 != null ? metaData.beta01 : null;
	const beta10 = metaData.beta10 != null ? metaData.beta10 : null;
	const beta11 = metaData.beta11 != null ? metaData.beta11 : null;
	const sigma0 = metaData.sigma0 != null ? metaData.sigma0 : null;
	const sigma1 = metaData.sigma1 != null ? metaData.sigma1 : null;
	const rho0   = metaData.rho0   != null ? metaData.rho0   : null;
	const rho1   = metaData.rho1   != null ? metaData.rho1   : null;
	const pX_Y   = metaData.pX_Y   != null ? metaData.pX_Y   : null;
	const pX_y   = metaData.pX_y   != null ? metaData.pX_y   : null;
	const pA     = metaData.pA     != null ? metaData.pA     : null;
	const pX     = metaData.pX     != null ? metaData.pX     : null;
	const pY_A     = metaData.pY_A     != null ? metaData.pY_A     : null;
	const pY_a     = metaData.pY_a     != null ? metaData.pY_a    : null;
	const order  = metaData.order  != null ? metaData.order  : null;
	console.log("ORDER");
	console.log(order);
	const treatment = metaData.treatment;
	const current = metaData.game;
	const pY = metaData.pY;
	const linkfn = metaData.linkfn; 
	let playerName0 = Qualtrics.SurveyEngine.getEmbeddedData('playerName0_' + gameCounter);
	let playerName1 = Qualtrics.SurveyEngine.getEmbeddedData('playerName1_' + gameCounter);
	let playerName2 = Qualtrics.SurveyEngine.getEmbeddedData('playerName2_' + gameCounter);
	const playerIcon0 = Qualtrics.SurveyEngine.getEmbeddedData('playerIcon0_' + gameCounter);
	const playerName2Pos = Qualtrics.SurveyEngine.getEmbeddedData('playerName2Pos_' + gameCounter);
	const playerName2Neg = Qualtrics.SurveyEngine.getEmbeddedData('playerName2Neg_' + gameCounter);
	const playerName2PosExo = Qualtrics.SurveyEngine.getEmbeddedData('playerName2PosExo_' + gameCounter);
	const playerName2NegExo = Qualtrics.SurveyEngine.getEmbeddedData('playerName2NegExo_' + gameCounter);
	const color = Qualtrics.SurveyEngine.getEmbeddedData('color_' + gameCounter);

	let gameOrder = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('gameOrder'));
	gameOrder.push(id);
	console.log("Current Game ID: ");
	console.log(id);


	
	Qualtrics.SurveyEngine.setEmbeddedData('gameOrder', JSON.stringify(gameOrder));
	Qualtrics.SurveyEngine.setEmbeddedData('playerName0', playerName0);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName1', playerName1);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName2', playerName2);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName2Pos', playerName2Pos);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName2Neg', playerName2Neg);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName2PosExo', playerName2PosExo);
	Qualtrics.SurveyEngine.setEmbeddedData('playerName2NegExo', playerName2NegExo);
	Qualtrics.SurveyEngine.setEmbeddedData('color', color);

	
	

	Qualtrics.SurveyEngine.setEmbeddedData('playerIcon0', playerIcon0);
	Qualtrics.SurveyEngine.setEmbeddedData('causal', causal);
	Qualtrics.SurveyEngine.setEmbeddedData('sigma0', sigma0);
	Qualtrics.SurveyEngine.setEmbeddedData('sigma1', sigma1);
	Qualtrics.SurveyEngine.setEmbeddedData('rho0', rho0);
	Qualtrics.SurveyEngine.setEmbeddedData('rho1', rho1);
	Qualtrics.SurveyEngine.setEmbeddedData('beta00', beta00);
	Qualtrics.SurveyEngine.setEmbeddedData('beta01', beta01);
	Qualtrics.SurveyEngine.setEmbeddedData('beta10', beta10);
	Qualtrics.SurveyEngine.setEmbeddedData('beta11', beta11);
	Qualtrics.SurveyEngine.setEmbeddedData('id', id);
	Qualtrics.SurveyEngine.setEmbeddedData('pX_Y', pX_Y);
	Qualtrics.SurveyEngine.setEmbeddedData('pX_y', pX_y);
	Qualtrics.SurveyEngine.setEmbeddedData('pA', pA);
	Qualtrics.SurveyEngine.setEmbeddedData('pX', pX);
	Qualtrics.SurveyEngine.setEmbeddedData('pY_A', pY_A);
	Qualtrics.SurveyEngine.setEmbeddedData('pY_a', pY_a);
	Qualtrics.SurveyEngine.setEmbeddedData('current', current);
	Qualtrics.SurveyEngine.setEmbeddedData('treatment', treatment);
	Qualtrics.SurveyEngine.setEmbeddedData('pY', pY);
	Qualtrics.SurveyEngine.setEmbeddedData('order', order);
	Qualtrics.SurveyEngine.setEmbeddedData('linkfn', linkfn);
	
	Qualtrics.SurveyEngine.setEmbeddedData('roundCounter', 0);
	
	

	console.log(gameOrder);
	
	jQuery("#NextButton").click();
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
});