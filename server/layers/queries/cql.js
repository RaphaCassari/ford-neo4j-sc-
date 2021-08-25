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

    createUser(name, cpf, email, type, courses, languages) {
        return {
            cypher: `
            CREATE (user:User {cpf: $cpf, name: $name, email: $email, type: $type})
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
            params: { name, cpf, email, type, courses, languages }
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
            MATCH (user:User) - [:KNOW] -> (courses:Course)
            WITH user, count(courses) as courses
            MATCH (user) - [:SPEAK] -> (languages:Language)
            RETURN user, courses, count(languages) as languages
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

}

module.exports = new Cql();

/* 
`
MATCH (n:User {type:'Candidato'})
WITH collect(n.cpf) AS cpfs
unwind cpfs AS cpf

MATCH (p1:User {cpf: cpf})-[:KNOW]->(Course)
WITH p1, collect(id(Course)) AS p1Cuisine
MATCH (p2:User {type:'Funcionario'})-[:KNOW]->(Course) WHERE p1 <> p2
WITH p1,p1Cuisine, p2, collect(id(Course)) AS p2Cuisine
WITH p1,p1Cuisine, p2, collect(id(Course)) AS p2Cuisine
WITH p1, p2, gds.alpha.similarity.jaccard(p1Cuisine, p2Cuisine) AS similarity
WITH p1, sum(similarity) as score, count(p2) as nfunc
set p1.score = score/nfunc

WITH p1
MATCH (p1:User {cpf: cpf})-[:SPEAK]->(Language)
WITH p1, collect(id(Language)) AS p1Cuisine
MATCH (p2:User {type:'Funcionario'})-[:SPEAK]->(Language) WHERE p1 <> p2
WITH p1,p1Cuisine, p2, collect(id(Language)) AS p2Cuisine
WITH p1, p2, gds.alpha.similarity.jaccard(p1Cuisine, p2Cuisine) AS similarity
WITH p1, sum(similarity) as score, count(p2) as nfunc
set p1.score = score/nfunc


return p1.name, p1.score ORDER by p1.score DESC


` */