import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AdminOnlyPanel, DetailCard, PageIntro } from "../components/StoreUi.jsx";
import {
  getErrorMessage,
  initialClientForm,
  formatMoney,
  updateForm,
} from "../utils/storeUi.js";
import { createClient, getClientById } from "../api/storeApi.js";

function ClientsPage() {
  const {
    clients,
    isLoading,
    isAdmin,
    removeClient,
    setClients,
    setStatus,
  } = useOutletContext();
  const [clientForm, setClientForm] = useState(initialClientForm);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  async function handleCreateClient(event) {
    event.preventDefault();
    try {
      const created = await createClient({
        ...clientForm,
        total: Number(clientForm.total),
      });
      setClients((current) => [created, ...current]);
      setClientForm(initialClientForm);
      setStatus({
        tone: "success",
        message: `Client created: ${created.first_name} ${created.last_name}.`,
      });
    } catch (error) {
      setStatus({ tone: "error", message: getErrorMessage(error, "Could not create client.") });
    }
  }

  async function handleDeleteClient(id) {
    try {
      await removeClient(id);
      if (selectedClientId === id) {
        setSelectedClientId("");
        setSelectedClient(null);
      }
      setStatus({ tone: "success", message: "Client deleted." });
    } catch (error) {
      setStatus({ tone: "error", message: getErrorMessage(error, "Could not delete client.") });
    }
  }

  async function handleLoadClient(id) {
    if (!id) {
      setSelectedClient(null);
      return;
    }

    try {
      setSelectedClient(await getClientById(id));
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not load client details."),
      });
    }
  }

  return (
    <section className="page-grid">
      <PageIntro
        eyebrow="Customers"
        title="Clients"
        description="Authenticated users can inspect client records. Only admins can add or remove clients."
        countLabel={`${clients.length} clients`}
      />

      {isAdmin ? (
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="section-label">Create</p>
              <h3>Add Client</h3>
            </div>
          </div>
          <form className="form-grid" onSubmit={handleCreateClient}>
            <label>
              First name
              <input
                value={clientForm.first_name}
                onChange={(event) => updateForm(setClientForm, "first_name", event.target.value)}
                required
              />
            </label>
            <label>
              Last name
              <input
                value={clientForm.last_name}
                onChange={(event) => updateForm(setClientForm, "last_name", event.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={clientForm.email}
                onChange={(event) => updateForm(setClientForm, "email", event.target.value)}
                required
              />
            </label>
            <label>
              Telephone
              <input
                value={clientForm.tel}
                onChange={(event) => updateForm(setClientForm, "tel", event.target.value)}
                required
              />
            </label>
            <label className="span-2">
              Address
              <input
                value={clientForm.address}
                onChange={(event) => updateForm(setClientForm, "address", event.target.value)}
                required
              />
            </label>
            <label>
              Total spent
              <input
                type="number"
                min="0"
                step="0.01"
                value={clientForm.total}
                onChange={(event) => updateForm(setClientForm, "total", event.target.value)}
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit" className="button primary">
                Create client
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
            <h3>Client Detail</h3>
          </div>
        </div>
        <label>
          Select client
          <select
            value={selectedClientId}
            onChange={(event) => {
              const id = event.target.value;
              setSelectedClientId(id);
              void handleLoadClient(id);
            }}
          >
            <option value="">Choose a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.first_name} {client.last_name}
              </option>
            ))}
          </select>
        </label>
        <DetailCard
          title={
            selectedClient
              ? `${selectedClient.first_name} ${selectedClient.last_name}`
              : "No client selected"
          }
          items={[
            ["Email", selectedClient?.email],
            ["Telephone", selectedClient?.tel],
            ["Address", selectedClient?.address],
            ["Total", selectedClient ? formatMoney(selectedClient.total) : null],
            ["ID", selectedClient?._id],
          ]}
        />
      </section>

      <section className="panel panel-wide">
        <div className="panel-heading">
          <div>
            <p className="section-label">Customers</p>
            <h3>Clients Table</h3>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    {client.first_name} {client.last_name}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.tel}</td>
                  <td>{formatMoney(client.total)}</td>
                  <td className="row-actions">
                    <button
                      type="button"
                      className="button subtle"
                      onClick={() => {
                        setSelectedClientId(client._id);
                        void handleLoadClient(client._id);
                      }}
                    >
                      View
                    </button>
                    {isAdmin ? (
                      <button
                        type="button"
                        className="button danger"
                        onClick={() => void handleDeleteClient(client._id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
              {!clients.length && !isLoading ? (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No clients returned by the backend yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default ClientsPage;
