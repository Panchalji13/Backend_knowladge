import { Sequelize } from "sequelize";

const sequelize = new Sequelize('Knoladgebase', 'root', 'Ankit@123', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;