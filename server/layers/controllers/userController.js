//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');
const fakeData = require('../utils/fakeData')

class UserController {
    async get(req, res) {
        const { cypher } = cql.getUsers();
        const user = await db.execute({ cypher });
        return res.json(user);
    }

    async create(req, res) {
        const { name, cpf, email, type, courses, languages } = req.body
            //const { name, cpf, email } = fakeData.CandidateFake()
        const { cypher, params } = cql.createUser(name, cpf, email, type, courses, languages);
        const user = await db.execute({ cypher, params });
        return res.json(user);
    }
}

module.exports = UserController