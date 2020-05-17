var express = require('express');
var router = express.Router();
const { pool } = require('../config')

/* GET users listing. */
router.get('/', function (request, response) {
    pool.query('SELECT * FROM groups', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});

/* GET users listing. */
router.get('/user-id/:id', function (request, response) {

    const { id } = request.params

    const query = `
        SELECT *
        FROM groups
        WHERE user_id = $1
    `

    const body = [id]

    pool.query(query, body, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});


router.get('/:id/people', function (request, response) {

    const { id } = request.params

    const query = `
        SELECT person.*
        FROM people_groups person_group, people person
        WHERE 
            person_group.group_id = $1 AND
            person_group.person_id = person.id;
    `

    const body = [id]

    pool.query(query, body, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})


router.get('/:id', function (request, response) {

    const { id } = request.params

    const query = `
        SELECT *
        FROM groups
        WHERE id = $1
    `

    const body = [id]

    pool.query(query, body, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

router.post('/', function (request, response) {

    const { title, user_id } = request.body

    const query = `
        INSERT INTO groups (title, user_id)
        VALUES ($1, $2)
    `
    const body = [title, user_id]

    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(201).json({ status: 'success', message: 'Group added' })
    })
})

router.put('/:id', function (request, response) {

    const { title, user_id } = request.body

    const { id } = request.params

    const query = `
        UPDATE groups
        SET title = $1, user_id = $2
        WHERE id = $3
    `

    const body = [title, user_id, id]

    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(204).json({ stats: 'success', message: 'Group updated' })
    })
})

router.delete('/:id', function (request, response) {

    const { id } = request.params

    const query = `
        DELETE FROM groups
        WHERE id = $1
    `
    const body = [id]

    pool.query(query, body, error => {
        if (error) {
            throw error
        }
        response.status(202).json({ status: 'success', message: 'User deleted' })
    })
})

module.exports = router;
