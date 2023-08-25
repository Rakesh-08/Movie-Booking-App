
// env configuration

require("dotenv").config();

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

// import admin creation function
let {createAdmin }= require("./controllers/authController")

// express setup ;
let express = require("express");
let bodyParser= require("body-parser");
const serverConfig = require("./configs/serverConfig");
let expressApp = express();

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

// import routes

require("./routes/movieRoutes")(expressApp);
require("./routes/theatreRoutes")(expressApp);
require("./routes/userRoutes")(expressApp);
require("./routes/authRoutes")(expressApp)
require("./routes/bookingRoutes")(expressApp);
require("./routes/paymentRoutes")(expressApp);


expressApp.listen(serverConfig.PORT, () => {
     console.log(`you server is listening at port ${serverConfig.PORT}`);
     createAdmin();
}
)
