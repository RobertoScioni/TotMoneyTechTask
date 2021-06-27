import { DataTypes } from "sequelize"
import { sequelize } from "../../db"
import { User } from "../users/model"

export const Reservation = sequelize.define("Reservation", {
	time: { type: DataTypes.DATE, allowNull: false },
	tables: { type: DataTypes.INTEGER, allowNull: false },
})

Reservation.belongsTo(User, { foreignKey: "email" })
User.hasMany(Reservation, { as: "reservations", foreignKey: "email" })
Reservation.sync()
