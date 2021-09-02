import mongoose from "mongoose";
import { Room } from "../../typings";
import { IRoom, RoomSchema } from "./schema";

export const RoomsModel = mongoose.model<IRoom>("rooms", RoomSchema)