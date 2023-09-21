import { calculate_amount } from "./calc";
import { selectVariantByIndex, selectVariantByTitle } from "./utils";

import {
  _age_input,
  _flavor_input,
  _active_feed_amount,
  _active_feed_amount_multiplier,
} from "./data";

const showDaySelector = (products) => {
  const filteredProducts = Array.from(products).filter((product) => {
    return (
      product.tags.includes(_age_input()) &&
      product.tags.includes(_flavor_input())
    );
  });
  const daySelector = document.getElementById("day-selector");
  daySelector.innerHTML = "";
  const tabs_features = document.createElement("div");
  tabs_features.classList.add("tabs_features");
  const tabs = document.createElement("div");
  tabs.classList.add("tabs");
  filteredProducts[0].variants.forEach((variant) => {
    const tab = document.createElement("div");
    const savings = document.createElement("div");
    tab.classList.add("feature_tab");
    // if (variant.title.includes("300")) {
    //   return false
    // }
    // if (variant.title.includes("900")) {
    //   return false
    // }
    if (variant.title.includes("5") && !variant.title.includes("2.5")) {
      savings.classList.add("savings");
      savings.innerText = "Save 13%";
      tab.appendChild(savings);
    }
    if (variant.title.includes("2.5")) {
      savings.classList.add("savings");
      savings.innerText = "Save 7%";
      tab.appendChild(savings);
    }
    tabs_features.appendChild(tab);
  });
  const tabs_featureholder = document.getElementById("day-selector-features");
  tabs_featureholder.innerHTML = "";
  tabs_featureholder.appendChild(tabs_features);
  const dogs_or_cats =
    document.getElementById("feeding_calculator").dataset.type;
  const calc_percent = document.getElementById("calc_percent");
  const calc_days = document.getElementById("calc_days");
  const calc_total = document.getElementById("calc_total");
  const calc_daily = document.getElementById("calc_daily");
  var vindex = 0;
  filteredProducts[0].variants.forEach((variant) => {
    const number_of_choices = filteredProducts[0].variants.length;
    document.getElementById("number_of_choices").innerText = number_of_choices;
    const details = document.createElement("div");
    const tab = document.createElement("div");

    const name = document.createElement("span");
    const size = document.createElement("span");
    const days = document.createElement("span");
    const price = document.createElement("span");
    name.classList.add("feed_amount_name");
    size.classList.add("package_size");
    days.classList.add("number_of_days");
    price.classList.add("package_price");
    if (dogs_or_cats == "cat") {
      size.innerText = "Our " + variant.title.split(":")[0] + " bag";
    } else {
      size.innerText = "Our " + variant.sku.split(" ")[1] + " bag";
    }

    days.innerText = calculate_amount();
    tab.classList.add("weeks-tab-button", "calc_days");
    tab.dataset.tabType = "weeks";

    tab.dataset.tab = `weeks-${variant.sku.split(" ")[1]}`;
    tab.dataset.vindex = vindex;

    vindex = vindex + 1;
    const activeFeedAmountSpan = document.createElement("div");
    activeFeedAmountSpan.classList.add("active-feed-amount");
    if (variant.title.includes("300")) {
      var size_number = 5;
    }
    if (variant.title.includes("900")) {
      var size_number = 15;
    }
    if (variant.title.includes("5") && !variant.title.includes("2.5")) {
      var size_number = 84;
    }
    if (variant.title.includes("2.5")) {
      var size_number = 42;
    }
    const numberOfDays = Math.floor(
      size_number / calculate_amount() / _active_feed_amount_multiplier()
    );
    const pricePerDay =
      "Cost: $" + (variant.price / numberOfDays).toFixed(2) + "/day";
    const weeksInfo = document.getElementById("weeks_field").value;
    if (weeksInfo) {
      if (variant.title.includes(weeksInfo)) {
        calc_percent.innerText = _active_feed_amount_multiplier() * 100 + "%";
        calc_days.innerText = numberOfDays;
        calc_total.innerText = variant.title + ": $" + variant.price;
        calc_daily.innerText = pricePerDay;
        tabs.querySelectorAll(".weeks-tab-button").forEach((tab) => {
          tab.classList.remove("active");
        });
        tab.classList.add("active");
      }
    } else {
      if (
        variant.title.includes(dogs_or_cats == "cat" ? "900" : "2.5") == true
      ) {
        calc_percent.innerText = _active_feed_amount_multiplier() * 100 + "%";
        calc_days.innerText = numberOfDays;
        calc_total.innerText = variant.title + ": $" + variant.price;
        calc_daily.innerText = pricePerDay;
        tabs.querySelectorAll(".weeks-tab-button").forEach((tab) => {
          tab.classList.remove("active");
        });
        tab.classList.add("active");
      }
    }
    const active_variant_title = document.querySelectorAll(
      "#products-list .variant-picker .relative button"
    );
    console.log(active_variant_title, variant.title);
    if (variant.title == active_variant_title.innerText) {
      calc_percent.innerText = _active_feed_amount_multiplier() * 100 + "%";
      calc_days.innerText = numberOfDays;
      calc_total.innerText = variant.title + ": $" + variant.price;
      calc_daily.innerText = pricePerDay;
      tabs.querySelectorAll(".weeks-tab-button").forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
    }

    activeFeedAmountSpan.innerText = "will last " + numberOfDays + " days";
    price.innerText = pricePerDay;

    const activeFeedAmountText = document.getElementById(
      "active-feed-amount-text"
    );
    var filler = _active_feed_amount() == "Full" ? " Diet" : "";
    var a_or_no_a = _active_feed_amount() == "Full" ? "" : " a ";
    if (dogs_or_cats == "dog") {
      activeFeedAmountText.innerText =
        ", as " + a_or_no_a + _active_feed_amount() + filler + ": ";
    }
    details.appendChild(size);
    // details.appendChild(days);
    tab.appendChild(details);
    tab.appendChild(activeFeedAmountSpan);
    tab.appendChild(price);
    tab.dataset.variantId = variant.id;
    tab.dataset.variantTitle = variant.title;
    tab.style.width = 100 / number_of_choices + "%";
    tabs.appendChild(tab);
    tab.addEventListener("click", (e) => {
      selectVariantByTitle(e.currentTarget.dataset.variantTitle);
      // selectVariantByIndex(e.currentTarget.dataset.vindex);
      tabs.querySelectorAll(".weeks-tab-button").forEach((tab) => {
        tab.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      calc_percent.innerText = _active_feed_amount_multiplier() * 100 + "%";
      calc_days.innerText = numberOfDays;
      calc_daily.innerText = pricePerDay;
      calc_total.innerText = variant.title + ": $" + variant.price;
    });
  });
  daySelector.appendChild(tabs);
};

export { showDaySelector };
