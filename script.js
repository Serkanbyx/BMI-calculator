/**
 * BMI Calculator Pro
 * Features: Unit toggle, theme switching, history tracking, trend chart, age/gender analysis
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Elements =====
    const bmiForm = document.getElementById('bmiForm');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const heightUnitLabel = document.getElementById('heightUnitLabel');
    const weightUnitLabel = document.getElementById('weightUnitLabel');
    
    const resultContainer = document.getElementById('resultContainer');
    const bmiValueEl = document.getElementById('bmiValue');
    const bmiCategoryEl = document.getElementById('bmiCategory');
    const idealWeightEl = document.getElementById('idealWeightRange');
    const healthRiskEl = document.getElementById('healthRisk');
    const bmiIndicator = document.getElementById('bmiIndicator');
    
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    // Theme elements
    const themeToggle = document.getElementById('themeToggle');

    // Modal elements
    const modalOverlay = document.getElementById('modalOverlay');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // ===== State =====
    let isMetric = true;
    let bmiChart = null;

    // ===== Constants =====
    const STORAGE_KEYS = {
        HISTORY: 'bmiHistory',
        THEME: 'bmiTheme'
    };
    const MAX_HISTORY_ITEMS = 30;

    // ===== Initialize =====
    initTheme();
    loadHistory();

    // ===== Event Listeners =====
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Modal close handlers
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });

    // Unit Toggle
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

    // Clear History
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all history?')) {
            clearHistory();
        }
    });

    // ===== Theme Functions =====
    
    /**
     * Initialize theme from localStorage or system preference
     */
    function initTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }

    /**
     * Toggle between dark and light theme
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
        
        // Update chart colors if exists
        if (bmiChart) {
            updateChartTheme();
        }
    }

    // ===== Unit Functions =====
    
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
        
        resetResult();
    }

    // ===== Validation =====
    
    function validateInputs() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const age = ageInput.value ? parseInt(ageInput.value) : null;

        if (isNaN(height) || height <= 0) {
            showModal("Please enter a valid height greater than 0.", "warning");
            return false;
        }
        if (isNaN(weight) || weight <= 0) {
            showModal("Please enter a valid weight greater than 0.", "warning");
            return false;
        }

        // Height range check
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

        // Age validation (optional)
        if (age !== null && (age < 2 || age > 120)) {
            showModal("Age must be between 2 and 120 years.", "error");
            return false;
        }

        return true;
    }

    // ===== Modal Functions =====
    
    function showModal(message, type = "warning") {
        modalMessage.textContent = message;
        modalIcon.className = 'modal-icon ' + type;
        modalIcon.textContent = type === 'success' ? '✓' : '!';
        modalOverlay.classList.add('active');
        modalCloseBtn.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    // ===== BMI Calculation =====
    
    function calculateBMI() {
        const heightVal = parseFloat(heightInput.value);
        const weightVal = parseFloat(weightInput.value);
        const age = ageInput.value ? parseInt(ageInput.value) : null;
        const gender = genderSelect.value || null;
        
        let bmi = 0;
        let heightInMeters = 0;

        if (isMetric) {
            heightInMeters = heightVal / 100;
            bmi = weightVal / (heightInMeters * heightInMeters);
        } else {
            // Imperial Formula: 703 x weight (lbs) / [height (in)]^2
            bmi = 703 * weightVal / (heightVal * heightVal);
            heightInMeters = heightVal * 0.0254;
        }

        bmi = parseFloat(bmi.toFixed(1));
        
        const category = getBMICategory(bmi, age);
        const healthRisk = getHealthRisk(bmi, age, gender);
        
        displayResult(bmi, heightInMeters, category, healthRisk);
        saveMeasurement(bmi, category, age, gender);
    }

    /**
     * Get BMI category with age consideration
     */
    function getBMICategory(bmi, age = null) {
        // For children/teens (2-19), BMI interpretation differs
        // This is simplified - in reality, CDC percentile charts are used
        if (age && age >= 2 && age < 20) {
            // Simplified child/teen interpretation
            if (bmi < 14) return "Underweight";
            if (bmi < 21) return "Normal";
            if (bmi < 25) return "Overweight";
            return "Obese";
        }

        // Adult categories (WHO standard)
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    /**
     * Get health risk assessment based on BMI, age, and gender
     */
    function getHealthRisk(bmi, age = null, gender = null) {
        let baseRisk = "";
        
        if (bmi < 18.5) {
            baseRisk = "Nutritional deficiency risk";
        } else if (bmi < 25) {
            baseRisk = "Low health risk";
        } else if (bmi < 30) {
            baseRisk = "Moderate health risk";
        } else if (bmi < 35) {
            baseRisk = "High health risk";
        } else {
            baseRisk = "Very high health risk";
        }

        // Age-specific considerations
        if (age) {
            if (age >= 65 && bmi >= 25 && bmi < 30) {
                baseRisk = "Acceptable for age";
            }
            if (age < 20) {
                baseRisk += " (Consult pediatrician)";
            }
        }

        // Gender-specific notes
        if (gender === 'female' && bmi < 18) {
            baseRisk = "Hormonal imbalance risk";
        }

        return baseRisk;
    }

    // ===== Display Result =====
    
    function displayResult(bmi, heightInMeters, category, healthRisk) {
        const colorMap = {
            "Underweight": "#3498db",
            "Normal": "#4caf50",
            "Overweight": "#ff9800",
            "Obese": "#f44336"
        };
        
        const color = colorMap[category] || "#ffffff";
        let widthPercent = calculateIndicatorPosition(bmi);

        // Update UI
        bmiValueEl.textContent = bmi;
        bmiCategoryEl.textContent = category;
        bmiCategoryEl.style.color = color;
        bmiValueEl.style.color = color;

        // Health Risk
        healthRiskEl.textContent = healthRisk;
        healthRiskEl.style.color = color;

        // Ideal Weight Range
        const minIdealWeightKg = 18.5 * (heightInMeters * heightInMeters);
        const maxIdealWeightKg = 25 * (heightInMeters * heightInMeters);

        if (isMetric) {
            idealWeightEl.textContent = `${minIdealWeightKg.toFixed(1)} - ${maxIdealWeightKg.toFixed(1)} kg`;
        } else {
            const minLbs = minIdealWeightKg * 2.20462;
            const maxLbs = maxIdealWeightKg * 2.20462;
            idealWeightEl.textContent = `${minLbs.toFixed(1)} - ${maxLbs.toFixed(1)} lbs`;
        }

        // Animation
        resultContainer.classList.remove('hidden');
        
        requestAnimationFrame(() => {
            resultContainer.classList.add('visible');
            setTimeout(() => {
                bmiIndicator.style.left = `${widthPercent}%`;
            }, 600);
        });
    }

    function calculateIndicatorPosition(bmi) {
        let widthPercent = 0;
        
        if (bmi < 18.5) {
            widthPercent = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
            widthPercent = 25 + ((bmi - 18.5) / 6.5) * 25;
        } else if (bmi < 30) {
            widthPercent = 50 + ((bmi - 25) / 5) * 25;
        } else {
            widthPercent = 75 + ((Math.min(bmi, 45) - 30) / 15) * 25;
        }
        
        return Math.max(0, Math.min(100, widthPercent));
    }

    function resetResult() {
        resultContainer.classList.remove('visible');
        resultContainer.classList.add('hidden');
        bmiIndicator.style.left = '0%';
    }

    // ===== History Management =====
    
    function saveMeasurement(bmi, category, age = null, gender = null) {
        const history = getHistory();
        
        const measurement = {
            id: Date.now(),
            bmi,
            category,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            age,
            gender,
            unit: isMetric ? 'metric' : 'imperial'
        };
        
        history.unshift(measurement);
        
        // Keep only last N items
        if (history.length > MAX_HISTORY_ITEMS) {
            history.pop();
        }
        
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
        loadHistory();
    }

    function getHistory() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading history:', e);
            return [];
        }
    }

    function loadHistory() {
        const history = getHistory();
        
        if (history.length === 0) {
            historySection.classList.add('hidden');
            return;
        }
        
        historySection.classList.remove('hidden');
        renderHistoryList(history);
        renderChart(history);
    }

    function renderHistoryList(history) {
        historyList.innerHTML = history.slice(0, 10).map(item => {
            const categoryClass = item.category.toLowerCase().replace(' ', '');
            return `
                <div class="history-item" data-id="${item.id}">
                    <div>
                        <span class="bmi-value">${item.bmi}</span>
                        <span class="bmi-category ${categoryClass}">${item.category}</span>
                    </div>
                    <span class="bmi-date">${item.date} ${item.time || ''}</span>
                </div>
            `;
        }).join('');
    }

    function clearHistory() {
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
        historySection.classList.add('hidden');
        if (bmiChart) {
            bmiChart.destroy();
            bmiChart = null;
        }
    }

    // ===== Chart Functions =====
    
    function renderChart(history) {
        const ctx = document.getElementById('bmiChart');
        if (!ctx) return;

        // Prepare data (reverse to show oldest first)
        const chartData = history.slice(0, 15).reverse();
        
        const labels = chartData.map(item => item.date);
        const data = chartData.map(item => item.bmi);

        const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';
        const textColor = isDarkTheme ? '#b0b0b0' : '#666666';
        const gridColor = isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

        // Destroy existing chart
        if (bmiChart) {
            bmiChart.destroy();
        }

        bmiChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'BMI',
                    data,
                    borderColor: '#af0404',
                    backgroundColor: 'rgba(175, 4, 4, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: data.map(bmi => {
                        if (bmi < 18.5) return '#3498db';
                        if (bmi < 25) return '#4caf50';
                        if (bmi < 30) return '#ff9800';
                        return '#f44336';
                    }),
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDarkTheme ? '#414141' : '#ffffff',
                        titleColor: isDarkTheme ? '#ffffff' : '#1a1a1a',
                        bodyColor: isDarkTheme ? '#ffffff' : '#1a1a1a',
                        borderColor: gridColor,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const bmi = context.raw;
                                const category = getBMICategory(bmi);
                                return `BMI: ${bmi} (${category})`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: Math.max(0, Math.min(...data) - 5),
                        max: Math.max(...data) + 5,
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    x: {
                        ticks: {
                            color: textColor,
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: gridColor
                        }
                    }
                },
                // Add reference lines for BMI zones
                annotation: {
                    annotations: {
                        normalZone: {
                            type: 'box',
                            yMin: 18.5,
                            yMax: 25,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderColor: 'transparent'
                        }
                    }
                }
            }
        });
    }

    function updateChartTheme() {
        const history = getHistory();
        if (history.length > 0) {
            renderChart(history);
        }
    }
});
