Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
});
Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	
	const basePay = parseFloat("${e://Field/basePay}");
	
	// Get all payment arrays and concatenate them
	let allPayments = [];
	
	// Get payment
	for (let i = 1; i <= 50; i++) {
		try {
			let paymentData = Qualtrics.SurveyEngine.getEmbeddedData('payment_' + i);
			if (paymentData) {
				let payments = JSON.parse(paymentData);
				// Add basePay to each payment in the array
				payments = payments.map(p => p + basePay);
				allPayments = allPayments.concat(payments);
			}
		} catch (error) {
			console.log("Error parsing payment_" + i + ":", error);
		}
	}
	
	// Get payment for high stake choices
	for (let i = 1; i <= 50; i++) {
		try {
			let highStakePaymentData = Qualtrics.SurveyEngine.getEmbeddedData('paymentHighStake_' + i);
			if (highStakePaymentData) {
				let highStakePayments = JSON.parse(highStakePaymentData);
				// Add basePay to each payment in the array
				allPayments = allPayments.concat(highStakePayments);
			}
		} catch (error) {
			console.log("Error parsing highStakePayment_" + i + ":", error);
		}
	}
	
	// Get beliefPayment
	for (let i = 1; i <= 50; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('beliefPayment_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing beliefPayment_" + i + ":", error);
		}
	}

	// Get beliefPaymentRound10 (round-10 in-game belief; verbal payment only)
	for (let i = 1; i <= 50; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('beliefPaymentRound10_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing beliefPaymentRound10_" + i + ":", error);
		}
	}

	// Get beliefPaymentSlider1
	for (let i = 1; i <= 50; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('beliefPaymentSlider1_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing beliefPaymentSlider1_" + i + ":", error);
		}
	}
	
	// Get beliefPaymentSlider2
	for (let i = 1; i <= 50; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('beliefPaymentSlider2_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing beliefPaymentSlider2_" + i + ":", error);
		}
	}
	
	// Get verbalPayment
	for (let i = 1; i <= 50; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('verbalPayment_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing verbalPayment_" + i + ":", error);
		}
	}
	
	console.log("All payments:", allPayments);
	console.log("Total number of payments:", allPayments.length);
	
	// Get riskPayment_1 through riskPayment_2
	for (let i = 1; i <= 2; i++) {
		try {
			let beliefPaymentData = Qualtrics.SurveyEngine.getEmbeddedData('riskPayment_' + i);
			if (beliefPaymentData) {
				let beliefPayments = JSON.parse(beliefPaymentData);
				allPayments = allPayments.concat(beliefPayments);
			}
		} catch (error) {
			console.log("Error parsing riskPayment_" + i + ":", error);
		}
	}
	
	console.log("All payments:", allPayments);
	console.log("Total number of payments:", allPayments.length);
	
	// Save the full (unfiltered) payment pool
	Qualtrics.SurveyEngine.setEmbeddedData('allPaymentsUnfiltered', JSON.stringify(allPayments));

	// Drop null/undefined/NaN payments before random selection (keep genuine 0 payments)
	allPayments = allPayments.filter(p => p != null && !Number.isNaN(p));

	// Save the filtered payment pool (what the random draw selects from)
	Qualtrics.SurveyEngine.setEmbeddedData('allPaymentsFiltered', JSON.stringify(allPayments));

	console.log("Payments after filtering null:", allPayments);
	console.log("Total number of payments after filtering:", allPayments.length);
	
	// Randomly select one payment
	var selectedPayment = allPayments[Math.floor(Math.random() * allPayments.length)];
	
	console.log("Selected payment:", selectedPayment);
	
	// Calculate final payoff
	let payoff = selectedPayment;
	
	console.log("Payment calculation");
	console.log("Base pay:", basePay);
	console.log("Selected payment:", selectedPayment);
	console.log("Final payoff:", payoff);
	
	Qualtrics.SurveyEngine.setEmbeddedData('payoff', payoff);
	Qualtrics.SurveyEngine.setEmbeddedData('bonusPayment', selectedPayment);
	jQuery("#NextButton").click();
});
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
});