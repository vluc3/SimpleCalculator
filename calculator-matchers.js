const calculatorMatchers = {
  toBeCalculator: function() {
    return {
      compare: function(value) {
        const result = {
          pass: value instanceof Calculator,
          message: null
        };

        result.message = 'Expected ' + JSON.stringify(value);
        result.message += (result.pass) ? ' not' : '';
        result.message += ' to be instance of Calculator';
        return result;
      }
    }
  }
};