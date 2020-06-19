USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"),("Engineering"),("Quality Assurance"),("Finance"),("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 90000, 1),("Salesperson", 34000, 1),("Senior Software Engineer", 120000, 2),("Software Engineer", 72000, 2),("Engineering Intern", 35000, 2),("QA Lead", 72000, 3),("QA Tester", 55000, 3),("Accountant", 50000, 4), ("Legal Team Lead", 120000, 5),("Laywer", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mika", "Sanchez", "1"),("Burt","Malcolm","2"),("Natasha", "Kirkov","3"),("Jasmine","Greene","4"),("Julian","Meyers", "5");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Walters", 2, 1), ("Rori","Martin",2,1),("Lily","Smith",4,2),("Samira","Mohamed",4,2),("Jake","Daverns",4,2),("Sasha","Estavez",5,2),("Kramer","Price",5,2),("Pedro","Martinez",7,3),("Val","Menchim",7,3),("Elizabeth","Grey",10,5)