---
# GitHub Comparator

> A slick tool to compare GitHub profiles with a dev-inspired twist. Highlight your main coder with a glowing username, glitchy binary vibes, and neon accents—straight outta the terminal.

---

## What It Does

GitHub Comparator lets you flex your GitHub stats and stack them up against other devs. Enter a username, watch it pull the data (repos, followers, languages, etc.), and add up to two more for a side-by-side showdown. The main user gets the VIP treatment—pulsing green underline, binary glitch background, and a holographic card. Comparison cards keep it sleek with a removable X button. Toggle between dark and light mode for that late-night coding feel or daytime grind.

- **Main Features**:
  - Pulls GitHub profile stats via the API.
  - Highlights the main user with a glowing, glitchy username.
  - Neon green accents and monospace font for dev vibes.
  - Dark mode by default, toggleable to light mode.
  - Smooth animations and hover effects.

---

## Setup

Get this beast running on your machine in a few steps. You’ll need Node.js and npm installed—standard dev kit.

### Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)

### Installation

1. **Clone or Create the Project**:
   - Fresh start: `npx create-react-app github-comparator`
   - Existing: `cd github-comparator`

2. **Install Dependencies**:
   ```bash
   npm install framer-motion react-icons react-spinners
   ```

3. **Add Tailwind CSS**:
   - Open `public/index.html` and paste this in the `<head>`:
     ```html
     <script src="https://cdn.tailwindcss.com"></script>
     ```

4. **Drop the Code**:
   - Copy the `App.js` code (from the last version I sent) into `src/App.js`.
   - Paste the CSS into `src/index.css` (overwrite the default), or create `src/App.css` and add `import './App.css';` at the top of `App.js`.

5. **Run It**:
   ```bash
   npm start
   ```
   - Fires up at `http://localhost:3000`.

---

## Usage

1. **Start Comparing**:
   - Type a GitHub username in the input (`> Enter GitHub username`) and hit “Execute.”
   - Main user loads with a glowing username and holographic card.

2. **Add More Devs**:
   - Click “> Add Another Dev” (up to 2 more).
   - Each extra user gets a sleek card with a red X to remove.

3. **Toggle Vibes**:
   - Hit the sun/moon icon in the header to switch between dark mode (default) and light mode.

4. **Check the Stats**:
   - Repos, gists, followers, languages, and more—displayed in neon green badges.

---

## Features

- **Main User Highlight**: Pulsing green underline and subtle `101010` glitch behind the username.
- **Dev Aesthetic**: Monospace font, dark gradient background (`gray-900 to gray-800`), neon green accents.
- **Cards**: Holographic border for the main user, subtle gray for comparisons.
- **Animations**: Smooth fades, hover glows, and a terminal-style spinner.
- **Responsive**: Grid layout adjusts for mobile, tablet, or desktop.

---

## Tech Stack

- **React**: Frontend framework.
- **Framer Motion**: Smooth animations.
- **React Icons**: Icon library for GitHub, Twitter, and more.
- **React Spinners**: Loading animation.
- **Tailwind CSS**: Utility-first styling (via CDN).
- **GitHub API**: Fetches user data.

---

## Customization

Wanna tweak the vibes? Dive into these spots:
- **`src/App.js`**: Adjust colors, sizes, or add more stats.
- **`src/index.css`**: Mess with the glow, glitch, or font sizes in `.dev-username`.

---

## Troubleshooting

- **API Errors**: If “> Error: User not found” pops up, double-check the username.
- **Styling Weirdness**: Ensure Tailwind CDN is in `index.html`.
- **Animations Missing**: Verify `framer-motion` is installed.

---

## Credits

Built with love by a Grok 3-powered bro at xAI. Inspired by late-night coding sessions and neon-lit terminals. Shoutout to the GitHub API for the data juice.

---
