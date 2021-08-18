//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');
const fakeData = require('../utils/fakeData')

class UserController {
    async userById(req, res) {
        //const { id } = req.body;
        let id = req.params.id;
        const { cypher, params } = cql.userById(id);
        const [user] = await db.execute({ cypher, params });
        return res.json(user);
    }

    async createCandidate(req, res) {
        //const { name, cpf, email } = req.body
        const { name, cpf, email } = fakeData.CandidateFake()
        const { cypher, params } = cql.createCandidate(name, cpf, email);
        const [candidate] = await db.execute({ cypher, params });
        return res.json(candidate);
    }

    async createManyCourse(req, res) {
        const { names } = req.body
        const { cypher, params } = cql.createManyCourse(names);
        const courses = await db.execute({ cypher, params });
        return res.json(courses);
    }

    async getCourses(req, res) {
        const { cypher } = cql.getCourses()
        const courses = await db.execute({ cypher });
        return res.json(courses);
    }
}

module.exports = UserController