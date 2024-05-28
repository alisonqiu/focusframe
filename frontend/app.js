document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const moodForm = document.getElementById('mood-form');
    const moodList = document.getElementById('mood-list');
    const pointsSpan = document.getElementById('points');

    taskForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const priority = document.getElementById('task-priority').value;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, priority })
        });
        loadTasks();
    });

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

    async function loadTasks() {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.priority}`;
            taskList.appendChild(li);
        });
    }

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

    async function loadPoints() {
        const response = await fetch('/api/points');
        const data = await response.json();
        pointsSpan.textContent = data.points;
    }

    loadTasks();
    loadMoods();
    loadPoints();
});
