function calculate() {

  // Read inputs
  let wco_ml = Number(document.getElementById("wco").value);
  let ffa = Number(document.getElementById("ffa").value);

  // Convert mL to L
  let wco = wco_ml / 1000;

  // Basic assumptions
  let alcohol_factor = 0.20;   // 20%
  let catalyst_factor = 0.01;  // 1%
  let base_time = 60;          // min
  let base_yield = 92;         // %

  // Adjust for FFA
  if (ffa > 3) {
    alcohol_factor = 0.22;
    catalyst_factor = 0.012;
    base_time += 15;
  }

  // Calculations
  let alcohol = wco * alcohol_factor;
  let catalyst = wco * catalyst_factor;
  let yield_value = base_yield - (ffa * 1.5);

  // Display results
  document.getElementById("alcohol").innerText =
    alcohol.toFixed(3) + " L";

  document.getElementById("catalyst").innerText =
    catalyst.toFixed(4) + " kg";

  document.getElementById("time").innerText =
    base_time + " minutes";

  document.getElementById("yield").innerText =
    yield_value.toFixed(1) + " %";
}





