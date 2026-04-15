import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import {
  createCategory,
  createOrderItem,
  deleteBook,
  deleteCategory,
  deleteClient,
  deleteOrder,
  getBooks,
  getClients,
  getOrders,
} from "../api/storeApi.js";
import { MetricCard } from "../components/StoreUi.jsx";
import { dashboardSections, getErrorMessage } from "../utils/storeUi.js";

function DashboardLayout() {
  const { session, isAdmin, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recentCategories, setRecentCategories] = useState([]);
  const [status, setStatus] = useState({
    tone: "idle",
    message: "Ready",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setIsLoading(true);
    try {
      const [bookData, clientData, orderData] = await Promise.all([
        getBooks(),
        getClients(),
        getOrders(),
      ]);

      setBooks(bookData);
      setClients(clientData);
      setOrders(orderData);
      setStatus({
        tone: "success",
        message: "Authenticated and synced with backend data.",
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Failed to load dashboard data."),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function removeBook(id) {
    await deleteBook(id);
    setBooks((current) => current.filter((book) => book._id !== id));
  }

  async function removeClient(id) {
    await deleteClient(id);
    setClients((current) => current.filter((client) => client._id !== id));
  }

  async function removeOrder(id) {
    await deleteOrder(id);
    setOrders((current) => current.filter((order) => order._id !== id));
  }

  async function addCategory(name) {
    const created = await createCategory({ name });
    setRecentCategories((current) => [created, ...current].slice(0, 6));
    return created;
  }

  async function removeCategory(id) {
    await deleteCategory(id);
    setRecentCategories((current) => current.filter((category) => category._id !== id));
  }

  async function addOrderItem(payload) {
    return createOrderItem(payload);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Node.js Book Store</p>
          <h1>Keycloak-protected store workspace.</h1>
          <p className="sidebar-copy">
            Read access is available to authenticated users. Write actions require the{" "}
            <span className="mono">admin</span> role.
          </p>
        </div>

        <nav className="section-nav" aria-label="Primary">
          {dashboardSections.map((section) => (
            <NavLink
              key={section.to}
              to={section.to}
              className={({ isActive }) => `nav-card${isActive ? " active" : ""}`}
            >
              <span className="nav-eyebrow">{section.eyebrow}</span>
              <strong>{section.label}</strong>
              <span>{section.description}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-metrics">
          <MetricCard label="Books" value={books.length} />
          <MetricCard label="Clients" value={clients.length} />
          <MetricCard label="Orders" value={orders.length} />
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace-header">
          <div>
            <p className="section-label">Authenticated Session</p>
            <h2>{session?.profile?.name || session?.profile?.username}</h2>
            <p className="workspace-copy">
              Signed in as <span className="mono">{session?.profile?.username}</span> with roles{" "}
              <span className="mono">{session?.roles?.join(", ") || "none"}</span>.
            </p>
          </div>
          <div className="header-actions">
            <button type="button" className="button ghost" onClick={loadDashboardData}>
              Refresh data
            </button>
            <button type="button" className="button subtle" onClick={logout}>
              Logout
            </button>
            <div className={`status-pill ${status.tone}`}>{status.message}</div>
          </div>
        </header>

        <main className="page-content">
          <Outlet
            context={{
              books,
              setBooks,
              clients,
              setClients,
              orders,
              setOrders,
              recentCategories,
              isAdmin,
              isLoading,
              session,
              setStatus,
              refreshData: loadDashboardData,
              removeBook,
              removeClient,
              removeOrder,
              addCategory,
              removeCategory,
              addOrderItem,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
