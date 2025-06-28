import './App.css';
import LoginForm from './components/loginForm.js';
import ProductionAnalystMenu from './components/productionAnalystMenu.js';
import RaisePurchaseOrder from './components/raisePurchaseOrder.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRouteProductionAnalyst from './routeProtection/routeProtectionProductionAnalyst.js';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/Login" element={<LoginForm />} />

        {/* Wrap the element, not the Route itself */}
        <Route 
          path="/ProductionAnalystMenu" 
          element={
            <ProtectedRouteProductionAnalyst>
              <ProductionAnalystMenu />
            </ProtectedRouteProductionAnalyst>
          } 
        />

        <Route 
          path="/RaisePurchaseOrder" 
          element={
            <ProtectedRouteProductionAnalyst>
              <RaisePurchaseOrder />
            </ProtectedRouteProductionAnalyst>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;