# Interactive Wall Calendar Component

A highly polished, responsive React component built for the **Frontend Engineering Challenge**. This project translates a static physical wall calendar design into a profoundly functional and highly interactive web UI, focusing on premium "Apple-like" mechanics, tactile physics, and scalable frontend architecture.

## ✨ Core Requirements Mastered

1. **Physical Wall Calendar Aesthetic**: Styled natively with a realistic metallic hanging-wire hook at the top, a top-heavy massive visual Hero segment spanning 100% width, and seamlessly split dual bottom panels. 
2. **Day Range Selector**: Click any two dates to select an interactive range! Built with robust `date-fns` math, it guarantees clear visual separation for the `Start Date`, `End Date`, and connected `Days In-Between`. 
3. **Integrated Notes System**: A fully functional Memo pad securely wired into client-side `localStorage`. It is **Context-Aware**: If you have no dates selected, notes are saved specifically for the *current month*. If you have a date range highlighted, notes shift databases to save strictly to *that precise date range*!
4. **Flawlessly Responsive Layout**: 
   - **Desktop**: Expands into a massive 1200px visual anchor with the Calendar Grid taking 66% and the Notes component clearly segmented to the remaining 33%.
   - **Mobile**: The layout natively and gracefully collapses vertically so all touch targets remain expansive and accessible without forcing side-scrolling. 

## 🚀 Creative Liberty (Stand-Out Premium Features!)

1. **Tactile 3D Page Flipping (`framer-motion`)**:
   Instead of basic cross-fades, advancing through months triggers a realistic physical book-flip. Flipping right-to-left uses physical spring-based physics (`stiffness` and `damping`) alongside structural `rotateY` transforms, parallax scaling (`0.85x`), and a simulated shadow cast (`filter: brightness(0.3) blur()`) to bend the document identically to real paper.
   
2. **Semantic Premium Dark Mode (Scalable)**:
   This is *not* a simple color swap. I removed all hardcoded CSS overrides and engineered scalable semantic tokens mapping to a `body.dark-mode` property. Activating Dark Mode smoothly pivots the aesthetic from a bright Light setting to an immersive, Apple-inspired Slate tone (`#0f172a`), gently adjusting shadow drop-offs. The toggle incorporates a seamlessly morphing Framer Motion UI transitioning an Amber Sun into a Glowing Sapphire Moon, hooked safely into system-level OS detection rules.

3. **Contextual Holiday Integration**:
   Utilizing conditional logic, major holidays map themselves to the calendar structure, injecting a bright, glowing red `.holiday-marker` underneath the UI date along with a native tooltip revealing the holiday name. 

4. **Dynamic Seasonal Theming**:
   The logic calculates the current season (Winter, Spring, Summer, Fall). As you flip through the year, the app injects new CSS variables dynamically to change the global `--accent-color` and seamlessly downloads fresh, context-specific photography from Unsplash to ensure the hero image always explicitly matches the season dynamically! A 15-second radial background breath animation wraps everything together in a gentle visual motion.

## 🛠 Tech Stack (Strictly Frontend)
- **Vite** (Optimized React bundling toolset)
- **React.js + TypeScript** (For heavily scalable and strongly-typed component architecture)
- **Vanilla CSS** (Variables, Grid, and Media queries for ultimate native layout control)
- **date-fns** & **lucide-react** (For flawless timezone/date interpolation and crisp iconography)
- **Framer Motion** (For advanced component layout animations and 3D physics modeling)

## 💽 How to Run Locally

1. **Clone the repository** and navigate to the directory.
2. Ensure you have Node.js installed.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the local Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the localhost port provided in the terminal (usually `http://localhost:5173`).

---
*Built meticulously for the takeUforward SWE Summer Intern Frontend Task.*
