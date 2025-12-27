# ⚖️ BMI Calculator Pro

A modern, feature-rich Body Mass Index calculator with dark/light theme, BMI trend charts, age/gender-based health assessment, and comprehensive history tracking. Built with Glassmorphism design and PWA support for offline usage.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Dark/Light Theme Toggle**: Switch between dark and light themes with automatic system preference detection and localStorage persistence
- **Unit Toggle**: Switch between Metric (kg/cm) and Imperial (lbs/in) systems with a modern segmented control
- **Age & Gender Support**: Optional age and gender inputs for more accurate health risk assessment
- **Health Risk Assessment**: Personalized health risk evaluation based on BMI, age, and gender
- **BMI Trend Chart**: Interactive Chart.js line graph showing your BMI history over time with color-coded data points
- **Multiple History Tracking**: Store up to 30 measurements with date, time, and category information
- **Dynamic Color Coding**: Results change color based on BMI category (Blue for Underweight, Green for Normal, Orange for Overweight, Red for Obese)
- **Ideal Weight Range**: Calculates and displays the healthy weight range based on your height
- **Visual BMI Indicator**: Animated needle on a gradient bar showing your exact BMI position
- **Smooth Animations**: Staggered reveal animations for results with elegant slide-down effect
- **Custom Modal**: Styled validation error messages matching the app's Glassmorphism design
- **PWA Support**: Install as a mobile app with offline functionality via Service Worker
- **Accessibility**: Full keyboard navigation, ARIA labels, aria-live regions, and screen reader support
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop

## Live Demo

