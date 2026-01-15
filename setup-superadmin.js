const mongoose = require("./db");
const User = require("./models/userModel");

async function setupSuperAdmin() {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ isSuperAdmin: true });
    if (existingSuperAdmin) {
      console.log("✅ Super Admin already exists:", existingSuperAdmin.username);
      process.exit(0);
    }

    // Create super admin user
    const superAdmin = new User({
      username: "superadmin",
      password: "superadmin123",
      isAdmin: true,
      isSuperAdmin: true,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await superAdmin.save();
    console.log("✅ Super Admin user created successfully!");
    console.log("   Username: superadmin");
    console.log("   Password: superadmin123");
    console.log("   Role: superadmin");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating super admin:", error);
    process.exit(1);
  }
}

setupSuperAdmin();
