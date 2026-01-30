let yieldChart = null;
let timeChart = null;

const wco = document.getElementById("wco");
const ffa = document.getElementById("ffa");

const wcoVal = document.getElementById("wcoVal");
const ffaVal = document.getElementById("ffaVal");

wco.oninput = () => wcoVal.innerText = wco.value + " L";
ffa.oninput = () => ffaVal.innerText = ffa.value + " %";

function runSimulation() {

  const wcoValNum = Number(wco.value);
  const ffaValNum = Number(ffa.value);

  const alcohol = wcoValNum * 0.2;
  const catalyst = wcoValNum * 0.01;
  const time = 60 + ffaValNum * 5;
  const yieldVal = 92 - ffaValNum * 1.5;

  document.getElementById("alcohol").innerText = alcohol.toFixed(2) + " L";
  document.getElementById("catalyst").innerText = catalyst.toFixed(2) + " kg";
  document.getElementById("time").innerText = time + " min";
  document.getElementById("yield").innerText = yieldVal.toFixed(1) + " %";

  drawCharts(wcoValNum, ffaValNum);
}

function drawCharts(wco, ffa) {

  const ffaRange = [0,1,2,3,4,5];
  const yieldRange = ffaRange.map(x => 92 - x * 1.5);

  const wcoRange = [10,20,30,40,50];
  const timeRange = wcoRange.map(x => 50 + x * 0.3);

  if (yieldChart) yieldChart.destroy();
  if (timeChart) timeChart.destroy();

  yieldChart = new Chart(document.getElementById("yieldChart"), {
    type: "line",
    data: {
      labels: ffaRange,
      datasets: [{
        label: "Yield vs FFA",
        data: yieldRange,
        borderColor: "green",
        fill: false
      }]
    }
  });

  timeChart = new Chart(document.getElementById("timeChart"), {
    type: "bar",
    data: {
      labels: wcoRange,
      datasets: [{
        label: "Time vs WCO",
        data: timeRange,
        backgroundColor: "#3498db"
      }]
    }
  });
}

runSimulation();




