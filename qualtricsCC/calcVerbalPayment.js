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
	const supergame = Qualtrics.SurveyEngine.getEmbeddedData('supergame');

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

	const verbalPayments = [];

	if (supergame === 'migraines') {
		// ---- Migraines additional-question payments ----
		// The answers are stored as 0-9 band indices (PERCENTAGE_OPTIONS.indexOf in
		// additionalQuestionsV4), while percentageToCategory returns 1-10, so the benchmark
		// must be shifted to a 0-9 band index (category - 1) before comparing.
		// Questions hidden by the exo_X gate are stored as null and are skipped.
		const migVars = ['migrainesPAX', 'migrainesPAx', 'migrainesPX', 'migrainesPY'];
		for (let i = 0; i < migVars.length; i++) {
			const varName = migVars[i];
			const raw = Qualtrics.SurveyEngine.getEmbeddedData(varName + '_' + id);
			if (raw === null || raw === '' || raw === 'null') continue;   // not shown / unanswered
			const userAnswer = parseInt(raw);                             // 0-9 band index
			if (isNaN(userAnswer)) continue;
			const correctValue = rationalInference[varName];
			const correctCategory = percentageToCategory(correctValue);   // 1-10, or null if benchmark missing
			let payment;
			if (correctCategory === null) {
				payment = beliefPaymentMax;                               // no benchmark -> full payment
			} else {
				const correctIndex = correctCategory - 1;                 // 0-9 to match the stored answer
				const difference = Math.abs(correctIndex - userAnswer);
				payment = beliefPaymentMax - (difference * beliefPaymentIncentive);
			}
			verbalPayments.push(payment);
			console.log('[migraines] ' + varName + ' - Correct:', correctValue, 'Answer(idx):', userAnswer, 'Payment:', payment);
		}
	} else {
		// ---- Dieter additional-question payments (unchanged) ----
		const verbalVariables = ['dieterPA', 'dieterPX', 'dieterPY', 'dieterSameYes', 'dieterSameNo'];
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
	}

	// --- Correct DAG (differs by supergame; same across the elicitations within a supergame) ---
	const causal = parseInt("${e://Field/causal}");
	let correctDAG;
	if (supergame === 'migraines') {
		// Migraines temporal order: craving (X) -> decision (A) -> feeling (Y), so A->X is impossible.
		// >>> VERIFY THESE EDGES against your intended correct migraines DAG before relying on payment <<<
		//   causal 0 (confounded, drinking has NO effect): feeling drives the craving signal, which
		//            drives the choice  => Y->X, X->A   (the A<->Y correlation is spurious)
		//   causal 1 (chain): craving drives the choice, and drinking affects feeling => X->A, A->Y
		if (causal == 0) {
			correctDAG = '[{"from":"Y","to":"X"},{"from":"X","to":"A"}]';
		} else if (causal == 1) {
			correctDAG = '[{"from":"X","to":"A"},{"from":"A","to":"Y"}]';
		}
	} else {
		// Dieter (unchanged): temporal order A -> X -> Y
		if (causal == 0) {
			correctDAG = '[{"from":"A","to":"X"},{"from":"Y","to":"X"}]';
		} else if (causal == 1) {
			correctDAG = '[{"from":"A","to":"X"},{"from":"X","to":"Y"}]';
		}
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

	// A DAG that was never drawn (e.g. the in-game DAG is skipped for order 'AY') is stored as
	// null/empty; skip it so it does not inject a spurious $0 into the payment lottery.
	function dagCollected(answer) {
		return answer !== null && answer !== '' && answer !== 'null' && answer !== 'undefined';
	}

	// --- DAG payments for subjDAG0, subjDAG1, subjDAG2 ---
	for (let idx = 0; idx <= 2; idx++) {
		const subjDAG_answer = Qualtrics.SurveyEngine.getEmbeddedData('subjDAG' + idx + '_' + id);
		if (!dagCollected(subjDAG_answer)) continue;   // not drawn -> not scored
		const dagPayment = dagMatches(subjDAG_answer, correctDAG) ? beliefPaymentMax : 0;
		verbalPayments.push(dagPayment);
		console.log('subjDAG' + idx + ' - Answer:', subjDAG_answer, 'Correct:', correctDAG, 'Payment:', dagPayment);
	}

	// --- Confidence DAG payments for dagConfidence1, dagConfidence2 (BDM) ---
	for (let idx = 1; idx <= 2; idx++) {
		const subjDAG_answer = Qualtrics.SurveyEngine.getEmbeddedData('subjDAG' + idx + '_' + id);
		const confidenceRaw = Qualtrics.SurveyEngine.getEmbeddedData('dagConfidence' + idx + '_' + id);
		if (!dagCollected(subjDAG_answer)) continue;   // no DAG for this confidence -> not scored
		const confidenceDAG = parseFloat(confidenceRaw);
		if (isNaN(confidenceDAG)) continue;            // confidence not collected -> not scored

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
