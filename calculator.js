function Calculator() {
  this.total = 0;
  this.copyrightUrl = 'https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json';
}

Calculator.prototype.add = function(number) {
  return this.total += number;
};

Calculator.prototype.substract = function(number) {
  return this.total -= number;
};

Calculator.prototype.multiply = function(number) {
  return this.total *= number;
};

Calculator.prototype.divide = function(number) {
  if (number == 0) {
    throw new Error('Cannot divide by 0');
  }

  return this.total /= number;
};

Object.defineProperty(Calculator.prototype, 'version', {  
  get: async function() {
    const response = await fetch(this.copyrightUrl);
    const json = await response.json();
    return json.version;
  },
  enumerable: true,
  configurable: true
});
