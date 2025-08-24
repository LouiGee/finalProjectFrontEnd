import './App.css';
import LoginForm from './components/loginForm.js';
import DepartmentAnalystMenu from './components/departmentAnalystMenu.js';
import DepartmentManagerMenu from './components/departmentManagerMenu.js';
import FinanceManagerMenu from './components/financeManagerMenu.js';
import RaisePurchaseOrder from './components/raisePurchaseOrder.js';
import ApprovePurchaseOrder from './components/approvePurchaseOrder.js';
import PayPurchaseOrder from './components/payPurchaseOrder.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRouteDepartmentAnalyst from './routeProtection/routeProtectionDepartmentAnalyst.js';
import ProtectedRouteDepartmentManager from './routeProtection/routeProtectionDepartmentManager.js';
import ProtectedRouteFinanceManager from './routeProtection/routeProtectionFinanceManager.js';

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

        <Route 
          path="/ApprovePurchaseOrder" 
          element={
            <ProtectedRouteDepartmentManager>
              <ApprovePurchaseOrder />
            </ProtectedRouteDepartmentManager>
          } 
        />


        <Route 
          path="/FinanceManagerMenu" 
          element={
            <ProtectedRouteFinanceManager>
              <FinanceManagerMenu />
            </ProtectedRouteFinanceManager>
          } 
        />

  
        <Route 
          path="/PayPurchaseOrder" 
          element={
            <ProtectedRouteFinanceManager>
              <PayPurchaseOrder />
            </ProtectedRouteFinanceManager>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;