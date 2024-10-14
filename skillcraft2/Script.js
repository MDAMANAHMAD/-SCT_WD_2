let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let paused = false;
let lapCounter = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
        paused = false;

        // Enable buttons when stopwatch starts
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
    }
}

function pauseStopwatch() {
    if (!paused) {
        clearInterval(timerInterval);
        paused = true;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    difference = 0;
    lapCounter = 0;
    lapsList.innerHTML = '';

    running = false;
    paused = false;

    // Disable unnecessary buttons after reset
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let timeString = formatTime(difference);
    display.innerHTML = timeString;
}

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);
    let millisecondsPart = ('00' + date.getUTCMilliseconds()).slice(-3, -1);
    
    return `${minutes}:${seconds}.${millisecondsPart}`;
}

function recordLap() {
    lapCounter++;
    let lapTime = formatTime(difference);
    let lapEntry = document.createElement('li');
    lapEntry.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapEntry);
}
