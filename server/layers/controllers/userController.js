//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');

class UserController {
    async userById(req, res) {
        //const { id } = req.body;
        let id = req.params.id;
        const { cypher, params } = cql.userById(id);
        const [user] = await db.execute({ cypher, params });
        return res.json(user);
    }

    async createCandidate(req, res) {
        //const { name } = req.body
        //console.log(req.body)
        //console.log(name)
        const { cypher } = cql.createCandidate();
        const [candidate] = await db.execute({ cypher });
        return res.json(candidate.id);
        //return res.json("sucess")
    }
}

module.exports = UserController