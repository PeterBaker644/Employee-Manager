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
    console.log(`\nWelcome to the employee content management system.\n`);
    start();
});

function userPrompt(prompt) { return inquirer.prompt(prompt); }

async function start() {
    try {
        let { choice } = await userPrompt(ask.startQuery);
        switch (choice) {
            case "VIEW":
                await viewEmployees();
                break;
            case "MANAGE":
                await manageEmployees();
                break;
            case "DEPARTMENT":
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
            case "viewAll":
                console.table(await query(db.viewAll))
                break;
            // case "viewByDep":
            //     // this is a pivot table
            // Charlie says "There are no pivot tables in MySQL"
            //     break;
            // case "viewByManagers:
            //     // this is also a pivot table
            //     break;
            case "viewManagers":
                console.table(await query(db.viewManagers));
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
                let newEmployee = await userPrompt(ask.addEmployee(roleList, managerList));
                await query("INSERT INTO employee SET ?", {
                    first_name: newEmployee.first_name,
                    last_name: newEmployee.last_name,
                    role_id: newEmployee.role_id,
                    manager_id: newEmployee.manager_id
                });
                break;
            case "TRANSFER":
                let transferEmployee = await userPrompt(ask.transferEmployee(employeeList, departmentList, roleList, managerList));
                // if (transferEmployee.managerConfirm) {
                //     let manager = await query(db.autoSort,{id:transferEmployee.roleId})
                //     console.log(manager);
                // }
                await query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            manager_id: transferEmployee.managerId,
                            role_id: transferEmployee.roleId
                        },
                        { id: transferEmployee.employeeId }
                    ]
                )
                console.log(transferEmployee);
                break;
            case "REMOVE":
                let removeEmployee = await userPrompt(ask.removeEmployee(employeeList));
                //database edit
                if (removeEmployee.removeConfirm) {
                    console.log("Removing employee...")
                    await query("DELETE FROM employee WHERE ?", { id: removeEmployee.employeeId });
                }
                break;
            case "UPDATE":
                let editEmployee = await userPrompt(ask.editEmployee(employeeList, roleList, managerList));
                switch (editEmployee.choice) {
                    case "NAME":
                        await query ("UPDATE employee SET ? WHERE ?",
                            [
                                {
                                    first_name: editEmployee.newFirstName,
                                    last_name: editEmployee.newLastName
                                },
                                { id: editEmployee.employeeId }
                            ]
                        );
                        break;
                    case "ROLE":
                        await query ("UPDATE employee SET ? WHERE ?",
                            [
                                {
                                    manager_id: editEmployee.managerId,
                                    role_id: editEmployee.roleId
                                },
                                { id: editEmployee.employeeId }
                            ]
                        );
                        break;
                }
                break;
            case "HOME":
                break;
        }
    } catch (err) {
        console.log(err);
    }
}

async function manageDepartments() {
    try {
        let { choice } = await userPrompt(ask.departmentQuery);
        let roleList = await query(db.roleList);
        let departmentList = await query(db.departmentList);
        switch (choice) {
            case "listDept":
                console.table(departmentList);
                break;
            case "listRoles":
                console.table(roleList);
                break;
            case "editDept":
                let editDept = await userPrompt(ask.editDepartments(departmentList));
                switch (editDept.choice) {
                    case "ADD":
                        await query("INSERT INTO department SET ?", {
                            name: editDept.addName,
                        });
                        break;
                    case "REMOVE":
                        if (editDept.removeConfirm) {
                            console.log("Removing department...")
                            await query("DELETE FROM department WHERE ?", { id: editDept.removeId });
                        }
                }
                break;
            case "editRoles":
                let editRoles = await userPrompt(ask.editRoles(roleList, departmentList));
                switch (editRoles.choice) {
                    case "ADD":
                        await query("INSERT INTO role SET ?", {
                            title: editRoles.addName,
                            salary: editRoles.newSalary,
                            department_id: editRoles.newDepartmentId
                        });
                        break;
                    case "REMOVE":                       
                        console.log("Removing employee...")
                        await query("DELETE FROM role WHERE ?", { id: editRoles.removeId });
                }
                break;
            case "HOME":
                break;
        }
    } catch (err) {
        console.log(err);
    }
}