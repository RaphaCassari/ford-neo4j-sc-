class Cql {
    constructor() {
        this.labels = {
            candidate: 'Candidate',
        };
        this.relationships = {
            CHARACTERIZES: 'CARACTERIZA',
            PERFORMS: 'REALIZA',
        };
    }

    createConstraints() {
        const { candidate } = this.labels;
        return [
            `CREATE CONSTRAINT ON (cand:${candidate}) ASSERT (cand.id) IS UNIQUE`,
        ];
    }

    createCandidate(name) {
        const { candidate } = this.labels;
        return {
            cypher: `
            MERGE (cand:${candidate} {id: apoc.create.uuid(), name: $name})
            RETURN cand
            `,
            params: { name }
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