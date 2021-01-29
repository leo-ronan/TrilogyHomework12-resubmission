//Require db folder
const db = require("./db");
//Prompt module from inquirer
const { prompt } = require("inquirer");
//Formats responses in inquirer
require("console.table");
//Will be used to render app name (Employee Manager) as ascii art to resemble the homework example gif
require("asciiart-logo");

//Run app
app();

function renderLogo() {
    //Set and render text to be turned into our app logo
    const appNameLogo = logo({
        name: "Employee Manager"
    }).render();
    //Display logo
    console.log(appNameLogo);
}

//async function so we can use await for user's input
async function app() {
    //Render and display app logo
    renderLogo();
    //Inquirer "home page" which lists all options to the user
    appHome();
}


async function appHome(){
    //Set user's input from input list when received
    let {const} = await prompt([{
        name: "input",
        type: "list",
        message: "Please select an action",
        choices: [
            {
                name: "Display all employees",
                value: "dsp_all_employees"
            },
            {
                name: "Display all employees by department",
                value: "dsp_employees_by_department"
            },
            {
                name: "Display all employees by role",
                value: "dsp_employees_by_role"
            },
            {
                name: "Add a new employee",
                value: "add_employee"
            },
            {
                name: "Add a new department",
                value: "add_department"
            },
            {
                name: "Add a new role",
                value: "add_role"
            },
            {
                name: "Update an employee's information",
                value: "upd_employee"
            },
            {
                name: "Update a department's information",
                value: "upd_department"
            },
            {
                name: "Update a role's information",
                value: "upd_role"
            },
            {
                name: "Fire everyone at once",
                value: "questionable_decision"
            }, 
            {
                name: "Exit",
                value: "exit"
            }
        ]
    }]);
    //Run function associated with user's input
    switch(input) {
        case "dsp_all_employees": return placeholder();
        case "dsp_employees_by_department": return placeholder();
        case "dsp_employees_by_role": return placeholder();
        case "add_employee": return placeholder();
        case "add_department": return placeholder();
        case "add_role": return placeholder();
        case "upd_employee": return placeholder();
        case "upd_department": return placeholder();
        case "upd_role": return placeholder();
        case "questionable_decision": return placeholder();
        case "exit": return placeholder();
    }
}

