const faker = require('faker');

module.exports = {
    CandidateFake() {
        return {
            name: faker.name.findName(),
            cpf: faker.datatype.number({ min: 1, max: 1000 }),
            email: faker.internet.email()
        }
    }
};