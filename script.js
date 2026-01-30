let yieldChart, timeChart;

// DOM elements
const scale = document.getElementById("scale");
const wco = document.getElementById("wco");
const ffa = document.getElementById("ffa");
const runBtn = document.getElementById("runBtn");

const wcoVal = document.getElementById("wcoVal");
const ffaVal = document.getElementById("ffaVal");

const alcoholEl = document.getElementById("alcohol");
const catalystEl = document.getElementById("catalyst");
const timeEl = document.getElementById("time");
const yieldEl = document.getElementById("yield");
const costEl = document.getElementById("cost");
const warningBox = document.getElementById("warningBox");

// ---------------- SCALE HANDLING ----------------
function updateWcoRange() {
  if (scale.value === "micro") {
    wco.min = 10;
    wco.max = 500;
    wco.step = 10;
    wco.value = 100;
  } else if (scale.value === "lab") {
    wco.min = 0.5;
    wco.max = 10;
    wco.step = 0.5;
    wco.value = 1;
  } else {
    wco.min = 10;
    wco.max = 50;
    wco.step = 1;
    wco.value = 20;
  }
  updateWcoText();
}

function updateWcoText() {
  if (scale.value === "micro")
    wcoVal.innerText = (wco.value / 1000).toFixed(2) + " L";
  else
    wcoVal.innerText = wco.value + " L";
}

ffa.oninput = () => ffaVal.innerText = ffa.value;

// ---------------- MAIN SIMULATION ----------------
function runSimulation() {

  let wcoL = (scale.value === "micro") ? wco.value / 1000 : Number(wco.value);
  let ffaValNum = Number(ffa.value);

  let alcoholFactor = (ffaValNum > 3) ? 0.22 : (ffaValNum <= 1 ? 0.18 : 0.20);
  let catalystFactor = (ffaValNum > 3) ? 0.012 : (ffaValNum <= 1 ? 0.008 : 0.01);

  let alcohol = wcoL * alcoholFactor;
  let catalyst = wcoL * catalystFactor;
  let time = 60 + (ffaValNum > 3 ? 15 : 0);
  let yieldVal = 92 - ffaValNum * 1.5;

  // MICRO-BATCH CORRECTION
  if (wcoL < 0.5) {
    time += 7;
    yieldVal -= 3;
    alcohol *= 1.05;
    warningBox.style.display = "block";
    warningBox.innerText = "Micro-batch mode active: lab-scale losses applied.";
  } else {
    warningBox.style.display = "none";
  }

  let cost = (alcohol * 60 + catalyst * 300 + 10) / wcoL;

  alcoholEl.innerText = alcohol.toFixed(3) + " L";
  catalystEl.innerText = catalyst.toFixed(4) + " kg";
  timeEl.innerText = time + " min";
  yieldEl.innerText = yieldVal.toFixed(0) + " %";
  costEl.innerText = "₹ " + cost.toFixed(0);

  drawCharts(wcoL, ffaValNum, time);
}

// ---------------- CHARTS ----------------
function drawCharts(wcoL, ffaValNum, baseTime) {

  let ffaRange = [], yieldRange = [];
  for (let i = Math.max(0, ffaValNum - 2); i <= Math.min(5, ffaValNum + 2); i += 0.5) {
    ffaRange.push(i);
    yieldRange.push(92 - i * 1.5);
  }

  let wcoRange = [], timeRange = [];
  for (let i = Math.max(0.1, wcoL - 0.5); i <= wcoL + 0.5; i += 0.1) {
    wcoRange.push(i);
    timeRange.push(baseTime + i * 5);
  }

  if (yieldChart) yieldChart.destroy();
  if (timeChart) timeChart.destroy();

  yieldChart = new Chart(document.getElementById("yieldChart"), {
    type: "line",
    data: { labels: ffaRange, datasets: [{ label: "Yield vs FFA", data: yieldRange, borderColor: "green", fill: true }] }
  });

  timeChart = new Chart(document.getElementById("timeChart"), {
    type: "bar",
    data: { labels: wcoRange, datasets: [{ label: "Time vs WCO", data: timeRange, backgroundColor: "#3498db" }] }
  });
}

// INIT
scale.onchange = updateWcoRange;
runBtn.onclick = runSimulation;

updateWcoRange();
runSimulation();


