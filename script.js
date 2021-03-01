//initialization
const startingBid = document.getElementById("startingbid");// element with id startingbid
const nameOfBride = document.getElementById("name");// element with id name
const education = document.getElementById("education");
const networth = document.getElementById("networth");
const skills = document.getElementsByName("skills"); // HTMLCollection (like an array of elements, but not an actual array)
const age = document.getElementsByName("age");
const reputation = document.getElementsByName("reputation");
const letter = document.getElementById("loveLetter");

const calculate = () => {
    let price = Number(startingBid.value); // turns my starting bid string into number
    let name = nameOfBride.value;

    if (name == "" || price == 0) {//this condition is used to check whether the name and price are empty or not
        alert("Error! Please, enter Bride's name and Starting bid!");//
    }
    else {
        price = dropdown(education, price);
        price = dropdown(networth, price);
        price = getCheckboxValuesFilterReduce(skills, price);//array.reduce
        price = getRadioValue(age, price);// array.forEach
        price = getCheckboxValuesForLoop(reputation, price);//use for loop

        let person = {//Save everything as an object with 3 properties (name, price, and love letter).
            bride_name: name,
            bride_price: price,
            letter_to_bride: letter.value
        }
        document.getElementById("result").innerHTML = `The price for your bride ${person.bride_name} is $${person.bride_price}.\nYour love letter is "${person.letter_to_bride}"`;//output
    }
    console.log("the code was written by Assylnur");
}


const dropdown = (id, price) => {//  ES6 arrow function for dropdown lists
    price = price * Number(id.value);
    return price;
}

const getCheckboxValuesFilterReduce = (html_collection, price) => { //array.reduce
    let list = Array.from(html_collection).filter(filteration) 
    let result = list.reduce(reducer, price)
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}
const filteration = (item) => {
    return item.checked;
}


const getRadioValue = (node_list, price) => {// array.forEach
    node_list.forEach(item => {
        if (item.checked) {
            price = price * Number(item.value)
        }
    })
    return price;
}

const getCheckboxValuesForLoop = (html_collection, price) => { //use for loop
    for (let i = 0; i < html_collection.length; i++) {
        if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {//if values are integer
            price = price + Number(html_collection[i].value)
        }
        else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {//if values are not integer 
            price = price * Number(html_collection[i].value)
        }
    }
    return price;
}

document.querySelector("button").addEventListener("click", calculate);//Add Event Listener to my button