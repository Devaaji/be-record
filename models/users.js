import { DataTypes } from "sequelize";
import db from "../config/databases.js";

const Users = db.define("Users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Users;

(async () => {
  await Users.sync({ alter: true }).then(() => {
    console.log("User Database & tables created!");
  });
})();
