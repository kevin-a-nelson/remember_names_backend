var express = require('express');
var router = express.Router();
const { pool } = require('../config')

/* GET users listing. */
router.get('/', function (request, response) {
    pool.query('SELECT * FROM people_groups', (error, results) => {
        if (error) {
            return error
        }
        response.status(200).json(results.rows)
    })
});

router.post('/', function (request, response) {

    const { person_id, group_id } = request.body

    const query = `
        INSERT INTO people_groups (person_id, group_id)
        VALUES ($1, $2)
    `

    body = [person_id, group_id]

    pool.query(query, body, error => {
        if (error) {
            return error
        }
        response.status(201).json({ status: 'success', message: 'People_group added' })
    })
})

router.put('/:id', function (request, response) {

    const { person_id, group_id } = request.body

    const { id } = request.params

    const query = `
        UPDATE people_groups
        SET person_id = $1, group_id = $2
        WHERE id = $3
    `
    const body = [person_id, group_id, id]

    pool.query(query, body, error => {
        if (error) {
            return error
        }
        response.status(204).json({ stats: 'status', message: 'People_group updated' })
    })
})

router.delete('/:id', function (request, response) {

    const { id } = request.params

    console.log(id)

    const query = `
        DELETE FROM people_groups
        WHERE id = $1
    `
    const body = [id]

    pool.query(query, body, error => {
        if (error) {
            return error
        }
        response.status(202).json({ status: 'success', message: 'Person_group deleted' })
    })
})

router.delete('/', function (request, response) {
    const { person_id, group_id } = request.body

    const query = `
        DELETE FROM people_groups
        WHERE person_id = $1 AND group_id = $2
    `

    const body = [person_id, group_id]

    pool.query(query, body, error => {
        if (error) {
            return error
        }
        response.status(202).json({ status: 'success', message: 'Person_group deleted' })
    })
})

module.exports = router;
