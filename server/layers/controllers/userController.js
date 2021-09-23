//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');
const fakeData = require('../utils/fakeData')
const excel = require('../utils/excel')

class UserController {
    async get(req, res) {
        const { cypher } = cql.getUsers();
        const user = await db.execute({ cypher });
        return res.json(user);
    }

    async getUserInfoByCpf(req, res) {
        const { cpf } = req.body
        const { cypher, params } = cql.getUserInfoByCpf(cpf);
        const [userInfo] = await db.execute({ cypher, params });
        return res.json(userInfo);
    }

    async create(req, res) {
        const { name, email, password, cpf, type, areaId, courses, languages } = req.body
            //const { name, cpf, email } = fakeData.CandidateFake()
        const { cypher, params } = cql.createUser(name, email, password, cpf, type, areaId, courses, languages);
        const user = await db.execute({ cypher, params });
        //let cypher2 = { cypher } = cql.updateScore()
        //await db.execute({ cypher2 });
        return res.json(user);
    }

    async login(req, res) {
        const { email, password } = req.body
        const { cypher, params } = cql.login(email, password)
        const result = await db.execute({ cypher, params });
        return res.json(result);
    }

    async updateScore() {
        const cypher2 = { cypher } = cql.updateScore()
        await db.execute({ cypher2 });
    }
}

module.exports = UserController