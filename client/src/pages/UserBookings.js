import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row, Card, Tag, Empty, Divider, Space } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import { CheckCircleOutlined, CalendarOutlined } from "@ant-design/icons";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const userBookings = bookings.filter((o) => o.user == user._id);

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Col lg={18} sm={24} xs={24}>
          <h2
            style={{
              marginBottom: "30px",
              fontSize: "2rem",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            📋 My Bookings
          </h2>

          {userBookings.length === 0 ? (
            <Empty
              description="No bookings yet"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            />
          ) : (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {userBookings.map((booking, index) => (
                <Card
                  key={index}
                  className="bs1"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                  bodyStyle={{ padding: 0 }}
                >
                  <Row gutter={0}>
                    {/* Car Image */}
                    <Col lg={6} md={8} sm={24} xs={24}>
                      <img
                        src={booking.car.image}
                        alt={booking.car.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "12px 0 0 12px",
                        }}
                      />
                    </Col>

                    {/* Booking Details */}
                    <Col
                      lg={12}
                      md={16}
                      sm={24}
                      xs={24}
                      style={{ padding: "1.5rem" }}
                    >
                      <div style={{ marginBottom: "1rem" }}>
                        <h3
                          style={{
                            marginBottom: "0.5rem",
                            fontSize: "1.3rem",
                            fontWeight: "700",
                          }}
                        >
                          {booking.car.name}
                        </h3>
                        <Space wrap>
                          <Tag color="blue">
                            💰 ${booking.car.rentPerHour}/hour
                          </Tag>
                          <Tag color="green">
                            ⛽ {booking.car.fuelType || "N/A"}
                          </Tag>
                          <Tag color="orange">
                            👥 {booking.car.capacity} seats
                          </Tag>
                        </Space>
                      </div>

                      <Divider style={{ margin: "1rem 0" }} />

                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <p style={{ margin: "8px 0", fontSize: "0.95rem" }}>
                          <CalendarOutlined
                            style={{ marginRight: "8px", color: "#667eea" }}
                          />
                          <strong>From:</strong> {booking.bookedTimeSlots.from}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "0.95rem" }}>
                          <CalendarOutlined
                            style={{ marginRight: "8px", color: "#667eea" }}
                          />
                          <strong>To:</strong> {booking.bookedTimeSlots.to}
                        </p>
                        <p
                          style={{
                            margin: "8px 0",
                            fontSize: "0.95rem",
                            color: "#666",
                          }}
                        >
                          <strong>Duration:</strong> {booking.totalHours} hours
                        </p>
                        <p
                          style={{
                            margin: "8px 0",
                            fontSize: "0.95rem",
                            color: "#666",
                          }}
                        >
                          <strong>Booking Date:</strong>{" "}
                          {moment(booking.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </Space>
                    </Col>

                    {/* Summary */}
                    <Col
                      lg={6}
                      md={24}
                      sm={24}
                      xs={24}
                      style={{
                        padding: "1.5rem",
                        background: "#f5f7fa",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "0 12px 12px 0",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#666",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Total Amount
                        </p>
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "1rem",
                          }}
                        >
                          ${booking.totalAmount}
                        </h3>

                        <Space wrap>
                          <Tag color="success">
                            <CheckCircleOutlined /> Confirmed
                          </Tag>
                          {booking.driverRequired && (
                            <Tag color="blue">🚗 Driver</Tag>
                          )}
                        </Space>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Transaction ID
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#667eea",
                            fontWeight: "500",
                            wordBreak: "break-all",
                          }}
                        >
                          {booking.transactionId}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
