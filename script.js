// Select all <select> elements within elements that have the class 'selectcountries'
let selectcountries = document.querySelectorAll('.selectcountries select');

// Iterate over each select element found
for (let select of selectcountries) {

    // Iterate over each key in the countryList object
    for (let countryCurr in countryList) {

        // Create a new <option> element for each currency
        let newoption = document.createElement("option");
        newoption.innerHTML = countryCurr;

        // Set 'NPR' as the selected option for the 'from' select element by default
        if (select.name === 'from' && countryCurr === 'NPR') {
            newoption.selected = "selected";
        }
        // Set 'INR' as the selected option for the 'into' select element by default
        else if (select.name === 'into' && countryCurr === 'INR') {
            newoption.selected = "selected";
        }
        // Append the new option to the select element
        select.append(newoption);
    }

    // Add an event listener to update the flag image when the selected option changes
    select.addEventListener('change', (e) => {
        updateFlag(e.target); // Call updateFlag function with the event target (the select element)
    });
}

// Function to update the flag image based on the selected currency

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img;
    // Check if the element name is 'from' and get the corresponding image element
    if (element.name === 'from') {
        img = document.querySelector('.from img');
    }

    // Check if the element name is 'into' and get the corresponding image element
    else if (element.name === 'into') {
        img = document.querySelector('.into img');
    }

    // If the image element is found, update its src attribute to the new flag URL
    if (img) {
        img.src = newSrc;
    } else {
        console.error("Image element not found for:", element.name);
    }
};
//

//to generate exchange rate when clicked on the botton

const BASE_URL = "https://v6.exchangerate-api.com/v6/da8ba6a915b5c3df5abbcb55/pair"
let btn = document.querySelector('form .submitBtn')

btn.addEventListener('click', (e) => {
    //e contains the values presented of btn element in object form like what properties it has
    // console.log(e);
    e.preventDefault();
    updateExchangeRate();
})


window.addEventListener("load", () => {
    updateExchangeRate();
});

const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.into select')
const msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".acceptAmt input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 100;
        amount.value = "100";
    }

    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data)
    let rate = data.conversion_rate;
    console.log(rate)
    let finalAmount = amtVal * rate;
    console.log(finalAmount)
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
