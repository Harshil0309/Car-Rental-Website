import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../components/Spinner";
AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(userLogin(values));
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
            alt="Car rental"
          />
          <h1 className="login-logo">Rent A Car</h1>
        </Col>
        <Col lg={8} sm={24} xs={24} className="p-4">
          <Form
            layout="vertical"
            className="login-form"
            onFinish={onFinish}
          >
            <h1 style={{ marginBottom: "1.5rem", fontSize: "2.2rem" }}>Welcome Back</h1>
            <hr />

            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" }
              ]}
            >
              <Input 
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" }
              ]}
            >
              <Input.Password 
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <button className="btn1 mt-3 mb-3" style={{ width: "100%", padding: "10px 20px" }}>
              Login
            </button>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <p style={{ color: "#666", marginBottom: "10px" }}>Don't have an account?</p>
              <Link to="/register" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                Click Here to Register
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
