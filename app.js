const inquirer = require("inquirer");
const util = require("util");
const mysql = require("mysql");
const cTable = require('console.table');
const ask = require('./lib/queries.js');
const db = require('./lib/mysql-queries.js');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vegetable",
    database: "employees_db"
});

const query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // Replace this text.
    console.log(`New App, this one is about songs and shit.\n`);
    start();
});



function userPrompt(prompt) { return inquirer.prompt(prompt); }

async function start() {
    try {
        console.log(await query("SELECT id, title FROM role"));
        let { choice } = await userPrompt(ask.startQuery);
        switch (choice) {
            case "VIEW":
                console.log("\nView\n");
                await viewEmployees();
                break;
            case "MANAGE":
                console.log("\nManage\n");
                await manageEmployees();
                break;
            case "DEPARTMENT":
                console.log("\nDepartment\n");
                await manageDepartments();
                break;
            case "EXIT":
                console.log("\nApplication terminated by the user.");
                connection.end();
                return;
        }
        await start();
    } catch (err) {
        console.log(err);
    }
}

async function viewEmployees() {
    try {
        let { choice } = await userPrompt(ask.viewQuery);
        switch (choice) {
            case "viewByDep":
                // action
                break;
            case "viewByManager":
                // action
                break;
            case "viewManagers":
                console.table(await query(db.managerList));
                break;
            case "HOME":
                break;
        }
    } catch (err) {
        console.log(err);
    }
}

async function manageEmployees() {
    try {
        let { choice } = await userPrompt(ask.managementQuery);
        let employeeList = await query(db.employeeList);
        let managerList = await query(db.managerList);
        let roleList = await query(db.roleList);
        let departmentList = await query(db.departmentList);
        switch (choice) {
            case "ADD":
                // DONE minus database edit
                let newEmployee = await userPrompt(ask.addEmployee(roleList, managerList));
                //database edit
                console.log(newEmployee);
                break;
            case "TRANSFER":
                let transferEmployee = await userPrompt(ask.transferEmployee(employeeList, departmentList, roleList, managerList));
                //database edit
                console.log(transferEmployee);
                break;
            case "REMOVE":
                let removeEmployee = await userPrompt(ask.removeEmployee(employeeList));
                //database edit
                console.log(removeEmployee);
                break;
            case "UPDATE":
                let editEmployee = await userPrompt(ask.editEmployee(employeeList, roleList, managerList));
                //database edit
                console.log(editEmployee);
                break;
            case "HOME":
                break;
        }
    } catch (err) {
        console.log(err);
    }
}

//
// Wait to work on this one V
//

async function manageDepartments() {
    try {
        let { choice } = await userPrompt(ask.managementQuery);
        let employeeList = await query(db.employeeList);
        let managerList = await query(db.managerList);
        let roleList = await query(db.roleList);
        let departmentList = await query(db.departmentList);
        switch (choice) {
            case "ADD":
                // DONE minus database edit
                let newEmployee = await userPrompt(ask.addEmployee(roleList, managerList));
                //database edit
                console.log(newEmployee);
                break;
            case "TRANSFER":
                let transferEmployee = await userPrompt(ask.transferEmployee(employeeList, departmentList, roleList, managerList));
                //database edit
                console.log(transferEmployee);
                break;
            case "REMOVE":
                let removeEmployee = await userPrompt(ask.removeEmployee(employeeList));
                //database edit
                console.log(removeEmployee);
                break;
            case "UPDATE":
                let editEmployee = await userPrompt(ask.editEmployee(employeeList, roleList, managerList));
                //database edit
                console.log(editEmployee);
                break;
            case "HOME":
                break;
        }
    } catch (err) {
        console.log(err);
    }
}


