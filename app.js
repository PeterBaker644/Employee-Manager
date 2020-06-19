const inquirer = require("inquirer");
const util = require("util");
const mysql = require("mysql");
const cTable = require('console.table');

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
    console.log(`New App, this one is about songs and shit.\n`);
    start();
});

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




// Move queries to a separate file.

function userPrompt(prompt) { return inquirer.prompt(prompt); }

async function start() {
    try {
        let { choice } = await userPrompt(startQuery);
        switch (choice) {
            case "ARTIST":
                // This is an array;
                let {artist} = await userPrompt(artistQuery);
                let artistResult = await query('SELECT position, artist, song, year FROM top5000 where ?',
                    [{ artist: artist}]
                );
                console.table(artistResult);
                break;
            case "MULTI":
                // All artists more than only?
                let multiResult = await query('SELECT COUNT(position), artist FROM top5000 GROUP BY artist HAVING COUNT(position) > 1 ORDER BY COUNT(position) DESC;');
                console.log(multiResult);
                break;
            case "YEAR":
                let { yearStart, yearEnd } = await userPrompt(yearQuery);
                let yearResult = await query(`SELECT position, artist, song, year FROM top5000 WHERE year BETWEEN ${yearStart} AND ${yearEnd}`);
                console.table(yearResult);
                break;
            case "SONG":
                let { song } = await userPrompt(songQuery);
                let songResult = await query('SELECT position, artist, song, year FROM top5000 where ?',
                    [{ song: song}]
                );
                console.table(songResult);
                break;
            case "ALBUM":
                let { albumArtist } = await userPrompt(albumQuery);
                const albumSQLQuery = 
                `SELECT topalbums.year, topalbums.position, topalbums.artist, top5000.song, topalbums.album FROM topalbums INNER JOIN top5000 ON topalbums.year = top5000.year AND topalbums.artist = top5000.artist WHERE topalbums.artist = '${albumArtist}' ORDER BY year ASC`;
                let albumResult = await query(albumSQLQuery);
                console.log(`${albumResult.length} matches found!`)
                console.table(albumResult);
                break;  
            case "EXIT":
                console.log("Application terminated by the user.");
                connection.end();
                return;
        }
        start();
    } catch (err) {
        console.log(err);
    }
}

