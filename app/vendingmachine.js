// Initialising global variables to 0. Will be updated through various functions.
var input = 0;
var choice = 0;

/* 
Vendingmachine function to run at the start of the program, contains text and decorative breakers.
contains a for loop to iterate through a list of items and return the name property of the contents
finally runs a function to have the user choose an option. 
*/
function VendingMachine() {
    console.log('\n////////////////////////////////////////////');
    console.log('\nThis machine stocks the following items:\n')
    for (i = 0; i < items.length; i++) {
        console.log('|  ' + items[i].name + '  |   ');
    }
    console.log('\n////////////////////////////////////////////');
    getSelectionView();

};

/* 
Function to ask the user to input an amount of money and passes it to the input variable.
Also checks whether the uses gave non numerical input and outputs the current credit value.
*/
function getInput() {
    var readlineSync = require('readline-sync');

    console.log('\nYour current balance is: £' + input.toFixed(2) + '\n')

    input = parseFloat(readlineSync.question('\nPlease enter the amount of credit you wish to add £'));
    
    console.log('\n////////////////////////////////////////////');

    console.log('\nCurrent balance = £' + input.toFixed(2));

    if (isNaN(input)) {
        input = 0;
        console.log('\nPlease enter a valid amount.');
        return getInput();
    }

};

/* 
Function to create a list of items of template items matching the items list.
Its only use is to give the user visual options to choose from.
Calls the choice variable and a given object property to display to the user.
Finally will call the getInput function if there has been no credit added yet. Then will call function to confirm the users selection. 
*/
function getSelectionView() {
    var readlineSync = require('readline-sync');
    objectlist = ['Coca Cola', 'Fanta', 'Sprite', 'Water', 'Dairy Milk', 'Galaxy', 'Twix', 'Spearmint Extra'];
    
    choice = readlineSync.keyInSelect(objectlist, 'Please select the location of the item you wish to view: ', { cancel: "NOT IN USE" });

    console.log('\nName:  |  ' + items[choice].name + '  |\n' + 'Amount:  |  ' + items[choice].amount + '  |\n' + 'Price:  |  ' + items[choice].cost) + '  |';

    console.log('\n////////////////////////////////////////////');
    if (input == 0) {
        getInput();
    }

    selectionConfirm();
};

/* 
Function to confirm the users previous selection, if the user confirms this then their item is dispensed.
If the user chooses "No" then the getRefund function is called. 
*/
function selectionConfirm() {
    var readlineSync = require('readline-sync');

    if (readlineSync.keyInYN('\nWould like to continue with your selection?')) {
        return dispense();
    } else {
        return getRefund();
    }
};

/* 
Function to ask the user if they would like to refund their credit or make a new selection.
Returns the input value to 0 upon outputting the users credit. 
*/
function getRefund() {
    var readlineSync = require('readline-sync');

    console.log('\n////////////////////////////////////////////');

    if (readlineSync.keyInYN('\nPlease confirm you would like to refund your credit')) {
        console.log('\nYour credit has been refunded in the amount of £' + input.toFixed(2));
        input = 0;

        console.log('\n////////////////////////////////////////////');
    } else {
        return getSelectionView();
    }
};

/* 
Function that firsts checks whether the item that the user has chosen is in stock.
If yes then checks if the user has enough credit to purchase the chosen item.
If yes then the price of the item is subtracted from the users credit amount via the input variable and the amount of the item in stock is reduced by 1.
If the user has insufficient credit then they will be prompted to add more.
Finally the user will be given a choice whether to make another selection or not. "No" will call the getRefund function. 
*/
function dispense() {
    console.log('\n////////////////////////////////////////////');

    if (items[choice].amount === 0) {
        console.log('\nThis item is out of stock, please select another');
        return getSelectionView();
    } else {
        if (input > items[choice].cost) {
            input = input - items[choice].cost;
            console.log('\n**  Your ' + items[choice].name + ' has been dispensed and £' + items[choice].cost + ' has been subtracted from your credit  **');
            console.log('\nYour new balance is: £' + input.toFixed(2));
            items[choice].amount--;
        } else {
            console.log('\nYou have insufficient credit to make this purchase, please add more.');
            return getMoreInput();
        }
        var readlineSync = require('readline-sync');

        if (readlineSync.keyInYN('\nWould like to make another selection?')) {
            return getSelectionView();
        } else {
            return getRefund();
        }
    }
};

/* 
Function to add more credit to the existing amount.
Will also check to make sure this new input is a numerical amount
Updates the input variable with the combined total.
Finally returns the user to the dispensing function.
*/
function getMoreInput() {
    var readlineSync = require('readline-sync');

    console.log('\n////////////////////////////////////////////');

    console.log('\nYour current balance is: £' + input.toFixed(2) + '\n')

    moreInput = parseFloat(readlineSync.question('\nPlease enter the amount of credit you wish to add £'));

    if (isNaN(moreInput)) {
        moreInput = 0;
        console.log('\nPlease enter a valid amount.');
        return getMoreInput();
    }

    if (input !== 0) {
        input = input + moreInput;
    }

    console.log('\nNew balance = £' + input.toFixed(2));

    dispense();

};

// Constructor for the item objects that populate the items list.
function Item(name, amount, cost, location) {
    this.name = name;
    this.amount = amount;
    this.cost = cost;
    this.location = location;
};

// New instances of the items created with values given that are called with the choice variable.
let coke = new Item('Coca Cola', 10, 0.75, 1);
let fanta = new Item('Fanta', 5, 0.75, 2);
let sprite = new Item('Sprite', 0, 0.75, 3);
let water = new Item('Water', 4, 0.55, 4);
let cadbury = new Item('Dairy Milk', 8, 0.65, 5);
let galaxy = new Item('Galaxy', 6, 1.05, 6);
let twix = new Item('Twix', 2, 0.65, 7);
let gum = new Item('Spearmint Extra', 12, 0.45, 8);

const items = [coke, fanta, sprite, water, cadbury, galaxy, twix, gum];

let vm = new VendingMachine();