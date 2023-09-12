const dev_message_style = "background: #222; color: #bada55";

const _log = (message) => {
  console.log("%c ==========" + message + "===========", dev_message_style);
};

const _devLoadMessage = () => {
  _log("LOAD CALCULATOR");
};

const _devDidNotLoadMessage = () => {
  _log("DID NOT LOAD CALCULATOR");
};

const _devCheckIsCalculatorMessage = () => {
  _log("CHECK IS CALCULATOR");
};

export { _devLoadMessage, _devDidNotLoadMessage, _devCheckIsCalculatorMessage };
