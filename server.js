// =================================================================
//       |V|
//    .::| |::.
//   ::__| |__::
//  >____   ____<           Dear Lord,
//   ::  | |  ::
//    '::| |::'             As I sit before this code, I pray for Your guidance.
//       | |                Grant me the wisdom to understand each line and the patience to debug when things go awry.
//       | |                May my application run smoothly, free from errors and exceptions.
// jgs   |A|
//           _.-/`)         In every function I craft and every algorithm I implement, let me reflect the creativity You showed in Your creation.
//          // / / )        And when success comes,
//       .=// / / / )       let me give thanks for the skills You have given me and the wonderful ways in which technology can serve Your world.
//      //`/ / / / /
//     // /     ` /         In Jesus' name, I pray. Amen.
//    ||         /
//     \\       /
//      ))    .'
// jgs //    /
//          /
// =================================================================

require("dotenv").config();
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const connectDB = require("./src/config/dbConn");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { logger } = require("./src/middlewares/logger");
const errorHandler = require("./src/middlewares/errorHandler");
const { loggerEvents } = require("./src/middlewares/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const socketHandler = require("./src/socket/socketHandler");

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use(require("./src/router"));
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Use the socket handler
  socketHandler(io);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  loggerEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
