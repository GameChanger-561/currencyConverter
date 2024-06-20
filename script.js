// declaring Variable for Base_URL for API
const baseURL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_KqGqQvPvsfHvqY5JZbbSx4R5Yl7UZpBRfACIvscc&currencies=";

// declaring Variables for DOM manipulation
const dropDowns = document.querySelectorAll(".select-container select");
const sbmtBtn = document.querySelector(".sbmt");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
let amount = document.querySelector("#amount");
let  = document.querySelector("#result"); 

// adding Options for DropDown Select
for (let select of dropDowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "INR"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "JPY"){
            newOption.selected = "selected";
        }
    }
    // adding sensitivity to change to DropDown Select
    select.addEventListener("change", (evt) => updateFlag(evt.target));
}

// Arrow-Function for updating Flag after change in Currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// adding sensitivity to click to submit-Button
sbmtBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtValue = amount.value;
    if (amtValue < 0 || amtValue === ""){
        amtValue = 0;
        amount.value = 0;
    }
    const url = `${baseURL}${toCurr.value}&base_currency=${fromCurr.value}`; //cutomizing the URL

    let response = await fetch(url); //fetching API using custom-URL

    let data = await response.json();
    data = data["data"]; //getting data in .json format

    let rate = data[toCurr.value]; //getting the Exchange Rate

    // getting the Exchanged Value and Displaying it
    result.value = amount.value * rate;
    resultVal = result.value;
    result.innerText = resultVal;
})