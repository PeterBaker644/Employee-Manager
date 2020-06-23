// ===============
// START QUERIES
// ===============

const startQuery = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            {
                name: "View Employees",
                value: "VIEW",
            },
            {
                name: "Manage Employees",
                value: "MANAGE",
            },
            {
                name: "Manage Departments",
                value: "DEPARTMENT",
            },
            {
                name: "Exit application",
                value: "EXIT"
            }
        ]
    }
]
const viewQuery = [
    {
        type: "list",
        message: "Please select a function",
        name: "choice",
        choices: [
            {
                name: "View All Employees",
                value: "viewAll",
            },
            {
                name: "View Employees by Department",
                value: "viewByDep",
            },
            {
                name: "View Employees by Manager",
                value: "viewByManager",
            },
            {
                name: "View Managers",
                value: "viewManagers",
            },
            {
                name: "Return to Previous Menu",
                value: "HOME",
            }
        ]
    }
]
const managementQuery = [
    {
        type: "list",
        message: "Please select a function",
        name: "choice",
        choices: [
            {
                name: "Add Employee",
                value: "ADD",
            },
            {
                name: "Transfer Employee",
                value: "TRANSFER",
            },
            {
                name: "Remove Employee",
                value: "REMOVE",
            },
            {
                name: "Update Employee Details",
                value: "UPDATE",
            },
            {
                name: "Return to Previous Menu",
                value: "HOME",
            }
        ]
    }
]
const departmentQuery = [
    {
        type: "list",
        message: "Please select a function",
        name: "choice",
        choices: [
            {
                name: "View All Deparments",
                value: "listDept",
            },
            {
                name: "View All Roles",
                value: "listRoles",
            },
            {
                name: "Add/Remove Department",
                value: "editDept",
            },
            {
                name: "Add/Remove Roles",
                value: "editRoles",
            },
            {
                name: "Return to Previous Menu",
                value: "HOME",
            }
        ]
    }
]

// ================
// MANAGE EMPLOYEES
// ================

// Consider writing an exit function that could be used in any instance?

function addEmployee(roleList, managerList) {
    let list = [
        {
            type: 'input',
            message: "Enter the employee's first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter the employee's last name",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            // the dynamic list is imported here.
            name: "role_id",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < roleList.length; i++) {
                    choiceArray.push(roleList[i].title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of roleList) {
                    if (entry.title == answer)
                        return entry.id;
                }
            },
        },
        // {
        //     type: "confirm",
        //     message: "Would you like to assign the manager automatically?",
        //     name: "managerConfirm"
        // },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager_id",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < managerList.length; i++) {
                    choiceArray.push(managerList[i].full_title);
                }
                return choiceArray;
            },
            // return the manager's ID
            filter: (answer) => {
                for (entry of managerList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
        }
    ]
    return list;
}
function transferEmployee(employeeList, departmentList, roleList, managerList) {
    let list = [
        {
            type: "list",
            message: "Who would you like to transfer?",
            name: "employeeId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < employeeList.length; i++) {
                    choiceArray.push(employeeList[i].full_title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of employeeList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
        },
        {
            type: "list",
            message: "To which department would you like to transfer the employee?",
            name: "departmentId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < departmentList.length; i++) {
                    choiceArray.push(departmentList[i].name);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of departmentList) {
                    if (entry.name == answer)
                        return entry.id;
                }
            },
        },
        // {
        //     type: "confirm",
        //     message: "Would you like to assign the manager automatically?",
        //     name: "managerConfirm"
        // },
        {
            type: "list",
            message: "Please select a manager to assign the employee to",
            name: "managerId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < managerList.length; i++) {
                    choiceArray.push(managerList[i].full_title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of managerList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
            when: (answers) => !answers.managerConfirm
        },
        {
            type: "list",
            message: "Which role would you like to assign?",
            name: "roleId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < roleList.length; i++) {
                    choiceArray.push(roleList[i].title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of roleList) {
                    if (entry.title == answer)
                        return entry.id;
                }
            }
        }
    ]
    return list;
}
function removeEmployee(employeeList) {
    let list = [
        {
            type: "list",
            message: "Select an employee to remove.",
            name: "employeeId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < employeeList.length; i++) {
                    choiceArray.push(employeeList[i].full_title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of employeeList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
        },
        {
            type: "confirm",
            message: "Are you sure you would like to delete this employee?",
            name: "removeConfirm"
        }
    ]
    return list;
}
function editEmployee(employeeList, roleList, managerList) {
    let list = [
        {
            type: "list",
            message: "Select an employee to edit",
            name: "employeeId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < employeeList.length; i++) {
                    choiceArray.push(employeeList[i].full_title);
                }
                choiceArray.push("Cancel Employee Edit\n")
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of employeeList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
        },
        {
            type: "list",
            message: "What would you like to change?",
            name: "choice",
            choices: [
                {
                    name: "Edit Name",
                    value: "NAME"
                },
                {
                    name: "Edit Role",
                    value: "ROLE"
                },
                {
                    name: "Cancel Employee Edit",
                    value: "HOME"
                }
            ],
            when: (answers) => answers.employeeId != "Cancel Employee Edit\n"
        },
        {
            type: "input",
            message: "Enter a new First Name",
            name: "newFirstName",
            when: (answers) => answers.choice == "NAME"
        },
        {
            type: "input",
            message: "Enter a new Last Name",
            name: "newLastName",
            when: (answers) => answers.choice == "NAME"
        },
        {
            type: "list",
            message: "Which role would you like to assign?",
            name: "roleId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < roleList.length; i++) {
                    choiceArray.push(roleList[i].title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of roleList) {
                    if (entry.title == answer)
                        return entry.id;
                }
            },
            when: (answers) => answers.choice == "ROLE"
        },
        // {
        //     type: "confirm",
        //     message: "Would you like to assign the manager automatically?",
        //     name: "managerConfirm",
        //     when: (answers) => answers.choice == "ROLE"
        // },
        {
            type: "list",
            message: "Please select a manager to assign the employee to",
            name: "managerId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < managerList.length; i++) {
                    choiceArray.push(managerList[i].full_title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of managerList) {
                    if (entry.full_title == answer)
                        return entry.id;
                }
            },
            when: (answers) => (answers.choice == "ROLE") && !answers.managerConfirm
        }
    ]
    return list;
}

