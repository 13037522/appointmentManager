APPOINT MANAGER PROGRAM - Reza Vatandoust 11/11/2017

This program is for booking appointments online. 

How to Run

Install Nodejs
clone from GitHub
npm i --all
node server
Server running on port 3000.
Local:
http://localhost:3000/login
Public:
a copy of this program is currently running on public domain:
54.206.68.57

Coding Standards

Tabs not spaces
Variables are in camelCase. Constant values are in UPPER_CASE SNAKE_CASE, unless the are required modules.
var hello_world // Bad

var helloWorld // Good

const PORT_NUMBER = 5000; // Good

const module = require('module'); // Good
Classes should be documented in JsDoc
Don't Abbreviate variables
var getBP // Bad

var getBodyParser // Good
Multiline If statements and for loops must all have brackets
// Bad
if (true)
	return;

// Good
if (true) {
	return;
}

// Good
if (true) return;
Brackets must have a space before the parenthesis and keyword
// Bad
if(true){
}

// Good
if (true) {
}
Nested functions should be written in arrow notation
// Good
forEach(() => {
});

// Bad
forEach(function() {
});
Requiring modules must be declared with const
var module = require('module'); // Bad

const module = require('module'); // Good
Use javascript truthy and falsy values whenever necessary
// Bad
if (myVar == null) {
}

// Good
if (!myVar) {
}
Prefer forEach over for loops to iterate over arrays
// Bad
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}

// Good
const arr = [1, 2, 3, 4, 5];
arr.forEach((value) => {
	console.log(value);
});
Prefer single quotes over double quotes
const message = "Hello, World" // Bad

const message = 'Hello, World' // Good
Prefer string interpolation over concatenation on variabes in the middle of the string
const myString = 'five plus one is ' + (5 + 1) + '. More text'; // Bad

const myString = `five plus one is ${5 + 1}. More text`; // Good
const myString = 'five plus one is ' + (5 + 1); // Fine
Don't chain variable assignments
// Bad
let a = b = c = 1;

// Good
let a = 1;
let b = a;
let c = a;
Add spaces inside curly braces
// bad
const json = {foo: 'bar'};

// good
const json = { foo: 'bar' };
Use the literal syntax for object creation.
// bad
const object = new Object();

// good
const object = {};