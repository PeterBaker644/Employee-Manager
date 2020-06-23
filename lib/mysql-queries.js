const employeeList = 
`SELECT employee.id, 
	CONCAT_WS(' - ', CONCAT_WS(' ', first_name, last_name), role.title) AS full_title, department.name
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON department.id = role.department_id`;
  
const managerList = 
`SELECT employee.id,
	CONCAT_WS(' - ', CONCAT_WS(' ', first_name, last_name), role.title) AS full_title,
    department.name
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON department.id = role.department_id
  WHERE manager_id IS NULL`;

const roleList = "SELECT id, title FROM role";

const departmentList = "SELECT * FROM department";

// const viewByDepartment

// const viewByManager

// const viewManagers

module.exports = {
    employeeList,
    managerList,
    roleList,
    departmentList
}