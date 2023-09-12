import { calculate_amount } from "./calc";
import { activeFeedAmount } from "./index";

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
  const tabs = document.createElement("div");
  tabs.classList.add("tabs");
  filteredProducts[0].variants.forEach((variant) => {
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

    size.innerText = variant.sku.split(" ")[1];
    price.innerText = "$" + variant.price;
    days.innerText = calculate_amount();
    tab.classList.add("weeks-tab-button", "calc_days");
    tab.dataset.tabType = "weeks";

    tab.dataset.tab = `weeks-${variant.sku.split(" ")[1]}`;
    const activeFeedAmountSpan = document.createElement("div");
    activeFeedAmountSpan.classList.add("active-feed-amount");
    if (variant.title.includes("300")) {
      var size_number = 5;
    }
    if (variant.title.includes("900")) {
      var size_number = 15;
    }
    if (variant.title.includes("5")) {
      var size_number = 84;
    }
    if (variant.title.includes("2.5")) {
      var size_number = 42;
    }
    activeFeedAmountSpan.innerText =
      Math.floor(
        (size_number / calculate_amount()) * _active_feed_amount_multiplier()
      ) + " days";
    details.appendChild(size);
    // details.appendChild(days);
    tab.appendChild(details);
    tab.appendChild(activeFeedAmountSpan);
    tab.appendChild(price);
    tab.dataset.variantId = variant.id;
    tabs.appendChild(tab);
  });
  daySelector.appendChild(tabs);
};

export { showDaySelector };
