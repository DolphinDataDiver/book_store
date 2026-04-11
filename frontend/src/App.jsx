import { Routes, Route } from "react-router-dom";
import Booklist from "./components/BookList"; 
import Bookcard from "./components/BookCard"; 

function App() {
  return (
    <div className="container">
      <Routes> 
        <Route path="/books" element={<Booklist />} />

        <Route path="/books/:id" element={<Bookcard />} />

      </Routes> 
    </div>
  );
}

export default App;
