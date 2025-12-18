# ⚖️ BMI Calculator 

A modern, responsive Body Mass Index calculator with unit toggle, dynamic color-coded results, ideal weight range display, and visual BMI indicator. Built with Glassmorphism design and PWA support for offline usage.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Unit Toggle**: Switch between Metric (kg/cm) and Imperial (lbs/in) systems with a modern segmented control
- **Dynamic Color Coding**: Results change color based on BMI category (Blue for Underweight, Green for Normal, Orange for Overweight, Red for Obese)
- **Ideal Weight Range**: Calculates and displays the healthy weight range based on your height
- **Visual BMI Indicator**: Animated needle on a gradient bar showing your exact BMI position
- **Smooth Animations**: Staggered reveal animations for results with elegant slide-down effect
- **Custom Modal**: Styled validation error messages matching the app's Glassmorphism design
- **History Tracking**: Last measurement automatically saved and displayed using LocalStorage
- **PWA Support**: Install as a mobile app with offline functionality via Service Worker
- **Accessibility**: Full keyboard navigation, ARIA labels, aria-live regions, and screen reader support
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop

## Live Demo

[🎮 View Live Demo](https://bmi-calculatorrrrr.netlify.app/)

## Technologies

- **HTML5**: Semantic markup with accessibility attributes (aria-live, role, labels)
- **CSS3**: Glassmorphism design, CSS Variables, Flexbox, smooth animations with keyframes and transitions
- **Vanilla JavaScript (ES6+)**: Modern JavaScript with DOM manipulation, event handling, and modular functions
- **LocalStorage API**: Persistent data storage for measurement history
- **PWA**: Progressive Web App with manifest.json and Service Worker for offline support

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

## Usage

1. **Select Unit System**: Click on "Metric" or "Imperial" button to choose your preferred measurement system
2. **Enter Height**: Input your height in centimeters (Metric) or inches (Imperial)
3. **Enter Weight**: Input your weight in kilograms (Metric) or pounds (Imperial)
4. **Calculate**: Click the "Calculate BMI" button to see your results
5. **View Results**: Your BMI value, category, ideal weight range, and visual indicator will be displayed with smooth animations
6. **Check History**: Your last measurement is automatically saved and shown at the bottom of the page

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

| BMI Range   | Category    |
| ----------- | ----------- |
| < 18.5      | Underweight |
| 18.5 - 24.9 | Normal      |
| 25 - 29.9   | Overweight  |
| ≥ 30        | Obese       |

### Ideal Weight Calculation

The ideal weight range is calculated by reversing the BMI formula:

```javascript
// For BMI range of 18.5 - 25 (Normal category)
const minIdealWeight = 18.5 × height²
const maxIdealWeight = 25 × height²
```

## Customization

### Change Color Theme

You can customize the color scheme by modifying CSS variables in `style.css`:

```css
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
```

### Add More BMI Categories

Extend the BMI categories in `script.js` by modifying the `displayResult` function:

```javascript
if (bmi < 16) {
  category = "Severe Thinness";
  color = "#1a237e";
} else if (bmi < 17) {
  category = "Moderate Thinness";
  color = "#283593";
}
// ... continue with other categories
```

### Modify Animation Speed

Adjust animation timing in `style.css`:

```css
.result-container {
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease
      0.1s;
}
```

## Features in Detail

### Completed Features

- ✅ Metric and Imperial unit systems
- ✅ Real-time BMI calculation
- ✅ Dynamic color-coded results
- ✅ Visual BMI indicator bar with animated needle
- ✅ Ideal weight range calculation
- ✅ Input validation with custom modal
- ✅ LocalStorage for history tracking
- ✅ PWA support with Service Worker
- ✅ Responsive Glassmorphism design
- ✅ Smooth staggered animations
- ✅ Full accessibility support

### Future Features

- [ ] Multiple measurement history tracking
- [ ] BMI trend chart over time
- [ ] Age and gender consideration for more accurate results
- [ ] Body fat percentage estimation
- [ ] Export results as PDF
- [ ] Multi-language support

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

## Contact

- **Issues**: [GitHub Issues](https://github.com/Serkanbyx/s1.6_BMI-Calculator/issues)
- **Email**: serkanbyx1@gmail.com
- **Website**: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
