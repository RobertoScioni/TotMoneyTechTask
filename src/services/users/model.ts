import { DataTypes } from "sequelize"
import { sequelize } from "../../db"

export const User = sequelize.define("User", {
	name: { type: DataTypes.STRING, allowNull: false },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		validate: { isEmail: true },
	},
})
User.sync()
