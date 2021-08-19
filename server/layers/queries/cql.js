class Cql {
    constructor() {
        this.labels = {
            candidate: 'Candidate',
            course: 'Course'
        };
        this.relationships = {
            CHARACTERIZES: 'CARACTERIZA',
            PERFORMS: 'REALIZA',
        };
    }

    createConstraints() {
        const { candidate, course } = this.labels;
        return [
            `CREATE CONSTRAINT ON (cand:${candidate}) ASSERT (cand.cpf) IS UNIQUE
            CREATE CONSTRAINT ON (c:${course}) ASSERT (c.id) IS UNIQUE`,
        ];
    }

    createCandidate(name, cpf, email, courses) {
        const { candidate, course } = this.labels;
        return {
            cypher: `
            CREATE (cand:${candidate} {cpf: $cpf, name: $name, email: $email})
            WITH cand
            UNWIND $courses as courseId
            MATCH (c:${course} {id: courseId})
            CREATE (cand) - [:KNOW] -> (c)
            RETURN *
            `,
            params: { name, cpf, email, courses }
        }
    }

    createOneCourse(name) {
        const { course } = this.labels
        return {
            cypher: `
            CREATE (c:${course} {id:apoc.create.uuid(), name: $name})
            RETURN c`,
            params: { name }
        }
    }

    createManyCourse(names) {
        const { course } = this.labels
        return {
            cypher: `
            UNWIND $names as name
            MERGE (c:${course} {id:apoc.create.uuid(), name: name})
            RETURN c`,
            params: { names }
        }
    }

    getCourses() {
        const { course } = this.labels
        return {
            cypher: `
            MATCH (n:${course})
            RETURN n`,
        }
    }

    userById(id) {
        const { candidate } = this.labels;
        return {
            cypher: `
            match (cand:${candidate} {id: $id})
            RETURN cand
          `,
            params: { id },
        };
    }
}

module.exports = new Cql();