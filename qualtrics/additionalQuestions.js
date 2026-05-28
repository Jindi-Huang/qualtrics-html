Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    var id = parseInt("${e://Field/id}");
    var completed = false;
    var currentParticipantId = '${e://Field/PROLIFIC_PID}';
    var currentGameId = 'additionalQuestions';
    var playerName0 = '${e://Field/playerName0}';
    var playerName1 = '${e://Field/playerName1}';
    var playerName2Pos = '${e://Field/playerName2Pos}';
    var playerName2 = '${e://Field/playerName2}';
    var playerPronoun2 = '${e://Field/playerPronoun2}';
    var playerIcon0 = '${e://Field/playerIcon0}';
    var nRounds = '${e://Field/nRounds}';
    var gameCounter = '${e://Field/gameCounter}';
    var gameVersionsDescriptionOrderDieter1 = '${e://Field/gameVersionsDescriptionOrderDieter1}';
    var gameVersionsDescriptionOrderDieter2 = '${e://Field/gameVersionsDescriptionOrderDieter2}';
    var gameVersionsDescriptionOrderMigraines1 = '${e://Field/gameVersionsDescriptionOrderMigraines1}';
    var gameVersionsDescriptionOrderMigraines2 = '${e://Field/gameVersionsDescriptionOrderMigraines2}';
    var order = '${e://Field/order}';
    var themeColor = '${e://Field/color}';

    function sendInit() {
        var iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'INIT',
                participantId: currentParticipantId,
                gameId: currentGameId,
                gameConfig: {
                    playerName0: playerName0,
                    playerName1: playerName1,
                    playerName2: playerName2,
                    playerName2Pos: playerName2Pos,
                    playerPronoun2: playerPronoun2,
                    playerIcon0: playerIcon0,
                    gameCounter: gameCounter,
                    nRounds: parseInt(nRounds),
                    gameVersionsDescriptionOrderDieter1: gameVersionsDescriptionOrderDieter1,
                    gameVersionsDescriptionOrderDieter2: gameVersionsDescriptionOrderDieter2,
					gameVersionsDescriptionOrderMigraines1: gameVersionsDescriptionOrderMigraines1,
                    gameVersionsDescriptionOrderMigraines2: gameVersionsDescriptionOrderMigraines2,
                    order: order,
                    themeColor: themeColor
                }
            }, '*');
            console.log('Sent INIT to additional-questions iframe');
        }
    }

    var messageHandler = function(event) {
        if (event.data.type !== 'GAME_DATA') return;
        if (completed) return;

        var dataType = event.data.dataType;
        var data = event.data.data;

        console.log('Received:', dataType, data);

        switch (dataType) {
            case 'QUESTIONS_START':
                console.log('Additional questions started');
                break;

            case 'QUESTIONS_COMPLETE':
                Qualtrics.SurveyEngine.setEmbeddedData('dieterPA_' + id, data.dieterPA);
                Qualtrics.SurveyEngine.setEmbeddedData('dieterPX_' + id, data.dieterPX);
                Qualtrics.SurveyEngine.setEmbeddedData('dieterPY_' + id, data.dieterPY);
                Qualtrics.SurveyEngine.setEmbeddedData('dieterSameNo_' + id, data.dieterSameNo);
                Qualtrics.SurveyEngine.setEmbeddedData('dieterSameYes_' + id, data.dieterSameYes);
                Qualtrics.SurveyEngine.setEmbeddedData('dieterVersion_' + id, data.dieterVersion);
				Qualtrics.SurveyEngine.setEmbeddedData('migrainesPAX_' + id, data.migrainesPAX);
                Qualtrics.SurveyEngine.setEmbeddedData('migrainesPAx_' + id, data.migrainesPAx);
				Qualtrics.SurveyEngine.setEmbeddedData('migrainesPX_' + id, data.migrainesPX);
                Qualtrics.SurveyEngine.setEmbeddedData('migrainesPY_' + id, data.migrainesPY);
				Qualtrics.SurveyEngine.setEmbeddedData('migrainesVersion_' + id, data.migrainesVersion);
				Qualtrics.SurveyEngine.setEmbeddedData('configReceivedVerbal_' + id, JSON.stringify(event.data.configReceived ? '1' : '0'));
				Qualtrics.SurveyEngine.setEmbeddedData('additionalAllData_' + id, JSON.stringify(data));

                console.log('Saved all additional question responses');

                completed = true;
                window.removeEventListener('message', messageHandler);
                setTimeout(function() {
                    jQuery("#NextButton").click();
                }, 500);
                break;
        }
    };

    window.addEventListener('message', messageHandler);

    // Lifetime handlers: IFRAME_READY handshake + SCROLL_TO_TOP
    window.addEventListener('message', function(event) {
        if (!event.data) return;

        if (event.data.type === 'IFRAME_READY') {
            sendInit();
        } else if (event.data.type === 'SCROLL_TO_TOP') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Safety net: fire once shortly after load in case IFRAME_READY
    // was posted before this listener attached.
    setTimeout(sendInit, 500);
});