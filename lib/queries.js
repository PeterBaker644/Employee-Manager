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
                name: "View Employees by Department",
                value: "viewByDep",
            },
            {
                name: "View Employees by Manager",
                value: "viewByManager",
            },
            {
                name: "View Managers",
                value: "Manager",
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
                name: "Transfer Employee",
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
// Pass in an array of employees?

// Consider writing an exit function that could be used in any instance?

const addEmployee = [
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
        // the dynamic list is generated here.
        name: "role_id",
        // this one could be tricky?
        filter:"",
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        // the dynamic list is generated here.
        name: "manager_id",
        choices: "",//array of managers
        // return the manager's ID
        filter:""
    }
]
const transferEmployee = [
    {
        type: "list",
        message: "Who would you like to transfer?",
        name: "id",
        choice:"", //array of employees
        filter: "" // Needs to return the employee ID
    },
    {
        type: "list",
        message: "To which department would you like to transfer the employee?",
        name: "department",
        choices:"" // array of departments
    },
    {
        type: "confirm",
        message: "Would you like to assign the manager automatically?",
        name: "managerConfirm"
    },
    {
        type: "list",
        message: "Please select a manager to assign the employee to",
        name: "managerId",
        choices:"",// an array of managers with their department also listed. 
        when: '', // when the previous confirm is true. 
        filter: "" // returns the id of the manager
    }
]
const removeEmployee = [
    {
        type: "list",
        message: "Select an employee to remove.",
        name: "employeeId",
        choices:"", //array of employees
        // Needs to return the employee ID
        filter: ""
    },
    {
        type: "confirm",
        message: "Are you sure you would like to delete this employee?",
        name: "",
        // I don't know if this needs more lines or not.
    }
]

// ==================
// EDIT EMPLOYEE
// ==================

const editEmployee = [
    {
        type: "list",
        message: "Select an employee to edit",
        choices: "", // I guess a list of employee with an exit option. Look into adding a space for clarity.
        name: "editId",
        filter: "" // return the employee ID of the employee.
    },
    {
        type: "list",
        message: "What would you like to change?",
        choices: 
    }
]

// ==================
// MANAGE DEPARTMENTS
// ==================
// Pass in an array of departments and a list of roles. 

const editDepartments = [
    {
        type: "list",
        message: "What would you like to change?",
        name: "editChoice",
        choices: [
            {
                name:"Add Department",
                value: "ADD"
            },
            {
                name:"Remove Department",
                value: "REMOVE"
            },
            // Only if time remaining
            // {
            //     name:"Edit Department",
            //     value: "EDIT"
            // },
            {
                name:"Return to previous menu",
                value: "BACK"
            },
        ]
    },
    {
        type: "list",
        message: "Which department would you like to remove?",
        name: "departmentId",
        choices: "",
        when: "",
    }
    {
        type: "input",
        message: "Enter the name of the new department.",
        name: "newName",
        when: ""
    },
]
const editRoles = [
    {
        type: "list",
        message: "What would you like to change?",
        name: "editChoice",
        choices: [
            {
                name:"Add Role",
                value: "ADD"
            },
            {
                name:"Remove Role",
                value: "REMOVE"
            },
            // Only if time remaining.
            // {
            //     name:"Edit Role",
            //     value: "EDIT"
            // },
            {
                name:"Return to previous menu",
                value: "BACK"
            }
        ]
    },
    {
        type: "list",
        message: "Which role would you like to remove?",
        name: "removeId",
        choices: "",
        when: ""
    },
    {
        type: "input",
        message: "Enter the name of the new role.",
        name: "newName",
        when: ""
    },
    {
        type: "list",
        message: "Which department would you like to add this role to?",
        name: "newDepartmentId",
        choices: '',
        when: ""
    },
    {
        type: "input",
        message: "Enter a salary amount.",
        name: "newSalary",
        when: ""
    },
]

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