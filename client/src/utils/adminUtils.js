// Utility functions for admin role management

export const isUserAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && (user.isAdmin === true || user.role === "admin");
  } catch (e) {
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
};

export const setUserAdmin = (userId, isAdmin = true) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id === userId) {
      user.isAdmin = isAdmin;
      user.role = isAdmin ? "admin" : "user";
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getAdminUsers = () => {
  // This would typically come from your backend
  // For now, returning a list that can be configured
  return [
    // Add admin usernames here
    // Example: "admin", "harshil"
  ];
};

export const isAdminUser = (username) => {
  return getAdminUsers().includes(username);
};
