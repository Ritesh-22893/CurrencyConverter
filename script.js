// // Select all <select> elements within elements that have the class 'selectcountries'
// let selectcountries = document.querySelectorAll('.selectcountries select');

// // Iterate over each select element found
// for (let select of selectcountries) {

//     // Iterate over each key in the countryList object
//     for (let countryCurr in countryList) {

//         // Create a new <option> element for each currency
//         let newoption = document.createElement("option");
//         newoption.innerHTML = countryCurr;

//         // Set 'NPR' as the selected option for the 'from' select element by default
//         if (select.name === 'from' && countryCurr === 'NPR') {
//             newoption.selected = "selected";
//         }
//         // Set 'INR' as the selected option for the 'into' select element by default
//         else if (select.name === 'into' && countryCurr === 'INR') {
//             newoption.selected = "selected";
//         }
//         // Append the new option to the select element
//         select.append(newoption);
//     }

//     // Add an event listener to update the flag image when the selected option changes
//     select.addEventListener('change', (e) => {
//         updateFlag(e.target); // Call updateFlag function with the event target (the select element)
//     });
// }

// // Function to update the flag image based on the selected currency

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

//     let img;
//     // Check if the element name is 'from' and get the corresponding image element
//     if (element.name === 'from') {
//         img = document.querySelector('.from img');
//     }

//     // Check if the element name is 'into' and get the corresponding image element
//     else if (element.name === 'into') {
//         img = document.querySelector('.into img');
//     }

//     // If the image element is found, update its src attribute to the new flag URL
//     if (img) {
//         img.src = newSrc;
//     } else {
//         console.error("Image element not found for:", element.name);
//     }
// };
// //

// //to generate exchange rate when clicked on the botton

// const BASE_URL = "https://v6.exchangerate-api.com/v6/da8ba6a915b5c3df5abbcb55/pair"
// let btn = document.querySelector('form .submitBtn');
// let errorMessage = document.querySelector('.errorMessage');

// function hideErrorMsg(){
//     errorMessage.style.display = "none"; 
// }   

// btn.addEventListener('click', (e) => {
//     //e contains the values presented of btn element in object form like what properties it has
//     // console.log(e);
//     e.preventDefault();
//     updateExchangeRate();
// })


// window.addEventListener("load", () => {
//     updateExchangeRate();
// });

// const fromCurr = document.querySelector('.from select')
// const toCurr = document.querySelector('.into select')
// const msg = document.querySelector(".msg");

// const updateExchangeRate = async () => {
//     let amount = document.querySelector(".acceptAmt input");
//     let amtVal = amount.value;
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 100;
//         amount.value = "100";
//     }
//     else if(isNaN(amtVal)){
//         errorMessage.style.display = "flex" 
//     }

//     const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     console.log(data)
//     let rate = data.conversion_rate;
//     console.log(rate)
//     let finalAmount = amtVal * rate;
//     console.log(finalAmount)
//     if(isNaN(amtVal)){
//         msg.innerText = "Error !!"
        
//     }
// else{
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// }
// }

//second alternative 
// Get all <select> elements that are inside elements with the class 'selectcountries'
let selectCountries = document.querySelectorAll('.selectcountries select');

// Loop through each select element we found
selectCountries.forEach((select) => {

    // Loop through each key (country code) in the countryList object
    for (let countryCode in countryList) {

        // Create a new <option> element for each country
        let optionElement = document.createElement("option");
        optionElement.innerHTML = countryCode; // Set the text inside the option to the country code

        // If the select element's name is 'from' and the country is 'NPR', set it as selected by default
        if (select.name === 'from' && countryCode === 'NPR') {
            optionElement.selected = true;
        }
        // If the select element's name is 'into' and the country is 'INR', set it as selected by default
        else if (select.name === 'into' && countryCode === 'INR') {
            optionElement.selected = true;
        }

        // Add the new option to the select element
        select.appendChild(optionElement);
    }

    // Listen for changes on the select element and update the flag image when the user selects a different country
    select.addEventListener('change', (event) => {
        updateFlag(event.target); // Call the updateFlag function with the changed select element
    });
});

// This function updates the flag image based on the selected country in the dropdown
const updateFlag = (element) => {
    let selectedCountryCode = element.value; // Get the selected country code
    let countryISOCode = countryList[selectedCountryCode]; // Get the corresponding ISO code for the country
    let newFlagURL = `https://flagsapi.com/${countryISOCode}/flat/64.png`; // Construct the URL for the flag image

    let imgElement;
    // Check if we're updating the 'from' currency flag
    if (element.name === 'from') {
        imgElement = document.querySelector('.from img'); // Get the image element for the 'from' currency
    }
    // Check if we're updating the 'into' currency flag
    else if (element.name === 'into') {
        imgElement = document.querySelector('.into img'); // Get the image element for the 'into' currency
    }

    // If we found the image element, update its source to the new flag URL
    if (imgElement) {
        imgElement.src = newFlagURL;
    } else {
        console.error("Image element not found for:", element.name);
    }
};

// Define the base URL for the exchange rate API
const BASE_URL = "https://v6.exchangerate-api.com/v6/da8ba6a915b5c3df5abbcb55/pair";

// Get the button element from the form
let submitButton = document.querySelector('form .submitBtn');

// Get the error message container
let errorMessage = document.querySelector('.errorMessage');

// Function to hide the error message
function hideErrorMsg() {
    errorMessage.style.display = "none";
}

// Add an event listener to the button, so we run code when it's clicked
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    updateExchangeRate(); // Call the function to update the exchange rate
});

// Run the exchange rate update function when the page first loads
window.addEventListener("load", () => {
    updateExchangeRate();
});

// Get the select elements for the 'from' and 'into' currencies
const fromCurrencySelect = document.querySelector('.from select');
const toCurrencySelect = document.querySelector('.into select');

// Get the element where we'll display the exchange rate message
const exchangeRateMessage = document.querySelector(".msg");

// This function gets the exchange rate and updates the message on the page
const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".acceptAmt input"); // Get the input where the user types the amount
    let amountValue = amountInput.value; // Get the value the user entered

    // Check if the amount is empty or less than 1, and set it to 100 if so
    if (amountValue === "" || amountValue < 1) {
        amountValue = 100;
        amountInput.value = "100"; // Update the input to show 100
    }
    // Check if the amount entered is not a number (NaN)
    else if (isNaN(amountValue)) {
        errorMessage.style.display = "flex"; // Show the error message
        return; // Stop further execution of this function
    }

    // Create the URL to fetch the exchange rate from the API
    const apiUrl = `${BASE_URL}/${fromCurrencySelect.value}/${toCurrencySelect.value}`;
    
    // Fetch the exchange rate data from the API
    let response = await fetch(apiUrl);
    let data = await response.json(); // Convert the response to JSON
    let exchangeRate = data.conversion_rate; // Get the conversion rate from the data

    // Calculate the final amount after conversion
    let convertedAmount = amountValue * exchangeRate;

    // If the amount was NaN, show an error message in the UI
    if (isNaN(convertedAmount)) {
        exchangeRateMessage.innerText = "Error: Invalid amount!";
    } 
    // Otherwise, display the converted amount and currencies
    else {
        exchangeRateMessage.innerText = `${amountValue} ${fromCurrencySelect.value} = ${convertedAmount.toFixed(2)} ${toCurrencySelect.value}`;
    }
};
