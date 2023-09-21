import { calc_data } from "./constants.js";
import {
  _age_input,
  _raw_age_input,
  _weight_input,
  _desexed_input,
  _activity_input,
} from "./data.js";
import { appendTimes } from "./index.js";

const calculate_amount = () => {
  const age = _raw_age_input().trim();
  const weight = _weight_input().trim();
  const desexed = _desexed_input().trim();
  const activity = _activity_input().trim();
  const age_filter = calc_data.filter((row) => {
    return row.includes(age);
  });
  const weight_filter = age_filter.filter((row) => {
    return row.includes(weight) == true;
  });

  var desexed_addition = 0;
  if (desexed.includes("Yes")) {
    desexed_addition = 3;
  }
  var activity_number = 0;
  switch (activity) {
    case "5 - 10 mins":
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
  if (weight_filter.length > 0) {
    const rowParts = weight_filter[0].split(",");
    if (rowParts.length >= 2 + activity_number + desexed_addition) {
      return parseFloat(rowParts[2 + activity_number + desexed_addition]);
    } else {
      console.log("Data not found for the specified criteria.");
      return null; // or handle the case where data is missing
    }
  } else {
    console.log(age, weight, desexed, activity, age_filter);
    console.log("No matching records found.");
    return null; // or handle the case where no matching records are found
  }
};

const updateAmounts = () => {
  updateCalculations(calculate_amount());
};

const updateProductPageAmounts = () => {
  const selectedSizeBlock = document.querySelector(":checked + .block-swatch");
  const selectedPrice = document
    .querySelector(".price-list--product sale-price")
    .innerText.split("$")[1];
  const selectedSize = selectedSizeBlock.innerText;
  if (selectedSize.includes("300")) {
    var packageCups = 5;
    var packageNice = "300g";
  }
  if (selectedSize.includes("900")) {
    var packageCups = 15;
    var packageNice = "900g";
  }
  if (selectedSize.includes("2.5")) {
    var packageCups = 42;
    var packageNice = "2.5kg";
  }
  if (selectedSize.includes(" 5")) {
    var packageCups = 84;
    var packageNice = "5kg";
  }
  const topperDietCups = document.getElementById("Topper_diet_days");
  const boosterDietCups = document.getElementById("Booster_diet_days");
  const fullDietCups = document.getElementById("Full_diet_days");
  const topperDietCupsAmount = calculate_amount() * 0.2;
  const boosterDietCupsAmount = calculate_amount() * 0.5;
  const fullDietCupsAmount = calculate_amount();

  topperDietCups.innerText = `${topperDietCupsAmount.toFixed(2)} cups/day`;
  boosterDietCups.innerText = `${boosterDietCupsAmount.toFixed(2)} cups/day`;
  fullDietCups.innerText = `${fullDietCupsAmount.toFixed(2)} cups/day`;

  const topperDietLast = document.createElement("div");
  topperDietLast.innerText = `${packageNice} will last ${Math.floor(
    packageCups / topperDietCupsAmount
  )} days.  Cost: $${(
    selectedPrice / Math.floor(packageCups / topperDietCupsAmount)
  ).toFixed(2)}/day`;
  topperDietCups.appendChild(topperDietLast);
  const boosterDietLast = document.createElement("div");
  boosterDietLast.innerText = `${packageNice} will last ${Math.floor(
    packageCups / boosterDietCupsAmount
  )} days. Cost: $${(
    selectedPrice / Math.floor(packageCups / boosterDietCupsAmount)
  ).toFixed(2)}/day`;
  boosterDietCups.appendChild(boosterDietLast);
  const fullDietLast = document.createElement("div");
  fullDietLast.innerText = `${packageNice} will last ${Math.floor(
    packageCups / fullDietCupsAmount
  )} days. Cost: $${(
    selectedPrice / Math.floor(packageCups / fullDietCupsAmount)
  ).toFixed(2)}/day`;
  fullDietCups.appendChild(fullDietLast);
};

const updateCalculations = (amount) => {
  var cups = amount;
  appendTimes(cups, amount);
};

export { updateAmounts, calculate_amount, updateProductPageAmounts };
