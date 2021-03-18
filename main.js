// https://api.exchangeratesapi.io/latest
// Get global vars
let theform = document.querySelector("form");

// add addEventListener
theform.addEventListener("submit", function(e) {
  e.preventDefault();
  let cr1 = document.querySelector(".currency1").value;
  let cr2 = document.querySelector(".currency2").value;
  console.log(cr1);
  console.log(cr2);
  convertCurrencies(cr1, cr2);
})
// on page load get currency name list
getCurrencyList();
// Ajax request to get conversion rate
function convertCurrencies(cr1, cr2) {
  let url = `https://api.exchangeratesapi.io/latest?base=${cr1}&symbols=${cr2}`;
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    url,
    true
  );
  xhr.onload = function() {
    if(this.status == 200) {
      let result = JSON.parse(this.responseText);
      console.log(result.rates[cr2]);
      outputExchangeRate(cr1, cr2, result.rates[cr2]);
    }
  }
  xhr.send();
}
// AJAX Request to get all currencies to construct list
function getCurrencyList(){
  let url = "https://api.exchangeratesapi.io/latest";
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    url,
    true
  );
  xhr.onload = function() {
    if(this.status == 200) {
      let currency1 = document.querySelector(".currency1");
      let currency2 = document.querySelector(".currency2");
      let result = JSON.parse(this.responseText);
      let currencyList = Object.keys(result.rates);
      currencyList.push("EUR");
      console.log(currencyList);
      outputCurrencyList(currencyList, currency1, "USD");
      outputCurrencyList(currencyList, currency2, "JPY");
    }
  }
  xhr.send();
}

function outputExchangeRate(cr1, cr2, total) {
  let thetarg = document.querySelector(".currency-output h2");
  let output = `1 ${cr1} = ${total} ${cr2}`;
  thetarg.innerText = output;
}

function outputCurrencyList(list, targ, selected) {
  let output = "";
  list.forEach((item, i) => {
    if(item == selected) {
        output += `<option selected value="${item}">${item}</option>`;
      } else {
        output += `<option value="${item}">${item}</option>`;
      }
  });
  targ.innerHTML = output;
}
//https://api.exchangeratesapi.io/latest?base=USD&symbols=JPY
