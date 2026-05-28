Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    var elicitCompleted = false;

    var id = parseInt("${e://Field/id}");

    var gameConfig = {
        id: id,
        playerName0: "${e://Field/playerName0}",
        playerName1: "${e://Field/playerName1}",
        playerIcon0: "${e://Field/playerIcon0}",
        playerName2Pos: "${e://Field/playerName2Pos}",
        playerName2Neg: "${e://Field/playerName2Neg}",
        playerName2PosExo: "${e://Field/playerName2PosExo}",
        playerName2NegExo: "${e://Field/playerName2NegExo}",
        order: "${e://Field/order}",
        aCost: parseFloat("${e://Field/aCost}"),
        beliefPaymentMax: parseFloat("${e://Field/beliefPaymentMax}"),
        beliefPaymentIncentive: parseFloat("${e://Field/beliefPaymentIncentive}"),
        increasingOrder: parseInt("${e://Field/increasingOrder}"),
        rationalInference: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("rationalInference_" + id)),
        mainCausal1: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal1")),
        mainCausal2: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal2")),
        mainCausal3: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal3")),
        mainCausal4: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal4")),
        mainCausal5: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal5")),
        mainCausal6: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal6")),
        mainCausal7: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal7")),
        mainCausal8: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal8")),
        mainCausal9: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal9")),
        mainCausal10: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal10")),
        mainCausal11: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausal11")),
		mainCausalMigraines1: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines1")),
        mainCausalMigraines2: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines2")),
        mainCausalMigraines3: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines3")),
        mainCausalMigraines4: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines4")),
        mainCausalMigraines5: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines5")),
        mainCausalMigraines6: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines6")),
        mainCausalMigraines7: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines7")),
        mainCausalMigraines8: JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData("mainCausalMigraines8")),
        themeColor: "${e://Field/color}",
		supergame: "${e://Field/supergame}",
    };

    console.log("Belief elicitation configuration for ID " + id + ":", gameConfig);

    var currentGameId = "beliefElicit_" + id;
    var currentParticipantId = "${e://Field/PROLIFIC_PID}";

    function sendInit() {
        var iframe = document.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: "INIT",
                participantId: currentParticipantId,
                surveyId: "${e://Field/STUDY_ID}",
                gameConfig: gameConfig,
                gameId: currentGameId
            }, "*");
            console.log("Sent INIT to belief elicitation iframe");
        }
    }

    var messageHandler = (function(gameId, participantId) {
        return function(event) {
            if (event.data.type !== "GAME_DATA") return;
            if (elicitCompleted) return;

            if (event.data.participantId && event.data.participantId !== participantId) {
                console.log("Ignoring message for different participant:", event.data.participantId);
                return;
            }

            if (event.data.gameId && event.data.gameId !== gameId) {
                console.log("Ignoring message for different game:", event.data.gameId);
                return;
            }

            var dataType = event.data.dataType;
            var data = event.data.data;

            console.log("Received from participant " + participantId + ", game ID " + gameId + ":", dataType, data);

            switch (dataType) {
                case "ELICIT_START":
                    console.log("Belief elicitation started for participant " + participantId);
                    break;

                case "CAUSAL_BELIEFS":
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefHistory_" + id, JSON.stringify(data.beliefHistory));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefRoundTimes_" + id, JSON.stringify(data.beliefRoundTimes));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefPayment_" + id, JSON.stringify(data.beliefPayment));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefPaymentSlider1_" + id, JSON.stringify(data.beliefPaymentSlider1));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefPaymentSlider2_" + id, JSON.stringify(data.beliefPaymentSlider2));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefCorrectAnswer_" + id, JSON.stringify(data.beliefCorrectAnswer));
                    Qualtrics.SurveyEngine.setEmbeddedData("slider1Values_" + id, JSON.stringify(data.pie1Values));
                    Qualtrics.SurveyEngine.setEmbeddedData("slider2Values_" + id, JSON.stringify(data.pie2Values));
                    Qualtrics.SurveyEngine.setEmbeddedData("beliefs_" + id, JSON.stringify(data.verbalValues));
					Qualtrics.SurveyEngine.setEmbeddedData('configReceivedBeliefs_' + id, JSON.stringify(event.data.configReceived ? '1' : '0'));
					Qualtrics.SurveyEngine.setEmbeddedData('beliefAllData_' + id, JSON.stringify(data));

                    console.log("Saved belief data for participant " + participantId + ", ID:", id);
                    break;

                case "ELICIT_COMPLETE":
                    elicitCompleted = true;
                    console.log("Belief elicitation completed for participant " + participantId + ", ID:", id);

                    window.removeEventListener("message", messageHandler);

                    setTimeout(function() {
                        jQuery("#NextButton").click();
                    }, 1000);
                    break;
            }
        };
    })(currentGameId, currentParticipantId);

    window.addEventListener("message", messageHandler);

    // Lifetime handlers: IFRAME_READY handshake + SCROLL_TO_TOP
    window.addEventListener("message", function(event) {
        if (!event.data) return;

        if (event.data.type === "IFRAME_READY") {
            sendInit();
        } else if (event.data.type === "SCROLL_TO_TOP") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // Safety net: fire once shortly after load in case IFRAME_READY
    // was posted before this listener attached.
    setTimeout(sendInit, 500);
});