import express from "express";
import { RoomsModel } from "./model";

const roomsRouter = express.Router();


roomsRouter.get('/', async (req, res) => {

    try {
        const rooms = await RoomsModel.find({})
        res.status(200).send({ rooms })
    } catch (error) {
        console.log(error)
    }
})

export default roomsRouter