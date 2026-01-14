const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://harshilgupta562_db_user:dxhzPuGHr3pYvdsN@cluster0.8mial4e.mongodb.net/rent_car_admin",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("DB connection successfull");
  });
  connection.on("error", () => {
    console.log("DB connection Error");
  });
}

connectDB();
module.exports = mongoose;
