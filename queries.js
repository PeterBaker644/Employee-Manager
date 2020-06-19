// ================
// MANAGE EMPLOYEES
// ================
// Pass in an array of employees?

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
        // this one could be tricky?
        filter:"",
    }
]
const transferEmployee
const removeEmployee
const editEmployee

// ==================
// MANAGE DEPARTMENTS
// ==================
// Pass in an array of departments and a list of roles. 

const editDepartments
const editRoles