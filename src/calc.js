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
  const age = _raw_age_input();
  const weight = _weight_input();
  const desexed = _desexed_input();
  const activity = _activity_input();
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
};

const updateAmounts = () => {
  updateCalculations(calculate_amount());
};

const updateCalculations = (amount) => {
  var cups = amount;
  appendTimes(cups, amount);
};

export { updateAmounts, calculate_amount };
