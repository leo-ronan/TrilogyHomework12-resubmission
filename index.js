//Require db folder
const db = require("./db");
//Prompt module from inquirer
const { prompt } = require("inquirer");
//Formats responses in inquirer
require("console.table");
//Will be used to render app name (Employee Manager) as ascii art to resemble the homework example gif
require("asciiart-logo");

const connection = require("./connection");
const inquirer = require("inquirer");

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
        case "dsp_all_employees": return displayAllEmployees();
        case "dsp_employees_by_department": return displayEmployeesByDepartment();
        case "dsp_employees_by_role": return displayEmployeesByRole();
        case "add_employee": return addEmployee();
        case "add_department": return addDepartment();
        case "add_role": return addRole();
        case "upd_employee": return updateEmployee();
        case "upd_department": return updateDepartment();
        case "upd_role": return updateRole();
        case "questionable_decision": return fireAll();
        case "exit": return exit();
    }
}

async function displayAllEmployees() {
    function connect() {
        return this.connection.query("SELECT * FROM employee");
    }
    const res = await connect();
    console.log("\n");
    console.table(res);

    appHome();
}

async function displayEmployeesByDepartment() {
    function connect() {
        const {department_id} = prompt([
            {
                name: "department_id",
                type: "input",
                message: "Which department would you like to filter by?"
            }
        ])
        return this.connection.query(`SELECT * FROM employee WHERE department.id = "${department_id}"`)
    }
    const res = await connect();
    console.log("\n");
    console.table(res);

    appHome();
}

async function displayEmployeesByRole() {
    function connect() {
        const {role_id} = prompt([
            {
                name: "role_id",
                type: "input",
                message: "Which role would you like to filter by?"
            }
        ])
        return this.connection.query(`SELECT * FROM employee WHERE role.id = "${role_id}"`);
    }
    const res = await connect();
    console.log("\n");
    console.table(res);

    appHome();
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter new employee's first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter new employee's last name"
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter new employee's role id"
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter new employee's manager's id"
        }
    ]).then(function(res) {
        connection.query(`
            INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id)
            VALUES ("${res.first_name}", "${res.last_name}", "${res.role_id}", "${res.manager_id}") 
        `);

        appHome();
    })
}

function addDepartment() {
    
}

function addRole() {
    
}

function updateEmployee() {
    
}

function updateDepartment() {
    
}

function updateRole() {
    
}

function fireAll() {

}

function exit() {

}