import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/AuthContext.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import BookEditPage from "./pages/BookEditPage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";

function App() {
  const { isAuthenticated, isBooting } = useAuth();

  if (isBooting) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <p className="section-label">Loading</p>
          <h1>Checking your session.</h1>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/books" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to="/books" replace />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/new" element={<BookEditPage />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="books/:id/edit" element={<BookEditPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/books" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
