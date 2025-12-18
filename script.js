document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const heightUnitLabel = document.getElementById('heightUnitLabel');
    const weightUnitLabel = document.getElementById('weightUnitLabel');
    
    const resultContainer = document.getElementById('resultContainer');
    const bmiValueEl = document.getElementById('bmiValue');
    const bmiCategoryEl = document.getElementById('bmiCategory');
    const idealWeightEl = document.getElementById('idealWeightRange');
    const bmiIndicator = document.getElementById('bmiIndicator');
    
    const historySection = document.getElementById('historySection');
    const lastMeasurementEl = document.getElementById('lastMeasurement');

    // Modal elements
    const modalOverlay = document.getElementById('modalOverlay');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    let isMetric = true;

    // Load last measurement
    loadLastMeasurement();

    // Modal close handlers
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Unit Toggle Listeners
    metricBtn.addEventListener('click', () => {
        if (!isMetric) {
            isMetric = true;
            metricBtn.classList.add('active');
            imperialBtn.classList.remove('active');
            updateUnitUI();
        }
    });

    imperialBtn.addEventListener('click', () => {
        if (isMetric) {
            isMetric = false;
            imperialBtn.classList.add('active');
            metricBtn.classList.remove('active');
            updateUnitUI();
        }
    });

    // Form Submission
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateInputs()) {
            calculateBMI();
        }
    });

    function updateUnitUI() {
        if (isMetric) {
            heightInput.placeholder = "Enter height";
            heightInput.min = "50";
            heightInput.max = "250";
            heightUnitLabel.textContent = "(cm)";
            
            weightInput.placeholder = "Enter weight";
            weightUnitLabel.textContent = "(kg)";
        } else {
            heightInput.placeholder = "Enter height";
            heightInput.min = "20";
            heightInput.max = "100";
            heightUnitLabel.textContent = "(in)";
            
            weightInput.placeholder = "Enter weight";
            weightUnitLabel.textContent = "(lbs)";
        }
        
        // Clear previous results on unit switch to avoid confusion
        resetResult();
    }

    function validateInputs() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || height <= 0) {
            showModal("Please enter a valid height greater than 0.", "warning");
            return false;
        }
        if (isNaN(weight) || weight <= 0) {
            showModal("Please enter a valid weight greater than 0.", "warning");
            return false;
        }

        // Reasonable range check
        if (isMetric) {
            if (height < 50 || height > 250) {
                showModal("Height must be between 50cm and 250cm.", "error");
                return false;
            }
        } else {
            if (height < 20 || height > 100) {
                showModal("Height must be between 20in and 100in.", "error");
                return false;
            }
        }

        return true;
    }

    function showModal(message, type = "warning") {
        modalMessage.textContent = message;
        modalIcon.className = 'modal-icon ' + type;
        modalIcon.textContent = type === 'error' ? '!' : '!';
        modalOverlay.classList.add('active');
        modalCloseBtn.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    function calculateBMI() {
        const heightVal = parseFloat(heightInput.value);
        const weightVal = parseFloat(weightInput.value);
        
        let bmi = 0;
        let heightInMeters = 0;

        if (isMetric) {
            heightInMeters = heightVal / 100;
            bmi = weightVal / (heightInMeters * heightInMeters);
        } else {
            // Imperial Formula: 703 x weight (lbs) / [height (in)]^2
            bmi = 703 * weightVal / (heightVal * heightVal);
            // Convert height to meters for ideal weight calc consistency
            heightInMeters = heightVal * 0.0254; 
        }

        bmi = parseFloat(bmi.toFixed(1));
        displayResult(bmi, heightInMeters);
        saveMeasurement(bmi);
    }

    function displayResult(bmi, heightInMeters) {
        let category = "";
        let color = "";
        let widthPercent = 0;

        if (bmi < 18.5) {
            category = "Underweight";
            color = "#3498db"; // Blue
            // Map 0-18.5 to 0-25%
            widthPercent = (bmi / 18.5) * 25;
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Normal";
            color = "#4caf50"; // Green
            // Map 18.5-25 to 25-50%
            widthPercent = 25 + ((bmi - 18.5) / 6.5) * 25; 
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            color = "#ff9800"; // Orange
             // Map 25-30 to 50-75%
            widthPercent = 50 + ((bmi - 25) / 5) * 25;
        } else {
            category = "Obese";
            color = "#f44336"; // Red
             // Map 30-45 to 75-100% (Cap visual at 45)
            widthPercent = 75 + ((Math.min(bmi, 45) - 30) / 15) * 25;
        }
        
        // Clamp percentage
        if (widthPercent > 100) widthPercent = 100;
        if (widthPercent < 0) widthPercent = 0;

        // Update UI
        bmiValueEl.textContent = bmi;
        bmiCategoryEl.textContent = category;
        bmiCategoryEl.style.color = color;
        bmiValueEl.style.color = color;

        // Calculate Ideal Weight Range (18.5 - 25 BMI)
        // Weight = BMI * Height^2
        const minIdealWeightKg = 18.5 * (heightInMeters * heightInMeters);
        const maxIdealWeightKg = 25 * (heightInMeters * heightInMeters);

        if (isMetric) {
            idealWeightEl.textContent = `${minIdealWeightKg.toFixed(1)}kg - ${maxIdealWeightKg.toFixed(1)}kg`;
        } else {
            const minIdealWeightLbs = minIdealWeightKg * 2.20462;
            const maxIdealWeightLbs = maxIdealWeightKg * 2.20462;
            idealWeightEl.textContent = `${minIdealWeightLbs.toFixed(1)}lbs - ${maxIdealWeightLbs.toFixed(1)}lbs`;
        }

        // Animation and Visualization - smooth slide down
        resultContainer.classList.remove('hidden');
        
        // Small delay to ensure CSS transition triggers
        requestAnimationFrame(() => {
            resultContainer.classList.add('visible');
            
            // Animate indicator after container opens
            setTimeout(() => {
                bmiIndicator.style.left = `${widthPercent}%`;
            }, 600);
        });
    }

    function resetResult() {
        resultContainer.classList.remove('visible');
        resultContainer.classList.add('hidden');
        bmiIndicator.style.left = '0%';
    }

    function saveMeasurement(bmi) {
        const date = new Date().toLocaleDateString();
        localStorage.setItem('lastBMI', JSON.stringify({ bmi, date }));
        loadLastMeasurement();
    }

    function loadLastMeasurement() {
        const saved = localStorage.getItem('lastBMI');
        if (saved) {
            const { bmi, date } = JSON.parse(saved);
            historySection.classList.remove('hidden');
            lastMeasurementEl.textContent = `BMI: ${bmi} (${date})`;
        }
    }
});

