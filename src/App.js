import './App.css';
import LoginForm from './components/loginForm.js';
import DepartmentAnalystMenu from './components/departmentAnalystMenu.js';
import DepartmentManagerMenu from './components/departmentManagerMenu.js';
import RaisePurchaseOrder from './components/raisePurchaseOrder.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRouteDepartmentAnalyst from './routeProtection/routeProtectionDepartmentAnalyst.js';
import ProtectedRouteDepartmentManager from './routeProtection/routeProtectionDepartmentManager.js';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/Login" element={<LoginForm />} />

        {/* Wrap the element, not the Route itself */}
        <Route 
          path="/DepartmentAnalystMenu" 
          element={
            <ProtectedRouteDepartmentAnalyst>
              <DepartmentAnalystMenu />
            </ProtectedRouteDepartmentAnalyst>
          } 
        />

        <Route 
          path="/RaisePurchaseOrder" 
          element={
            <ProtectedRouteDepartmentAnalyst>
              <RaisePurchaseOrder />
            </ProtectedRouteDepartmentAnalyst>
          } 
        />

        <Route 
          path="/DepartmentManagerMenu" 
          element={
            <ProtectedRouteDepartmentManager>
              <DepartmentManagerMenu />
            </ProtectedRouteDepartmentManager>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;