import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Spinner() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
        color: "#667eea",
      }}
      spin
    />
  );

  return (
    <div
      className="spinner"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      <Spin indicator={antIcon} size="large" />
      <p
        style={{
          color: "#667eea",
          fontWeight: "600",
          fontSize: "0.95rem",
          margin: 0,
        }}
      >
        Loading...
      </p>
    </div>
  );
}

export default Spinner;
