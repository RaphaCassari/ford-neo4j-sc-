const xlsx = require('node-xlsx');
const path = require('path');



module.exports = {
    split() {
        const workSheetsFromFile = xlsx.parse(path.resolve(__dirname, '..', '..', 'tmp', 'main.xlsx'));
        let users = []
        workSheetsFromFile[0].data.forEach(element => {
            if (element.length != 0) {
                users.push({
                    name: element[0],
                    cpf: element[1],
                    email: element[2],
                    courses: (element[3] || '').toUpperCase().split(','),
                    languages: (element[4] || '').toUpperCase().split(','),
                    area: (element[5]).toUpperCase().trim(),
                    type: (element[6]).toUpperCase().trim()
                })
            }
        });
        return users
    }
}