function calculate() {
    let oil = document.getElementById("oilAmount").value;

    if (oil === "" || oil <= 0) {
        alert("Enter a valid oil amount");
        return;
    }

    // Chemical calculations
    let alcohol = oil * 0.20;
    let catalyst = oil * 0.01;
    let additive = oil * 0.03;

    // Fixed process parameters
    let time = 60;        // minutes
    let temperature = 60; // °C
    let yieldPercent = 90;

    document.getElementById("alcohol").innerText = alcohol.toFixed(2);
    document.getElementById("catalyst").innerText = catalyst.toFixed(2);
    document.getElementById("additive").innerText = additive.toFixed(2);

    document.getElementById("time").innerText = time;
    document.getElementById("temp").innerText = temperature;
    document.getElementById("yield").innerText = yieldPercent;
}

