import "./App.css";
import { Route, BrowserRouter, useNavigate, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookingcar from "./pages/Bookingcar";
import Private from "./components/Private";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
// import "antd/dist/antd.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Private Component={Home} />} />
          <Route path="/login" exact Component={Login} />
          <Route path="/register" exact Component={Register} />
          <Route
            path="/booking/:carid"
            exact
            element={<Private Component={Bookingcar} />}
          />
          <Route
            path="/userbookings"
            exact
            element={<Private Component={UserBookings} />}
          />
          <Route
            path="/addcar"
            exact
            element={<Private Component={AddCar} />}
          />
          <Route
            path="/editcar/:carid"
            exact
            element={<Private Component={EditCar} />}
          />
          <Route
            path="/admin"
            exact
            element={<Private Component={AdminHome} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
