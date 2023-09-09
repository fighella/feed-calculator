// Load in DESEXED for all ages (even if no change) ---
// AGE		WEIGHT,False,5-10,False, 30,False, 30+,True, 5-10,True, 30,True, 30+ (True/False is desexed)
var feedAmounts = [0.2, 0.5, 1];
var feedAmountNames = ["Topper", "Booster", "Full"];
var packageSizes = [300, 900, 2500, 5000];
var packageCups = [5, 15, 42, 84];
var packageNames = ["300g", "900g", "2.5kg", "5kg"];
var tabTypes = ["main", "quantity", "weeks", "details"];

var calc_data =
  `AGE		WEIGHT,False,5 - 10,False, 30,False, 30+,True, 5 - 10,True, 30,True, 30+
1 - 4 months,1 kilo,0.50,0.50,0.50,0.50,0.50,0.50
1 - 4 months,2.5 kilos,1.50,1.50,1.50,1.50,1.50,1.50
1 - 4 months,5 kilos,2.25,2.25,2.25,2.25,2.25,2.25
1 - 4 months,7.5 kilos,2.75,2.75,2.75,2.75,2.75,2.75
1 - 4 months,10 kilos,3.50,3.50,3.50,3.50,3.50,3.50
1 - 4 months,15 kilos,5.00,5.00,5.00,5.00,5.00,5.00
1 - 4 months,20 kilos,6.25,6.25,6.25,6.25,6.25,6.25
1 - 4 months,25 kilos,6.25,6.25,6.25,6.25,6.25,6.25
1 - 4 months,30 kilos,6.25,6.25,6.25,6.25,6.25,6.25
1 - 4 months,35 kilos,6.25,6.25,6.25,6.25,6.25,6.25
1 - 4 months,40 kilos,6.25,6.25,6.25,6.25,6.25,6.25
5 - 12 months,1 kilo,0.50,0.50,0.50,0.50,0.50,0.50
5 - 12 months,2.5 kilos,1.00,1.00,1.00,1.00,1.00,1.00
5 - 12 months,5 kilos,1.50,1.50,1.50,1.50,1.50,1.50
5 - 12 months,7.5 kilos,1.75,1.75,1.75,1.75,1.75,1.75
5 - 12 months,10 kilos,2.25,2.25,2.25,2.25,2.25,2.25
5 - 12 months,15 kilos,3.25,3.25,3.25,3.25,3.25,3.25
5 - 12 months,20 kilos,4.25,4.25,4.25,4.25,4.25,4.25
5 - 12 months,25 kilos,5.25,5.25,5.25,5.25,5.25,5.25
5 - 12 months,30 kilos,5.25,5.25,5.25,5.25,5.25,5.25
5 - 12 months,35 kilos,5.25,5.25,5.25,5.25,5.25,5.25
5 - 12 months,40 kilos,5.25,5.25,5.25,5.25,5.25,5.25
1 - 10 years,1 kilo,0.50,1.00,1.25,0.25,0.50,0.75
1 - 10 years,2.5 kilos,1.00,1.25,1.50,0.75,0.75,1.00
1 - 10 years,5 kilos,1.25,1.50,1.75,1.00,1.25,1.50
1 - 10 years,7.5 kilos,1.75,2.00,2.25,1.50,1.75,2.00
1 - 10 years,10 kilos,2.00,2.25,2.50,1.75,2.00,2.25
1 - 10 years,15 kilos,2.75,3.00,3.50,2.50,2.75,3.00
1 - 10 years,20 kilos,3.50,4.00,4.50,3.25,3.50,3.75
1 - 10 years,25 kilos,4.25,4.50,5.00,4.00,4.25,4.50
1 - 10 years,30 kilos,5.00,5.50,6.00,4.50,4.75,5.00
1 - 10 years,35 kilos,5.75,6.00,6.50,5.00,5.25,5.75
1 - 10 years,40 kilos,6.50,6.50,7.00,5.50,6.00,6.25
10+ years,1 kilo,0.00,0.50,0.75,0.00,0.50,0.75
10+ years,2.5 kilos,0.75,0.75,1.00,0.75,0.75,1.00
10+ years,5 kilos,1.00,1.25,1.50,1.00,1.25,1.50
10+ years,7.5 kilos,1.50,1.75,2.00,1.50,1.75,2.00
10+ years,10 kilos,1.75,2.00,2.25,1.75,2.00,2.25
10+ years,15 kilos,2.50,2.75,3.00,2.50,2.75,3.00
10+ years,20 kilos,3.25,3.50,3.75,3.25,3.50,3.75
10+ years,25 kilos,4.00,4.25,4.50,4.00,4.25,4.50
10+ years,30 kilos,4.50,4.75,5.00,4.50,4.75,5.00
10+ years,35 kilos,5.00,5.25,5.75,5.00,5.25,5.75
10+ years,40 kilos,5.50,6.00,6.25,5.50,6.00,6.25`.split("\n");

