Qualtrics.SurveyEngine.addOnload(function()
{
	this.hidePreviousButton();
});
Qualtrics.SurveyEngine.addOnReady(function()
{
	const id = Qualtrics.SurveyEngine.getEmbeddedData('id');
	var history = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('history_' + id));
	var roundTimes = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('roundTimes_' + id));
	var payment = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('payment_' + id));
	const treatment = Qualtrics.SurveyEngine.getEmbeddedData('treatment');
	const causal = parseInt("${e://Field/causal}");
	const supergame = Qualtrics.SurveyEngine.getEmbeddedData('supergame');
	const experiment = Qualtrics.SurveyEngine.getEmbeddedData('experiment');

	
	// Descriptive stats below use only the LAST 30 rounds (or all rounds if fewer than 30).
	// (The causal/conditional benchmarks further down still use all rounds.)
	var historyHalf = history.length >= 30 ? history.slice(-30) : history;

	// Filter by A value (second half)
	var a0Cases = historyHalf.filter(row => row[0] === 0);
	var a1Cases = historyHalf.filter(row => row[0] === 1);

	// Calculate conditional probabilities (second half)
	var dieterSameNo_half;
	var dieterSameYes_half;
	if (experiment === "EndogDieterBinary") {
		// Two-variable game (A -> Y, no X): use P(Y=1 | A)
		dieterSameNo_half = a0Cases.filter(row => row[2] === 1).length / a0Cases.length;
		dieterSameYes_half = a1Cases.filter(row => row[2] === 1).length / a1Cases.length;
	} else {
		dieterSameNo_half = a0Cases.filter(row => row[1] === row[2]).length / a0Cases.length;
		dieterSameYes_half = a1Cases.filter(row => row[1] === row[2]).length / a1Cases.length;
	}

	// Calculate marginal probabilities (second half)
	var PA_half = historyHalf.filter(row => row[0] === 1).length / historyHalf.length;
	var PX_half = historyHalf.filter(row => row[1] === 1).length / historyHalf.length;
	var PY_half = historyHalf.filter(row => row[2] === 1).length / historyHalf.length;

	// P(A | X) on the second half (for migrainesPAX / migrainesPAx)
	var pA_X_half = historyHalf.filter(row => row[0] === 1 && row[1] === 1).length / historyHalf.filter(row => row[1] === 1).length;
	var pA_x_half = historyHalf.filter(row => row[0] === 1 && row[1] === 0).length / historyHalf.filter(row => row[1] === 0).length;

	
	// Count all 8 combinations of AXY (lowercase = 0, uppercase = 1)
	var count_axy = history.filter(row => row[0] === 0 && row[1] === 0 && row[2] === 0).length;
	var count_axY = history.filter(row => row[0] === 0 && row[1] === 0 && row[2] === 1).length;
	var count_aXy = history.filter(row => row[0] === 0 && row[1] === 1 && row[2] === 0).length;
	var count_aXY = history.filter(row => row[0] === 0 && row[1] === 1 && row[2] === 1).length;
	var count_Axy = history.filter(row => row[0] === 1 && row[1] === 0 && row[2] === 0).length;
	var count_AxY = history.filter(row => row[0] === 1 && row[1] === 0 && row[2] === 1).length;
	var count_AXy = history.filter(row => row[0] === 1 && row[1] === 1 && row[2] === 0).length;
	var count_AXY = history.filter(row => row[0] === 1 && row[1] === 1 && row[2] === 1).length;
	
	// Calculate conditional probabilities for effects
	var pY_A = (count_AxY + count_AXY) / (count_Axy + count_AxY + count_AXy + count_AXY);
	var pY_a = (count_axY + count_aXY) / (count_axy + count_axY + count_aXy + count_aXY);
	
	var pY_X = (count_AXY + count_aXY) / (count_AXy + count_AXY + count_aXy + count_aXY);
	var pY_x = (count_AxY + count_axY) / (count_Axy + count_AxY + count_axy + count_axY);
	
	var pX_A = (count_AXy + count_AXY) / (count_Axy + count_AxY + count_AXy + count_AXY);
	var pX_a = (count_aXy + count_aXY) / (count_axy + count_axY + count_aXy + count_aXY);
	
	var pA_X = (count_AXy + count_AXY) / (count_AXy + count_AXY + count_aXy + count_aXY);
	var pA_x = (count_Axy + count_AxY) / (count_Axy + count_AxY + count_axy + count_axY);
	
	var pX_Y = (count_AXY + count_aXY) / (count_AxY + count_AXY + count_axY + count_aXY);
	var pX_y = (count_AXy + count_aXy) / (count_Axy + count_AXy + count_axy + count_aXy);

	var pY = history.filter(row => row[2] === 1).length / history.length;  // P(Y=1), all rounds
	
	// Conditional probabilities: P(Y | A, X)
	var pY_Ax = count_AxY / (count_Axy + count_AxY);  // P(Y | A, x)
	var pY_ax = count_axY / (count_axy + count_axY);  // P(Y | a, x)
	var pY_AX = count_AXY / (count_AXy + count_AXY);  // P(Y | A, X)
	var pY_aX = count_aXY / (count_aXy + count_aXY);  // P(Y | a, X)

	// Conditional probabilities: P(X | A, Y)
	var pX_AY = count_AXY / (count_AXY + count_AxY);  // P(X | A, Y)
	var pX_Ay = count_AXy / (count_AXy + count_Axy);  // P(X | A, y)
	var pX_aY = count_aXY / (count_aXY + count_axY);  // P(X | a, Y)
	var pX_ay = count_aXy / (count_aXy + count_axy);  // P(X | a, y)

	// First 10 rounds: count all 8 combinations of AXY (lowercase = 0, uppercase = 1)
	var history10 = history.slice(0, 10);
	var count_axy_round10 = history10.filter(row => row[0] === 0 && row[1] === 0 && row[2] === 0).length;
	var count_axY_round10 = history10.filter(row => row[0] === 0 && row[1] === 0 && row[2] === 1).length;
	var count_aXy_round10 = history10.filter(row => row[0] === 0 && row[1] === 1 && row[2] === 0).length;
	var count_aXY_round10 = history10.filter(row => row[0] === 0 && row[1] === 1 && row[2] === 1).length;
	var count_Axy_round10 = history10.filter(row => row[0] === 1 && row[1] === 0 && row[2] === 0).length;
	var count_AxY_round10 = history10.filter(row => row[0] === 1 && row[1] === 0 && row[2] === 1).length;
	var count_AXy_round10 = history10.filter(row => row[0] === 1 && row[1] === 1 && row[2] === 0).length;
	var count_AXY_round10 = history10.filter(row => row[0] === 1 && row[1] === 1 && row[2] === 1).length;

	// A -> Y effect using only the first 10 rounds (for the round-10 belief elicitation)
	var pY_A_round10 = (count_AxY_round10 + count_AXY_round10) / (count_Axy_round10 + count_AxY_round10 + count_AXy_round10 + count_AXY_round10);
	var pY_a_round10 = (count_axY_round10 + count_aXY_round10) / (count_axy_round10 + count_axY_round10 + count_aXy_round10 + count_aXY_round10);
	var pYes_AY_round10 = pY_A_round10;  // P(Y=1 | A=1)
	var pNo_AY_round10 = pY_a_round10;   // P(Y=1 | A=0)

	// X -> Y effect using only the first 10 rounds (for the round-10 belief elicitation)
	var pY_X_round10 = (count_AXY_round10 + count_aXY_round10) / (count_AXy_round10 + count_AXY_round10 + count_aXy_round10 + count_aXY_round10);
	var pY_x_round10 = (count_AxY_round10 + count_axY_round10) / (count_Axy_round10 + count_AxY_round10 + count_axy_round10 + count_axY_round10);
	var pY_round10 = history10.filter(row => row[2] === 1).length / history10.length;  // P(Y=1), first 10
	// default (causal == 0): X does not cause Y -> 0 effect; overridden below if causal == 1
	var pYes_XY_round10 = pY_round10;  // P(Y=1)
	var pNo_XY_round10 = pY_round10;   // P(Y=1)

	
	var pNo_AY = pY_a;
	var pYes_AY = pY_A;
	var pNo_AY0 = pY_a;
	var pYes_AY0 = pY_A;
	var pNo_AY1 = pY_a;
	var pYes_AY1 = pY_A;
	var pNo_AX = pX_a;
	var pYes_AX = pX_A;
	var pNo_AX0 = pX_ay;
	var pYes_AX0 = pX_Ay;
	var pNo_AX1 = pX_aY;
	var pYes_AX1 = pX_AY;
	var pNo_XY0 = pY_a;
	var pYes_XY0 = pY_a;
	var pNo_XY1 = pY_A;
	var pYes_XY1 = pY_A;
	var pNo_YX0 = pX_ay;
	var pYes_YX0 = pX_aY;
	var pNo_YX1 = pX_Ay;
	var pYes_YX1 = pX_AY;
	
	var pNo_XA = pA_x;
	var pYes_XA = pA_X;
	
	var pNo_XY = pY;
	var pYes_XY = pY;
	
	
	if (causal == 1){
		var pNo_AY0 = pY_ax;
		var pYes_AY0 = pY_Ax;
		var pNo_AY1 = pY_aX;
		var pYes_AY1 = pY_AX;
		var pNo_AX0 = pX_a;
		var pYes_AX0 = pX_A;
		var pNo_AX1 = pX_a;
		var pYes_AX1 = pX_A;	
		var pNo_XY0 = pY_ax;
		var pYes_XY0 = pY_aX;
		var pNo_XY1 = pY_Ax;
		var pYes_XY1 = pY_AX;
		var pNo_XY = pY_x;
		var pYes_XY = pY_X;
		var pNo_XY_round10 = pY_x_round10;
		var pYes_XY_round10 = pY_X_round10;
		var pNo_YX0 = pX_a;
		var pYes_YX0 = pX_a;
		var pNo_YX1 = pX_A;
		var pYes_YX1 = pX_A;

		
	}
	
	if (supergame == "migraines"){
		var pNo_AY0 = pY_ax;
		var pYes_AY0 = pY_Ax;
		var pNo_AY1 = pY_aX;
		var pYes_AY1 = pY_AX;
		var pNo_YX0 = pX_y;
		var pYes_YX0 = pX_Y;
	}
	
	
	// Save as JSON string 
	var results = {
		"dieterSameNo": dieterSameNo_half * 100,
		"dieterSameYes": dieterSameYes_half * 100,
		"dieterPA": PA_half * 100,
		"dieterPX": PX_half * 100,
		"dieterPY": PY_half * 100,
		"migrainesPX": PX_half * 100,
		"migrainesPY": PY_half * 100,
		"migrainesPAX": pA_X_half * 100,
		"migrainesPAx": pA_x_half * 100,
		
		"causal_AY": (pYes_AY - pNo_AY) * 100,
		"causal_AY_round10": (pYes_AY_round10 - pNo_AY_round10) * 100,
		"causal_XY_round10": (pYes_XY_round10 - pNo_XY_round10) * 100,
		"causal_AY0": (pYes_AY0 - pNo_AY0) * 100,
		"causal_AY1": (pYes_AY1 - pNo_AY1) * 100,
		"causal_AX": (pYes_AX - pNo_AX) * 100,
		"causal_AX0": (pYes_AX0 - pNo_AX0) * 100,
		"causal_AX1": (pYes_AX1 - pNo_AX1) * 100,
		"causal_XY0": (pYes_XY0 - pNo_XY0) * 100,
		"causal_XY1": (pYes_XY1 - pNo_XY1) * 100,
		"causal_YX1": (pYes_YX1 - pNo_YX1) * 100,
		"causal_YX0": (pYes_YX0 - pNo_YX0) * 100,
		"causal_XA": (pYes_XA - pNo_XA) * 100,
		"causal_XY": (pYes_XY - pNo_XY) * 100,

		"pNo_AY": pNo_AY * 100,
		"pNo_AY0": pNo_AY0 * 100,
		"pNo_AY1": pNo_AY1 * 100,
		"pNo_AX": pNo_AX * 100,
		"pNo_AX1": pNo_AX1 * 100,
		"pNo_AX0": pNo_AX0 * 100,
		"pNo_XY1": pNo_XY1 * 100,
		"pNo_XY0": pNo_XY0 * 100,
		"pNo_YX1": pNo_YX1 * 100,
		"pNo_YX0": pNo_YX0 * 100,

		"pYes_AY": pYes_AY * 100,
		"pYes_AY0": pYes_AY0 * 100,
		"pYes_AY1": pYes_AY1 * 100,
		"pYes_AX": pYes_AX * 100,
		"pYes_AX1": pYes_AX1 * 100,
		"pYes_AX0": pYes_AX0 * 100,
		"pYes_XY1": pYes_XY1 * 100,
		"pYes_XY0": pYes_XY0 * 100,
		"pYes_YX1": pYes_YX1 * 100,
		"pYes_YX0": pYes_YX0 * 100,

		"pNo_XY": pNo_XY * 100,
		"pYes_XY": pYes_XY * 100,
		"pNo_XA": pNo_XA * 100,
		"pYes_XA": pYes_XA * 100,

	};
	
	Qualtrics.SurveyEngine.setEmbeddedData('rationalInference_' + id, JSON.stringify(results));
	console.log(results);
	console.log(history);
	console.log(roundTimes);
	console.log(payment);
	
	jQuery("#NextButton").click();
});
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
});