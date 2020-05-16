const { pool } = require('./config')
const fetch = require('node-fetch');

function createPersonInDB(person) {

    const {
        displayName,
        classYear,
        email,
        thumbnail,
        photo
    } = person

    const majior = person.departments[0]
        ? person.departments[0].query.major
        : "Undecided"

    const country = person.homeAddress.country

    const query = `
        INSERT INTO people (title, email, majior, class_year, thumbnail, photo, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `

    const body = [displayName, email, majior, classYear, thumbnail, photo, country]

    pool.query(query, body, error => {
        if (error) {
            return
        }
        console.log(displayName)
    })
}

function initStudents() {
    fetch('https://www.stolaf.edu/directory/search?query=e&format=json')
        .then(res => res.json())
        .then(json => {
            people = json.results
            people = people.filter(person => person.classYear)
            people.forEach(person => {
                createPersonInDB(person)
            })
        });
}

initStudents()

