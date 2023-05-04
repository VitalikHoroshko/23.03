const express = require('express');
const app = express();
const port = 3000;


const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '1233',
    port: 5432
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM "students_Abrakadabrai" ORDER BY id ASC', (error, results) => {
        if (error) throw error

        response.status(200).json(results.rows)
    })
}

app.get('/', (req, res) => {
    getUsers(req, res);
});

const createTable = (request, response) => {
    pool.query(
        `CREATE TABLE IF NOT EXISTS "students_Abrakadabra" (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      age INTEGER
    );`,

        (error, results) => {
            if (error) throw error;

            response.status(200).json(results.rows)
            console.log('Таблиця успішно створена');
        }
    );
}

app.get('/createTable', (req, res) => {
    createTable(req, res);
});


const addStudent = (request, response) => {
    const { first_name, last_name, age } = { first_name: '4opT', last_name: '1488', age: 228 }

    pool.query(`INSERT INTO "students_Abrakadabra" (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *`,
        [first_name, last_name, age], (error, results) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
}

app.get('/addStudent', (req, res) => {
    addStudent(req, res);
});


const getAllStudents = (request, response) => {
    pool.query('SELECT * FROM "students_Abrakadabra"', (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows)
    })
}

app.get('/getAllStudents', (req, res) => {
    getAllStudents(req, res);
});
const getStudentsByAge = (request, response) => {
    const sort = request.query.sort;

    pool.query(`SELECT * FROM "students_Abrakadabra" ORDER BY age ${sort}`, (error, results) => {
        if (error) throw error;

        response.status(200).json(results.rows)
    })
}

app.get('/getStudentsByAge', (req, res) => {
    getStudentsByAge(req, res);
});

app.listen(port, () => {
    console.log(`Веб-сервер був запущений за наступним посиланням: http://localhost:${port}/`);
});