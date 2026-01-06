# AI Coding Guidelines for City Tree Project

## Project Overview
This is a static website prototype for urban tree management ("City Tree"). It consists of a single HTML page with CSS styling and placeholder JavaScript.

Key files:
- `prueba-citytree.html`: Main page structure with header, dashboard, login, citizen reports, and news sections
- `prueba-citytree.css`: Styling using glass morphism effects and CSS variables
- `prueba.citytree.js`: Currently empty, intended for future interactivity

## Architecture
- Single-page layout with CSS Grid: main container uses `grid-template-columns: 2fr 1fr`
- Left panel: Dashboard stats and map placeholder
- Right panel: Employee login and citizen report forms
- Glass effect cards with `backdrop-filter: blur(10px)` and `background: rgba(255, 255, 255, 0.2)`

## Styling Patterns
- Color palette via CSS variables: `--primary-green: #4CAF50`, `--dark-green: #1b5e20`, `--light-green: #8bc34a`
- Background images loaded from external URLs (Unsplash for body, Wikimedia for map)
- Rounded inputs/buttons: `border-radius: 20px`
- Stats boxes use flex layout with green gradients

Example from `prueba-citytree.css`:
```css
.glass {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
}
```

## File Linking Issues
HTML links to `style.css` but actual file is `prueba-citytree.css` - update the link tag for consistency.
No script tag present; add `<script src="prueba.citytree.js"></script>` before `</body>` when implementing JS.

## JavaScript Implementation
When adding interactivity:
- Target forms by class: `.login-card`, `.citizen-report`
- For login button: add event listener to validate username/password
- For send report: collect form data (name, email, location, description) and handle submission
- Use vanilla JavaScript, no external libraries

## Development Notes
- Preview by opening `prueba-citytree.html` in a browser
- No build process; edit files directly and refresh
- Language: Spanish text throughout the UI</content>
<parameter name="filePath">c:\Users\PC\OneDrive\Documentos\Proyecto 1\prueba-citytree\.github\copilot-instructions.md