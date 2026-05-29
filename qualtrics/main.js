Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    var gameCompleted = false;

    // Collect configuration from embedded data
    const gameConfig = {
        nRounds: parseInt("${e://Field/nRounds}"),
        id: parseInt("${e://Field/id}"),
        yBonus: parseFloat("${e://Field/yBonus}"),
        aCost: parseFloat("${e://Field/aCost}"),
        currency: "${e://Field/currency}",
        pY: parseFloat("${e://Field/pY}"),
        playerName0: "${e://Field/playerName0}",
        playerName1: "${e://Field/playerName1}",
        playerName2: "${e://Field/playerName2}",
        beta00: parseFloat("${e://Field/beta00}"),
        beta01: parseFloat("${e://Field/beta01}"),
        beta10: parseFloat("${e://Field/beta10}"),
        beta11: parseFloat("${e://Field/beta11}"),
        sigma0: parseFloat("${e://Field/sigma0}"),
        sigma1: parseFloat("${e://Field/sigma1}"),
        rho0: parseFloat("${e://Field/rho0}"),
        rho1: parseFloat("${e://Field/rho1}"),
		pX_Y: parseFloat("${e://Field/pX_Y}"),
		pX_y: parseFloat("${e://Field/pX_y}"),
		pX: parseFloat("${e://Field/pX}"),
		pY_A: parseFloat("${e://Field/pY_A}"),
		pY_a: parseFloat("${e://Field/pY_a}"),
        causal: parseInt("${e://Field/causal}"),
        playerIcon0: "${e://Field/playerIcon0}",
        playerIcon2: "${e://Field/playerIcon2}",
        playerName2Pos: "${e://Field/playerName2Pos}",
        playerName2Neg: "${e://Field/playerName2Neg}",
        playerName2PosExo: "${e://Field/playerName2PosExo}",
        playerName2NegExo: "${e://Field/playerName2NegExo}",
        treatment: "${e://Field/treatment}",
        pA: parseFloat("${e://Field/pA}"),
        order: "${e://Field/order}",
        buttonConfig: Qualtrics.SurveyEngine.getEmbeddedData('buttonConfig'),
        currentSymbol: Qualtrics.SurveyEngine.getEmbeddedData('currentSymbol'),
        increasingPrice: "${e://Field/increasingPrice}",
        themeColor: "${e://Field/color}",
		supergame: "${e://Field/supergame}",
		aOnLeftDAG: "${e://Field/aOnLeftDAG}",
		cravingFirstHS: "${e://Field/cravingFirstHS}",
		noChangeFirst: "${e://Field/noChangeFirst}",
		increasingOrder: "${e://Field/increasingOrder}"
    };

    console.log('Game configuration for ID ' + gameConfig.id + ':', gameConfig);

    const currentGameId = gameConfig.id;
    const currentParticipantId = '${e://Field/PROLIFIC_PID}';

    // ---- Send INIT to the game iframe ----
    function sendInit() {
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'INIT',
                participantId: currentParticipantId,
                surveyId: '${e://Field/STUDY_ID}',
                gameConfig: gameConfig,
                gameId: currentGameId
            }, '*');
            console.log('Sent INIT to iframe for game ' + currentGameId);
        }
    }

    // ---- GAME_DATA handler (per-game, removed on GAME_COMPLETE) ----
    var messageHandler = (function(gameId, participantId) {
        return function(event) {
            if (event.data.type === 'GAME_DATA') {
                if (gameCompleted) return;

                if (event.data.participantId && event.data.participantId !== participantId) {
                    console.log('Ignoring message for different participant:', event.data.participantId);
                    return;
                }
                if (event.data.gameId && event.data.gameId !== gameId) {
                    console.log('Ignoring message for different game:', event.data.gameId);
                    return;
                }

                const dataType = event.data.dataType;
                const data = event.data.data;

                console.log('Received from participant ' + participantId + ', game ID ' + gameId + ':', dataType, data);

                switch (dataType) {
                    case 'GAME_START':
                        console.log('Game ' + gameId + ' started for participant ' + participantId);
                        break;

                    case 'FINAL_DATA':
                        Qualtrics.SurveyEngine.setEmbeddedData('history_' + gameId, JSON.stringify(data.history));
                        console.log(data.history);
                        Qualtrics.SurveyEngine.setEmbeddedData('roundTimes_' + gameId, JSON.stringify(data.roundTimes));
                        console.log(data.roundTimes);
                        Qualtrics.SurveyEngine.setEmbeddedData('payment_' + gameId, JSON.stringify(data.payment));
                        Qualtrics.SurveyEngine.setEmbeddedData('subjDAG0_' + gameId, JSON.stringify(data.dagInitial));
                        Qualtrics.SurveyEngine.setEmbeddedData('subjDAG1_' + gameId, JSON.stringify(data.dagFinal));
                        Qualtrics.SurveyEngine.setEmbeddedData('dagConfidence1_' + gameId, JSON.stringify(data.dagConfidence));
                        Qualtrics.SurveyEngine.setEmbeddedData('DAGAlertCount0_' + gameId, JSON.stringify(data.DAGAlertCount));
                        Qualtrics.SurveyEngine.setEmbeddedData('subjDAGTime0_' + gameId, JSON.stringify(data.initialDAGTime));
                        Qualtrics.SurveyEngine.setEmbeddedData('subjDAGTime1_' + gameId, JSON.stringify(data.finalDAGTime));
                        Qualtrics.SurveyEngine.setEmbeddedData('dagConfidenceTime1_' + gameId, JSON.stringify(data.confidenceTime));
                        Qualtrics.SurveyEngine.setEmbeddedData('dagShowDetailsViewed1_' + gameId, JSON.stringify(data.dagShowDetailsViewed));
                        Qualtrics.SurveyEngine.setEmbeddedData('tracking_' + gameId, JSON.stringify(data.tracking));
                        Qualtrics.SurveyEngine.setEmbeddedData('highStake_' + gameId, JSON.stringify(data.priceElicitation));
                        Qualtrics.SurveyEngine.setEmbeddedData('paymentHighStake_' + gameId, JSON.stringify(data.paymentHighStake));
                        Qualtrics.SurveyEngine.setEmbeddedData('highStakeLog_' + gameId, JSON.stringify(data.highStakeLog));
                        Qualtrics.SurveyEngine.setEmbeddedData('beliefRound10_' + gameId, JSON.stringify(data.beliefData));
                        Qualtrics.SurveyEngine.setEmbeddedData('beliefDetailsClickedRound10_' + gameId, JSON.stringify(data.beliefData ? data.beliefData.detailsClicked : null));
						Qualtrics.SurveyEngine.setEmbeddedData('rationalInferenceRound10_' + gameId, JSON.stringify(data.rationalInferenceRound10));
						Qualtrics.SurveyEngine.setEmbeddedData('beliefPaymentRound10_' + gameId, JSON.stringify(data.beliefPaymentRound10));
						Qualtrics.SurveyEngine.setEmbeddedData('configReceivedMain_' + gameId, JSON.stringify(event.data.configReceived ? '1' : '0'));
						Qualtrics.SurveyEngine.setEmbeddedData('mainAllData_' + gameId, JSON.stringify(data));
						

                        console.log('Saved data for participant ' + participantId + ', game ID:', gameId);
                        break;

                    case 'GAME_COMPLETE':
                        gameCompleted = true;
                        console.log('Game ' + gameId + ' completed for participant ' + participantId);

                        window.removeEventListener('message', messageHandler);

                        setTimeout(function() {
                            jQuery("#NextButton").click();
                        }, 1000);
                        break;
                }
            }
        };
    })(currentGameId, currentParticipantId);

    window.addEventListener('message', messageHandler);

    // ---- Lifetime handlers: IFRAME_READY (handshake) + SCROLL_TO_TOP ----
    window.addEventListener('message', function(event) {
        if (!event.data) return;

        if (event.data.type === 'IFRAME_READY') {
            // Iframe has loaded and attached its listener — safe to send INIT.
            // Also fires on iframe refresh, which the bare setTimeout misses.
            sendInit();
        } else if (event.data.type === 'SCROLL_TO_TOP') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Belt-and-suspenders: fire once shortly after load in case IFRAME_READY
    // was posted before this listener attached (very fast iframe loads).
    setTimeout(sendInit, 500);
});