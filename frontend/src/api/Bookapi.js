import http from "./axiosClient.js"; // Ensure path is correct

export const fetchBooks = async () => {
  try {
    const response = await http.get("api/books");
    return response.data;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];   
  }
};

export const deleteBook = async (id) => {
  try {
    await http.delete(`api/books/${id}`);
    return true; 
  } catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
};

  
export const fetchBookbyId = async (id) => {
  try {
    const response = await http.get(`api/books/${id}`);
    return response.data;
  } catch (err) {
    console.error("Fetch by ID failed:", err);
    return null; // Return null so the component knows it failed
  }
};
