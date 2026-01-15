import { Col, Row, Form, Input, Button, Card } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar } from "../redux/actions/carsActions";
import { PlusOutlined } from "@ant-design/icons";

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [form] = Form.useForm();

  function onFinish(values) {
    values.bookedTimeSlots = [];
    dispatch(addCar(values));
    form.resetFields();
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" style={{ paddingTop: "30px" }}>
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Card
            title={
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <PlusOutlined /> Add New Car
              </div>
            }
            className="bs1"
            bodyStyle={{ padding: "2rem" }}
            style={{ borderRadius: "12px" }}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              form={form}
              requiredMark={true}
            >
              <Form.Item
                name="name"
                label="Car Name"
                rules={[
                  { required: true, message: "Please enter car name" },
                  { min: 2, message: "Car name must be at least 2 characters" },
                ]}
              >
                <Input placeholder="e.g., Toyota Camry" size="large" />
              </Form.Item>

              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  { required: true, message: "Please enter image URL" },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <Input
                  placeholder="https://example.com/car-image.jpg"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="rentPerHour"
                label="Rent Per Hour ($)"
                rules={[
                  { required: true, message: "Please enter rent per hour" },
                  { pattern: /^\d+$/, message: "Please enter a valid number" },
                ]}
              >
                <Input placeholder="e.g., 50" size="large" type="number" />
              </Form.Item>

              <Form.Item
                name="capacity"
                label="Passenger Capacity"
                rules={[
                  { required: true, message: "Please enter capacity" },
                  { pattern: /^\d+$/, message: "Please enter a valid number" },
                ]}
              >
                <Input placeholder="e.g., 5" size="large" type="number" />
              </Form.Item>

              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true, message: "Please enter fuel type" }]}
              >
                <Input
                  placeholder="e.g., Petrol, Diesel, Electric"
                  size="large"
                />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "2rem",
                }}
              >
                <Button
                  onClick={() => form.resetFields()}
                  size="large"
                  style={{ borderRadius: "6px" }}
                >
                  Clear
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                  }}
                >
                  Add Car
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;
