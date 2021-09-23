//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');
//const fakeData = require('../utils/fakeData')

class CourseController {
    async createMany(req, res) {
        const { names } = req.body
        const { cypher, params } = cql.createManyCourse(names);
        const courses = await db.execute({ cypher, params });
        return res.json(courses);
    }

    async getByCpf(req, res) {
        const { areaId } = req.body
        const { cypher, params } = cql.courseByArea(areaId);
        const courses = await db.execute({ cypher, params });
        return res.json(courses);
    }
}

module.exports = CourseController