import { Sequelize, DataTypes } from "sequelize"

export const sequelize = new Sequelize(
	"postgres://postgres:hpscanjet2300c@localhost:5432/totMoney"
)
