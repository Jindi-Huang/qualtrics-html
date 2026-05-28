Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function() {
    var self = this;
    var completed = false;
    var active = true;  // guard flag — flips to false on unload
    
    var currentParticipantId = '${e://Field/PROLIFIC_PID}';
    var nSupergames = '${e://Field/nSupergames}';
    var nRounds = '${e://Field/nRounds}';
    var id = parseInt("${e://Field/id}");
    var currentGameId = 'scenarioReveal_' + id;
    
    function sendInit() {
        if (!active) return;  // don't send if page is gone
        var iframe = document.querySelector('iframe');
        if (!iframe || !iframe.contentWindow) return;
        var shownScenarios = [];
        try {
            shownScenarios = JSON.parse(Qualtrics.SurveyEngine.getEmbeddedData('shownScenarios') || '[]');
        } catch (e) {}
        iframe.contentWindow.postMessage({
            type: 'INIT',
            participantId: currentParticipantId,
            gameId: currentGameId,
            gameConfig: {
                shownScenarios: shownScenarios,
                gameCounter: '${e://Field/gameCounter}',
                playerName0: '${e://Field/playerName0}',
                playerName1: '${e://Field/playerName1}',
                playerIcon0: '${e://Field/playerIcon0}',
                yBonus: parseFloat("${e://Field/yBonus}"),
                aCost: parseFloat("${e://Field/aCost}"),
                currency: "${e://Field/currency}",
                order: "${e://Field/order}",
                themeColor: "${e://Field/color}",
                nRounds: "${e://Field/nRounds}",
				supergame: "${e://Field/supergame}",
            }
        }, '*');
        console.log('Sent INIT to scenarioReveal iframe (gameId=' + currentGameId + ')');
    }
    
    var messageHandler = function(event) {
        if (!active) return;
        if (!event.data || event.data.type !== 'GAME_DATA') return;
        if (completed) return;
        var dataType = event.data.dataType;
        var data = event.data.data;
        console.log('Received:', dataType, data);
        switch (dataType) {
            case 'SCENARIO_REVEALED':
                Qualtrics.SurveyEngine.setEmbeddedData('scenarioIndex', data.scenarioIndex);
                Qualtrics.SurveyEngine.setEmbeddedData('shownScenarios', JSON.stringify(data.shownScenarios));
                Qualtrics.SurveyEngine.setEmbeddedData('currentSymbol', data.tileHTML);
                console.log('Saved scenario:', data.drinkName, data.drinkIcon, data.chemicalName);
                break;
            case 'SCENARIO_COMPLETE':
                completed = true;
                cleanup();
                setTimeout(function() {
                    jQuery("#NextButton").click();
                }, 500);
                break;
        }
    };
    
    var readyHandler = function(event) {
        if (!active) return;
        if (event.data && event.data.type === 'IFRAME_READY') {
            sendInit();
        }
    };
    
    var initTimer = setTimeout(sendInit, 500);
    
    function cleanup() {
        active = false;
        window.removeEventListener('message', messageHandler);
        window.removeEventListener('message', readyHandler);
        if (initTimer) {
            clearTimeout(initTimer);
            initTimer = null;
        }
        console.log('Cleaned up scenarioReveal handlers (gameId=' + currentGameId + ')');
    }
    
    window.addEventListener('message', messageHandler);
    window.addEventListener('message', readyHandler);
    
    // Stash cleanup so addOnUnload can find it
    self._cleanup = cleanup;
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    if (this._cleanup) {
        this._cleanup();
        this._cleanup = null;
    }
});