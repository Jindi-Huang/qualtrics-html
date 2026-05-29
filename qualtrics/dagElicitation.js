Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    var completed = false;
    var id = parseInt("${e://Field/id}");

    function sendInit() {
        var iframe = document.getElementById('dietersGame');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'INIT',
                gameConfig: {
                    playerName0: "${e://Field/playerName0}",
                    playerName1: "${e://Field/playerName1}",
                    playerIcon0: "${e://Field/playerIcon0}",
                    noConfirmation: 1,
                    themeColor: "${e://Field/color}",
					supergame: "${e://Field/supergame}",
					aOnLeftDAG: "${e://Field/aOnLeftDAG}",
					beliefPaymentMax: parseFloat("${e://Field/beliefPaymentMax}"),
                }
            }, '*');
            console.log('Sent INIT to DAG iframe');
        }
    }

    var messageHandler = function(event) {
        var data = event.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'DAG_DATA' && data.dataType === 'DAG_COMPLETE') {
            if (completed) return;
            completed = true;

            var dagData = data.data;

            Qualtrics.SurveyEngine.setEmbeddedData('subjDAG2_' + id, JSON.stringify(dagData.initialDAG));
            Qualtrics.SurveyEngine.setEmbeddedData('dagConfidence2_' + id, dagData.confidence);
            Qualtrics.SurveyEngine.setEmbeddedData('DAGAlertCount2_' + id, dagData.DAGAlertCount);
            Qualtrics.SurveyEngine.setEmbeddedData('subjDAGTime2_' + id, JSON.stringify(dagData.initialDAGTime));
            Qualtrics.SurveyEngine.setEmbeddedData('dagConfidenceTime2_' + id, JSON.stringify(dagData.confidenceTime));
            Qualtrics.SurveyEngine.setEmbeddedData('dagShowDetailsViewed2_' + id, JSON.stringify(dagData.showDetailsViewed));
			Qualtrics.SurveyEngine.setEmbeddedData('configReceivedDAG_' + id, JSON.stringify(event.data.configReceived ? '1' : '0'));
			Qualtrics.SurveyEngine.setEmbeddedData('dagAllData_' + id, JSON.stringify(data));


            console.log('DAG saved:', dagData);

            window.removeEventListener('message', messageHandler);
            setTimeout(function() {
                jQuery("#NextButton").click();
            }, 500);
        }
    };

    window.addEventListener('message', messageHandler);

    // Lifetime handler: IFRAME_READY handshake
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'IFRAME_READY') {
            sendInit();
        }
    });

    // Safety net in case IFRAME_READY was posted before this listener attached.
    setTimeout(sendInit, 500);
});