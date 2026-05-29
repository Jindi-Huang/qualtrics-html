Qualtrics.SurveyEngine.addOnload(function()
{
	this.hidePreviousButton();
	jQuery("#"+this.questionId+" .InputText:eq(0)").on("cut copy paste",function(e) {
   e.preventDefault();
  });
});
Qualtrics.SurveyEngine.addOnReady(function()
{
	const id = Qualtrics.SurveyEngine.getEmbeddedData('id');
	const rationalInference = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('rationalInference_' + id));
	
	const beliefPaymentMax = parseFloat("${e://Field/beliefPaymentMax}");
	const beliefPaymentIncentive = parseFloat("${e://Field/beliefPaymentIncentive}");
	
	function percentageToCategory(value) {
		if (value >= 0 && value <= 10) return 1;
		if (value > 10 && value <= 20) return 2;
		if (value > 20 && value <= 30) return 3;
		if (value > 30 && value <= 40) return 4;
		if (value > 40 && value <= 50) return 5;
		if (value > 50 && value <= 60) return 6;
		if (value > 60 && value <= 70) return 7;
		if (value > 70 && value <= 80) return 8;
		if (value > 80 && value <= 90) return 9;
		if (value > 90 && value <= 100) return 10;
		return null;
	}
	
	const verbalVariables = ['dieterPA', 'dieterPX', 'dieterPY', 'dieterSameYes', 'dieterSameNo'];
	const verbalPayments = [];
	
	for (let i = 0; i < verbalVariables.length; i++) {
		const varName = verbalVariables[i];
		const userAnswer = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(varName + '_' + id));
		const correctValue = rationalInference[varName];
		const correctCategory = percentageToCategory(correctValue);
		const difference = Math.abs(correctCategory - userAnswer);
		const payment = beliefPaymentMax - (difference * beliefPaymentIncentive);
		verbalPayments.push(payment);
		console.log(varName + ' - Correct:', correctValue, 'Category:', correctCategory, 'Answer:', userAnswer, 'Payment:', payment);
	}
	
	// --- Correct DAG (same for all 3 elicitations) ---
	const causal = parseInt("${e://Field/causal}");
	let correctDAG;
	if (causal == 0) {
		correctDAG = '[{"from":"A","to":"X"},{"from":"Y","to":"X"}]';
	} else if (causal == 1) {
		correctDAG = '[{"from":"A","to":"X"},{"from":"X","to":"Y"}]';
	}
	
	// Order-independent DAG comparison: the stored edge array order is interaction-dependent,
	// so a strict string compare would mis-score a correct two-edge diagram entered in a different order.
	function dagMatches(answer, correct) {
		try {
			const norm = s => JSON.parse(s).map(e => e.from + '>' + e.to).sort().join(',');
			return norm(answer) === norm(correct);
		} catch (e) {
			return false;
		}
	}

	// --- DAG payments for subjDAG0, subjDAG1, subjDAG2 ---
	for (let idx = 0; idx <= 2; idx++) {
		const subjDAG_answer = Qualtrics.SurveyEngine.getEmbeddedData('subjDAG' + idx + '_' + id);
		const dagPayment = dagMatches(subjDAG_answer, correctDAG) ? beliefPaymentMax : 0;
		verbalPayments.push(dagPayment);
		console.log('subjDAG' + idx + ' - Answer:', subjDAG_answer, 'Correct:', correctDAG, 'Payment:', dagPayment);
	}
	
	// --- Confidence DAG payments for dagConfidence1, dagConfidence2 ---
	for (let idx = 1; idx <= 2; idx++) {
		const confidenceDAG = parseFloat(Qualtrics.SurveyEngine.getEmbeddedData('dagConfidence' + idx + '_' + id));
		const subjDAG_answer = Qualtrics.SurveyEngine.getEmbeddedData('subjDAG' + idx + '_' + id);
		
		const X = Math.random() * 100;
		let confidenceDAGPayment;
		
		if (X > confidenceDAG) {
			const randomChance = Math.random() * 100;
			confidenceDAGPayment = (randomChance < X) ? beliefPaymentMax : 0;
			console.log('dagConfidence' + idx + ' - X:', X, '> confidence:', confidenceDAG, ', Random chance:', randomChance, ', Payment:', confidenceDAGPayment);
		} else {
			confidenceDAGPayment = dagMatches(subjDAG_answer, correctDAG) ? beliefPaymentMax : 0;
			console.log('dagConfidence' + idx + ' - X:', X, '<= confidence:', confidenceDAG, ', DAG correct:', dagMatches(subjDAG_answer, correctDAG), ', Payment:', confidenceDAGPayment);
		}
		
		verbalPayments.push(confidenceDAGPayment);
	}
	
	Qualtrics.SurveyEngine.setEmbeddedData('verbalPayment_' + id, JSON.stringify(verbalPayments));
	console.log('Verbal Payments:', verbalPayments);
	jQuery("#NextButton").click();
});
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
});