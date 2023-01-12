import Home from "./components/Home";
 import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import ResponsiveExample from "./components/Sidebar";
import CreateCoupon from "./components/CreateCoupon";
import Admin from "./components/Admin";
import axios from "axios"
import AdminPanel from "./components/AdminPanel";
import Model2 from "./components/Model2";
import VendorAdminPanel from "./components/VendorAdmin";
function App() {
  axios.default.withCredentials = true;
  return (  
    <div className="App">
     <Router>
     <Routes>
      <Route  path="/" element={<Home />} />
      <Route path="/sidebar" element={<ResponsiveExample />} />
      <Route  path="/login" element={<Login />}    />
      <Route   path="/signup" element={<Signup />}  />
      <Route   path="/admin" element={<Admin />}  />
      <Route   path="/createCoupon" element={<CreateCoupon />}  />
      <Route   path="/vendorAdmin" element={<VendorAdminPanel />}
        />
      <Route   path="/AdminPanel" element={<AdminPanel />}  />
      <Route   path="*" element={
        <h2>404 Page Not Found</h2>
      }  />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
