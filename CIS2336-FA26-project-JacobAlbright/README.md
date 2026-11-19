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

## What is complete

- Homepage with desktop links, expandable JavaScript mobile menu, descriptive images, feature cards, booking calls to action, and Developer Contact section.
- Five collapsible FAQ answers, accessible by keyboard and screen reader.
- Five selectable room options matching the planning PDF.
- Required fields: room, full name, UH email, date, start time, end time. Optional fields: group size and purpose.
- Inline validation of missing fields, UH email domain, valid/future date, past same-day start time, and end time after start time. Entries remain in the form when validation fails.
- Successful **client-side validation** produces a room/date/time summary with clear messaging that **availability is not yet checked**. No server requests, bookings, or persistence are implemented.
- A References page with technical resources, image/photographer credits, and developer notes.
- Responsive layouts, labeled controls, focus states, and text alternatives for photos.

## Manual testing checklist

1. Open all four pages from the header and footer. Check links back and forth.
2. Make the browser narrow (or use mobile emulator). Tap **Menu** to open/close it. Press `Esc` to close it.
3. On `FAQ.html`, open each of the five questions. Open a second to confirm the first closes.
4. On `roombooking.html`, click **Check & Submit** with no information. Confirm inline error messages appear.
5. Enter an invalid email (`user@gmail.com`), a past date, or end time earlier than start time. Confirm each produces a specific message.
6. Complete the form with a future date, valid UH-format email (`student@cougarnet.uh.edu`), and valid start/end times. Confirm a preview appears but no actual booking is claimed.
7. Open `reference.html` and check the source links, image credits, and developer notes.

## Items to complete before turning in

1. Developer contact uses the UH email address `jlalbright@CougarNet.UH.EDU` across all pages.
2. Verify any official opening hours or booking policies before presenting them as facts. This preview intentionally treats them as unannounced.
3. For the later phase, implement `backend/app.js` with Express GET/POST routes and in-memory booking checks; connect `script.js` to the backend only after that code is working. No backend functionality is included in this deliverable.

## Design decisions and external assets

- Visual system based on the planning PDF: UH-inspired red `#C8102E`, charcoal `#202124`, white, gray `#F5F6F7`; Montserrat headings and Open Sans body type.
- Media is remotely embedded rather than bundled. Full photographer and image URLs are documented on `frontend/reference.html`. Photos are illustrative and do not depict the proposed UH Sugar Land facility.
- UH student email domain verified from the official UH IT student email page: https://www.uh.edu/infotech/services/accounts/email/student-email/
- JS uses modern native DOM APIs only; there are no front-end package dependencies or build tools.
