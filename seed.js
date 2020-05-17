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
    const state = person.homeAddress.state

    const dorm = person.campusLocations[0]
        ? person.campusLocations[0].display
        : null

    const query = `
        INSERT INTO people (title, email, majior, class_year, thumbnail, photo, country, state, dorm)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `

    const body = [displayName, email, majior, classYear, thumbnail, photo, country, state, dorm]

    pool.query(query, body, error => {
        if (error) {
            return
        }
        console.log(displayName)
    })
}

function createPeopleStartingWithLetter(letter) {
    fetch('https://www.stolaf.edu/directory/search?query=e&format=json')
        .then(res => res.json())
        .then(json => {
            people = json.results
            people = people.filter(person => person.classYear)
            people = people.filter(person => person.firstName[0] === letter)
            people.forEach(person => {
                createPersonInDB(person)
            })
        })
}

function seedPeople() {
    const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    ALPHABET.forEach(letter => {
        createPeopleStartingWithLetter(letter)
    })
}

seedPeople()