// var calculator_app_url =
//   "https://usage-member-liable-evanescence.trycloudflare.com";

function handleTabClick(event) {
  openTab(event, this.dataset.tab);
  if (this.hasAttribute("data-emailfield")) {
    emailFieldFocus(this.dataset.emailfield);
  }
  if (this.hasAttribute("data-scrollto")) {
    scrollTo();
  }
}

function tabClicks() {
  tabTypes.forEach((tabType) => {
    const buttons = document.querySelectorAll("." + tabType + "-tab-button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleTabClick);
    });
  });
}

function animationEffect() {
  const element = document.querySelector("main-calc-step-1");
  element.classList.add("animate__animated", "animate__bounceOutLeft");
}

function calculate_amount(age, weight, desexed, activity) {
  console.log(age, weight, desexed, activity);

  const age_filter = calc_data.filter((row) => {
    return row.includes(age);
  });
  // console.log("Age Filter", age_filter);
  const weight_filter = age_filter.filter((row) => {
    return row.includes(weight) == true;
  });
  //console.log("Weight Filter", weight_filter);

  var desexed_addition = 0;
  if (desexed.includes("Yes")) {
    desexed_addition = 3;
  }
  var activity_number = 0;
  switch (activity) {
    case "1 - 10 mins":
      activity_number = 0;
      break;
    case "30 mins":
      activity_number = 1;
      break;
    case "30+ mins":
      activity_number = 2;
      break;
    default:
      activity_number = 0;
  }
  //return weight_filter[0].split(",")[2 + activity_number + desexed_addition];
  if (weight_filter.length > 0) {
    const rowParts = weight_filter[0].split(",");
    if (rowParts.length >= 2 + activity_number + desexed_addition) {
      return parseFloat(rowParts[2 + activity_number + desexed_addition]);
    } else {
      console.log("Data not found for the specified criteria.");
      return null; // or handle the case where data is missing
    }
  } else {
    console.log("No matching records found.");
    return null; // or handle the case where no matching records are found
  }
}

function selectFlavor() {
  var flavor_picker = document.getElementById("flavor_picker");
  var flavors = flavor_picker.querySelectorAll(".flavor");
  flavors.forEach((flavor) => {
    flavor.addEventListener("click", function (event) {
      event.preventDefault();
      getProducts(flavor.dataset.flavor, "Adult");
    });
  });
}

