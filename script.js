let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
 
let lapNumber = 1;

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");


function updateDisplay() {

    let time = elapsedTime;

    let hrs = Math.floor(time / (1000 * 60 * 60));

    let mins = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
    );

    let secs = Math.floor(
        (time % (1000 * 60)) / 1000
    );

    let ms = Math.floor(
        (time % 1000) / 10
    );

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(ms).padStart(2, "0");
}


function startStopwatch() {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 10);
}


function pauseStopwatch() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


function resetStopwatch() {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;
    elapsedTime = 0;

    lapNumber = 1;

    updateDisplay();

    lapList.innerHTML = "";
}


function addLap() {

    if (elapsedTime === 0) {
        return;
    }

    let time = elapsedTime;

    let hrs = Math.floor(time / (1000 * 60 * 60));

    let mins = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
    );

    let secs = Math.floor(
        (time % (1000 * 60)) / 1000
    );

    let ms = Math.floor(
        (time % 1000) / 10
    );

    let lapTime =
        `${String(hrs).padStart(2, "0")}:` +
        `${String(mins).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}:` +
        `${String(ms).padStart(2, "0")}`;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${lapTime}</span>
    `;

    lapList.appendChild(li);

    lapNumber++;
}


startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

resetBtn.addEventListener("click", resetStopwatch);

lapBtn.addEventListener("click", addLap);
