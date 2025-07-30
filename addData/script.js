document.getElementById("searchBtn").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const productList = document.getElementById("productList");

  loading.classList.remove("hidden");
  error.classList.add("hidden");
  productList.innerHTML = "";

  try {
    // 🔧 Modify this URL based on actual API structure
    const url = `https://fakestoreapi.com/products/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();

    // Filter by price range
    const filtered = data.filter(
      (product) =>
        product.price >= Number(minPrice) &&
        product.price <= Number(maxPrice)
    );

    if (filtered.length === 0) {
      productList.innerHTML = `<p>No products found in this range.</p>`;
    } else {
      filtered.forEach((item) => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" width="100">
          <h3>${item.title}</h3>
          <p>Price: $${item.price}</p>
        `;
        productList.appendChild(card);
      });
    }
  } catch (err) {
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
});
