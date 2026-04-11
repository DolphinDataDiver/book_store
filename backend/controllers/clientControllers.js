import Client from "../models/Client.js";

export const ReturnClients = async (req, res) => {
    const clients = await Client.find(); 
    res.json(clients);
};

export const ReturnClientById = async (req, res) => {
    const id = req.params.id;
    const client = await Client.findById(id);

    res.json(client);
};

export const AddClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      address,
      tel,
      total,
    } = req.body;

    const newClient = new Client({
      first_name,
      last_name,
      email,
      address,
      tel,
      total,
    });

    await newClient.save();

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteClient = async (req, res) => {
    const id = req.params.id; // Get the client ID from the URL

    const client = await Client.findById(id); // Find the book by ID

    await client.remove(); // Remove the book from the database
    res.send("Client deleted");
};

