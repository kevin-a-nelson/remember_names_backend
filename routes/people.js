var express = require('express');
var router = express.Router();
const { pool } = require('../config')

/* GET people listing. */
router.get('/', function (request, response) {

    const query = `
        SELECT * FROM people
    `

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});

router.get('/:id', function (request, response) {

    const { id } = request.params

    const query = `
        SELECT * FROM people WHERE id = $1
    `

    const body = [id]

    pool.query(query, body, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
})

router.post('/', function (request, response) {

    const {
        title,
        email,
        majior,
        class_year,
        thumbnail,
        photo,
        country } = request.body

    const query = `
        INSERT INTO people (title, email, majior, class_year, thumbnail, photo, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `

    const body = [title, email, majior, class_year, thumbnail, photo, country]

    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(201).json({ status: 'success', message: 'Person added' })
    })
});

router.put('/:id', function (request, response) {

    const {
        title,
        email,
        majior,
        class_year,
        thumbnail,
        photo,
        country,
    } = request.body

    const { id } = request.params

    const query = `
        UPDATE people
        SET title = $1, email = $2, majior = $3, class_year = $4, thumbnail = $5, photo = $6, country = $7
        WHERE id = $8
    `

    const body = [title, email, majior, class_year, thumbnail, photo, country, id]

    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(204).json({ status: 'success', message: 'Person updated' })
    })
})

router.delete('/:id', function (request, response) {

    const { id } = request.params

    const query = `
        DELETE FROM people
        WHERE id = $1
    `
    const body = [id]
    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(202).json({ status: 'success', message: 'Person deleted' })
    })
})


module.exports = router;
