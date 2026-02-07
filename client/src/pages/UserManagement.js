import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Card,
  Table,
  Button,
  Space,
  Modal,
  message,
  Tag,
  Badge,
  Input,
  Tooltip,
  Popconfirm,
} from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import {
  SearchOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { userLogin } from "../redux/actions/userActions";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch all users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (!currentUser || !currentUser._id) {
        message.error("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/users/all?userId=${currentUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to fetch users");
        console.error("API Error:", errorData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Error connecting to server: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (targetUserId, currentStatus) => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/users/toggleadmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?._id,
            targetUserId: targetUserId,
            isAdmin: !currentStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success(data.message);
        fetchUsers();
      } else {
        message.error(data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error updating user status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (userId === currentUser?._id) {
      message.error("You cannot delete your own account");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/users/${userId}?userId=${currentUser?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success(
          data.message || `User "${username}" deleted successfully`
        );
        fetchUsers();
      } else {
        message.error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Space>
          <span style={{ fontWeight: "600" }}>{text}</span>
          {record.isSuperAdmin && (
            <Tooltip title="Super Admin">
              <CrownOutlined style={{ color: "#faad14", fontSize: "1.2rem" }} />
            </Tooltip>
          )}
          {record.isAdmin && !record.isSuperAdmin && (
            <Badge status="processing" text="Admin" />
          )}
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "blue";
        if (role === "superadmin") color = "gold";
        if (role === "admin") color = "cyan";
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "isAdmin",
      key: "status",
      render: (isAdmin) => (
        <Tag color={isAdmin ? "green" : "default"}>
          {isAdmin ? "✅ Admin" : "👤 User"}
        </Tag>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("MMM DD, YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          {record.role !== "superadmin" && (
            <Tooltip
              title={
                record.isAdmin ? "Remove Admin Privileges" : "Promote to Admin"
              }
            >
              <Button
                type={record.isAdmin ? "primary" : "default"}
                danger={record.isAdmin}
                icon={record.isAdmin ? <LockOutlined /> : <UnlockOutlined />}
                onClick={() => handleToggleAdmin(record._id, record.isAdmin)}
                loading={loading}
              >
                {record.isAdmin ? "Remove" : "Make"} Admin
              </Button>
            </Tooltip>
          )}

          {record.role !== "superadmin" && record._id !== currentUser?._id && (
            <Popconfirm
              title="Delete User"
              description={`Are you sure you want to delete "${record.username}"?`}
              onConfirm={() => handleDeleteUser(record._id, record.username)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Col lg={22} sm={24} xs={24}>
          <Card
            title={
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <CrownOutlined style={{ color: "#faad14" }} />
                Super Admin - User Management
              </div>
            }
            className="bs1"
            bodyStyle={{ padding: "2rem" }}
            style={{ borderRadius: "12px" }}
          >
            <Row gutter={16} style={{ marginBottom: "20px" }}>
              <Col lg={12} sm={24} xs={24}>
                <Input
                  placeholder="Search users by username..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="large"
                  style={{ borderRadius: "6px" }}
                />
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Button
                  type="primary"
                  onClick={fetchUsers}
                  loading={loading}
                  block
                  size="large"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                  }}
                >
                  🔄 Refresh Users
                </Button>
              </Col>
            </Row>

            <div
              style={{
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="_id"
                loading={loading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} users`,
                }}
                bordered
                style={{ borderRadius: "8px" }}
              />
            </div>

            <div
              style={{
                marginTop: "30px",
                padding: "15px",
                background: "#f5f7fa",
                borderRadius: "8px",
                borderLeft: "4px solid #667eea",
              }}
            >
              <h4 style={{ marginTop: 0, color: "#667eea" }}>📊 Statistics</h4>
              <Row gutter={16}>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#667eea",
                      }}
                    >
                      {users.length}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>
                      Total Users
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#52c41a",
                      }}
                    >
                      {users.filter((u) => u.isAdmin).length}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>
                      Admin Users
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#1890ff",
                      }}
                    >
                      {users.filter((u) => !u.isAdmin).length}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>
                      Regular Users
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserManagement;
