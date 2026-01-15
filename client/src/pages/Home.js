import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker, Button, Empty, Badge, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { SearchOutlined, FireOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducers);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    if (!values) {
      setTotalcars(cars);
      return;
    }

    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");
    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-4 mb-5" justify="center">
        <Col lg={20} sm={24} xs={24} className="p-2">
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            marginBottom: '30px',
            transition: 'all 0.3s ease',
            border: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '2px solid #667eea';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '2px solid transparent';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <SearchOutlined style={{ fontSize: '1.2rem', color: '#667eea', fontWeight: 'bold' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                Find Your Perfect Car
              </h3>
            </div>
            <p style={{ margin: '8px 0', color: '#666', fontSize: '0.95rem' }}>
              Select your desired date and time to see available vehicles
            </p>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY HH:mm"
              onChange={setFilter}
              style={{ width: '100%', maxWidth: '400px' }}
              size='large'
              placeholder={['Start Date', 'End Date']}
            />
          </div>
        </Col>
      </Row>

      {loading && <Spinner />}

      {totalCars.length === 0 ? (
        <Row justify="center" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <Col lg={20} sm={24} xs={24}>
            <Empty
              description="No cars available for selected dates"
              style={{
                marginTop: '50px',
              }}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row justify="center" style={{ marginBottom: '20px' }}>
            <Col lg={20} sm={24} xs={24}>
              <p style={{
                color: '#667eea',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FireOutlined /> {totalCars.length} vehicles available for your dates
              </p>
            </Col>
          </Row>

          <Row justify="center" gutter={[16, 24]} style={{ paddingBottom: '30px' }}>
            {totalCars.map((car, index) => {
              const isPopular = car.bookedTimeSlots.length > 2;
              return (
                <Col lg={5} md={8} sm={12} xs={24} key={car._id}>
                  <Badge.Ribbon 
                    text={isPopular ? "Popular" : "Available"} 
                    color={isPopular ? "#faad14" : "#52c41a"}
                    style={{ display: isPopular ? "block" : "none" }}
                  >
                    <div className="car p-2 bs1" style={{ 
                      transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      animation: 'scaleUp 0.5s ease-out 0.1s both'
                    }}>
                      <img src={car.image} className="carimg" alt={car.name} />

                      <div className="car-content d-flex align-items-center justify-content-between">
                        <div className="text-left pl-2">
                          <p style={{ fontSize: '1rem', fontWeight: '600' }}>{car.name}</p>
                          <p style={{ fontSize: '0.9rem' }}>
                            💰 ${car.rentPerHour}/hour
                          </p>
                          <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                            👥 {car.capacity} seats • {car.fuelType}
                          </p>
                        </div>

                        <div>
                          <Tooltip title="Click to book this car">
                            <Link to={`/booking/${car._id}`} style={{ textDecoration: 'none' }}>
                              <button className="btn1 mr-2">
                                Book Now
                              </button>
                            </Link>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </Badge.Ribbon>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </DefaultLayout>
  );
}

export default Home;