[🎮 View Live Demo](https://bmi-calculatorrrrr.netlify.app/)

## Screenshots

### Dark Theme

The default dark theme with Glassmorphism design, featuring a modern gradient background and glass-effect cards.

### Light Theme

Clean and bright light theme for users who prefer a lighter interface, automatically respects system preferences.

### BMI Trend Chart

Interactive line chart displaying your BMI history over time, with color-coded points indicating different BMI categories.

## Technologies

- **HTML5**: Semantic markup with accessibility attributes (aria-live, role, labels)
- **CSS3**: Glassmorphism design, CSS Variables for theming, Flexbox, smooth animations with keyframes and transitions
- **Vanilla JavaScript (ES6+)**: Modern JavaScript with DOM manipulation, event handling, and modular functions
- **Chart.js**: Interactive and responsive charts for BMI trend visualization
- **LocalStorage API**: Persistent data storage for theme preferences and measurement history
- **PWA**: Progressive Web App with manifest.json and Service Worker for offline support
- **SVG Icons**: Custom-designed scalable vector icons for favicon and app icons

## Installation

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/Serkanbyx/s1.6_BMI-Calculator.git
cd s1.6_BMI-Calculator
```

2. **Open with Live Server (VS Code)**

   - Install "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Or use Python HTTP Server**

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

4. **Or use Node.js HTTP Server**

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open http://localhost:8080 in your browser
```

5. **Or use npx serve**

```bash
npx serve

# Then open http://localhost:3000 in your browser
```

## Usage

1. **Select Theme**: Click the sun/moon icon in the header to toggle between dark and light themes
2. **Select Unit System**: Click on "Metric" or "Imperial" button to choose your preferred measurement system
3. **Enter Age (Optional)**: Input your age in years for more accurate health risk assessment
4. **Select Gender (Optional)**: Choose your gender for personalized health risk evaluation
5. **Enter Height**: Input your height in centimeters (Metric) or inches (Imperial)
6. **Enter Weight**: Input your weight in kilograms (Metric) or pounds (Imperial)
7. **Calculate**: Click the "Calculate BMI" button to see your results
8. **View Results**: Your BMI value, category, ideal weight range, health risk, and visual indicator will be displayed
9. **Track History**: View your measurement history and BMI trend chart at the bottom of the page
10. **Clear History**: Click the trash icon to clear all stored measurements

## How It Works?

### BMI Formula

The Body Mass Index is calculated using the following formula:

**Metric System:**

```
BMI = weight (kg) / height (m)²
```

**Imperial System:**

```
BMI = 703 × weight (lbs) / height (in)²
```

### BMI Categories

| BMI Range   | Category    | Color  |
| ----------- | ----------- | ------ |
| < 18.5      | Underweight | Blue   |
| 18.5 - 24.9 | Normal      | Green  |
| 25 - 29.9   | Overweight  | Orange |
| ≥ 30        | Obese       | Red    |

### Age-Based Interpretation

The calculator adjusts BMI interpretation based on age:

```javascript
// For children and teens (2-19 years)
if (age >= 2 && age < 20) {
  // Uses adjusted thresholds for growing individuals
}

// For seniors (65+ years)
if (age >= 65 && bmi >= 25 && bmi < 30) {
  // Slightly higher BMI may be acceptable
}
```

### Health Risk Assessment

Health risk is evaluated based on multiple factors:

```javascript
// Base risk from BMI
if (bmi < 18.5) baseRisk = "Nutritional deficiency risk";
else if (bmi < 25) baseRisk = "Low health risk";
else if (bmi < 30) baseRisk = "Moderate health risk";
else if (bmi < 35) baseRisk = "High health risk";
else baseRisk = "Very high health risk";

// Gender-specific adjustments
if (gender === "female" && bmi < 18) {
  baseRisk = "Hormonal imbalance risk";
}
```

### Ideal Weight Calculation

The ideal weight range is calculated by reversing the BMI formula:

```javascript
// For BMI range of 18.5 - 25 (Normal category)
const minIdealWeight = 18.5 * height * height;
const maxIdealWeight = 25 * height * height;
```

## Customization

### Change Color Theme

You can customize the color scheme by modifying CSS variables in `style.css`:

```css
/* Dark Theme (Default) */
:root {
  --bg-color: #252525;
  --card-bg: #414141;
  --text-color: #ffffff;
  --accent-color: #af0404;
  --highlight-color: #ff0000;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --danger-color: #f44336;
}

/* Light Theme */
[data-theme="light"] {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-color: #1a1a1a;
}
```

### Add More BMI Categories

Extend the BMI categories in `script.js` by modifying the `getBMICategory` function:

```javascript
function getBMICategory(bmi, age = null) {
  if (bmi < 16) return "Severe Thinness";
  if (bmi < 17) return "Moderate Thinness";
  if (bmi < 18.5) return "Mild Thinness";
  // ... continue with other categories
}
```

### Customize Chart Appearance

Modify the chart options in the `renderChart` function:

```javascript
bmiChart = new Chart(ctx, {
  type: "line",
  data: {
    // ...
  },
  options: {
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { min: 15, max: 40 },
    },
  },
});
```

### Modify Animation Speed

Adjust animation timing in `style.css`:

```css
.result-container {
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease
      0.1s;
}
```

## Project Structure

```
s1.6_BMI Calculator/
├── index.html          # Main HTML file
├── style.css           # Styles with theme support
├── script.js           # Application logic
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── icons/
│   ├── icon.svg        # App icon (512x512)
│   └── favicon.svg     # Browser favicon
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

## Features in Detail

### Completed Features

- ✅ Metric and Imperial unit systems
- ✅ Real-time BMI calculation
- ✅ Dynamic color-coded results
- ✅ Visual BMI indicator bar with animated needle
- ✅ Ideal weight range calculation
- ✅ Input validation with custom modal
- ✅ Dark/Light theme toggle with system preference detection
- ✅ Multiple measurement history tracking (up to 30 entries)
- ✅ BMI trend chart with Chart.js
- ✅ Age and gender-based health risk assessment
- ✅ LocalStorage persistence for theme and history
- ✅ PWA support with Service Worker
- ✅ Responsive Glassmorphism design
- ✅ Smooth staggered animations
- ✅ Full accessibility support
- ✅ Custom SVG icons

### Future Features

- [ ] Body fat percentage estimation
- [ ] Export results as PDF
- [ ] Multi-language support (i18n)
- [ ] Goal setting and progress tracking
- [ ] Share results on social media
- [ ] Sync data across devices

## Contributing

1. **Fork the repository**
2. **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**

```bash
git commit -m "feat: add amazing feature"
```

4. **Push to the branch**

```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Commit Message Format

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: serkanbyx1@gmail.com

## Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Interactive charts library
- [Shields.io](https://shields.io/) - Badge generation
- [Google Fonts](https://fonts.google.com/) - Typography inspiration

## Contact

- **Issues**: [GitHub Issues](https://github.com/Serkanbyx/s1.6_BMI-Calculator/issues)
- **Email**: serkanbyx1@gmail.com
- **Website**: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
