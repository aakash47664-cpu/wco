
function calculate() {

    // Read inputs
    let oil = parseFloat(document.getElementById("oilAmount").value);
    let ffa = parseFloat(document.getElementById("ffa").value);

    // Validation
    if (isNaN(oil) || oil <= 0) {
        alert("Please enter a valid Waste Cooking Oil amount");
        return;
    }

    if (isNaN(ffa) || ffa < 0) {
        alert("Please enter a valid FFA value");
        return;
    }

    /* =====================================
       BASE VALUES (AVERAGE QUALITY OIL)
       ===================================== */
    let alcoholFactor = 0.20;   // 20%
    let catalystFactor = 0.01;  // 1%
    let timeAdjustment = 0;
    let yieldAdjustment = 0;
    let quality;

    /* =====================================
       FFA-BASED QUALITY ADJUSTMENT
       ===================================== */
    if (ffa <= 1) {
        quality = "Good quality oil";
        alcoholFactor = 0.18;
        catalystFactor = 0.008;
        timeAdjustment = -10;
        yieldAdjustment = +2;
    } 
    else if (ffa <= 3) {
        quality = "Average quality oil";
        // Standard values retained
    } 
    else {
        quality = "Poor quality oil";
        alcoholFactor = 0.22;
        catalystFactor = 0.012;
        timeAdjustment = +15;
        yieldAdjustment = -4;
    }

    /* =====================================
       CHEMICAL CALCULATIONS
       ===================================== */
    let alcohol = alcoholFactor * oil;
    let catalyst = catalystFactor * oil;
    let additive = 0.03 * oil;   // Surfactant fixed

    /* =====================================
       BASE PROCESS PARAMETERS (BATCH SIZE)
       ===================================== */
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

    // Apply FFA-based corrections
    time = time + timeAdjustment;
    yieldPercent = yieldPercent + yieldAdjustment;

    let temperature = 60;

    /* =====================================
       DISPLAY RESULTS
       ===================================== */
    document.getElementById("alcohol").innerText = alcohol.toFixed(2);
    document.getElementById("catalyst").innerText = catalyst.toFixed(3);
    document.getElementById("additive").innerText = additive.toFixed(2);

    document.getElementById("time").innerText = time;
    document.getElementById("temp").innerText = temperature;
    document.getElementById("yield").innerText = yieldPercent;
    document.getElementById("quality").innerText = quality;
}




