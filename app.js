
const entryForm = document.querySelector('#entryForm');

if (entryForm) {
  const titleInput = document.querySelector('#entryTitle');
  const bodyInput = document.querySelector('#entryBody');
  const formMessage = document.querySelector('#formMessage');
  const entryDate = document.querySelector('#entryDate');

  if (entryDate) {
    entryDate.textContent = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  entryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === '' || body === '') {
      formMessage.textContent = 'Please enter a title and reflection.';
      return;
    }

    const savedEntries = JSON.parse(localStorage.getItem('entries') || '[]');

    const entry = {
      id: crypto.randomUUID(),
      title: title,
      body: body,
      date: new Date().toISOString(),
    };

    savedEntries.push(entry);

    localStorage.setItem('entries', JSON.stringify(savedEntries));

    formMessage.textContent = 'Entry saved successfully!';
    entryForm.reset();
  });
}

function getSavedEntries() {
  try {
    const storedEntries = localStorage.getItem("entries");
    const entries = JSON.parse(storedEntries || "[]");

    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.error("Could not read saved entries:", error );
    return [];
  }
}

function renderEntries(container, entries) {
  container.replaceChildren();

  if (entries.length === 0) {
    const message = document.createElement("p");
    message.textContent = "NO entries yet. Write your first relection. "
    container.appendChild(message);
    return
  }

  for (const entry of entries) {
    const card = document.createElement("article");
    card.className = "entry-card"

    const date = document.createElement("p");
    date.className = "entry-date";

    const parsedDate = new Date(entry.date);
    date.textContent = Number.isNaN(parsedDate.getTime())
    ? "Date unavailable"
    : parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const title = document.createElement("h3");
    title.textContent = entry.title;

    const summary = document.createElement("p");
    summary.className = "entry-summary";
    summary.textContent =
      entry.body.length > 140
      ? entry.body.slice(0, 140) + "..."
      : entry.body;
    card.append(date, title, summary);
    container.appendChild(card);
  }
}

const entries = getSavedEntries();

const sortedEntries = entries
  .slice()
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const recentEntries = document.querySelector("#recentEntries");

if (recentEntries) {
  renderEntries(recentEntries, sortedEntries.slice(0, 5));
}

const allEntries = document.querySelector("#allEntries");

if (allEntries) {
  renderEntries(allEntries, sortedEntries);
}


const menuToggle = document.querySelector('#menuToggle');
const mainNavigation = document.querySelector('#mainNavigation');

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNavigation.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu',
    );
  });
}
