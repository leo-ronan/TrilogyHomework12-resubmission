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
                value: ""
            },
            {
                name: "Display all employees by department",
                value: ""
            },
            {
                name: "Display all employees by role",
                value: ""
            },
            {
                name: "Add a new employee",
                value: ""
            },
            {
                name: "Add a new department",
                value: ""
            },
            {
                name: "Add a new role",
                value: ""
            },
            {
                name: "Update an employee's information",
                value: ""
            },
            {
                name: "Update a department's information",
                value: ""
            },
            {
                name: "Update a role's information",
                value: ""
            },
            {
                name: "Purge entire database",
                value: ""
            }, 
            {
                name: "Exit",
                value: ""
            },
        ]
    }   
    ]
    )
}
