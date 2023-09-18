const dog_or_cat = document.getElementById("feeding_calculator").dataset.type;

var feedAmounts = [0.2, 0.5, 1];
var feedAmountNames = ["Topper", "Booster", "Full"];

var packageSizes = [300, 900, 2500, 5000];
var packageCups = [5, 15, 42, 84];
var packageNames = ["300g", "900g", "2.5kg", "5kg"];
var tabTypes = ["main", "quantity", "weeks", "details"];
var possibleFlavors = ["Chicken", "Beef", "Pork", "Fish"];
var weightRanges = [
  "1 kilo",
  "2.5 kilos",
  "5 kilos",
  "7.5 kilos",
  "10 kilos",
  "15 kilos",
  "20 kilos",
  "25 kilos",
  "30 kilos",
  "35 kilos",
  "40 kilos",
];
var desexedRanges = ["Yes", "No"];
var activityRanges = ["1 - 10 mins", "30 mins", "30+ mins"];
var ageRanges = ["1 - 4 months", "5 - 12 months", "1 - 10 years", "10+ years"];

var calc_data = `1 - 4 months,1 kilo,0.50,0.50,0.50,0.50,0.50,0.50
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

if (dog_or_cat == "cat") {
  var feedAmounts = [1];
  var feedAmountNames = ["Full"];
  var weightRanges = [
    "1 kilo",
    "2 kilos",
    "3 kilos",
    "4 kilos",
    "5 kilos",
    "6 kilos",
    "7 kilos",
    "8 kilos",
    "9 kilos",
    "10 kilos",
  ];
  var ageRanges = ["1 - 10 years"];
  var calc_data = `1 - 10 years,1 kilo,
1 - 10 years,2 kilos,0.4,0.4,0.4,0.32,0.32,0.32
1 - 10 years,3 kilos,0.56,0.56,0.56,0.48,0.48,0.48
1 - 10 years,4 kilos,0.64,0.64,0.64,0.56,0.56,0.56
1 - 10 years,5 kilos,0.72,0.72,0.72,0.64,0.64,0.64
1 - 10 years,6 kilos,0.8,0.8,0.8,0.72,0.72,0.72
1 - 10 years,7 kilos,1.04,1.04,1.04,0.88,0.88,0.88
1 - 10 years,8 kilos,1.12,1.12,1.12,0.96,0,96,0.96)`.split("\n");
}

var calculator_app_url =
  "https://usage-member-liable-evanescence.trycloudflare.com";
export {
  feedAmounts,
  feedAmountNames,
  packageSizes,
  packageCups,
  packageNames,
  tabTypes,
  calc_data,
  possibleFlavors,
  calculator_app_url,
  ageRanges,
  weightRanges,
  desexedRanges,
  activityRanges,
};
