import { useState, useEffect, useRef } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  // useRef to store current page
  const currentPage = useRef(1);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${currentPage.current}`
        );
        const data = await res.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages); // API gives total pages
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [currentPage.current]); // triggers re-fetch when page changes

  // Handle page change
  const handlePageChange = (page) => {
    currentPage.current = page;
    setCharacters([]); // reset data before fetch
    setLoading(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick and Morty Characters</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          {characters.map((char) => (
            <div
              key={char.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={char.image}
                alt={char.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>{char.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor:
                currentPage.current === page ? "lightblue" : "#eee",
              fontWeight: currentPage.current === page ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
