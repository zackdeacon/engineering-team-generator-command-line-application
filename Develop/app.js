const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');
const employeesArr = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function firstQuestion() {
inquirer.prompt([
     {
        type:"list",
        message:"Please choose an employee type, or render results",
        name:"employeeType",
        choices:["Employee", "Manager", "Intern", "Engineer", "render results"]
    }
]).then(function(answers){
    if(answers.employeeType === "Engineer") {
        engineer();
    }else if (answers.employeeType === "Intern") {
        intern();
    } else if (answers.employeeType === "Manager") {
        manager();
    } else {
        renderResults();
    }
})
}

function engineer() {
    inquirer.prompt([
        {
            type:"input",
            message:"What is your employee's name?",
            name: "name"
        },
        {
            type:"input",
            message:"what is your employee's id?",
            name: "id"
        },
        {
            type:"input",
            message:"What is your employee's email?",
            name: "email"
        },
        {
            type:"input",
            message:"What is the Engineers Github username?",
            name: "github"
        }
    ]).then(function(addAnswers){
    const newEmployee = new Engineer(addAnswers.name, addAnswers.id, addAnswers.email, addAnswers.github)
    employeesArr.push(newEmployee);
    console.log(employeesArr);
    firstQuestion();
    })
}

function intern() {
    inquirer.prompt([
        {
            type:"input",
            message:"What is your employee's name?",
            name: "name"
        },
        {
            type:"input",
            message:"what is your employee's id?",
            name: "id"
        },
        {
            type:"input",
            message:"What is your employee's email?",
            name: "email"
        },
        {
            type:"input",
            message:"What is the school that the intern is attending?",
            name: "school"
        }
    ]).then(function(addAnswers){
        const newEmployee = new Intern(addAnswers.name, addAnswers.id, addAnswers.email, addAnswers.school)
        employeesArr.push(newEmployee);
        console.log(employeesArr);
        firstQuestion();
    })
}

function manager() {
    inquirer.prompt([
        {
            type:"input",
            message:"What is your employee's name?",
            name: "name"
        },
        {
            type:"input",
            message:"what is your employee's id?",
            name: "id"
        },
        {
            type:"input",
            message:"What is your employee's email?",
            name: "email"
        },
        {
            type:"input",
            message:"What is the Managers office number?",
            name: "officeNumber"
        }
    ]).then(function(addAnswers){
        const newEmployee = new Manager(addAnswers.name, addAnswers.id, addAnswers.email, addAnswers.officeNumber)
        employeesArr.push(newEmployee);
        console.log(employeesArr);
        firstQuestion();
    })
}
function renderResults(){
    if(employeesArr.length<1) {
        console.log("you must create an employee first!")
        firstQuestion();
    } else {
    writeFileAsync(outputPath, render(employeesArr)).then(
        console.log('File created in "Output" directory')
    )
    }
}

firstQuestion();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
