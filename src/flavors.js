import { getProducts } from "./data.js";
import { possibleFlavors } from "./constants";
import { loadProducts } from "./index.js";
import { selectVariantByTitle } from "./utils.js";

const getAvailableFlavors = (products) => {
  const flavors = new Set();
  products.forEach((product) => {
    product.tags.forEach((tag) => {
      if (possibleFlavors.includes(tag)) {
        flavors.add(tag);
      }
    });
  });
  showFlavors(Array.from(flavors));
  return flavors;
};

const setTab = (variantTitle) => {
  document.getElementById("weeks_field").value = variantTitle;
};

const showFlavors = (flavors) => {
  var flavor_picker = document.getElementById("flavor_picker");
  var flavors_block = document.createElement("div");
  flavors_block.classList.add("flavors");
  flavors_block.id = "flavors";
  flavor_picker.innerHTML = "";
  flavors_block.innerHTML = "";
  flavors.forEach((flavor) => {
    var flavor_span = document.createElement("h4");
    var flavor_div = document.createElement("div");
    flavor_span.classList.add("header_secondary");
    console.log("Flavor", flavor);
    flavor_span.innerText = flavor == "Fish" ? "Fish with Lamb" : flavor;
    flavors_block.appendChild(flavor_div);
    flavor_div.classList.add("flavor");
    flavor_div.id = flavor.toLowerCase() + "_flavor";
    flavor_div.dataset.flavor = flavor;
    var flavor_img = document.createElement("div");
    flavor_img.classList.add("img");
    if (
      flavor.toLowerCase() ==
      document.getElementById("selected_flavor").value.toLowerCase()
    ) {
      flavor_div.classList.add("active");
      flavor_img.style.border = "2px solid var(--fp-blue)";
    }
    var flavor_img_img = document.createElement("img");
    flavor_img_img.src = `//frontierpets.com.au/cdn/shop/t/56/assets/calculator_${
      flavor.toLowerCase() == "fish" ? "fish_with_lamb" : flavor.toLowerCase()
    }.png?v=60236831986002879221693601154`;
    // alert("Flavor!");
    flavor_img.appendChild(flavor_img_img);
    flavor_div.appendChild(flavor_img);
    flavor_div.appendChild(flavor_span);
    flavor_div.addEventListener("click", function (event) {
      event.preventDefault();
      var flavors = document.querySelectorAll(".flavor");
      flavors.forEach((flavor) => {
        flavor.classList.remove("active");
      });
      setTab(document.querySelector(".calc_days.active").dataset.variantTitle);
      flavor_div.classList.add("active");
      document.getElementById("selected_flavor").value = flavor;
      loadProducts();
    });
  });
  flavor_picker.appendChild(flavors_block);
};

const selectFlavor = () => {
  var flavor_picker = document.getElementById("flavor_picker");
  var flavors = flavor_picker.querySelectorAll(".flavor");
  // var current_size = document.querySelector(".calc_days.active").dataset.vindex;
  flavors.forEach((flavor) => {
    flavor.addEventListener("click", function (event) {
      event.preventDefault();
      // loadProducts();
      setTab(event.currentTarget.dataset.title);
      const actives = document.querySelector(".calc_days.active"); //.click();
      actives.click();
    });
  });
};
export { selectFlavor, getAvailableFlavors };
