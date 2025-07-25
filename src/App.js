import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from "./components/Header"; 
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TableBinding from "./components/TableBinding";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        {/* <Login/> */}
        {/* <Dashboard/> */}
        {/* Define your Routes inside <Routes> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/table" element={<TableBinding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
