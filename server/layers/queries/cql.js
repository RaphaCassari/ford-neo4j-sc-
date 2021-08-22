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
        console.log(languages)
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
            MERGE (c:${course} {id:apoc.create.uuid(), name: name})
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

    query() {
        return {
            cypher: `
            match (n:User {type:"Candidato"})
            with collect(n) as users                  
            unwind  users as user  
            
            


            set  user.score = 5                        
            return * 
            `
        }
    }
}

module.exports = new Cql();