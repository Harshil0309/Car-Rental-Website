import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/register", reqObj);
    message.success("Registration successfull");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = (userId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(`/api/users/all?userId=${userId}`);
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Error fetching users");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const toggleAdminStatus = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/toggleadmin", reqObj);
    message.success(response.data.message);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error(
      error.response?.data?.message || "Failed to update user status",
    );
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteUser = (userId, targetUserId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.delete(
      `/api/users/${targetUserId}?userId=${userId}`,
    );
    message.success(response.data.message || "User deleted successfully");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error(error.response?.data?.message || "Failed to delete user");
    dispatch({ type: "LOADING", payload: false });
  }
};
