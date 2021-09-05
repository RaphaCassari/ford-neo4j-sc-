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

    createDataBase() {
        return {
            cypher: `
            UNWIND ["Candidato", "Funcionario", "Gestor"] as type
            CREATE (t:Type {id: apoc.create.uuid(), name: type})
            WITH t
            UNWIND [""]`
        }
    }

    createUser(name, email, password, cpf, type, area, courses, languages) {
        return {
            cypher: `
            MERGE (user:User {name: $name, email: $email, password: $password, cpf: $cpf})
            WITH user
            MATCH (t:Type {name: $type})
            CREATE (user) - [:IS] -> (t)
            WITH user
            MATCH (a:Area {name: $area})
            CREATE (user) - [:PARTICIPATE] -> (a)
            WITH user
            UNWIND $courses as courseId
            MATCH (c:Course {id: courseId})
            CREATE (user) - [:KNOW] -> (c)
            WITH user LIMIT 1
            UNWIND $languages as languageId
            MATCH (l:Language {id: languageId})
            CREATE (user) - [:SPEAK] -> (l)
            RETURN *
            `,
            params: { name, email, password, cpf, type, area, courses, languages }
        }
    }

    login(email, password) {
        return {
            cypher: `
            MATCH (user:User {email: $email, password: $password}) -- (type:Type)
            RETURN *
            `,
            params: { email, password }
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
            MERGE (c:Language {id:apoc.create.uuid(), name: name})
            RETURN c`,
            params: { names }
        }
    }

    getLabel() {
        return {
            cypher: `
            MATCH (n: $labelName)
            RETURN n`,
        }
    }

    getUsers() {
        return {
            cypher: `
            MATCH (user:User) -- (type:Type)
            WITH user, type
            MATCH (user:User) - [:KNOW] -> (courses:Course)
            WITH user, type,  count(courses) as courses
            MATCH (user) - [:SPEAK] -> (languages:Language)
            RETURN user, type, courses, count(languages) as languages
          `,
        };
    }

    getUserById(userId) {
        return {
            cypher: `
            MATCH (u:User {id: $userId})
            RETURN u `,
            params: { userId }
        }
    }

    uploadPdfUsers(users) {
        return {
            cypher: `
                UNWIND $users as user
                MERGE (u:User {name: user.name, email: user.email, cpf: user.cpf})
                WITH u, user
                UNWIND user.courses as course
                MERGE (c:Course {name: course})
                ON CREATE SET 
                    c.id= apoc.create.uuid()
                WITH u,c, user
                MERGE (c) <- [:KNOW] - (u)
                WITH u, user
                UNWIND user.languages as language
                MERGE (l:Language {name: language})
                ON CREATE SET 
                    l.id= apoc.create.uuid()
                WITH u,l, user
                MERGE (l) <- [:SPEAK] - (u)
                WITH u, user
                MERGE (a:Area {name: user.area})
                ON CREATE SET 
                    a.id= apoc.create.uuid()
                WITH a,u, user
                MERGE (a) <- [:PARTICIPATE] - (u)
                WITH u, user
                MERGE (t:Type {name: user.type})
                ON CREATE SET 
                    t.id= apoc.create.uuid()
                WITH t,u, user
                MERGE (t) <- [:IS] - (u)
            `,
            params: { users }
        }
    }

    courseByArea(nameArea) {
        return {
            cypher: `
            MATCH (courses:Course) -- () -- (a:Area {name: $nameArea})
            RETURN courses`,
            params: { nameArea }
        }
    }

}

module.exports = new Cql();