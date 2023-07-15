const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://rent_car_admin:rent_car_admin@cluster0.tzdlhqr.mongodb.net/Rent-A-Car-Website",
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
