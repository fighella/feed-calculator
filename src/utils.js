import { _devCheckIsCalculatorMessage } from "./dev";

const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

const scrollTo = () => {
  var _scrollto = document.getElementById("calc_progress");
  _scrollto.scrollIntoView({
    alignToTop: true,
    behavior: "smooth",
    inline: "start",
  });
};

const checkIsCalculator = () => {
  _devCheckIsCalculatorMessage();
  var feeding_calculator = document.getElementById("feeding_calculator");
  return typeof feeding_calculator != "undefined" && feeding_calculator != null;
};

function prettyNumber(_number, el) {
  if (_number >= 10000) {
    var integer = document.createElement("span");
    integer.innerText = Math.floor(_number);
    el.appendChild(integer);
    if (_number % 1 == 0) {
      // dont attach the fraction if a whole number
    } else {
      integer.classList.add("integer");
      var fraction = document.createElement("span");
      fraction.classList.add("fraction");
      fraction.innerText = decimalToFraction(
        _number - Math.floor(_number)
      ).display;
      integer.append(fraction);
    }
    el.append(" " + "cup/day");
  } else {
    el.append(_number.toFixed(1) + " cups/day");
    // el.append(decimalToFraction(_number).display + " cup/day");
  }
}

const decimalToFraction = (_decimal) => {
  var top = (Math.ceil(_decimal * 4) / 4)
    .toFixed(2)
    .toString()
    .replace(/\d+[.]/, "");
  if (_decimal < 0.25) {
    var top = (Math.ceil(_decimal * 10) / 10)
      .toFixed(2)
      .toString()
      .replace(/\d+[.]/, "");
  }
  var bottom = Math.pow(10, top.length);
  if (_decimal > 1) {
    top = +top + Math.floor(_decimal) * bottom;
  }
  var x = gcd(top, bottom);
  return {
    top: top / x,
    bottom: bottom / x,
    display: top / x + "/" + bottom / x,
  };
};

const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");
  return html.body;
};

const parameterizeString = (string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
};

export {
  prettyNumber,
  decimalToFraction,
  convertStringToHTML,
  parameterizeString,
  checkIsCalculator,
};
