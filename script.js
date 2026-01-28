function calculate() {

    // Read input
    let oil = parseFloat(document.getElementById("oilAmount").value);

    // Input validation
    if (isNaN(oil) || oil <= 0) {
        alert("Please enter a valid Waste Cooking Oil amount");
        return;
    }

    /* ================================
       STANDARD CHEMICAL CALCULATIONS
       ================================ */

    // Fixed ratios (literature-based)
    let alcohol = 0.20 * oil;     // Ethanol / Methanol
    let catalyst = 0.01 * oil;    // NaOH / KOH
    let additive = 0.03 * oil;    // Natural surfactant

    /* ================================
       RULE-BASED PROCESS PARAMETERS
       ================================ */

    let time;          // reaction time (minutes)
    let yieldPercent;  // expected yield (%)

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

    let temperature = 60; // constant temperature (°C)

    /* ================================
       DISPLAY STANDARD RESULTS
       ================================ */

    document.getElementById("alcohol").innerText = alcohol.toFixed(2);
    document.getElementById("catalyst").innerText = catalyst.toFixed(3);
    document.getElementById("additive").innerText = additive.toFixed(2);

    document.getElementById("time").innerText = time;
    document.getElementById("temp").innerText = temperature;
    document.getElementById("yield").innerText = yieldPercent;

    /* ================================
       PARAMETER SENSITIVITY ANALYSIS
       ================================ */

    // Minimum case
    document.getElementById("alc_min").innerText = (oil * 0.18).toFixed(2);
    document.getElementById("cat_min").innerText = (oil * 0.008).toFixed(3);
    document.getElementById("add_min").innerText = (oil * 0.02).toFixed(2);

    // Standard case
    document.getElementById("alc_std").innerText = (oil * 0.20).toFixed(2);
    document.getElementById("cat_std").innerText = (oil * 0.01).toFixed(3);
    document.getElementById("add_std").innerText = (oil * 0.03).toFixed(2);

    // Maximum case
    document.getElementById("alc_max").innerText = (oil * 0.22).toFixed(2);
    document.getElementById("cat_max").innerText = (oil * 0.012).toFixed(3);
    document.getElementById("add_max").innerText = (oil * 0.04).toFixed(2);
}




