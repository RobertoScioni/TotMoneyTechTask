import express from "express"
//import { User } from "../../db"
import { User } from "./model"

export const userRouter = express.Router()

userRouter.post("/", async (req, res, next) => {
	const message: string = "testing this route"
	try {
		const newUser = await User.create(req.body)
		res.status(200).send("user registered")
	} catch (error) {
		console.error(req.body)
		console.error(error)
		res.send("error")
	}
})

userRouter.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll()
		res.status(200).send(users)
	} catch (error) {
		console.error(error)
		res.status(404).send("not found")
	}
})
