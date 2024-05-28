document.addEventListener('DOMContentLoaded', function() {
    const moodForm = document.getElementById('mood-form');
    const moodList = document.getElementById('mood-list');

    moodForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const mood = document.getElementById('mood').value;
        await fetch('/api/mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mood })
        });
        loadMoods();
    });

    async function loadMoods() {
        const response = await fetch('/api/mood');
        const moods = await response.json();
        moodList.innerHTML = '';
        moods.forEach(mood => {
            const li = document.createElement('li');
            li.textContent = `${mood.mood} - ${new Date(mood.timestamp).toLocaleString()}`;
            moodList.appendChild(li);
        });
    }

    loadMoods();
});
