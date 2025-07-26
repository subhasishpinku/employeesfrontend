import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from "./components/Header"; 
import UserManager from "./components/UserManager";
import EmployeeManager from "./components/EmployeeManager";
import TableBinding from "./components/TableBinding";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          {/* Global Header can go here if needed */}
          {/* <Header /> */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/userManager" element={<UserManager />} />
            <Route path="/employeeManager" element={<EmployeeManager />} />
            <Route path="/table" element={<TableBinding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />

            {/* Protected route example */}
            <Route path="/header" element={
              <ProtectedRoute>
                <Header />
              </ProtectedRoute>
            } />

            {/* Fallback for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
