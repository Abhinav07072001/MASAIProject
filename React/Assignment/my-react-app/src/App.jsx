import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  // Fetch todos
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  }, []);

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  // Handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todos Pagination</h1>

      {/* Todos List */}
      <ul>
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.id}:</strong> {todo.title}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: currentPage === page ? "lightblue" : "#eee",
              fontWeight: currentPage === page ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
