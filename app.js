
const entryForm = document.querySelector('#entryForm');

if (entryForm) {
  const titleInput = document.querySelector('#entryTitle');
  const bodyInput = document.querySelector('#entryBody');
  const formMessage = document.querySelector('#formMessage');

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
