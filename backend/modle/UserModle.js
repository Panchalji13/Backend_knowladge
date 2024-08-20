import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db.config.js'; // Adjust the path as needed
import bcrypt from 'bcryptjs';



// class User extends Model {}
// User.define
export const User = sequelize.define('user',{
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      let saltKey = bcrypt.genSaltSync(10);
      let encryptedPassword = bcrypt.hashSync(value, saltKey);
      this.setDataValue('password', encryptedPassword);
  }
  },
}, {
  sequelize,
  modelName: 'User',
});
User.checkPassword = (originalPassword, encryptedPassword) => {
  return bcrypt.compareSync(originalPassword, encryptedPassword);
}
sequelize.sync()
    .then(res => {
        console.log("Table created successfully");
    })
    .catch(err => {
        console.log(err, "Something went wrong in User model");
    });
export default User;
