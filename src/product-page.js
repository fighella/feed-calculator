const productPageCalculator = () => {
  const productPageBlock = document.createElement("div");
  const questions = document.createElement("div");
  const response = document.createElement("div");
  productPageBlock.classList.add("product-page-calculator");
  questions.classList.add("questions");
  response.classList.add("response");
  productPageBlock.appendChild(response);
  response.innerText = "Bla";

  productPageBlock.appendChild(questions);
  document
    .getElementById("product-page-calculator")
    .appendChild(productPageBlock);
};

export { productPageCalculator };
