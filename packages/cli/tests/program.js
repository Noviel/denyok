module.exports.version = () => "0.0.1";

module.exports.description = () => `Test local program`;

module.exports.main = () => {
  console.log("main result");
  return `MainResult`;
}
