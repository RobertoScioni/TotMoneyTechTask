// we have 5 tables and each reservation has an hour of "tabletime"
// the restourant is open from 19 to 24 so reservations close at 23
// each table has four seats

// usually a restourant does not mix tables,
//so a user should be able to book a certain nuber of seats
//and be allocated the minimum number of tables to have such seats ceiling(seats/4)
import express from "express"
import dayjs, { Dayjs } from "dayjs"
import { Reservation } from "./model"
import { Op } from "sequelize"

export const reservationRouter = express.Router()

reservationRouter.post("/", async (req, res, next) => {
	if (dayjs(req.body.time).hour() < 19) {
		res.status(400).send("we are open between 19 o clock and 24")
	} else {
		try {
			const newRes = req.body
			const tables: number = Math.ceil(req.body.seats / 4)
			const upperlimit = dayjs(req.body.time)
				.subtract(1, "hour")
				.format("YYYY-MM-DD HH:mm:ss")

			let reservations: number = await Reservation.sum("tables", {
				where: { time: { [Op.between]: [upperlimit, req.body.time] } },
			})
			reservations = isNaN(reservations) ? 0 : reservations
			console.log("**********************************")
			console.log(reservations, "+", tables)
			if (tables + reservations <= 5) {
				newRes.tables = tables
				const newReservation = await Reservation.create(newRes)
				res
					.status(200)
					.send("reservation registered for " + tables + " tables" + upperlimit)
			} else {
				res
					.status(400)
					.send("could not find a free table at the requested time")
			}
		} catch (error) {
			console.error(req.body)
			console.error(error)
			res.send("error")
		}
	}
})

reservationRouter.get("/", async (req, res, next) => {
	try {
		let reservations: object[] = []
		if (req.body.hasOwnProperty("startDate")) {
			if (req.body.hasOwnProperty("endDate")) {
				reservations = await Reservation.findAll({
					where: {
						time: { [Op.between]: [req.body.startDate, req.body.endDate] },
					},
				})
			} else {
				console.log("we have a minimum date to search from")
				reservations = await Reservation.findAll({
					where: { time: { [Op.gte]: req.body.startDate } },
				})
			}
		} else {
			if (req.body.hasOwnProperty("endDate")) {
				console.log("we have a maximum date")
				reservations = await Reservation.findAll({
					where: { time: { [Op.lte]: req.body.endDate } },
				})
			} else {
				console.log("print everything")
				reservations = await Reservation.findAll()
			}
		}
		res.status(200).send(reservations)
	} catch (error) {
		console.error(error)
		res.status(404).send("not found")
	}
})
