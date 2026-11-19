/*
  UH Sugar Land Student Center — CIS 2336 front-end JavaScript.
  Handles mobile navigation, accessible FAQ accordions, and form validation.
  No network requests or actual room bookings happen in this phase.
*/
'use strict';

// Shared mobile navigation on each page.
function initializeNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    }
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) closeMenu();
  });
}

// The FAQ uses real buttons and aria-expanded/hidden to support keyboard access.
function initializeFaq() {
  const buttons = [...document.querySelectorAll('.faq-question')];
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      buttons.forEach(other => {
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      });
      if (!wasOpen) {
        button.setAttribute('aria-expanded', 'true');
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
      }
    });
  });
}

function todayLocalDate() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validDateString(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const [y, m, d] = dateString.split('-').map(Number);
  const parsed = new Date(y, m - 1, d);
  return parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d;
}

function validTimeString(timeString) {
  if (!/^\d{2}:\d{2}$/.test(timeString)) return false;
  const [h, m] = timeString.split(':').map(Number);
  return h >= 0 && h < 24 && m >= 0 && m < 60;
}

function initializeBooking() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const dateInput = document.getElementById('booking-date');
  const result = document.getElementById('booking-result');
  const fields = {
    fullName: document.getElementById('full-name'),
    email: document.getElementById('uh-email'),
    date: dateInput,
    startTime: document.getElementById('start-time'),
    endTime: document.getElementById('end-time'),
    groupSize: document.getElementById('group-size'),
    purpose: document.getElementById('purpose')
  };
  const errors = {
    room: document.getElementById('room-error'),
    fullName: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    date: document.getElementById('date-error'),
    startTime: document.getElementById('start-error'),
    endTime: document.getElementById('end-error'),
    groupSize: document.getElementById('group-error'),
    purpose: document.getElementById('purpose-error')
  };

  dateInput.min = todayLocalDate();

  function setError(key, message) {
    errors[key].textContent = message || '';
    if (key === 'room') {
      form.querySelectorAll('input[name="room"]').forEach(radio => {
        if (message) radio.setAttribute('aria-invalid', 'true');
        else radio.removeAttribute('aria-invalid');
      });
    } else if (fields[key]) {
      if (message) fields[key].setAttribute('aria-invalid', 'true');
      else fields[key].removeAttribute('aria-invalid');
    }
  }

  function clearResult() {
    result.hidden = true;
    result.replaceChildren();
  }

  form.addEventListener('input', event => {
    const name = event.target.name;
    if (name && errors[name]) setError(name, '');
    clearResult();
  });

  form.addEventListener('change', event => {
    const name = event.target.name;
    if (name && errors[name]) setError(name, '');
    clearResult();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    clearResult();
    Object.keys(errors).forEach(key => setError(key, ''));

    // Validate each field and show an inline message next to the problem.
    const selectedRoom = form.querySelector('input[name="room"]:checked');
    const fullName = fields.fullName.value.trim();
    const email = fields.email.value.trim();
    const date = fields.date.value;
    const startTime = fields.startTime.value;
    const endTime = fields.endTime.value;
    const groupSize = fields.groupSize.value.trim();
    const purpose = fields.purpose.value.trim();

    if (!selectedRoom) setError('room', 'Choose one room before continuing.');
    if (fullName.length < 2) setError('fullName', 'Enter your full name (at least 2 characters).');
    if (!email) {
      setError('email', 'Enter your UH email address.');
    } else if (!fields.email.validity.valid || !/^[^\s@]+@(?:cougarnet\.)?uh\.edu$/i.test(email)) {
      setError('email', 'Use a valid @cougarnet.uh.edu or @uh.edu address.');
    }
    if (!date) {
      setError('date', 'Choose a reservation date.');
    } else if (!validDateString(date) || date < todayLocalDate()) {
      setError('date', 'Choose a valid date that is today or later.');
    }

    if (!validTimeString(startTime)) setError('startTime', 'Choose a valid start time.');
    if (!validTimeString(endTime)) {
      setError('endTime', 'Choose a valid end time.');
    } else if (validTimeString(startTime) && endTime <= startTime) {
      setError('endTime', 'End time must be later than start time.');
    }
    // A same-day request must not start in the past.
    if (date === todayLocalDate() && validTimeString(startTime)) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const [hours, minutes] = startTime.split(':').map(Number);
      if (hours * 60 + minutes <= currentMinutes) {
        setError('startTime', 'Choose a start time later than the current time.');
      }
    }

    if (groupSize && (!/^\d+$/.test(groupSize) || Number(groupSize) < 1 || !Number.isSafeInteger(Number(groupSize)))) {
      setError('groupSize', 'Enter a whole number of at least 1.');
    }
    if (purpose.length > 120) setError('purpose', 'Keep the purpose within 120 characters.');

    const firstError = Object.keys(errors).find(key => errors[key].textContent);
    if (firstError) {
      const target = firstError === 'room' ? form.querySelector('input[name="room"]') : fields[firstError];
      if (target) target.focus();
      return;
    }

    // This is deliberately a PREVIEW. The backend will later handle POST requests,
    // check existing bookings for conflicts, and decide availability.
    const label = selectedRoom.value;
    const readableDate = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const readableTime = time => new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit'
    });

    result.innerHTML = '<h3>Request details validated</h3>' +
      '<p>Your information passed the front-end checks. <strong>This is not a confirmed booking.</strong> ' +
      'Live room availability and reservation approval will be added with the Node.js backend.</p>' +
      '<dl><div><dt>Room</dt><dd id="summary-room"></dd></div>' +
      '<div><dt>Date</dt><dd id="summary-date"></dd></div>' +
      '<div><dt>Time</dt><dd id="summary-time"></dd></div></dl>';
    // User-entered content is inserted as text, never interpreted as HTML.
    result.querySelector('#summary-room').textContent = label;
    result.querySelector('#summary-date').textContent = readableDate;
    result.querySelector('#summary-time').textContent = `${readableTime(startTime)} – ${readableTime(endTime)}`;
    result.hidden = false;
    result.focus();
  });
}

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});
initializeNavigation();
initializeFaq();
initializeBooking();
