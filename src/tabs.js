import { tabTypes } from "./constants.js";
import { updateAmounts } from "./calc.js";
import { loadProducts } from "./index.js";

const emailFieldFocus = (id) => {
  var emailField = document.getElementById(id);
  emailField.focus();
};

const openTab = (evt, tabName) => {
  const tabType = tabName.split("-")[0];

  var i, tabContent, tabButtons;

  tabContent = document.getElementsByClassName(tabType + "-tab");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabButtons = document.getElementsByClassName(tabType + "-tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replaceAll(" active", "");
  }

  if (document.getElementById(tabName)) {
    document.getElementById(tabName).style.display = "block";
  }
  // should actually make the tab button active
  evt.currentTarget.className += " active";
  updateAmounts();
  loadProducts();

};
const handleTabClick = (btn) => {
  openTab(btn, btn.currentTarget.getAttribute("data-tab"));
  if (btn.currentTarget.hasAttribute("data-emailfield")) {
    emailFieldFocus(btn.currentTarget.dataset.emailfield);
  }
  if (btn.currentTarget.hasAttribute("data-scrollto")) {
    scrollTo();
  }
};

const tabClicks = () => {
  tabTypes.forEach((tabType) => {
    const buttons = document.querySelectorAll("." + tabType + "-tab-button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleTabClick);
    });
  });
};

export { tabClicks };
