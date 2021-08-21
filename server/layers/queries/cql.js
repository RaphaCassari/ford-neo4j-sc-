class Cql {
    constructor() {
        this.labels = {
            user: 'User',
            course: 'Course'
        };
        this.relationships = {
            CHARACTERIZES: 'CARACTERIZA',
            PERFORMS: 'REALIZA',
        };
    }

    createConstraints() {
        const { user, course } = this.labels;
        return [
            `CREATE CONSTRAINT ON (user:${user}) ASSERT (user.cpf) IS UNIQUE
            CREATE CONSTRAINT ON (c:${course}) ASSERT (c.id) IS UNIQUE`,
        ];
    }

    createUser(name, cpf, email, type, courses) {
        const { user, course } = this.labels;
        return {
            cypher: `
            CREATE (user:${user} {cpf: $cpf, name: $name, email: $email, type: $type})
            WITH user
            UNWIND $courses as courseId
            MATCH (c:${course} {id: courseId})
            CREATE (user) - [:KNOW] -> (c)
            RETURN *
            `,
            params: { name, cpf, email, type, courses }
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

    getLabel(label) {
        return {
            cypher: `
            MATCH (n: $label)
            RETURN n`,
            params: { label }
        }
    }

    getUsers() {
        //const { user } = this.labels;
        return {
            cypher: `
            match (user:User) - [:KNOW] -> (courses:Course)
            RETURN user,count(courses) as courses
          `,
        };
    }
}

module.exports = new Cql();