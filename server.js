
// mongoose connection with mongodb;

let mongoose = require("mongoose")
let dbConfig = require("./configs/dbConfig");


mongoose.connect(dbConfig.DB_URL);

let db = mongoose.connection;

db.on("err", () => {
     console.log("error while connecting to mongodb")
})
db.once("open", () => {
     console.log("connected to mongodb")
})



// express setup ;
let express = require("express");
let bodyParser= require("body-parser");
const serverConfig = require("./configs/serverConfig");
let expressApp = express();

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

// import routes

require("./routes/movieRoutes")(expressApp);
require("./routes/theatreRooutes")(expressApp);


expressApp.listen(serverConfig.PORT, () => {
     console.log(`you server is listening at port ${serverConfig.PORT}`)
}
)
