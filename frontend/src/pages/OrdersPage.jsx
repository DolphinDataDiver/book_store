import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createOrder, getOrderById, getOrderItemById } from "../api/storeApi.js";
import { AdminOnlyPanel, DetailCard, PageIntro } from "../components/StoreUi.jsx";
import {
  formatDate,
  formatMoney,
  getErrorMessage,
  initialOrderForm,
  initialOrderItemForm,
  truncateId,
  updateForm,
} from "../utils/storeUi.js";

function OrdersPage() {
  const {
    books,
    clients,
    orders,
    isAdmin,
    isLoading,
    removeOrder,
    addOrderItem,
    setOrders,
    setStatus,
  } = useOutletContext();
  const [orderForm, setOrderForm] = useState(initialOrderForm);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItemForm, setOrderItemForm] = useState(initialOrderItemForm);
  const [lookupOrderItemId, setLookupOrderItemId] = useState("");
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  async function handleCreateOrder(event) {
    event.preventDefault();
    try {
      const created = await createOrder({
        ...orderForm,
        total: Number(orderForm.total),
      });
      setOrders((current) => [created, ...current]);
      setOrderForm(initialOrderForm);
      setStatus({ tone: "success", message: `Order created: ${created._id}.` });
    } catch (error) {
      setStatus({ tone: "error", message: getErrorMessage(error, "Could not create order.") });
    }
  }

  async function handleDeleteOrder(id) {
    try {
      await removeOrder(id);
      if (selectedOrderId === id) {
        setSelectedOrderId("");
        setSelectedOrder(null);
      }
      setStatus({ tone: "success", message: "Order deleted." });
    } catch (error) {
      setStatus({ tone: "error", message: getErrorMessage(error, "Could not delete order.") });
    }
  }

  async function handleLoadOrder(id) {
    if (!id) {
      setSelectedOrder(null);
      return;
    }

    try {
      setSelectedOrder(await getOrderById(id));
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not load order details."),
      });
    }
  }

  async function handleCreateOrderItem(event) {
    event.preventDefault();
    try {
      const created = await addOrderItem({
        ...orderItemForm,
        quantity: Number(orderItemForm.quantity),
      });
      setLookupOrderItemId(created._id);
      setSelectedOrderItem(created);
      setOrderItemForm(initialOrderItemForm);
      setStatus({ tone: "success", message: `Order item created: ${created._id}.` });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not create order item."),
      });
    }
  }

  async function handleLookupOrderItem(event) {
    event.preventDefault();
    if (!lookupOrderItemId) {
      return;
    }

    try {
      setSelectedOrderItem(await getOrderItemById(lookupOrderItemId));
      setStatus({ tone: "success", message: "Order item loaded." });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not load order item."),
      });
    }
  }

  return (
    <section className="page-grid">
      <PageIntro
        eyebrow="Sales"
        title="Orders"
        description="Authenticated users can inspect orders. Admins can create and remove orders and order items."
        countLabel={`${orders.length} orders`}
      />

      {isAdmin ? (
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="section-label">Create</p>
              <h3>Add Order</h3>
            </div>
          </div>
          <form className="form-grid" onSubmit={handleCreateOrder}>
            <label>
              Status
              <select
                value={orderForm.status}
                onChange={(event) => updateForm(setOrderForm, "status", event.target.value)}
                required
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
              </select>
            </label>
            <label>
              Total
              <input
                type="number"
                min="0"
                step="0.01"
                value={orderForm.total}
                onChange={(event) => updateForm(setOrderForm, "total", event.target.value)}
                required
              />
            </label>
            <label className="span-2">
              Client
              <select
                value={orderForm.client}
                onChange={(event) => updateForm(setOrderForm, "client", event.target.value)}
                required
              >
                <option value="">Choose a client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.first_name} {client.last_name}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-actions span-2">
              <button type="submit" className="button primary">
                Create order
              </button>
            </div>
          </form>
        </section>
      ) : (
        <AdminOnlyPanel />
      )}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="section-label">Lookup</p>
            <h3>Order Detail</h3>
          </div>
        </div>
        <label>
          Select order
          <select
            value={selectedOrderId}
            onChange={(event) => {
              const id = event.target.value;
              setSelectedOrderId(id);
              void handleLoadOrder(id);
            }}
          >
            <option value="">Choose an order</option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                {truncateId(order._id)} - {order.status}
              </option>
            ))}
          </select>
        </label>
        <DetailCard
          title={selectedOrder ? `Order ${truncateId(selectedOrder._id)}` : "No order selected"}
          items={[
            ["Status", selectedOrder?.status],
            ["Total", selectedOrder ? formatMoney(selectedOrder.total) : null],
            ["Client ID", selectedOrder?.client],
            ["Date", formatDate(selectedOrder?.order_date)],
            ["ID", selectedOrder?._id],
          ]}
        />
      </section>

      <section className="panel panel-wide">
        <div className="panel-heading">
          <div>
            <p className="section-label">Sales</p>
            <h3>Orders Table</h3>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Total</th>
                <th>Client ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="mono">{truncateId(order._id)}</td>
                  <td>{order.status}</td>
                  <td>{formatMoney(order.total)}</td>
                  <td className="mono">{truncateId(order.client)}</td>
                  <td>{formatDate(order.order_date)}</td>
                  <td className="row-actions">
                    <button
                      type="button"
                      className="button subtle"
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        void handleLoadOrder(order._id);
                      }}
                    >
                      View
                    </button>
                    {isAdmin ? (
                      <button
                        type="button"
                        className="button danger"
                        onClick={() => void handleDeleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
              {!orders.length && !isLoading ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No orders returned by the backend yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {isAdmin ? (
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="section-label">Order Items</p>
              <h3>Create And Inspect</h3>
            </div>
          </div>

          <form className="form-grid" onSubmit={handleCreateOrderItem}>
            <label>
              Quantity
              <input
                type="number"
                min="1"
                step="1"
                value={orderItemForm.quantity}
                onChange={(event) => updateForm(setOrderItemForm, "quantity", event.target.value)}
                required
              />
            </label>
            <label>
              Book
              <select
                value={orderItemForm.book}
                onChange={(event) => updateForm(setOrderItemForm, "book", event.target.value)}
                required
              >
                <option value="">Choose a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Order
              <select
                value={orderItemForm.order}
                onChange={(event) => updateForm(setOrderItemForm, "order", event.target.value)}
                required
              >
                <option value="">Choose an order</option>
                {orders.map((order) => (
                  <option key={order._id} value={order._id}>
                    {truncateId(order._id)} - {order.status}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-actions">
              <button type="submit" className="button primary">
                Create order item
              </button>
            </div>
          </form>

          <form className="form-grid compact" onSubmit={handleLookupOrderItem}>
            <label className="span-2">
              Order item ID
              <input
                value={lookupOrderItemId}
                onChange={(event) => setLookupOrderItemId(event.target.value)}
                placeholder="Paste order item ID"
              />
            </label>
            <div className="form-actions span-2">
              <button type="submit" className="button ghost">
                Load order item
              </button>
            </div>
          </form>

          <DetailCard
            title={
              selectedOrderItem
                ? `Order item ${truncateId(selectedOrderItem._id)}`
                : "No order item selected"
            }
            items={[
              ["Quantity", selectedOrderItem?.quantity],
              ["Book", selectedOrderItem?.book?.title || selectedOrderItem?.book],
              ["Order", selectedOrderItem?.order?._id || selectedOrderItem?.order],
              ["Order status", selectedOrderItem?.order?.status],
              ["ID", selectedOrderItem?._id],
            ]}
          />
        </section>
      ) : null}
    </section>
  );
}

export default OrdersPage;
