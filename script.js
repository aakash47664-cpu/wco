function calculate() {
    let oil = parseFloat(document.getElementById("oilAmount").value);

    if (isNaN(oil) || oil <= 0) {
        alert("Enter a valid waste cooking oil amount");
        return;
    }

    // Chemical calculations
    let alcohol = oil * 0.20;      // Ethanol / Methanol
    let catalyst = oil * 0.01;     // NaOH / KOH
    let additive = oil * 0.03;     // Natural surfactant

    // Rule-based process parameters
    let time, yieldPercent;

    if (oil <= 10) {
        time = 45;
        yieldPercent = 92;
    } else if (oil <= 50) {
        time = 60;
        yieldPercent = 90;
    } else {
        time = 75;
        yieldPercent = 88;
    }

    let temperature = 60; // constant

    // Display results
    document.getElementById("alcohol").innerText = alcohol.toFixed(2);
    document.getElementById("catalyst").innerText = catalyst.toFixed(2);
    document.getElementById("additive").innerText = additive.toFixed(2);

    document.getElementById("time").innerText = time;
    document.getElementById("temp").innerText = temperature;
    document.getElementById("yield").innerText = yieldPercent;
}


