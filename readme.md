# Vandana R — Personal Portfolio Website

> A premium, fully responsive personal portfolio built with pure HTML, CSS, and Vanilla JavaScript.

[![Live Demo](https://img.shields.io/badge/Live-Demo-c9a96e?style=for-the-badge)](https://your-username.github.io/portfolio)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ Features

- 🌑 **Dark luxury theme** with gold accent palette
- 🖱️ **Custom cursor** with smooth follower animation
- 📜 **Scroll progress bar** at the top of the page
- 🔗 **Sticky navbar** with active section highlighting
- 🎞️ **Fade-in scroll animations** on all sections
- 📊 **Animated skill progress bars** triggered on scroll
- 💼 **Project cards** with hover lift + glow effects
- 📱 **Fully mobile responsive** with hamburger menu
- ✉️ **Contact form** with success feedback
- 🏷️ LinkedIn, Email, Phone quick-links

---

## 📁 Project Structure

```
portfolio/
├── index.html      ← Main HTML structure
├── style.css       ← All styling (variables, layout, animations)
├── script.js       ← Interactions (cursor, scroll, nav, form)
├── photo.png       ← Your profile photo (rename your image to this)
└── README.md       ← This file
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Add your photo
Rename your profile photo to `photo.png` and place it in the root folder.

### 3. Open in browser
```bash
# Simply open index.html in your browser
open index.html
# or on Windows:
start index.html
```

No build tools. No dependencies. No terminal setup needed. ✅

---

## 🌐 Deploy on GitHub Pages (Free Hosting)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch and `/ (root)`
4. Click **Save**
5. Your site will be live at `https://your-username.github.io/portfolio` in ~1 minute

---

## 🎨 Customisation

### Change your name / details
Edit `index.html` — all personal info is clearly labelled in the HTML.

### Change accent color
In `style.css`, update the CSS variables at the top:
```css
:root {
  --accent: #c9a96e;   /* Main gold color */
  --accent2: #e8c99a;  /* Lighter gold for gradients */
}
```

### Add a project
Copy any `.project-card` block in `index.html` and update the title and description.

### Add a real resume download
Replace `href="#"` in the Download CV button with the path to your PDF:
```html
<a href="vandana_resume.pdf" class="btn-outline" download>Download CV</a>
```

---

## 📸 Sections

| Section | Description |
|---|---|
| **Home** | Hero with name, title, bio, CTA buttons, and photo |
| **About** | Personal background, education, interests |
| **Skills** | 8 skill cards with animated progress bars |
| **Projects** | 4 project cards with descriptions |
| **Contact** | Email, phone, LinkedIn links + message form |

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JS | Scroll events, cursor, Intersection Observer |
| Google Fonts | Cormorant Garamond + DM Sans |
| Font Awesome 6 | Icons throughout |

---

## 📬 Contact

**Vandana R**
- 📧 [vr8109@srmist.edu.in](mailto:vr8109@srmist.edu.in)
- 📞 +91 9677018677
- 💼 [linkedin.com/in/Vandana](https://www.linkedin.com/in/Vandana)

---

<p align="center">Crafted with intention by Vandana R &nbsp;✦&nbsp; 2024</p>