document.addEventListener('DOMContentLoaded', function() {
    const pointsSpan = document.getElementById('points');

    async function loadPoints() {
        const response = await fetch('/api/points');
        const data = await response.json();
        pointsSpan.textContent = data.points;
    }

    loadPoints();
});
