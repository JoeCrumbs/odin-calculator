# calculator

> [!NOTE]
> After returning to The Odin Project after a longer break, there may have been some changes in the assignments of the project. Please note that this repository shows my original solution without incorporating these changes.

* Live: [Demo](https://joecrumbs.github.io/odin-calculator/)
* Keyboard Support: use '^' key for the power operator, the rest should be obvious

## Lessons Learned

* Establishing a fixed Goal instead of iterating over new cool features would result in much cleaner code
* Use more comments and pseudo-code (not doing it was a hassle after long breaks and with growing code)
* code is never perfect and even if there is still (a lot of) room for improvement for now it works and there ist still a lot to lear in the rest of TOP
* use commits more often or use more branches

## Additional Features

- [x] take operator precedence in account and enable the use of brackets
- [x] display the whole equation
- [x] add a power operator and use `<sup>` to format the power operator in equations
- [x] handle input exceptions


## Assignment ([The Odin Project Challenge Nr.5](https://www.theodinproject.com/lessons/foundations-calculator))
1. [x] Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
    1. add
    1. subtract
    1. multiply
    1. divide
1. [x] Create a new function `operate` that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
1. [x] Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
    1. Do not worry about wiring up the JS just yet.
    1. There should also be a display for the calculator, go ahead and fill it with some dummy numbers so you can get it looking right.
    1. Add a “clear” button.
1. [x] Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.
1. [x] Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then `operate()` on them when the user presses the “=” key.
    1. You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
    1. This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
6. [x] Gotchas: watch out for and fix these bugs if they show up in your code:
    1. Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, `12 + 7 - 5 * 3 =` should yield `42`. **Your calculator should not evaluate more than a single pair of numbers at a time. If you enter a number then an operator and another number that calculation should be displayed if your next input is an operator. The result of the calculation should be used as the first number in your new calculation.**
    1. You should round answers with long decimals so that they don’t overflow the screen.
    1. Pressing `=` before entering all of the numbers or an operator could cause problems!
    1. Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
    1. Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!
1. [x] EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a `.` button and let users input decimals! Make sure you don’t let them type more than one though: `12.3.56.5.` It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
1. [x] EXTRA CREDIT: Make it look nice! This can be a good portfolio project… but not if it’s UGLY. At least make the operations a different color from the keypad buttons.
1. [x] EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
1. [x] EXTRA CREDIT: Add keyboard support!