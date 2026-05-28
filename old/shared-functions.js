// Progress indicator functions
function updateProgressIndicator() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        const progressPercent = ((currentChoiceIndex + 1) / gameConfig.costArray.length) * 100;
        progressFill.style.width = progressPercent + '%';
        progressText.textContent = `${currentChoiceIndex + 1}/${gameConfig.costArray.length}`;
    }
}

// Choice row creation
function createChoiceRow(index, costValue) {
    const choiceContainer = document.getElementById('choiceContainer');
    
    const choiceRow = document.createElement('div');
    choiceRow.className = 'choice-row';
    choiceRow.setAttribute('data-choice', index);
    
    choiceRow.innerHTML = `
        <div class="choice-content">
            <div class="cost-display">Cost: ${costValue}</div>
            <div class="button-container">
                <button class="choice-btn yes-btn" onclick="handleChoice(${index}, 'y')">Yes</button>
                <button class="choice-btn no-btn" onclick="handleChoice(${index}, 'n')">No</button>
            </div>
        </div>
    `;
    
    choiceContainer.appendChild(choiceRow);
}

// Button selection updates
function updateButtonSelection(choiceIndex, decision) {
    const row = document.querySelector(`[data-choice="${choiceIndex}"]`);
    const yesBtn = row.querySelector('.yes-btn');
    const noBtn = row.querySelector('.no-btn');
    
    yesBtn.classList.remove('selected');
    noBtn.classList.remove('selected');
    
    if (decision === 'y') {
        yesBtn.classList.add('selected');
    } else {
        noBtn.classList.add('selected');
    }
}

// Validation functions
function checkForInvalidSwitch() {
    if (gameConfig.increasingOrder === 1) {
        // When increasingOrder = 1, check for switches from left to right (n to y)
        for (let i = 1; i <= currentChoiceIndex; i++) {
            if (choices[i-1] === 'n' && choices[i] === 'y') {
                return true;
            }
        }
    } else {
        // When increasingOrder = 0, check for switches from right to left (y to n)
        for (let i = 1; i <= currentChoiceIndex; i++) {
            if (choices[i-1] === 'y' && choices[i] === 'n') {
                return true;
            }
        }
    }
    return false;
}

function highlightInvalidSwitch() {
    document.querySelectorAll('.choice-row').forEach(row => {
        row.classList.remove('invalid');
    });
    
    if (gameConfig.increasingOrder === 1) {
        // When increasingOrder = 1, highlight switches from left to right (n to y)
        for (let i = 1; i <= currentChoiceIndex; i++) {
            if (choices[i-1] === 'n' && choices[i] === 'y') {
                document.querySelector(`[data-choice="${i-1}"]`).classList.add('invalid');
                document.querySelector(`[data-choice="${i}"]`).classList.add('invalid');
            }
        }
    } else {
        // When increasingOrder = 0, highlight switches from right to left (y to n)
        for (let i = 1; i <= currentChoiceIndex; i++) {
            if (choices[i-1] === 'y' && choices[i] === 'n') {
                document.querySelector(`[data-choice="${i-1}"]`).classList.add('invalid');
                document.querySelector(`[data-choice="${i}"]`).classList.add('invalid');
            }
        }
    }
}

function showInvalidSwitchWarning() {
    const validationMessage = document.getElementById('validationMessage');
    validationMessage.textContent = "Warning: You chose an option when it cost more, but not when it cost less. You can still change your earlier choices by clicking on them.";
    validationMessage.className = 'validation-message validation-error';
    validationMessage.style.display = 'block';
    highlightInvalidSwitch();
}

function hideValidationMessage() {
    const validationMessage = document.getElementById('validationMessage');
    validationMessage.style.display = 'none';
    document.querySelectorAll('.choice-row').forEach(row => {
        row.classList.remove('invalid');
    });
}

// Phase transition functions
function showDecisionPhase() {
    const gamePhase = document.getElementById('gamePhase');
    const decisionPhase = document.getElementById('decisionPhase');
    
    if (gamePhase) gamePhase.style.display = 'none';
    if (decisionPhase) decisionPhase.style.display = 'block';
}

// Navigation functions
function enableNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.disabled = false;
        nextButton.style.opacity = '1';
    }
}

function disableNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.disabled = true;
        nextButton.style.opacity = '0.5';
    }
}

// Data submission functions
function submitData(data) {
    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({
            type: 'qualtrics-response',
            data: data
        }, '*');
    }
}