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

    createUser(name, email, password, cpf, type, areaId, courses, languages) {
        return {
            cypher: `
            MERGE (user:User {name: $name, email: $email, password: $password, cpf: $cpf})
            WITH user
            MATCH (t:Type {name: $type})
            CREATE (user) - [:IS] -> (t)
            WITH user
            MATCH (a:Area {id: $areaId})
            CREATE (user) - [:PARTICIPATE] -> (a)
            WITH user
            UNWIND $courses as courseId
            MATCH (c:Course {id: courseId})
            CREATE (user) - [:KNOW] -> (c)
            WITH user LIMIT 1
            UNWIND $languages as languageId
            MATCH (l:Language {id: languageId})
            CREATE (user) - [:SPEAK] -> (l)


            WITH l
            MATCH (Candidato {name: 'CANDIDATO'})<-[:IS]-(n:User)
            WITH collect(n.cpf) AS cpfs
            unwind cpfs AS cpf
            with cpf
            MATCH (p1:User {cpf:cpf})-[:LANGUAGES|:KNOW]->(i)
            WITH cpf,p1, collect(id(i)) AS p1Cuisine
            match (p1)-[:PARTICIPATE]-(n)
            with n,cpf,p1,p1Cuisine
            MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p2:User)-[]->(j), (p2)-[:PARTICIPATE]-(m) WHERE p1 <> p2 AND n = m 
            WITH n,cpf,p1,p1Cuisine, p2, collect(id(j)) AS p2Cuisine
            WITH n,cpf,p1, p2, gds.alpha.similarity.jaccard(p1Cuisine, p2Cuisine) AS similarity
            WITH n,cpf,p1, sum(similarity) as score, count(p2) as nfunc
            OPTIONAL MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p2:User)-[:LANGUAGES|:KNOW]->(w),(p1:User {cpf:cpf}),(p2)-[:PARTICIPATE]-(m) WHERE p1 <> p2 AND n = m and NOT (w)<-[]-(p1)
            WITH p1,score,nfunc,collect(distinct w.name) as recommendation
            CALL apoc.when(recommendation = [],'RETURN 100.0 AS status','RETURN round(score/nfunc * 100, 1) AS status',{score:score,nfunc:nfunc}) YIELD value
            set p1.score = value.status
            set p1.recommendation = recommendation
            `,
            params: { name, email, password, cpf, type, areaId, courses, languages }
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

    getUserInfoByCpf(cpf) {
        return {
            cypher: `
            MATCH (area:Area) -- (user:User {cpf: $cpf}) -- (type:Type)
            WITH user,area,type
            MATCH (user) -- (c:Course)
            WITH user,area,type, collect(c) as courses
            MATCH (user) -- (l:Language)
            RETURN user,area,type, courses, collect(l) as languages `,
            params: { cpf }
        }
    }

    uploadPdfUsers(users) {
        return {
            cypher: `
                UNWIND $users as user
                MERGE (u:User {name: user.name, email: user.email, cpf: user.cpf, password:'default'})
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


                WITH u

                MATCH (Candidato {name: 'CANDIDATO'})<-[:IS]-(n:User)
                WITH collect(n.cpf) AS cpfs
                unwind cpfs AS cpf
                with cpf
                MATCH (p1:User {cpf:cpf})-[:LANGUAGES|:KNOW]->(i)
                WITH cpf,p1, collect(id(i)) AS p1Cuisine
                match (p1)-[:PARTICIPATE]-(n)
                with n,cpf,p1,p1Cuisine
                MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p2:User)-[]->(j), (p2)-[:PARTICIPATE]-(m) WHERE p1 <> p2 AND n = m 
                WITH n,cpf,p1,p1Cuisine, p2, collect(id(j)) AS p2Cuisine
                WITH n,cpf,p1, p2, gds.alpha.similarity.jaccard(p1Cuisine, p2Cuisine) AS similarity
                WITH n,cpf,p1, sum(similarity) as score, count(p2) as nfunc
                OPTIONAL MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p2:User)-[:LANGUAGES|:KNOW]->(w),(p1:User {cpf:cpf}),(p2)-[:PARTICIPATE]-(m) WHERE p1 <> p2 AND n = m and NOT (w)<-[]-(p1)
                WITH p1,score,nfunc,collect(distinct w.name) as recommendation
                CALL apoc.when(recommendation = [],'RETURN 100.0 AS status','RETURN round(score/nfunc * 100, 1) AS status',{score:score,nfunc:nfunc}) YIELD value
                set p1.score = value.status
                set p1.recommendation = recommendation

                WITH p1

                MATCH (Funcionario {name: 'FUNCIONARIO'})<-[:IS]-(n:User)
                WITH collect(n.cpf) AS cpfs
                unwind cpfs AS cpf
                with cpf
                MATCH (p2:User {cpf:cpf})-[:LANGUAGES|:KNOW]->(j)
                WITH p2,cpf, collect(id(j)) AS p2Cuisine
                match (p2)-[:PARTICIPATE]-(m)
                with m,cpf,p2,p2Cuisine
                MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p3:User)-[:PARTICIPATE]->(:Area {name:m.name}),(p3)-[:LANGUAGES|:KNOW]->(k)
                with p2,collect(distinct id(k)) as p3Cuisine,m,cpf,p2Cuisine
                WITH m,cpf,p2, gds.alpha.similarity.jaccard(p2Cuisine, p3Cuisine) AS similarity
                OPTIONAL MATCH (Funcionario {name: 'FUNCIONARIO'})<-[]-(p3:User)-[:PARTICIPATE]->(:Area {name:m.name}),(p3)-[:LANGUAGES|:KNOW]->(k) WHERE NOT (k)<-[]-(p2)
                WITH p2,similarity as score,collect(distinct k.name) as recommendation
                CALL apoc.when(recommendation = [],'RETURN 100.0 AS status','RETURN round(score * 100, 1) AS status',{score:score}) YIELD value
                set p2.score = value.status
            `,
            params: { users }
        }
    }

    courseByArea(areaId) {
        return {
            cypher: `
            MATCH (courses:Course) -- () -- (a:Area {id: $areaId})
            RETURN courses`,
            params: { areaId }
        }
    }

    getGraphInfos() {
        return {
            cypher: `
            match (t1:Type {name:"FUNCIONARIO"}) -- (f) 
            with count(f) as funcs 
            match (t2:Type {name:"CANDIDATO"}) -- (c) 
            with funcs, count(c)as cands 
            match (t3:Type {name:"GESTOR"}) -- (g) 
            return funcs, cands, count(g) as gents
            `
        }
    }



    updateScore() {
        return {
            cypher: `
            MATCH (uc:User {cpf:'224.324.324-28'}) -- (a:Area)
            with uc,a

            MATCH (t:Type {name:"FUNCIONARIO"}) -- (uf) -- (a)
            WITH collect(uf) as funcionarios, uc

            UNWIND funcionarios as funcionario
            MATCH (funcionario) -- (c:Course) -- (uc)
            with count(c) as courses, funcionario, uc

            MATCH (funcionario) -- (l:Language) -- (uc)
            WITH (count(l)+courses) as simi, funcionario, uc

            match (funcionario) -- (c:Course)
            with count(c) as courses, simi, funcionario, uc
            match (funcionario) -- (l:Language)

            with (simi*1.0/(count(l)+courses)) as score, uc
            set uc.score = score
            `,
        }
    }

}

module.exports = new Cql();