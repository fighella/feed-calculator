import {
  parameterizeString,
  selectVariantByIndex,
  selectVariantByTitle,
} from "./utils";
import { _age_input, _flavor_input } from "./data";

const showProducts = async (products, selected_size = false) => {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";
  const productItemList = document.createElement("div");
  productItemList.classList.add("calculator_products");
  var filtered_products = Array.from(products).filter((product) => {
    return (
      product.tags.some((tag) => tag == _flavor_input()) &&
      product.tags.some((tag) => tag == _age_input())
    );
  });
  filtered_products.forEach((product) => {
    const productItem = document.createElement("div");
    // console.log("Tags", product.tags);
    product.tags.forEach((tag) => {
      productItem.classList.add(`calc-${parameterizeString(tag)}`);
    });
    const productFromDom = document.querySelector(
      `[handle="${product.handle}"]`
    );

    // productItem.classList.add(product.tags)
    productItem.classList.add("calculator_product");
    const img = product.images[0] ? product.images[0].src : "";
    productItem.innerHTML = `<div class=\"calculator_product_img\"><img src=\"${img}\" />${product.title}</div>`;
    var vindex = 0;
    product.variants.forEach((variant) => {
      var variant_item = document.createElement("div");
      variant_item.classList.add("calculator_product_variant");
      variant_item.append(variant.title);
      variant_item.append(variant.price);
      variant_item.dataset.vindexVariant = vindex;
      vindex = vindex + 1;
      productItem.append(variant_item);
    });
    const cloneDiv = productFromDom.cloneNode(true);
    const active_variant_id = document.querySelector(".calc_days.active");
    // console.log(active_variant_id);

    if (active_variant_id !== null) {
      selectVariantByTitle(active_variant_id.dataset.variantTitle);
    }
    if (active_variant_id !== null) {
      console.log("AVIDDV", active_variant_id.dataset.vindex);
      selectVariantByIndex(active_variant_id.dataset.vindex, cloneDiv);
      // document.querySelectorAll(`#products-list button`)[index + 1];
    }

    productItemList.appendChild(cloneDiv);
    const subscriptionLink = document.createElement("a");
    subscriptionLink.href = `/products/${product.handle}?variant=${product.variants[0].id}`;
    subscriptionLink.innerText = "Subscribe and save 10%";
    productItemList.appendChild(subscriptionLink);
  });

  productsList.appendChild(productItemList);
};

export { showProducts };
