import express from "express"
import { Sequelize, DataTypes } from "sequelize"

import { reservationRouter } from "./services/reservations"
import { userRouter } from "./services/users"

const server = express()

const sequelize = new Sequelize(
	"postgres://postgres:hpscanjet2300c@localhost:5432/totMoney"
)

const PORT = 8000
server.use(express.json())
server.get("/", (req, res) => res.send("Express + TypeScript Server"))
server.use("/users", userRouter)
server.use("/reservations", reservationRouter)
server.listen(PORT, () => {
	console.log(`Server is running at https://localhost:${PORT}`)
})
