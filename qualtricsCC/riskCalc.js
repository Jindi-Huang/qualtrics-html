Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
});
Qualtrics.SurveyEngine.addOnReady(function() {
    const id = Qualtrics.SurveyEngine.getEmbeddedData('riskID');
	const yBonus = parseFloat("${e://Field/yBonus}");
	const pX_A0 = parseFloat("${e://Field/pX_A0}");
	const bonus = parseFloat("${e://Field/cost}");
	const basePay = parseFloat("${e://Field/basePay}");
	
	// Probabilities (out of 100) for Q1 to Q11 when choosing option 2
	const pX_A1 = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
	
	// Array to store payments
	const riskPayments = [];
	
	// Loop through riskQ1 to riskQ11
	for (let i = 1; i <= 11; i++) {
		// Get the answer from embedded data
		const answerRaw = Qualtrics.SurveyEngine.getEmbeddedData('riskQ' + i + '_' + id);
		
		// Parse the answer - it's stored as "['1']" or "['2']"
		let choice;
		if (!answerRaw) {
			console.log('riskQ' + i + ' - Missing answer');
		} else if (answerRaw.includes('1')) {
			choice = 1;
		} else if (answerRaw.includes('2')) {
			choice = 2;
		}
		
		// Draw a random integer between 1 and 100
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		
		let payment = 0;
		
		if (choice === 1) {
			// Choice ['1']: get yBonus if random <= pX_A0.
			if (randomNumber <= pX_A0) {
				payment = yBonus;
			} else {
				payment = 0;
			}
		} else if (choice === 2) {
			// Choice ['2']: always receive bonus, get yBonus if random <= pX_A1[i-1].
			if (randomNumber <= pX_A1[i - 1]) {
				payment = yBonus + bonus;
			} else {
				payment = bonus;
			}
		}
		
		
		riskPayments.push(payment+basePay);
		console.log('riskQ' + i + ' - Choice:', choice, 'Random:', randomNumber, 'Payment:', payment);
	}
	
	// Save the payment array to embedded data
	Qualtrics.SurveyEngine.setEmbeddedData('riskPayment_' + id, JSON.stringify(riskPayments));
	console.log('Risk Payments:', riskPayments);
	
	jQuery("#NextButton").click();
});
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
});
