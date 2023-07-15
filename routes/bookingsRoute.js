const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
// const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(
// "sk_test_51NSmVdSHFFwPwfdRBYwxUg1l8pmu9HGyKQ9T252bJvSdeX1v0GozOxvOBnPMrYSXQJWrs4ztFdW5h51ZczVFdyJz00zC3sSiT8"
// );
// router.post("/bookcar", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.totalAmount * 100,
//       currency: "inr",
//       customer: customer.id,
//       receipt_email: token.email,
//     });

//     if (paymentIntent.status === "succeeded") {
//       req.body.transactionId = paymentIntent.id;
//       const newBooking = new Booking(req.body);
//       await newBooking.save();
//       const car = await Car.findOne({ _id: req.body.car });
//       console.log(req.body.car);
//       car.bookedTimeSlots.push(req.body.bookedTimeSlots);

//       await car.save();
//       res.send("Your booking is successful");
//     } else {
//       return res.status(400).json({ error: "Payment failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "Payment failed" });
//   }
// });
router.post("/bookcar", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const car = await Car.findOne({ _id: req.body.car });
    console.log(req.body.car);
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);

    await car.save();
    res.send("Your booking is successful");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Payment failed" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
