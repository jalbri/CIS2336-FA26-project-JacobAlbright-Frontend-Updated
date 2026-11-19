# UH Sugar Land Student Center — Front-End Phase

**Course:** CIS 2336, Fall 2026  
**Developer:** Jacob Albright  
**Status:** Front end complete; Node.js/Express backend will be added in a later phase.  
**Project type:** Individual student-created *concept*, not an official UH website.

This implementation follows the September 21, 2026 **Web Project Planning & Design** PDF. It is built from the starter folder provided for the course.

## Project structure

```text
CIS2336-FA26-project-JacobAlbright/
├── frontend/
│   ├── index.html         # Homepage, media, feature cards, Developer Contact
│   ├── FAQ.html           # Five JavaScript-controlled FAQ accordions
│   ├── roombooking.html   # Five-room request form with client-side validation
│   ├── reference.html     # Sources, media credits, developer notes
│   ├── styles.css         # Shared responsive styling for all four pages
│   ├── script.js          # Navigation, accordion, and form logic
│   └── assets/
│       └── favicon.svg    # Student-created typographic favicon
├── backend/
│   └── app.js             # Original placeholder (backend not developed yet)
├── .gitignore
└── README.md
```

## Open and run the front end

**Simple method (no install required):** In File Explorer, open the `frontend` folder and double-click `index.html`. Links, styling, FAQ toggles, and form validation work in a standard browser. Internet access is needed for the externally hosted Unsplash photos and Google Fonts.

**Recommended method for VS Code:** Open this project folder in VS Code, right-click `frontend/index.html`, then **Open with Live Server** (if the Live Server extension is installed). Use the address provided by the extension. This makes testing easier before the backend phase.

**Alternative local web server:** In a terminal from the project root, run:

```bash
cd frontend
python -m http.server 8080
```

Then visit `http://localhost:8080/`. On Windows, `py -m http.server 8080` can be used instead if `python` is not recognized. Stop the server with `Ctrl+C`. **Do not run `node backend/app.js` yet**—that file is only the original starter placeholder and does not host the website.
