describe('calculator.js', () => {
  let calculator = null;

  beforeAll(() => {
  });

  afterAll(() => {
  });

  beforeEach(() => {
    calculator = new Calculator();
  });

  afterEach(() => {
  });

  describe('Calculator', () => {
    describe('Constructor', () => {
      it('Can be instanciated', () => {
        expect(calculator).toBeTruthy();
        expect(calculator.constructor.name).toContain('Calc');
        expect(calculator.constructor.name).not.toContain('calc');
        expect(calculator.constructor.name).toContain('ator');
        expect(calculator.constructor.name).toContain('Calculator');
      });
      
      it('Can be instanciated with a calculator matcher', () => {
        jasmine.addMatchers(calculatorMatchers);
        expect(calculator).toBeCalculator();
        expect(null).not.toBeCalculator();
      });

      it('Instances should be different', () => {
        let calculator1 = new Calculator();
        let calculator2 = new Calculator();
        expect(calculator1).not.toBe(calculator2);
      });

      it('Instances content should be equal', () => {
        let calculator1 = new Calculator();
        let calculator2 = new Calculator();
        expect(calculator1).toEqual(calculator2);
      });
    });

    describe('Total', () => {
      it('Should initialize total with 0', () => {
        expect(calculator.total).toBe(0);
        expect(calculator.total).toBeFalsy();
      });

      it('Can overwrite total', () => {
        expect(calculator.total).not.toBeNull();
      });

      it('Handle NaN total', () => {
        calculator.total = 100;
        calculator.multiply('a');
        expect(calculator.total).toBeNaN();
      });

      it('Total should be a number', () => {
        expect(calculator.total).toBeNumber();
      });

      it('Total should be a number with a third party matcher', () => {
        expect(calculator.total).toBeNumber();
      });

      it('Total should be anything', () => {
        expect(calculator.total).toEqual(jasmine.anything());
      });

      it('Total should be a positive or a negative value', () => {
        let regExp = /-?\d+/;
        calculator.total = 50;

        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(regExp);

        expect(calculator.substract(90)).toBe(-20);
        expect(calculator.total).toMatch(regExp);
      });
    });

    describe('Operations', () => {
      it('Has common operations', () => {
        expect(calculator.add).toBeDefined();
        expect(calculator.substract).toBeDefined();
        expect(calculator.multiply).toBeDefined();
        expect(calculator.divide).toBeDefined();

        expect(calculator.add).not.toBeUndefined();
        expect(calculator.substract).not.toBeUndefined();
        expect(calculator.multiply).not.toBeUndefined();
        expect(calculator.divide).not.toBeUndefined();
      });

      it('Should add number to total', () => {
        calculator.add(5);
        expect(calculator.total).toBe(5);
      });

      it('Should subtract number from total', () => {
        calculator.total = 30;
        calculator.substract(5);
        expect(calculator.total).toBe(25);
      });

      it('Should multiply total by number', () => {
        calculator.total = 100;
        calculator.multiply(2);
        expect(calculator.total).toBe(200);
      });

      it('Should divide total by number', () => {
        calculator.total = 200;
        calculator.divide(2);
        expect(calculator.total).toBe(100);
      });

      it('Handle throw when divide by 0', () => {
        expect(() => {
          calculator.divide(0);
        }).toThrow();

        expect(() => {
          calculator.divide(0);
        }).toThrowError(Error);
      });

      it('Handle throw and message when divide by 0', () => {
        expect(() => {
          calculator.divide(0);
        }).toThrowError(Error, 'Cannot divide by 0');
      });
    });

    describe('Get version', () => {
      describe('Should fetch version from an external source', () => {
        it('Fetch version with a promise and a done callback', (done) => {
          spyOn(window, 'fetch').and.returnValue(Promise.resolve(
            new Response('{"version": "0.1"}')
          ));

          calculator.version.then((version) => {
            expect(version).toBe('0.1');
            done();
          });
        });

        it('Fetch version with an async function', async () => {
          spyOn(window, 'fetch').and.returnValue(Promise.resolve(
            new Response('{"version": "0.1"}')
          ));

          let version = await calculator.version;
          expect(version).toBe('0.1');
        });
      });
    });

    describe('Misc', () => {
      it('Null and undefined should not be anything', () => {
        expect(null).not.toEqual(jasmine.anything());
        expect(undefined).not.toEqual(jasmine.anything());
      });

      xit('Disabled spec', () => {
      });
    });
  });
});