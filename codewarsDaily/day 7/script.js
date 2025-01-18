// You were camping with your friends far away from home, but when it's time to go back, you realize that your fuel is running out and the nearest pump is 50 miles away! You know that on average, your car runs on about 25 miles per gallon. There are 2 gallons left.

// Considering these factors, write a function that tells you if it is possible to get to the pump or not.

// Function should return true if it is possible and false if not.

const zeroFuel = (distanceToPump, mpg, fuelLeft) => {
   if(distanceToPump <= mpg * fuelLeft){
       return true
   }else{
       return false
   }
};
// Create a function that gives a personalized greeting.This function takes two parameters: name and owner.

// Use conditionals to return the proper message:

// case return
// name equals owner	'Hello boss'
// otherwise	'Hello guest'
function greet(name, owner) {
    if(name === owner){
        return "Hello boss"
    }else{
        return "Hello guest"
    }
}// умова максимально не зрозуміла була


// Write function bmi that calculates body mass index(bmi = weight / height2).

// if bmi <= 18.5 return "Underweight"

// if bmi <= 25.0 return "Normal"

// if bmi <= 30.0 return "Overweight"

// if bmi > 30 return "Obese"
function bmi(weight, height) {
    inddex = weight / height ** 2 
    if (inddex <= 18.5) {
        return "Underweight"
    } else if (inddex <= 25) {
        return "Normal"
    } else if (inddex <= 30) {
        return "Overweight"
    } else {
        return "Obese"
    }
}

// In this kata you will create a function that takes a list of non - negative integers and strings and returns a new list with the strings filtered out.
function filter_list(l) {
    return l.filter(item => typeof item === 'number')
}
// After a hard quarter in the office you decide to get some rest on a vacation.So you will book a flight for you and your girlfriend and try to leave all the mess behind you.

// You will need a rental car in order for you to get around in your vacation.The manager of the car rental makes you some good offers.

// Every day you rent the car costs $40.If you rent the car for 7 or more days, you get $50 off your total.Alternatively, if you rent the car for 3 or more days, you get $20 off your total.

// Write a code that gives out the total amount for different days(d).
function rentalCarCost(d) {
    day = d * 40
    if (d >= 7) {
        return day - 50
    } else if (d >= 3) {
        return day - 20
    } else {
        return day
    }
}