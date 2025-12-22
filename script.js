document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        exam1: document.getElementById('exam1'),
        perf1: document.getElementById('perf1'),
        perf2: document.getElementById('perf2'),
        target: document.getElementById('target')
    };

    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const scoreNeededDisplay = document.getElementById('score-needed');

    function validateInput(input) {
        const value = parseFloat(input.value);
        if (value < 0 || value > 100) {
            input.classList.add('invalid');
            return false;
        } else {
            input.classList.remove('invalid');
            return true;
        }
    }

    function calculate() {
        // Collect values
        const v1 = parseFloat(inputs.exam1.value);
        const p1 = parseFloat(inputs.perf1.value);
        const p2 = parseFloat(inputs.perf2.value);
        const t = parseFloat(inputs.target.value);

        // Check if all inputs are present
        if (isNaN(v1) || isNaN(p1) || isNaN(p2) || isNaN(t)) {
            resultSection.classList.remove('visible');
            return;
        }

        // Check validity
        const allValid = Object.values(inputs).every(input => !input.classList.contains('invalid') && input.value !== '');
        
        if (!allValid) return;

        // Formula: (V1 + P1 + P2 + Final) / 4 = Target
        // Final = (Target * 4) - V1 - P1 - P2
        let requiredScore = (t * 4) - v1 - p1 - p2;
        
        // Round to 1 decimal for cleaner look if needed, or integer? 
        // Grades are usually integers, but let's keep 1 decimal precision if inputs are decimals.
        // Assuming integer inputs mostly.
        requiredScore = parseFloat(requiredScore.toFixed(1));

        updateUI(requiredScore);
    }

    function updateUI(score) {
        resultSection.classList.remove('state-impossible', 'state-passed');
        resultSection.classList.add('visible');

        if (score > 100) {
            // Impossible
            resultSection.classList.add('state-impossible');
            resultTitle.textContent = "Mission Impossible";
            resultMessage.textContent = "You need a score higher than 100. Good luck buddy.";
            scoreNeededDisplay.textContent = score;
        } else if (score <= 0) {
            // Already Passed
            resultSection.classList.add('state-passed');
            resultTitle.textContent = "Target Achieved!";
            resultMessage.textContent = "You don't even need to take the exam to reach this average.";
            scoreNeededDisplay.textContent = "PASSED"; // Or "0" but PASSED is cooler
        } else {
            // Normal
            resultTitle.textContent = "Goal Within Reach";
            resultMessage.textContent = "You need to score exactly this to reach your goal.";
            scoreNeededDisplay.textContent = score;
        }
    }

    // Attach listeners
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', (e) => {
            validateInput(e.target);
            calculate();
        });
    });
});
