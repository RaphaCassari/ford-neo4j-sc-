const cql = require('../queries/cql');
const db = require('../database/qneo4j');
class MainController {
    async getLabel(req, res) {
        const { labelName } = req.body
        let { cypher } = cql.getLabel()
        cypher = cypher.replace('$labelName', labelName)
        const label = await db.execute({ cypher });
        return res.json(label);
    }

    async get(req, res) {
        res.status(201).send('Requisição GET recebida com sucesso!');
    }

    async post(req, res, next) {
        let id = req.params.id;
        res.status(201).send(`Requisição POST recebida com sucesso! ${id}`);
    }

    async put(req, res, next) {
        let id = req.params.id;
        res.status(201).send(`Requisição PUT recebida com sucesso! ${id}`);
    }

    async del(req, res, next) {
        let id = req.params.id;
        res.status(200).send(`Requisição DELETE recebida com sucesso! ${id}`);
    }

}


module.exports = MainController