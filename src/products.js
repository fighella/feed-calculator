import { parameterizeString, selectVariantByTitle } from "./utils";
import { _age_input, _flavor_input } from "./data";

const showProducts = async (products) => {
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
    product.variants.forEach((variant) => {
      var variant_item = document.createElement("div");
      variant_item.classList.add("calculator_product_variant");
      variant_item.append(variant.title);
      variant_item.append(variant.price);

      productItem.append(variant_item);
    });
    const cloneDiv = productFromDom.cloneNode(true);
    const active_variant_id = document.querySelector(".calc_days.active");
    selectVariantByTitle(active_variant_id.dataset.variantTitle);
    productItemList.appendChild(cloneDiv);
    const subscriptionLink = document.createElement("a");
    subscriptionLink.href = `/products/${product.handle}?variant=${product.variants[0].id}`;
    // subscriptionLink.innerText = "Subscribe and save 10%";
    productItemList.appendChild(subscriptionLink);
  });

  productsList.appendChild(productItemList);
};

export { showProducts };
