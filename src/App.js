import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import UserManager from "./components/UserManager";
import EmployeeManager from "./components/EmployeeManager";
import TableBinding from "./components/TableBinding";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";

const AuthenticatedLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Header />}
      <div>{children}</div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Home />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userManager"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <UserManager />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeeManager"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <EmployeeManager />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/table"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <TableBinding />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Help />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Settings />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
