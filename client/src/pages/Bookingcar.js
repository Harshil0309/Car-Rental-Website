import {
  Col,
  Row,
  DatePicker,
  Checkbox,
  Modal,
  Card,
  Divider,
  Button,
  Tag,
  Space,
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import AOS from "aos";
import { useParams } from "react-router";
import {
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "aos/dist/aos.css";

const { RangePicker } = DatePicker;

function BookingCar() {
  const params = useParams();
  const { cars } = useSelector((state) => state.carsReducers);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == params.carid));
    }
  }, [cars]);

  useEffect(() => {
    let amount = totalHours * (car.rentPerHour || 0);
    if (driver) {
      amount += 30 * totalHours;
    }
    setTotalAmount(amount);
  }, [driver, totalHours, car.rentPerHour]);

  function selectTimeSlots(values) {
    if (values) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
      setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
      setTotalHours(values[1].diff(values[0], "hours"));
    }
  }

  function booknow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "85vh", paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          {car.image && (
            <img
              src={car.image}
              className="carimg2 bs1 w-100"
              data-aos="flip-left"
              data-aos-duration="1500"
              alt={car.name}
              style={{ borderRadius: "12px" }}
            />
          )}
        </Col>

        <Col lg={10} sm={24} xs={24} className="p-3">
          <Card
            className="bs1"
            bodyStyle={{ padding: "2rem" }}
            style={{ borderRadius: "12px" }}
          >
            {car.name && (
              <>
                <h2
                  style={{
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    fontWeight: "700",
                  }}
                >
                  {car.name}
                </h2>

                <Divider />

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    📋 Car Details
                  </h4>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#666" }}>💰 Rent Per Hour</span>
                      <Tag color="blue">${car.rentPerHour || 0}</Tag>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#666" }}>⛽ Fuel Type</span>
                      <Tag>{car.fuelType || "N/A"}</Tag>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#666" }}>👥 Max Passengers</span>
                      <Tag color="green">{car.capacity || 0} seats</Tag>
                    </div>
                  </Space>
                </div>

                <Divider />

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    📅 Select Time Slots
                  </h4>
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="MMM DD YYYY HH:mm"
                    onChange={selectTimeSlots}
                    style={{ width: "100%" }}
                    size="large"
                  />
                </div>

                <Button
                  type="default"
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                    borderRadius: "6px",
                    fontWeight: "600",
                  }}
                  size="large"
                  onClick={() => setShowModal(true)}
                >
                  📆 View Booked Slots
                </Button>

                {from && to && (
                  <Card
                    style={{
                      background: "#f5f7fa",
                      borderRadius: "8px",
                      border: "none",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div style={{ marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.9rem", color: "#666" }}>
                        <CalendarOutlined /> <strong>Duration:</strong>{" "}
                        {totalHours} hours
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#666" }}>
                        <DollarOutlined /> <strong>Base Rate:</strong> $
                        {car.rentPerHour} × {totalHours} hours = $
                        {car.rentPerHour * totalHours}
                      </p>
                    </div>

                    <Checkbox
                      onChange={(e) => setdriver(e.target.checked)}
                      style={{ marginBottom: "1rem", fontWeight: "500" }}
                    >
                      <UserOutlined /> Driver Required (+$30/hour)
                    </Checkbox>

                    {driver && (
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#667eea",
                          fontWeight: "500",
                          marginBottom: "1rem",
                        }}
                      >
                        Driver Service: +${30 * totalHours}
                      </p>
                    )}

                    <Divider style={{ margin: "1rem 0" }} />

                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Total Amount: ${totalAmount}
                    </h3>

                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "1rem",
                        padding: "10px 0",
                      }}
                      onClick={booknow}
                    >
                      ✅ Confirm Booking
                    </Button>
                  </Card>
                )}
              </>
            )}
          </Card>
        </Col>

        {car.name && (
          <Modal
            title="📅 Booked Time Slots"
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
            bodyStyle={{ padding: "2rem" }}
          >
            {car.bookedTimeSlots && car.bookedTimeSlots.length > 0 ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                {car.bookedTimeSlots.map((slot, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 16px",
                      background: "#fff3cd",
                      border: "1px solid #ffc107",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  >
                    🚫 {slot.from} → {slot.to}
                  </div>
                ))}
              </Space>
            ) : (
              <p
                style={{
                  color: "#667eea",
                  fontWeight: "500",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                ✅ No bookings! This car is available.
              </p>
            )}
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
