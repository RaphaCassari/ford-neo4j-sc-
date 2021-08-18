//const { uuid: v4 } = require('uuid');
//const fakeData = require('../../utils/fakeData.js');
const cql = require('../queries/cql');
const db = require('../database/qneo4j');
//const fakeData = require('../utils/fakeData')

class CourseController {

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

module.exports = CourseController