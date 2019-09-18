const Sequelize = require('sequelize');
const epilogue = require('epilogue');

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
    operatorsAliases: false
});

const Lecture = database.define('lecture', {
    partNumber: Sequelize.STRING,
    modelNumber: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.TEXT
});

const initializeDatabase = async (app) => {
    epilogue.initialize({ app, sequelize: database });

    epilogue.resource({
        model: Part,
        endpoints: ['/lectures', '/lectures/:id']
    });

    await database.sync();
};

module.exports = initializeDatabase;