import './App.css';
import LoginForm from './components/loginForm.js';
import ProductionAnalystMenu from './components/productionAnalystMenu.js';
import RaisePurchaseOrder from './components/raisePurchaseOrder.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router> 
      <Routes>
    
       <Route path="/" element={<LoginForm />} />,
       <Route path="/ProductionAnalystMenu" element={<ProductionAnalystMenu />} /> 
       <Route path="/RaisePurchaseOrder" element={<RaisePurchaseOrder />} />                 

      </Routes>
    </Router>

  );
}

export default App;