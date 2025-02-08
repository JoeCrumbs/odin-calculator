let calculator = {
    DISPLAY: document.querySelector('#display'),
    EQUATION: document.querySelector('#equation-text'),
    //operator methods
    '/': (num1, num2) => num1 / (num2 || 0),
    '*': (num1, num2) => num1 * (num2 || 0),
    '-': (num1, num2) => num1 - (num2 || 0),
    '+': (num1, num2) => num1 + (num2 || 0),
    '^': (num1, num2) => Math.pow(num1, (num2 || 0)),
    // clear one or two chars, dependent on last 3 chars
    clear: function(equation) {
        equation.pop();
        this.EQUATION.innerHTML = this.formatEquation((equation)) || '<span id="placeholder">0</span>';
        this.EQUATION.scrollLeft = this.EQUATION.scrollWidth;
        let openBrackets = this.countOpenBrackets(equation);
        this.DISPLAY.textContent = (equation.length === 0) ? '0' :
            this.roundNumber(this.processEquation(equation.concat(Array(openBrackets).fill(')'))));
    },
    //calculate with operatorPrecedence
    calc: function (equation) {
        let equationArray = equation.split(' ').filter (el => el !== '');
        let operatorPrecedence = ['^','/','*','-','+'];
        operatorPrecedence.forEach( op => {
          let i = -1;
          while ((i = equationArray.indexOf(op)) !== -1) {
            if (i > 0) {
                equationArray[i - 1] = this[equationArray[i]](+equationArray[i - 1], +equationArray[i + 1]);
                equationArray.splice(i, 2);
            } else {
            equationArray[i] = this[equationArray[i]](0, +equationArray[i + 1]);
            equationArray.splice(i + 1, 1);
            }
          }
        });
        return +equationArray[0];
      },
    //split equation and parse array into calculations 
    processEquation: function(equation) {
        let equationStr = equation.join(' ');
        let bracket = '';
        while (bracket = (equationStr.match(/\([^\(\)]*\)/) || [])[0]) {
            equationStr = equationStr.replace(bracket, this.calc((bracket === '()') ? '0' : bracket.slice(1,-1)));
        }
        return this.calc(equationStr);
    },
    // find index, where </sup> has to be inserted
    getClosingIndex: function(start, arr) {
        let count = 1
        for (let i = start + 1; i < arr.length; i++) {
            count += (arr[i] === '(') ? 1 : ((arr[i] === ')') ? -1 : 0);
            if (count === 0) return i;
        }
        return arr.length -1;
    },
    // format Equation for displaying
    formatEquation: function(equationArr){
        let equation = [...equationArr];
        let string = ''
        for (let i = 0; i < equation.length; i++) {
            if (/\^/.test(equation[i])) {
                string += (i === equation.length -1) ? equation[i].replace('^','<sup><span id="placeholder">0</span>') :'<sup>';
                continue;
            };
            string+= equation[i];
            if (equation[i-1] === '^' && equation[i] !== '(') {
            string += '</sup>';
            }
            if (equation[i-1] === '^' && equation[i] === '(' ) {
                equation[this.getClosingIndex(i, equation)] += '</sup>';
            }
        }
        // Check Ending for formating
        let lastChar = string.charAt(string.length - 1);
        if (isNaN(lastChar) && lastChar !== '.' && lastChar !== '>' && lastChar !== ')' && lastChar !== '=') {
            string += '<span id="placeholder">0</span>';
        }
        return string;
    },
    //count OpenBrackets to determine if closing Bracket is valid input
    countOpenBrackets: function(equation) {
        const CLOSINGBRACKET = document.querySelector('#closing-bracket');
        let openingBrackets = equation.filter(el => el === '(').length;
        let closingBrackets = equation.filter(el => el === ')').length;
        let openBrackets = openingBrackets - closingBrackets;
        if (openBrackets > 0) {
            CLOSINGBRACKET.style.opacity = '100%';
        } else {
            CLOSINGBRACKET.style.opacity = '50%';
        }
        return openBrackets
    },
    // add Number to equation Array
    addNumber: function(equation,clickedButton) {
    let lastEl = equation[equation.length - 1];
        if (typeof lastEl === 'undefined') equation[0] = '';
        if (isNaN(lastEl) && typeof lastEl !== 'undefined' && !(lastEl === '-' && isNaN(equation[equation.length - 2])
        && equation[equation.length - 2] !== ')')) {
            if (clickedButton === '.') clickedButton = '0' + clickedButton;
            equation.push(clickedButton);
        } else {
            if (equation[equation.length - 1] === '' && clickedButton === '.') clickedButton = '0' + clickedButton;
            equation[equation.length - 1] += clickedButton;
        }
    },
    //process user input
    processInput: function(clickedButton, equation) {
        let openBrackets = this.countOpenBrackets(equation.concat([clickedButton]));
        if (isNaN(clickedButton) && clickedButton !== '.') {
            if (clickedButton === 'CE') {
                this.clear(equation);
                return equation;
            }
            if (equation.indexOf('=') > -1) equation = [this.DISPLAY.textContent];
            if (openBrackets < 0) {
                return equation;
            }
            equation.push(clickedButton);
        } else {
            if (equation.indexOf('=') > -1) equation = [''];
            this.addNumber(equation,clickedButton);
        }
        this.EQUATION.innerHTML = this.formatEquation(equation);
        this.EQUATION.scrollLeft = this.EQUATION.scrollWidth;
        if (clickedButton !== '=') {
            this.DISPLAY.textContent = this.roundNumber(this.processEquation(equation.concat(Array(openBrackets).fill(')'))));
        }
        return equation;
    },
    roundNumber: function(string) {
        let number = +string;
        let result =  ((number % 1 === 0) ? number : number.toFixed(2));
        let i = ''
        while (result.toString().length > 12) {
            if (i && i > -1) {
                result = parseFloat(result).toExponential(i);
                i--;
            } else {
                result = parseFloat(result).toExponential();
                i = 10; 
            }
        }
        return result.toString();
    },
    //start calculator
    main: function() {
        const BUTTONS = document.querySelectorAll('button');
        let equation = [''];
        BUTTONS.forEach(button => {
            button.addEventListener('click', () => {
                let input = (button.id !== 'power') ? button.textContent : '^';
                equation = this.processInput(input, equation);
            });
        });
        window.addEventListener('keydown', (e) => {
            let code;
            let translation = {
                'Dead': '^',
                'Backspace': 'CE'
            }
            let allowedKeys = ['0','1','2','3','4','5','6','7','8','9','(',')','^','CE','/','*','-','+','-','=','.'];
            if (e.key !== undefined) {
                code = e.key;
            } else if (e.keyIdentifier !== undefined) {
                code = e.keyIdentifier;
            } else if (e.keyCode !== undefined) {
                code = e.keyCode;
            }
            code = translation[code] || code;
            if (!allowedKeys.includes(code)) return;
            equation = this.processInput(code, equation);
        });
    }
}
calculator.main();