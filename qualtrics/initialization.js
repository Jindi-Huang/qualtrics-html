Qualtrics.SurveyEngine.addOnReady(function() {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
   
	
	const noiseLow = 0.05;
	const noiseHigh = 0.4;

	const configsDieter = {
		endog: [
			{"id": 1, "causal": 0, "beta00": noiseLow, "beta01": 1-noiseLow, "beta10": 1-noiseLow, "beta11": 1-noiseLow, "pY": 0.3, "linkfn": "OR", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 3, "causal": 0, "beta00": noiseHigh, "beta01": 1-noiseHigh, "beta10": 1-noiseHigh, "beta11": 1-noiseHigh, "pY": 0.3, "linkfn": "OR", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 5, "causal": 0, "beta00": noiseLow, "beta01": noiseLow, "beta10": noiseLow, "beta11": 1-noiseLow, "pY": 0.7, "linkfn": "AND", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 7, "causal": 0, "beta00": noiseHigh, "beta01": noiseHigh, "beta10": noiseHigh, "beta11": 1-noiseHigh, "pY": 0.7, "linkfn": "AND", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 9, "causal": 1, "sigma0": 0.320, "sigma1": 0.950, "rho0": 0.035, "rho1": 0.498, "linkfn": "OR", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 11, "causal": 1,  "sigma0": 0.460, "sigma1": 0.600, "rho0": 0.263, "rho1": 0.331, "linkfn": "OR", "order": "AXY", "treatment": "endog", "game": "dieter"},
			{"id": 13, "causal": 0, "beta00": noiseLow, "beta01": 1-noiseLow, "beta10": 1-noiseLow, "beta11": 1-noiseLow, "pY": 0.3, "linkfn": "OR", "order": "AYX", "treatment": "endog", "game": "dieter"},
			{"id": 15, "causal": 0, "beta00": noiseHigh, "beta01": 1-noiseHigh, "beta10": 1-noiseHigh, "beta11": 1-noiseHigh, "pY": 0.3, "linkfn": "OR", "order": "AYX", "treatment": "endog", "game": "dieter"},
			{"id": 41, "causal": 1, "sigma0": 0, "sigma1": 1, "rho0": 0.3, "rho1": 0.9, "linkfn": "OR", "order": "AY", "treatment": "endog", "game": "dieter"},
			{"id": 43, "causal": 1, "sigma0": 0, "sigma1": 1, "rho0": 0.3, "rho1": 0.55, "linkfn": "OR", "order": "AY", "treatment": "endog", "game": "dieter"},
			{"id": 45, "causal": 1, "sigma0": 0, "sigma1": 1, "rho0": 0.3, "rho1": 0.3, "linkfn": "OR", "order": "AY", "treatment": "endog", "game": "dieter"},
		]
	};

	const configsMigraines = {
		endog: [
			{ "id": 21, "causal": 0, "pX_y": 0.9, "pX_Y": 0.4, "pY": 0.5, "treatment": "endog", "game": "migraines"},
			{"id": 23, "causal": 0, "pX_y": 0.675, "pX_Y": 0.625, "pY": 0.5, "treatment": "endog", "game": "migraines"},
			{ "id": 25, "causal": 1, "pX": 0.65, "pY_A": 0.427, "pY_a": 0.615, "treatment": "endog", "game": "migraines"},
			{"id": 27, "causal": 1, "pX": 0.65, "pY_A": 0.496, "pY_a": 0.510, "treatment": "endog", "game": "migraines"}
		]
	};

	// Get the experiment value from embedded data
	const experiment = Qualtrics.SurveyEngine.getEmbeddedData('experiment');
	console.log(experiment);

	// Helper function to select items by ID and shuffle them
	function selectAndShuffleByIds(arrays, ids) {
		// Map over ids (not the source) so repeated ids (e.g. [3,3] noise-benchmark groups) yield duplicates.
		const selected = ids.map(targetId => arrays.find(item => item.id === targetId)).filter(Boolean);
		return shuffle([...selected]);
	}

	// Select Dieter configs based on experiment value
	let selectedDieter;
	let selectedMigraines;
	let nSupergames = 2;
	let treatment = "endog";
	let supergame = "dieter";
	

	if (experiment === "EndogDieterOR") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [1, 3]);
	} else if (experiment === "EndogDieterAND") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [5, 7]);
	} else if (experiment === "EndogDieterCausal") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [9, 11]);
	} else if (experiment === "EndogDieterORLowNoise") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [1, 1]);
	} else if (experiment === "EndogDieterORHighNoise") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [3, 3]);
	} else if (experiment === "EndogDieterBinary") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [41, 43, 45]);
		nSupergames = 3;
	} else if (experiment === "EndogDieterRO") {
		selectedDieter = selectAndShuffleByIds(configsDieter["endog"], [13, 15]);
	} else if (experiment === "EndogMigraines") {
		selectedMigraines = selectAndShuffleByIds(configsMigraines["endog"], [21, 23]);
		supergame = "migraines";
	} else if (experiment === "EndogMigrainesLowNoise") {
		selectedMigraines = selectAndShuffleByIds(configsMigraines["endog"], [21, 21]);
		supergame = "migraines";
	} else if (experiment === "EndogMigrainesHighNoise") {
		selectedMigraines = selectAndShuffleByIds(configsMigraines["endog"], [23, 23]);
		supergame = "migraines";
	} else if (experiment === "EndogMigrainesCausal") {
		selectedMigraines = selectAndShuffleByIds(configsMigraines["endog"], [25, 27]);
		supergame = "migraines";
	} 

	
	// Set embedded data for Dieter
	if (selectedDieter) {
		Qualtrics.SurveyEngine.setEmbeddedData('main1', JSON.stringify(selectedDieter[0]));
		Qualtrics.SurveyEngine.setEmbeddedData('main2', JSON.stringify(selectedDieter[1]));
		Qualtrics.SurveyEngine.setEmbeddedData('main3', JSON.stringify(selectedDieter[2] || null));
		console.log(JSON.stringify(selectedDieter[0]));
		console.log(JSON.stringify(selectedDieter[1]));
		console.log(JSON.stringify(selectedDieter[2]));
	}

	// Set embedded data for Migraines
	if (selectedMigraines) {
		Qualtrics.SurveyEngine.setEmbeddedData('main1', JSON.stringify(selectedMigraines[0]));
		Qualtrics.SurveyEngine.setEmbeddedData('main2', JSON.stringify(selectedMigraines[1]));
		Qualtrics.SurveyEngine.setEmbeddedData('main3', JSON.stringify(selectedMigraines[2] || null));
		console.log(JSON.stringify(selectedMigraines[0]));
		console.log(JSON.stringify(selectedMigraines[1]));
	}

	Qualtrics.SurveyEngine.setEmbeddedData('nSupergames', nSupergames);
	Qualtrics.SurveyEngine.setEmbeddedData('treatment', treatment);
	Qualtrics.SurveyEngine.setEmbeddedData('supergame', supergame);
	
	
	   
    let metaNameData;
    
    if (supergame === "dieter") {
        metaNameData = {
            "player0Names": ['Qivaryn-norm', 'Zerqalase-norm', 'Melythor-norm'],
            "player0Icons": ['🥤', '🍵', '🍶'], 
            "player1Names": ['Qivaryn', 'Zerqalase', 'Melythor'],
            "player2Names": [['energetic', 'tired'], ['focused', 'foggy'], ['relaxed', 'stressed']],
            "player2Exos": [['Energenix', 'Somnexil'], ['Focusyn', 'Cloudex'], ['Calmex', 'Anxion']]
        };
    } else if (supergame === "migraines") {
        metaNameData = {
            "player0Names": ['Guzzler', 'Syrupede', 'Megafizz'],
            "player0Icons": ['🥤', '🍵', '🍶'], 
            "player1Names": ['Qivaryn', 'Zerqalase', 'Melythor'],
            "player2Names": [['energetic', 'tired'], ['focused', 'foggy'], ['relaxed', 'stressed']],
            "player2Exos": [['Energenix', 'Somnexil'], ['Focusyn', 'Cloudex'], ['Calmex', 'Anxion']]
    };
	}
    
    // Shuffle indices to keep name/icon pairs together
    const indices = shuffle([0, 1, 2]);
    
    for (let i = 0; i < indices.length; i++) {
        const pairNumber = i + 1;
        const idx = indices[i];
        Qualtrics.SurveyEngine.setEmbeddedData('playerName0_' + pairNumber, metaNameData.player0Names[idx]);
        Qualtrics.SurveyEngine.setEmbeddedData('playerIcon0_' + pairNumber, metaNameData.player0Icons[idx]);
        Qualtrics.SurveyEngine.setEmbeddedData('playerName1_' + pairNumber, metaNameData.player1Names[idx]);
		Qualtrics.SurveyEngine.setEmbeddedData('playerName2Pos_' + pairNumber, metaNameData.player2Names[idx][0]);
		Qualtrics.SurveyEngine.setEmbeddedData('playerName2Neg_' + pairNumber, metaNameData.player2Names[idx][1]);
		Qualtrics.SurveyEngine.setEmbeddedData('playerName2PosExo_' + pairNumber, metaNameData.player2Exos[idx][0]);
		Qualtrics.SurveyEngine.setEmbeddedData('playerName2NegExo_' + pairNumber, metaNameData.player2Exos[idx][1]);
    }

	
	

	const orderList = [0, 0, 0, 0, 1, 1, 1, 1];
	shuffle(orderList);  
	Qualtrics.SurveyEngine.setEmbeddedData('orderList', orderList.join(','));



    
    // Initialize game order
    let gameOrder =  [];
    Qualtrics.SurveyEngine.setEmbeddedData('gameOrder', JSON.stringify(gameOrder));


    
    // Block-randomize order for block mainCausal
    const groups = [
        [
            { causalElicit: "AX", exoButton: 0, id: "AX0"},
            { causalElicit: "AX", exoButton: 1, id: "AX1"},
			{ causalElicit: "AX", exoButton: null, id: "AX"},
        ],
        [
            { causalElicit: "AY", exoButton: 0, id: "AY0"},
            { causalElicit: "AY", exoButton: 1, id: "AY1"},
			{ causalElicit: "AY", exoButton: null, id: "AY"},
        ],
        [
            { causalElicit: "XY", exoButton: 0, id: "XY0"},
            { causalElicit: "XY", exoButton: 1, id: "XY1"},
			{ causalElicit: "XY", exoButton: null, id: "XY"},
        ],
		[
            { causalElicit: "YX", exoButton: 0, id: "YX0"},
            { causalElicit: "YX", exoButton: 1, id: "YX1"},		
        ],
    ];

    // Shuffle groups and each pair inside
    shuffle(groups);
    groups.forEach(shuffle);

    // Flatten and store
    const sequence = groups.flat();
    sequence.forEach((obj, idx) =>
        Qualtrics.SurveyEngine.setEmbeddedData(
            "mainCausal" + (idx + 1),
            JSON.stringify(obj)
        )
    );
	
	
	   // Block-randomize order for block mainCausalMigraines
    const groupsMigraines = [
        [
            { causalElicit: "AY", exoButton: 0, id: "AY0"},
            { causalElicit: "AY", exoButton: 1, id: "AY1"},
        ],
		[
            { causalElicit: "XY", exoButton: 0, id: "XY0"},
            { causalElicit: "XY", exoButton: 1, id: "XY1"},
			{ causalElicit: "XY", exoButton: null, id: "XY"},
			
        ],
		[
            { causalElicit: "YX", exoButton: 0, id: "YX0"},
            { causalElicit: "YX", exoButton: 1, id: "YX1"},
        ],
		[
            { causalElicit: "XA", exoButton: null, id: "XA"},
        ]
    ];

    // Shuffle groups and each pair inside
    shuffle(groupsMigraines);
    groupsMigraines.forEach(shuffle);

    // Flatten and store
    const sequenceMigraines = groupsMigraines.flat();
    sequenceMigraines.forEach((obj, idx) =>
        Qualtrics.SurveyEngine.setEmbeddedData(
            "mainCausalMigraines" + (idx + 1),
            JSON.stringify(obj)
        )
    );
	
	
	// Cost array for causality
	const costArray = [2, 1, 0.5, 0, -0.5, -1, -2];
	Qualtrics.SurveyEngine.setEmbeddedData('costArray', costArray);
	
	// Exogeneous Button Config 
	const buttonConfig = [
		0,0,1,0,0,1,0,0,1,0,
		0,1,0,0,1,0,0,1,0,0,
		1,0,0,1,0,0,1,0,0,1,
		0,0,1,0,0,1,0,0,1,0,
		0,1,0,0,1,0,0,1,0,0,
		1,0,0,1,0,0,1,0,0,1,
		0,1,0,1,0,1,0,1,0,1,
		0,1,0,1,0,1,0,1,0,1,
		0,1,0,1,0,1,0,1,0,1,
		0,1,0,1,0,1,0,1,0,1
	];
	
	Qualtrics.SurveyEngine.setEmbeddedData('buttonConfig', buttonConfig);
	Qualtrics.SurveyEngine.setEmbeddedData('buttonConfigStore', JSON.stringify(buttonConfig));
    
	
	const increasingOrder = Math.random() < 0.5 ? 0 : 1;
    Qualtrics.SurveyEngine.setEmbeddedData('increasingOrder', increasingOrder);
    
    const noChangeFirst = Math.random() < 0.5 ? 0 : 1;
    Qualtrics.SurveyEngine.setEmbeddedData('noChangeFirst', noChangeFirst);
	
	const increasingPrice = Math.random() < 0.5 ? 0 : 1;
    Qualtrics.SurveyEngine.setEmbeddedData('increasingPrice', increasingPrice);
	
	const aOnLeftDAG = Math.random() < 0.5 ? 0 : 1;
    Qualtrics.SurveyEngine.setEmbeddedData('aOnLeftDAG', aOnLeftDAG);
	
	const cravingFirstHS = Math.random() < 0.5 ? 0 : 1;
    Qualtrics.SurveyEngine.setEmbeddedData('cravingFirstHS', cravingFirstHS);
	
	const nRounds = Qualtrics.SurveyEngine.getEmbeddedData('nRounds');
	Qualtrics.SurveyEngine.setEmbeddedData('nRoundsHalf', nRounds/2);
	
	
	const colorPairs = [
    ['#3498db', '#e74c3c'],
    ['#e67e22', '#1abc9c'],
    ['#9b59b6', '#27ae60']
	];
	shuffle(colorPairs);
	const rayPair = shuffle([...colorPairs[0]]);
	const virusPair = shuffle([...colorPairs[1]]);
	Qualtrics.SurveyEngine.setEmbeddedData('colorRay_1', rayPair[0]);
	Qualtrics.SurveyEngine.setEmbeddedData('colorRay_2', rayPair[1]);
	Qualtrics.SurveyEngine.setEmbeddedData('colorVirus_1', virusPair[0]);
	Qualtrics.SurveyEngine.setEmbeddedData('colorVirus_2', virusPair[1]);
	
	const colors = ['blue', 'purple', 'yellow'];
	shuffle(colors);
	Qualtrics.SurveyEngine.setEmbeddedData('color_1', colors[0]);
	Qualtrics.SurveyEngine.setEmbeddedData('color_2', colors[1]);
	Qualtrics.SurveyEngine.setEmbeddedData('color_3', colors[2]);
	
    jQuery("#NextButton").click();
});