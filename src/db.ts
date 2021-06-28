import { Sequelize, DataTypes } from "sequelize"
const ConnectionUrl: string = process.env.DbURL ? process.env.DbURL : ""
export const sequelize = new Sequelize(ConnectionUrl)
