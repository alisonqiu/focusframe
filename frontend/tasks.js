document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

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

    async function loadTasks() {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.priority}`;
            if (task.completed) {
                li.style.textDecoration = "line-through";
            }
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async function() {
                await fetch(`/api/tasks/${task.id}`, {
                    method: 'DELETE'
                });
                loadTasks();
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    loadTasks();
});