function openTab(evt, tabName) {
  const tabType = tabName.split("-")[0];

  var i, tabContent, tabButtons;

  tabContent = document.getElementsByClassName(tabType + "-tab");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabButtons = document.getElementsByClassName(tabType + "-tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replaceAll(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  updateAmounts();
}

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

function updateAmounts() {
  // const inputs = document.querySelectorAll("input");
  var _age_input = document.getElementById(
    "popover-variant-dropdown-template--age-selected-value"
  ).innerText;
  var _weight_input = document.getElementById(
    "popover-variant-dropdown-template--weight-selected-value"
  ).innerText;
  var _activity_input = document.getElementById(
    "popover-variant-dropdown-template--activity-selected-value"
  ).innerText;
  var _desexed_input = document.getElementById(
    "popover-variant-dropdown-template--desexed-selected-value"
  ).innerText;
  console.log("UPDATE AMOUNTS");
  // inputs.forEach((_input) => {
  //   console.log('========INPUT=============')
  //   _input.addEventListener(
  //     "change",
  updateCalculations(
    calculate_amount(_age_input, _weight_input, _desexed_input, _activity_input)
  );
  //   );
  // });
}

async function getVariantPrice(size_index, el) {
  fetch(window.Shopify.routes.root + "collections/calculator/products.json")
    .then((response) => response.json())
    .then((data) => {
      el.innerText = data.products[0].variants[size_index].price;
    });
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function decimalToFraction(_decimal) {
  var top = (Math.ceil(_decimal * 4) / 4)
    .toFixed(2)
    .toString()
    .replace(/\d+[.]/, "");
  if (_decimal < 0.25) {
    var top = (Math.ceil(_decimal * 10) / 10)
      .toFixed(2)
      .toString()
      .replace(/\d+[.]/, "");
  }
  var bottom = Math.pow(10, top.length);
  if (_decimal > 1) {
    top = +top + Math.floor(_decimal) * bottom;
  }
  var x = gcd(top, bottom);
  return {
    top: top / x,
    bottom: bottom / x,
    display: top / x + "/" + bottom / x,
  };
}

function convertStringToHTML(htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");
  return html.body;
}

function prettyNumber(_number, el) {
  if (_number >= 1) {
    var integer = document.createElement("span");
    integer.innerText = Math.floor(_number);
    el.append(integer);
    if (_number % 1 == 0) {
      // dont attach the fraction if a whole number
    } else {
      integer.classList.add("integer");
      var fraction = document.createElement("span");
      fraction.classList.add("fraction");
      fraction.innerText = decimalToFraction(
        _number - Math.floor(_number)
      ).display;
      integer.append(fraction);
    }
    el.append(" cups/day");
  } else {
    el.append(decimalToFraction(_number).display + " cup/day");
  }
}

function daysUpdate(_size, _daily_grams, _feed_amount) {
  var activeFeedAmount = document
    .querySelectorAll(".quantity-step-indicator.active h4")[0]
    .innerText.split(" ")[0];
  console.log(activeFeedAmount);
  var calc_days = document.querySelectorAll(".calc_days");

  calc_days.forEach((day) => {
    day.style.display = "none";
  });
  // Im sure this is available somewhere else - but i'm tired
  var filtered_feed_amounts = feedAmountNames.filter(
    (name) => name == activeFeedAmount
  );
  filtered_feed_amounts.forEach((feed_amount_name) => {
    var dayLoop = document.querySelectorAll(
      ".calc_days_" + _size + "_" + feed_amount_name
    );
    var cup_day = document.getElementById(`${feed_amount_name}_diet_days`);
    // cup_day.innerText = prettyNumber(_daily_grams * feedAmounts[feedAmountNames.indexOf(feed_amount_name)]) + decimalToFraction(_daily_grams * feedAmounts[feedAmountNames.indexOf(feed_amount_name)]).display + ' cups/day' + (_daily_grams * feedAmounts[feedAmountNames.indexOf(feed_amount_name)]);
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
      getVariantPrice(
        packageSizes.indexOf(_size),
        day.querySelectorAll(".package_price")[0]
      );
      day.style.display = "block";
    });
  });
}

function appendTimes(grams, amount) {
  packageSizes.forEach((size) => {
    daysUpdate(size, grams, amount);
  });
}

function updateCalculations(amount) {
  var full_diet = document.getElementById("full_diet_calc");
  var booster_diet = document.getElementById("booster_diet_calc");
  var topper_diet = document.getElementById("topper_diet_calc");
  var day_tabs = document.getElementById("week-tabs");
  var cups = amount;
  // full_diet.innerText = `${amount}/Cups per day - ${grams}g per day`;
  // booster_diet.innerText = `${amount * 0.5}/Cups per day - ${grams * 0.5}g per day`;
  // topper_diet.innerText = `${amount * 0.2}/Cups per day - ${grams * 0.2}g per day`;
  appendTimes(cups, amount);
}

