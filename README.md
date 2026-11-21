# Professional Accounting & Finance Portfolio Website

A clean, responsive, static personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript** for accounting, finance, and taxation professionals in India.

## Project Structure

```text
accounting-portfolio/
├── index.html                  # Semantic single-page portfolio structure & inline corporate SVGs
├── css/
│   └── style.css               # Corporate design tokens, responsive grid layouts & reduced-motion rules
├── js/
│   └── script.js               # Mobile menu, scroll-spy, reveal animations, mailto composer & copyright year
├── assets/
│   ├── images/
│   │   ├── profile.jpg         # Replace with your professional headshot (recommended 400x400px)
│   │   └── favicon.png         # Browser tab icon (64x64px PNG)
│   └── documents/
│       └── resume.pdf          # Replace with your actual PDF resume
└── README.md                   # Customisation and deployment guide
```

## How to Run Locally

No build tools, Node.js, or local servers are required:
1. Extract or open the `accounting-portfolio/` folder.
2. Double-click `index.html` to open it directly in Chrome, Edge, Firefox, or Safari.

## How to Customise Your Details

All unverified personal details use clearly marked bracketed placeholders (`[...]`) in `index.html` so no fictional credentials or metrics are displayed:

1. **Identity & Hero (`#home`):** Replace `[CANDIDATE FULL NAME]`, `[PROFESSIONAL DESIGNATION]`, `[CITY, STATE]`, `[PERSONALIZED VALUE PROPOSITION]`, and the three highlight cards.
2. **Profile Photo & Resume:**
   - Replace `assets/images/profile.jpg` with your own corporate photograph.
   - Replace `assets/documents/resume.pdf` with your actual CV (keep the filename `resume.pdf` or update the `href` attributes in `index.html`).
3. **Skills & Software (`#skills`, `#software`):** Keep only the skills and tools you genuinely use, adjusting the `Proficient`, `Working`, or `Learning` tags as appropriate.
4. **Experience, Education & Achievements (`#experience`, `#education`):** Fill in verified roles, companies, dates, responsibilities, academic qualifications, and factual achievements.
5. **Contact Links (`#contact` & Footer):** Update `mailto:[CANDIDATE_EMAIL@EXAMPLE.COM]`, `tel:+91[XXXXXXXXXX]`, and your LinkedIn URL.

## Hosting Options (Free Static Deployment)

You can deploy this folder as-is on **GitHub Pages**, **Netlify**, **Vercel**, or **Cloudflare Pages** with zero configuration.
