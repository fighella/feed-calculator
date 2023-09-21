import { feedAmountNames } from "./constants";
import { updateProductPageAmounts } from "./calc";

const currentVariantTitle = () => {
  return document.querySelector(":checked + .block-swatch").innerText;
};

const updateVariantTitle = (clickedTitle = false) => {
  document
    .getElementById("main-calc-step-1")
    .querySelector("h2.heading").innerText =
    clickedTitle || currentVariantTitle();
};

const feedNav = (holder) => {
  var index = 0;
  feedAmountNames.forEach((name) => {
    const feedBlock = document.createElement("div");
    feedBlock.classList.add("feed-amount");
    const feedBlockName = document.createElement("div");
    const feedBlockDescription = document.createElement("div");
    const feedBlockAmount = document.createElement("div");
    feedBlock.dataset.feedAmountName = name;
    feedBlockName.innerText = name;
    feedBlock.holder.appendChild(feedBlockName);
  });
};

const watchVariants = () => {
  const variantPicker = document.querySelectorAll(".block-swatch");
  variantPicker.forEach((variant) => {
    variant.addEventListener("click", (evt) => {
      updateVariantTitle(evt.currentTarget.innerText);
    });
  });
};

const calculateAmounts = () => {
  updateProductPageAmounts();
};

const productPageCalculator = () => {
  watchVariants();
  const formFields = document.getElementById("calculator-form").content;
  const formResults = document.getElementById("calculator-results").content;

  const formQuestions = formFields.cloneNode(true);
  const formAnswers = formResults.cloneNode(true);

  const changeProductMessage = document.createElement("div");
  changeProductMessage.classList.add("change-product-message");
  changeProductMessage.innerHTML =
    "Change your product selection to see the feeding guide for your pet.";
  const productPageBlock = document.createElement("div");
  const questions = document.createElement("div");
  const response = document.createElement("div");
  response.appendChild(formAnswers);
  productPageBlock.classList.add("product-page-calculator");
  formQuestions.querySelector("h2.heading").style.display = "none";
  questions.classList.add("questions");

  document.getElementById("calculator-form").dataset.form =
    "product-page-calculator";
  formQuestions.querySelector("h2.heading").innerText = currentVariantTitle();
  const calculateButton = formQuestions.querySelector(".details-tab-button");
  calculateButton.addEventListener("click", function (evt) {
    evt.preventDefault;
    calculateAmounts();
  });
  questions.appendChild(formQuestions);

  questions.appendChild(changeProductMessage);
  response.classList.add("response");
  questions.classList.add("half");
  response.classList.add("half");
  productPageBlock.appendChild(questions);
  productPageBlock.appendChild(response);

  document
    .getElementById("product-page-calculator")
    .appendChild(productPageBlock);
};

export { productPageCalculator };
