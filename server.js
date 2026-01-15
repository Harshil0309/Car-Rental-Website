const express = require("express");
const server = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");

// CORS middleware
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(express.json());

server.use("/api/cars", require("./routes/carsRoute"));
server.use("/api/users", require("./routes/usersRoute"));
server.use("/api/bookings/", require("./routes/bookingsRoute"));

const path = require("path");

if (process.env.NODE_ENV === "production") {
  server.use("/", express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

server.get("/", (req, res) => res.send("hello"));

server.listen(port, () => console.log(`Listening the server in ${port}`));
