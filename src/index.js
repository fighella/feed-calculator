// Load in DESEXED for alslse,5-10,False, 30,False, 30+,True,s 5-s10,True, 30,True, 30+ (True/False is desexed)
import { _devDidNotLoadMessage, _devLoadMessage } from "./dev.js";
import {
  feedAmounts,
  feedAmountNames,
  packageSizes,
  packageCups,
  packageNames,
} from "./constants.js";
import { productPageCalculator } from "./product-page.js";
import {
  VariantData,
  getProducts,
  getAllProducts,
  _activity_input,
  _age_input,
  _desexed_input,
  _weight_input,
  _flavor_input,
} from "./data.js";
import { tabClicks } from "./tabs.js";
import { prettyNumber, checkIsCalculator } from "./utils.js";
import { updateAmounts } from "./calc.js";
import { selectFlavor, getAvailableFlavors } from "./flavors.js";
import { showDaySelector } from "./days.js";
import { showProducts } from "./products.js";

function calculate() {
  const petForm = document.getElementById("pet-form");
  petForm.addEventListener("submit", onFormSubmit);
}

function updateDogName() {
  var _input = document.getElementById("name-input");
  _input.onkeyup = function () {
    setDogNames(_input.value);
  };
}

const activeFeedAmount = () => {
  const afa = document
    .querySelectorAll(".quantity-step-indicator.active h4")[0]
    .innerText.split(" ")[0];
  return afa;
};

function daysUpdate(_size, _daily_grams, _feed_amount) {
  // Im sure this is available somewhere else - but i'm tired
  // console.log(_size, _daily_grams, _feed_amount);
  var filtered_feed_amounts = feedAmountNames.filter(
    (name) => name == activeFeedAmount()
  );
  filtered_feed_amounts.forEach((feed_amount_name) => {
    var dayLoop = document.querySelectorAll(
      ".calc_days_" + _size + "_" + feed_amount_name
    );
    var cup_day = document.getElementById(`${feed_amount_name}_diet_days`);
    cup_day.innerText = ""; //Clear Cup Day Loop
    prettyNumber(
      _daily_grams * feedAmounts[feedAmountNames.indexOf(feed_amount_name)],
      cup_day
    );
    dayLoop.forEach((day) => {
      day.querySelectorAll(".feed_amount_name")[0].innerText = feed_amount_name;
      day.querySelectorAll(".feed_amount_name")[0].dataset.feed_amount_name =
        feed_amount_name;
      day.querySelectorAll(".feed_amount_name")[0].style.display = "none";
      day.querySelectorAll(".package_size")[0].innerText =
        packageNames[packageSizes.indexOf(_size)];
      day.querySelectorAll(".number_of_days")[0].innerText =
        packageCups[packageSizes.indexOf(_size)] /
        (_daily_grams * feedAmounts[feedAmountNames.indexOf(feed_amount_name)]);
      VariantData(
        packageSizes.indexOf(_size),
        day.querySelectorAll(".package_price")[0]
      );
      day.style.display = "block";
    });
  });
}

function appendTimes(grams, amount) {
  packageSizes.forEach((size) => {
    console.log(size);
    daysUpdate(size, grams, amount);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log("dbgject", dataObject);
  // setCookie("calculator_customer_id", dataObject.email);
  setDogNames(dataObject.name);
  // saveData(dataObject);
  var nextStep = document.getElementById("main-calc-stepper-2");
  nextStep.click();
}

function setDogNames(name) {
  var dog_names = document.querySelectorAll(".dogname");
  var name_or_default = name || "your dog";
  dog_names.forEach(
    (dog_name_text) => (dog_name_text.innerText = name_or_default)
  );
}

function showPets(pets) {
  const petsList = document.getElementById("pets-list");
  petsList.innerHTML = "";
  pets.forEach((pet) => {
    const petItem = document.createElement("li");
    petItem.innerHTML = `<div>${pet.name},${pet.age},${pet.breed},${pet.activity_level}</div>`;
    petsList.appendChild(petItem);
  });
}

function getPets(customer_id_or_cookie) {
  fetch(
    calculator_app_url + "/pets.json?customer_email=" + customer_id_or_cookie
  )
    .then((response) => response.json())
    .then((response) => showPets(response));
}

function setCustomer() {
  const customer_id = getCookie("calculator_customer_id");
  const customer_id_element = document.getElementById("customer_email");
  customer_id_element.setAttribute("value", customer_id);
}

async function saveData(data) {
  const url = calculator_app_url + "/update-pets.json";
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const loadCalculator = () => {
  // If the customer has used the form, put the email address saved into the Email Field on the form
  var active_step = document.getElementById("active_tab").dataset.tab;
  document.getElementById("main-calc-step-" + active_step).style.display =
    "block";
  tabClicks();
  // getPets(cookieResult);
  getProducts(); // Defaults
  selectFlavor();

  updateDogName();

  calculate();
};

const checkIsProductPageCalculator = () => {
  const productPageCalculator = document.getElementById(
    "product-page-calculator"
  );
  if (productPageCalculator) {
    return true;
  } else {
    return false;
  }
};

const loadProducts = () => {
  getAllProducts().then((products) => {
    showDaySelector(products);
    getAvailableFlavors(products);
    showProducts(products);
    updateAmounts();
  });
};

// Open the first tab by default
window.addEventListener("load", () => {
  if (checkIsCalculator()) {
    _devLoadMessage();
    // loadAllProducts and passdown to the functions that need to know about them ONCE here
    loadCalculator();
    loadProducts();
  } else {
    _devDidNotLoadMessage();
  }
  if (checkIsProductPageCalculator()) {
    console.log("Go Here!");
    productPageCalculator();
  }
});

export { appendTimes, activeFeedAmount, loadProducts };
