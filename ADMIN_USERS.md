# Admin Users List

This file documents all admin users in the Rent-A-Car system.

## Admin Users:

Add admin usernames to this list. These users will have access to:
- Admin Panel
- Add Car
- Edit Car
- Delete Car
- Manage all bookings

### Current Admin Users:
- `admin` (default admin user)
- `harshil` (developer)

## How to Make a User Admin:

### Method 1: Database Update (Recommended)
```javascript
// Connect to MongoDB and run:
db.users.updateOne(
  { username: "username" },
  { $set: { isAdmin: true, role: "admin" } }
)
```

### Method 2: Through Backend
Create an endpoint that sets admin status (requires authentication):
```javascript
POST /api/users/setadmin
Body: { username: "username", isAdmin: true }
```

### Method 3: Manual localStorage (Development Only)
In browser console:
```javascript
let user = JSON.parse(localStorage.getItem('user'));
user.isAdmin = true;
user.role = 'admin';
localStorage.setItem('user', JSON.stringify(user));
// Refresh page
location.reload();
```

## Admin Features:
✅ Access to Admin Panel
✅ Add new cars
✅ Edit existing cars
✅ Delete cars
✅ View all bookings (if implemented)

## Regular User Features:
✅ Browse available cars
✅ Book cars
✅ View own bookings
✅ Cancel bookings (if implemented)

## Security Notes:
⚠️ Always verify admin status on the backend
⚠️ Never trust client-side role checks alone
⚠️ Implement proper authorization middleware on all admin API endpoints
⚠️ Log admin activities for audit trails
