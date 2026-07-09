 const app  = require("./src/app.js");
 const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);


require("dotenv").config();

const connectToDb = require("./src/config/database.js");

// Database Connection
connectToDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});