// Global chart variables
let yieldChart = null;
let timeChart = null;

// Main simulation function
function runSimulation() {

  // Read inputs
  const wco = Number(document.getElementById("wco").value);   // L
  const ffa = Number(document.getElementById("ffa").value);   // %
  const scale = document.getElementById("scale").value;

  // -----------------------------
  // BASE PARAMETERS (EMPIRICAL)
  // -----------------------------
  let alcoholFactor = 0.20;     // 20% of WCO
  let catalystFactor = 0.01;    // 1% of WCO
  let baseTime = 60;            // minutes
  let baseYield = 92;           // %

  // -----------------------------
  // FFA-BASED ADJUSTMENTS
  // -----------------------------
  let ffaPenalty = ffa * 1.5;   // yield loss per % FFA
  let reactionTime = baseTime;

  if (ffa > 3) {
    alcoholFactor = 0.22;
    catalystFactor = 0.012;
    reactionTime += 15;
  } else if (ffa <= 1) {
    alcoholFactor = 0.18;
    catalystFactor = 0.008;
    reactionTime -= 10;
  }

  // -----------------------------
  // SCALE-BASED ADJUSTMENTS
  // -----------------------------
  if (scale === "pilot") reactionTime += 5;
  if (scale === "msme") reactionTime += 15;

  // -----------------------------
  // FINAL CALCULATIONS
  // -----------------------------
  const alcohol = wco * alcoholFactor;
  const catalyst = wco * catalystFactor;
  const expectedYield = Math.max(baseYield - ffaPenalty, 75);

  // -----------------------------
  // UPDATE KPI CARDS
  // -----------------------------
  document.getElementById("alcohol").innerText =
    alcohol.toFixed(2) + " L";

  document.getElementById("catalyst").innerText =
    catalyst.toFixed(3) + " kg";

  document.getElementById("time").innerText =
    reactionTime + " min";

  document.getElementById("yield").innerText =
    expectedYield.toFixed(0) + " %";

  // -----------------------------
  // WARNINGS
  // -----------------------------
  const warningBox = document.getElementById("warningBox");
  if (wco > 50 || ffa > 3) {
    warningBox.style.display = "block";
  } else {
    warningBox.style.display = "none";
  }

  // -----------------------------
  // UPDATE CHARTS
  // -----------------------------
  updateCharts();
}

// -----------------------------
// CHART FUNCTIONS
// -----------------------------
function updateCharts() {

  // Yield vs FFA
  const ffaValues = [0, 1, 2, 3, 4, 5];
  const yieldValues = ffaValues.map(v => 92 - v * 1.5);

  // Reaction Time vs WCO
  const wcoValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const timeValues = wcoValues.map(v => 50 + v * 0.3);

  // Destroy old charts
  if (yieldChart) yieldChart.destroy();
  if (timeChart) timeChart.destroy();

  // Create Yield Chart
  yieldChart = new Chart(document.getElementById("yieldChart"), {
    type: "line",
    data: {
      labels: ffaValues,
      datasets: [{
        label: "Yield vs FFA (%)",
        data: yieldValues,
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.1)",
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });

  // Create Time Chart
  timeChart = new Chart(document.getElementById("timeChart"), {
    type: "bar",
    data: {
      labels: wcoValues,
      datasets: [{
        label: "Reaction Time vs WCO (L)",
        data: timeValues,
        backgroundColor: "#3498db"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

// Initial auto-run
runSimulation();

}

