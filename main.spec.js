describe('main.js', () => {
  describe('Validate expression', () => {
    it('When first number is invalid', () => {
      spyOn(window, 'updateResult').and.stub();
      calculate('a+3');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Invalid expression');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
  
    it('When second number is invalid', () => {
      let spy = spyOn(window, 'updateResult').and.stub();
      calculate('3+a');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('Invalid expression');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  
    it('When operator is invalid', () => {
      let spy = spyOn(window, 'updateResult').and.stub();
      calculate('3_4');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('Invalid expression');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('calculate()', () => {
    it('Should call add() prototype 2 times with 3 and 4', () => {
      spyOn(Calculator.prototype, 'add');
      calculate('3+4');
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(4);
    });

    it('Should call substract() prototype 1 time with 7', () => {
      let spy = spyOn(Calculator.prototype, 'substract');
      calculate('3-7');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(7);
    });

    it('Should call multiply() prototype 1 time with 8', () => {
      let spy = spyOn(Calculator.prototype, 'multiply');
      calculate('3*8');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(8);
    });

    it('Should call divide() prototype 1 time with 2', () => {
      let spy = spyOn(Calculator.prototype, 'divide');
      calculate('3/2');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('Should call through multiply() prototype which process a real call of calculator.multiply() instance', () => {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    it('Should call fake multiply() prototype which process a fake call of calculator.multiply() instance and returns a choosen value', () => {
      spyOn(window, 'updateResult');
      
      spyOn(Calculator.prototype, 'multiply').and.callFake(() => {
        return 'It works';
      });

      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('It works');
    });

    it('Should call fake multiply() prototype in another way which process a fake call of calculator.multiply() instance and returns a choosen value', () => {
      spyOn(window, 'updateResult');
      
      spyOn(Calculator.prototype, 'multiply').and.returnValue('It works'),

      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('It works');
    });

    it('Should call fake add() prototype in another way which process some fake call of calculator.add() instance and returns several choosen value', () => {
      spyOn(window, 'updateResult');
      
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'It works'),

      calculate('5+5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('It works');
    });

    it('If ever calculate() failed, error is not handled (try/catch is not specified), thus, the error will be thrown', () => {
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');
      
      expect(function() {
        calculate('5*5');
      }).toThrowError('some error');
    });
  });

  describe('updateResult()', () => {
    beforeAll(() => {
      this.element = document.createElement('div');
      element.setAttribute('id', 'result');
      document.body.appendChild(this.element);
    });

    afterAll(() => {
      document.body.removeChild(this.element);
    });

    it('Add result to DOM', () => {
      updateResult('5');
      expect(this.element.innerText).toBe('5');
    });
  });

  describe('showVersion()', () => {
    it('Call calculator.version getter', () => {
      spyOn(document, 'getElementById').and.returnValue({
        innerText: null
      });

      let spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
      );

      showVersion();
      expect(spy).toHaveBeenCalled();      
    });
  });

  describe('clear()', () => {
    describe('Click on clear button', () => {
      beforeAll(() => {
        this.input = document.createElement('input');
        input.type = 'text';
        input.id = 'input';
        input.value = '3+5';
        document.body.appendChild(input);

        this.result = document.createElement('span');
        result.id = 'result';
        result.innerText = '8';
        document.body.appendChild(result);
      });

      afterAll(() => {
        document.body.removeChild(this.input);
        document.body.removeChild(this.result);
      });

      it('Should display a confirmation box', () => {
        spyOn(window, 'confirm');
        clearInputAndResult();
        expect(window.confirm).toHaveBeenCalled();
      });

      it('Should clear input and result when user confirms', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        clearInputAndResult();
        expect(input.value).toBeFalsy();
        expect(result.innerText).toBeFalsy();
      });

      it('Should not clear input and result when user does not confirm', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        spyOn(window, 'clearInput');
        spyOn(window, 'clearResult');
        clearInputAndResult();
        expect(window.clearInput).not.toHaveBeenCalled();
        expect(window.clearResult).not.toHaveBeenCalled();
      });
    });
  });
});