// ==================
// MANAGE DEPARTMENTS
// ==================
// Pass in an array of departments and a list of roles. 

function editDepartments(departmentList) {
    let list = [
        {
            type: "list",
            message: "What would you like to change?",
            name: "choice",
            choices: [
                {
                    name: "Add Department",
                    value: "ADD"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE"
                },
                // Only if time remaining
                // {
                //     name:"Edit Department",
                //     value: "EDIT"
                // },
                {
                    name: "Return to previous menu",
                    value: "BACK"
                },
            ]
        },
        {
            type: "list",
            message: "Which department would you like to remove?",
            name: "removeId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < departmentList.length; i++) {
                    choiceArray.push(departmentList[i].name);
                }
                // choiceArray.push("Cancel Department Edit\n")
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of departmentList) {
                    if (entry.name == answer)
                        return entry.id;
                }
            },
            when: (answers) => answers.choice == "REMOVE"
        },
        {
            type: "confirm",
            message: "Are you sure you would like to delete this department?",
            name: "removeConfirm",
            when: (answers) => answers.choice == "REMOVE"
        },
        {
            type: "input",
            message: "Enter the name of the new department.",
            name: "addName",
            when: (answers) => answers.choice == "ADD"
        },
    ]
    return list;
}
function editRoles(roleList, departmentList) {
    let list = [
        {
            type: "list",
            message: "What would you like to change?",
            name: "choice",
            choices: [
                {
                    name: "Add Role",
                    value: "ADD"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE"
                },
                // Only if time remaining.
                // {
                //     name:"Edit Role",
                //     value: "EDIT"
                // },
                {
                    name: "Return to previous menu",
                    value: "BACK"
                }
            ]
        },
        {
            type: "list",
            message: "Which role would you like to remove?",
            name: "removeId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < roleList.length; i++) {
                    choiceArray.push(roleList[i].title);
                }
                return choiceArray;
            },
            filter: (answer) => {
                for (entry of roleList) {
                    if (entry.title == answer)
                        return entry.id;
                }
            },
            when: (answers) => answers.choice == "REMOVE"
        },
        {
            type: "input",
            message: "Enter the name of the new role.",
            name: "addName",
            when: (answers) => answers.choice == "ADD"
        },
        {
            type: "list",
            message: "Which department would you like to add this role to?",
            name: "newDepartmentId",
            choices: () => {
                let choiceArray = [];
                for (var i = 0; i < departmentList.length; i++) {
                    choiceArray.push(departmentList[i].name);
                }
                return choiceArray;
            },
            when: (answers) => answers.choice == "ADD"
        },
        {
            type: "input",
            message: "Enter a salary amount.",
            name: "newSalary",
            when: (answers) => answers.choice == "ADD"
        },
    ]
    return list;
}

module.exports = {
    startQuery,
    viewQuery,
    managementQuery,
    departmentQuery,
    addEmployee,
    transferEmployee,
    removeEmployee,
    editEmployee,
    editDepartments,
    editRoles
}