import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Button, Empty, Space } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm, message, Card } from "antd";

function AdminHome() {
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

  const handleDelete = (carId) => {
    dispatch(deleteCar({ carid: carId }));
    message.success('Car deleted successfully!');
  };

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4 mb-4">
        <Col lg={20} sm={24} xs={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ 
              margin: 0, 
              fontSize: '2rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🛡️ Admin Panel
            </h2>
            <Link to="/addcar">
              <Button 
                type='primary'
                size='large'
                icon={<PlusOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600'
                }}
              >
                Add New Car
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {loading && <Spinner />}

      {totalCars.length === 0 ? (
        <Row justify="center">
          <Col lg={20} sm={24} xs={24}>
            <Empty
              description="No cars added yet"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            />
          </Col>
        </Row>
      ) : (
        <Row justify="center" gutter={[16, 24]} style={{ paddingBottom: '30px' }}>
          {totalCars.map((car) => {
            return (
              <Col lg={5} md={8} sm={12} xs={24} key={car._id}>
                <Card 
                  className="car p-2 bs1"
                  hoverable
                  cover={
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="carimg"
                      style={{ height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  }
                  bodyStyle={{ padding: '1rem' }}
                  style={{ borderRadius: '12px', overflow: 'hidden' }}
                >
                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {car.name}
                      </p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                        💰 ${car.rentPerHour}/hour
                      </p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 0 }}>
                        👥 {car.capacity} seats • {car.fuelType}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                      <Link to={`/editcar/${car._id}`}>
                        <Button
                          type='primary'
                          shape='circle'
                          icon={<EditOutlined />}
                          style={{
                            background: '#52c41a',
                            border: 'none'
                          }}
                          title="Edit car"
                        />
                      </Link>

                      <Popconfirm
                        title="Delete Car"
                        description="Are you sure you want to delete this car?"
                        onConfirm={() => handleDelete(car._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          danger
                          shape='circle'
                          icon={<DeleteOutlined />}
                          title="Delete car"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </DefaultLayout>
  );
}

export default AdminHome;