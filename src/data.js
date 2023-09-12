import { showProducts } from "./products.js";
import {
  ageRanges,
  weightRanges,
  activityRanges,
  desexedRanges,
} from "./constants.js";

const getProducts = async () => {
  console.log("----- GET PRODUCTS ------");
  // should just filter get all products TODO
  await fetch(
    window.Shopify.routes.root + "collections/calculator/products.json"
  )
    .then((response) => response.json())
    .then((response) => showProducts(response.products));
};

const getAllProducts = async () => {
  const allProducts = new Set();
  try {
    const response = await fetch(
      "https://frontierpets.com.au/collections/calculator/products.json"
    );
    if (!response.ok) {
      console.log("Naughty Response");
    }
    const data = await response.json();
    data.products.forEach((product) => {
      allProducts.add(product);
    });
    return allProducts;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const VariantData = (size_index, el) => {
  fetch("https://frontierpets.com.au/collections/calculator/products.json")
    .then((response) => response.json())
    .then((data) => {
      el.innerText = data.products[0].variants[size_index].price;
    });
};
var _flavor_input = () => {
  return document.getElementById("selected_flavor").value;
};

const adultOrPuppy = (_raw_age) => {
  var converted_age = "Adult";
  if (_raw_age.includes("months")) {
    var converted_age = "Puppy";
  }
  return converted_age;
};

var _raw_age_input = () => {
  return (
    document.getElementById(
      "popover-variant-dropdown-template--age-selected-value"
    )?.innerText ?? ageRanges[0]
  );
};

const _age_input = () => {
  return adultOrPuppy(_raw_age_input());
};

var _weight_input = () => {
  return (
    document.getElementById(
      "popover-variant-dropdown-template--weight-selected-value"
    )?.innerText ?? weightRanges[0]
  );
};
var _activity_input = () => {
  return (
    document.getElementById(
      "popover-variant-dropdown-template--activity-selected-value"
    )?.innerText ?? activityRanges[0]
  );
};

var _desexed_input = () => {
  return (
    document.getElementById(
      "popover-variant-dropdown-template--desexed-selected-value"
    )?.innerText ?? desexedRanges[0]
  );
};

var _active_feed_amount = () => {
  return document.querySelector(".quantity-tab-button.active").dataset.value;
};

var _active_feed_amount_multiplier = () => {
  return document.querySelector(".quantity-tab-button.active").dataset
    .multiplier;
};

export {
  VariantData,
  getProducts,
  getAllProducts,
  _age_input,
  _weight_input,
  _activity_input,
  _desexed_input,
  _flavor_input,
  _raw_age_input,
  _active_feed_amount,
  _active_feed_amount_multiplier,
};