function scrollTo() {
  var _scrollto = document.getElementById("calc_progress");
  _scrollto.scrollIntoView({
    alignToTop: true,
    behavior: "smooth",
    inline: "start",
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log("dbgject", dataObject);
  setCookie("calculator_customer_id", dataObject.email);
  setDogNames(dataObject.name);
  saveData(dataObject);
  var nextStep = document.getElementById("main-calc-stepper-2");
  nextStep.click();
}

function emailFieldFocus(id) {
  var emailField = document.getElementById(id);
  emailField.focus();
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

function setCookie(key, value) {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Cookie expires in 30 days
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${key}=${value}; ${expires}; path=/`;
}

function getCookie(key) {
  const cookies = document.cookie.split(";");
  var _email = "--not-set--";
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.trim().split("=");
    if (cookieKey === key) {
      console.log("CV", key, cookieKey, cookieValue);
      var _email = cookieValue;
    }
  }
  return _email;
}

function checkAndSetCookie() {
  const key = "calculator_customer_id";

  const existingValue = getCookie(key);
  console.log("Exisitng Value", existingValue);
  if (existingValue === null) {
    console.log("No Cookie Found");
    const now = new Date().toISOString();
    setCookie(key, now);
    return now;
  } else {
    console.log("Cookie Found", existingValue);
    return existingValue;
  }
}

function setEmailFormFieldByCookie() {
  const cookieEmail = getCookie("calculator_customer_id");
  if (cookieEmail.includes("@")) {
    setCustomer();
  }
}

function setCustomer() {
  const customer_id = getCookie("calculator_customer_id");
  const customer_id_element = document.getElementById("customer_email");
  customer_id_element.setAttribute("value", customer_id);
}

function getProducts(filter_flavor, filter_age) {
  console.log("----- GET PRODUCTS ------");
  fetch(window.Shopify.routes.root + "collections/calculator/products.json")
    .then((response) => response.json())
    .then((response) =>
      showProducts(response.products, filter_flavor, filter_age)
    );
}

function string_parameterize(str1) {
  return str1
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
}

function showProducts(products, flavor_filter, age_filter) {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";
  const productItemList = document.createElement("div");
  productItemList.classList.add("calculator_products");
  var filtered_products = products.filter((product) => {
    return (
      product.tags.some((tag) => tag == flavor_filter) &&
      product.tags.some((tag) => tag == age_filter)
    );
  });
  console.log("Filtered Products", filtered_products);
  filtered_products.forEach((product) => {
    const productItem = document.createElement("div");
    // console.log("Tags", product.tags);
    product.tags.forEach((tag) => {
      productItem.classList.add(`calc-${string_parameterize(tag)}`);
    });

    // productItem.classList.add(product.tags)
    productItem.classList.add("calculator_product");
    const img = product.images[0] ? product.images[0].src : "";
    productItem.innerHTML = `<div class=\"calculator_product_img\"><img src=\"${img}\" />${product.title}</div>`;
    product.variants.forEach((variant) => {
      var variant_item = document.createElement("div");
      variant_item.classList.add("calculator_product_variant");
      variant_item.append(variant.title);
      variant_item.append(variant.price);

      productItem.append(variant_item);
    });
    productItemList.appendChild(productItem);
  });
  productsList.appendChild(productItemList);
}

function checkIsCalculator() {
  console.log(
    "%c ==Check is FEED CALCULATOR PAGE==",
    "background: #222; color: #bada55"
  );
  var feeding_calculator = document.getElementById("feeding_calculator");
  return typeof feeding_calculator != "undefined" && feeding_calculator != null;
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

// Open the first tab by default
window.addEventListener("load", () => {
  if (checkIsCalculator()) {
    console.log(
      "%c ====LOAD CALCULATOR=====",
      "background: #222; color: #bada55"
    );
    // See if the customer has used the form and try and bring back some info
    const cookieResult = checkAndSetCookie();
    console.log("Cookie result:", cookieResult);
    // If the customer has used the form, put the email address saved into the Email Field on the form
    var active_step = document.getElementById("active_tab").dataset.tab;
    document.getElementById("main-calc-step-" + active_step).style.display =
      "block";
    tabClicks();
    getPets(cookieResult);
    getProducts("Beef", "Adult"); // Defaults
    selectFlavor();
    updateAmounts();
    updateDogName();
    calculate();
  } else {
    console.log(
      "%c =====NOT FEEDING CALCULATOR======",
      "background: #222; color: #bada55"
    );
  }
});
