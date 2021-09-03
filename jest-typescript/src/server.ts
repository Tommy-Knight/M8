import {
	badRequestErrorHandler,
	catchAllErrorHandler,
	notFoundErrorHandler,
} from "./errorHandlers";

import accomodationsRouter from "./services/accomodations/index";
import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";
import passport from "passport";
import usersRouter from "./services/users/index";

// import facebookStrategy from "./auth/oauth";

// process.env.MONGO_CONNECTION && require("dotenv").config();

console.time("Server startup");
const server = express();

// passport.use("facebook", facebookStrategy);

// ><><><><: MIDDLEWARES :><><><>< \\

server.use(cors());
server.use(express.json());
server.use(passport.initialize());

// ><><><><: ROUTES :><><><>< \\

server.use("/users", usersRouter);
server.use("/accomodations", accomodationsRouter);
console.table(listEndpoints(server));

// ><><><><: ERROR MIDDLEWARES :><><><>< \\

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

// ><><><><: MONGO TIME :><><><>< \\

// mongoose
// 	.connect(process.env.MONGO_CONNECTION, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useFindAndModify: false,
// 	})
// 	.then(() => {
// 		server.listen(port, () => {
// 			console.log("Running on port", port, "🎇");
// 			console.timeEnd("Server startup");
// 		});
// 	});

export default server;
