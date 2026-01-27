function calculate() {
    let oil = document.getElementById("oilAmount").value;

    if (oil === "" || oil <= 0) {
        alert("Enter a valid oil amount");
        return;
    }

    let alcohol = oil * 0.20;
    let catalyst = oil * 0.01;
    let additive = oil * 0.03;

    document.getElementById("alcohol").innerText = alcohol.toFixed(2);
    document.getElementById("catalyst").innerText = catalyst.toFixed(2);
    document.getElementById("additive").innerText = additive.toFixed(2);
}
