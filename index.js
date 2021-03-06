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
                name: "Update an employee's role",
                value: "upd_employee_role"
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
        case "upd_employee_role": return updateEmployeeRole();
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
            INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ("${res.first_name}", "${res.last_name}", "${res.role_id}", "${res.manager_id}") 
        `);

        appHome();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Enter new department name"
        }
    ]).then(function(res) {
        connection.query(`
            INSERT INTO department (department_name) 
            VALUE ("${res.department_name}")
        `);
    });

    appHome();
}

function addRole() {
    inquirer.prompt([
        {
            name: "role_name",
            type: "input",
            message: "Enter new role name"
        },
        {
            name: "role_salary",
            type: "input",
            message: "Enter new role salary"
        },
        {
            name: "role_department",
            type: "input",
            message: "Enter new role's department id"
        }
    ]).then(function(res) {
        connection.query(`
            INSERT INTO role (role_title, role_salary, role_department_id) 
            VALUE ("${res.role_name}", "${res.role_salary}", "${res.role_department}")
        `);

        appHome();
    });

    appHome();    
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee's first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter employee's last name"
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter new role id"
        }
    ]).then(function(res) {
        connection.query(`
            UPDATE employee SET role_id = "${role_id}" 
            WHERE first_name = "${first_name}" 
            AND last_name = "${last_name}"
        `);
    });

    appHome();
}

function fireAll() {
    connection.query(`DELETE * FROM employee`);

    appHome();
}

function exit() {
    connection.end();
}