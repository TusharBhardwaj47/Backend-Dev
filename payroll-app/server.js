
const express = require('express');
const fs = require('fs');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// read data fn
function readEmployees() {
    let data = fs.readFileSync('employees.json');
    return JSON.parse(data);
}

// write data fn
function writeEmployees(data) {
    fs.writeFileSync('employees.json', JSON.stringify(data, null, 2));
}

// Dashboard
app.get('/', (req, res) => {

    let employees = readEmployees();

    res.render('index', { employees: employees });

});

// Show the Add Form
app.get('/add', (req, res) => {
    res.render('add');
});

// to add  Employee
app.post('/add', (req, res) => {

    let employees = readEmployees();

    let newEmployee = {
        id: Date.now(),
        name: req.body.name,
        department: req.body.department,
        salary: Number(req.body.salary)
    };

    employees.push(newEmployee);

    writeEmployees(employees);

    res.redirect('/');
});

// to Delete Employee
app.get('/delete/:id', (req, res) => {

    let employees = readEmployees();

    let newList = employees.filter(emp => emp.id != req.params.id);

    writeEmployees(newList);

    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
 